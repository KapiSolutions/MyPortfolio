import { configureStore } from '@reduxjs/toolkit';
import deviceReducer from './slices/deviceSlice';

export const store = configureStore({
  reducer: {
    device: deviceReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
