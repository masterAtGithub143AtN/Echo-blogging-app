import React from 'react';

interface SkeletonElementProps {
  width: string;
  height: string;
  className?: string;
}

const SkeletonElement: React.FC<SkeletonElementProps> = ({ width, height, className }) => {
  return (
    <div
      className={`bg-slate-200 rounded-md dark:bg-gray-300 mb-4 ${className}`}
      style={{ width, height }}
    ></div>
  );
};

export default SkeletonElement;
