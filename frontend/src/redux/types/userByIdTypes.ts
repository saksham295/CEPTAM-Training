export const GET_USER_BY_ID = "GET_USER_BY_ID";
export const SET_LOADING = "SET_LOADING";
export const SET_USER = "SET_USER";
export const SET_NAME = "SET_NAME";
export const SET_EMAIL = "SET_EMAIL";
export const SET_PHONE = "SET_PHONE";
export const SET_CENTER = "SET_CENTER";
export const SET_ROLE = "SET_ROLE";
export const SET_DIALOG = "SET_DIALOG";

export interface UserByIdFields {
  id: string;
  name: string;
  email: string;
  phone: string;
  center: string;
  role: string;
}

export interface UserByIdState {
  user: {
    status: string;
    _id: string;
    name: string;
    email: string;
    phone: string;
    center: string;
    centerName: string;
    role: string;
  };
  loading: boolean;
  openDialog: boolean;
}

interface getUser {
  type: typeof GET_USER_BY_ID;
  payload: any;
}

interface setUser {
  type: typeof SET_USER;
  payload: any;
}

interface setLoading {
  type: typeof SET_LOADING;
  loading: boolean;
}

interface setName {
  type: typeof SET_NAME;
  name: string;
}

interface setEmail {
  type: typeof SET_EMAIL;
  email: string;
}

interface setPhone {
  type: typeof SET_PHONE;
  phone: string;
}

interface setCenter {
  type: typeof SET_CENTER;
  center: string;
}

interface setRole {
  type: typeof SET_ROLE;
  role: string;
}

interface setDialog {
  type: typeof SET_DIALOG;
  payload: any;
}

export type UserByIdDispatchTypes =
  | getUser
  | setUser
  | setLoading
  | setName
  | setEmail
  | setPhone
  | setCenter
  | setRole
  | setDialog;
