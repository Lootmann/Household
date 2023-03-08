import React from "react";

import { ResponsiveBar } from "@nivo/bar";

function ThisMonth({ households }: { households: APIHouseholdType[] }) {
  const [data, setData] = React.useState<any>([]);
  const [keys, setKeys] = React.useState<string[]>([]);

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
      <div className="h-full">
        <h2 className="text-2xl text-center">This Month Expenses Chart</h2>

        {data.length > 0 && keys.length > 0 && (
          <ResponsiveBar
            data={data}
            keys={keys}
            // theme
            theme={{
              fontSize: 20,
              axis: {
                ticks: {
                  text: {
                    fontSize: 16,
                  },
                },
              },
              grid: {
                line: {
                  stroke: "#475577",
                  strokeWidth: 1,
                },
              },
              legends: {
                text: {
                  fontSize: 21,
                  fill: "#000000",
                },
              },
            }}
            // legends
            legends={[
              {
                dataFrom: "keys",
                anchor: "right",
                direction: "column",
                itemWidth: 30,
                itemHeight: 50,
              },
            ]}
            margin={{ top: 30, right: 90, bottom: 60, left: 80 }}
            padding={0.5}
            innerPadding={2}
            groupMode="stacked"
            layout="vertical"
            minValue={0}
            maxValue={30000}
            valueScale={{ type: "linear" }}
            // border
            borderRadius={5}
            borderWidth={1}
            // borderColor={{
            //   from: "color",
            //   modifiers: [["darker", 0.0]],
            // }}
            // grid
            enableGridX={false}
            enableGridY={true}
            // axis
            axisTop={null}
            axisRight={null}
            axisBottom={null}
            axisLeft={{
              tickSize: 10,
              tickPadding: 0,
              legendOffset: 20,
            }}
            // label
            labelTextColor={{
              from: "color",
              modifiers: [["darker", 5.0]],
            }}
          />
        )}
      </div>
    </>
  );
}

export default ThisMonth;
