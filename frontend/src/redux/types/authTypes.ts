export const SET_EMAIL_INPUT = "SET_EMAIL_INPUT";
export const SET_PASSWORD_INPUT = "SET_PASSWORD_INPUT";
export const SET_SIGNING = "SET_SIGNING";
export const SET_SIGNING_ERROR = "SET_SIGNING_ERROR";
export const AUTH_SUCCESS = "AUTH_SUCCESS";
export const AUTH_FAIL = "AUTH_FAIL";
export const AUTH_LOADED = "AUTH_LOAD";
export const SIGNOUT = "SIGNOUT";

export interface AuthFields {
  email: string;
  password: string;
}

export interface AuthState {
  signing: boolean;
  signingError: string;
  email: string;
  password: string;
  token: string | null;
  isAuthenticated: boolean | null;
  loading: boolean;
  user: any;
}

interface SetEmailInput {
  type: typeof SET_EMAIL_INPUT;
  email: string;
}

interface SetPasswordInput {
  type: typeof SET_PASSWORD_INPUT;
  password: string;
}

interface SetSigning {
  type: typeof SET_SIGNING;
  signing: boolean;
}

interface AuthSuccess {
  type: typeof AUTH_SUCCESS;
  payload: any;
}

interface AuthFail {
  type: typeof AUTH_FAIL;
}

export interface AuthLoaded {
  type: typeof AUTH_LOADED;
  payload: any;
}

export interface SetSigningError {
  type: typeof SET_SIGNING_ERROR;
  signingError: string;
}

interface SignOut {
  type: typeof SIGNOUT;
}

export type AuthDispatchTypes =
  | SetEmailInput
  | SetPasswordInput
  | SetSigning
  | AuthSuccess
  | AuthFail
  | AuthLoaded
  | SetSigningError
  | SignOut;
