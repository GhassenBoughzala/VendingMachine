import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

import products from "./products/productsReducer";

const intialState = {};

const middleware = [thunk];

const rootReducer = combineReducers({
  products,
});

const store = createStore(
  rootReducer,
  intialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
