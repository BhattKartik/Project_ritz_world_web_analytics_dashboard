
import React from "react";

const StatsCard = ({
  title,
  value,
  icon: Icon,
  iconColor,
  iconBg
}) => {

  return (
    <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition duration-300">

      <div className="flex items-center justify-between">

        {/* Title and Value */}
        <div>
          <p className="text-sm font-medium text-gray-500">
            {title}
          </p>

          <h2 className="text-2xl font-bold text-slate-900 mt-2">
            {value ?? 0}
          </h2>
        </div>

        {/* Icon */}
        <div className={`p-3 rounded-xl ${iconBg}`}>
          {Icon && <Icon size={25} className={iconColor} />}
        </div>

      </div>

    </div>
  );
};

export default StatsCard;
