import React from 'react';

interface ProgressBarProps {
  current: number;
  total: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ current, total }) => {
  const percentage = Math.round((current / total) * 100);
  
  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-gray-700">
          Progress: {current} of {total} steps completed
        </span>
        <span className="text-sm font-bold text-[var(--accent)]">
          {percentage}%
        </span>
      </div>
      
      <div className="progress-bar-container">
        <div 
          className="progress-bar" 
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;
