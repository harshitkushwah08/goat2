import React from "react";
import { cn } from "../../lib/utils";

export const Skeleton = ({ className, ...props }) => {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-bodyGray-300 ",
        className
      )}
      {...props}
    />
  );
};

export const SkeletonCard = () => (
  <div className="p-4 border border-bodyGray-300  rounded-lg space-y-3">
    <Skeleton className="h-4 w-3/4" />
    <Skeleton className="h-4 w-1/2" />
    <Skeleton className="h-8 w-full" />
  </div>
);

export const SkeletonTable = ({ rows = 5 }) => (
  <div className="space-y-3">
    {Array.from({ length: rows }).map((_, i) => (
      <div key={i} className="flex space-x-4">
        <Skeleton className="h-4 w-1/4" />
        <Skeleton className="h-4 w-1/4" />
        <Skeleton className="h-4 w-1/4" />
        <Skeleton className="h-4 w-1/4" />
      </div>
    ))}
  </div>
);

export const SkeletonProfile = () => (
  <div className="flex items-center space-x-3">
    <Skeleton className="h-10 w-10 rounded-full" />
    <div className="space-y-2">
      <Skeleton className="h-4 w-24" />
      <Skeleton className="h-3 w-32" />
    </div>
  </div>
);

export const SkeletonNotification = () => (
  <div className="p-3 space-y-2">
    <div className="flex items-center space-x-2">
      <Skeleton className="h-2 w-2 rounded-full" />
      <Skeleton className="h-3 w-32" />
    </div>
    <Skeleton className="h-3 w-20" />
  </div>
);