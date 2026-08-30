import { memo } from "react";

function SearchBar({ value, onChange }) {
  return (
    <div className="relative flex-1 max-w-md">
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.35-4.35" />
        </svg>
      </span>
      <input
        type="text"
        placeholder="Cari nama atau kategori..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition"
      />
    </div>
  );
}

export default memo(SearchBar);
