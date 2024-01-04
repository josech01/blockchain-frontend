import React, { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { Box, Button, InputBase, Typography, Paper } from '@material-ui/core';
import { useStyles } from './index.styles';
import { useAccount, useContractWrite, usePublicClient } from 'wagmi';
import { formatEther, parseEther } from 'viem';
import { toast } from 'react-toastify';
import { wagmiBonfireContractConfig } from '../../wagmiConfig/bonfire';
import { toUSDFormat } from '../../helpers';
import { wagmiNftBurnTokenContractConfig } from '../../wagmiConfig/burnToken';
import { config } from '../../wagmiConfig';
import CustomNumberFormat from '../Base/Input/CustomNumberFormat';
const Bonfire = (props) => {
  const classes = useStyles();
  const [fire, setFire] = useState(false);

  const [amount, setAmount] = useState('');
  const publicClient = usePublicClient();
  const [stakedAmount, setStakedAmount] = useState(0);
  const [stakeTimestamp, setStakeTimestamp] = useState(1);
  const [minimumLockTime, setMinimumLockTime] = useState(0);
  const [dailyYield, setYield] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [allowance, setAllowance] = React.useState(0);
  const [tokenBalance, setTokenBalance] = React.useState(0);
  const { address, isConnected } = useAccount();
  const addressRef = useRef('');
  useEffect(() => {
    addressRef.current = address;
    updateAllInfo();
  }, [address, isConnected]);

  useEffect(() => {
    setCurrentTime(Date.now() / 1000);
    const k = setInterval(() => {
      setCurrentTime(Date.now() / 1000);
    }, 1000);

    return () => {
      clearInterval(k);
    };
  }, []);

  // stake
  const {
    write: stakeWrite,
    data,
    isLoading: isStakeLoading,
  } = useContractWrite({
    ...wagmiBonfireContractConfig,
    functionName: 'stake',
    args: [parseEther(amount.toString())],
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
  const { write: approveWrite, isLoading: isApproveLoading } = useContractWrite({
    ...wagmiNftBurnTokenContractConfig,
    functionName: 'approve',
    args: [config.bonfireAddress, parseEther(amount.toString())],
    onSuccess: async (data) => {
      await publicClient.waitForTransactionReceipt({ hash: data.hash });
      stakeWrite?.();
    },
  });

  // endStake contract
  const {
    write: unStakeWrite,
    data: unStakeData,
    isSuccess: isUnStakeSuccess,
    isLoading: isUnstakeLoading,
  } = useContractWrite({
    ...wagmiBonfireContractConfig,
    functionName: 'unStake',
    onSuccess: async (data) => {
      await publicClient.waitForTransactionReceipt({ hash: data.hash });
      updateAllInfo();
      toast.success('Unstaking success!', { theme: 'dark' });
    },
    onError: async (data) => {
      toast.error('Unstaking failed!', { theme: 'dark' });
    },
  });

  const updateAllInfo = () => {
    getStakingInfo();
    if (isConnected) {
      updateBalance();
      updateAllowance();
    } else {
      setAllowance(0);
      setTokenBalance(0);
    }
  };

  const getStakingInfo = async () => {
    if (isConnected) {
      let data = await publicClient.readContract({
        ...wagmiBonfireContractConfig,
        functionName: 'userInfo',
        args: [addressRef.current],
      });
      setStakedAmount(Number(formatEther(data[0])));
      setStakeTimestamp(Number(data[1]));
      if (Number(data[1])) setFire(true);
      else setFire(false);

      // Get minimum lock time
      data = await publicClient.readContract({
        ...wagmiBonfireContractConfig,
        functionName: 'minimumLockTime',
      });
      setMinimumLockTime(Number(data));

      // Get Yield
      data = await publicClient.readContract({
        ...wagmiBonfireContractConfig,
        functionName: 'yield',
      });
      setYield(Number(data) / 1000 + 1);
    } else {
      setStakedAmount(0);
      setStakeTimestamp(0);
      setFire(false);
    }
  };

  const updateAllowance = async () => {
    const data = await publicClient.readContract({
      ...wagmiNftBurnTokenContractConfig,
      functionName: 'allowance',
      args: [addressRef.current, config.bonfireAddress],
    });
    setAllowance(Number(formatEther(data)));
  };

  const updateBalance = async () => {
    const data = await publicClient.readContract({
      ...wagmiNftBurnTokenContractConfig,
      functionName: 'balanceOf',
      args: [addressRef.current],
    });
    setTokenBalance(Number(formatEther(data)));
  };

  const stakeBurn = () => {
    console.log({ amount, allowance, tokenBalance });
    if (!isConnected) {
      toast.error('Please Connect Your Wallet', { theme: 'dark' });
      return;
    } else if (amount <= 0) {
      toast.warn('Please input stake Amount', { theme: 'dark' });
      return;
    } else if (amount > tokenBalance) {
      toast.warn('Stake amount exceeds your token balance', { theme: 'dark' });
      return;
    } else if (allowance < amount) {
      approveWrite?.();
    } else if (allowance >= amount) {
      stakeWrite?.();
    }
  };
  const inputChange = (e) => {
    setAmount(Number(e.target.value));
  };

  // const handlefocus = () => {
  //   if (amount == 0 || amount == '0') {
  //     setAmount('');
  //   }
  // };
  const getEstimatedAmount = (amount, time) => {
    const oneDay = 3600 * 24;
    const daysPassed = Math.floor((time - stakeTimestamp) / oneDay);
    const passedTimeToday = (time - stakeTimestamp) % oneDay;
    const todayReward = amount * Math.pow(dailyYield, daysPassed);
    const tomorrowReward = amount * Math.pow(dailyYield, daysPassed + 1);

    return ((tomorrowReward - todayReward) * passedTimeToday) / oneDay + todayReward;
  };

  const getRemainingTime = () => {
    const oneDay = 3600 * 24;
    const oneHour = 3600;
    const remainingTime = minimumLockTime - currentTime + stakeTimestamp;
    const days = Math.floor(remainingTime / oneDay);
    const hours = Math.floor((remainingTime % oneDay) / oneHour);
    if (remainingTime <= 0) return '0 hours';
    if (days == 0) return `${hours} hours`;
    return `${days} days & ${hours} hours`;
  };
  const setMax = () => {
    const k = Math.pow(10, 5);
    setAmount(Math.floor(tokenBalance * k) / k);
  };
  return (
    <Box className={classes.root}>
      <Box>
        <img src='/img/fire.png' width={60} alt='fire' />
      </Box>
      <Typography variant='body2' className={classes.title}>
        The Bonfire
      </Typography>
      <Typography variant='body2' className={classes.description}>
        Keep the fire going! Auto compounding 1% $BURN yield
      </Typography>
      <Box className={classes.content}>
        <Box className={classes.fireDiv}>
          <Box className={classes.fireImg}>
            {fire ? (
              <img src='/img/nft/fire-on.png' width={220} alt='fire-on' />
            ) : (
              <img src='/img/nft/fire-off.png' width={220} alt='fire-off' />
            )}
          </Box>
          <Box className={classes.amount}>
            {fire
              ? toUSDFormat(getEstimatedAmount(stakedAmount, currentTime), 6)
              : // <InputBase
                //   className={classes.input}
                //   defaultValue={0}
                //   type='number'
                //   value={amount}
                //   onChange={(e) => inputChange(e)}
                //   inputProps={{ 'aria-label': 'search google maps' }}
                // ></InputBase>
                0}
            <Box display={'flex'} alignItems={'center'}>
              <img src='/img/fire.png' width={20} alt='fire' />
              BURN
            </Box>
          </Box>
        </Box>
        <Box className={classes.btnDiv}>
          <Box className={fire ? '' : classes.fireBtnMax}>
            <Button
              variant='contained'
              onClick={() => {
                fire ? unStakeWrite() : stakeBurn();
              }}
              disabled={!isConnected || (fire && stakeTimestamp + 3600 * 72 > currentTime)}
              className={fire ? clsx(classes.btn, classes.blue) : clsx(classes.btn, classes.red)}
            >
              {fire ? (
                <>
                  <img src='/img/nft/drop.png' width={20} alt='drop' />
                  Extinquish fire
                </>
              ) : (
                <>
                  <img src='/img/nft/flame.png' width={20} alt='flame' />
                  Start fire
                </>
              )}
            </Button>
            {!fire && (
              <Paper component='form' className={classes.paperRoot}>
                <Box className={classes.max} onClick={setMax}>
                  Max
                </Box>
                <InputBase
                  className={classes.input}
                  onChange={(e) => inputChange(e)}
                  // onFocus={handlefocus}
                  value={amount}
                  placeholder='0'
                  inputprops={{ 'aria-label': 'search google maps' }}
                  inputComponent={CustomNumberFormat}
                />
                <Box className={classes.icon}>
                  BURN
                  <img src='/img/fire.png' alt='search' width={20} />
                </Box>
              </Paper>
            )}
          </Box>

          {fire && <Box className={classes.remainingTime}>{getRemainingTime()} left</Box>}
        </Box>
      </Box>
    </Box>
  );
};

export default Bonfire;
