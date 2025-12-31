// src/Authentication/Input.jsx
export default function Input({ label, name, type = "text", value, onChange, className = "", placeholder = "", ...props }) {
  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <input
        type={type}
        name={name}
        value={value || ''}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-md text-sm ${className}`}
        {...props}
      />
    </div>
  );
}
