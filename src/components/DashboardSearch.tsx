
export function DashboardSearch() {
  return (
    <div className="flex w-full max-w-sm items-center gap-2">
      <div className="relative flex-1">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.3-4.3" />
        </svg>
        <input
          className="w-full rounded-md border border-gray-200 bg-white pl-8 pr-4 py-2 text-sm placeholder:text-gray-500 focus:border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-300"
          placeholder="Input search ..."
          type="search"
        />
      </div>
      <div className="flex items-center gap-2 text-sm text-gray-500">
        <span>⌘</span>
        <span>+</span>
        <span>F</span>
      </div>
    </div>
  );
}
