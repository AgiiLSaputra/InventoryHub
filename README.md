# InventoryHub

**InventoryHub** adalah aplikasi manajemen inventaris produk yang dirancang untuk Usaha Kecil Menengah (UKM). Aplikasi ini memungkinkan pengguna untuk mengelola stok produk secara lokal melalui browser.

## Fitur Utama

- **CRUD Produk** — Tambah, edit, hapus, dan lihat daftar produk
- **Pencarian** — Cari produk berdasarkan nama atau kategori
- **Pagination** — Navigasi daftar produk dengan 5 item per halaman
- **Data Lokal** — Semua data tersimpan di local storage browser (tidak memerlukan backend)
- **Modal Interaktif** — Formulir tambah/edit produk dan konfirmasi hapus
- **Notifikasi Toast** — Notifikasi singkat untuk setiap aksi yang dilakukan
- **Desain Responsif** — Tampilan yang responsif di berbagai ukuran layar

## Teknologi & Library

### React 19
Library UI dari Meta (Facebook) untuk membangun antarmuka pengguna berbasis komponen. React 19 membawa fitur terbaru seperti React Compiler, Server Components, dan optimasi performa. Pada proyek ini, React digunakan untuk membuat komponen-komponen UI seperti tabel produk, form modal, pagination, dan search bar.

### Vite 8
Build tool dan development server modern yang sangat cepat. Vite menggunakan ES Module secara native sehingga waktu reload sangat singkat (HMR - Hot Module Replacement). Vite juga berfungsi sebagai bundler saat build untuk produksi.

### Tailwind CSS 3
Framework CSS utility-first yang memungkinkan styling langsung di markup HTML/JSX tanpa menulis CSS manual. Contohnya: `className="bg-violet-600 text-white px-5 py-2"` langsung menerapkan warna, padding, dan lainnya. Ini mempercepat development dan menjaga konsistensi desain.

### React Hook Form
Library untuk mengelola form state di React dengan performa tinggi. Library ini minim re-render karena menggunakan uncontrolled components. Pada proyek ini digunakan untuk mengelola form tambah/edit produk, termasuk validasi input seperti nama produk, harga, stok, dan kategori.

### Oxlint
Linter cepat yang ditulis dalam bahasa Rust (sama seperti Vite). Oxlint membantu mendeteksi error dan code smell pada JavaScript/JSX. Lebih cepat dibanding ESLint karena dikompilasi ke native code. Digunakan untuk menjaga kualitas dan konsistensi kode.

### PostCSS
Tool untuk transformasi CSS dengan plugin. PostCSS menjadi jembatan antara CSS mentah dan CSS yang digunakan browser. Pada proyek ini, PostCSS bekerja sama dengan Tailwind CSS dan Autoprefixer untuk memproses CSS.

### Autoprefixer
Plugin PostCSS yang secara otomatis menambahkan vendor prefix (seperti `-webkit-`, `-moz-`, `-ms-`) pada properti CSS yang membutuhkannya. Ini memastikan style aplikasi kompatibel dengan berbagai browser tanpa perlu menulis prefix secara manual.

## Struktur Proyek

```
src/
├── components/
│   ├── Header.jsx
│   ├── SearchBar.jsx
│   ├── ProductTable.jsx
│   ├── ProductFormModal.jsx
│   ├── DeleteConfirmModal.jsx
│   └── Pagination.jsx
├── context/
│   └── ProductContext.jsx
├── hooks/
│   └── useLocalStorageProducts.js
├── utils/
│   └── storage.js
├── App.jsx
├── main.jsx
└── index.css
```

## Cara Menjalankan

```bash
# Instalasi dependensi
npm install

# Jalankan development server
npm run dev

# Build untuk produksi
npm run build

# Preview hasil build
npm run preview
```

## Lisensi

Proyek ini merupakan proyek pribadi.
