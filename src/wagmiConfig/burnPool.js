import { config } from './index';
export const wagmiBurnPoolContractConfig = {
  address: config.burnPoolAddress,
  abi: [
    { type: 'constructor', inputs: [{ type: 'address', name: '_TYRHAddr', internalType: 'address' }] },
    {
      type: 'function',
      stateMutability: 'view',
      outputs: [{ type: 'address', name: '', internalType: 'address' }],
      name: 'TYRHAddr',
      inputs: [],
    },
    { type: 'function', stateMutability: 'nonpayable', outputs: [], name: 'burn', inputs: [] },
    {
      type: 'event',
      name: 'RHTokenBurnt',
      inputs: [
        { type: 'address', name: 'token', indexed: false },
        { type: 'uint256', name: 'amount', indexed: false },
      ],
      anonymous: false,
    },
    { type: 'receive' },
  ],
};
