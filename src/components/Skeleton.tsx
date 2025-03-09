import React from "react";

interface SkeletonProps {
  width?: string;
  height?: string;
  className?: string;
}

const Skeleton: React.FC<SkeletonProps> = ({
  width = "w-full",
  height = "h-6",
  className = "",
}) => {
  return (
    <div
      className={`${width} ${height} animate-pulse bg-gray-200 rounded ${className}`}
    />
  );
};

export default Skeleton;
