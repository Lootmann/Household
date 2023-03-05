import Header from "./Header";
import InputForm from "./InputForm";

function App() {
  return (
    <div className="h-screen bg-slate-500">
      <Header />

      <div className="h-[calc(100vh-4rem)] flex flex-col gap-2 p-4 text-xl">
        <div className="h-1/2 flex-grow flex justify-between gap-2 border-2 border-slate-300 p-2">
          <div className="flex-1 border-2 border-slate-700 p-2">This Month</div>
          <div className="flex-1 border-2 border-slate-700 p-2">This Week</div>
          <div className="flex-1 border-2 border-slate-700 p-2">This Day</div>
          <div className="flex-1 border-2 border-slate-700 p-2">
            <InputForm />
          </div>
        </div>

        <div className="h-1/2 flex-grow border-2 border-slate-300 p-4">
          Detailed Analysis - 何を表示しようかな ...
        </div>
      </div>
    </div>
  );
}

export default App;
