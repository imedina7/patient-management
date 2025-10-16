export function Input({ className, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      {...props}
      className={`border-2 border-gray-500 px-2 py-1 my-1 bg-neutral-900 rounded-sm focus:bg-neutral-800 focus:outline-4 focus:outline-gray-600/35 ${className}`}
    />
  );
}
