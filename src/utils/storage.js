const STORAGE_KEY = "inventoryhub_products";

export const loadProducts = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

export const saveProducts = (products) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
};

export const STORAGE_KEY_NAME = STORAGE_KEY;
