export const BASE_API_URL = "http://localhost:8888";

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

/**
 * get current date
 *
 * @returns {[number, number, number]} year, month day
 */
export function getCurrentDate(): [number, number, number] {
  const date = new Date();
  return [date.getFullYear(), date.getMonth() + 1, date.getDay()];
}

export function getYear(): number {
  return new Date().getFullYear();
}

export function getMonth(): number {
  return new Date().getMonth() + 1;
}

/**
 * get date (Date()) from date string
 * date string format is 'YYYY-MM-DD'
 *
 * @param {string} dateString
 * @returns {number, number, number} [year, month, day]
 */
export function getDateFromDateString(
  dateString: string
): [number, number, number] {
  const date = new Date(dateString);
  return [date.getFullYear(), date.getMonth() + 1, date.getDay()];
}
