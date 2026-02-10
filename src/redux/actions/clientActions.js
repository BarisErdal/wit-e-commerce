import api, { setAuthToken } from "../../api/axios";
import { toast } from "react-toastify";
import {
  SET_USER,
  SET_ROLES,
  SET_THEME,
  SET_LANGUAGE,
} from "../actionTypes";

export const setUser = (user) => ({
  type: SET_USER,
  payload: user,
});

export const setRoles = (roles) => ({
  type: SET_ROLES,
  payload: roles,
});

export const setTheme = (theme) => ({
  type: SET_THEME,
  payload: theme,
});

export const setLanguage = (language) => ({
  type: SET_LANGUAGE,
  payload: language,
});


export const loginUser = (formData, history) => {
  
  return async (dispatch) => {
    try {
      const res = await api.post("/login", formData);

      dispatch({
        type: "SET_USER",
        payload: res.data,
      });

      // remember me
      if (formData.remember) {
        localStorage.setItem("token", res.data.token);
        setAuthToken(res.data.token);
      }

      // redirect logic
      const prevPath = history.location.state?.from;
      history.push(prevPath || "/");
      toast.success("Successfully logged in");

    } catch (err) {
      console.error(err);
      toast.error("Email or password is incorrect!");
    }
  };
};




export const restoreUser = () => {
  return async (dispatch) => {
    const token = localStorage.getItem("token");

    if (!token) return;

    // token'ı axios'a ekle
    setAuthToken(token);

    try {
      const res = await api.get("/verify");

      // backend yeni token döndürüyor
      const {  token: newToken } = res.data;

      dispatch({
        type: "SET_USER",
        payload: res.data,
      });

      // token yenile
      localStorage.setItem("token", newToken);
      setAuthToken(newToken);

    } catch (err) {
      // token geçersiz
      console.error(err)
      localStorage.removeItem("token");
      setAuthToken(null);

      dispatch({
        type: "SET_USER",
        payload: null,
      });
    }
  };
};



export const logout = () => {
  return (dispatch) => {
    localStorage.removeItem("token");
    setAuthToken(null);

    dispatch({
      type: "SET_USER",
      payload: null,
    });
  };
};