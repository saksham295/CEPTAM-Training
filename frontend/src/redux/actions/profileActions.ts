import { Dispatch } from "redux";
import configData from "./config.json";
import axios from "axios";
import {
  GET_PROFILE,
  GET_COURSES,
  SET_PROFILE,
  SET_NAME,
  SET_EMAIL,
  SET_PHONE,
  SET_LOADING,
  SET_DIALOG,
  ProfileFields,
  ProfileDispatchTypes,
} from "../types/profileTypes";
import setAuthToken from "../../utils/setAuthToken";

export const openDialog =
  (state: boolean) => async (dispatch: Dispatch<ProfileDispatchTypes>) => {
    dispatch({
      type: SET_DIALOG,
      payload: state,
    });
  };

export const setName =
  (name: string) => async (dispatch: Dispatch<ProfileDispatchTypes>) => {
    dispatch({
      type: SET_NAME,
      name: name,
    });
  };

export const setEmail =
  (email: string) => async (dispatch: Dispatch<ProfileDispatchTypes>) => {
    dispatch({
      type: SET_EMAIL,
      email: email,
    });
  };

export const setPhone =
  (phone: string) => async (dispatch: Dispatch<ProfileDispatchTypes>) => {
    dispatch({
      type: SET_PHONE,
      phone: phone,
    });
  };

export const getProfile =
  () => async (dispatch: Dispatch<ProfileDispatchTypes>) => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    try {
      dispatch({
        type: SET_LOADING,
        loading: true,
      });
      const res = await axios.get(`${configData.SERVER_URL}/auth/me`);
      dispatch({
        type: GET_PROFILE,
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

export const getCourses =
  () => async (dispatch: Dispatch<ProfileDispatchTypes>) => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    try {
      dispatch({
        type: SET_LOADING,
        loading: true,
      });
      const res = await axios.get(`${configData.SERVER_URL}/auth/me/courses`);
      dispatch({
        type: GET_COURSES,
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

export const setProfile =
  (profileFields: ProfileFields) => async (dispatch: Dispatch<ProfileDispatchTypes>) => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify(profileFields);

    try {
      dispatch({
        type: SET_LOADING,
        loading: true,
      });
      const res = await axios.put(
        `${configData.SERVER_URL}/auth/editprofile`,
        body,
        config
      );
      dispatch({
        type: SET_PROFILE,
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
