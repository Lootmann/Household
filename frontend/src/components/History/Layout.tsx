import axios from "axios";
import React from "react";
import { Link, LoaderFunctionArgs, useLoaderData } from "react-router-dom";
import { BASE_API_URL, calcDate } from "../util";

// LoaderFunctionArgs for type hint on main.tsx loader
export function loader({ params }: LoaderFunctionArgs) {
  return { year: Number(params.year), month: Number(params.month) };
}

function History() {
  const [histories, setHistories] = React.useState<HouseholdType[]>([]);
  const params = useLoaderData() as HistoryLoaderType;

  const [nextMonth, setNextMonth] = React.useState<HistoryLoaderType>({
    year: 0,
    month: 0,
  });

  const [prevMonth, setPrevMonth] = React.useState<HistoryLoaderType>({
    year: 0,
    month: 0,
  });

  React.useEffect(() => {
    axios
      .get(
        BASE_API_URL +
          `/households/search?year=${params.year}&month=${params.month}`
      )
      .then((resp) => {
        setHistories(resp.data);
      });

    // calc history date for pagination
    const [nextYear, nextMonth] = calcDate(params.year, params.month, +1);
    setNextMonth({ year: nextYear, month: nextMonth });

    const [prevYear, prevMonth] = calcDate(params.year, params.month, -1);
    setPrevMonth({ year: prevYear, month: prevMonth });
  }, [params.year, params.month]);

  return (
    <div className="h-full gap-2 flex">
      <div className="h-full flex flex-col gap-2 flex-1 p-2 border-2 border-slate-400 bg-slate-400 rounded-md">
        <div className="flex items-center justify-center gap-4 text-2xl">
          <Link
            to={`/histories/${prevMonth.year}/${prevMonth.month}`}
            className="px-2 hover:bg-yellow-500"
          >
            &lt;{prevMonth.month}月
          </Link>

          <p className="font-bold">
            {params.year}年 {params.month}月
          </p>

          <Link
            to={`/histories/${nextMonth.year}/${nextMonth.month}`}
            className="px-2 hover:bg-yellow-500"
          >
            {nextMonth.month}月 &gt;
          </Link>
        </div>

        {histories.length > 0 ? (
          <table className="block overflow-y-scroll table-fixed w-full bg-slate-300 border-separate rounded-md">
            <thead>
              <tr>
                <th className="text-left px-4">Registered</th>
                <th className="text-left px-2">Amout</th>
                <th className="text-left px-2">Category</th>
                <th className="text-left px-2">Memo</th>
              </tr>
            </thead>

            <tbody>
              {histories.map((history) => (
                <tr key={history.id}>
                  <td className="px-4 ">{history.registered_at}</td>
                  <td className="px-2">{history.amount}</td>
                  <td className="px-2">{history.category.name}</td>
                  <td className="px-2">{history.memo}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="h-full flex items-center justify-center">
            <h2 className="text-4xl">
              No Date <b>:^&#41;</b>
            </h2>
          </div>
        )}
      </div>

      <div className="flex-1 p-2 text-2xl border-2 border-slate-400 rounded-md">
        <h2>Left Something</h2>
      </div>
    </div>
  );
}

export default History;
