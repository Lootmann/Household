import React from "react";
import { Link } from "react-router-dom";
import { getCurrentDate } from "./util";

function Header() {
  const [year, month] = getCurrentDate();

  return (
    <div className="flex gap-4 items-baseline p-4 bg-slate-700 text-slate-200 ">
      <h1 className="text-2xl text-slate-200 underline mr-5">
        <Link to={"/"} className="text-2xl">
          Household Histories
        </Link>
      </h1>

      <Link to={`/histories/${year}/${month}`} className="text-xl">
        History
      </Link>
    </div>
  );
}

export default Header;
