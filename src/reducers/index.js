import { configureStore } from '@reduxjs/toolkit';
import nftReducer from './nft.slice';
import claimReducer from './claim.slice';
import burnReducer from './burn.slice';
export const store = configureStore({
  reducer: {
    nft: nftReducer,
    claim: claimReducer,
    burn: burnReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
