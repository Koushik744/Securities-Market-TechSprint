import { cn } from "@/lib/utils"

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Skeleton({ className, ...props }: SkeletonProps) {
  return (
    <div
      className={cn("skeleton rounded-lg", className)}
      {...props}
    />
  )
}

export function StatCardSkeleton() {
  return (
    <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
      <Skeleton className="h-3 w-24 mb-3" />
      <Skeleton className="h-7 w-32 mb-2" />
      <Skeleton className="h-3 w-20" />
    </div>
  )
}

export function ChartSkeleton({ height = 200 }: { height?: number }) {
  return (
    <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
      <Skeleton className="h-4 w-32 mb-4" />
      <Skeleton style={{ height }} className="w-full" />
    </div>
  )
}
