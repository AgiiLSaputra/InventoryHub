import { memo } from "react";

function formatRupiah(n) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(n);
}

const ProductRow = memo(function ProductRow({ product, onEdit, onDelete }) {
  const lowStock = product.stok < 10;
  return (
    <tr className="hover:bg-slate-50/70 transition">
      <td className="px-4 py-3.5 text-sm font-medium text-slate-800 whitespace-nowrap max-w-[260px] truncate">
        {product.nama}
      </td>
      <td className="px-4 py-3.5">
        <span className="inline-flex px-2.5 py-1 text-xs font-medium rounded-full bg-violet-50 text-violet-700 border border-violet-200">
          {product.kategori}
        </span>
      </td>
      <td className="px-4 py-3.5 text-sm">
        <span className={`inline-flex items-center gap-1.5 font-semibold ${lowStock ? "text-amber-600" : "text-slate-700"}`}>
          {product.stok}
          {lowStock && (
            <span title="Stok menipis" className="inline-flex px-1.5 py-0.5 text-[10px] leading-none rounded bg-amber-100 text-amber-700 border border-amber-200">
              LOW
            </span>
          )}
        </span>
      </td>
      <td className="px-4 py-3.5 text-sm font-medium text-slate-700 whitespace-nowrap">
        {formatRupiah(product.harga)}
      </td>
      <td className="px-4 py-3.5">
        <div className="flex items-center gap-2 justify-end">
          <button
            onClick={() => onEdit(product)}
            className="px-3 py-1.5 text-xs font-medium rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 transition"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(product)}
            className="px-3 py-1.5 text-xs font-medium rounded-lg bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 transition"
          >
            Hapus
          </button>
        </div>
      </td>
    </tr>
  );
});

function ProductTable({ products, onEdit, onDelete }) {
  if (products.length === 0) {
    return (
      <div className="bg-white border border-slate-200 rounded-xl p-12 text-center">
        <div className="mx-auto w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mb-3 text-slate-400">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="16" y1="13" x2="8" y2="13" />
            <line x1="16" y1="17" x2="8" y2="17" />
          </svg>
        </div>
        <p className="text-sm font-medium text-slate-700">Tidak ada produk ditemukan</p>
        <p className="text-sm text-slate-500 mt-1">Coba ubah kata kunci pencarian atau tambah produk baru.</p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              <th className="px-4 py-3 text-xs font-semibold tracking-wider text-slate-500 uppercase">Nama</th>
              <th className="px-4 py-3 text-xs font-semibold tracking-wider text-slate-500 uppercase">Kategori</th>
              <th className="px-4 py-3 text-xs font-semibold tracking-wider text-slate-500 uppercase">Stok</th>
              <th className="px-4 py-3 text-xs font-semibold tracking-wider text-slate-500 uppercase">Harga</th>
              <th className="px-4 py-3 text-xs font-semibold tracking-wider text-slate-500 uppercase text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {products.map((p) => (
              <ProductRow key={p.id} product={p} onEdit={onEdit} onDelete={onDelete} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default memo(ProductTable);
