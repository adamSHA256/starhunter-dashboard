interface LoadingSkeletonProps {
  count?: number;
}

const LoadingSkeleton = ({ count = 6 }: LoadingSkeletonProps) => {
  return (
    <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="rounded-xl bg-white p-5">
          <div className="animate-pulse">
            {/* Avatar circle */}
            <div className="mb-4 h-12 w-12 rounded-full bg-gray-200" />

            {/* Name line */}
            <div className="mb-2 h-4 w-3/4 rounded bg-gray-200" />

            {/* Role line */}
            <div className="mb-4 h-3 w-1/2 rounded bg-gray-200" />

            {/* Status badge */}
            <div className="mb-4 h-6 w-20 rounded-full bg-gray-200" />

            {/* Location line */}
            <div className="h-3 w-2/3 rounded bg-gray-200" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default LoadingSkeleton;
