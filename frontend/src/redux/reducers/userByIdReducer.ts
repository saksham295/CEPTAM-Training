import {
  GET_USER_BY_ID,
  SET_USER,
  SET_NAME,
  SET_EMAIL,
  SET_PHONE,
  SET_CENTER,
  SET_ROLE,
  SET_DIALOG,
  UserByIdState,
  UserByIdDispatchTypes,
} from "../types/userByIdTypes";

const initialState: UserByIdState = {
  user: {
    status: '',
    _id: '',
    name: '',
    email: '',
    phone: '',
    center: '',
    centerName: '',
    role: '',
  },
  loading: false,
  openDialog: false,
};

const userByIdReducer = (
  state = initialState,
  action: UserByIdDispatchTypes
) => {
  switch (action.type) {
    case GET_USER_BY_ID:
      return {
        ...state,
        user: action.payload,
        loading: false,
      };
    case SET_USER:
      return {
        ...state,
        user: action.payload,
        loading: false,
      };
    case SET_NAME:
      return {
        ...state,
        user: {
          ...state.user,
          name: action.name,
        } 
      }
    case SET_EMAIL:
      return {
        ...state,
        user: {
          ...state.user,
          email: action.email,
        } 
      }
    case SET_PHONE:
      return {
        ...state,
        user: {
          ...state.user,
          phone: action.phone,
        } 
      }
    case SET_CENTER:
      return {
        ...state,
        user: {
          ...state.user,
          center: action.center,
        } 
      }
    case SET_ROLE:
      return {
        ...state,
        user: {
          ...state.user,
          role: action.role,
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

export default userByIdReducer;
