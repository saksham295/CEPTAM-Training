import React from "react";
import MenuBar from "../segments/MenuBar";
import { Outlet } from "react-router-dom";

function PublicLayout() {
  return (
    <>
      <MenuBar />
      <Outlet />
    </>
  );
}

export default PublicLayout;
