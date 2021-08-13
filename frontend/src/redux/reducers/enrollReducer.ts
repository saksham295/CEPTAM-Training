import {
  SET_ENROLLING,
  ENROLL_SUCCESS,
  ENROLL_FAIL,
  ENROLL_DIALOG,
  EnrollState,
  EnrollDispatchTypes,
} from "../types/enrollTypes";

const initialState: EnrollState = {
  enrolling: false,
  enrollingError: undefined,
  isEnrolled: null,
  dialogOpen: false,
};

const enrollReducer = (state = initialState, action: EnrollDispatchTypes) => {
  switch (action.type) {
    case SET_ENROLLING:
      return {
        ...state,
        enrolling: action.enrolling,
      };
    case ENROLL_SUCCESS:
      return {
        ...state,
        isEnrolled: true,
      };
    case ENROLL_FAIL:
      return {
        ...state,
        isEnrolled: false,
      };
    case ENROLL_DIALOG:
      return {
        ...state,
        dialogOpen: action.payload,
      };
    default:
      return state;
  }
};

export default enrollReducer;
