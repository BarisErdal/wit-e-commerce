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

const initialState = {
  cart: [],
  payment: {},
  address: {},
  addressList: [],
  addressLoading: false,
  addressError: "",
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

    case INCREMENT_CART_ITEM: {
      const productId = action.payload;
      if (!productId) return state;
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.product?.id === productId
            ? { ...item, count: (item.count || 0) + 1 }
            : item
        ),
      };
    }

    case DECREMENT_CART_ITEM: {
      const productId = action.payload;
      if (!productId) return state;
      return {
        ...state,
        cart: state.cart
          .map((item) =>
            item.product?.id === productId
              ? { ...item, count: Math.max(1, (item.count || 1) - 1) }
              : item
          )
          .filter((item) => item.count > 0),
      };
    }

    case REMOVE_CART_ITEM: {
      const productId = action.payload;
      if (!productId) return state;
      return {
        ...state,
        cart: state.cart.filter(
          (item) => item.product?.id !== productId
        ),
      };
    }

    case TOGGLE_CART_ITEM: {
      const productId = action.payload;
      if (!productId) return state;
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.product?.id === productId
            ? { ...item, checked: !item.checked }
            : item
        ),
      };
    }

    case SET_PAYMENT:
      return { ...state, payment: action.payload };

    case SET_ADDRESS:
      return { ...state, address: action.payload };
    case SET_ADDRESS_LIST:
      return { ...state, addressList: action.payload };
    case SET_ADDRESS_LOADING:
      return { ...state, addressLoading: action.payload };
    case SET_ADDRESS_ERROR:
      return { ...state, addressError: action.payload };

    default:
      return state;
  }
};

export default cartReducer;
