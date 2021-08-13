import React from "react";
import { Outlet } from "react-router-dom";

function ErrorLayout() {
  return (
    <>
      <Outlet />
    </>
  );
}

export default ErrorLayout;
