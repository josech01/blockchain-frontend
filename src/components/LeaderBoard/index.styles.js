import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    width: '100%',
    paddingBottom: '20px',
    marginTop: theme.spacing(10),
    // marginLeft: '5%',
    [theme.breakpoints.down('sm')]: {
      margin: 'auto',
    },
  },

  content: {
    marginTop: theme.spacing(7),
    borderRadius: '15px',
    width: '100%',
    minHeight: '350px',
    background: '#0c0d0e',
    boxShadow: 'inset 0px 0px 20px 20px #000000',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr 1fr',
    [theme.breakpoints.down('sm')]: {
      display: 'flex',
      flexDirection: 'column',
    },
  },
  section: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
    borderRight: '1px solid #1a1a1a',
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      borderRight: 'none',
      borderBottom: '1px solid #1a1a1a',
      paddingBottom: theme.spacing(2),
      margin: '24px 10px',
    },
  },

  statItem: {
    color: 'white',
    display: 'grid',
    gridTemplateColumns: '1fr 4fr 4fr',
    fontSize: '0.75rem',
    padding: '4px 0px',
    justifyItems: 'start',
  },
  index: {
    color: theme.palette.project.gray,
    marginLeft: '8px',
  },
  balance: {
    fontFamily: 'Arial !important',
  },
  address: {
    display: 'flex',
    fontFamily: 'Arial !important',
    '& canvas': {
      marginRight: '8px',
    },
  },
  addresshref: {
    color: 'white',
    textDecoration: 'none',
  },
  sectionTitle: {
    color: 'white',
    display: 'flex',
    alignItems: 'flex-end',
    fontSize: '1.1rem',
    paddingLeft: '30px',
    marginBottom: '30px',
    fontFamily: 'Arial !important',
    justifyContent: 'center',
    textTransform: 'uppercase',
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'center',
    },
  },
  popover: {
    width: 'inherit',
    background: theme.palette.project.background.secondary,
    color: 'white',
    padding: '5px 10px',
    '&>span': {
      border: `4px solid ${theme.palette.project.background.secondary} !important`,
    },
  },
  // tgrid: {
  //   display: 'grid',
  //   gridTemplateColumns: '2fr 6fr 4fr 2fr',
  //   borderBottom: `1px solid ${theme.palette.project.gray}`,
  //   justifyItems: 'start',
  // },
  // grid: {
  //   justifyItems: 'start',
  //   display: 'grid',
  //   gridTemplateColumns: '2fr 6fr 4fr 2fr',
  //   [theme.breakpoints.down('sm')]: {
  //     gridTemplateColumns: '2fr 4fr 6fr 2fr',
  //   },
  // },
  // tableHeader: {
  //   fontSize: '0.8rem',
  //   color: theme.palette.project.gray,
  //   margin: theme.spacing(2),
  // },
  // tableUnit: {
  //   margin: theme.spacing(2),
  //   marginTop: theme.spacing(3),
  //   fontSize: '0.8rem',
  //   color: 'white',
  //   display: 'flex',
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   '& img': {
  //     marginRight: '5px',
  //   },
  //   [theme.breakpoints.down('sm')]: {
  //     margin: theme.spacing(1),
  //   },
  // },
  // desktopAddr: {
  //   display: 'block',
  //   [theme.breakpoints.down('sm')]: {
  //     display: 'none',
  //   },
  // },
  // mobileAddr: {
  //   display: 'none',
  //   [theme.breakpoints.down('sm')]: {
  //     display: 'block',
  //   },
  // },
  excelBtn: {
    color: 'white',
    fontSize: '0.9rem',
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    '& img': {
      marginRight: '10px',
    },
  },
}));
