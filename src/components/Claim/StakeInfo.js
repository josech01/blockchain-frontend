import React from 'react';
import { Box, Typography, Button } from '@material-ui/core';
import { useStyles } from './index.styles';
import { toUSDFormat } from '../../helpers';
import RewardCard from './RewardCard';

const StakeInfo = (props) => {
  const { isConnected, userStakeAmount, originalClaim, bonusClaim, tokenPrice, rewardArr } = props;
  const classes = useStyles();
  return (
    <Box display={`flex`} flexDirection={`column`} alignItems={`center`}>
      <Box className={classes.btnDiv}>
        <Button variant='contained' className={classes.rewardBtn}>
          {!isConnected || userStakeAmount == 0 ? (
            <>
              Stake to claim TEXAN
              <img src='/img/texan.png' width={20} alt='time' />
            </>
          ) : (
            <>
              You will get {toUSDFormat(originalClaim)}{' '}
              <Typography variant='body2' className={classes.green}>
                +{toUSDFormat(bonusClaim)}
              </Typography>
              &nbsp;TEXAN
              <img src='/img/texan.png' width={20} alt='time' />
            </>
          )}
        </Button>
      </Box>
      <Typography variant='body2' className={classes.rewardUsd}>
        ${toUSDFormat(tokenPrice * (originalClaim + bonusClaim), 8)}&nbsp;USD
      </Typography>
      <Box className={classes.rewardCardDiv}>
        {rewardArr.map((item, index) => (
          <RewardCard item={item} key={index} />
        ))}
      </Box>
    </Box>
  );
};

export default StakeInfo;
