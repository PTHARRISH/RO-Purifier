// src/reusableComponents/Input.jsx
import React from "react";

export default function Input({ 
  label, 
  type = "text", 
  value, 
  onChange, 
  error, 
  placeholder, 
  disabled = false,
  className = "",
  name,
  ...props 
}) {
  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
          {label}
        </label>
      )}
      <input
        name={name}
        type={type}
        value={value || ""}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        className={`
          w-full px-4 py-3 rounded-xl border-2 font-medium text-base transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-opacity-50
          ${error 
            ? "border-red-400 bg-red-50/50 text-red-900 placeholder-red-300 focus:border-red-400 focus:ring-red-200 hover:border-red-500" 
            : "border-gray-200 hover:border-gray-300 focus:border-blue-400 focus:ring-blue-200 bg-white dark:bg-gray-800 dark:border-gray-600"
          }
          ${disabled 
            ? "bg-gray-100 cursor-not-allowed opacity-60 dark:bg-gray-700" 
            : "hover:shadow-sm"
          }
          ${className}
        `}
        {...props}
      />
      {error && (
        <p className="text-sm font-medium text-red-600 dark:text-red-400 animate-pulse">
          {error}
        </p>
      )}
    </div>
  );
}
