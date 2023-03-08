export const BASE_URL = "http://localhost:8888";

/**
 * get current today 'Date'
 * date format is 'yyyy-MM-DD' and e.g getMonth() returns 0, 1, ..., 12
 * so I need getMonth(), and getDay() requires 0 padding when number is One digit.
 *
 * @params
 * @return {string}: yyyy-MM-DD
 */
export function getToday(): string {
  const date = new Date();
  const [year, month, day] = [
    date.getFullYear(),
    (date.getMonth() + 1).toString().padStart(2, "0"),
    date.getDate().toString().padStart(2, "0"),
  ];
  return `${year}-${month}-${day}`;
}

// for Main Layout.tsx Chart data
export function getThisMonthDate(): [number, number] {
  const date = new Date();
  return [date.getFullYear(), date.getMonth() + 1];
}
