import { Store, createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import rootReducer from "./reducers";
import { AuthState } from "./types/authTypes";
import { RegState } from "./types/regTypes";
import { CourseState } from "./types/courseTypes";
import { CourseByIdState } from "./types/courseByIdTypes";
import { UserByIdState } from "./types/userByIdTypes";
import { CenterState } from "./types/centerTypes";
import { ProfileState } from "./types/profileTypes";
import { ScheduleState } from "./types/scheduleTypes";
import { EnrollState } from "./types/enrollTypes";
import { UserState } from "./types/userTypes";
import { FacultyState } from "./types/facultyTypes";

export interface AppState {
  auth: AuthState;
  reg: RegState;
  course: CourseState;
  coursebyid: CourseByIdState;
  userbyid: UserByIdState;
  center: CenterState;
  profile: ProfileState;
  schedule: ScheduleState;
  enroll: EnrollState;
  user: UserState;
  faculty: FacultyState;
}

export function configureStore(preloadedState?: AppState): Store<any> {
  let middleware = applyMiddleware(thunk);
  middleware = composeWithDevTools(middleware);

  const store = createStore(
    rootReducer as any,
    preloadedState as AppState,
    middleware
  ) as Store<any>;

  return store;
}
