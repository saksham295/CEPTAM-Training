export const GET_CENTERS = "GET_CENTERS";
export const ADD_SUCCESS = "ADD_SUCCESS";
export const ADD_FAIL = "ADD_FAIL";
export const SET_LOADING = "SET_LOADING";
export const CENTER_DIALOG = "CENTER_DIALOG";

export interface CenterFields {
  name: string;
  city: string;
  type: string;
  subtype: string;
}

export interface CenterState {
  centers: any[];
  addcenter: boolean;
  addcenterError: string | undefined;
  isAdded: boolean | null;
  loading: boolean;
  dialogOpen: boolean;
}

interface getCenters {
  type: typeof GET_CENTERS;
  payload: any;
}

interface setLoading {
  type: typeof SET_LOADING;
  loading: boolean;
}

interface AddSuccess {
  type: typeof ADD_SUCCESS;
  payload: any;
}

interface AddFail {
  type: typeof ADD_FAIL;
}

interface setCenterDialog {
  type: typeof CENTER_DIALOG;
  payload: any;
}

export type CenterDispatchTypes =
  | getCenters
  | AddSuccess
  | AddFail
  | setLoading
  | setCenterDialog;
