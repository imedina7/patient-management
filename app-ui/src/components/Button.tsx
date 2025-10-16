export function Button(props: React.ComponentProps<"button">) {
  return (
    <button
      {...props}
      className="rounded-sm px-6 py-2 bg-cyan-950 text-white font-semibold"
    />
  );
}
