import React from 'react';
import { Grid, Box, Hidden, Paper, Typography, Tooltip, Fade, useMediaQuery } from '@material-ui/core';
import { Element } from 'react-scroll';
import InputBase from '@material-ui/core/InputBase';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Chart from './Chart';
// viem
import { createWalletClient, custom } from 'viem';
import { pulsechain } from 'viem/chains';
import { useAccount } from 'wagmi';
// import UniswapWidget from './UniswapWidget';
import { useStyles } from './index.styles';
import clsx from 'clsx';
import { config } from '../../wagmiConfig';

const tyrhInfo = [
  {
    img: 'plsx',
    name: 'PulseX',
    link: 'https://v2-app.pulsex.com/swap?outputCurrency=0xc91562626B9a697af683555dA9946986278Ac9a5&chain=pulsechain',
  },
  {
    img: 'dexscreener',
    name: 'Dexscreener',
    link: 'https://dexscreener.com/pulsechain/0x2eff73dca3edb60019834a21758a468cbb22eb4c',
  },
  {
    img: 'pls',
    name: 'PulseScan',
    link: 'https://scan.pulsechain.com/address/0xc91562626B9a697af683555dA9946986278Ac9a5',
  },
];

const burnInfo = [
  {
    img: 'plsx',
    name: 'PulseX',
    link: 'https://v2-app.pulsex.com/swap?outputCurrency=0xe20CCe146Eb2223B486C99B1d4a1a4200AeCD979&chain=pulsechain',
  },
  {
    img: 'dexscreener',
    name: 'Dexscreener',
    link: 'https://dexscreener.com/pulsechain/0xfb8c89196d48dfd446acfa27b7ff67ba646c3736',
  },
  {
    img: 'pls',
    name: 'PulseScan',
    link: 'https://scan.pulsechain.com/address/0xe20CCe146Eb2223B486C99B1d4a1a4200AeCD979',
  },
];

const Swap = () => {
  const classes = useStyles();
  const { isConnected } = useAccount();
  const mdBreakPoint = useMediaQuery((theme) => theme.breakpoints.down('sm'));
  // console.log({ mdBreakPoint });
  const addToken = async (tokenName) => {
    if (isConnected) {
      const walletClient = createWalletClient({
        chain: pulsechain,
        transport: custom(window.ethereum),
      });
      if (tokenName == 'TYRH') {
        const success = await walletClient.watchAsset({
          type: 'ERC20',
          options: {
            address: config.tyrhAddress,
            decimals: 18,
            symbol: 'TYRH',
          },
        });
      } else {
        const success = await walletClient.watchAsset({
          type: 'ERC20',
          options: {
            address: config.burnTokenAddress,
            decimals: 18,
            symbol: 'BURN',
          },
        });
      }
    } else toast.warn('please connect your wallet', { theme: 'dark' });
  };
  const copyToClipboard = async (address) => {
    console.log('ss');
    await navigator.clipboard.writeText(address);
    // .then(() => {
    toast(
      <div className={classes.toastContent}>
        <img src='img/check (1).png' width='15px' alt='check' />
        Copied!
      </div>,
      {
        position: 'top-center',
        autoClose: 2000,
        hideProgressBar: true,
        toastClassName: 'toast-message',
        bodyClassName: 'toast-message-body',
        style: {
          height: '40px',
          minHeight: '30px',
          background: '#0d111c',
          border: '1px solid #4a63bd',
          borderRadius: '10px',
          boxShadow: 'rgba(75, 131, 251, 0.16) 0px 40px 1',
        },
      }
    );
    // })
    // .catch((err) => console.error('Failed to copy:', err));
  };
  return (
    <Element name='swap'>
      <Grid container className={classes.root}>
        <Grid
          item
          lg={6}
          md={12}
          sm={12}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <ToastContainer />
          <Box className={classes.titleDiv}>
            <img src='/tyrh.png' alt='heart' width={50} />
            <Box className={classes.title} position={'relative'}>
              How to buy #TYRH
            </Box>
            <Box className={classes.caption}>#TYRH Contract address</Box>
          </Box>
          <Box className={classes.slipDiv}>
            <Tooltip
              title='When buying #TYRH 22% of the value is spent on burning RH tokens.  To trade #TYRH you need to set your slippage settings to at least 30%'
              placement='top'
              classes={{ tooltip: classes.tooltip }}
              TransitionComponent={Fade}
              TransitionProps={{ timeout: 600 }}
            >
              <Box className={clsx(classes.slipbar, classes.green)}>BUY SLIPPAGE 30%</Box>
            </Tooltip>
            <Tooltip
              title='When selling #TYRH 10% of the value is spent on burning RH tokens.  To trade #TYRH you need to set your slippage settings to at least 12%'
              placement='top'
              classes={{ tooltip: classes.tooltip }}
              TransitionComponent={Fade}
              TransitionProps={{ timeout: 600 }}
            >
              <Box className={clsx(classes.slipbar, classes.red)}>SELL SLIPPAGE 12%</Box>
            </Tooltip>
          </Box>
          <Box display={`flex`} alignItems={`center`} justifyContent={`center`}>
            <Paper component='form' className={classes.paperRoot}>
              <InputBase
                className={classes.input}
                inputProps={{ 'aria-label': 'search google maps' }}
                readOnly
                style={{ textAlign: 'center' }}
                value={config.tyrhAddress}
              />
              <Box className={classes.icon} onClick={() => copyToClipboard(config.tyrhAddress)}>
                <img src='/img/copy.png' alt='search' width={15} />
              </Box>
            </Paper>
          </Box>
          <Box className={classes.itemDiv}>
            {tyrhInfo.map((item, index) => (
              <a target='_blank' href={item.link} key={index}>
                <Box className={classes.buyItem}>
                  <img src={`/img/${item.img}.png`} width={45} alt='token' />
                  <Typography variant='body2'> {item.name} </Typography>
                </Box>
              </a>
            ))}
            <Box className={classes.buyItem} onClick={() => addToken('TYRH')}>
              <Tooltip
                title='Add TYRH Token to your MetaMask'
                placement='top'
                classes={{ tooltip: classes.tooltip }}
                TransitionComponent={Fade}
                TransitionProps={{ timeout: 600 }}
              >
                <>
                  <img src='/img/metamask.svg' alt='metamask' width={45} />
                  <Typography variant='body2'>Add to Metamask</Typography>
                </>
              </Tooltip>
            </Box>
          </Box>
        </Grid>
        {mdBreakPoint && (
          <Grid md={12} lg={6} sm={12} item className={classes.chartDiv}>
            <Chart />
          </Grid>
        )}
        <Grid
          item
          lg={6}
          md={12}
          sm={12}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <ToastContainer />
          <Box className={classes.titleDiv}>
            <Box className={classes.warning}>
              <img src='/img/warning.png' alt='warning' className={classes.warnImg} width={50} />
              <Typography>
                YOU GET Free <img src='/img/fire.png' alt='fire' width={20} />
                $BURN when you stake #TYRH
              </Typography>
              <Box className={classes.arrow}></Box>
            </Box>
            <img src='/img/fire.png' alt='fire' width={50} />
            <Box className={classes.title} position={'relative'}>
              How to buy $BURN
            </Box>
            <Box className={classes.caption}>#BURN Contract address</Box>
          </Box>
          <Box className={classes.slipDiv}>
            <Box className={clsx(classes.slipbar, classes.green)}>buy tax 0%</Box>
            <Box className={clsx(classes.slipbar, classes.red)}>sell tax 0%</Box>
          </Box>
          <Box display={`flex`} alignItems={`center`} justifyContent={`center`}>
            <Paper component='form' className={classes.paperRoot}>
              <InputBase
                className={classes.input}
                inputProps={{ 'aria-label': 'search google maps' }}
                readOnly
                style={{ textAlign: 'center' }}
                value={config.burnTokenAddress}
              />
              <Box className={classes.icon} onClick={() => copyToClipboard(config.burnTokenAddress)}>
                <img src='/img/copy.png' alt='search' width={15} />
              </Box>
            </Paper>
          </Box>
          <Box className={classes.itemDiv}>
            {burnInfo.map((item, index) => (
              <a target='_blank' href={item.link} key={index}>
                <Box className={classes.buyItem}>
                  <img src={`/img/${item.img}.png`} width={45} alt='token' />
                  <Typography variant='body2'> {item.name} </Typography>
                </Box>
              </a>
            ))}
            <Box className={classes.buyItem} onClick={() => addToken('BURN')}>
              <Tooltip
                title='Add BURN Token to your MetaMask'
                placement='top'
                classes={{ tooltip: classes.tooltip }}
                TransitionComponent={Fade}
                TransitionProps={{ timeout: 600 }}
              >
                <>
                  <img src='/img/metamask.svg' alt='metamask' width={45} />
                  <Typography variant='body2'>Add to Metamask</Typography>
                </>
              </Tooltip>
            </Box>
          </Box>
        </Grid>
        {mdBreakPoint && (
          <Grid md={12} lg={6} sm={12} item className={classes.chartDiv}>
            <Chart token={'BURN'} />
          </Grid>
        )}
      </Grid>
      {/* {mdBreakPoint && (
        <Grid container justifyContent='center'>
          <Box className={classes.subDiv}>
            <img src='/img/think.png' alt='think' width={60} />
            <Typography variant='body2' className={classes.title}>
              Did you know?
            </Typography>
            <Typography variant='body2' className={classes.description}>
              You get more $BURN tokens by staking #TYRH than directly purchasing $BURN on the market.
            </Typography>
          </Box>
        </Grid>
      )} */}
      {!mdBreakPoint && (
        <>
          <Grid container className={classes.root}>
            <Grid md={12} lg={6} sm={12} item className={classes.chartDiv}>
              <Chart />
            </Grid>
            <Grid md={12} lg={6} sm={12} item className={classes.chartDiv}>
              <Chart token={'BURN'} />
            </Grid>
          </Grid>
          {/* <Grid container justifyContent='center'>
            <Box className={classes.subDiv}>
              <img src='/img/think.png' alt='think' width={60} />
              <Typography variant='body2' className={classes.title}>
                Did you know?
              </Typography>
              <Typography variant='body2' className={classes.description}>
                You get more $BURN tokens by staking #TYRH than directly purchasing $BURN on the market.
              </Typography>
            </Box>
          </Grid> */}
        </>
      )}
      {/* <Grid item md={5} lg={3} sm={12} className='uniswap-div'>
          <UniswapWidget />
        </Grid> */}
    </Element>
  );
};

export default Swap;
