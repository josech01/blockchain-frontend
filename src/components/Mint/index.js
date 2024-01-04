import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// components
import { Box, Typography, Button, Badge } from '@material-ui/core';

import { Element } from 'react-scroll';
import ClaimCard from './ClaimCard';
import { CAccordion, CAccordionSummary, CAccordionDetails } from './CustomAccordion';
import LoadingSpin from '../Base/LoadingSpin';
import Title from '../Base/Title';
import { toUSDFormat, lists } from '../../helpers';
// reducer
import { getNftTypes, getNfts, getMyNfts_ } from '../../reducers/nft.slice';
// wagmi
import { usePublicClient, useAccount, useContractWrite } from 'wagmi';
import { parseEther, formatEther } from 'viem';
import { wagmiNftBurnTokenContractConfig } from '../../wagmiConfig/burnToken';
import { wagmiNftContractConfig } from '../../wagmiConfig/nft';
import { config } from '../../wagmiConfig/index';
import { toast } from 'react-toastify';

// styles
import clsx from 'clsx';
import { useStyles } from './index.styles';

const Mint = (props) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const publicClient = usePublicClient();
  const { address, isConnected } = useAccount();
  const { nftTypes, myNfts } = useSelector((state) => state.nft);
  const addressRef = useRef('');
  const [nftCard, setNftCard] = useState({});
  const [price, setPrice] = useState();
  const [allowance, setAllowance] = useState(0);
  const [tab, setTab] = useState('list');
  const updateAllowance = async () => {
    const data = await publicClient.readContract({
      ...wagmiNftBurnTokenContractConfig,
      functionName: 'allowance',
      args: [addressRef.current, config.nftAddress],
    });
    setAllowance(Number(formatEther(data)));
  };
  const switchMyNfts = () => {
    setTab('my');
    dispatch(getMyNfts_(addressRef.current));
  };
  const switchNftCard = () => {
    setTab('list');
  };
  const mint = () => {
    if (isConnected && Object.keys(nftCard).length > 0) {
      console.log('clicked', allowance);
      // dispatch(approve({ publicClient, walletClient, amount: nftCard.price }));
      if (allowance < nftCard.price) {
        approveWrite?.({
          args: [config.nftAddress, parseEther(nftCard.price.toString())],
        });
      } else if (allowance >= nftCard.price) {
        mintWrite?.({
          args: [nftCard.typeId],
        });
      }
    }
  };
  const { write: approveWrite, isLoading: isApproveLoading } = useContractWrite({
    ...wagmiNftBurnTokenContractConfig,
    functionName: 'approve',
    onSuccess: async (data) => {
      await publicClient.waitForTransactionReceipt({ hash: data.hash });
      updateAllowance();
      mintWrite?.({
        args: [nftCard.typeId],
      });
    },
  });
  const { write: mintWrite, isLoading: isMintLoading } = useContractWrite({
    ...wagmiNftContractConfig,
    functionName: 'mint',
    onSuccess: async (data) => {
      await publicClient.waitForTransactionReceipt({ hash: data.hash });
      toast.success('Successfully Minted', { theme: 'dark' });
      dispatch(getNfts(publicClient));
    },
  });
  const selectCard = (card) => {
    if (card?.active == false) return;
    setNftCard(card);
    setPrice(card.price);
  };

  const updateAllInfo = () => {
    if (isConnected) {
      updateAllowance();
    }
  };

  const renderNft = () => {
    let render;
    if (tab == 'list') {
      render =
        lists.length > 0 ? (
          lists.map((item, index) => {
            let items;
            if (nftTypes.length) items = nftTypes.filter((unit) => unit.typeName == item.type && unit.enabled == true);
            else items = [];
            return (
              <CAccordion key={index} defaultExpanded={true}>
                <CAccordionSummary
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                  expandIcon={<img src="/img/nft/arrow.png" alt="arrow" width={10} />}
                >
                  {item.title}
                </CAccordionSummary>
                <CAccordionDetails>
                  {items.length > 0 &&
                    items.map((unit, index) => (
                      <ClaimCard item={unit} key={index} selected={unit == nftCard} selectCard={selectCard} />
                    ))}
                </CAccordionDetails>
              </CAccordion>
            );
          })
        ) : (
          <LoadingSpin />
        );
    } else if (tab == 'my') {
      if (lists.length > 0) {
        render = lists.map((item, index) => {
          let items;
          if (myNfts.length) items = myNfts.filter((unit) => unit.typeName == item.type && unit.enabled == true);
          else items = [];
          return (
            <CAccordion key={index} defaultExpanded={true}>
              <CAccordionSummary
                aria-controls="panel1a-content"
                id="panel1a-header"
                expandIcon={<img src="/img/nft/arrow.png" alt="arrow" width={10} />}
              >
                {item.title}
              </CAccordionSummary>
              <CAccordionDetails>
                {items.length > 0 &&
                  items.map((unit, index) => (
                    <ClaimCard item={unit} key={index} selected={unit == nftCard} selectCard={selectCard} />
                  ))}
              </CAccordionDetails>
            </CAccordion>
          );
        });
      }
    }
    return render;
  };

  useEffect(() => {
    dispatch(getNftTypes(publicClient));

    dispatch(getNfts(publicClient));
  }, []);
  useEffect(() => {
    addressRef.current = address;
    updateAllInfo();
  }, [isConnected, address]);

  return (
    <Element name="nft">
      <Box className={classes.root}>
        <Title
          title="Mint #TYRH NFT`s"
          description="Select your NFT to mint from the available options below"
          star={true}
        />

        <Box className={classes.cardContainer}>
          <Box className={classes.filterDiv}>
            <Box className={classes.catBtnDiv}>
              <Button variant="contained" className={classes.filterBtn}>
                <Badge
                  badgeContent="MINT"
                  overlap="rectangular"
                  onClick={switchNftCard}
                  className={clsx(classes.badge, classes.green)}
                >
                  <img src="/img/nft/cart.png" alt="shop" width={30} />
                  NFT Mint
                </Badge>
              </Button>
              <Button variant="contained" className={classes.filterBtn} onClick={switchMyNfts}>
                <img src="/img/nft/nft.png" alt="nft" width={30} />
                My NFT's
              </Button>
              <Button variant="contained" className={classes.filterBtn}>
                <Badge badgeContent="SOON" overlap="rectangular" className={clsx(classes.badge, classes.red)}>
                  <img src="/img/nft/marketplace.png" alt="market" width={30} />
                  Marketplace
                </Badge>
              </Button>
            </Box>
            <Box>
              <Typography variant="caption" className={classes.caption}>
                Mint & burn now
              </Typography>
              <Button
                variant="contained"
                disabled={isApproveLoading || isMintLoading}
                onClick={mint}
                className={classes.mintBtn}
              >
                <img src="/img/fire.png" alt="fire" width={30} />
                {toUSDFormat(price)} #BURN
              </Button>
            </Box>
          </Box>
          <Box className={classes.cardDiv}>{renderNft()}</Box>
        </Box>
      </Box>
    </Element>
  );
};

export default Mint;
