import {
  SET_SIGNUPING,
  REG_SUCCESS,
  REG_FAIL,
  REG_DIALOG,
  RegState,
  RegDispatchTypes,
} from "../types/regTypes";

const initialState: RegState = {
  user: [],
  signuping: false,
  signupingError: undefined,
  isRegistered: null,
  dialogOpen: false,
};

const regReducer = (state = initialState, action: RegDispatchTypes) => {
  switch (action.type) {
    case SET_SIGNUPING:
      return {
        ...state,
        signuping: action.signuping,
      };
    case REG_SUCCESS:
      return {
        ...state,
        isRegistered: true,
        user: action.payload,
      };
    case REG_FAIL:
      return {
        ...state,
        isRegistered: false,
      };
    case REG_DIALOG:
      return {
        ...state,
        dialogOpen: action.payload,
      };
    default:
      return state;
  }
};

export default regReducer;
