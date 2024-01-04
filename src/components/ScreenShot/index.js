import React, { useState, useEffect } from 'react';
// library
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { pulsechain } from 'wagmi/chains';
import { formatUnits } from 'viem';
import { useAccount, useContractRead, useBalance } from 'wagmi';

// library-component
import { Box, Typography, Button } from '@material-ui/core';
import { Element } from 'react-scroll';
import { useWeb3Modal } from '@web3modal/react';

// utils & constants
import { checkLevel } from '../../helpers';
import { config } from '../../wagmiConfig/index';
import { wagmiStakeContractConfig } from '../../wagmiConfig/stake';
import { toUSDFormat } from '../../helpers';

// custom component
import Title from '../Base/Title';

import { useStyles } from './index.styles';
import { getBurnRanks } from '../../reducers/burn.slice';

const ScreenShot = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { burnRanks } = useSelector((state) => state.burn);
  const { address, isConnected } = useAccount();
  // const address = '0xd48Dc422F43Aa8d9a7E18a5A501944344823b068';
  // const isConnected = true;
  const [userStakeAmount, setUserStakeAmount] = useState(0);
  const [decimal, setDecimal] = useState(18);
  const [userLevel, setUserLevel] = useState();
  // const { burnRanks } = props;
  const [tokens, setTokens] = useState([
    { name: 'PLS', img: 'pls', balance: 0 },
    { name: 'PLSX', img: 'plsx', balance: 0 },
    { name: 'HEX', img: 'hex', balance: 0 },
    { name: 'INC', img: 'inc', balance: 0 },
  ]);
  const [position, setPosition] = useState({ pls: -1, plsx: -1, hex: -1, inc: -1 });

  const { open, close } = useWeb3Modal();
  // wallet modal

  const getUserStakeAmount = useContractRead({
    ...wagmiStakeContractConfig,
    functionName: 'userStakingInfo',
    args: [address],
    onSuccess(data) {
      // console.log({ data });
      setUserStakeAmount(formatUnits(data[0], decimal));
      setUserLevel(checkLevel(formatUnits(data[0], decimal)));
    },
  });
  // get Decimal
  const tyrhBalance = useBalance({
    address,
    chainId: pulsechain.id,
    token: config.tyrhAddress,
    onSuccess(data) {
      setDecimal(data.decimals);
    },
  });
  const getUserStakingInfo = () => {
    if (isConnected) {
      axios
        .get(`https://backend.tyrh.io/info/burn/${address}`)
        .then((res) => {
          const { data } = res;
          const { burn } = data;
          if (burn.length > 0) {
            setTokens([
              { name: 'PLS', img: 'pls', balance: burn[0].pls || 0 },
              { name: 'PLSX', img: 'plsx', balance: burn[0].plsx || 0 },
              { name: 'HEX', img: 'hex', balance: burn[0].hex || 0 },
              { name: 'INC', img: 'inc', balance: burn[0].inc || 0 },
            ]);
          }
        })
        .catch((err) => {
          console.log({ err });
        });
    } else {
      setTokens([
        { name: 'PLS', img: 'pls', balance: 0 },
        { name: 'PLSX', img: 'plsx', balance: 0 },
        { name: 'HEX', img: 'hex', balance: 0 },
        { name: 'INC', img: 'inc', balance: 0 },
      ]);
    }
  };
  const findPos = () => {
    if (!isConnected) {
      setPosition({ hex: -1, pls: -1, plsx: -1, inc: -1 });
    } else if (Object.keys(burnRanks).length) {
      const plsIndex = burnRanks.pls.findIndex((item) => item.wallet.toLowerCase() == address.toLowerCase());
      const plsxIndex = burnRanks.plsx.findIndex((item) => item.wallet.toLowerCase() == address.toLowerCase());
      const hexIndex = burnRanks.hex.findIndex((item) => item.wallet.toLowerCase() == address.toLowerCase());
      const incIndex = burnRanks.inc.findIndex((item) => item.wallet.toLowerCase() == address.toLowerCase());
      setPosition({ hex: hexIndex, pls: plsIndex, plsx: plsxIndex, inc: incIndex });
    }
  };
  // console.log({ position });
  useEffect(() => {
    getUserStakingInfo();
    findPos();
  }, [isConnected, address]);
  useEffect(() => {
    findPos();
  }, [burnRanks]);

  useEffect(() => {
    dispatch(getBurnRanks());
  }, []);

  return (
    <Element name='screenshot'>
      <Box className={classes.root}>
        <Title title='Your  Burns ' description='Your staking league and RH tokens burn statistics!' star={false} />
        {!isConnected && (
          <Button variant='contained' onClick={() => open()} className={classes.walletBtn}>
            <img src='/img/walletconnect.png' alt='walletconnect' width={20} />
            Wallet connect
          </Button>
        )}

        <Box className={classes.cardContainer}>
          {!isConnected || userStakeAmount < 1 ? (
            <>
              <Box className={classes.title}>
                <Typography variant='body1'>No League</Typography>
              </Box>
            </>
          ) : (
            <>
              <Box>
                <img src={`/img/leagues/${userLevel.img}.png`} alt='redbull' width={60} />
              </Box>
              <Box className={classes.title}>
                {userLevel.itemIndex + 1}.<Typography variant='body1'>{userLevel.name}</Typography>
              </Box>
            </>
          )}
          <Typography variant='caption' className={classes.gray}>
            {!isConnected || userStakeAmount < 1 ? '' : userLevel.description}
          </Typography>
          <Box className={classes.grid}>
            <Box className={classes.posDiv}>
              <Box className={classes.pos}>Position</Box>
              {tokens.map((item, index) => {
                return position[item.img] >= 0 ? (
                  <Box key={index} className={classes.posItem}>
                    {position[item.img] + 1}
                  </Box>
                ) : (
                  <Box key={index} className={classes.posItem}></Box>
                );
              })}
            </Box>
            <Box>
              {tokens.map((item, index) => (
                <Box key={index} className={classes.burnItem}>
                  <Box className={classes.burnToken}>
                    <img src={`img/${item.img}.png`} alt='token' width={20} />
                    {item.name}
                  </Box>
                  <Box display={`flex`} alignItems={`flex-start`}>
                    {toUSDFormat(item.balance)}
                    <img src='/img/fire.png' width={20} alt='fire' />
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
          <Box style={{ marginTop: '40px', display: 'flex', alignItems: 'center', fontSize: '1.2rem' }}>
            <img src='tyrh.png' width={20} alt='tyrh' style={{ marginRight: '5px' }} />
            TYRH
          </Box>
        </Box>
      </Box>
    </Element>
  );
};

export default ScreenShot;
