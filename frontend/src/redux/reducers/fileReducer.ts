import {
  UPLOAD_STATUS,
  GET_FILE,
  FileState,
  fileDispatchTypes,
} from "../types/fileTypes";

const initialState: FileState = {
  loading: false,
  isUploaded: false,
};

const fileReducer = (state = initialState, action: fileDispatchTypes) => {
  switch (action.type) {
    case GET_FILE:
      return {
        ...state,
        payload: action.payload,
        loading: false,
      };
    case UPLOAD_STATUS:
      return {
        ...state,
        uploadstatus: action.isUploaded,
        loading: false,
      };
    default:
      return state;
  }
};

export default fileReducer;
