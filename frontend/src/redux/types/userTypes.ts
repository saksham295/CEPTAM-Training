export const GET_USER = "GET_USER";
export const SET_LOADING = "SET_LOADING";
export const SET_STATUS = "SET_STATUS";
export const STATUS_DIALOG = "STATUS_DIALOG";

export interface UserFields {
  userid: string;
  newstatus: string;
}

export interface UserState {
  users: any[];
  loading: boolean;
  statusChanging: boolean;
  dialogOpen: boolean;
}

interface getUser {
  type: typeof GET_USER;
  payload: any;
}

interface setLoading {
  type: typeof SET_LOADING;
  loading: boolean;
}

interface setstatusChanging {
  type: typeof SET_STATUS;
  statusChanging: boolean;
}

interface setStatusDialog {
  type: typeof STATUS_DIALOG;
  payload: any;
}

export type UserDispatchTypes =
  | getUser
  | setLoading
  | setstatusChanging
  | setStatusDialog;
