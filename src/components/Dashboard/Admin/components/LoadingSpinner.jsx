import React from 'react';

const LoadingSpinner = ({ 
  size = 'medium', 
  color = 'green', 
  message = 'Memuat...', 
  fullScreen = false 
}) => {
  const sizeClasses = {
    small: 'h-4 w-4',
    medium: 'h-8 w-8',
    large: 'h-12 w-12',
    xlarge: 'h-16 w-16'
  };

  const colorClasses = {
    green: 'border-green-500',
    blue: 'border-blue-500',
    red: 'border-red-500',
    yellow: 'border-yellow-500',
    gray: 'border-gray-500'
  };

  const spinnerClass = `
    ${sizeClasses[size]} 
    border-2 border-gray-200 
    ${colorClasses[color]} 
    border-t-transparent 
    rounded-full 
    animate-spin
  `;

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-white bg-opacity-80 flex items-center justify-center z-50">
        <div className="text-center">
          <div className={spinnerClass}></div>
          {message && (
            <p className="mt-4 text-gray-600 font-medium">{message}</p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center p-8">
      <div className={spinnerClass}></div>
      {message && (
        <p className="mt-4 text-gray-600 font-medium text-center">{message}</p>
      )}
    </div>
  );
};

// Skeleton Loading Component
export const SkeletonLoader = ({ 
  lines = 3, 
  height = 'h-4', 
  className = '' 
}) => {
  return (
    <div className={`animate-pulse space-y-3 ${className}`}>
      {Array.from({ length: lines }).map((_, index) => (
        <div 
          key={index}
          className={`bg-gray-200 rounded ${height} ${
            index === lines - 1 ? 'w-3/4' : 'w-full'
          }`}
        ></div>
      ))}
    </div>
  );
};

// Card Skeleton
export const CardSkeleton = ({ count = 1 }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="bg-white p-6 rounded-xl shadow-sm border animate-pulse">
          <div className="flex items-center justify-between mb-4">
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded w-24"></div>
              <div className="h-8 bg-gray-200 rounded w-16"></div>
            </div>
            <div className="h-12 w-12 bg-gray-200 rounded-full"></div>
          </div>
          <div className="h-3 bg-gray-200 rounded w-20"></div>
        </div>
      ))}
    </div>
  );
};

// Table Skeleton
export const TableSkeleton = ({ rows = 5, columns = 4 }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
      <div className="animate-pulse">
        {/* Header */}
        <div className="bg-gray-50 px-6 py-4 border-b">
          <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
            {Array.from({ length: columns }).map((_, index) => (
              <div key={index} className="h-4 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
        
        {/* Rows */}
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <div key={rowIndex} className="px-6 py-4 border-b border-gray-100">
            <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
              {Array.from({ length: columns }).map((_, colIndex) => (
                <div key={colIndex} className="h-4 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LoadingSpinner;
