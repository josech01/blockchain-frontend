import React, { useEffect, useState } from 'react';
// library && components
import { Box } from '@material-ui/core';
import { Element } from 'react-scroll';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import Popover from '@idui/react-popover';
import { useSelector } from 'react-redux';
// custom-components
import Blocky from '../Base/Blocky';
import Title from '../Base/Title';

// utils
import { toUSDFormat, walletAddressConvert } from '../../helpers';

import { useStyles } from './index.styles';

const LeaderBoard = (props) => {
  const classes = useStyles();
  const { burnRanks } = useSelector((state) => state.burn);
  const exportExcel = () => {
    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileName = `burn_stats_${new Date()}`;
    const fileExtension = '.xlsx';

    const ws_pls = XLSX.utils.json_to_sheet(burnRanks.pls);
    const ws_plsx = XLSX.utils.json_to_sheet(burnRanks.plsx);
    const ws_hex = XLSX.utils.json_to_sheet(burnRanks.hex);
    const ws_inc = XLSX.utils.json_to_sheet(burnRanks.inc);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws_pls, 'PLS');
    XLSX.utils.book_append_sheet(wb, ws_plsx, 'PLSX');
    XLSX.utils.book_append_sheet(wb, ws_hex, 'HEX');
    XLSX.utils.book_append_sheet(wb, ws_inc, 'INC');
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
  };
  return (
    <Element name='leaderboard'>
      <Box className={classes.root}>
        <Title
          title='Burners leaderboard'
          description='Your staking league and RH tokens burn statistics!'
          star={false}
        />
        <Box className={classes.excelBtn} onClick={exportExcel}>
          <img src='/img/excel.png' alt='excel' width={20} />
          Export as excel
        </Box>
        <Box className={classes.content}>
          {Object.entries(burnRanks).map(([key, value], index) => {
            let data = [];
            if (value.length > 0) data = value.slice(0, 20);
            return (
              <Box className={classes.section} key={index}>
                <Box className={classes.sectionTitle}>
                  <img src={`/img/f_${key}.png`} alt='f_pls' width={35} />
                  {key}
                </Box>
                {data.map((item, index) => (
                  <Box key={index} className={classes.statItem}>
                    <Box className={classes.index}>{index + 1}</Box>
                    <Box className={classes.balance}>{toUSDFormat(item.amount, 2)}</Box>
                    <Popover className={classes.popover} content={<Box>{item.wallet}</Box>}>
                      <a
                        target='_blank'
                        href={`https://scan.pulsechain.com/address/${item.wallet}`}
                        rel='noreferrer'
                        className={classes.addresshref}
                      >
                        <Box className={classes.address}>
                          <Blocky address={item.wallet.toLowerCase()} size={''} />
                          {walletAddressConvert(item.wallet)}
                        </Box>
                      </a>
                    </Popover>
                  </Box>
                ))}
              </Box>
            );
          })}
        </Box>
      </Box>
    </Element>
  );
};

export default LeaderBoard;
