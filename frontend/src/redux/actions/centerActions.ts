import { Dispatch } from "redux";
import configData from "./config.json";
import axios from "axios";
import {
  GET_CENTERS,
  SET_LOADING,
  ADD_SUCCESS,
  CENTER_DIALOG,
  ADD_FAIL,
  CenterFields,
  CenterDispatchTypes,
} from "../types/centerTypes";
import setAuthToken from "../../utils/setAuthToken";

export const openDialog =
  (state: boolean) => async (dispatch: Dispatch<CenterDispatchTypes>) => {
    dispatch({
      type: CENTER_DIALOG,
      payload: state,
    });
  };

export const getCenters =
  () => async (dispatch: Dispatch<CenterDispatchTypes>) => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    try {
      dispatch({
        type: SET_LOADING,
        loading: true,
      });
      const res = await axios.get(`${configData.SERVER_URL}/center`);
      dispatch({
        type: GET_CENTERS,
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

export const addCenter =
  (addFields: CenterFields) =>
  async (dispatch: Dispatch<CenterDispatchTypes>) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify(addFields);

    try {
      const res = await axios.post(
        `${configData.SERVER_URL}/center`,
        body,
        config
      );
      dispatch({
        type: ADD_SUCCESS,
        payload: res.data,
      });
      dispatch({
        type: CENTER_DIALOG,
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
