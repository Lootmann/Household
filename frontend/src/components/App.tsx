import { useState } from "react";
import Header from "./Header";

function App() {
  return (
    <div className="h-screen bg-slate-500">
      <Header />

      <div className="h-[calc(100vh-4rem)] flex flex-col p-4 text-xl">
        <div className="flex-grow bg-yellow-900 p-4">hello world</div>
        <div className="flex-grow bg-sky-800 p-4">hello world</div>
      </div>
    </div>
  );
}

export default App;
