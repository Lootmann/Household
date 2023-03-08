/**
    converter.ts

    Nivo ResponsiveBar requires 'data' args. 'data' is like
    data = [
        title: "Unique String",
        "key1": number,
        "key2": number,
        ...
    ]
        
    And 'keys' are
    keys = ["key1", "key2", "key3", ...]
*/
import { getCurrentDate, getDateFromDateString } from "../util";

export function createMonth(
  households: HouseholdType[],
  categories: CategoryType[]
) {
  const res: any = { title: "Month" };
  categories.map((category) => {
    res[category.name] = 0;
  });

  households.map((household) => {
    const categoryName = household.category.name;
    res[categoryName] += household.amount;
  });

  return res;
}

// IMPL: create this week
// NOTE: what is this week? Monday, Tuesday, ..., Saturday, Sunday
export function createWeek(households: APIHouseholdType[]) {
  const res: any = { title: "Week" };
  households.map((h) => {
    res[h.category.name] = h.amount;
  });
  return res;
}

export function createDay(
  households: HouseholdType[],
  categories: CategoryType[]
) {
  const res: any = { title: "Today" };
  categories.map((category) => {
    res[category.name] = 0;
  });

  // get current day
  const [, , day] = getCurrentDate();

  households.map((household) => {
    const [, , currentDay] = getDateFromDateString(household.registered_at);
    if (currentDay == day) {
      const categoryName = household.category.name;
      res[categoryName] += household.amount;
    }
  });

  return res;
}
