import { Dispatch } from "redux";
import configData from "./config.json";
import axios from "axios";
import {
  GET_COURSE_BY_ID,
  SET_LOADING,
  CourseByIdDispatchTypes,
} from "../types/courseByIdTypes";
import setAuthToken from "../../utils/setAuthToken";

export const getCourseById =
  (id: string) => async (dispatch: Dispatch<CourseByIdDispatchTypes>) => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    try {
      dispatch({
        type: SET_LOADING,
        loading: true,
      });
      const res = await axios.get(`${configData.SERVER_URL}/course/` + id);
      dispatch({
        type: GET_COURSE_BY_ID,
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
