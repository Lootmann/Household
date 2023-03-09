import React from "react";

import Aggregate from "../Aggregates/Aggregate";
import InputForm from "./InputForm";

function Main() {
  const [refresh, setRefresh] = React.useState<boolean>(false);
  function refreshAfterSubmit() {
    setRefresh(!refresh);
  }

  return (
    <div className="h-full flex flex-col gap-2">
      <div className="h-1/2 flex-grow flex justify-between gap-2 border-2 border-slate-300 p-2">
        <div className="flex-2 border-2 border-slate-700 p-2">
          <Aggregate refresh={refresh} />
        </div>
        <div className="flex-1 border-2 border-slate-700 p-2">
          <h2 className="text-2xl">Pie Chart ?</h2>
        </div>
        <div className="flex-1 border-2 border-slate-700 p-2">
          <InputForm handleRefresh={refreshAfterSubmit} />
        </div>
      </div>

      <div className="h-1/2 flex-grow flex border-2 border-slate-300 bg-black p-4">
        <img
          src="../../assets/bitdance.gif"
          alt="Mc.Komiya"
          className="flex-1 max-w-md"
        />
        <p className="flex-1 text-xl text-slate-400">
          <b>Detailed Analysis</b> - 何を表示しようかな
        </p>
      </div>
    </div>
  );
}

export default Main;
