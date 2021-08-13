import { Dispatch } from "redux";
import configData from "./config.json";
import axios from "axios";
import {
  GET_USER_BY_ID,
  SET_USER,
  SET_NAME,
  SET_EMAIL,
  SET_PHONE,
  SET_CENTER,
  SET_ROLE,
  SET_LOADING,
  SET_DIALOG,
  UserByIdFields,
  UserByIdDispatchTypes,
} from "../types/userByIdTypes";
import setAuthToken from "../../utils/setAuthToken";

export const openDialog =
  (state: boolean) => async (dispatch: Dispatch<UserByIdDispatchTypes>) => {
    dispatch({
      type: SET_DIALOG,
      payload: state,
    });
  };

export const setName =
  (name: string) => async (dispatch: Dispatch<UserByIdDispatchTypes>) => {
    dispatch({
      type: SET_NAME,
      name: name,
    });
  };

export const setEmail =
  (email: string) => async (dispatch: Dispatch<UserByIdDispatchTypes>) => {
    dispatch({
      type: SET_EMAIL,
      email: email,
    });
  };

export const setPhone =
  (phone: string) => async (dispatch: Dispatch<UserByIdDispatchTypes>) => {
    dispatch({
      type: SET_PHONE,
      phone: phone,
    });
  };

export const setCenter =
  (center: string) => async (dispatch: Dispatch<UserByIdDispatchTypes>) => {
    dispatch({
      type: SET_CENTER,
      center: center,
    });
  };

export const setRole =  
  (role: string) => async (dispatch: Dispatch<UserByIdDispatchTypes>) => {
    dispatch({
      type: SET_ROLE,
      role: role,
    });
  };

export const getUserById =
  (id: string) => async (dispatch: Dispatch<UserByIdDispatchTypes>) => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    try {
      dispatch({
        type: SET_LOADING,
        loading: true,
      });
      const res = await axios.get(`${configData.SERVER_URL}/auth/user/` + id);
      dispatch({
        type: GET_USER_BY_ID,
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

  export const setUser =
  (userFields: UserByIdFields) => async (dispatch: Dispatch<UserByIdDispatchTypes>) => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify(userFields);

    try {
      dispatch({
        type: SET_LOADING,
        loading: true,
      });
      const res = await axios.put(
        `${configData.SERVER_URL}/user/edit`,
        body,
        config
      );
      dispatch({
        type: SET_USER,
        payload: res.data,
      });
      dispatch({
        type: SET_LOADING,
        loading: false,
      });
      dispatch({
        type: SET_DIALOG,
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
