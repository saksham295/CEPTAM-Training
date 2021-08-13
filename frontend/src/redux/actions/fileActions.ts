import { Dispatch } from "redux";
import configData from "./config.json";
import axios from "axios";
import {
  GET_FILE,
  UPLOAD_STATUS,
  SET_LOADING,
  FileFields,
  fileDispatchTypes,
} from "../types/fileTypes";
import setAuthToken from "../../utils/setAuthToken";

export const getFile =
  (fileFields: FileFields) => async (dispatch: Dispatch<fileDispatchTypes>) => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    const body = JSON.stringify(fileFields);

    try {
      dispatch({
        type: SET_LOADING,
        loading: true,
      });
      const res = await axios.post(
        `${configData.SERVER_URL}/upload/uploadPdf`,
        body,
        config
      );
      dispatch({
        type: GET_FILE,
        payload: res.data,
      });
      dispatch({
        type: UPLOAD_STATUS,
        isUploaded: true,
      });
      dispatch({
        type: SET_LOADING,
        loading: false,
      });
    } catch (err) {
      const errors = err.response.data.errors;
      if (errors) console.log(errors);
      dispatch({
        type: UPLOAD_STATUS,
        isUploaded: false,
      });
      dispatch({
        type: SET_LOADING,
        loading: false,
      });
    }
  };
