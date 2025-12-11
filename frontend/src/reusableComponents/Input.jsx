export default function Input({
  label,
  type = "text",
  value,
  onChange,
  error,
  placeholder
}) {
  return (
    <div className="space-y-1">
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}

      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
          error ? "border-red-500 ring-red-300" : "border-gray-300 ring-blue-300"
        }`}
      />

      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}
