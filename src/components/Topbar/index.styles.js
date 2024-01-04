// import React from 'react';

import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  root: {
    background: 'transparent',
    boxShadow: 'none',
    padding: '15px 5px',
  },
  logo: {
    [theme.breakpoints.down('sm')]: {
      padding: '4px',
    },
  },
  siteName: {
    fontSize: '2.5rem',
    fontWeight: '700',
    display: 'none',
    paddingRight: '20px',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  //   badge style
  percentBadge: {
    display: 'flex',
    alignItems: 'center',
    padding: '10px 25px',
    [theme.breakpoints.down('sm')]: {
      padding: '10px 15px 10px 5px',
    },
  },
  greenDot: {
    width: theme.spacing(1),
    height: theme.spacing(1),
    borderRadius: '50%',
    marginRight: theme.spacing(1),
    background: theme.palette.project.green,
    boxShadow: `0px 0px 30px ${theme.palette.project.green}`,
  },

  greenBadge: {
    fontSize: '0.6rem',
    color: theme.palette.project.green,
    display: 'flex',
  },
  redBadge: {
    fontSize: '0.6rem',
    color: 'red',
    display: 'flex',
  },
  upTriangle: {
    width: 0,
    height: 0,
    marginRight: theme.spacing(1),
    borderLeft: '5px solid transparent',
    borderRight: '5px solid transparent',
    borderBottom: `10px solid ${theme.palette.project.green}`,
  },
  downTriangle: {
    width: 0,
    height: 0,
    marginRight: theme.spacing(1),
    borderLeft: '5px solid transparent',
    borderRight: '5px solid transparent',
    borderTop: `10px solid red`,
  },

  sectionDesktop: {
    display: 'flex',
  },
  sectionMobile: {
    display: 'none',
    [theme.breakpoints.down('sm')]: {
      display: 'block',
    },
  },
  balanceStatus: {
    display: 'flex',
  },
  token: {
    display: 'flex',
    alignItems: 'center',
    margin: '0px 20px',
    [theme.breakpoints.down('md')]: {
      margin: '0px 10px',
    },
    [theme.breakpoints.down('sm')]: {
      margin: '0px 5px',
    },
    '& img': {
      marginRight: theme.spacing(1),
    },
  },
  mobile: {
    marginTop: '20px',
    justifyContent: 'end',
    marginRight: '10px',
  },
}));
