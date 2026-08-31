import { useState, useCallback } from "react";
import { ProductProvider, useProducts } from "./context/ProductContext";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import ProductTable from "./components/ProductTable";
import Pagination from "./components/Pagination";
import ProductFormModal from "./components/ProductFormModal";
import DeleteConfirmModal from "./components/DeleteConfirmModal";

function Dashboard() {
  const {
    paginated,
    search,
    handleSearch,
    currentPage,
    totalPages,
    handlePageChange,
    handleAdd,
    handleUpdate,
    handleDelete,
    totalCount,
    filteredCount,
  } = useProducts();

  const [formOpen, setFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [toast, setToast] = useState(null);

  const showToast = useCallback((msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  }, []);

  const openAdd = useCallback(() => {
    setEditingProduct(null);
    setFormOpen(true);
  }, []);

  const openEdit = useCallback((product) => {
    setEditingProduct(product);
    setFormOpen(true);
  }, []);

  const openDelete = useCallback((product) => {
    setDeleteTarget(product);
  }, []);

  const handleFormSubmit = useCallback(
    (data) => {
      if (editingProduct) {
        handleUpdate(editingProduct.id, data);
        showToast(`Produk "${data.nama}" berhasil diperbarui`);
      } else {
        handleAdd(data);
        showToast(`Produk "${data.nama}" berhasil ditambahkan`);
      }
    },
    [editingProduct, handleAdd, handleUpdate, showToast]
  );

  const handleConfirmDelete = useCallback(
    (id) => {
      handleDelete(id);
      showToast("Produk berhasil dihapus");
    },
    [handleDelete, showToast]
  );

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Title + stats */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-slate-800">Daftar Produk</h2>
          <p className="text-sm text-slate-500 mt-1">
            Kelola stok produk UKM — {totalCount} total produk
            {search && ` • ${filteredCount} hasil untuk "${search}"`}
          </p>
        </div>

        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row gap-3 sm:items-center justify-between mb-5">
          <SearchBar value={search} onChange={handleSearch} />
          <button
            onClick={openAdd}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-violet-600 hover:bg-violet-700 text-white text-sm font-semibold rounded-xl shadow-sm transition whitespace-nowrap"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            Tambah Produk
          </button>
        </div>

        {/* Table */}
        <ProductTable products={paginated} onEdit={openEdit} onDelete={openDelete} />

        {/* Pagination */}
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />

        {/* Footer info */}
        <p className="text-xs text-slate-400 mt-6 text-center">
          Data disimpan di local storage browser • Pagination 5 item/halaman • Pencarian by nama/kategori
        </p>
      </main>

      {/* Modals */}
      <ProductFormModal
        open={formOpen}
        onClose={() => setFormOpen(false)}
        onSubmit={handleFormSubmit}
        initialData={editingProduct}
      />
      <DeleteConfirmModal
        open={!!deleteTarget}
        product={deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleConfirmDelete}
      />

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-slate-900 text-white text-sm font-medium px-5 py-3 rounded-xl shadow-lg animate-[slideUp_0.2s_ease]">
          {toast}
        </div>
      )}

      <style>{`
        @keyframes slideUp { from { transform: translate(-50%, 12px); opacity: 0 } to { transform: translate(-50%,0); opacity:1 } }
        @keyframes fadeIn { from { opacity:0; transform: scale(0.98)} to { opacity:1; transform:scale(1)} }
      `}</style>
    </div>
  );
}

export default function App() {
  return (
    <ProductProvider>
      <Dashboard />
    </ProductProvider>
  );
}
