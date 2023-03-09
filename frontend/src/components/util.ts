export const BASE_API_URL = "http://localhost:8888";

/**
 * get current date
 * date.getMonth() is starting at 0, so need +1
 *
 * @return {[number, number, number]} year, month day
 */
export function getCurrentDate(): [number, number, number] {
  const date = new Date();
  return [date.getFullYear(), date.getMonth() + 1, date.getDate()];
}

/**
 * dateToFormattedString
 *
 * @param {number} year
 * @param {number} month
 * @param {number} day
 * @param {string} sep
 * @return {string} YYYY-MM-DD
 */
export function dateToFormattedString(
  year: number,
  month: number,
  day: number,
  sep: string = "-"
): string {
  return (
    `${year}` +
    `${sep}` +
    `${String(month).padStart(2, "0")}` +
    `${sep}` +
    `${String(day).padStart(2, "0")}`
  );
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
  return [date.getFullYear(), date.getMonth() + 1, date.getDate()];
}

// FIXME: ambigouous name
export function calcDate(
  year: number,
  month: number,
  diff: number
): [number, number] {
  const date = new Date(`${year}-${month}`);
  date.setMonth(date.getMonth() + diff);
  return [date.getFullYear(), date.getMonth() + 1];
}
