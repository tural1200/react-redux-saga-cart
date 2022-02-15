import { call, put, takeEvery } from "redux-saga/effects";
import { getItemsSuccess} from '../Slices/productsSlice';

function* workGetProductsFetch() {
  const products = yield call(() => fetch("https://fakestoreapi.com/products"));
  const formattedProducts = yield products.json();
  yield put(getItemsSuccess(formattedProducts))
};


function* productSaga() {
  yield takeEvery('products/getItemsFetch', workGetProductsFetch)
}

export default productSaga