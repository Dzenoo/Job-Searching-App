const LoadingApplicationsSkeleton: React.FC = () => {
  return (
    <div className="grid gap-3 grid-cols-3">
      {Array.from({ length: 6 }).map((_item, ind) => (
        <div
          key={ind}
          className="flex flex-col gap-10 animate-pulse bg-gray-100 p-6 rounded-lg w-full"
        >
          <div className="flex gap-3 items-center">
            <div className="w-28 h-28 rounded-full bg-gray-300"></div>
            <div className="flex flex-col gap-3">
              <div className="h-4 bg-gray-300 rounded w-28"></div>
              <div className="h-4 bg-gray-300 rounded w-16"></div>
              <div className="flex gap-3">
                <div className="h-4 bg-gray-300 rounded w-16"></div>
                <div className="h-4 bg-gray-300 rounded w-16"></div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <div className="h-4 bg-gray-300 rounded w-28"></div>
            <div className="flex gap-3 items-center">
              <div className="h-4 bg-gray-300 rounded w-28"></div>
              <div className="h-4 bg-gray-300 rounded w-28"></div>
              <div className="h-4 bg-gray-300 rounded w-28"></div>
            </div>
          </div>
          <div>
            <div className="h-10 bg-gray-300 rounded-full w-full"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LoadingApplicationsSkeleton;
