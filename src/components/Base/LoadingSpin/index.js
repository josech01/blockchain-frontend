import React from 'react';
import { makeStyles, Box } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    position: `absolute`,
    top: `50%`,
    left: `50%`,
    transform: `translate(-50%, -50%)`,
    width: `150px`,
    height: `150px`,
    background: `transparent`,
    border: `3px solid #3c3c3c`,
    borderRadius: `50%`,
    textAlign: `center`,
    lineHeight: `150px`,
    fontSize: `20px`,
    color: `#fff000`,
    letterSpacing: `4px`,
    textTransform: `uppercase`,
    textShadow: `0 0 10px #fff000`,
    boxShadow: `0 0 20px rgba(0, 0, 0, 0.5)`,
    '&:before': {
      content: `" "`,
      position: `absolute`,
      top: `-0x`,
      left: `0px`,
      width: `100%`,
      height: `100%`,
      border: `3px solid transparent`,
      borderTop: `3px solid #fff000`,
      borderRight: `3px solid #fff000`,
      borderRadius: `50%`,
      animation: `animateC 2s linear infinite`,
    },
  },
  loadingSpan: {
    display: `block`,
    position: `absolute`,
    top: `calc(50% - 2px)`,
    left: `50%`,
    width: `50%`,
    height: `4px`,
    background: `transparent`,
    transformOrigin: `left`,
    animation: `animate 2s linear infinite`,
    '&:before': {
      content: `" "`,
      position: `absolute`,
      width: `16px`,
      height: `16px`,
      borderRadius: `50%`,
      background: `#fff000`,
      top: `-6px`,
      right: `-8px`,
      boxShadow: `0 0 20px #fff000`,
    },
  },
}));

const LoadingSpin = (props) => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      Loading
      <span className={classes.loadingSpan}></span>
    </Box>
  );
};

export default LoadingSpin;
