import { Dispatch } from "redux";
import configData from "./config.json";
import axios from "axios";
import {
  GET_USER,
  SET_LOADING,
  SET_STATUS,
  STATUS_DIALOG,
  UserFields,
  UserDispatchTypes,
} from "../types/userTypes";
import setAuthToken from "../../utils/setAuthToken";

export const openDialog =
  (state: boolean) => async (dispatch: Dispatch<UserDispatchTypes>) => {
    dispatch({
      type: STATUS_DIALOG,
      payload: state,
    });
  };

export const getUsers = () => async (dispatch: Dispatch<UserDispatchTypes>) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    dispatch({
      type: SET_LOADING,
      loading: true,
    });
    const res = await axios.get(`${configData.SERVER_URL}/user`);
    dispatch({
      type: GET_USER,
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

export const changeStatus =
  (userFields: UserFields) => async (dispatch: Dispatch<UserDispatchTypes>) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify(userFields);

    try {
      dispatch({
        type: SET_STATUS,
        statusChanging: true,
      });
      const res = await axios.post(
        `${configData.SERVER_URL}/auth/changestatus`,
        body,
        config
      );
      dispatch({
        type: GET_USER,
        payload: res.data,
      });
      dispatch({
        type: SET_STATUS,
        statusChanging: false,
      });
      dispatch({
        type: STATUS_DIALOG,
        payload: false,
      });
    } catch (err) {
      const errors = err.response.data.errors;
      if (errors) console.log(errors);
      dispatch({
        type: SET_STATUS,
        statusChanging: false,
      });
    }
  };
