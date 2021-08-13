export const GET_PROFILE = "GET_PROFILE";
export const GET_COURSES = "GET_COURSES";
export const SET_PROFILE = "SET_PROFILE";
export const SET_LOADING = "SET_LOADING";
export const SET_NAME = "SET_NAME";
export const SET_EMAIL = "SET_EMAIL";
export const SET_PHONE = "SET_PHONE";
export const SET_DIALOG = "SET_DIALOG";

export interface ProfileFields {
  id: string;
  name: string;
  email: string;
  phone: string;
}

export interface ProfileState {
  profile: {
    status: string;
    _id: string;
    name: string;
    email: string;
    phone: string;
    center: string;
    centerName: string;
    role: string;
  };
  courses: any[]
  loading: boolean;
  openDialog: boolean;
}

interface getProfile {
  type: typeof GET_PROFILE;
  payload: any;
}

interface getCourses {
  type: typeof GET_COURSES;
  payload: any;
}

interface setProfile {
  type: typeof SET_PROFILE;
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

interface setDialog {
  type: typeof SET_DIALOG;
  payload: any;
}

export type ProfileDispatchTypes = getProfile | setProfile | setLoading  | setName | setEmail | setPhone | setDialog | getCourses;
