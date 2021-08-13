import {
  SET_EMAIL_INPUT,
  SET_PASSWORD_INPUT,
  SET_SIGNING,
  SET_SIGNING_ERROR,
  AUTH_SUCCESS,
  AUTH_FAIL,
  AUTH_LOADED,
  SIGNOUT,
  AuthState,
  AuthDispatchTypes,
} from "../types/authTypes";

const initialState: AuthState = {
  signing: false,
  signingError: "",
  email: "",
  password: "",
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  loading: true,
  user: null,
};

const authReducer = (state = initialState, action: AuthDispatchTypes) => {
  switch (action.type) {
    case SET_EMAIL_INPUT:
      return {
        ...state,
        email: action.email,
      };
    case SET_PASSWORD_INPUT:
      return {
        ...state,
        password: action.password,
      };
    case SET_SIGNING:
      return {
        ...state,
        signing: action.signing,
      };
    case SET_SIGNING_ERROR:
      return {
        ...state,
        signingError: action.signingError,
      };
    case AUTH_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: action.payload,
      };
    case AUTH_SUCCESS:
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        loading: false,
        email: "",
        password: "",
      };
    case AUTH_FAIL:
      localStorage.removeItem("token");
      return {
        ...state,
        isAuthenticated: false,
        loading: false,
      };
    case SIGNOUT:
      localStorage.clear();
      return {
        ...initialState,
      };

    default:
      return state;
  }
};

export default authReducer;
