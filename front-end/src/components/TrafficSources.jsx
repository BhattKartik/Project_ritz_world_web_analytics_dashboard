
import React from "react";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer
} from "recharts";

const TrafficSources = ({ data = [] }) => {

  // Colors for different traffic sources
  const COLORS = [
    "#2563EB",
    "#F59E0B",
    "#10B981",
    "#8B5CF6",
    "#EC4899",
    "#06B6D4"
  ];

  // Calculate total sessions
  const totalSessions = data.reduce(
    (total, source) => total + source.value,
    0
  );

  // Calculate percentage for each source
  const sourceData = data.map((source, index) => ({
    ...source,
    color: COLORS[index % COLORS.length],
    percentage: totalSessions
      ? ((source.value / totalSessions) * 100).toFixed(1)
      : 0
  }));

  return (
    <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">

      {/* Header */}
      <div className="mb-4">
        <h2 className="text-lg font-bold text-slate-900">
          Traffic Sources
        </h2>

        <p className="text-sm text-gray-500">
          Where your visitors come from
        </p>
      </div>

      {/* Donut Chart */}
      <div className="h-[250px] w-full">

        {data.length > 0 ? (

          <ResponsiveContainer width="100%" height="100%">

            <PieChart>

              <Pie
                data={sourceData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={65}
                outerRadius={95}
                paddingAngle={4}
              >

                {sourceData.map((entry, index) => (
                  <Cell
                    key={entry.name}
                    fill={entry.color}
                  />
                ))}

              </Pie>

              <Tooltip
                formatter={(value, name) => [
                  `${value} sessions`,
                  name
                ]}
              />

            </PieChart>

          </ResponsiveContainer>

        ) : (
          <div className="h-full flex items-center justify-center text-gray-500 text-sm">
            No traffic source data available
          </div>
        )}

      </div>

      {/* Legend */}
      <div className="grid grid-cols-2 gap-4 mt-3">

        {sourceData.map((source) => (

          <div key={source.name} className="flex items-center gap-2">

            <span
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: source.color }}
            />

            <div>
              <p className="text-xs text-gray-500">
                {source.name}
              </p>

              <p className="text-sm font-semibold text-slate-800">
                {source.percentage}%
                <span className="text-xs text-gray-400 ml-1">
                  ({source.value} sessions)
                </span>
              </p>
            </div>

          </div>

        ))}

      </div>

    </div>
  );
};

export default TrafficSources;
