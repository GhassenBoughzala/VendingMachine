/* eslint-disable no-fallthrough */
/* eslint-disable import/no-anonymous-default-export */
import {
  GET_PRODUCTS_F,
  GET_PRODUCTS_S,
  LOADING_PRODUCTS,
  UP_PRODUCTS_F,
  UP_PRODUCTS_S,
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

    case UP_PRODUCTS_S:
        return {
          ...state,
          products: state.products.map((c) =>
            c._id === action.payload._id ? action.payload : c
          ),
        };
    case UP_PRODUCTS_F:

    default:
      return state;
  }
}
