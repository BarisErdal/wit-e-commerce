import {
  SET_CART,
  ADD_TO_CART,
  SET_PAYMENT,
  SET_ADDRESS,
} from "../actionTypes";

export const setCart = (cart) => ({
  type: SET_CART,
  payload: cart,
});

export const addToCart = (product) => ({
  type: ADD_TO_CART,
  payload: product,
});

export const setPayment = (payment) => ({
  type: SET_PAYMENT,
  payload: payment,
});

export const setAddress = (address) => ({
  type: SET_ADDRESS,
  payload: address,
});
