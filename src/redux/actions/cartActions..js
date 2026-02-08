import api from "../../api/axios";
import {
  SET_CART,
  ADD_TO_CART,
  INCREMENT_CART_ITEM,
  DECREMENT_CART_ITEM,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM,
  SET_PAYMENT,
  SET_ADDRESS,
  SET_ADDRESS_LIST,
  SET_ADDRESS_LOADING,
  SET_ADDRESS_ERROR,
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

export const setAddressList = (list) => ({
  type: SET_ADDRESS_LIST,
  payload: list,
});

export const setAddressLoading = (isLoading) => ({
  type: SET_ADDRESS_LOADING,
  payload: isLoading,
});

export const setAddressError = (message) => ({
  type: SET_ADDRESS_ERROR,
  payload: message,
});

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: token } : {};
};

export const fetchAddresses = () => {
  return async (dispatch) => {
    dispatch(setAddressLoading(true));
    dispatch(setAddressError(""));
    try {
      const res = await api.get("/user/address", {
        headers: getAuthHeaders(),
      });
      const list = Array.isArray(res.data)
        ? res.data
        : res.data?.data || [];
      dispatch(setAddressList(list));
      return true;
    } catch (err) {
      console.error(err);
      dispatch(setAddressError("Adresler yüklenemedi."));
      return false;
    } finally {
      dispatch(setAddressLoading(false));
    }
  };
};

export const createAddress = (addressForm) => {
  return async (dispatch) => {
    dispatch(setAddressLoading(true));
    dispatch(setAddressError(""));
    try {
      await api.post("/user/address", addressForm, {
        headers: getAuthHeaders(),
      });
      await dispatch(fetchAddresses());
      return true;
    } catch (err) {
      console.error(err);
      dispatch(setAddressError("Adres kaydedilemedi."));
      return false;
    } finally {
      dispatch(setAddressLoading(false));
    }
  };
};

export const updateAddress = ({ id, ...addressForm }) => {
  return async (dispatch) => {
    if (!id) return false;
    dispatch(setAddressLoading(true));
    dispatch(setAddressError(""));
    try {
      await api.put(
        "/user/address",
        { id, ...addressForm },
        { headers: getAuthHeaders() }
      );
      await dispatch(fetchAddresses());
      return true;
    } catch (err) {
      console.error(err);
      dispatch(setAddressError("Adres kaydedilemedi."));
      return false;
    } finally {
      dispatch(setAddressLoading(false));
    }
  };
};

export const deleteAddress = (addressId) => {
  return async (dispatch) => {
    if (!addressId) return false;
    dispatch(setAddressLoading(true));
    dispatch(setAddressError(""));
    try {
      await api.delete(`/user/address/${addressId}`, {
        headers: getAuthHeaders(),
      });
      await dispatch(fetchAddresses());
      return true;
    } catch (err) {
      console.error(err);
      dispatch(setAddressError("Adres silinemedi."));
      return false;
    } finally {
      dispatch(setAddressLoading(false));
    }
  };
};
