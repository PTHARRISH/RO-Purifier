// Input.jsx
export default function Input({ label, type="text", value, onChange, error, className="" }) {
  return (
    <div className="space-y-1">
      {label && <label className="text-sm font-medium text-gray-700">{label}</label>}
      <input
        type={type}
        value={value}
        onChange={onChange}
        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${error ? "border-red-500" : "border-gray-300"} ${className}`}
      />
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}
