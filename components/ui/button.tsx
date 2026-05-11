interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
}

export function Button({
  children,
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      className={`border border-white px-4 py-2 text-sm uppercase tracking-widest transition hover:bg-white hover:text-black ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}