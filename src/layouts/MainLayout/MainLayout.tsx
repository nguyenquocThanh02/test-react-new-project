import { useProfileHook } from "@/hooks/useProfile.hook";
import React from "react";
import { NavLink } from "react-router-dom";

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // xử lý phân quyền, gọi permission từ be
  const profile = useProfileHook();

  const data = profile?.data?.permissions;
  console.log("🚀 ~ data:", data);

  return (
    <div>
      <h2 className="mb-5 text-red-600">Api có phân quyền</h2>
      <div className="flex items-center gap-4">
        {data &&
          data.map(
            (permission) =>
              permission.isEnable && (
                <NavLink
                  key={permission.code}
                  to={`/${permission.code.toLowerCase()}`}
                >
                  {permission.name}
                </NavLink>
              )
          )}
      </div>
      <h2 className="my-5 text-green-600">Normal route</h2>
      <div className="flex gap-5">
        {/* <NavLink  to={"/"}>Home</NavLink> */}
        <NavLink to={"/upload"}>Upload</NavLink>
        <NavLink to={"/todo"}>Todo</NavLink>
        <NavLink to={"/pagination-router"}>Pagination</NavLink>
        <NavLink to={"/form"}>Form</NavLink>
        <NavLink to={"/avatar"}>Avatar</NavLink>
        <NavLink to={"/multipart"}>Multipart</NavLink>
        <NavLink to={"/scroll-table"}>Scroll table</NavLink>
        <NavLink to={"/multipart-multifile"}>Multipart-Multifile</NavLink>

        <NavLink to={"/login"}>Login</NavLink>
      </div>
      <div>{children}</div>
    </div>
  );
};

export default MainLayout;
