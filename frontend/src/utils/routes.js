import { Navigate } from "react-router-dom";

import PrivateLayout from "../components/layouts/PrivateLayout";
import PublicLayout from "../components/layouts/PublicLayout";
import ErrorLayout from "../components/layouts/ErrorLayout";

import Dashboard from "../components/pages/Dashboard";
import Login from "../components/pages/Login";
import Profile from "../components/pages/Profile";
import GetUserCourses from "../components/pages/GetUserCourses";
import GetUsers from "../components/pages/GetUsers";
import GetCourses from "../components/pages/GetCourses";
import GetCenters from "../components/pages/GetCenters";
import GetCourseById from "../components/pages/GetCourseById";
import GetUserById from "../components/pages/GetUserById";
import NotFound from "../components/pages/404";

const routes = (isAuthenticated) => [
  {
    path: "app",
    element: isAuthenticated ? <PrivateLayout /> : <Navigate to="/" />,
    children: [
      { path: "dashboard", element: <Dashboard /> },
      { path: "mycourses", element: <GetUserCourses /> },
      { path: "courses", element: <GetCourses /> },
      { path: "users", element: <GetUsers /> },
      { path: "centers", element: <GetCenters /> },
      { path: "courses/:id", element: <GetCourseById /> },
      { path: "user/:id", element: <GetUserById /> },
      { path: "profile", element: <Profile /> },
      { path: "*", element: <Navigate to="/error/404" /> },
    ],
  },
  {
    path: "/",
    element: !isAuthenticated ? (
      <PublicLayout />
    ) : (
      <Navigate to="app/dashboard" />
    ),
    children: [
      { path: "login", element: <Login /> },
      { path: "/", element: <Login /> },
      { path: "*", element: <Navigate to="/error/404" /> },
    ],
  },
  {
    path: "/error",
    element: <ErrorLayout />,
    children: [
      { path: "404", element: <NotFound /> },
      { path: "*", element: <Navigate to="/error/404" /> },
    ],
  },
];

export default routes;
