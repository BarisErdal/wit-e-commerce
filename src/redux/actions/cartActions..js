import {
  SET_CART,
  ADD_TO_CART,
  INCREMENT_CART_ITEM,
  DECREMENT_CART_ITEM,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM,
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

export const incrementCartItem = (productId) => ({
  type: INCREMENT_CART_ITEM,
  payload: productId,
});

export const decrementCartItem = (productId) => ({
  type: DECREMENT_CART_ITEM,
  payload: productId,
});

export const removeCartItem = (productId) => ({
  type: REMOVE_CART_ITEM,
  payload: productId,
});

export const toggleCartItem = (productId) => ({
  type: TOGGLE_CART_ITEM,
  payload: productId,
});

export const setPayment = (payment) => ({
  type: SET_PAYMENT,
  payload: payment,
});

export const setAddress = (address) => ({
  type: SET_ADDRESS,
  payload: address,
});
