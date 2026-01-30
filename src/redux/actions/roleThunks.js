
import { setRoles } from "./clientActions";
import api from "../../api/axios";

export const fetchRolesIfNeeded = () => {

    
  return async (dispatch, getState) => {
    const { roles } = getState().client;

    if (roles.length > 0) return; //  already fetched

    try {
      const res = await api.get("/roles");
      dispatch(setRoles(res.data));
    } catch (err) {
      console.error("Roles fetch failed", err);
    }
  };
};
