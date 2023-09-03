import { Skeleton } from "@/ui/skeleton";

export default function ThoughtsPlaceholder() {
  return (
      <div className="flex flex-col  gap-1 sm:w-2/4 min-w-[300px] w-screen rounded-lg">
            <Skeleton className=" min-h-48 h-48 w-full min-w-[300px] max-h-56 p-6" />
            <div className="flex justify-between items-center px-6 py-2">
              <Skeleton className="w-[240px] h-9" />
              <Skeleton className="h-9 w-[75.95px]" />
            </div>
          </div>
  );
}