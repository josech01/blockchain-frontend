import { config } from './index.js';
export const wagmiBonfireContractConfig = {
  address: config.bonfireAddress,
  abi: [
    { type: 'constructor', inputs: [{ type: 'address', name: 'tokenAddr', internalType: 'address' }] },
    {
      type: 'function',
      stateMutability: 'view',
      outputs: [{ type: 'uint256', name: '', internalType: 'uint256' }],
      name: 'minimumLockTime',
      inputs: [],
    },
    {
      type: 'function',
      stateMutability: 'view',
      outputs: [{ type: 'address', name: '', internalType: 'address' }],
      name: 'owner',
      inputs: [],
    },
    { type: 'function', stateMutability: 'nonpayable', outputs: [], name: 'renounceOwnership', inputs: [] },
    {
      type: 'function',
      stateMutability: 'nonpayable',
      outputs: [],
      name: 'setMinimumLockTime',
      inputs: [{ type: 'uint256', name: 'time', internalType: 'uint256' }],
    },
    {
      type: 'function',
      stateMutability: 'nonpayable',
      outputs: [],
      name: 'setTokenAddress',
      inputs: [{ type: 'address', name: 'addr', internalType: 'address' }],
    },
    {
      type: 'function',
      stateMutability: 'nonpayable',
      outputs: [],
      name: 'setYield',
      inputs: [{ type: 'uint256', name: 'value', internalType: 'uint256' }],
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
      outputs: [{ type: 'address', name: '', internalType: 'contract IERC20' }],
      name: 'token',
      inputs: [],
    },
    {
      type: 'function',
      stateMutability: 'nonpayable',
      outputs: [],
      name: 'transferOwnership',
      inputs: [{ type: 'address', name: 'newOwner', internalType: 'address' }],
    },
    { type: 'function', stateMutability: 'nonpayable', outputs: [], name: 'unStake', inputs: [] },
    {
      type: 'function',
      stateMutability: 'view',
      outputs: [
        { type: 'uint256', name: 'amount', internalType: 'uint256' },
        { type: 'uint256', name: 'timestamp', internalType: 'uint256' },
      ],
      name: 'userInfo',
      inputs: [{ type: 'address', name: '', internalType: 'address' }],
    },
    {
      type: 'function',
      stateMutability: 'view',
      outputs: [{ type: 'uint256', name: '', internalType: 'uint256' }],
      name: 'yield',
      inputs: [],
    },
    {
      type: 'event',
      name: 'OwnershipTransferred',
      inputs: [
        { type: 'address', name: 'previousOwner', indexed: true },
        { type: 'address', name: 'newOwner', indexed: true },
      ],
      anonymous: false,
    },
    {
      type: 'event',
      name: 'Staked',
      inputs: [
        { type: 'address', name: 'user', indexed: false },
        { type: 'uint256', name: 'amount', indexed: false },
      ],
      anonymous: false,
    },
    { type: 'event', name: 'UnStaked', inputs: [{ type: 'address', name: 'user', indexed: false }], anonymous: false },
  ],
};
