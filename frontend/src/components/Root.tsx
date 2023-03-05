import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";

function Root() {
  return (
    <div className="h-screen bg-slate-500">
      <Header />

      <div className="h-[calc(100vh-4rem)] text-xl p-4">
        <Outlet />
      </div>
    </div>
  );
}

export default Root;
