import axios from "axios";
import { toast } from "react-toastify";
import { GET_PRODUCTS_F, GET_PRODUCTS_S, LOADING_PRODUCTS } from "./productsTypes";

//Actions
export const allProducts = () => (dispatch) => {
  dispatch({ type: LOADING_PRODUCTS });
  setTimeout(() => {
    return axios
      .get(`http://localhost:5005/api/product`)
      .then((res) => {
        dispatch({
          type: GET_PRODUCTS_S,
          payload: res.data,
        });
      })
      .catch((err) => console.log(err), GET_PRODUCTS_F);
  }, 500);
};