export default function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  ...props
}) {
  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-gray-200 text-gray-800",
    outline: "border border-blue-600 text-blue-600",
  };

  return (
    <button
      {...props}
      className={`
        inline-flex items-center justify-center
        w-full sm:w-auto
        px-5 py-2.5 rounded-lg
        text-sm font-medium
        transition
        ${variants[variant]}
        ${className}
      `}
    >
      {children}
    </button>
  );
}
