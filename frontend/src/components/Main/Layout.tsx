import axios from "axios";
import React from "react";

import Aggregate from "../Aggregates/Aggregate";
import { BASE_API_URL, getThisMonthDate } from "../util";
import InputForm from "./InputForm";

function Main() {
  const [households_by_each_categories, setHouseholds] = React.useState<
    APIHouseholdType[]
  >([]);

  React.useEffect(() => {
    const convert_api_to_data = async (
      categories: CategoryType[],
      households: HouseholdType[]
    ) => {
      // FIXME: new Map<CategoryType, number> is not working - has, get is wrong D:
      const household_map = new Map<number, number>();

      households.map((household) => {
        const amount: number | undefined = household_map.get(
          household.category.id
        );

        if (amount === undefined) {
          household_map.set(household.category.id, household.amount);
        } else {
          household_map.set(household.category.id, amount + household.amount);
        }
      });

      const res: { category: CategoryType; amount: number }[] = [];
      categories.map((category) => {
        const amount = household_map.get(category.id);
        if (amount !== undefined)
          res.push({ category: category, amount: amount });
      });

      return res;
    };

    // FIXME: Get from 2 data from API, and convert data to make chart
    // FIXME: Is there a better way to do this?
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
      setHouseholds(res);
    };

    get_data_from_api();
  }, []);

  return (
    <div className="h-full flex flex-col gap-2">
      <div className="h-1/2 flex-grow flex justify-between gap-2 border-2 border-slate-300 p-2">
        <div className="flex-2 border-2 border-slate-700 p-2">
          {households_by_each_categories.length > 0 && (
            <Aggregate households={households_by_each_categories} />
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
