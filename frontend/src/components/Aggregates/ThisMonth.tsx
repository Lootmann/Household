import React from "react";

function ThisMonth({ households }: { households: APIHouseholdType[] }) {
  return (
    <>
      {households.length !== 0 && (
        <div>
          <h2 className="text-2xl">Show This Month Expenses Chart</h2>
          <p>Bar? Pie?</p>
        </div>
      )}
    </>
  );
}

export default ThisMonth;
