import React from 'react';
import './index.scss';
const Chart = ({ token }) => {
  return (
    // <div id='dexscreener-embed'>
    //   <iframe
    //     title='chart'
    //     src='https://dexscreener.com/ethereum/0x69D91B94f0AaF8e8A2586909fA77A5c2c89818d5?embed=1&theme=dark&trades=0&info=0'
    //   ></iframe>
    // </div>
    <div id="dexscreener-embed">
      <iframe
        src={`https://dexscreener.com/pulsechain/${
          token == 'BURN' ? '0xfb8c89196d48dfd446acfa27b7ff67ba646c3736' : '0x2Eff73Dca3eDB60019834A21758A468cbb22EB4c'
        }?embed=1&theme=dark&trades=0&info=0`}
      ></iframe>
    </div>
  );
};
export default Chart;
