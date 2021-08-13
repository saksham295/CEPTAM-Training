import {
  GET_COURSE_BY_ID,
  CourseByIdState,
  CourseByIdDispatchTypes,
} from "../types/courseByIdTypes";

const initialState: CourseByIdState = {
  courses: [],
  loading: false,
};

const courseByIdReducer = (
  state = initialState,
  action: CourseByIdDispatchTypes
) => {
  switch (action.type) {
    case GET_COURSE_BY_ID:
      return {
        ...state,
        courses: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default courseByIdReducer;
