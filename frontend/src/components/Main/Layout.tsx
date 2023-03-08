import axios from "axios";
import React from "react";

import ThisMonth from "../Aggregates/ThisMonth";
import { BASE_API_URL, getThisMonthDate } from "../util";
import InputForm from "./InputForm";

function Main() {
  const [households_by_each_categories, setHouseholds] = React.useState<
    APIHouseholdType[]
  >([]);

  // FIXME: Get from 2 data from API, and convert data to make chart
  // FIXME: Is there a better way to do this?
  React.useEffect(() => {
    const convert_api_to_data = async (
      categories: CategoryType[],
      households: HouseholdType[]
    ) => {
      const res: Array<{ category: CategoryType; amount: number }> = [];

      categories.forEach((category) => {
        res.push({ category: category, amount: 0 });
      });

      // TODO: refactor - this looks wrong :^) Map<CategoryType, number> ?
      households.forEach((household) => {
        res.forEach((r) => {
          if (r.category.id === household.category.id) {
            r.amount += household.amount;
          }
        });
      });
      return res;
    };

    // get 2 data from API
    const get_data_from_api = async () => {
      let categories: CategoryType[] = [];
      let households: HouseholdType[] = [];

      await axios.get(BASE_API_URL + "/categories").then((resp) => {
        categories = resp.data;
      });

      // get this month data
      const [year, month] = getThisMonthDate();
      await axios
        .get(BASE_API_URL + `/households?year=${year}&month=${month}`)
        .then((resp) => {
          households = resp.data;
        });

      const res = await convert_api_to_data(categories, households);
      console.log(res);
      setHouseholds(res);
    };

    get_data_from_api();
  }, []);

  return (
    <div className="h-full flex flex-col gap-2">
      <div className="h-1/2 flex-grow flex justify-between gap-2 border-2 border-slate-300 p-2">
        <div className="flex-1 border-2 border-slate-700 p-2">
          {households_by_each_categories.length > 0 && (
            <ThisMonth households={households_by_each_categories} />
          )}
        </div>
        <div className="flex-1 border-2 border-slate-700 p-2">This Week</div>
        <div className="flex-1 border-2 border-slate-700 p-2">This Day</div>
        <div className="flex-1 border-2 border-slate-700 p-2">
          <InputForm />
        </div>
      </div>

      <div className="h-1/2 flex-grow border-2 border-slate-300 p-4">
        Detailed Analysis - 何を表示しようかな ...
      </div>
    </div>
  );
}

export default Main;
