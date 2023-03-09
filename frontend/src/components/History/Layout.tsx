import axios from "axios";
import React from "react";
import { Link, LoaderFunctionArgs, useLoaderData } from "react-router-dom";
import { BASE_API_URL, calcDate } from "../util";
import EditFormModal from "./EditFormModal";
import Pagination from "./Pagination";

// LoaderFunctionArgs for type hint on main.tsx loader
export function loader({ params }: LoaderFunctionArgs) {
  return { year: Number(params.year), month: Number(params.month) };
}

function History() {
  const [histories, setHistories] = React.useState<HouseholdType[]>([]);
  const params = useLoaderData() as HistoryLoaderType;

  // TODO: modal
  const [open, setOpen] = React.useState<boolean>(false);
  function handleClose() {
    setOpen(false);
  }

  // for pagination
  const [year, setYear] = React.useState<number>(0);
  const [month, setMonth] = React.useState<number>(0);

  React.useEffect(() => {
    axios
      .get(
        BASE_API_URL +
          `/households/search?year=${params.year}&month=${params.month}`
      )
      .then((resp) => {
        setHistories(resp.data);
      });

    // for pagination
    setYear(params.year);
    setMonth(params.month);
  }, [params.year, params.month]);

  return (
    <div className="h-full gap-2 flex">
      <div className="h-full flex flex-col gap-2 flex-1 p-2 border-2 border-slate-400 bg-slate-400 rounded-md">
        <Pagination year={year} month={month} />

        {histories.length > 0 ? (
          // FIXME: full-width table
          <table className="block overflow-y-scroll table-auto bg-slate-300 border-collapse rounded-md">
            {/* TODO: table thead should be fixed at top */}
            <thead className="text-2xl">
              <tr>
                <th className="text-center px-2 border-b border-slate-600">
                  Edit
                </th>
                <th className="text-left px-4 border-b border-slate-600">
                  Registered
                </th>
                <th className="text-left px-4 border-b border-slate-600">
                  Amout
                </th>
                <th className="text-left px-4 border-b border-slate-600">
                  Category
                </th>
                <th className="text-left px-4 border-b border-slate-600">
                  Memo
                </th>
              </tr>
            </thead>

            <tbody>
              {histories.map((history) => (
                <tr key={history.id} className="hover:bg-slate-200">
                  {/* TODO: add model to edit each histories */}
                  <td className="px-2 text-center border-b border-slate-400">
                    <button onClick={() => setOpen(() => !open)}>✏️</button>
                  </td>
                  <td className="px-4 border-b border-slate-400">
                    {history.registered_at}
                  </td>
                  <td className="px-4 text-right border-b border-slate-400">
                    {history.amount}
                  </td>
                  <td className="px-4 border-b border-slate-400">
                    {history.category.name}
                  </td>
                  <td className="px-4 border-b border-slate-400">
                    {history.memo}
                  </td>
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

      <EditFormModal isOpen={open} handleClose={() => handleClose} />

      <div className="flex-1 p-2 text-2xl border-2 border-slate-400 rounded-md">
        <h2>Left Something</h2>
      </div>
    </div>
  );
}

export default History;
