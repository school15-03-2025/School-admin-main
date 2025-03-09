// components/DashboardSkeleton.tsx
import Skeleton from "@/components/Skeleton";

export const DashboardSkeleton = () => (
  <div className="w-full p-8 space-y-4">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {[1, 2, 3, 4].map((i) => (
        <Skeleton key={i} className="h-32 rounded-xl shadow-md" />
      ))}
    </div>
    <Skeleton className="h-[350px] rounded-xl shadow-md" />
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <Skeleton className="h-[300px] rounded-xl shadow-md" />
      <Skeleton className="h-[300px] rounded-xl shadow-md" />
    </div>
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <Skeleton className="h-[250px] rounded-xl shadow-md" />
      <Skeleton className="h-[250px] rounded-xl shadow-md" />
      <Skeleton className="h-[250px] rounded-xl shadow-md" />
    </div>
  </div>
);
