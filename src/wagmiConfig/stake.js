import { config } from './index';

export const wagmiStakeContractConfig = {
  address: config.stakeAddress,
  abi: [
    { type: 'constructor', inputs: [{ type: 'address', name: '_TYRHAddr', internalType: 'address' }] },
    {
      type: 'function',
      stateMutability: 'view',
      outputs: [
        {
          type: 'tuple[]',
          name: 'list',
          internalType: 'struct TYRHStaking.Stake[]',
          components: [
            { type: 'uint256' },
            { type: 'address' },
            { type: 'uint256' },
            { type: 'uint256' },
            { type: 'bool' },
          ],
        },
      ],
      name: 'getUserStakingList',
      inputs: [{ type: 'address', name: 'user', internalType: 'address' }],
    },
    {
      type: 'function',
      stateMutability: 'nonpayable',
      outputs: [],
      name: 'stake',
      inputs: [{ type: 'uint256', name: 'amount', internalType: 'uint256' }],
    },
    {
      type: 'function',
      stateMutability: 'view',
      outputs: [
        { type: 'uint256', name: 'id', internalType: 'uint256' },
        { type: 'address', name: 'user', internalType: 'address' },
        { type: 'uint256', name: 'amount', internalType: 'uint256' },
        { type: 'uint256', name: 'timestamp', internalType: 'uint256' },
        { type: 'bool', name: 'isFinished', internalType: 'bool' },
      ],
      name: 'stakeList',
      inputs: [{ type: 'uint256', name: '', internalType: 'uint256' }],
    },
    {
      type: 'function',
      stateMutability: 'view',
      outputs: [{ type: 'uint256', name: '', internalType: 'uint256' }],
      name: 'totalAmount',
      inputs: [],
    },
    {
      type: 'function',
      stateMutability: 'nonpayable',
      outputs: [],
      name: 'unStake',
      inputs: [{ type: 'uint256', name: 'id', internalType: 'uint256' }],
    },
    {
      type: 'function',
      stateMutability: 'view',
      outputs: [
        { type: 'uint256', name: 'totalAmount', internalType: 'uint256' },
        { type: 'uint256', name: 'stakeCount', internalType: 'uint256' },
      ],
      name: 'userStakingInfo',
      inputs: [{ type: 'address', name: '', internalType: 'address' }],
    },
    {
      type: 'event',
      name: 'UserStakingAmountChanged',
      inputs: [
        { type: 'address', name: 'user', indexed: false },
        { type: 'uint256', name: 'amount', indexed: false },
      ],
      anonymous: false,
    },
  ],
};
