import { withStyles, Accordion, AccordionSummary, AccordionDetails } from '@material-ui/core';

export const CAccordion = withStyles((theme) => ({
  root: {
    background: 'transparent',
    boxShadow: 'none',
  },
}))(Accordion);
export const CAccordionSummary = withStyles((theme) => ({
  root: {
    color: 'white',
    width: '135px',
    minHeight: '35px !important',
    height: '35px',
    padding: '0px',
    margin: '10px 5px !important',
  },
  expanded: {
    margin: '10px 5px !important',
    padding: '0px',
  },
}))(AccordionSummary);
export const CAccordionDetails = withStyles((theme) => ({
  root: {
    width: '100%',
    boxShadow: 'none',
    flexWrap: 'wrap',
    [theme.breakpoints.down('xs')]: {
      padding: 0,
      justifyContent: 'center',
    },
  },
}))(AccordionDetails);
