import React from "react";
import axios from "axios";

const BASE_URL = "http://localhost:8888";

function History() {
  const [histories, setHistories] = React.useState<HouseholdType[]>([]);

  React.useEffect(() => {
    axios.get(BASE_URL + "/households").then((resp) => {
      setHistories(resp.data);
    });
  }, []);

  return (
    <div className="h-full gap-2 flex">
      <div className="flex flex-col gap-2 flex-1 p-2 border-2 border-slate-400 bg-slate-400 rounded-md">
        <table className="table-fixed w-full bg-slate-300 border-separate rounded-md">
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

        {/* TODO: pagination */}
        <div className="flex flex-col items-center">
          <p>&lt;First &lt; Prev [Pagination] Next &gt; Last &gt;</p>
        </div>
      </div>

      <div className="flex-1 p-2 text-2xl border-2 border-slate-400 rounded-md">
        <h2>Left Something</h2>
      </div>
    </div>
  );
}

export default History;
