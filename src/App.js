import React, { useState, useEffect } from 'react';

import { Container, CssBaseline, Grid } from '@material-ui/core';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import { Provider } from 'react-redux';
import { store } from './reducers';
// import Web3 from 'web3';
// import Web3Modal from 'web3modal';

// import { WalletConnectConnector } from '@web3-react/walletconnect-connector';

// import Config from './config';

import Topbar from './components/Topbar';
import Navbar from './components/Navbar';
import Swap from './components/Swap';
import Faq from './components/Faq';
// import Backers from './components/Backers';
import Burn from './components/Burn';
import Claim from './components/Claim';
import ScrollTop from './components/ScrollTop';
import Staking from './components/Staking';
import LeaderBoard from './components/LeaderBoard';
import League from './components/League';
import Mint from './components/Mint';
import ScreenShot from './components/ScreenShot';
import Bonfire from './components/Bonfire';

// web3modal

import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum';
import { Web3Modal } from '@web3modal/react';

// wagmi
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { pulsechain } from 'wagmi/chains';
// actions

// customize theme
import 'react-toastify/dist/ReactToastify.css';
import './App.scss';

// web3modal config

const chains = [pulsechain];
const projectId = 'e63ebc6ff548793128480d1cb5638ce8';
const { publicClient } = configureChains(chains, [w3mProvider({ projectId })]);

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, chains }),
  publicClient,
});
const ethereumClient = new EthereumClient(wagmiConfig, chains);
const theme = createTheme({
  palette: {
    gray: {
      main: '#37383a',
    },
    project: {
      background: { primary: '#131416', secondary: '#2d2e32' },
      green: '#06ff3b',
      red: '#de5751',
      gray: '#818181',
    },
  },
});

const App = (props) => {
  // const [burnRanks, setBurnRanks] = useState({ pls: [], hex: [], plsx: [], inc: [] });
  // const getBurnRank = async () => {
  //   const { data } = await axios.get('https://backend.tyrh.io/info/burn-rank');
  //   setBurnRanks(data);
  // };

  return (
    <>
      <Provider store={store}>
        <WagmiConfig config={wagmiConfig}>
          <ThemeProvider theme={theme}>
            <div className='App'>
              <CssBaseline />
              <Topbar />
              <Navbar />
              <Container maxWidth='lg'>
                <Burn />
                <Swap />
                <Claim />
                <Mint />
                <Staking />
                <Bonfire />

                {/* <Grid container>
                  <Grid item lg={6} md={12}>
                    <Staking />
                  </Grid>
                  <Grid item lg={6} md={12}>
                    <Bonfire />
                  </Grid>
                </Grid> */}
                <League />
                <ScreenShot />
                <Faq />
                <LeaderBoard />
                {/* <Backers /> */}
              </Container>
              <ScrollTop />
            </div>
          </ThemeProvider>
        </WagmiConfig>
        <Web3Modal projectId={projectId} themeMode='dark' ethereumClient={ethereumClient} />
      </Provider>
    </>
  );
};

export default App;
