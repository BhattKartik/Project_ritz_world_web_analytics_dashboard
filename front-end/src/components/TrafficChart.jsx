
import React from "react";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

const TrafficChart = ({ data = [] }) => {

  // Format the date received from MongoDB
  const formattedData = data.map((item) => ({
    ...item,
    day: new Date(item.date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short"
    })
  }));

  return (
    <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">

      {/* Chart Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-bold text-slate-900">
            Traffic Overview
          </h2>

          <p className="text-sm text-gray-500">
            Visitors and page views
          </p>
        </div>

        <select className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500">
          <option>Last 7 Days</option>
          <option>Last 30 Days</option>
          <option>Last 90 Days</option>
        </select>
      </div>

      {/* Chart */}
      <div className="w-full h-[320px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={formattedData}
            margin={{ top: 10, right: 20, left: 0, bottom: 5 }}
          >

            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#E5E7EB"
            />

            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#6B7280", fontSize: 12 }}
            />

            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#6B7280", fontSize: 12 }}
            />

            <Tooltip
              contentStyle={{
                borderRadius: "10px",
                border: "1px solid #E5E7EB"
              }}
            />

            <Legend
              verticalAlign="top"
              align="right"
              height={40}
            />

            {/* Visitors Line */}
            <Line
              type="monotone"
              dataKey="visitors"
              name="Visitors"
              stroke="#2563EB"
              strokeWidth={3}
              dot={false}
              activeDot={{ r: 6 }}
            />

            {/* Page Views Line */}
            <Line
              type="monotone"
              dataKey="pageViews"
              name="Page Views"
              stroke="#F59E0B"
              strokeWidth={3}
              dot={false}
              activeDot={{ r: 6 }}
            />

          </LineChart>
        </ResponsiveContainer>
      </div>

      {data.length === 0 && (
        <p className="text-center text-gray-500 text-sm mt-3">
          No traffic data available.
        </p>
      )}

    </div>
  );
};

export default TrafficChart;
