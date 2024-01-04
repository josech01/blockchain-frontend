// Adjusted from https://github.com/BestItPartner/nft_lazy_minting/blob/main/lib/LazyMinter.js

import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { ethers } from 'ethers';

// These constants must match the ones used in the smart contract.
const SIGNING_DOMAIN_NAME = 'PLSIOU-VOUCHER';
const SIGNING_DOMAIN_VERSION = '1';

class SignClass {
  constructor({ contractAddress, chainId, signer }) {
    this.contractAddress = contractAddress;
    this.chainId = chainId;
    this.jsonSigner = signer;
    this._domain = null;
  }

  createSigner = async (signer) => {
    const _signer = await SignerWithAddress.create(signer);
    return _signer;
  };

  async createVoucher(address, amount) {
    const signer = await this.createSigner(this.jsonSigner);

    let voucher = {
      claimer: signer.address,
      amount: amount,
    };

    const domain = await this._signingDomain();

    const types = {
      Voucher: [
        { name: 'claimer', type: 'address' },
        { name: 'amount', type: 'uint256' },
      ],
    };

    const signature = await signer._signTypedData(domain, types, voucher);
    return {
      ...voucher,
      signature,
    };
  }

  /**
   * @private
   * @returns {object} the EIP-721 signing domain, tied to the specified chainId
   */
  async _signingDomain() {
    if (this._domain != null) {
      return this._domain;
    }
    const chainId = this.chainId;
    this._domain = {
      name: SIGNING_DOMAIN_NAME,
      version: SIGNING_DOMAIN_VERSION,
      verifyingContract: this.contractAddress,
      chainId,
    };
    return this._domain;
  }
}

export default SignClass;
