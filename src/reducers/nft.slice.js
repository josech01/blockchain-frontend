import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import {
  getNftTypesContract,
  getNftsContract,
  getBurnTokenAmountContract,
  getTyrhTokenAmountContract,
  getStakeAmountContract,
  getClaimUserInfoContract,
} from '../helpers/contractFunctions/nft';
import { types, lists } from '../helpers/index';
import { formatEther } from 'viem';

export const getNftTypes = createAsyncThunk('nft/getNftTypes', async (publicClient) => {
  const data = await getNftTypesContract(publicClient);
  return data;
});

export const getNfts = createAsyncThunk('nft/getNfts', async (publicClient) => {
  const data = await getNftsContract(publicClient);
  return data;
});

export const getBurnTokenAmount = createAsyncThunk('nft/getBurnTokenAmount', async ({ publicClient, address }) => {
  const data = await getBurnTokenAmountContract(publicClient, address);
  return data;
});

export const getTyrhTokenAmount = createAsyncThunk('nft/getTyrhTokenAmount', async ({ publicClient, address }) => {
  const data = await getTyrhTokenAmountContract(publicClient, address);
  return data;
});

export const getStakeTokenAmount = createAsyncThunk('nft/getStakeAmount', async ({ publicClient, address }) => {
  const data = await getStakeAmountContract(publicClient, address);
  return data;
});

export const getClaimUserInfo = createAsyncThunk('nft/getClaimUserInfo', async ({ publicClient, address }) => {
  const data = await getClaimUserInfoContract(publicClient, address);
  // console.log({ data });
  return data;
});
// export const approve = createAsyncThunk('nft/approve', async ({ publicClient, walletClient, amount }) => {
//   console.log({ walletClient });
//   await approveToken(publicClient, walletClient, amount);
// });

const initialState = {
  nftTypes: [],
  nfts: [],
  myNfts: [],
  burnTokenAmount: 0,
  tyrhTokenAmount: 0,
  stakeTokenAmount: 0,
  claimAmount: 0,
  claimed: false,
};

export const nftSlice = createSlice({
  name: 'nft',
  initialState,
  reducers: {
    getMyNfts_: (state, { payload }) => {
      let nfts = [...state.nfts];
      if (nfts.length > 0) {
        const myNFTs = nfts.filter((item) => item.address.toLowerCase() == payload?.toLowerCase());
        state.myNfts = myNFTs;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getNftTypes.pending, (state) => {
      state.nftTypes = [];
    });
    builder.addCase(getNftTypes.fulfilled, (state, { payload }) => {
      let nftTypes = [];
      if (payload.length) {
        payload.forEach((element) => {
          let nft = {};
          nft.catId = Number(element[0]);
          nft.typeId = Number(element[1]);
          nft.typeName = lists[Number(element[0])].type;
          nft.title = types[Number(element[1])].title;
          nft.description = types[Number(element[1])].description;
          nft.tooltip = types[Number(element[1])].tooltip;
          nft.img = types[Number(element[1])].img;
          nft.info = types[Number(element[1])].info;
          nft.price = Number(formatEther(element[2]));
          nft.uri = element[3];
          nft.enabled = element[4];
          nft.isRandom = element[5];
          nft.isFixed = element[6];
          nft.max = Number(element[7]);
          nft.min = Number(element[8]);
          nft.defaultWeight = Number(element[9]);
          nftTypes.push(nft);
        });
        const coming = {
          typeId: 0,
          typeName: 'claim',
          title: 'Coming',
          description: 'soon',
          price: '',
          icon: false,
          img: '',
          enabled: true,
          active: false,
        };
        nftTypes.push(coming);
      }
      state.nftTypes = nftTypes;
    });
    builder.addCase(getNftTypes.rejected, (state, { error }) => {
      console.log({ error });
      state.nftTypes = [];
    });
    builder.addCase(getNfts.pending, (state) => {
      state.nfts = [];
    });
    builder.addCase(getNfts.fulfilled, (state, { payload }) => {
      let nfts = [];
      const nftTypes = state.nftTypes;
      if (payload.length) {
        payload.forEach((item) => {
          const typeId = Number(item[0]);
          const nft = {
            typeId: typeId,
            tokenId: Number(item[1]),
            weight: Number(item[2]),
            address: item[3],
            catId: nftTypes[typeId].catId,
            typeName: nftTypes[typeId].typeName,
            title: nftTypes[typeId].title,
            description: nftTypes[typeId].description,
            isFixed: nftTypes[typeId].isFixed,
            isRandom: nftTypes[typeId].isRandom,
            enabled: nftTypes[typeId].enabled,
            img: nftTypes[typeId].img,
            icon: nftTypes[typeId].icon,
            price: nftTypes[typeId].price,
          };
          nfts.push(nft);
        });
      }
      state.nfts = nfts;
    });
    builder.addCase(getNfts.rejected, (state, { error }) => {
      state.nfts = [];
      console.log({ error });
    });
    builder.addCase(getBurnTokenAmount.pending, (state) => {
      state.burnTokenAmount = 0;
    });
    builder.addCase(getBurnTokenAmount.fulfilled, (state, { payload }) => {
      state.burnTokenAmount = Number(formatEther(payload));
    });
    builder.addCase(getBurnTokenAmount.rejected, (state, { error }) => {
      state.burnTokenAmount = 0;
      console.log({ error });
    });
    builder.addCase(getTyrhTokenAmount.pending, (state) => {
      state.tyrhTokenAmount = 0;
    });
    builder.addCase(getTyrhTokenAmount.fulfilled, (state, { payload }) => {
      state.tyrhTokenAmount = Number(formatEther(payload));
    });
    builder.addCase(getTyrhTokenAmount.rejected, (state, { error }) => {
      state.tyrhTokenAmount = 0;
      console.log({ error });
    });
    builder.addCase(getStakeTokenAmount.pending, (state) => {
      state.stakeTokenAmount = 0;
    });
    builder.addCase(getStakeTokenAmount.fulfilled, (state, { payload }) => {
      state.stakeTokenAmount = Number(formatEther(payload[0]));
    });
    builder.addCase(getStakeTokenAmount.rejected, (state, { error }) => {
      state.stakeTokenAmount = 0;
      console.log({ error });
    });
    builder.addCase(getClaimUserInfo.pending, (state) => {
      state.claimAmount = 0;
      state.claimed = false;
    });
    builder.addCase(getClaimUserInfo.fulfilled, (state, { payload }) => {
      state.claimAmount = Number(formatEther(payload[0]));
      state.claimed = payload[1];
    });
    builder.addCase(getClaimUserInfo.rejected, (state, { error }) => {
      console.log({ error });
    });
  },
});
export const { getMyNfts_ } = nftSlice.actions;
export default nftSlice.reducer;
