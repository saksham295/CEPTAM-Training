export const SET_SCHEDULE = "SET_SCHEDULE";
export const ADD_SUCCESS = "ADD_SUCCESS";
export const ADD_FAIL = "ADD_FAIL";
export const SCHEDULE_DIALOG = "SCHEDULE_DIALOG";
export const SET_LOADING = "SET_LOADING";

export interface ScheduleFields {
  cid: string;
  topic: string;
  faculty: string;
  from: Date | null;
  to: Date | null;
}

export interface ScheduleState {
  schedule: any[];
  addschedule: boolean;
  addscheduleError: string | undefined;
  isAdded: boolean | null;
  loading: boolean;
  dialogOpen: boolean;
}
interface setLoading {
  type: typeof SET_LOADING;
  loading: boolean;
}

interface setSchedule {
  type: typeof SET_SCHEDULE;
  schedule: boolean;
}

interface AddSuccess {
  type: typeof ADD_SUCCESS;
  payload: any;
}

interface AddFail {
  type: typeof ADD_FAIL;
}

interface setScheduleDialog {
  type: typeof SCHEDULE_DIALOG;
  payload: any;
}

export type ScheduleDispatchTypes =
  | setSchedule
  | AddSuccess
  | AddFail
  | setLoading
  | setScheduleDialog;
