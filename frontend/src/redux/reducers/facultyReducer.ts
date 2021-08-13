import {
  GET_FACULTY,
  FacultyState,
  FacultyDispatchTypes,
} from "../types/facultyTypes";

const initialState: FacultyState = {
  users: [],
  loading: false,
};

const facultyReducer = (state = initialState, action: FacultyDispatchTypes) => {
  switch (action.type) {
    case GET_FACULTY:
      return {
        ...state,
        users: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default facultyReducer;
