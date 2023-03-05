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
    <div className="h-full gap-2">
      <table className="table-auto">
        <thead>
          <tr>
            <th>Registered At</th>
            <th>Amout</th>
            <th>Category</th>
            <th>Memo</th>
          </tr>
        </thead>

        <tbody>
          {histories.map((history) => (
            <tr key={history.id}>
              <td>{history.registered_at}</td>
              <td>{history.amount}</td>

              {/* TODO: show category name instead category_id */}
              <td>{history.category}</td>
              <td>{history.memo}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default History;
