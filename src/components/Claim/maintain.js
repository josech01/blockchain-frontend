import React, { useState, useRef } from 'react';
import { Box } from '@material-ui/core';
import { Element } from 'react-scroll';
import { PText } from '../Base/Text';
import { PLS_ICON, PRAY_ICON } from '../../constants/image';
import { claimFaucet } from '../../helpers/contractFunctions/redeem';
import { toast } from 'react-toastify';
import Recaptcha from 'react-google-recaptcha';

import config from '../../config';
import './index.scss';
import { ethers } from 'ethers';

const Claim = (props) => {
  // const [claiming, setClaiming] = useState(false);
  const [account, setAccount] = useState('');
  const [claiming, setClaiming] = useState(false);

  const captureRef = useRef(null);
  const claimPLS = async () => {
    toast.warning('Closed until queue is cleared', { position: 'top-center', closeOnClick: true });
    return;
    const token = captureRef.current.getValue();
    console.log({ token });
    captureRef.current.reset();
    if (!account) {
      toast.warning('Not valid input.', { position: 'top-center', closeOnClick: true });
    } else if (!ethers.utils.isAddress(account)) {
      toast.warning('Invalid address.', { position: 'top-center', closeOnClick: true });
    } else if (!token) {
      toast.warning('Verify recaptcha first.', { position: 'top-center', closeOnClick: true });
    } else {
      try {
        setClaiming(true);
        const data = await claimFaucet(account, token);
        console.log({ data });
        if (data.status) {
          toast.success('Claim had been queued. Will arrive shortly', { position: 'top-center', closeOnClick: true });
          setClaiming(false);
        }
      } catch (error) {
        console.log(error);
        toast.error(error.response.data.error, { position: 'top-center', closeOnClick: true });
        setClaiming(false);
      }
    }
  };

  return (
    <Element name='claim'>
      <Box className='claim-container'>
        <Box className='claim-header'>
          <PText className='white glow head-text'>
            Claim 2,500
            <img src={PLS_ICON} alt='PLS icon' width={30} height={30} /> PLS Today!
          </PText>
          <Box className='mainnet-pointer'>
            <Box>Paste your receiving wallet in the box below!</Box>
          </Box>
          <Box className='star-div'>
            <img src='/img/star.png' className='star' width={16} alt='star' />
            <img src='/img/star.png' className='star' width={16} alt='star' />
            <img src='/img/star.png' className='star' width={16} alt='star' />
          </Box>
        </Box>
        <Box className='claim-content'>
          <input
            className='pulse-address'
            type='text'
            placeholder='Insert pulsechain wallet address...'
            onChange={(e) => setAccount(e.target.value)}
          />
          <Recaptcha sitekey={config.siteKey} ref={captureRef} className='recaptcha' />
          <button type='button' className='btn claim-btn' disabled={claiming} onClick={claimPLS}>
            {claiming && <div className='spinner'></div>}
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            Claim!
          </button>
          <a
            href='https://t.me/pulsepot'
            rel='noreferrer'
            target='_blank'
            style={{ marginTop: '30px' }}
            className='additional'
          >
            Made with &nbsp; <img src='/img/heart.png' alt='heart' width={18} /> &nbsp; by team PulsePot
          </a>
        </Box>
        <Box className='pray-content'>
          <img src={PRAY_ICON} alt='pray' width={30} />
          <span className='description-text'>You can donate to the faucet supply here</span>
          <span className='address'>{config.hotwalletAddress}</span>
        </Box>
      </Box>
    </Element>
  );
};

export default Claim;
