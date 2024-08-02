import React from 'react';
import SkeletonElement from './SkeletonElement';

const SkeletonScreen: React.FC = () => {
  return (
    <div>
      <div className="flex justify-center h-36 mx-5 mt-20">
        <div className="flex w-3/4">
          <SkeletonElement width="100%" height="100%" />
        </div>
      </div>
      <div className="flex justify-center h-36 mx-5 mt-16">
        <div className="flex w-3/4">
          <SkeletonElement width="100%" height="100%" />
        </div>
      </div>
      <div className="flex justify-center h-36 mx-5 mt-20">
        <div className="flex w-3/4">
          <SkeletonElement width="100%" height="100%" />
        </div>
      </div>
    </div>
  );
};

export default SkeletonScreen;
