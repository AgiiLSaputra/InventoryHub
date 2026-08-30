export default function DeleteConfirmModal({ open, product, onClose, onConfirm }) {
  if (!open || !product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-md border border-slate-200 p-6">
        <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4 text-red-600">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
            <line x1="12" y1="9" x2="12" y2="13" />
            <line x1="12" y1="17" x2="12.01" y2="17" />
          </svg>
        </div>
        <h3 className="text-center text-base font-semibold text-slate-800">Hapus produk?</h3>
        <p className="text-center text-sm text-slate-500 mt-2">
          Yakin ingin menghapus <span className="font-semibold text-slate-700">"{product.nama}"</span>? Tindakan ini tidak dapat dibatalkan.
        </p>
        <div className="flex items-center justify-center gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-5 py-2.5 text-sm font-medium rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 transition flex-1"
          >
            Batal
          </button>
          <button
            onClick={() => {
              onConfirm(product.id);
              onClose();
            }}
            className="px-5 py-2.5 text-sm font-semibold rounded-lg bg-red-600 hover:bg-red-700 text-white transition flex-1 shadow-sm"
          >
            Ya, Hapus
          </button>
        </div>
      </div>
    </div>
  );
}
