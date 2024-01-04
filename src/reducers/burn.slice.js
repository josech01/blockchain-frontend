import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
const initialState = {
  burnRanks: { pls: [], hex: [], plsx: [], inc: [] },
};

export const getBurnRanks = createAsyncThunk('burn/getBurnRanks', async () => {
  const { data } = await axios.get('https://backend.tyrh.io/info/burn-rank');
  return data;
});

export const burnSlice = createSlice({
  name: 'burn',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getBurnRanks.pending, (state) => {
      state.burnRanks = { pls: [], hex: [], plsx: [], inc: [] };
    });
    builder.addCase(getBurnRanks.fulfilled, (state, { payload }) => {
      state.burnRanks = payload;
    });
    builder.addCase(getBurnRanks, (state, { error }) => {
      console.log({ error });
    });
  },
});

export default burnSlice.reducer;
