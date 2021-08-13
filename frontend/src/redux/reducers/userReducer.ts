import {
  GET_USER,
  SET_STATUS,
  STATUS_DIALOG,
  UserState,
  UserDispatchTypes,
} from "../types/userTypes";

const initialState: UserState = {
  users: [],
  loading: false,
  statusChanging: false,
  dialogOpen: false,
};

const userReducer = (state = initialState, action: UserDispatchTypes) => {
  switch (action.type) {
    case GET_USER:
      return {
        ...state,
        users: action.payload,
        loading: false,
      };
    case SET_STATUS:
      return {
        ...state,
        statusChanging: action.statusChanging,
      };
    case STATUS_DIALOG:
      return {
        ...state,
        dialogOpen: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
