import axios from "axios";
import React from "react";

import Aggregate from "../Aggregates/Aggregate";
import { BASE_API_URL, getThisMonthDate } from "../util";
import InputForm from "./InputForm";

function Main() {
  const [households, setHouseholds] = React.useState<HouseholdType[]>([]);
  const [categories, setCategories] = React.useState<CategoryType[]>([]);

  React.useEffect(() => {
    const [year, month] = getThisMonthDate();

    axios
      .get(BASE_API_URL + `/households?year=${year}&month=${month}`)
      .then((resp) => {
        setHouseholds(resp.data);
      });

    axios.get(BASE_API_URL + "/categories").then((resp) => {
      setCategories(resp.data);
    });
  }, []);

  return (
    <div className="h-full flex flex-col gap-2">
      <div className="h-1/2 flex-grow flex justify-between gap-2 border-2 border-slate-300 p-2">
        <div className="flex-2 border-2 border-slate-700 p-2">
          {households.length > 0 && categories.length > 0 && (
            <Aggregate households={households} categories={categories} />
          )}
        </div>
        <div className="flex-1 border-2 border-slate-700 p-2">
          <h2 className="text-2xl">Pie Chart ?</h2>
        </div>
        <div className="flex-1 border-2 border-slate-700 p-2">
          <InputForm />
        </div>
      </div>

      <div className="h-1/2 flex-grow border-2 border-slate-300 bg-black p-4">
        <p className="text-xl text-slate-400">
          <b>Detailed Analysis</b> - 何を表示しようかな
        </p>
        <img src="../../assets/bitdance.gif" alt="" />
      </div>
    </div>
  );
}

export default Main;
