import {
  GET_PROFILE,
  GET_COURSES,
  SET_PROFILE,
  SET_NAME,
  SET_EMAIL,
  SET_PHONE,
  SET_DIALOG,
  ProfileState,
  ProfileDispatchTypes,
} from "../types/profileTypes";

const initialState: ProfileState = {
  profile: {
    status: '',
    _id: '',
    name: '',
    email: '',
    phone: '',
    center: '',
    centerName: '',
    role: '',
  },
  courses: [],
  loading: false,
  openDialog: false,
}

const profileReducer = (state = initialState, action: ProfileDispatchTypes) => {
  switch (action.type) {
    case GET_PROFILE:
      return {
        ...state,
        profile: action.payload,
        loading: false,
      };
    case GET_COURSES:
      return {
        ...state,
        courses: action.payload,
        loading: false,
      };
    case SET_PROFILE:
      return {
        ...state,
        profile: action.payload,
        loading: false,
      };
      case SET_NAME:
        return {
          ...state,
          profile: {
            ...state.profile,
            name: action.name,
          } 
        }
      case SET_EMAIL:
        return {
          ...state,
          profile: {
            ...state.profile,
            email: action.email,
          } 
        }
      case SET_PHONE:
        return {
          ...state,
          profile: {
            ...state.profile,
            phone: action.phone,
          } 
        }
      case SET_DIALOG:
        return {
          ...state,
            openDialog: action.payload,
        }
    default:
      return state;
  }
};

export default profileReducer;
