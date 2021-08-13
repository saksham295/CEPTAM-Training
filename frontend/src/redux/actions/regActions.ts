import { Dispatch } from "redux";
import configData from "./config.json";
import axios from "axios";
import {
  SET_SIGNUPING,
  REG_SUCCESS,
  REG_FAIL,
  REG_DIALOG,
  RegFields,
  RegDispatchTypes,
} from "../types/regTypes";
import {
  GET_USER,
  UserDispatchTypes,
} from "../types/userTypes";

export const openRegDialog =
  (state: boolean) => async (dispatch: Dispatch<RegDispatchTypes>) => {
    dispatch({
      type: REG_DIALOG,
      payload: state,
    });
  };

export const signup =
  (regFields: RegFields) => async (dispatch: Dispatch<RegDispatchTypes | UserDispatchTypes>) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify(regFields);

    try {
      dispatch({
        type: SET_SIGNUPING,
        signuping: true,
      });
      const res = await axios.post(
        `${configData.SERVER_URL}/user/register`,
        body,
        config
      );
      dispatch({
        type: REG_SUCCESS,
        payload: res.data,
      });
      dispatch({
        type: GET_USER,
        payload: res.data,
      });
      dispatch({
        type: SET_SIGNUPING,
        signuping: false,
      });
      dispatch({
        type: REG_DIALOG,
        payload: false,
      });
    } catch (err) {
      const errors = err.response.data.errors;
      if (errors) console.log(errors);
      dispatch({
        type: REG_FAIL,
      });
      dispatch({
        type: SET_SIGNUPING,
        signuping: false,
      });
    }
  };