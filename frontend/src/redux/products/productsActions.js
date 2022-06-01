/* eslint-disable no-unreachable */
/* eslint-disable no-unused-vars */
import axios from "axios";
import { toast } from "react-toastify";
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

export const updateProduct = (id) => (dispatch) => {
  return axios
    .put(`http://localhost:5005/api/product/took`, { id: id })
    .then((res) => {
      dispatch({
        type: UP_PRODUCTS_S,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err), UP_PRODUCTS_F);
};

export const addQnt = (id) => (dispatch) => {
  return axios
    .put(`http://localhost:5005/api/product/admin/addQnt`, { id: id })
    .then((res) => {
      dispatch({
        type: UP_PRODUCTS_S,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err), UP_PRODUCTS_F);
};

export const addProduct = (product) => {
  const data = {
    title: product.title,
    price: product.price,
    img: product.img,
    quantity: product.quantity,
  };

  if (!data.title || !data.price || !data.quantity || !data.img) {
    toast.warn("Verify your fileds !");
  } else {
    return (dispatch) => {
      return axios
        .post(`http://localhost:5005/api/product`, data)
        .then((res) => {
          dispatch({
            type: ADD_PRODUCTS_S,
            payload: res.data,
          });
        })
        .catch(function (err) {
          return (
            dispatch({ type: ADD_PRODUCTS_F }),
            toast.warn(err.response.data.msg)
          );
        });
    };
  }
};


export const deleteProduct = (id) => (dispatch) => {
  return axios.delete(`http://localhost:5005/api/product`,  { id: id })
    .then((res) => {
      dispatch({
        type: DEL_PRODUCTS_S,
        payload: id,
      });
    })
    .catch(function (error) {
      return (
        DEL_PRODUCTS_F, console.log(error), toast.warn(error.response.data.msg)
      );
    });
};
