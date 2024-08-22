export function Button(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className="bg-neutral-300 text-neutral-900 rounded-md px-4 py-2 text-lg hover:bg-neutral-400 transition-colors shadow-sm border-neutral-500 border"
    />
  );
}
