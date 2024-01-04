// import React from 'react';

// import { Box } from '@material-ui/core';
// import { withStyles } from '@material-ui/core/styles';
// import Slider from '@material-ui/core/Slider';
// const PrettoSlider = withStyles((theme) => ({
//   root: {
//     color: '#3a8589',
//     height: 3,
//     padding: '13px 0',
//     width: '85%',
//     marginLeft: '00px',
//   },
//   thumb: {
//     height: 15,
//     width: 30,
//     background: `linear-gradient(1deg, #036cff, #e22eb8)`,
//     border: `none`,
//     borderRadius: `10px`,
//     marginTop: 0,
//     marginLeft: -13,
//     '&:focus, &:hover, &$active': {
//       boxShadow: '#ccc 0 2px 3px 1px',
//     },
//     '& .bar': {
//       // display: inline-block !important;
//       height: 9,
//       width: 1,
//       backgroundColor: 'currentColor',
//       marginLeft: 1,
//       marginRight: 1,
//     },
//   },
//   active: {},
//   track: {
//     height: 15,
//     color: theme.palette.project.background.secondary,
//     borderRadius: '5px',
//   },
//   rail: {
//     color: theme.palette.project.background.secondary,
//     borderRadius: '5px',
//     opacity: 1,
//     height: 15,
//   },
// }))(Slider);
// const ThumbComp = (props) => {
//   return (
//     <span {...props}>
//       <Box
//         style={{
//           width: '30px',
//           height: '20px',
//           borderRadius: '10px',
//           background: 'linear-gradient(90deg blue 0%,pink 100%)',
//         }}
//       ></Box>
//     </span>
//   );
// };
// const CustomSlider = (props) => {
//   const { value, handleChange } = props;

//   return (
//     <PrettoSlider
//       min={0}
//       max={100}
//       value={value}
//       onChange={(e, newValue) => handleChange(e, newValue)}
//       //   valueLabelDisplay='auto'
//       defaultValue={50}
//       //   ThumbComponent={ThumbComp}
//     />
//   );
// };

// export default CustomSlider;
import React from 'react';
import { withStyles, LinearProgress } from '@material-ui/core';
const BorderLinearProgress = withStyles((theme) => ({
  root: {
    height: 15,
    borderRadius: 10,
    width: '90%',
  },
  colorPrimary: {
    backgroundColor: theme.palette.project.gray,
  },
  bar: {
    borderRadius: 10,
    // backgroundColor: theme.palette.project.gray,
    background: 'linear-gradient(180deg, rgba(0,168,251,1) 0%, rgba(210,40,208,1) 100%)',
  },
}))(LinearProgress);

const CustomProgressBar = (props) => {
  const { value } = props;
  return <BorderLinearProgress variant='determinate' value={value} />;
};
export default CustomProgressBar;
