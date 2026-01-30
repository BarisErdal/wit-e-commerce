import axios from "axios";
import { setRoles } from "./clientActions";

export const fetchRolesIfNeeded = () => {
  return async (dispatch, getState) => {
    const { roles } = getState().client;

    if (roles.length > 0) return; //  already fetched

    try {
      const res = await axios.get(
        "https://workintech-fe-ecommerce.onrender.com/roles"
      );
      dispatch(setRoles(res.data));
    } catch (err) {
      console.error("Roles fetch failed", err);
    }
  };
};
