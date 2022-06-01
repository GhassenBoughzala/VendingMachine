/* eslint-disable no-fallthrough */
/* eslint-disable import/no-anonymous-default-export */
import {
  ADD_PRODUCTS_F,
  ADD_PRODUCTS_S,
  DEL_PRODUCTS_F,
  DEL_PRODUCTS_S,
  GET_PRODUCTS_F,
  GET_PRODUCTS_S,
  LOADING_PRODUCTS,
  LOADING_UPDATE,
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

    case LOADING_UPDATE:
      return { ...state, products: [], loading: true };
    case UP_PRODUCTS_S:
      return {
        ...state,
        products: state.products.map((c) =>
          c._id === action.payload._id ? action.payload : c
        ),
      };
    case UP_PRODUCTS_F:

    case ADD_PRODUCTS_S:
      return {
        ...state,
        products: [...state.products, ...action.payload],
      };
    case ADD_PRODUCTS_F:

    case DEL_PRODUCTS_S:
      return {
        ...state,
        products: state.products.filter((c) => c._id !== action.payload),
      };
    case DEL_PRODUCTS_F:

    default:
      return state;
  }
}
