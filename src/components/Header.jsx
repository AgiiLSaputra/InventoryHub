import { memo } from "react";

function Header() {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-violet-600 flex items-center justify-center text-white font-bold text-sm shadow-sm">
            IH
          </div>
          <div>
            <h1 className="text-[15px] font-bold leading-none text-slate-800">InventoryHub</h1>
            <p className="text-xs text-slate-500 leading-none mt-1">Admin Panel Manajemen Produk</p>
          </div>
        </div>
        <div className="hidden sm:flex items-center gap-2 text-xs text-slate-500">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          Local Storage • Optimistic Update
        </div>
      </div>
    </header>
  );
}

export default memo(Header);
