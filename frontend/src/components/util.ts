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
 * check this day is current week.
 *
 * ...          5  6  7
 * [8  9 10 11 12 13 14]
 * 15 16 ...
 *
 * @param {number} year
 * @param {number} month
 * @param {number} day
 * @return {boolean}
 */
export function isSameWeek(year: number, month: number, day: number): boolean {
  const checkDay = new Date(`${year}-${month}-${day}`);
  const today = new Date();
  const diffTime = Math.abs(today.getTime() - checkDay.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  const diffWeeks = Math.floor(diffDays / 7);
  return diffWeeks === 0 && checkDay.getDay() <= today.getDay();
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
 * NOTE: e.g. dateString is 2022-11-12
 * new Date(dateString).getMonth() is 10!
 * So, I need +1 to date.getMonth()
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
