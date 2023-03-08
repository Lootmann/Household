import React from "react";

import { ResponsiveBar } from "@nivo/bar";

function ThisMonth({ households }: { households: APIHouseholdType[] }) {
  const [data, setData] = React.useState<any>([]);
  const [keys, setKeys] = React.useState<string[]>();

  React.useEffect(() => {
    setData(
      households.map((h) => {
        return { [h.category.name]: h.amount };
      })
    );

    setKeys(
      households.map((h) => {
        return h.category.name;
      })
    );
  }, []);

  return (
    <>
      {households.length !== 0 && (
        <div className="h-full">
          <h2 className="text-2xl">Show This Month Expenses Chart</h2>
          <ResponsiveBar
            data={data}
            keys={keys}
            theme={{
              axis: {
                ticks: {
                  text: {
                    fontSize: 20,
                  },
                },
              },
            }}
            legends={[
              {
                dataFrom: "keys",
                anchor: "right",
                direction: "column",
                itemWidth: 10,
                itemHeight: 25,
              },
            ]}
            margin={{ top: 50, right: 70, bottom: 50, left: 50 }}
            padding={0.4}
            layout="horizontal"
          />
        </div>
      )}
    </>
  );
}

export default ThisMonth;
