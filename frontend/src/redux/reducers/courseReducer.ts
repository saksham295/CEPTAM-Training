import {
  GET_COURSES,
  ADD_SUCCESS,
  ADD_FAIL,
  COURSE_DIALOG,
  CourseState,
  CourseDispatchTypes,
} from "../types/courseTypes";

const initialState: CourseState = {
  courses: [],
  addcourse: false,
  addcourseError: undefined,
  isAdded: null,
  loading: false,
  dialogOpen: false,
};

const courseReducer = (state = initialState, action: CourseDispatchTypes) => {
  switch (action.type) {
    case GET_COURSES:
      return {
        ...state,
        courses: action.payload,
        loading: false,
      };
    case ADD_SUCCESS:
      return {
        ...state,
        courses: action.payload,
        isAdded: true,
      };
    case ADD_FAIL:
      return {
        ...state,
        isAdded: false,
      };
    case COURSE_DIALOG:
      return {
        ...state,
        dialogOpen: action.payload,
      };
    default:
      return state;
  }
};

export default courseReducer;
