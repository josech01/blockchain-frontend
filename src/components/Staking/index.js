import React, { useEffect, useRef, useState } from 'react';
import { Box, Typography, Paper, Button, Tooltip, Fade, Grid, TextField, withStyles } from '@material-ui/core';
import { Element } from 'react-scroll';
import NumberFormat from 'react-number-format';
import InputBase from '@material-ui/core/InputBase';
import CustomProgressBar from './CustomProgressBar';
import { useStyles } from './index.styles';
import Title from '../Base/Title';
import Spinner from '../Base/Spinner';
import axios from 'axios';
//
import { toast } from 'react-toastify';
// contract
import { useContractWrite, useAccount, usePublicClient } from 'wagmi';
// import { pulsechain } from 'wagmi/chains';
import { wagmiStakeContractConfig } from '../../wagmiConfig/stake';
import { wagmiTYRHConfig } from '../../wagmiConfig/tyrh';
import { parseUnits, formatUnits, formatEther } from 'viem';
import { config } from '../../wagmiConfig/index';

// backend api
// import { getStakeInfo } from '../../helpers/contractFunctions/redeem';
import { toUSDFormat, checkLevel, ceilDecimal } from '../../helpers';
import CustomNumberFormat from '../Base/Input/CustomNumberFormat';

const Staking = (props) => {
  const classes = useStyles();
  const [totalSupply, setTotalSupply] = React.useState(1000000000);
  const [totalStakeAmount, setTotalStakeAmount] = React.useState(0);
  const [stakeAmount, setStakeAmount] = React.useState(0);
  const [tokenBalance, setTokenBalance] = React.useState(0);
  const [userLevel, setUserLevel] = React.useState({});
  const [decimal, setDecimal] = React.useState(18);
  const [userStakeAmount, setUserStakeAmount] = useState(0);
  const { address, isConnected } = useAccount();
  // const address = '0xfB4CecED5B403Be91A3b6cfd51783F6A5c0bb98b';
  // const isConnected = true;
  const [allowance, setAllowance] = React.useState();
  const [stakingList, setStakingList] = React.useState([]);
  const publicClient = usePublicClient();
  const addressRef = useRef('');
  const [endStakingId, setEndStakingId] = useState(-1);
  const [airdrop, setAirdrop] = useState([]);
  // stake contract
  const {
    write: stakeWrite,
    data,
    isLoading: isStakeLoading,
  } = useContractWrite({
    ...wagmiStakeContractConfig,
    functionName: 'stake',
    args: [parseUnits(stakeAmount.toString(), decimal)],
    onSuccess: async (data) => {
      await publicClient.waitForTransactionReceipt({ hash: data.hash });
      updateAllInfo();
      toast.success('Staking Success!', { theme: 'dark' });
    },
    onError(data) {
      toast.error('Staking failed!', { theme: 'dark' });
    },
  });

  // approve contract

  const {
    write: approveWrite,
    // data: approveData,
    // isSuccess: isApproveSuccess,
    isLoading: isApproveLoading,
  } = useContractWrite({
    ...wagmiTYRHConfig,
    functionName: 'approve',
    args: [config.stakeAddress, parseUnits(stakeAmount.toString(), decimal)],
    onSuccess: async (data) => {
      // console.log({ data });
      await publicClient.waitForTransactionReceipt({ hash: data.hash });
      updateAllowance();
      stakeWrite?.();
    },
  });
  // endStake contrack
  const fetchAirdrop = async () => {
    const {
      data: { airdrop },
    } = await axios.get(`https://backend.tyrh.io/info/airdrop/${address}`);
    setAirdrop(airdrop);
  };
  const {
    write: unStakeWrite,
    data: unStakeData,
    isSuccess: isUnStakeSuccess,
    isLoading: isUnstakeLoading,
  } = useContractWrite({
    ...wagmiStakeContractConfig,
    functionName: 'unStake',
    onSuccess: async (data) => {
      await publicClient.waitForTransactionReceipt({ hash: data.hash });
      updateAllInfo();
      toast.success('Unstaking success!', { theme: 'dark' });
      setEndStakingId(-1);
    },
    onError: async (data) => {
      toast.error('Unstaking failed!', { theme: 'dark' });
      setEndStakingId(-1);
    },
  });

  const inputChange = (e) => {
    if (!isNaN(e.target.value)) {
      setStakeAmount(Number(e.target.value));
    } else {
      toast.warn('Please input valid value', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    }
  };

  const setMaxStakeAmount = () => {
    if (isConnected) {
      const k = Math.pow(10, 5);
      setStakeAmount(Math.floor(tokenBalance * k) / k);
    }
  };

  // end stake
  const endStake = (id, index) => {
    // console.log({ id });
    setEndStakingId(id);
    unStakeWrite?.({ args: [id] });
  };

  const stakeTYRH = () => {
    if (!isConnected) {
      toast.error('Please Connect Your Wallet', { theme: 'dark' });
      return;
    } else if (stakeAmount <= 0) {
      toast.warn('Please input stake Amount', { theme: 'dark' });
      return;
    } else if (stakeAmount > tokenBalance) {
      toast.warn('Stake amount exceeds your token balance', { theme: 'dark' });
      return;
    } else if (allowance < stakeAmount) {
      approveWrite?.();
    } else if (allowance >= stakeAmount) {
      stakeWrite?.();
    }
  };

  const updateStakingList = async () => {
    const data = await publicClient.readContract({
      ...wagmiStakeContractConfig,
      functionName: 'getUserStakingList',
      args: [addressRef.current],
    });
    // console.log({ data });
    setStakingList(data);
  };

  const updateTotalStakeAmount = async () => {
    const totalStake = await publicClient.readContract({
      ...wagmiStakeContractConfig,
      functionName: 'totalAmount',
    });
    const lpAmount = await publicClient.readContract({
      ...wagmiTYRHConfig,
      functionName: 'balanceOf',
      args: [config.lpAddress],
    });
    const deadAmount = await publicClient.readContract({
      ...wagmiTYRHConfig,
      functionName: 'balanceOf',
      args: [config.deadAddress],
    });
    setTotalStakeAmount(Number(formatEther(totalStake)));
    setTotalSupply(1000000000 - Number(formatEther(lpAmount)) - Number(formatEther(deadAmount)));
  };

  const updateUserStakingInfo = async () => {
    const data = await publicClient.readContract({
      ...wagmiStakeContractConfig,
      functionName: 'userStakingInfo',
      args: [addressRef.current],
    });
    // console.log({ userStakingInfo: data });
    setUserStakeAmount(Number(formatEther(data[0])));
    setUserLevel(checkLevel(formatEther(data[0])));
  };

  const updateBalance = async () => {
    const data = await publicClient.readContract({
      ...wagmiTYRHConfig,
      functionName: 'balanceOf',
      args: [addressRef.current],
    });
    setTokenBalance(Number(formatEther(data)));
    setDecimal(18);
  };

  const updateAllowance = async () => {
    const data = await publicClient.readContract({
      ...wagmiTYRHConfig,
      functionName: 'allowance',
      args: [addressRef.current, config.stakeAddress],
    });
    setAllowance(Number(formatEther(data)));
  };

  const updateAllInfo = () => {
    // console.log({ address, isConnected }, addressRef.current);
    updateTotalStakeAmount();
    if (isConnected) {
      updateStakingList();
      updateUserStakingInfo();
      updateBalance();
      updateAllowance();
    } else {
      setStakingList([]);
      setUserLevel({});
      setUserStakeAmount(0);
      setTokenBalance(0);
    }
  };
  useEffect(() => {
    addressRef.current = address;
    updateAllInfo();
    if (isConnected) fetchAirdrop();
  }, [address, isConnected]);

  return (
    <Element name='stake'>
      <Box className={classes.root}>
        <Title title='Staking' description='' star={false} />

        <Box className={classes.content}>
          <Box className={classes.unit1}>
            <Box className={classes.description1}>
              <img src='tyrh.png' alt='tyrh' width={15} />
              Your league:
            </Box>
            <Box>
              {isConnected ? (
                Object.keys(userLevel).length > 0 ? (
                  <>
                    {userLevel.itemIndex + 1}.{` `}
                    <img src={`/img/leagues/${userLevel.img}.png`} alt='redbull' width={40} />
                    {userLevel.name}
                  </>
                ) : (
                  <>No League</>
                )
              ) : (
                <>No League</>
              )}
            </Box>
          </Box>
          <Box className={classes.unit2}>
            <Typography className={classes.description} variant='body2'>
              Your stake {ceilDecimal((100 * userStakeAmount) / totalStakeAmount, 8)}&nbsp;%
            </Typography>
            <Typography className={classes.description} variant='body2'>
              Global stake: {ceilDecimal((100 * totalStakeAmount) / totalSupply, 5)}&nbsp;%
            </Typography>
          </Box>
          <Box className={classes.unit3}>
            <Typography className={classes.description}>Liquid: {toUSDFormat(tokenBalance, 2)}&nbsp; #TYRH</Typography>
            <Typography className={classes.description}>
              Staked:
              {toUSDFormat(userStakeAmount, 2)} &nbsp;#TYRH
            </Typography>
          </Box>
        </Box>
        <Grid container>
          <Grid item md xs={12}></Grid>
          <Grid item xs={12} md={4} className={classes.stakeInput}>
            <Paper component='form' className={classes.paperRoot}>
              <InputBase
                className={classes.input}
                placeholder='Min. 100#TYRH'
                // value={stakeAmount}
                onChange={(e) => inputChange(e)}
                inputComponent={CustomNumberFormat}
                InputProps={{
                  'aria-label': 'search google maps',
                }}
              />
              <Box className={classes.max} onClick={setMaxStakeAmount}>
                Max
              </Box>
              <Box className={classes.icon}>
                <img src='/tyrh.png' alt='search' width={20} />
              </Box>
            </Paper>
          </Grid>
          <Grid item md xs={12} className={classes.burnEstimation}>
            <Box className={classes.burnTextDiv}>
              <Box className={classes.burnTitle}>You will get</Box>
              <Box className={classes.burnEstimationText}>
                {toUSDFormat(stakeAmount * 25, 2)} - {toUSDFormat(stakeAmount * 125, 2)}{' '}
                <img style={{ marginLeft: '5px' }} alt='fire' src='/img/fire.png' width={15}></img> $BURN
              </Box>
            </Box>
          </Grid>
        </Grid>
        <Button
          disabled={isApproveLoading || isStakeLoading}
          className={classes.stakeBtn}
          variant='contained'
          onClick={stakeTYRH}
        >
          {(isApproveLoading || isStakeLoading) && <Spinner />}stake 55 days
        </Button>

        <Box className={classes.stakeDiv}>
          {isConnected &&
            stakingList.map((item, index) => {
              // console.log({ item }, Number(item[0]), endStakingId, Number(item[0]) == endStakingId);
              const startTime = Number(item[3]);
              const currentTime = new Date();
              const duration = currentTime.getTime() / 1000 - startTime;
              const duration_day = Math.floor(duration / (3600 * 24));
              const totalTime = 55 * 24 * 3600;
              let value = 0;
              const bonusAirdrop = airdrop.find((unit) => Number(unit.timestamp) == Number(item[3]));
              const bonus = bonusAirdrop?.amount || 0;
              // console.log({ bonusAirdrop });
              const multipleX = Math.floor(bonus / Number(formatUnits(item[2], decimal)));
              value = (100 * duration) / totalTime;
              return (
                <Box className={classes.sliderDiv} key={index}>
                  <Box
                    width={`auto`}
                    display={`grid`}
                    alignItems={`center`}
                    justifyContent={`center`}
                    gridTemplateColumns={`1fr 5fr`}
                  >
                    <Typography variant='body2' className={classes.tokenVolumn}>
                      {toUSDFormat(formatUnits(item[2], decimal), 2)} TYRH
                    </Typography>
                    <Box className={classes.slider}>
                      <Box display={`flex`} alignItems={`flex-end`} marginBottom={1}>
                        {bonus > 0 && (
                          <Box className={classes.multi}>
                            <Typography variant='body2'>{multipleX}x</Typography>
                          </Box>
                        )}
                        {bonus > 0 && (
                          <Box className={classes.stakeInfo}>
                            {toUSDFormat(bonus)}
                            <img src='/img/fire.png' width={20} alt='fire' />
                            <Typography variant='body2'>$BURN</Typography>
                          </Box>
                        )}
                        <Typography variant='caption' className={classes.served}>
                          {duration_day}/55 served
                        </Typography>
                      </Box>
                      <CustomProgressBar value={Math.min(value, 100)} />
                    </Box>
                  </Box>
                  {value < 100 ? (
                    <Tooltip
                      title={
                        <Box style={{ fontSize: '0.8rem', textAlign: 'center' }}>
                          <Typography variant='h6' style={{ fontSize: '1rem' }}>
                            WARNING! PENALTY:{' '}
                          </Typography>
                          Ending your stake early will burn %55.55 of your staked TYRH tokens
                        </Box>
                      }
                      placement='top'
                      classes={{ tooltip: classes.tooltip }}
                      TransitionComponent={Fade}
                      TransitionProps={{ timeout: 600 }}
                    >
                      <Button
                        disabled={isUnstakeLoading}
                        variant='contained'
                        className={classes.eesBtn}
                        onClick={() => endStake(Number(item[0], index))}
                      >
                        {isUnstakeLoading && Number(item[0]) == endStakingId && <Spinner />}End Stake
                        <img src='/img/info.png' width={15} alt='info' />
                      </Button>
                    </Tooltip>
                  ) : (
                    <Button
                      disabled={isUnstakeLoading}
                      variant='contained'
                      className={classes.eesBtn}
                      onClick={() => endStake(Number(item[0]), index)}
                    >
                      {isUnstakeLoading && Number(item[0]) == endStakingId && <Spinner />}End Stake
                      <img src='/img/info.png' width={15} alt='info' />
                    </Button>
                  )}
                </Box>
              );
            })}
        </Box>
      </Box>
    </Element>
  );
};

export default Staking;
