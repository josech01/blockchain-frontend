import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    marginTop: theme.spacing(40),
    paddingBottom: theme.spacing(10),
    [theme.breakpoints.down('sm')]: {
      marginTop: theme.spacing(10),
    },
  },

  content: {
    marginTop: theme.spacing(5),
  },
  tgrid: {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr 3fr 2fr 2fr 4fr',
    borderBottom: `1px solid ${theme.palette.project.gray}`,
    [theme.breakpoints.down('sm')]: {
      gridTemplateColumns: '1fr 1fr 4fr 3fr  3fr',
    },
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr 3fr 2fr 2fr 4fr',
    height: '50px',
    [theme.breakpoints.down('sm')]: {
      gridTemplateColumns: '1fr 1fr 4fr 3fr  3fr',
    },
  },
  selectedGrid: {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr 3fr 2fr 2fr 4fr',

    height: '50px',
    background: '#2d3037',
    borderRadius: '14px',
    border: '1px solid black',
    [theme.breakpoints.down('sm')]: {
      gridTemplateColumns: '1fr 1fr 4fr 3fr  3fr',
    },
  },
  tableHeader: {
    fontSize: '1rem',
    color: `${theme.palette.project.gray} !important`,
    margin: theme.spacing(2),
    textAlign: 'left',
    [theme.breakpoints.down('sm')]: {
      margin: theme.spacing(0),
      fontSize: '0.8rem',
    },
  },
  tableUnit: {
    margin: theme.spacing(1),
    fontSize: '1.2rem',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    '& img': {
      marginRight: '5px',
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '0.9rem',
    },
  },
  leagueName: {
    [theme.breakpoints.down('sm')]: {
      display: 'grid',
      gridTemplateColumns: '1fr 3fr',
      margin: '1px',
    },
  },
  selectedUnit: {
    display: 'flex',
    color: 'white',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginRight: '10px',
    marginLeft: '20px',
    '& img': {
      marginRight: theme.spacing(1),
    },
    '& p': {
      color: 'white',
      marginRight: theme.spacing(1),
    },
    [theme.breakpoints.down('sm')]: {
      marginRight: '0px',
      marginLeft: '0px',
    },
  },
  tableIndex: {
    display: 'flex',
    color: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: '10px',
    fontSize: '1rem',
  },
  desktop: {
    display: 'flex',
    fontSize: '1.1rem',
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  mobile: {
    display: 'none',
    '& span': {
      width: 'inherit',
    },
    [theme.breakpoints.down('sm')]: {
      display: 'flex',
    },
  },
  popover: {
    width: 'inherit',
    background: theme.palette.project.background.secondary,
    color: 'white',
    '&>span': {
      border: `4px solid ${theme.palette.project.background.secondary} !important`,
    },
  },
  tooltip: {
    fontSize: '0.9rem',
    maxWidth: '300px',
    textAlign: 'center',
  },
  claimUnit: {
    display: `flex`,
    alignItems: `center`,
    justifyContent: `center`,
    fontSize: '1.1rem',
    fontWeight: '800',
    [theme.breakpoints.down('sm')]: {
      fontSize: '0.9rem',
      fontWeight: '600',
    },
    '& img': {
      marginRight: '10px',
      [theme.breakpoints.down('sm')]: {
        marginRight: '3px',
        marginLeft: '2px',
      },
    },
  },
}));
