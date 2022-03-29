import { configureStore } from '@reduxjs/toolkit';
import productsReducer from '../features/store/products/productsSlice';
import transactionsReducer from '../features/store/transactions/transactionsSlice';

export const store = configureStore({
  reducer: {
    products: productsReducer,
    transactions: transactionsReducer,
  },
});
