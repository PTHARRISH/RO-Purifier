// SearchBar.jsx
export default function SearchBar({ onSearch }) {
  return (
    <div className="w-full max-w-md">
      <div className="relative">
        <input 
          type="search" 
          placeholder="Search products..." 
          className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          onChange={(e) => onSearch(e.target.value)}
        />
        <svg className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
    </div>
  );
}
