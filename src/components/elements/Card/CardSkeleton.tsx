export default function CardSkeleton() {
  return (
    <div className="group flex animate-pulse cursor-pointer flex-col items-center justify-center gap-2 rounded-xl bg-[#303030] p-2 text-center transition-all duration-300">
      <div className="relative h-full w-full">
        <div className="min-h-72 w-full rounded-xl bg-gray-600 object-cover transition-all duration-300 group-hover:brightness-50" />
      </div>
      <div className="w-full space-y-1 text-start">
        <div className="h-4 w-3/4 rounded-full bg-gray-600"></div>
      </div>
    </div>
  );
}
