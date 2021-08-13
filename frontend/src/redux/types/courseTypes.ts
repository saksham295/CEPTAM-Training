export const GET_COURSES = "GET_COURSES";
export const ADD_SUCCESS = "ADD_SUCCESS";
export const ADD_FAIL = "ADD_FAIL";
export const SET_LOADING = "SET_LOADING";
export const COURSE_DIALOG = "COURSE_DIALOG";

export interface CourseFields {
  title: string;
  venue: string;
  from: Date | null;
  to: Date | null;
}

export interface CourseState {
  courses: any[];
  addcourse: boolean;
  addcourseError: string | undefined;
  isAdded: boolean | null;
  loading: boolean;
  dialogOpen: boolean;
}

interface getCourses {
  type: typeof GET_COURSES;
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

interface setCourseDialog {
  type: typeof COURSE_DIALOG;
  payload: any;
}

export type CourseDispatchTypes =
  | getCourses
  | AddSuccess
  | AddFail
  | setLoading
  | setCourseDialog;
