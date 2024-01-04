import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { formatEther } from 'viem';
import { getTimeAmountContract } from '../helpers/contractFunctions/nft';
const initialState = {
  timePrice: 0,
  texanPrice: 0,
  claimCards: [
    { status: 'coming', name: 'phux', img: 'phux', balance: 750000 },
    { status: 'coming', name: 'toni', img: 'toni', balance: 50000 },
    { status: 'coming', name: 'plsp', img: 'plsp', balance: 5000 },
  ],

  timeCard: { status: 'complete', name: 'time', img: 'dollar', balance: 8500000 },

  texanCard: { status: 'active', name: 'texan', img: 'texan', balance: 3000000000 },
};

export const getTimePrice = createAsyncThunk('claim/getTimePrice', async () => {
  const result = await axios.get(
    'https://api.dexscreener.com/latest/dex/pairs/pulsechain/0xefab2c9c33c42960f2ff653adb39dc5c4c10630e'
  );

  return result;
});

export const getTexanPrice = createAsyncThunk('claim/getTexanPrice', async () => {
  const { data } = await axios.get(
    'https://api.dexscreener.com/latest/dex/pairs/pulsechain/0x53bf2cc26381ea7ebb927e220008bbff3447a2ec'
  );
  return data;
});

export const updateTimeAmount = createAsyncThunk('claim/updateTimeAmount', async (publicClient) => {
  const data = await getTimeAmountContract(publicClient);
  return data;
});

export const claimSlice = createSlice({
  name: 'claim',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getTimePrice.pending, (state) => {
      state.timePrice = 0;
    });
    builder.addCase(getTimePrice.fulfilled, (state, { payload }) => {
      state.timePrice = Number(payload?.data.pair.priceUsd);
    });
    builder.addCase(getTimePrice.rejected, (state, { error }) => {
      state.timePrice = 0;
      console.log({ error });
    });
    builder.addCase(getTexanPrice.pending, (state) => {
      state.texanPrice = 0;
    });
    builder.addCase(getTexanPrice.fulfilled, (state, { payload }) => {
      state.texanPrice = Number(payload?.pair.priceUsd);
    });
    builder.addCase(getTexanPrice, (state, { error }) => {
      console.log({ error });
    });
    builder.addCase(updateTimeAmount.fulfilled, (state, { payload }) => {
      state.timeCard = { ...state.timeCard, balance: Number(formatEther(payload)).toFixed(6) };
    });
    builder.addCase(updateTimeAmount.rejected, (state, { error }) => {
      console.log({ error });
    });
  },
});

export default claimSlice.reducer;
