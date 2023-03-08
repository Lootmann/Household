import React from "react";

import { ResponsiveBar } from "@nivo/bar";

function Aggregate({ households }: { households: APIHouseholdType[] }) {
  const [data, setData] = React.useState<any>([]);
  const [keys, setKeys] = React.useState<string[]>([]);

  // IMPL: create month
  function createMonth(households: APIHouseholdType[]) {
    const res: any = { title: "Month" };
    households.map((h) => {
      res[h.category.name] = h.amount;
    });
    return res;
  }

  // IMPL: create this week
  function createWeek(households: APIHouseholdType[]) {
    const res: any = { title: "Week" };
    households.map((h) => {
      res[h.category.name] = h.amount;
    });
    return res;
  }

  // IMPL: create this day
  function createDay(households: APIHouseholdType[]) {
    const res: any = { title: "Day" };
    households.map((h) => {
      res[h.category.name] = h.amount;
    });
    return res;
  }

  // all bar chart data needs 'title' key
  function create_data() {
    const res: any = [];
    res.push(createDay(households));
    res.push(createWeek(households));
    res.push(createMonth(households));
    return res;
  }

  React.useEffect(() => {
    setData(create_data());

    setKeys(
      households.map((h) => {
        return h.category.name;
      })
    );
  }, []);

  return (
    <>
      <div className="h-full">
        <h2 className="text-2xl text-center">
          Custom Aggregates by{" "}
          <a
            href="https://nivo.rocks/components"
            className="bg-slate-300 hover:bg-yellow-500 transition-all duration-300 px-2 rounded-md"
          >
            Nivo
          </a>
        </h2>

        {data.length > 0 && keys.length > 0 && (
          <ResponsiveBar
            data={data}
            keys={keys}
            indexBy="title"
            // theme
            theme={{
              fontSize: 20,
              axis: {
                ticks: {
                  text: {
                    fontSize: 16,
                    fill: "#000000",
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
                  fontSize: 20,
                  fill: "#000000",
                },
              },
            }}
            // legends
            legends={[
              {
                dataFrom: "keys",
                anchor: "bottom",
                direction: "column",
                itemWidth: 50,
                itemHeight: 20,
              },
            ]}
            margin={{ top: 40, right: 80, bottom: 90, left: 90 }}
            padding={0.5}
            innerPadding={2}
            groupMode="stacked"
            layout="horizontal"
            minValue={0}
            maxValue="auto"
            valueScale={{ type: "linear" }}
            // border
            borderRadius={5}
            borderWidth={1}
            // borderColor={{
            //   from: "color",
            //   modifiers: [["darker", 0.0]],
            // }}
            // grid
            enableGridX={true}
            enableGridY={false}
            // axis
            axisTop={{
              tickSize: 10,
              tickPadding: 0,
              legendOffset: 20,
            }}
            axisRight={null}
            axisBottom={null}
            axisLeft={{
              tickSize: 14,
              tickPadding: 0,
              legendOffset: 20,
            }}
            // label
            labelTextColor={{
              from: "color",
              modifiers: [["darker", 4.0]],
            }}
          />
        )}
      </div>
    </>
  );
}

export default Aggregate;
