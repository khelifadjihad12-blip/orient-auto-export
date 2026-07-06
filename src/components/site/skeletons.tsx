import { cn } from "@/lib/utils";

/** Premium skeleton shimmer used while content streams in. */
export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-muted",
        className
      )}
      aria-hidden
    />
  );
}

/** Vehicle-card skeleton — matches the VehicleCard layout. */
export function VehicleCardSkeleton() {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card">
      <Skeleton className="aspect-[4/3] w-full rounded-none" />
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex justify-between">
          <Skeleton className="h-3 w-16" />
          <Skeleton className="h-3 w-10" />
        </div>
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
        <div className="grid grid-cols-3 gap-2 border-y border-border py-3">
          <Skeleton className="mx-auto h-8 w-full" />
          <Skeleton className="mx-auto h-8 w-full" />
          <Skeleton className="mx-auto h-8 w-full" />
        </div>
        <div className="mt-auto flex items-end justify-between pt-1">
          <Skeleton className="h-10 w-20" />
          <Skeleton className="h-8 w-24" />
        </div>
      </div>
    </div>
  );
}

/** Grid of vehicle-card skeletons. */
export function VehicleGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div
      className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
      role="status"
      aria-label="Loading vehicles"
    >
      {Array.from({ length: count }).map((_, i) => (
        <VehicleCardSkeleton key={i} />
      ))}
    </div>
  );
}
