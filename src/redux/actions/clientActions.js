import api from "../../api/axios";
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
      }

      // redirect logic
      const prevPath = history.location.state?.from;
      history.push(prevPath || "/");

    } catch (err) {
      console.error(err);
      toast.error("Email or password is incorrect!");
    }
  };
};