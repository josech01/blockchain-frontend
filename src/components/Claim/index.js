import React, { useEffect, useRef, useState } from 'react';
// library
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { usePublicClient, useAccount, useContractWrite } from 'wagmi';
import clsx from 'clsx';

// library-component
import { Box, Typography, Button, Grid, Hidden } from '@material-ui/core';
import { Element } from 'react-scroll';
import { toast } from 'react-toastify';

// utility & constants
import { ethers } from 'ethers';
import { formatEther } from 'viem';
import { convertTime, toUSDFormat, checkLevel } from '../../helpers';
import { wagmiStakeContractConfig } from '../../wagmiConfig/stake';
import { leagueData } from '../../helpers';
import { getLeagueLevel, getNFTs, getStakes, getBalance } from './util';
import { wagmiTYRHConfig } from '../../wagmiConfig/tyrh';
import { wagmiClaimContractConfig } from '../../wagmiConfig/claim';
import { config } from '../../wagmiConfig';

// customComponent
import ClaimCard from './ClaimCard';
import Title from '../Base/Title';
import StakeInfo from './StakeInfo';

// redux actions
import { getMyNfts_, getClaimUserInfo } from '../../reducers/nft.slice';
import { getTexanPrice, updateTimeAmount } from '../../reducers/claim.slice';

// styles
import { useStyles } from './index.styles';

const Claim = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  // const address = '0x00A8aC72bd166067B629F6111ddFde7570cE482a';

  // const isConnected = true;
  const { myNfts, stakeTokenAmount, claimAmount, claimed } = useSelector((state) => state.nft);
  const { claimCards, texanCard, timeCard } = useSelector((state) => state.claim);
  const { texanPrice } = useSelector((state) => state.claim);
  const [originalClaim, setOriginalClaim] = useState(0);
  const [claimTokenData, setClaimTokenData] = useState(claimCards);
  const [bonusClaim, setBonusClaim] = useState(0);
  const publicClient = usePublicClient();
  const [timeLeft, setTimeLeft] = useState();
  const [totalStakeAmount, setTotalStakeAmount] = useState(0);
  const [userStakeAmount, setUserStakeAmount] = useState(0);
  const addressRef = useRef('');
  const [tokenPrice, setTokenPrice] = useState(0);
  const { address, isConnected } = useAccount();
  const [level, setLevel] = useState({});
  const [rewardArr, setRewardArr] = useState([]);
  const newLevel = useRef(0);
  const leagueWeight = useRef(0);
  const updateTotalStakeAmount = async () => {
    const data = await publicClient.readContract({
      ...wagmiStakeContractConfig,
      functionName: 'totalAmount',
    });
    setTotalStakeAmount(Number(formatEther(data)));
  };
  const {
    write: claimWrite,
    data,
    isLoading: isClaimLoading,
  } = useContractWrite({
    ...wagmiClaimContractConfig,
    functionName: 'claim',
    onSuccess: async (data) => {
      await publicClient.waitForTransactionReceipt({ hash: data?.hash });
      toast.success('Successfully Claimed', { theme: 'dark' });
    },
    onError(error) {
      console.log({ error });
    },
  });
  const claim = () => {
    if (claimed) {
      toast.warn('You already claimed', { theme: 'dark' });
      return;
    }
    if (isConnected && claimAmount > 0) {
      claimWrite?.();
    }
  };

  const calculateBoostPercent = () => {
    const level = checkLevel(stakeTokenAmount);
    setLevel(level);
    console.log({ myNfts });
    const claimBoosters = myNfts.filter((item) => item.catId == 0 && item.enabled == true);
    const leaugeBoosters = myNfts.filter((item) => item.catId == 2 && item.enabled == true);
    setRewardArr([]);
    if (claimBoosters.length > 0) {
      let reward = [];
      claimBoosters.forEach((element) => {
        const re = {
          name: 'claim',
          img: element.img,
          percent: element.weight,
        };
        reward.push(re);
      });
      setRewardArr((prev) => [...reward]);
    }
    newLevel.current = level.itemIndex ? level.itemIndex + 1 : 16;
    if (leaugeBoosters.length > 0) {
      let curLeague = 16;

      if (Object.keys(level).length > 0) {
        curLeague = level?.itemIndex + 1;
      }

      const fixedItems = leaugeBoosters.filter((item) => item.isFixed == true);
      let fixedLevel = 16;

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
      const updatedLevel = curLeague - totalBoostLevel;
      newLevel.current = Math.min(fixedLevel, updatedLevel);
    }
    leagueWeight.current = leagueData[newLevel.current - 1]?.claim;
    if (leagueWeight.current > 0) {
      setRewardArr((prev) => [
        ...prev,
        { name: 'league', percent: leagueWeight.current, img: leagueData[newLevel.current - 1]?.img },
      ]);
    }
  };

  const updateClaimAmountEstimation = async () => {
    const stakes = await getStakes();
    const nfts = await getNFTs();

    const leagueNFTs = nfts.filter((nft) => nft.typeId == 8 || nft.typeId == 9);
    const claimNFTs = nfts.filter((nft) => nft.typeId >= 0 && nft.typeId <= 3);
    const liquidNFTs = nfts.filter((nft) => nft.typeId == 5);

    stakes.forEach((stake) => {
      stake.level = getLeagueLevel(stake.amount);
      const ownedLeagueNFTs = leagueNFTs.filter((nft) => nft.receiver.toLowerCase() == stake.account.toLowerCase());
      ownedLeagueNFTs.forEach((nft) => {
        stake.level -= Number(nft.weight);
      });
      if (stake.level < 0) stake.level = 0;
      stake.boost = leagueData[stake.level]?.claim || 0;

      const ownedClaimNFTs = claimNFTs.filter((nft) => nft.receiver.toLowerCase() == stake.account.toLowerCase());
      ownedClaimNFTs.forEach((nft) => {
        stake.boost += Number(nft.weight);
      });
    });

    for (let i = 0; i < liquidNFTs.length; i++) {
      const nft = liquidNFTs[i];
      const stake = stakes.find((item) => item.account.toLowerCase() == nft.receiver.toLowerCase());
      const balance = Number(await getBalance(nft.receiver));
      if (stake) {
        stake.amount += balance;
      } else {
        stakes.push({ account: nft.receiver, amount: balance, boost: 0 });
      }
    }

    let totalAmount = 0;
    stakes.forEach((stake) => {
      stake.amount = stake.amount * (stake.boost / 100 + 1);
      totalAmount += stake.amount;
    });

    const myStake = stakes.find((item) => item.account?.toLowerCase() == addressRef.current.toLowerCase());
    if (myStake) {
      const totalClaimAmount = 3000000000;
      const claimAmount = (totalClaimAmount * myStake.amount) / totalAmount;
      const originalAmount = claimAmount / (1 + myStake.boost / 100);
      const bonusAmount = claimAmount - originalAmount;
      // console.log({ originalAmount });
      setOriginalClaim(Number(originalAmount.toFixed(6)));
      setBonusClaim(Number(bonusAmount.toFixed(6)));
    } else {
      setOriginalClaim(0);
      setBonusClaim(0);
    }
  };

  const updateUserStakingInfo = async () => {
    const data = await publicClient.readContract({
      ...wagmiStakeContractConfig,
      functionName: 'userStakingInfo',
      args: [addressRef.current],
    });
    setUserStakeAmount(Number(formatEther(data[0])));
  };
  const updateAllInfo = () => {
    updateTotalStakeAmount();
    if (isConnected) {
      dispatch(getClaimUserInfo({ publicClient, address }));

      updateUserStakingInfo();
    } else {
      setUserStakeAmount(0);
    }
  };
  // const getTimePrice = async () => {
  //   const result = await axios.get(
  //     'https://api.dexscreener.com/latest/dex/pairs/pulsechain/0xefab2c9c33c42960f2ff653adb39dc5c4c10630e'
  //   );

  //   setTokenPrice(Number(result?.data.pair.priceUsd));
  // };

  useEffect(() => {
    setTimeLeft(convertTime());
    const interval = setInterval(() => {
      setTimeLeft(convertTime());
    }, 600000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  // const updateTimeAmount = async () => {
  //   const data = await publicClient.readContract({
  //     ...wagmiTYRHConfig,
  //     address: '0xCA35638A3fdDD02fEC597D8c1681198C06b23F58',
  //     functionName: 'balanceOf',
  //     args: [config.claimAddress],
  //   });
  //   // console.log({ data });
  //   setClaimTokenData(
  //     claimCards.map((item) => {
  //       if (item.name == 'time') {
  //         return { ...item, balance: Number(ethers.utils.formatEther(data)).toFixed(6) };
  //       }
  //       return item;
  //     })
  //   );
  // };

  useEffect(() => {
    // getTimePrice();
    dispatch(getTexanPrice())
      .unwrap()
      .then(() => {
        setTokenPrice(texanPrice);
      });
    dispatch(updateTimeAmount(publicClient));
    const k = setInterval(() => {
      dispatch(updateTimeAmount(publicClient));
    }, 10000);
    return () => {
      clearInterval(k);
    };
  }, []);
  useEffect(() => {
    addressRef.current = address;
    updateAllInfo();
    if (isConnected) setTimeout(() => dispatch(getMyNfts_(addressRef.current)), 1500);
  }, [address, isConnected]);

  useEffect(() => {
    calculateBoostPercent();
    updateClaimAmountEstimation();
  }, [myNfts]);
  return (
    <Element name='claim'>
      <Box className={classes.root}>
        <Title
          title='Claim tokens every 30 days'
          description='Your claimed amount depends on your stake %'
          star={true}
        />
        <Grid container>
          <Grid item md={4} sm={12} xs={12} className={classes.containerDiv}>
            <Box className={classes.title}>
              <img src='/tyrh.png' width={30} alt='tyrh' />
              Upcoming
            </Box>
            <Box className={classes.comingCardDiv}>
              {claimTokenData.map((item, index) => (
                <ClaimCard item={item} key={index} />
              ))}
            </Box>
          </Grid>
          <Grid item md={4} sm={12} xs={12} className={clsx(classes.containerDiv, classes.center)}>
            <Box className={clsx(classes.title, classes.liveTitle)}>
              <Box className={classes.redDot}></Box>
              live
            </Box>
            <Box className={classes.greenShadow}>
              <ClaimCard item={texanCard} />
            </Box>
            <Box className={classes.timeLeft}>{timeLeft}</Box>
            <Box className={classes.description}>STAKING SNAPSHOT</Box>
            <Hidden mdUp>
              <StakeInfo
                isConnected={isConnected}
                userStakeAmount={userStakeAmount}
                originalClaim={originalClaim}
                bonusClaim={bonusClaim}
                tokenPrice={tokenPrice}
                rewardArr={rewardArr}
              />
            </Hidden>
          </Grid>
          <Grid item md={4} sm={12} xs={12} className={clsx(classes.containerDiv, classes.center)}>
            <Box className={classes.title}>
              <img src='/img/greentyrh.png' width={30} alt='completed' />
              Completed
            </Box>
            <ClaimCard item={timeCard} />
            <Button
              disabled={claimAmount == 0 || isClaimLoading}
              onClick={claim}
              variant='contained'
              className={classes.claimBtn}
            >
              <img src='/img/dollars.png' alt='fire' width={20} />
              Claim now
            </Button>
          </Grid>
        </Grid>
        <Hidden mdDown>
          <StakeInfo
            isConnected={isConnected}
            userStakeAmount={userStakeAmount}
            originalClaim={originalClaim}
            bonusClaim={bonusClaim}
            tokenPrice={tokenPrice}
            rewardArr={rewardArr}
          />
        </Hidden>
      </Box>
    </Element>
  );
};

export default Claim;
