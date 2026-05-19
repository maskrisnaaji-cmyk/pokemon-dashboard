export default function LoadingSpinner() {
  return (
    <div className="flex gap-6 overflow-x-auto pb-6 pt-2 scrollbar-none">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="w-[280px] shrink-0 bg-white border border-gray-100 p-6 rounded-2xl flex flex-col items-center animate-pulse">
          <div className="w-32 h-32 bg-gray-250 rounded-full mb-4"></div>
          <div className="h-4 bg-gray-250 rounded-md w-12 mb-2"></div>
          <div className="h-6 bg-gray-250 rounded-md w-24 mb-3"></div>
          <div className="h-5 bg-gray-250 rounded-full w-16"></div>
        </div>
      ))}
    </div>
  );
}