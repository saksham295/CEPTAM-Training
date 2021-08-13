export const GET_FACULTY = "GET_FACULTY";
export const SET_LOADING = "SET_LOADING";

export interface FacultyState {
  users: any[];
  loading: boolean;
}

interface getFaculty {
  type: typeof GET_FACULTY;
  payload: any;
}

interface setLoading {
  type: typeof SET_LOADING;
  loading: boolean;
}

export type FacultyDispatchTypes = getFaculty | setLoading;
