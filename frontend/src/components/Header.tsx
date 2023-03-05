import React from "react";

function Header() {
  return (
    <div className="flex gap-4 items-baseline p-4 bg-slate-700 text-slate-200 ">
      <h1 className="text-2xl text-slate-200">Header</h1>
      <p>ヘッダーいるか？</p>
      <p>むしろ無いほうがスッキリしている気もする</p>
      <p>
        というより位置ページに収まるように全部表示できたほうがより使いやすくね
      </p>
    </div>
  );
}

export default Header;
