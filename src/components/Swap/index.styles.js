import { makeStyles } from '@material-ui/core';
export const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(10),
  },
  caption: {
    color: theme.palette.project.gray,
    fontSize: '0.9rem',
    marginTop: theme.spacing(2),
  },
  chartDiv: {
    width: '100%',
    [theme.breakpoints.up('md')]: {
      padding: '10px',
    },
  },
  paperRoot: {
    display: 'flex',
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(3),
    alignItems: 'center',
    minWidth: 450,
    width: '30%',
    margin: 'auto',

    background: 'transparent',
    boxShadow: 'none',
    [theme.breakpoints.down('xs')]: {
      minWidth: '300px',
      width: '300px',
    },
  },
  input: {
    background: `#202020`,
    borderRadius: '10px',
    marginLeft: theme.spacing(2),
    marginRight: '-20px',
    color: 'white',
    textAlign: 'center',
    flex: 1,
    '& input': {
      textAlign: 'center',
      fontSize: '0.9rem',
    },
  },
  icon: {
    zIndex: 2,
    cursor: 'pointer',
    background: `black`,
    padding: `8px 25px`,
    borderRadius: `10px`,
  },
  buyItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: '80px',
    cursor: 'pointer',
    justifyContent: 'space-between',
    margin: theme.spacing(2),
  },
  itemDiv: {
    justifyContent: 'center',
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(5),
    flexWrap: 'wrap',
    '& p': {
      color: `#9e9e9e`,
      fontSize: '1rem',
    },
    '& a': {
      textDecoration: 'none',
    },
  },
  titleDiv: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '75%',
    position: 'relative',

    [theme.breakpoints.down('sm')]: {
      width: '90%',
    },
  },
  warning: {
    position: 'absolute',
    width: '200px',
    top: '-30%',
    right: '-30%',
    background: theme.palette.project.background.secondary,
    borderRadius: '15px 15px 15px 0px',
    paddingBottom: '10px',
    paddingLeft: '5px',
    paddingRight: '5px',
    '& p': {
      color: 'white',
      [theme.breakpoints.down('md')]: {
        fontSize: '0.9rem',
      },
    },
    [theme.breakpoints.down('lg')]: {
      right: '-30%',
      top: '-30%',
    },
    [theme.breakpoints.between(1024, 1281)]: {
      top: '-50%',
      right: '-20%',
    },
    [theme.breakpoints.down('md')]: {
      right: '5%',
      top: '-30%',
      width: '160px',
    },
    [theme.breakpoints.down('sm')]: {
      top: '-30%',
      right: '0%',
    },
    [theme.breakpoints.down('xs')]: {
      top: '-90%',
      right: '-5%',
    },
  },
  arrow: {
    width: 0,
    height: 0,
    left: '-11px',
    transform: 'skewX(-30deg)',
    bottom: '-39px',
    position: 'absolute',
    marginRight: theme.spacing(1),
    borderLeft: '15px solid transparent',
    borderRight: '15px solid transparent',
    borderTop: `40px solid ${theme.palette.project.background.secondary}`,
  },
  warnImg: {
    marginTop: '-40px',
  },

  slipDiv: {
    display: 'flex',
    alignItems: 'center',
    marginTop: theme.spacing(4),
    width: '90%',
    justifyContent: 'space-around',
  },
  slipbar: {
    color: 'white',
    fontSize: '0.9rem',
    fontWeight: '600',
    textTransform: 'uppercase',
    padding: '2px 10px',
    borderRadius: '15px',
    display: 'flex',
    alignItems: 'center',
    '& img': {
      marginLeft: theme.spacing(0.5),
    },
  },
  green: {
    background: '#3FA637',
  },
  red: {
    background: '#d7443e',
  },

  tooltip: {
    fontSize: '0.9rem',
    maxWidth: '300px',
    textAlign: 'center',
  },
  toastContent: {
    textAlign: 'center',
    color: 'white',
    '& img': {
      marginRight: '10px',
    },
  },
  metamask: { marginTop: '15px', marginLeft: '20px', cursor: 'pointer' },
  subDiv: {
    width: '400px',
    marginBottom: '80px',
    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
  },
  title: {
    color: 'white',
    fontWeight: '800',
    fontSize: '2.2rem',
    textShadow: '0px 0px 30px white',
  },
  description: {
    color: theme.palette.project.gray,
    margin: theme.spacing(1),
    fontSize: '1rem',
  },
}));
