/* eslint-disable no-fallthrough */
/* eslint-disable import/no-anonymous-default-export */
import {
  GET_PRODUCTS_F,
  GET_PRODUCTS_S,
  LOADING_PRODUCTS,
} from "./productsTypes";

const initialState = {
  loading: false,
  products: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOADING_PRODUCTS:
      return { ...state, products: [], loading: true };
    case GET_PRODUCTS_S:
      return { ...state, products: [...action.payload], loading: false };
    case GET_PRODUCTS_F:

    default:
      return state;
  }
}
