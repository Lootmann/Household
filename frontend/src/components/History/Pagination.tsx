import React from "react";
import { Link } from "react-router-dom";
import { calcDate } from "../util";

type PaginationType = {
  year: number;
  month: number;
};

// FIXME: refactor - this date calc is freaking disgusting :^(
function Pagination({ year, month }: PaginationType) {
  const [next, setNext] = React.useState<HistoryLoaderType>({
    year: 0,
    month: 0,
  });
  const [prev, setPrev] = React.useState<HistoryLoaderType>({
    year: 0,
    month: 0,
  });

  React.useEffect(() => {
    // calc history date for pagination
    const [nextYear, nextMonth] = calcDate(year, month, +1);
    setNext({ year: nextYear, month: nextMonth });

    const [prevYear, prevMonth] = calcDate(year, month, -1);
    setPrev({ year: prevYear, month: prevMonth });
  }, [year, month]);

  return (
    <div className="flex items-center justify-center gap-4 text-2xl">
      <Link
        to={`/histories/${prev.year}/${prev.month}`}
        className="px-2 hover:bg-yellow-500"
      >
        &lt;{prev.month}月
      </Link>

      <p className="font-bold">
        {year}年 {month}月
      </p>

      <Link
        to={`/histories/${next.year}/${next.month}`}
        className="px-2 hover:bg-yellow-500"
      >
        {next.month}月 &gt;
      </Link>
    </div>
  );
}

export default Pagination;
