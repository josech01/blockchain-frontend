import Web3 from 'web3';
import axios from 'axios';

import { config } from '../../wagmiConfig';
import abi from '../../abis/erc20.json';
import { ethers } from 'ethers';
const providerUrl = `https://rpc.pulsechain.com`;
const tokenAddress = config.tyrhAddress;
const web3 = new Web3(new Web3.providers.HttpProvider(providerUrl));

export const getBalance = async (address) => {
  const contract = new web3.eth.Contract(abi, tokenAddress);
  const result = await contract.methods.balanceOf(address).call();
  return Number(ethers.utils.formatEther(result)).toFixed(6);
};

export const leagueData = [
  {
    claim: 15,
    balance: 100000000,
  },
  {
    claim: 13,
    balance: 50000000,
  },
  {
    claim: 11,
    balance: 25000000,
  },
  {
    claim: 10,
    balance: 15000000,
  },
  {
    claim: 9,
    balance: 12500000,
  },
  {
    claim: 8,
    balance: 10000000,
  },
  {
    claim: 7,
    balance: 7500000,
  },
  {
    claim: 6,
    balance: 4500000,
  },
  {
    claim: 5,
    balance: 3000000,
  },
  {
    claim: 0,
    balance: 2000000,
  },
  {
    claim: 0,
    balance: 1000000,
  },
  {
    claim: 0,
    balance: 500000,
  },
  {
    claim: 0,
    balance: 150000,
  },
  {
    claim: 0,
    balance: 50000,
  },
  {
    claim: 0,
    balance: 1,
  },
];

export const getStakes = async () => {
  const { data } = await axios.get('https://backend.tyrh.io/info/stake-list');
  return data.stakingList;
};

export const getNFTs = async () => {
  const { data } = await axios.get('https://backend.tyrh.io/info/nft');
  return data.nftInfo;
};

export const getLeagueLevel = (amount) => {
  let i;
  for (i = 0; i < leagueData.length; i++) {
    if (leagueData[i].balance <= amount) {
      if (i == 0 || leagueData[i - 1].balance > amount) {
        return i;
      }
    }
  }
  return i;
};
