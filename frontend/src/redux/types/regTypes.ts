export const SET_SIGNUPING = "SET_SIGNUPING";
export const REG_SUCCESS = "REG_SUCCESS";
export const REG_FAIL = "REG_FAIL";
export const REG_DIALOG = "REG_DIALOG";

export interface RegFields {
  name: string;
  email: string;
  password: string;
  phone: string;
  center: string;
  role: string;
}

export interface RegState {
  user: any[]
  signuping: boolean;
  signupingError: string | undefined;
  isRegistered: boolean | null;
  dialogOpen: boolean;
}

interface SetSignuping {
  type: typeof SET_SIGNUPING;
  signuping: boolean;
}

interface RegSuccess {
  type: typeof REG_SUCCESS;
  payload: any;
}

interface RegFail {
  type: typeof REG_FAIL;
}

interface setRegDialog {
  type: typeof REG_DIALOG;
  payload: any;
} 

export type RegDispatchTypes =
  | RegSuccess
  | RegFail
  | SetSignuping
  | setRegDialog;
