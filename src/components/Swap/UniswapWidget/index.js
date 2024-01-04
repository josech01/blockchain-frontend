import React from 'react';
import '@uniswap/widgets/dist/fonts.css';
import { darkTheme, lightTheme, Theme, SwapWidget } from '@uniswap/widgets';

import './index.scss';
const UniswapWidget = (props) => {
  const CUSTOM_TOKEN_LIST = [
    {
      name: 'PLSIOU',
      address: '0xa4C5CF93CBc87b82fBa152E0EDe4BbC5264C24ef',
      symbol: 'PLSIOU',
      decimals: 18,
      chainId: 1,
      logoURI: 'https://bafkreicpvpbsbtw5zpqb7f7pgl7v47nsianea5japvlqzsnaspbf3g4ziu.ipfs.nftstorage.link',
    },
    {
      name: 'USDC',
      address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
      symbol: 'USDC',
      decimals: 6,
      chainId: 1,
      logoURI: 'https://s2.coinmarketcap.com/static/img/coins/64x64/3408.png',
    },
    {
      name: 'HEX',
      address: '0x2b591e99afE9f32eAA6214f7B7629768c40Eeb39',
      symbol: 'HEX',
      decimals: 8,
      chainId: 1,
      logoURI: 'https://s2.coinmarketcap.com/static/img/coins/64x64/5015.png',
    },
    {
      name: 'XEN',
      address: '0x06450dEe7FD2Fb8E39061434BAbCFC05599a6Fb8',
      symbol: 'XEN',
      decimals: 18,
      chainId: 1,
      logoURI: 'https://s2.coinmarketcap.com/static/img/coins/64x64/22118.png',
    },
    {
      name: 'HDRN',
      address: '0x3819f64f282bf135d62168c1e513280daf905e06',
      symbol: 'HDRN',
      decimals: 9,
      chainId: 1,
      logoURI: 'https://s2.coinmarketcap.com/static/img/coins/64x64/18687.png',
    },
    {
      name: 'MAXI',
      address: '0x0d86EB9f43C57f6FF3BC9E23D8F9d82503f0e84b',
      symbol: 'MAXI',
      decimals: 8,
      chainId: 1,
      logoURI: 'https://s2.coinmarketcap.com/static/img/coins/64x64/19837.png',
    },
    {
      name: 'PLSD',
      address: '0x34F0915a5f15a66Eba86F6a58bE1A471FB7836A7',
      symbol: 'PLSD',
      decimals: 12,
      chainId: 1,
      logoURI: 'https://s2.coinmarketcap.com/static/img/coins/64x64/21285.png',
    },
    {
      name: 'ICSA',
      address: '0xfc4913214444aF5c715cc9F7b52655e788A569ed',
      symbol: 'ICSA',
      decimals: 9,
      chainId: 1,
      logoURI: 'https://s2.coinmarketcap.com/static/img/coins/64x64/22129.png',
    },
  ];
  // Use the native token of the connected chain as the default input token
  const PLSIOU = '0xa4C5CF93CBc87b82fBa152E0EDe4BbC5264C24ef'; // Special address for native token

  // WBTC as the default output token
  const USDC = '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48';

  const myLightTheme = {
    ...lightTheme, // Extend the lightTheme
    accent: '#FF007A',
    primary: '#000000',
    secondary: '#565A69',
  };

  const myDarkTheme = {
    ...darkTheme, // Extend the darkTheme
    accent: '#2172E5',
    primary: '#FFFFFF',
    secondary: '#888D9B',
  };

  let darkMode = true;
  return (
    <div className='Uniswap'>
      <SwapWidget
        tokenList={CUSTOM_TOKEN_LIST}
        defaultOutputTokenAddress={PLSIOU}
        // defaultInputAmount={2}
        defaultInputTokenAddress={USDC}
        width={320}
        theme={darkMode ? myDarkTheme : myLightTheme}
        permit2={true}
      />
    </div>
  );
};

export default UniswapWidget;
