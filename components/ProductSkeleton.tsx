export default function ProductSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {[...Array(5)].map((_, index) => (
        <div
          key={index}
          className="group relative bg-white border border-gray-200 flex flex-col items-center p-4 rounded-[10px] overflow-hidden"
        >
          <div className="relative">
            <div className="w-[150px] h-[150px] bg-gray-200 rounded animate-pulse"></div>
          </div>
          <div className="flex flex-col items-center gap-2 p-4 w-full">
            <div className="flex items-center gap-[.5px]">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="w-4 h-4 bg-gray-200 rounded animate-pulse"
                ></div>
              ))}
            </div>
            <div className="h-6 w-3/4 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-5 w-1/3 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>
      ))}
    </div>
  );
}
