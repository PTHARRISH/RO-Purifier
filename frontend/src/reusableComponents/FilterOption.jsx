// FilterOptions.jsx
import { useState } from "react";

export default function FilterOptions({ categories, onFilterChange }) {
  const [selected, setSelected] = useState([]);

  const toggleFilter = (category) => {
    const newSelected = selected.includes(category)
      ? selected.filter((c) => c !== category)
      : [...selected, category];
    setSelected(newSelected);
    onFilterChange(newSelected);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md border">
      <h3 className="font-semibold text-lg mb-4">Filters</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {categories.map((category) => (
          <label key={category} className="flex items-center gap-2 p-3 rounded-lg hover:bg-gray-50 cursor-pointer group">
            <input
              type="checkbox"
              checked={selected.includes(category)}
              onChange={() => toggleFilter(category)}
              className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
            />
            <span className="text-sm font-medium group-hover:text-blue-600">{category}</span>
          </label>
        ))}
      </div>
      {selected.length > 0 && (
        <button
          onClick={() => {
            setSelected([]);
            onFilterChange([]);
          }}
          className="mt-4 text-blue-600 hover:text-blue-800 text-sm font-medium"
        >
          Clear all ({selected.length})
        </button>
      )}
    </div>
  );
}
