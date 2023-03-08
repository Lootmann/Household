/**
 * converter.ts
 */

/**
 * convert data for Nivo Bar Chartdata
 *
 * Nivo 'ResponsesiveBar' requires
 * Array<{ string, number}>
 *
 * @param {HouseholdType[]} households
 * @param {CategoryType[]} categories
 * @return {APIHouseholdType[]}
 */
export function convertDataFromAPIToChartData(
  households: HouseholdType[],
  categories: CategoryType[]
): APIHouseholdType[] {
  // FIXME: new Map<CategoryType, number> is not working - has, get is wrong D:
  const household_map = new Map<number, number>();

  households.map((household) => {
    const amount: number | undefined = household_map.get(household.category.id);

    if (amount === undefined) {
      household_map.set(household.category.id, household.amount);
    } else {
      household_map.set(household.category.id, amount + household.amount);
    }
  });

  const res: { category: CategoryType; amount: number }[] = [];
  categories.map((category) => {
    const amount = household_map.get(category.id);
    if (amount !== undefined) res.push({ category: category, amount: amount });
  });

  return res;
}

// IMPL: create month
export function createMonth(households: APIHouseholdType[]) {
  const res: any = { title: "Month" };
  households.map((h) => {
    res[h.category.name] = h.amount;
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

// IMPL: create this day
export function createDay(households: APIHouseholdType[]) {
  const res: any = { title: "Day" };
  households.map((h) => {
    res[h.category.name] = h.amount;
  });
  return res;
}
