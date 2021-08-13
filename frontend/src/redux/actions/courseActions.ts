import { Dispatch } from "redux";
import configData from "./config.json";
import axios from "axios";
import {
  GET_COURSES,
  SET_LOADING,
  ADD_SUCCESS,
  ADD_FAIL,
  COURSE_DIALOG,
  CourseFields,
  CourseDispatchTypes,
} from "../types/courseTypes";
import setAuthToken from "../../utils/setAuthToken";

export const openDialog =
  (state: boolean) => async (dispatch: Dispatch<CourseDispatchTypes>) => {
    dispatch({
      type: COURSE_DIALOG,
      payload: state,
    });
  };

export const getCourses =
  () => async (dispatch: Dispatch<CourseDispatchTypes>) => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    try {
      dispatch({
        type: SET_LOADING,
        loading: true,
      });
      const res = await axios.get(`${configData.SERVER_URL}/course`);
      dispatch({
        type: GET_COURSES,
        payload: res.data,
      });
      dispatch({
        type: SET_LOADING,
        loading: false,
      });
      dispatch({
        type: COURSE_DIALOG,
        payload: false,
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

export const addCourse =
  (addFields: CourseFields) =>
  async (dispatch: Dispatch<CourseDispatchTypes>) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify(addFields);

    try {
      const res = await axios.post(
        `${configData.SERVER_URL}/course`,
        body,
        config
      );
      dispatch({
        type: ADD_SUCCESS,
        payload: res.data,
      });
      dispatch({
        type: COURSE_DIALOG,
        payload: false,
      });
    } catch (err) {
      const errors = err.response.data.errors;
      if (errors) console.log(errors);
      dispatch({
        type: ADD_FAIL,
      });
    }
  };
