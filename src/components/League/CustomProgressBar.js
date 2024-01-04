import React from 'react';
import { withStyles, LinearProgress } from '@material-ui/core';
const BorderLinearProgress = withStyles((theme) => ({
  root: {
    height: 15,
    borderRadius: 0,
    transform: 'rotate(180deg)',
    width: '90%',
  },
  colorPrimary: {
    backgroundColor: theme.palette.project.gray,
  },
  bar: {
    borderRadius: 0,
    // backgroundColor: theme.palette.project.gray,
    background: 'linear-gradient(180deg, rgba(0,168,251,1) 0%, rgba(210,40,208,1) 100%)',
  },
}))(LinearProgress);

const CustomProgressBar = (props) => {
  const { value, max } = props;
  // console.log(max);
  // console.log({ max, value });
  const realValue = (value * 100) / max;
  return <BorderLinearProgress variant='determinate' value={realValue} />;
};
export default CustomProgressBar;
