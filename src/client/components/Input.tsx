export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={`bg-neutral-100 text-neutral-900 rounded-md px-4 py-2 text-lg border-neutral-500 border ${props.className}`.trim()}
    />
  );
}
