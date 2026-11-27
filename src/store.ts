import { configureStore } from '@reduxjs/toolkit';
import signatureReducer from './slice';

const store = configureStore({
  reducer: {
    signature: signatureReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
