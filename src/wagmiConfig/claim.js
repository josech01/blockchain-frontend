import { config } from './index';
export const wagmiClaimContractConfig = {
  address: config.claimAddress,
  abi: [
    { type: 'constructor', inputs: [{ type: 'address', name: 'tokenAddr', internalType: 'address' }] },
    { type: 'function', stateMutability: 'nonpayable', outputs: [], name: 'claim', inputs: [] },
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
      name: 'setClaimInfo',
      inputs: [
        { type: 'address[]', name: 'users', internalType: 'address[]' },
        { type: 'uint256[]', name: 'amounts', internalType: 'uint256[]' },
      ],
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
    {
      type: 'function',
      stateMutability: 'view',
      outputs: [
        { type: 'uint256', name: 'amount', internalType: 'uint256' },
        { type: 'bool', name: 'claimed', internalType: 'bool' },
      ],
      name: 'userInfo',
      inputs: [{ type: 'address', name: '', internalType: 'address' }],
    },
    {
      type: 'function',
      stateMutability: 'nonpayable',
      outputs: [],
      name: 'withdraw',
      inputs: [{ type: 'uint256', name: 'amount', internalType: 'uint256' }],
    },
    {
      type: 'event',
      name: 'Claimed',
      inputs: [
        { type: 'address', name: 'user', indexed: false },
        { type: 'uint256', name: 'amount', indexed: false },
      ],
      anonymous: false,
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
  ],
};
