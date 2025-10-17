"use client";
import { cn } from "@/lib/utils/ui";
import { createContext, SetStateAction, useContext, useState } from "react";

const CardContext = createContext({
  expanded: false,
  setExpanded: (value: SetStateAction<boolean>) => {},
});
export function Card({ className, ...props }: React.ComponentProps<"div">) {
  const [expanded, setExpanded] = useState<boolean>(false);
  return (
    <CardContext.Provider value={{ expanded, setExpanded }}>
      <div
        {...props}
        className={cn(
          "rounded-lg border border-neutral-600 py-5 px-5 bg-neutral-900",
          className
        )}
      />
    </CardContext.Provider>
  );
}

export function CardHeader({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { expanded, setExpanded } = useContext(CardContext);
  return (
    <div
      className={cn("py-2.5", { "border-b border-b-gray-600": expanded })}
      onClick={() => setExpanded((state) => !state)}
      {...props}
    />
  );
}

export function CardBody(props: React.ComponentProps<"div">) {
  const { expanded } = useContext(CardContext);
  if (!expanded) return null;
  return <div {...props} />;
}
