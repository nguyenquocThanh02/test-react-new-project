import React from "react";
import { NavLink } from "react-router-dom";

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div>
      <div className="flex gap-5">
        {/* <NavLink  to={"/"}>Home</NavLink> */}
        <NavLink to={"/upload"}>Upload</NavLink>
        <NavLink to={"/todo"}>Todo</NavLink>
        <NavLink to={"/pagination-router"}>Pagination</NavLink>
        <NavLink to={"/multipart"}>Multipart</NavLink>
        <NavLink to={"/multipart-multifile"}>Multipart-Multifile</NavLink>
      </div>
      <div>{children}</div>
    </div>
  );
};

export default MainLayout;
