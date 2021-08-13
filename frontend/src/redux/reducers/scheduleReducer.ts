import {
  SET_SCHEDULE,
  ADD_SUCCESS,
  ADD_FAIL,
  SCHEDULE_DIALOG,
  ScheduleState,
  ScheduleDispatchTypes,
} from "../types/scheduleTypes";

const initialState: ScheduleState = {
  schedule: [],
  addschedule: false,
  addscheduleError: undefined,
  isAdded: null,
  loading: false,
  dialogOpen: false,
};

const scheduleReducer = (
  state = initialState,
  action: ScheduleDispatchTypes
) => {
  switch (action.type) {
    case SET_SCHEDULE:
      return {
        ...state,
        schedule: action.schedule,
      };
    case ADD_SUCCESS:
      return {
        ...state,
        isAdded: true,
      };
    case ADD_FAIL:
      return {
        ...state,
        isAdded: false,
      };
    case SCHEDULE_DIALOG:
      return {
        ...state,
        dialogOpen: action.payload,
      };
    default:
      return state;
  }
};

export default scheduleReducer;
