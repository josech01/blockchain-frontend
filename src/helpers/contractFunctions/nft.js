import { wagmiNftContractConfig } from '../../wagmiConfig/nft';
import { wagmiNftBurnTokenContractConfig } from '../../wagmiConfig/burnToken';
import { wagmiStakeContractConfig } from '../../wagmiConfig/stake';
import { wagmiClaimContractConfig } from '../../wagmiConfig/claim';
import { wagmiTYRHConfig } from '../../wagmiConfig/tyrh';
import { pulsechain } from 'viem/chains';
import { parseEther } from 'viem';
import { config } from '../../wagmiConfig';

export const getNftTypesContract = async (publicClient) => {
  const data = await publicClient.readContract({
    ...wagmiNftContractConfig,
    functionName: 'getNFTTypes',
  });

  return data;
};

export const getNftsContract = async (publicClient) => {
  let start = 0;
  const length = 1000;
  let data = [];
  let res = null;
  do {
    res = await publicClient.readContract({
      ...wagmiNftContractConfig,
      functionName: 'getNFTs',
      args: [start, length],
    });
    start += length;
    data.push(...res);
  } while (res.length == 1000);
  return data;
};

export const getBurnTokenAmountContract = async (publicClient, address) => {
  const data = await publicClient.readContract({
    ...wagmiNftBurnTokenContractConfig,
    functionName: 'balanceOf',
    args: [address],
  });
  return data;
};
export const getTyrhTokenAmountContract = async (publicClient, address) => {
  const data = await publicClient.readContract({
    ...wagmiTYRHConfig,
    functionName: 'balanceOf',
    args: [address],
  });
  return data;
};

export const getStakeAmountContract = async (publicClient, address) => {
  const data = await publicClient.readContract({
    ...wagmiStakeContractConfig,
    functionName: 'userStakingInfo',
    args: [address],
  });
  return data;
};

export const getClaimUserInfoContract = async (publicClient, address) => {
  const data = await publicClient.readContract({
    ...wagmiClaimContractConfig,
    functionName: 'userInfo',
    args: [address],
  });
  return data;
};

export const getTimeAmountContract = async (publicClient) => {
  const data = await publicClient.readContract({
    ...wagmiTYRHConfig,
    address: '0xCA35638A3fdDD02fEC597D8c1681198C06b23F58',
    functionName: 'balanceOf',
    args: [config.claimAddress],
  });
  return data;
};
// export const mintNftContract = async (address, typeId) => {
//   const { data } = walletClient.writeContract({
//     ...wagmiNftContractConfig,
//     functionName: 'mint',
//     args: [typeId],
//   });
// };

// export const approveToken = async (publicClient, walletClient, amount) => {
//   console.log('aaaa', publicClient, walletClient.account.address);
//   const { request } = await publicClient.simulateContract({
//     account: walletClient.account.address,
//     ...wagmiNftTokenContractConfig,
//     functionName: 'approve',
//     args: [config.nftAddress, parseEther(amount)],
//   });
//   console.log({ request });
//   await walletClient.writeContract(request);
//   await walletClient.writeContract({
//     ...wagmiNftTokenContractConfig,
//     functionName: 'approve',
//     args: [config.nftAddress, parseEther(amount)],
//     account: walletClient.account.address,
//   });
// };
