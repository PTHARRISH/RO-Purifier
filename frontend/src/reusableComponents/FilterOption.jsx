import { useState } from "react";

export default function FilterOptions({ categories = [], onFilterChange }) {
  const [selected, setSelected] = useState([]);

  const toggleFilter = (category) => {
    const updated = selected.includes(category)
      ? selected.filter((c) => c !== category)
      : [...selected, category];

    setSelected(updated);
    onFilterChange(updated);
  };

  return (
    <div className="bg-white rounded-2xl shadow-md border p-4 sm:p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-base sm:text-lg">Filters</h3>

        {selected.length > 0 && (
          <button
            onClick={() => {
              setSelected([]);
              onFilterChange([]);
            }}
            className="text-xs sm:text-sm text-blue-600 hover:text-blue-800 font-medium"
          >
            Clear ({selected.length})
          </button>
        )}
      </div>

      {/* Mobile: scroll | Desktop: grid */}
      <div className="flex gap-3 overflow-x-auto sm:grid sm:grid-cols-2 md:grid-cols-3 scrollbar-hide">
        {categories.map((category) => (
          <label
            key={category}
            className="flex items-center gap-2 px-4 py-2 border rounded-full sm:rounded-lg cursor-pointer hover:bg-gray-50 transition whitespace-nowrap"
          >
            <input
              type="checkbox"
              checked={selected.includes(category)}
              onChange={() => toggleFilter(category)}
              className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
            />
            <span className="text-sm font-medium">{category}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
