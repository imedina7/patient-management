import { cn } from "@/lib/utils/ui";

export function Card({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      {...props}
      className={cn(
        "rounded-lg border border-neutral-600 py-10 px-5 bg-neutral-900",
        className
      )}
    />
  );
}
