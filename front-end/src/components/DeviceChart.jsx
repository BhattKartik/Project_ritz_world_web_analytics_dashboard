
import React from "react";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer
} from "recharts";

import {
  Monitor,
  Smartphone,
  Tablet
} from "lucide-react";

const DeviceChart = ({ data = [] }) => {

  // Colors for devices
  const COLORS = [
    "#2563EB",
    "#10B981",
    "#F59E0B"
  ];

  // Device icons
  const deviceIcons = {
    Desktop: Monitor,
    Mobile: Smartphone,
    Tablet: Tablet
  };

  // Calculate total page views
  const totalViews = data.reduce(
    (total, device) => total + device.value,
    0
  );

  // Calculate percentage for each device
  const deviceData = data.map((device, index) => ({
    ...device,
    color: COLORS[index % COLORS.length],
    percentage: totalViews
      ? ((device.value / totalViews) * 100).toFixed(1)
      : 0
  }));

  return (
    <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">

      {/* Header */}
      <div className="mb-4">
        <h2 className="text-lg font-bold text-slate-900">
          Devices
        </h2>

        <p className="text-sm text-gray-500">
          Page views by device type
        </p>
      </div>

      {/* Chart */}
      <div className="h-[250px] w-full">

        {data.length > 0 ? (

          <ResponsiveContainer width="100%" height="100%">

            <PieChart>

              <Pie
                data={deviceData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={4}
              >

                {deviceData.map((entry) => (
                  <Cell
                    key={entry.name}
                    fill={entry.color}
                  />
                ))}

              </Pie>

              <Tooltip
                formatter={(value, name) => [
                  `${value} page views`,
                  name
                ]}
              />

            </PieChart>

          </ResponsiveContainer>

        ) : (
          <div className="h-full flex items-center justify-center text-gray-500 text-sm">
            No device data available
          </div>
        )}

      </div>

      {/* Device Details */}
      <div className="space-y-4 mt-3">

        {deviceData.map((device) => {

          const Icon = deviceIcons[device.name];

          return (
            <div
              key={device.name}
              className="flex items-center justify-between"
            >

              <div className="flex items-center gap-3">

                <div className="p-2 rounded-lg bg-gray-100">
                  {Icon ? (
                    <Icon size={18} className="text-gray-600" />
                  ) : (
                    <Monitor size={18} className="text-gray-600" />
                  )}
                </div>

                <span className="text-sm font-medium text-gray-700">
                  {device.name}
                </span>

              </div>

              <div className="text-right">
                <p className="text-sm font-bold text-slate-900">
                  {device.percentage}%
                </p>

                <p className="text-xs text-gray-400">
                  {device.value} views
                </p>
              </div>

            </div>
          );

        })}

      </div>

    </div>
  );
};

export default DeviceChart;
