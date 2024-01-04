import React from 'react';
import { Grid, Typography, Box } from '@material-ui/core';
import { Element } from 'react-scroll';
import { withStyles } from '@material-ui/core/styles';
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import { faqData } from '../../helpers';

import './index.scss';

const Accordion = withStyles({
  root: {
    padding: '10px 0px',
    background: '#131416',
    boxShadow: 'none',
    '&:not(:last-child)': {
      borderBottom: 0,
    },

    '&:before': {
      display: 'none',
    },
    '&$expanded': {
      margin: 'auto',
    },
  },
  expanded: {},
})(MuiAccordion);

const AccordionSummary = withStyles({
  root: {
    backgroundColor: '#202020',
    borderBottom: '1px solid rgba(0, 0, 0, .125)',
    marginBottom: -1,
    minHeight: 60,
    height: 60,
    display: 'flex',
    alignItems: 'center',
    padding: '0',
    '&$expanded': {
      minHeight: 56,
    },
  },
  content: {
    margin: 0,
    height: '100%',
    display: 'flex',
    alignItems: 'center',

    '&$expanded': {
      margin: '12px 0',
    },
  },
  expanded: {},
})(MuiAccordionSummary);

const AccordionDetails = withStyles((theme) => ({
  root: {
    background: '#202124',
    padding: theme.spacing(2),
  },
}))(MuiAccordionDetails);

const Faq = () => {
  const [expanded, setExpanded] = React.useState(0);

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <Element name='faq'>
      <Grid container className='faq-div' id='faq-section'>
        <Grid item md={12}>
          <Typography variant='h6' className='faq-des glow'>
            Frequently asked questions
          </Typography>
        </Grid>
        <Grid item md={12} className='faq-accordion'>
          {faqData.map((item, key) => (
            <Accordion square expanded={expanded === key} onChange={handleChange(key)} key={key}>
              <AccordionSummary
                aria-controls='panel1d-content'
                id='panel1d-header'
                className={expanded === key ? 'faq-bordered' : ''}
              >
                <Box className='accordion-arrow'>
                  <img
                    src='img/arrow.png'
                    width='20px'
                    alt='arrow'
                    style={{ rotate: expanded === key ? '90deg' : '0deg', transition: 'all 0.5s ' }}
                  />
                </Box>
                <Typography variant='body1' className='faq-accoridon-q' style={{ paddingLeft: '20px' }}>
                  {item.q}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant='body2' className='faq-accordian-a'>
                  {item.a}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Grid>
      </Grid>
    </Element>
  );
};

export default Faq;
