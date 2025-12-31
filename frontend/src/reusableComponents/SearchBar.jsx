export default function SearchBar({ onSearch }) {
  return (
    <div className="w-full max-w-full sm:max-w-md mx-auto">
      <input
        type="search"
        placeholder="Search products..."
        onChange={(e) => onSearch(e.target.value)}
        className="
          w-full max-w-full
          px-4 py-3 rounded-full
          border border-gray-300
          focus:ring-2 focus:ring-blue-500
        "
      />
    </div>
  );
}
