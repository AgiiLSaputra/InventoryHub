import { useState, useEffect, useCallback, useMemo } from "react";
import { loadProducts, saveProducts } from "../utils/storage";

const initialData = [
  { id: "1", nama: "Kopi Arabika 250g", kategori: "Minuman", stok: 42, harga: 65000 },
  { id: "2", nama: "Tas Ransel Eiger", kategori: "Aksesoris", stok: 8, harga: 459000 },
  { id: "3", nama: "Kaos Polos Cotton", kategori: "Pakaian", stok: 120, harga: 79000 },
  { id: "4", nama: "Mouse Wireless Logitech", kategori: "Elektronik", stok: 15, harga: 299000 },
  { id: "5", nama: "Buku Tulis A5", kategori: "Alat Tulis", stok: 200, harga: 12000 },
  { id: "6", nama: "Botol Minum Stainless", kategori: "Peralatan", stok: 35, harga: 85000 },
  { id: "7", nama: "Headset Bluetooth", kategori: "Elektronik", stok: 3, harga: 189000 },
  { id: "8", nama: "Celana Jeans Slim", kategori: "Pakaian", stok: 22, harga: 199000 },
];

export function useLocalStorageProducts() {
  const [products, setProducts] = useState(() => {
    const stored = loadProducts();
    return stored ?? initialData;
  });

  // persist to localStorage — optimistic update means UI already updated before this effect
  useEffect(() => {
    saveProducts(products);
  }, [products]);

  const addProduct = useCallback((data) => {
    const newProduct = {
      id: Date.now().toString(),
      nama: data.nama.trim(),
      kategori: data.kategori.trim(),
      stok: Number(data.stok),
      harga: Number(data.harga),
    };
    // optimistic update
    setProducts((prev) => [newProduct, ...prev]);
  }, []);

  const updateProduct = useCallback((id, data) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === id
          ? {
              ...p,
              nama: data.nama.trim(),
              kategori: data.kategori.trim(),
              stok: Number(data.stok),
              harga: Number(data.harga),
            }
          : p
      )
    );
  }, []);

  const deleteProduct = useCallback((id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  }, []);

  return useMemo(
    () => ({ products, addProduct, updateProduct, deleteProduct, setProducts }),
    [products, addProduct, updateProduct, deleteProduct]
  );
}
