import Web3 from 'web3';
import { ethers } from 'ethers';
import PLSAbi from '../../abis/pls.json';
import SignClass from '../SignClass';
import config from '../../config';
import Axios from 'axios';
const axios = Axios.create({ baseURL: config.serverUrl });

export const getStakeInfo = async () => {
  const result = axios.get('/info/stake');
  return result;
};
// export const claimToken = async (userAddress, amount) => {
//   const provider = new ethers.providers.Web3Provider(window.ethereum);

//   const signer = provider.getSigner();
//   const signerClass = new SignClass({
//     contractAddress: config.redeemAddress,
//     chainId: config.chainID,
//     signer,
//   });

//   const voucher = await signerClass.createVoucher(userAddress, ethers.utils.parseEther(amount.toString()).toString());

//   // const web3 = new Web3(window.___provider);
//   // const redeemContract = new web3.eth.Contract(RedeemAbi, config.redeemAddress);
//   // await redeemContract.methods.redeem(voucher).send({ from: userAddress });
//   const result = await axios.post('/redeem', { sig: voucher });
//   console.log({ result });
//   return result.data;
// };

// export const getTokenBalance = async (tokenAddress, userAddress) => {
//   const web3 = new Web3(window.___provider);

//   const tokenContract = new web3.eth.Contract(PLSAbi, tokenAddress);
//   const balance = await tokenContract.methods.balanceOf(userAddress).call();
//   const decimal = await tokenContract.methods.decimals().call();
//   return ethers.utils.formatUnits(balance, decimal);
// };

// export const claimFaucet = async (claimAddress, token) => {
//   const { data } = await axios.post('/faucet', { claimAddress, token });
//   return data;
// };

// export const getBalance = async () => {
//   const { data } = await axios.get('/faucet/status');
//   return data;
// };
