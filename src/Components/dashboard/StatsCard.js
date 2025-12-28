import React from 'react';

const StatsCard = ({ icon, value, label, bgColor }) => {
  return (
    <div className="bg-white rounded-md p-md shadow-level-1 border border-gray-200">
      <div className="flex items-center gap-sm">
        <div className={`p-2 rounded-md ${bgColor}`}>
          {icon}
        </div>
        <div>
          <p className="text-[26px] font-bold text-gray-800">{value}</p>
          <p className="text-sm text-gray-600">{label}</p>
        </div>
      </div>
    </div>
  );
};

export default StatsCard;