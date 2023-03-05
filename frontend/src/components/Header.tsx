import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <div className="flex gap-4 items-baseline p-4 bg-slate-700 text-slate-200 ">
      <h1 className="text-2xl text-slate-200">Header</h1>
      <Link to={"/"}>Top</Link>
      <Link to={"/histories"}>History</Link>
    </div>
  );
}

export default Header;
