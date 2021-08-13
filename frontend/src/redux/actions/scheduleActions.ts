import { Dispatch } from "redux";
import configData from "./config.json";
import axios from "axios";
import {
  SET_SCHEDULE,
  ADD_SUCCESS,
  ADD_FAIL,
  SCHEDULE_DIALOG,
  ScheduleFields,
  ScheduleDispatchTypes,
} from "../types/scheduleTypes";
import setAuthToken from "../../utils/setAuthToken";
import {
  GET_COURSE_BY_ID,
  CourseByIdDispatchTypes,
} from "../types/courseByIdTypes";

export const openSDialog =
  (state: boolean) => async (dispatch: Dispatch<ScheduleDispatchTypes>) => {
    dispatch({
      type: SCHEDULE_DIALOG,
      payload: state,
    });
  };

export const addSchedule =
  (addFields: ScheduleFields) =>
  async (
    dispatch: Dispatch<ScheduleDispatchTypes | CourseByIdDispatchTypes>
  ) => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify(addFields);

    try {
      dispatch({
        type: SET_SCHEDULE,
        schedule: true,
      });
      const res = await axios.put(
        `${configData.SERVER_URL}/enroll/schedule`,
        body,
        config
      );
      dispatch({
        type: ADD_SUCCESS,
        payload: res.data,
      });
      dispatch({
        type: GET_COURSE_BY_ID,
        payload: res.data,
      });
      dispatch({
        type: SET_SCHEDULE,
        schedule: false,
      });
      dispatch({
        type: SCHEDULE_DIALOG,
        payload: false,
      });
    } catch (err) {
      const errors = err.response.data.errors;
      if (errors) console.log(errors);
      dispatch({
        type: ADD_FAIL,
      });
      dispatch({
        type: SET_SCHEDULE,
        schedule: false,
      });
    }
  };
