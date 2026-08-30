import { createContext, useContext, useState, useMemo, useCallback } from "react";
import { useLocalStorageProducts } from "../hooks/useLocalStorageProducts";

const ProductContext = createContext(null);

export function ProductProvider({ children }) {
  const { products, addProduct, updateProduct, deleteProduct } = useLocalStorageProducts();
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 5;

  // filter by nama or kategori
  const filtered = useMemo(() => {
    if (!search.trim()) return products;
    const q = search.toLowerCase();
    return products.filter(
      (p) => p.nama.toLowerCase().includes(q) || p.kategori.toLowerCase().includes(q)
    );
  }, [products, search]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));

  // clamp page if filtered shrinks
  const safePage = Math.min(currentPage, totalPages);

  const paginated = useMemo(() => {
    const start = (safePage - 1) * ITEMS_PER_PAGE;
    return filtered.slice(start, start + ITEMS_PER_PAGE);
  }, [filtered, safePage]);

  const handleSearch = useCallback((value) => {
    setSearch(value);
    setCurrentPage(1);
  }, []);

  const handlePageChange = useCallback((page) => {
    setCurrentPage(page);
  }, []);

  // wrap CRUD to reset pagination on add
  const handleAdd = useCallback(
    (data) => {
      addProduct(data);
      setCurrentPage(1);
    },
    [addProduct]
  );

  const handleUpdate = useCallback(
    (id, data) => {
      updateProduct(id, data);
    },
    [updateProduct]
  );

  const handleDelete = useCallback(
    (id) => {
      deleteProduct(id);
      // if last item on page deleted, page will auto-clamp via safePage
    },
    [deleteProduct]
  );

  const value = useMemo(
    () => ({
      products,
      filtered,
      paginated,
      search,
      handleSearch,
      currentPage: safePage,
      totalPages,
      handlePageChange,
      handleAdd,
      handleUpdate,
      handleDelete,
      totalCount: products.length,
      filteredCount: filtered.length,
    }),
    [products, filtered, paginated, search, handleSearch, safePage, totalPages, handlePageChange, handleAdd, handleUpdate, handleDelete]
  );

  return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>;
}

export const useProducts = () => {
  const ctx = useContext(ProductContext);
  if (!ctx) throw new Error("useProducts must be used within ProductProvider");
  return ctx;
};
