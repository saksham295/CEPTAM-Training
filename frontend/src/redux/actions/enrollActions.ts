import { Dispatch } from "redux";
import configData from "./config.json";
import axios from "axios";
import {
  SET_ENROLLING,
  ENROLL_SUCCESS,
  ENROLL_FAIL,
  ENROLL_DIALOG,
  EnrollFields,
  EnrollDispatchTypes,
} from "../types/enrollTypes";
import {
  GET_COURSE_BY_ID,
  CourseByIdDispatchTypes,
} from "../types/courseByIdTypes";

export const openDialog =
  (state: boolean) => async (dispatch: Dispatch<EnrollDispatchTypes>) => {
    dispatch({
      type: ENROLL_DIALOG,
      payload: state,
    });
  };

export const enroll =
  (enrollFields: EnrollFields) =>
  async (dispatch: Dispatch<EnrollDispatchTypes | CourseByIdDispatchTypes>) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify(enrollFields);

    try {
      dispatch({
        type: SET_ENROLLING,
        enrolling: true,
      });
      const res = await axios.post(
        `${configData.SERVER_URL}/enroll`,
        body,
        config
      );
      dispatch({
        type: ENROLL_SUCCESS,
        payload: res.data,
      });
      dispatch({
        type: GET_COURSE_BY_ID,
        payload: res.data,
      });
      dispatch({
        type: SET_ENROLLING,
        enrolling: false,
      });
      dispatch({
        type: ENROLL_DIALOG,
        payload: false,
      });
    } catch (err) {
      const errors = err.response.data.errors;
      if (errors) console.log(errors);
      dispatch({
        type: ENROLL_FAIL,
      });
      dispatch({
        type: SET_ENROLLING,
        enrolling: false,
      });
    }
  };
