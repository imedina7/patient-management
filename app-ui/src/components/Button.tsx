export function Button(props: React.ComponentProps<"button">) {
  return (
    <button
      {...props}
      className="rounded-sm cursor-pointer hover:bg-cyan-800 active:bg-amber-100 active:text-cyan-950 px-6 py-2 bg-cyan-950 text-white font-semibold"
    />
  );
}
