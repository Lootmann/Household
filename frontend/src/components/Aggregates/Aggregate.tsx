import React from "react";

import { ResponsiveBar } from "@nivo/bar";

import {
  convertDataFromAPIToChartData,
  createDay,
  createMonth,
  createWeek,
} from "./converter";

function Aggregate({ households, categories }: AggregateProp) {
  // 'data' is used for ResponsiveBar.
  // FIXME: set TypeHint
  const [data, setData] = React.useState<any>([]);

  // 'keys' is also too.
  const [keys, setKeys] = React.useState<string[]>([]);

  function createChartData(
    households: HouseholdType[],
    categories: CategoryType[]
  ) {
    const converted = convertDataFromAPIToChartData(households, categories);
    const res: any = [];
    res.push(createDay(converted));
    res.push(createWeek(converted));
    res.push(createMonth(converted));
    return res;
  }

  function createChartKeys(categories: CategoryType[]) {
    return categories.map((category) => category.name);
  }

  React.useEffect(() => {
    setData(createChartData(households, categories));
    setKeys(createChartKeys(categories));
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
                direction: "row",
                itemWidth: 200,
                itemHeight: 0,
              },
            ]}
            margin={{ top: 50, right: 80, bottom: 100, left: 90 }}
            padding={0.4}
            innerPadding={3}
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
