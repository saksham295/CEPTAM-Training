import { Dispatch } from "redux";
import configData from "./config.json";
import axios from "axios";
import {
  SET_EMAIL_INPUT,
  SET_PASSWORD_INPUT,
  SET_SIGNING,
  SET_SIGNING_ERROR,
  AUTH_SUCCESS,
  AUTH_FAIL,
  AUTH_LOADED,
  SIGNOUT,
  AuthFields,
  AuthDispatchTypes,
} from "../types/authTypes";
import setAuthToken from "../../utils/setAuthToken";

export const setEmailInput =
  (input: string) => async (dispatch: Dispatch<AuthDispatchTypes>) => {
    dispatch({
      type: SET_EMAIL_INPUT,
      email: input,
    });
  };

export const setPasswordInput =
  (input: string) => async (dispatch: Dispatch<AuthDispatchTypes>) => {
    dispatch({
      type: SET_PASSWORD_INPUT,
      password: input,
    });
  };

export const loadAuth = () => async (dispatch: Dispatch<AuthDispatchTypes>) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get(`${configData.SERVER_URL}/auth/me`);
    dispatch({
      type: AUTH_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_FAIL,
    });
  }
};

export const signin =
  (authFields: AuthFields) => async (dispatch: Dispatch<AuthDispatchTypes>) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify(authFields);

    try {
      dispatch({
        type: SET_SIGNING,
        signing: true,
      });
      const res = await axios.post(
        `${configData.SERVER_URL}/auth/login`,
        body,
        config
      );
      dispatch({
        type: AUTH_SUCCESS,
        payload: res.data,
      });
      dispatch({
        type: SET_SIGNING,
        signing: false,
      });
    } catch (err) {
      const errors = err.response.data.errors;
      if (errors) console.log(errors);
      dispatch({
        type: AUTH_FAIL,
      });
      dispatch({
        type: SET_SIGNING,
        signing: false,
      });
      dispatch({
        type: SET_SIGNING_ERROR,
        signingError: "Invalid Credentials",
      });
    }
  };

export const signOut = () => async (dispatch: Dispatch<AuthDispatchTypes>) => {
  dispatch({
    type: SIGNOUT,
  });
};
