import {
  SET_CART,
  ADD_TO_CART,
  SET_PAYMENT,
  SET_ADDRESS,
} from "../actionTypes";

const initialState = {
  cart: [],
  payment: {},
  address: {},
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CART:
      return { ...state, cart: action.payload };

    case ADD_TO_CART: {
      const product = action.payload;
      if (!product?.id) return state;

      const existingIndex = state.cart.findIndex(
        (item) => item.product?.id === product.id
      );

      if (existingIndex === -1) {
        return {
          ...state,
          cart: [
            ...state.cart,
            { count: 1, checked: true, product },
          ],
        };
      }

      const nextCart = state.cart.map((item, idx) =>
        idx === existingIndex
          ? { ...item, count: item.count + 1 }
          : item
      );
      return { ...state, cart: nextCart };
    }

    case SET_PAYMENT:
      return { ...state, payment: action.payload };

    case SET_ADDRESS:
      return { ...state, address: action.payload };

    default:
      return state;
  }
};

export default cartReducer;
