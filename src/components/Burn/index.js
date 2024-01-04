import React, { useEffect, useState } from 'react';
import { makeStyles, Box, Typography, Button, Grid } from '@material-ui/core';
import clsx from 'clsx';
import axios from 'axios';
// wagmi
import { wagmiBurnPoolContractConfig } from '../../wagmiConfig/burnPool';

import { useContractRead, useContractWrite, useWaitForTransaction, useBalance, usePublicClient } from 'wagmi';
// endwagmi
import { Element } from 'react-scroll';
import BurnCard from './BurnCard';
import Title from '../Base/Title';
import { config } from '../../wagmiConfig/index';
import { useStyles } from './index.styles';
import { toast } from 'react-toastify';
import WalletBtn from '../Base/WalletBtn';
import { useAccount } from 'wagmi';
import BurnItem from './BurnItem';
import './index.scss';
let eventSource = null;

const Burn = (props) => {
  const classes = useStyles();
  const [plsSplash, setPlsSplash] = useState(false);
  const [hexSplash, setHexSplash] = useState(false);
  const [plsxSplash, setPlsxSplash] = useState(false);
  const [incSplash, setIncSplash] = useState(false);
  const [splash, setSplash] = useState({ pls: false, plsx: false, hex: false, inc: false });
  const { isConnected, address } = useAccount();
  const publicClient = usePublicClient();
  const [burnStats, setBurnStats] = useState({
    pls: { name: 'pls', balance: 0, price: 0 },
    plsx: { name: 'plsx', balance: 0, price: 0 },
    hex: { name: 'hex', balance: 0, price: 0 },
    inc: { name: 'inc', balance: 0, price: 0 },
  });
  const [totalBurn, setTotalBurn] = useState({
    pls: { name: 'pls', balance: 0, price: 0 },
    plsx: { name: 'plsx', balance: 0, price: 0 },
    hex: { name: 'hex', balance: 0, price: 0 },
    inc: { name: 'inc', balance: 0, price: 0 },
  });
  // const [plsBalance, setPlsBalance] = useState({ balance: 0, unit: 'PLS', token: 'pls' });
  // const [hexBalance, setHexBalance] = useState({ balance: 0, unit: 'HEX', token: 'hex' });
  // const [plsxBalance, setPlsxBalance] = useState({ balance: 0, unit: 'PLSX', token: 'plsx' });
  // const [incBalance, setIncBalance] = useState({ balance: 0, unit: 'INC', token: 'inc' });
  // wagmi

  const { write, data, error, isLoading, isError } = useContractWrite({
    ...wagmiBurnPoolContractConfig,
    functionName: 'burn',
    onSuccess: async (data) => {
      await publicClient.waitForTransactionReceipt({ hash: data.hash });
      toast.success('Successfully burnt', { theme: 'dark' });
    },
  });
  const { data: receipt, isLoading: isPending, isSuccess } = useWaitForTransaction({ hash: data?.hash });

  const { refetch: refetchPls } = useBalance({
    address: config.burnPoolAddress,
    chainId: 369,
    onSuccess(data) {
      // setPlsBalance({ ...plsBalance, balance: Number(data.formatted) });
      setBurnStats((prev) => ({ ...prev, pls: { ...prev.pls, balance: Number(data.formatted) } }));
    },
  });
  const { refetch: refetchHex } = useBalance({
    address: config.burnPoolAddress,
    token: config.pHexAddress,
    chainId: 369,
    onSuccess(data) {
      // setHexBalance({ ...hexBalance, balance: Number(data.formatted) });
      setBurnStats((prev) => ({ ...prev, hex: { ...prev.hex, balance: Number(data.formatted) } }));
    },
  });
  const { refetch: refetchPlsx } = useBalance({
    address: config.burnPoolAddress,
    token: config.PlsxAddress,
    chainId: 369,
    onSuccess(data) {
      // setPlsxBalance({ ...plsxBalance, balance: Number(data.formatted) });
      setBurnStats((prev) => ({ ...prev, plsx: { ...prev.plsx, balance: Number(data.formatted) } }));
    },
  });
  const { refetch: refetchInc } = useBalance({
    address: config.burnPoolAddress,
    token: config.IncAddress,
    chainId: 369,
    onSuccess(data) {
      // setIncBalance({ ...incBalance, balance: Number(data.formatted) });
      setBurnStats((prev) => ({ ...prev, inc: { ...prev.inc, balance: Number(data.formatted) } }));
    },
  });
  const burn = () => {
    write();
  };
  const triggerSplash = (card) => {
    // if (card == 'pls') {
    setSplash((prev) => ({ ...prev, [card]: true }));
    setTimeout(() => {
      setSplash((prev) => ({ ...prev, [card]: false }));
    }, 1500);
    // } else if (card == 'hex') {
    //   setHexSplash(true);
    //   setTimeout(() => {
    //     setHexSplash(false);
    //   }, 1500);
    // } else if (card == 'plsx') {
    //   setPlsxSplash(true);
    //   setTimeout(() => {
    //     setPlsxSplash(false);
    //   }, 1500);
    // } else if (card == 'inc') {
    //   setIncSplash(true);
    //   setTimeout(() => {
    //     setIncSplash(false);
    //   }, 1500);
    // }
  };
  const getTokenPrice = async () => {
    const plsPrice = await axios.get(
      'https://api.dexscreener.com/latest/dex/pairs/pulsechain/0x6753560538eca67617a9ce605178f788be7e524e'
    );
    const plsxPrice = await axios.get(
      'https://api.dexscreener.com/latest/dex/pairs/pulsechain/0x1b45b9148791d3a104184cd5dfe5ce57193a3ee9'
    );
    const hexPrice = await axios.get(
      'https://api.dexscreener.com/latest/dex/pairs/pulsechain/0xf1f4ee610b2babb05c635f726ef8b0c568c8dc65'
    );
    const incPrice = await axios.get(
      'https://api.dexscreener.com/latest/dex/pairs/pulsechain/0xf808bb6265e9ca27002c0a04562bf50d4fe37eaa'
    );
    if (plsPrice.status == 200) {
      setBurnStats((prev) => ({ ...prev, pls: { ...prev.pls, price: Number(plsPrice.data.pair.priceUsd) } }));
      setTotalBurn((prev) => ({ ...prev, pls: { ...prev.pls, price: Number(plsPrice.data.pair.priceUsd) } }));
    }
    if (plsxPrice.status == 200) {
      setBurnStats((prev) => ({ ...prev, plsx: { ...prev.plsx, price: Number(plsxPrice.data.pair.priceUsd) } }));
      setTotalBurn((prev) => ({ ...prev, plsx: { ...prev.plsx, price: Number(plsxPrice.data.pair.priceUsd) } }));
    }
    if (hexPrice.status == 200) {
      setBurnStats((prev) => ({ ...prev, hex: { ...prev.hex, price: Number(hexPrice.data.pair.priceUsd) } }));
      setTotalBurn((prev) => ({ ...prev, hex: { ...prev.hex, price: Number(hexPrice.data.pair.priceUsd) } }));
    }
    if (incPrice.status == 200) {
      setBurnStats((prev) => ({ ...prev, inc: { ...prev.inc, price: Number(incPrice.data.pair.priceUsd) } }));
      setTotalBurn((prev) => ({ ...prev, inc: { ...prev.inc, price: Number(incPrice.data.pair.priceUsd) } }));
    }
    // console.log({ plsPrice, plsxPrice, hexPrice, incPrice });
  };
  const getBurnStat = async () => {
    const {
      data: { burnAmount },
    } = await axios.get('https://backend.tyrh.io/info/total-burn');
    // console.log({ burnAmount });
    // const { burnAmount } = data;

    if (Object.keys(burnAmount[0]).length > 0) {
      for (const token in burnAmount[0]) {
        setTotalBurn((prev) => ({ ...prev, [token]: { ...prev[token], balance: burnAmount[0][token] } }));
      }
    }
  };
  useEffect(() => {
    getBurnStat();
    getTokenPrice();
    if (eventSource) {
      eventSource.close();
    }
    const newEventSource = new EventSource(`https://backend.tyrh.io/events`);
    newEventSource.onmessage = (e) => {
      if (e.data.includes('welcome')) {
      }
      if (e.data.includes('name')) {
        const res = JSON.parse(e.data);
        console.log({ res });
        const { data } = res;
        switch (res.name) {
          case 'SwappedFee':
            refetchHex();
            refetchInc();
            refetchPls();
            refetchPlsx();
            // triggerSplash(data.swapToken);
            // console.log({ res });
            break;
          case 'RHTokenBurnt':
            refetchHex();
            refetchInc();
            refetchPls();
            refetchPlsx();
            setTotalBurn((prev) => ({
              ...prev,
              [data.swapToken]: {
                ...prev[data.swapToken],
                balance: prev[data.swapToken].balance + Number(data.amount),
              },
            }));
            if (Number(data.amount) > 0) {
              triggerSplash(data.swapToken);
            }
            break;
          default:
            break;
        }
      }
    };
    eventSource = newEventSource;
    return () => {
      if (eventSource) eventSource.close();
    };
  }, []);

  return (
    <Element name="burn">
      <Box className={classes.root}>
        {/* <Box>{data?.toString()}</Box> */}
        <Title
          title="Support RH Ecosystem with #TYRH"
          description="Memecoin with ecosystem wide burns & RH Wallet allocation"
          star={true}
        />
        <WalletBtn />
        {/* <Box position={`relative`}>
          <Button variant='contained' className={classes.burnBtn} onClick={burn}>
            Burn all now! <img src='/img/fire.png' alt='fire' width={20} />
          </Button>
          <Box className={classes.hand}>
            <img src='/img/hand.png' alt='hand' width={42} />
          </Box>
        </Box> */}
      </Box>
      {/* <Box className={classes.cardContainer}>
        <BurnCard item={plsBalance} splash={plsSplash} />
        <BurnCard item={hexBalance} splash={hexSplash} />
        <BurnCard item={plsxBalance} splash={plsxSplash} />
        <BurnCard item={incBalance} splash={incSplash} />
      </Box> */}
      <Grid container className={classes.burnStatDiv}>
        <Grid item md={6} sm={12} className={classes.marginAuto}>
          <Box className={classes.statCard}>
            <Box className={classes.fireDiv}>
              <img src="/img/fire.png" alt="fire" width={60} />
            </Box>

            <Typography variant="h6" className={clsx(classes.cardTitle, `golden`)}>
              Global burn statistics
            </Typography>
            <Box className={classes.tyrhDiv}>
              <Box className={classes.tyrhImgDiv}>
                <img src="/tyrh.png" alt="tyrh" width={25} height={25} />
              </Box>
              <Typography variant="h6">TYRH</Typography>
            </Box>
            {/* <Button onClick={() => triggerSplash('pls')}>splash</Button> */}
            <Box id="global-burn-stats" className={classes.burnItemDiv}>
              {Object.entries(totalBurn).map(([key, value], index) => (
                <BurnItem
                  key={index}
                  name={key}
                  price={value.price}
                  last={Object.keys(totalBurn).length == index + 1}
                  balance={value.balance}
                  fire={false}
                  flash={splash[key]}
                />
              ))}
            </Box>
          </Box>
        </Grid>
        <Grid item md={6} sm={12} className={classes.marginAuto}>
          <Box className={classes.statCard}>
            <Box className={classes.fireDiv}>
              <img src="/img/fire.png" alt="fire" width={60} />
            </Box>
            <Typography variant="h6" className={clsx(classes.cardTitle, classes.white)}>
              Available to burn
            </Typography>
            <Box className={classes.tyrhDiv}>
              <Button variant="contained" disabled={isLoading} className={classes.fireBtn} onClick={burn}>
                <img src="/img/fire.png" alt="fire" width={25} />
                Burn baby burn!
              </Button>

              <Box className={classes.hand}>
                <img src="/img/hand.png" alt="hand" width={42} />
              </Box>
            </Box>
            <Box className={classes.burnItemDiv}>
              {Object.entries(burnStats).map(
                ([key, value], index) =>
                  value.balance > 0 && (
                    <BurnItem
                      name={key}
                      key={index}
                      price={value.price}
                      last={Object.keys(burnStats).length == index + 1}
                      balance={value.balance}
                      fire={true}
                    />
                  )
              )}
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Element>
  );
};

export default Burn;
