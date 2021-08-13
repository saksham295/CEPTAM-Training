export const SET_ENROLLING = "SET_ENROLLING";
export const ENROLL_SUCCESS = "ENROLL_SUCCESS";
export const ENROLL_DIALOG = "ENROLL_DIALOG";
export const ENROLL_FAIL = "ENROLL_FAIL";

export interface EnrollFields {
  userid: string;
  courseid: string;
}

export interface EnrollState {
  enrolling: boolean;
  enrollingError: string | undefined;
  isEnrolled: boolean | null;
  dialogOpen: boolean;
}

interface SetEnrolling {
  type: typeof SET_ENROLLING;
  enrolling: boolean;
}

interface EnrollSuccess {
  type: typeof ENROLL_SUCCESS;
  payload: any;
}

interface EnrollFail {
  type: typeof ENROLL_FAIL;
}

interface setEnrollDialog {
  type: typeof ENROLL_DIALOG;
  payload: any;
}

export type EnrollDispatchTypes =
  | EnrollSuccess
  | EnrollFail
  | SetEnrolling
  | setEnrollDialog;
