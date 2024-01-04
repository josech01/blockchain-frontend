import React, { useEffect, useState, useRef } from 'react';
import clsx from 'clsx';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Typography, Tooltip, Fade } from '@material-ui/core';
import { Element } from 'react-scroll';
import { checkLevel, convertUSDToString, toUSDFormat } from '../../helpers';
import CustomProgressBar from './CustomProgressBar';
import Popover from '@idui/react-popover';
import Title from '../Base/Title';

import { leagueData, ceilDecimal } from '../../helpers';
import { useStyles } from './index.styles';
import { useAccount, useContractRead, usePublicClient } from 'wagmi';
import { wagmiStakeContractConfig } from '../../wagmiConfig/stake';
import { formatUnits } from 'viem';
import { getMyNfts_ } from '../../reducers/nft.slice';

const League = (props) => {
  const { myNfts } = useSelector((state) => state.nft);
  const classes = useStyles();
  const [level, setLevel] = useState(15);
  // const address = '0xC96b58C282eB3faA13B121BfeD4cA73886ea83ce';
  const { address, isConnected } = useAccount();
  const [stakingAmount, setStakingAmount] = useState(0);
  const [maxPercent, setMaxPercent] = useState(100);
  const dispatch = useDispatch();
  const publicClient = usePublicClient();
  const [leaguePercentArr, setLeaguePercentArr] = useState(leagueData);

  const getStakingAmount = async (address) => {
    if (!address) {
      setStakingAmount(0);
      return;
    }
    const data = await publicClient.readContract({
      ...wagmiStakeContractConfig,
      functionName: 'userStakingInfo',
      args: [address],
    });
    // console.log({ stakingAmount: Number(formatUnits(data[0], 18)) });
    setStakingAmount(Number(formatUnits(data[0], 18)));
  };

  const calculateUpdateLevel = () => {
    let curLevel = checkLevel(stakingAmount)?.itemIndex || 15;
    const leaugeBoosters = myNfts.filter((item) => item.catId == 2 && item.enabled == true);
    if (leaugeBoosters && leaugeBoosters.length > 0) {
      const fixedItems = leaugeBoosters.filter((item) => item.isFixed == true);
      let fixedLevel = 15;

      if (fixedItems && fixedItems.length > 0) {
        const maxFixLevel = fixedItems.reduce((max, current) => {
          return current.weight < max.weight ? current : max;
        }, fixedItems[0]);
        fixedLevel = maxFixLevel.weight;
      }

      const unFixedItems = leaugeBoosters.filter((item) => item.isFixed != true);
      let totalBoostLevel = 0;
      if (unFixedItems && unFixedItems.length > 0) {
        totalBoostLevel = unFixedItems.reduce((total, item) => {
          return item.weight + total;
        }, 0);
      }
      const updatedLevel = curLevel - totalBoostLevel;
      curLevel = Math.min(fixedLevel, updatedLevel);
    }
    setLevel(curLevel);
  };
  const getStakingInfo = () => {
    axios
      .get('https://backend.tyrh.io/info/stake')
      .then((res) => {
        const {
          data: { leagues },
        } = res;
        let percentArr = [];
        if (leagues && leagues.length > 0) {
          const max = Math.max(...leagues);
          const total = leagues.reduce((item, current) => item + current, 0);
          setMaxPercent(ceilDecimal((100 * max) / total, 5));
          for (let i = 0; i < leagues.length; i++) {
            const ele = leagues[i];
            const itempercent = ceilDecimal((100 * ele) / total, 5);
            percentArr.push({ ...leagueData[i], percent: itempercent || 0 });
          }
          setLeaguePercentArr(percentArr);
        }
      })
      .catch((err) => {
        console.log({ err });
      });
  };

  useEffect(() => {
    calculateUpdateLevel();
  }, [myNfts, stakingAmount]);

  useEffect(() => {
    getStakingAmount(address);
    dispatch(getMyNfts_(address));
  }, [isConnected, address]);
  useEffect(() => {
    getStakingInfo();
  }, []);
  return (
    <Element name='league'>
      <Box className={classes.root}>
        <Title title='Staking Leagues' star={false} description='' />

        <Box className={classes.content}>
          <Box className={classes.tgrid}>
            <Box className={classes.tableHeader}>Claim bonus</Box>
            <Box className={clsx(classes.tableIndex, classes.tableHeader)}>#</Box>
            <Box className={classes.tableHeader}>Name</Box>
            <Box className={classes.tableHeader}>#TYRH Staked</Box>
            <Box className={clsx(classes.tableHeader, classes.desktop)}>%</Box>
            <Box className={classes.tableHeader}>Distribution</Box>
          </Box>
          {leaguePercentArr.map((item, index) => {
            let selected = index == level;
            // if (isConnected) {
            //   if (newLevel.current != null && newLevel.current > 0) {
            //     if (newLevel.current == index) selected = true;
            //     console.log({ stakingAmount });
            //   } else if (index == 0 && stakingAmount >= item.balance) {
            //     console.log({ stakingAmount });

            //     selected = true;
            //   } else if (index > 1 && stakingAmount >= item.balance && stakingAmount < leagueData[index - 1].balance) {
            //     console.log({ stakingAmount });
            //     selected = true;
            //   }
            // }
            return (
              <Box className={selected ? classes.selectedGrid : classes.grid} key={index}>
                {item.claim != null ? (
                  <Box className={classes.claimUnit} style={{ color: item.color }}>
                    {selected && <img src='/img/star.png' width={15} alt='star' />}
                    {item.claim}%
                  </Box>
                ) : (
                  <Box className={classes.claimUnit}>
                    {selected && <img src='/img/star.png' width={15} alt='star' />}
                  </Box>
                )}

                <Box className={classes.tableIndex}>{index + 1}</Box>
                <Tooltip
                  title={item.description}
                  placement='top'
                  TransitionComponent={Fade}
                  TransitionProps={{ timeout: 600 }}
                  classes={{ tooltip: classes.tooltip }}
                >
                  <Box className={clsx(classes.tableUnit, classes.leagueName)}>
                    <img src={`/img/leagues/${item.img}.png`} alt='heart' width={35} />
                    {item.name}
                  </Box>
                </Tooltip>
                <Box className={clsx(classes.tableUnit, classes.desktop)}>
                  {/* <img src='tyrh.png' alt='' width='15' /> */}+{toUSDFormat(item.balance, 2)}
                </Box>
                <Box className={clsx(classes.tableUnit, classes.mobile)}>
                  <img src='tyrh.png' alt='' width='15' />+{convertUSDToString(item.balance)}
                </Box>
                <Box className={clsx(classes.tableUnit, classes.desktop)}>{item.percent}%</Box>
                <Box className={classes.desktop} position={`relative`} margin={`auto`} width={`100%`}>
                  <CustomProgressBar value={item.percent} max={maxPercent} />
                </Box>
                <Box className={classes.mobile} position={`relative`} margin={`auto`} width={`100%`}>
                  <Popover className={classes.popover} content={<Box>{item.percent}%</Box>}>
                    <CustomProgressBar value={item.percent} max={maxPercent} />
                  </Popover>
                </Box>
              </Box>
            );
          })}
        </Box>
      </Box>
    </Element>
  );
};

export default League;
