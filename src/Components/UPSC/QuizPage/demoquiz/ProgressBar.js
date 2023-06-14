import React from 'react';

function ProgressBar({ width }) {
  return (
    <div className="h-2 mt-4 bg-gray-200 ">
      <div
        className="h-full bg-green-500 transition-width duration-300 ease-in-out"
        style={{ width: `${width}%` }}
      ></div>
    </div>
  );
}

export default ProgressBar;
