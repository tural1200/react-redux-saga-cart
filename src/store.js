import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './Slices/addToCartSlice'
import productReducer from './Slices/productsSlice'
import createSagaMiddleware from 'redux-saga';
import productSaga from './Sagas/productSaga';

const saga = createSagaMiddleware();

export default configureStore({
  reducer: {
      cart: cartReducer,
      products: productReducer
  },
  middleware: [saga]
});
saga.run(productSaga);