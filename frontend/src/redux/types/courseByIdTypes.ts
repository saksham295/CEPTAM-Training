export const GET_COURSE_BY_ID = "GET_COURSE_BY_ID";
export const SET_LOADING = "SET_LOADING";

export interface CourseByIdState {
  courses: any[];
  loading: boolean;
}

interface getCourseById {
  type: typeof GET_COURSE_BY_ID;
  payload: any;
}

interface setLoading {
  type: typeof SET_LOADING;
  loading: boolean;
}

export type CourseByIdDispatchTypes = getCourseById | setLoading;
