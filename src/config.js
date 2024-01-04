const gameConfig = {
  test: {
    chain: 'testnet',
    chainName: 'Binance Smart Chain Testnet',
    coinName: 'Testnet BNB',
    symbol: 'TBNB',
    chainID: 97,
    chainIDHex: 0x61,
    explorerUrl: 'https://testnet.bscscan.com',
    redeemAddress: '0x01EBa90a0442ce3b1AA275D18c23f8aA407981Db',
    tokenAddress: '0xf4D3C48c8b0D0C50aAA6935914ACfE772716B25F',
    plsiouAddress: '0xa4C5CF93CBc87b82fBa152E0EDe4BbC5264C24ef',
    providerList: [
      'https://data-seed-prebsc-1-s1.binance.org:8545/',
      'https://data-seed-prebsc-2-s1.binance.org:8545/',
    ],
  },
  main: {
    chain: 'mainnet',
    chainName: 'Binance Smart Chain Mainnet',
    coinName: 'Binance Coin',
    symbol: 'BNB',
    chainID: 56,
    chainIDHex: 0x38,
    explorerUrl: 'https://bscscan.com',
    providerList: [
      'https://bsc-dataseed4.ninicoin.io',
      'https://bscrpc.com',
      'https://bsc-dataseed2.ninicoin.io',
      'https://bsc-mainnet.nodereal.io/v1/64a9df0874fb4a93b9d0a3849de012d3',
      'https://bsc-dataseed1.ninicoin.io',
      'https://bsc-dataseed3.ninicoin.io',
      'https://bsc-mainnet.public.blastapi.io',
      'https://rpc.ankr.com/bsc',
    ],
  },
  tPulse: {
    chain: 'pulsechain testnet',
    chainName: 'Pulsechain Testnet V4',
    coinName: 'tPLS',
    symbol: 'tPLS',
    chainID: 943,
    chainIDHex: 0x3af,
    explorerUrl: 'https://scan.v4.testnet.pulsechain.com',
    redeemAddress: '0x965D343abE0d34a6e6c3A25136F86928f3FE65f6',
    tokenAddress: '0xB1C0f86B072393F731Cb7b9D56Aa276aa421Eb40',
    plsiouAddress: '0xa4C5CF93CBc87b82fBa152E0EDe4BbC5264C24ef',
    providerList: ['https://rpc.v4.testnet.pulsechain.com'],
    hotwalletAddress: '0x41D6824A64859Ae035122F4966F5AEA4F3e07B5C',
  },
};

const config = gameConfig.tPulse;
const randomId = Math.ceil(Math.random() * config.providerList.length) % config.providerList.length;
const rpcUrl = config.providerList[randomId];
const serverUrl = 'https://backend.tyrh.io';
// const serverUrl = 'http://134.122.122.58';
// const serverUrl = 'http://104.234.10.128:80';

const siteKey = '6Lc6gBImAAAAAKGpMJpSJwHmdD47KB6foe3kq2TR';

export default { ...config, rpcUrl, serverUrl, siteKey };
