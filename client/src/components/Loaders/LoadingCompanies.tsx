const LoadingCompaniesSkeleton: React.FC = () => {
  return (
    <div className="grid gap-3 lg:grid-cols-3">
      {Array.from({ length: 10 }).map((_job, ind) => (
        <div
          key={ind}
          className="flex flex-col gap-10 animate-pulse bg-gray-100 p-6 rounded-lg w-full"
        >
          <div className="flex justify-between gap-3">
            <div className="animate-pulse bg-gray-300 w-28 h-28 rounded-full"></div>
            <div className="animate-pulse h-4 bg-gray-300 rounded w-60"></div>
            <div className="animate-pulse h-10 bg-gray-300 rounded w-28"></div>
          </div>
          <div className="flex justify-between gap-3">
            <div className="animate-pulse h-4 bg-gray-300 rounded w-28"></div>
            <div className="animate-pulse h-4 bg-gray-300 rounded w-28"></div>
            <div className="animate-pulse h-4 bg-gray-300 rounded w-28"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LoadingCompaniesSkeleton;
