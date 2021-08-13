import {
  GET_CENTERS,
  ADD_SUCCESS,
  ADD_FAIL,
  CENTER_DIALOG,
  CenterState,
  CenterDispatchTypes,
} from "../types/centerTypes";

const initialState: CenterState = {
  centers: [],
  addcenter: false,
  addcenterError: undefined,
  isAdded: null,
  loading: false,
  dialogOpen: false,
};

const centerReducer = (state = initialState, action: CenterDispatchTypes) => {
  switch (action.type) {
    case GET_CENTERS:
      return {
        ...state,
        centers: action.payload,
        loading: false,
      };
    case ADD_SUCCESS:
      return {
        ...state,
        isAdded: true,
        centers: action.payload,
      };
    case ADD_FAIL:
      return {
        ...state,
        isAdded: false,
      };
    case CENTER_DIALOG:
      return {
        ...state,
        dialogOpen: action.payload,
      };
    default:
      return state;
  }
};

export default centerReducer;
