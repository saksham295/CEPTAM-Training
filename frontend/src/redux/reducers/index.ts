import { combineReducers } from "redux";
import auth from "./authReducer";
import reg from "./regReducer";
import course from "./courseReducer";
import coursebyid from "./courseByIdReducer";
import userbyid from "./userByIdReducer";
import center from "./centerReducer";
import profile from "./profileReducer";
import schedule from "./scheduleReducer";
import enroll from "./enrollReducer";
import user from "./userReducer";
import faculty from "./facultyReducer";

export default combineReducers({
  auth,
  reg,
  course,
  coursebyid,
  userbyid,
  center,
  profile,
  schedule,
  enroll,
  user,
  faculty,
});
