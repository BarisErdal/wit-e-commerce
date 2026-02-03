import api from "../../api/axios";
import {
  SET_CATEGORIES,
  SET_PRODUCT_LIST,
  SET_TOTAL,
  SET_FETCH_STATE,
  SET_LIMIT,
  SET_OFFSET,
  SET_FILTER,
} from "../actionTypes";

export const setCategories = (data) => ({
  type: SET_CATEGORIES,
  payload: data,
});
export const setProductList = (data) => ({
  type: SET_PRODUCT_LIST,
  payload: data,
});
export const setTotal = (total) => ({ type: SET_TOTAL, payload: total });
export const setFetchState = (state) => ({
  type: SET_FETCH_STATE,
  payload: state,
});
export const setLimit = (limit) => ({ type: SET_LIMIT, payload: limit });
export const setOffset = (offset) => ({ type: SET_OFFSET, payload: offset });
export const setFilter = (filter) => ({ type: SET_FILTER, payload: filter });





export const fetchCategories = () => {
  return async (dispatch, getState) => {
    const { categories } = getState().product;

    //  sadece ihtiyaç varsa fetch
    if (categories.length > 0) return;

    dispatch(setFetchState("FETCHING"));

    try {
      const res = await api.get("/categories");
      dispatch(setCategories(res.data));
      dispatch(setFetchState("FETCHED"));
    } catch (error) {
      console.error(error);
      dispatch(setFetchState("FAILED"));
    }
  };
};


export const fetchProducts=()=>{

  return async (dispatch,getState) => {

  const {productList}=getState().product;
  if (productList.length > 0) return;

   dispatch(setFetchState("FETCHING"));

   try {
    const res = await api.get('/products')
    dispatch(setProductList(res.data.products))
    dispatch(setTotal(res.data.total));
      dispatch(setFetchState("FETCHED"));
   } catch (error) {
    console.error(error)
    dispatch(setFetchState("FAILED"));
   }


  }
}
