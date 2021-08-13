import { Dispatch } from "redux";
import configData from "./config.json";
import axios from "axios";
import {
  GET_FACULTY,
  SET_LOADING,
  FacultyDispatchTypes,
} from "../types/facultyTypes";
import setAuthToken from "../../utils/setAuthToken";

export const getFaculty =
  () => async (dispatch: Dispatch<FacultyDispatchTypes>) => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    try {
      dispatch({
        type: SET_LOADING,
        loading: true,
      });
      const res = await axios.get(`${configData.SERVER_URL}/user/faculty`);
      dispatch({
        type: GET_FACULTY,
        payload: res.data,
      });
      dispatch({
        type: SET_LOADING,
        loading: false,
      });
    } catch (err) {
      const errors = err.response.data.errors;
      if (errors) console.log(errors);
      dispatch({
        type: SET_LOADING,
        loading: false,
      });
    }
  };
