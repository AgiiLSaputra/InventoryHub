import { useEffect } from "react";
import { useForm } from "react-hook-form";

export default function ProductFormModal({ open, onClose, onSubmit, initialData }) {
  const isEdit = !!initialData;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      nama: "",
      kategori: "",
      stok: "",
      harga: "",
    },
  });

  useEffect(() => {
    if (open) {
      if (initialData) {
        reset({
          nama: initialData.nama,
          kategori: initialData.kategori,
          stok: String(initialData.stok),
          harga: String(initialData.harga),
        });
      } else {
        reset({ nama: "", kategori: "", stok: "", harga: "" });
      }
    }
  }, [open, initialData, reset]);

  if (!open) return null;

  const submit = (data) => {
    onSubmit(data);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* backdrop */}
      <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" onClick={onClose} />
      {/* modal */}
      <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-lg border border-slate-200 animate-[fadeIn_0.15s_ease]">
        <div className="px-6 pt-6 pb-2">
          <h2 className="text-lg font-semibold text-slate-800">
            {isEdit ? "Edit Produk" : "Tambah Produk Baru"}
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            {isEdit ? "Perbarui data produk di bawah ini." : "Isi semua field untuk menambah produk."}
          </p>
        </div>

        <form onSubmit={handleSubmit(submit)} className="px-6 pb-6 pt-4 space-y-4">
          {/* Nama */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Nama Produk <span className="text-red-500">*</span>
            </label>
            <input
              {...register("nama", { required: "Nama wajib diisi" })}
              placeholder="Contoh: Kopi Arabika 250g"
              className={`w-full px-3.5 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 transition ${errors.nama ? "border-red-300 bg-red-50/30" : "border-slate-200 bg-white"}`}
            />
            {errors.nama && <p className="text-xs text-red-600 mt-1.5">{errors.nama.message}</p>}
          </div>

          {/* Kategori */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Kategori <span className="text-red-500">*</span>
            </label>
            <input
              {...register("kategori", { required: "Kategori wajib diisi" })}
              placeholder="Contoh: Minuman"
              className={`w-full px-3.5 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 transition ${errors.kategori ? "border-red-300 bg-red-50/30" : "border-slate-200 bg-white"}`}
            />
            {errors.kategori && <p className="text-xs text-red-600 mt-1.5">{errors.kategori.message}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Stok */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Stok <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                step="1"
                min="0"
                {...register("stok", {
                  required: "Stok wajib diisi",
                  validate: (v) => {
                    if (v === "" || v === null) return "Stok wajib diisi";
                    const n = Number(v);
                    if (Number.isNaN(n)) return "Stok harus angka";
                    if (!Number.isInteger(n)) return "Stok harus bilangan bulat";
                    if (n < 0) return "Stok tidak boleh negatif";
                    return true;
                  },
                })}
                placeholder="42"
                className={`w-full px-3.5 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 transition ${errors.stok ? "border-red-300 bg-red-50/30" : "border-slate-200 bg-white"}`}
              />
              {errors.stok && <p className="text-xs text-red-600 mt-1.5">{errors.stok.message}</p>}
            </div>

            {/* Harga */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Harga (Rp) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                step="any"
                {...register("harga", {
                  required: "Harga wajib diisi",
                  validate: (v) => {
                    if (v === "" || v === null) return "Harga wajib diisi";
                    const n = Number(v);
                    if (Number.isNaN(n)) return "Harga harus angka";
                    return true;
                  },
                })}
                placeholder="65000.50"
                className={`w-full px-3.5 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 transition ${errors.harga ? "border-red-300 bg-red-50/30" : "border-slate-200 bg-white"}`}
              />
              {errors.harga && <p className="text-xs text-red-600 mt-1.5">{errors.harga.message}</p>}
              <p className="text-[11px] text-slate-400 mt-1">Mendukung desimal, tanpa batas min/maks</p>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 text-sm font-medium rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 transition"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2.5 text-sm font-semibold rounded-lg bg-violet-600 hover:bg-violet-700 text-white shadow-sm transition disabled:opacity-60"
            >
              {isEdit ? "Simpan Perubahan" : "Tambah Produk"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
