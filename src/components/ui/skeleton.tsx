import { cn } from "@/lib/utils";

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn("bg-amber-300 animate-pulse w-full h-full", className)}
      {...props}
    />
  );
}

export { Skeleton };
