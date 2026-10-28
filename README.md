# 🎬 Skejul Upload Studio v1.1.0

**Aplikasi Desktop untuk Manajemen dan Penjadwalan Upload Video**

Skejul Upload Studio adalah aplikasi desktop modern yang membantu content creator mengelola jadwal upload video dengan efisien. Dilengkapi dengan fitur penjadwalan otomatis, manajemen data lengkap, dan antarmuka yang user-friendly.

---

## 📋 Daftar Isi

- [Fitur Utama](#-fitur-utama)
- [Changelog v1.1.0 — Apa yang Baru?](#-changelog-v110--apa-yang-baru)
- [Prasyarat Sistem](#-prasyarat-sistem)
- [Instalasi](#-instalasi)
- [Cara Penggunaan](#-cara-penggunaan)
- [Struktur Proyek](#-struktur-proyek)
- [Teknologi yang Digunakan](#-teknologi-yang-digunakan)
- [Development](#-development)
- [Build untuk Production](#-build-untuk-production)
- [Berkontribusi](#-berkontribusi)
- [Lisensi](#-lisensi)
- [Hubungi Kami](#-hubungi-kami)

---

## ✨ Fitur Utama

### 📅 **Penjadwalan Cerdas & Otomatis**
- **Light Novel**: 1 upload per hari pada jam 00:00 WIB (terkunci otomatis)
- **Novel China**: 3 upload per hari pada jam 06:00, 12:00, 18:00 WIB (rotasi jadwal)
- Perhitungan slot berikutnya otomatis berdasarkan upload terakhir
- Tombol aksi cepat: +Slot Berikut, +1 Hari, +6 Jam, Salin Terakhir
- Form status upload dengan validasi yang benar — dropdown tidak ter-reset saat ganti kategori

### 🎯 **Manajemen Data Lengkap (CRUD)**
- ✅ **Create** - Tambah jadwal video baru dengan auto-fill
- ✅ **Read** - Lihat semua upload dalam tabel terorganisir
- ✅ **Update** - Edit tanggal, waktu, dan status video
- ✅ **Delete** - Hapus video dengan konfirmasi modal

### 🎨 **UI/UX Modern & Responsif**
- 🌙 Toggle tema Dark/Light Mode dengan penyimpanan otomatis (localStorage persistence)
- 📱 Layout responsive yang optimal di berbagai ukuran layar
- ✨ Modal elegan dengan animasi smooth
- 🎯 Desain profesional dengan kontrol intuitif
- 🌈 Sistem token warna Material Design 3 yang konsisten di light & dark mode
- 🎨 Semua tombol menggunakan warna on-primary/on-secondary/on-tertiary/on-error yang benar di kedua tema

### 📊 **Fitur Manajemen Data Canggih**
- 📋 **Bulk Actions** - Pilih multiple video dan update status sekaligus
- 🔤 **Smart Sorting** - Urutkan "Terbaru" atau "Terlama" dengan presisi jam/menit
- 📋 **Checkbox Selection** - Select all / Select individual dengan ease
- 📋 **Edit Modal** - Form edit inline untuk update cepat
- 💾 **Copy to Clipboard** - Copy tanggal (DD/MM/YYYY) dengan sekali klik
- 🗂️ **Status Badge** - Visual indicator "Belum Upload" vs "Sudah Upload"
- 🔢 **Dynamic Item Count** — Jumlah video dihitung secara dinamis (tidak hardcoded lagi)

### 🔔 **Notifikasi & Alert System**
- 🔔 Bel notifikasi dengan daftar video akan dijadwalkan
- ⚠️ Deteksi duplikasi slot waktu dengan warning modal
- 🔄 Real-time status updates
- 📅 Notifikasi diurutkan berdasarkan tanggal terdekat (chronological)
- 🖱️ Klik di luar panel notifikasi untuk menutup (outside-click handler)

### 💾 **Penyimpanan Data Otomatis**
- 📦 localStorage Persistence - Semua data tersimpan lokal otomatis
- 🚀 Zero data loss - Data tidak hilang saat refresh/restart
- 📥 Import Legacy JSON - Support konversi format lama (DD BULAN TAHUN JAM HH.MM)
- 📤 Export Data - Backup dan archive data dengan mudah
- 🗄️ Backup & Restore di halaman Pengaturan — simpan/restore seluruh data ke file JSON
- 📥 Import/Export terintegrasi di Pengaturan dengan feedback visual

### 📆 **Tampilan Kalender**
- 📅 Navigasi bulan/tahun penuh untuk seluruh tahun
- 🗓️ Month/Year selector intuitif
- 📊 Gambaran visual jadwal keseluruhan
- ✅ Grid kalender dengan offset hari awal bulan yang benar (tidak lagi misaligned)

### 📈 **Dashboard Statistik**
- 📊 Total video, video sudah upload, video belum upload
- 📅 Statistik per kategori (Light Novel / Novel China)
- 🔢 Persentase completion (dengan penanganan div-by-zero — tidak crash saat data kosong)
- 📥 Import Master JSON langsung dari halaman Statistik
- 📤 Export Data ke file JSON

### ⚙️ **Halaman Pengaturan (Fully Functional)**
- 🗄️ **Database Info** — Tampilkan jumlah data tersimpan dan ukuran
- 💾 **Backup Data** — Simpan seluruh data ke file JSON
- 🔄 **Restore Data** — Load data dari file backup JSON
- 📥 **Import Data** — Import data dari sumber eksternal
- 📤 **Export Data** — Export semua data ke file JSON
- 🧹 **Clear Cache** — Bersihkan cache aplikasi dengan konfirmasi
- ✅ **Verifikasi Data** — Validasi integritas data tersimpan
- 🎨 Layout terstruktur dengan card-based sections yang rapi

### 📱 **Empty State Handling**
- 🎯 UI bersih ketika belum ada data
- 🎯 Helpful instructions untuk user baru

---

## 🔥 Changelog v1.1.0 — Apa yang Baru?

Versi ini berfokus pada **memastikan semua fitur berfungsi 100%** dan memperbaiki berbagai bug UI/UX. Berikut detail perubahannya:

### 🐛 Bug Fixes

| # | Masalah | Perbaikan |
|---|---------|-----------|
| 1 | **Layout Pengaturan berantakan** — Halaman Pengaturan punya wrapper `pl-64` + `<main>` duplikat yang menyebabkan konten tertekan jauh ke kanan | Dihapus wrapper berlebih, diganti dengan struktur `flex flex-col` yang konsisten dengan halaman lain |
| 2 | **Tombol "ON" dan teks pada primary/secondary button tidak terlihat di dark mode** — Token `on-primary`, `on-secondary`, `on-tertiary`, `on-error` belum terdaftar di `@theme` Tailwind | Ditambahkan 4 token baru ke `@theme`, `:root`, dan `.dark` di `App.css`. Di dark mode, teks on-primary berubah gelap (`#001b3d`) agar kontras dengan background terang |
| 3 | **Class utility Tailwind tidak terdefinisi** — Banyak class seperti `p-space-lg`, `gap-space-md`, `font-headline-md`, `text-code-sm` tidak ada di Tailwind v4, sehingga spacing & typography hancur | Diganti semua dengan utility standar Tailwind: `p-6`, `gap-4`, `text-xl`, `font-mono`, dll |
| 4 | **Kalender grid offset salah** — Hari pertama setiap bulan tidak mulai di kolom yang benar | Diperbaiki perhitungan offset hari awal bulan agar grid kalender rapi |
| 5 | **Statistik crash saat data kosong** — Pembagian nol (div-by-zero) saat menghitung persentase | Ditambahkan guard clause — persentase default `0%` jika tidak ada data |
| 6 | **Notifikasi tidak terurut** — Daftar notifikasi acak, tidak chronological | Diurutkan berdasarkan tanggal terdekat (ascending) |
| 7 | **Notifikasi tidak tertutup saat klik luar** — Panel tetap terbuka | Ditambahkan outside-click handler untuk auto-close |
| 8 | **TambahJadwal status ter-reset** — Status upload kembali ke default saat ganti kategori | Diperbaiki `useEffect` dependencies agar status tidak ter-reset tidak perlu |
| 9 | **Item count hardcoded** — Sidebar dan DaftarVideo menampilkan angka statik "212 item" | Diganti dengan perhitungan dinamis dari `videos.length` |

### ✨ Improvements

| # | Peningkatan | Detail |
|---|-------------|--------|
| 1 | **Theme Persistence diperbaiki** | `ThemeContext` sekarang menyimpan & memuat tema dari `localStorage` dengan benar. Tema tidak reset saat refresh |
| 2 | **Pengaturan fully functional** | Semua tombol di halaman Pengaturan sekarang berfungsi: Backup, Restore, Import, Export, Clear Cache, Verifikasi Data |
| 3 | **Layout Pengaturan dirapikan** | Setiap section (Database, Backup, Import/Export, Advanced) menggunakan card terpisah dengan header, icon, dan grid 2 kolom untuk tombol aksi |
| 4 | **Sistem warna Material Design 3** | Token warna lengkap untuk `surface`, `container`, `primary`, `secondary`, `tertiary`, `error`, dan masing-masing variant `on-*` di kedua tema |
| 5 | **Sidebar navigasi lengkap** | Semua halaman (termasuk Pengaturan) sekarang punya nav item aktif di sidebar |

### 🏗️ Technical Changes

- **`App.css`**: Penambahan 4 token warna baru (`--on-primary`, `--on-secondary`, `--on-tertiary`, `--on-error`) di tiga lokasi: `@theme`, `:root` (light), `.dark` (dark mode)
- **`Pengaturan.tsx`**: Rewrite penuh — hapus wrapper duplikat, ganti utility class kustom dengan standar Tailwind, tambahkan handler fungsi untuk semua tombol
- **`TambahJadwal.tsx`**: Fix `useEffect` dependencies dan state management untuk status upload
- **`KalenderUpload.tsx`**: Fix perhitungan offset hari pertama bulan
- **`Statistik.tsx`**: Tambah guard clause div-by-zero
- **`Header.tsx`**: Tambah outside-click handler + sort notifikasi by date
- **`Sidebar.tsx`**: Item count dinamis dari state, nav item Pengaturan aktif
- **`DaftarVideo.tsx`**: Item count dinamis dari state

### ✅ Verifikasi

- `tsc --noEmit`: **PASS** (0 TypeScript errors)
- `vite build`: **PASS** (build sukses tanpa warning)
- Linter: **0 errors / 0 warnings**

---

## 💻 Prasyarat Sistem

### Untuk Menjalankan Aplikasi (.exe / .msi)
- **OS**: Windows 10 atau lebih baru (64-bit)
- **RAM**: Minimal 2GB (recommended 4GB+)
- **Disk Space**: ~300MB untuk installer, ~500MB setelah instalasi
- **Tidak perlu**: Node.js, npm, atau dependencies lainnya (sudah bundled)

### Untuk Development (Cloning & Build dari Source)
- **Node.js**: v18+ (download dari https://nodejs.org/)
- **npm**: v9+ (biasanya sudah include dengan Node.js)
- **Rust**: v1.70+ (untuk Tauri compilation, download dari https://rustup.rs/)
- **Microsoft C++ Build Tools**: Wajib di Windows — install dengan workload "Desktop development with C++" (download dari https://visualstudio.microsoft.com/visual-cpp-build-tools/)
- **Git**: Untuk clone repository
- **Text Editor**: VS Code atau editor favorit Anda

---

## 📦 Instalasi

### Opsi 1: Download Pre-built Application (RECOMMENDED)

#### Windows Installer (.msi)
```
1. Download file: Skejul Upload Studio_1.1.0_x64.msi dari Releases
2. Double-click untuk menjalankan installer
3. Ikuti wizard instalasi
4. Aplikasi siap di Start Menu dan Desktop shortcut
```

#### Portable Executable (.exe)
```
1. Download file: Skejul Upload Studio_1.1.0_x64.exe dari Releases
2. Letakkan di folder manapun
3. Double-click untuk menjalankan
4. Tidak perlu instalasi (portable)
```

### Opsi 2: Clone & Build dari Source Code

#### Step 1: Clone Repository
```bash
git clone https://github.com/Pendragon-Ancestor/Skejul-Upload-Studio.git
cd "Skejul Upload Studio"
```

#### Step 2: Install Dependencies
```bash
npm install
```

#### Step 3A: Jalankan Development Server (Web)
```bash
npm run dev
```
Aplikasi akan buka di browser pada `http://localhost:1420`

#### Step 3B: Jalankan Desktop App (Tauri Dev)
```bash
npm run tauri dev
```
Aplikasi akan terbuka sebagai jendela desktop dengan hot-reload

#### Step 3C: Build untuk Production
```bash
# Build aplikasi desktop Tauri (.exe + .msi)
npm run tauri build
```
Perintah ini otomatis menjalankan `npm run build` (frontend) lalu compile Rust backend dan package installer.

File executable akan tersimpan di:
- **Portable .exe** → `src-tauri/target/release/Skejul Upload Studio.exe`
- **Installer .msi** → `src-tauri/target/release/bundle/msi/Skejul Upload Studio_1.1.0_x64_en-US.msi`
- **Installer .exe (NSIS)** → `src-tauri/target/release/bundle/nsis/Skejul Upload Studio_1.1.0_x64-setup.exe`

> ⚠️ **Catatan**: Build Tauri membutuhkan **Rust** dan **Microsoft C++ Build Tools** terinstal. Pastikan `rustc` dan `cargo` tersedia di PATH sebelum menjalankan `npm run tauri build`.

---

## 🚀 Cara Penggunaan

### 1. Membuka Aplikasi
- **Jika install via .msi**: Cari "Skejul Upload Studio" di Start Menu atau klik shortcut Desktop
- **Jika portable .exe**: Double-click file `.exe`

### 2. Antarmuka Utama

#### Header (Bagian Atas)
- 🎬 Logo Aplikasi
- 🔔 Tombol Notifikasi - Lihat jadwal upload mendatang (diurutkan dari terdekat, klik luar untuk tutup)
- 🌙 Tombol Toggle Tema - Switch Dark/Light Mode (tersimpan otomatis)

#### Sidebar Kiri (Navigasi)
- 📊 **Daftar Video** - Lihat semua video terjadwal (dengan jumlah item dinamis)
- ➕ **Tambah Jadwal Baru** - Tambah video baru
- 📅 **Kalender Upload** - Lihat jadwal dalam format kalender
- 📈 **Statistik** - Dashboard statistik dan import/export data
- ⚙️ **Pengaturan** - Konfigurasi aplikasi (backup, restore, import, export, clear cache, verifikasi)

#### Main Panel (Area Konten)
- Menampilkan halaman sesuai menu yang dipilih
- Responsive dan menyesuaikan ukuran layar

### 3. Menambah Jadwal Baru

#### Step-by-Step:

**A. Pilih Kategori**
```
1. Klik menu "Tambah Jadwal Baru" di sidebar
2. Pilih kategori: "Light Novel" atau "Novel China"
3. Klik tombol kategori yang dipilih
```

**B. Isi Form**
```
1. Judul Novel: Ketik nama lengkap novel/chapter
2. Tanggal Upload: Akan auto-filled berdasarkan upload terakhir
3. Jam Upload: 
   - Light Novel: Terkunci 00:00 (tidak bisa diubah)
   - Novel China: Pilih 06:00 / 12:00 / 18:00 (sesuai rotasi)
4. Status Upload: Pilih "Belum Upload" atau "Sudah Upload"
```

**C. Auto-Fill Logic**
```
LIGHT NOVEL:
- Jika upload terakhir: 1 Januari 2026, 00:00
- Auto-fill akan: 2 Januari 2026, 00:00 (Tanggal +1 hari, jam tetap)

NOVEL CHINA (Rotasi 06→12→18→next day 06):
- Jika upload terakhir: 1 Januari 2026, 06:00
- Auto-fill akan: 1 Januari 2026, 12:00 (jam maju ke 12:00)
- Jika upload terakhir: 1 Januari 2026, 18:00
- Auto-fill akan: 2 Januari 2026, 06:00 (tanggal +1, jam reset 06:00)
```

**D. Aksi Cepat**
- ➕ **+Slot Berikut** - Ambil slot jadwal berikutnya
- ➕ **+1 Hari** - Tambah 1 hari ke tanggal
- ⏱️ **+6 Jam** - Tambah 6 jam ke waktu
- 📋 **Salin Terakhir** - Copy jadwal upload terakhir

**E. Simpan**
```
Klik "Simpan Jadwal" → Modal success muncul → Form reset untuk input berikutnya
```

### 4. Mengelola Video (Daftar Video)

#### View & Sort
```
1. Klik menu "Daftar Video"
2. Tabel menampilkan semua video dengan kolom:
   - NO: Nomor urut
   - STATUS: Badge "Belum Upload" / "Sudah Upload"
   - KATEGORI: Light Novel / Novel China
   - NAMA VIDEO: Judul novel
   - TANGGAL & WAKTU: DD/MM/YYYY HH:MM
   - SISA WAKTU: Countdown time (kalau ada)
   - ACTION: Tombol View/Edit/Delete

3. Sort dropdown (Terbaru/Terlama):
   - Terbaru: Urutkan dari upload paling baru ke paling lama
   - Terlama: Urutkan dari upload paling lama ke paling baru
```

#### Edit Video
```
1. Klik ikon Pensil (Edit) di baris video
2. Modal form muncul dengan field:
   - Tanggal Upload (date picker)
   - Waktu Upload (time input)
   - Status (dropdown)
3. Edit sesuai kebutuhan
4. Klik "Simpan" untuk save perubahan
```

#### Hapus Video
```
1. Klik ikon Trash (Delete) di baris video
2. Modal konfirmasi muncul
3. Klik "Hapus" untuk confirm atau "Batal" untuk cancel
4. Video akan dihapus dari daftar
```

#### Bulk Actions
```
1. Centang checkbox di baris video (atau "Select All" di header)
2. Bulk action bar muncul di bawah
3. Pilih aksi:
   - "Tandai Sudah Upload": Update semua status ke "Sudah Upload"
   - "Tandai Belum Upload": Update semua status ke "Belum Upload"
4. Perubahan instant apply
```

#### Copy Tanggal
```
1. Klik ikon Copy di kolom "TANGGAL & WAKTU"
2. Icon berubah jadi checkmark hijau (feedback visual)
3. Tanggal dalam format DD/MM/YYYY sudah di-clipboard
4. Paste di aplikasi lain (Ctrl+V)
```

### 5. Notifikasi

```
1. Klik ikon Bell 🔔 di header
2. Popup menampilkan hingga 5 jadwal upload mendatang (terurut dari terdekat)
3. Format: "Novel Title - DD/MM/YYYY HH:MM"
4. Klik diluar popup untuk close
```

### 6. Tema Dark/Light Mode

```
1. Klik ikon Sun/Moon 🌙 di header kanan
2. Tema switch instantly
3. Pilihan tema tersimpan otomatis di localStorage (tidak perlu di-set ulang)
```

### 7. Kalender Upload

```
1. Klik menu "Kalender Upload"
2. Tampil kalender bulan sekarang (grid rapi dengan offset hari yang benar)
3. Gunakan tombol "< Bulan Lalu" dan "Bulan Depan >"
4. Atau klik "Bulan/Tahun" untuk date picker
5. Lihat visual jadwal video dalam format kalender
```

### 8. Statistik & Import/Export

```
IMPORT:
1. Klik menu "Statistik"
2. Klik tombol "Import Master JSON"
3. Pilih file JSON dengan data video lama
4. Data akan auto-convert dan merge dengan data existing
5. Format lama support: {"kategori": "...", "nama": "...", "tanggal": "DD BULAN TAHUN JAM HH.MM"}

EXPORT:
1. Di halaman Statistik, klik "Export Data"
2. File JSON akan di-download dengan semua data video
3. Gunakan untuk backup atau migrasi ke device lain
```

### 9. Pengaturan (Backup, Restore, & Maintenance)

```
BACKUP DATA:
1. Klik menu "Pengaturan"
2. Di section "Backup & Restore", klik "Backup Data"
3. File JSON berisi seluruh data akan tersimpan
4. Simpan di lokasi aman

RESTORE DATA:
1. Di section "Backup & Restore", klik "Restore Data"
2. Pilih file backup JSON sebelumnya
3. Data akan dimuat dan menggantikan data saat ini

IMPORT / EXPORT:
1. Di section "Import / Export", klik tombol yang relevan
2. Import: tambahkan data dari sumber eksternal
3. Export: simpan data ke file JSON

CLEAR CACHE:
1. Di section "Advanced", klik "Clear Cache"
2. Konfirmasi dialog muncul
3. Cache dibersihkan (data video tetap aman)

VERIFIKASI DATA:
1. Di section "Advanced", klik "Verifikasi Data"
2. Sistem memeriksa integritas data tersimpan
3. Hasil verifikasi ditampilkan
```

---

## 📁 Struktur Proyek

```
Skejul Upload Studio/
├── src/                                # Source code React
│   ├── assets/                         # Aset statis (SVG, dll)
│   ├── components/
│   │   ├── Layout/
│   │   │   ├── Header.tsx              # Header dengan theme toggle, notifikasi (sorted + outside-click)
│   │   │   └── Sidebar.tsx             # Navigation sidebar (dynamic item count)
│   │   ├── Modal/
│   │   │   └── Modal.tsx               # Custom modal component (success/confirmation/danger)
│   │   ├── EmptyState/
│   │   │   └── EmptyState.tsx          # Empty state component
│   │   └── pages/
│   │       ├── DaftarVideo/
│   │       │   └── DaftarVideo.tsx     # Video list page dengan CRUD & bulk actions
│   │       ├── TambahJadwal/
│   │       │   └── TambahJadwal.tsx    # Add schedule form (fix useEffect deps)
│   │       ├── KalenderUpload/
│   │       │   └── KalenderUpload.tsx  # Calendar view (fix offset hari)
│   │       ├── Statistik/
│   │       │   └── Statistik.tsx       # Stats & import/export (fix div-by-zero)
│   │       └── Pengaturan/
│   │           └── Pengaturan.tsx      # Settings page (fully functional, layout rapi)
│   ├── context/
│   │   ├── AppContext.tsx              # Global state management (CRUD + import/export)
│   │   └── ThemeContext.tsx            # Theme state (localStorage persistence)
│   ├── types/
│   │   └── index.ts                    # TypeScript type definitions
│   ├── App.tsx                         # Main app component (routing + layout)
│   ├── App.css                         # Global styles & Material Design 3 theme tokens
│   ├── main.tsx                        # Entry point
│   └── vite-env.d.ts                   # Vite environment types
│
├── src-tauri/                          # Tauri desktop framework
│   ├── tauri.conf.json                 # Tauri configuration (window, bundle, icon)
│   ├── Cargo.toml                      # Rust dependencies
│   ├── Cargo.lock                      # Rust dependency lock
│   ├── build.rs                        # Rust build script
│   ├── src/
│   │   ├── main.rs                     # Rust main entry
│   │   └── lib.rs                      # Rust library
│   ├── capabilities/                   # Tauri permission capabilities
│   ├── icons/                          # App icons (.png, .ico, .icns)
│   └── target/                         # Build output (auto-generated)
│
├── public/                             # Static assets
├── dist/                               # Production build (auto-generated)
├── package.json                        # Project dependencies
├── package-lock.json                   # Dependency lock file
├── tsconfig.json                       # TypeScript config
├── tsconfig.node.json                  # TypeScript config (node context)
├── vite.config.ts                      # Vite bundler config (Tauri-ready)
├── tailwind.config.js                  # Tailwind CSS config
├── README.md                           # This file
└── .gitignore                          # Git ignore rules
```

### File Penting:

**Context API (State Management)**
- `src/context/AppContext.tsx` - Global state untuk video data
  - `videos[]` - Array semua video
  - `addVideo()` - Tambah video baru
  - `deleteVideo()` - Hapus video
  - `updateVideo()` - Update single video
  - `updateMultipleVideos()` - Update multiple video (bulk)
  - `importData()` - Import JSON file dengan legacy format support
  - `calculateNextSchedule()` - Auto-generate next schedule
  - localStorage persistence

- `src/context/ThemeContext.tsx` - Global state untuk tema
  - `theme` - Current theme (light/dark)
  - `toggleTheme()` - Switch theme
  - localStorage persistence (tersimpan & dimuat otomatis)

**Components**
- `Header.tsx` - Header dengan logo, notifikasi (sorted by date + outside-click), theme toggle
- `Modal.tsx` - Reusable modal dengan 3 types (success/confirmation/danger)
- `EmptyState.tsx` - Tampilan ketika data kosong

**Pages**
- `DaftarVideo.tsx` - Main list page dengan tabel, sorting, bulk actions, edit/delete modals (dynamic item count)
- `TambahJadwal.tsx` - Form page dengan category tabs, auto-fill logic, quick actions (fix state management)
- `KalenderUpload.tsx` - Calendar view dengan month/year navigation (fix grid offset)
- `Statistik.tsx` - Analytics & import/export buttons (fix div-by-zero, guard clause)
- `Pengaturan.tsx` - Settings page — backup, restore, import, export, clear cache, verifikasi (fully functional)

**Styling**
- `src/App.css` - Material Design 3 token system dengan light/dark mode
  - `@theme` block: Mendaftarkan semua token warna ke Tailwind v4
  - `:root`: Variabel warna light mode
  - `.dark`: Variabel warna dark mode
  - Token: `surface`, `container`, `primary`, `secondary`, `tertiary`, `error` + variant `on-*`

---

## 🛠️ Teknologi yang Digunakan

### Frontend
- **React 19** - UI library (functional components + hooks)
- **TypeScript 6** - Type-safe JavaScript (strict mode)
- **Tailwind CSS v4** - Utility-first CSS framework (dengan `@theme` token system)
- **Vite 8** - Fast build tool & dev server
- **React Router v7** - Client-side routing

### Desktop Framework
- **Tauri v2** - Build lightweight desktop apps dengan web technologies
- **Rust** - Backend runtime untuk Tauri

### State Management & Storage
- **React Context API** - Global state management (AppContext + ThemeContext)
- **localStorage** - Client-side data persistence
- **JSON** - Data format untuk import/export/backup

### Development Tools
- **npm** - Package manager
- **Git** - Version control
- **GitHub** - Repository hosting

### Build & Deployment
- **TypeScript Compiler** - Type checking (`tsc --noEmit`)
- **Vite Build** - Optimized production bundling
- **Tauri Bundler** - Create `.exe`, `.msi`, dan NSIS installer

---

## 💻 Development

### Setup Development Environment

```bash
# 1. Clone repository
git clone https://github.com/Pendragon-Ancestor/Skejul-Upload-Studio.git
cd "Skejul Upload Studio"

# 2. Install dependencies
npm install

# 3. Jalankan development server (web mode)
npm run dev
# → Buka http://localhost:1420

# 4. Atau jalankan desktop mode (Tauri dev)
npm run tauri dev
# → Jendela desktop terbuka dengan hot-reload
```

### Development Commands

```bash
# Development server dengan hot reload (web)
npm run dev

# Development desktop dengan hot reload (Tauri)
npm run tauri dev

# Type checking dengan TypeScript
npx tsc --noEmit

# Build frontend (web bundle → dist/)
npm run build

# Build aplikasi desktop Tauri (.exe + .msi)
npm run tauri build

# Preview production build (web)
npm run preview
```

### File Editing Tips

- **Styling**: Edit `.tsx` file → Tailwind classes akan auto-apply. Edit `src/App.css` untuk token warna tema
- **State Changes**: Modifikasi `src/context/AppContext.tsx` → Auto-sync ke semua components
- **UI Changes**: React hot reload → Changes visible instantly tanpa refresh
- **Theme**: Edit `src/App.css` → CSS variables di `:root` (light) dan `.dark` (dark mode)
- **Types**: Edit `src/types/index.ts` untuk TypeScript interfaces

### Common Development Tasks

**Menambah Fitur Baru**
1. Buat component baru di `src/components/`
2. Import di halaman yang relevan
3. Add state ke AppContext jika perlu
4. Test di browser development mode
5. Build & test production version

**Memperbaiki Bug**
1. Identify issue di development mode
2. Add console.log untuk debugging
3. Modify component/context
4. Test fix
5. Commit dengan pesan yang descriptive

**Styling & UI Changes**
1. Edit Tailwind classes di `.tsx` file
2. Check `src/App.css` untuk global styles & theme variables
3. Dark mode: Styles otomatis apply berdasarkan class `.dark`
4. Test di both light & dark theme
5. Pastikan gunakan utility Tailwind standar (bukan class custom yang tidak terdaftar)

---

## 🚀 Build untuk Production

### Build Web Bundle
```bash
npm run build
```
Output: `dist/` folder dengan optimized HTML/CSS/JS

### Build Aplikasi Desktop

#### Prasyarat Build
Pastikan sudah terinstal:
1. **Rust** — `rustup` dari https://rustup.rs/
2. **Microsoft C++ Build Tools** — dengan workload "Desktop development with C++"
3. Verifikasi: jalankan `rustc --version` dan `cargo --version` di terminal

#### Build .exe + .msi + NSIS installer
```bash
npm run tauri build
```

Perintah ini akan:
1. Build frontend (`npm run build`) → `dist/`
2. Compile Rust backend → executable
3. Package menjadi installer (`.msi` + `.exe` NSIS)

Output locations:
- **Portable .exe**: `src-tauri/target/release/Skejul Upload Studio.exe`
- **Installer .msi**: `src-tauri/target/release/bundle/msi/Skejul Upload Studio_1.1.0_x64_en-US.msi`
- **Installer .exe (NSIS)**: `src-tauri/target/release/bundle/nsis/Skejul Upload Studio_1.1.0_x64-setup.exe`

#### Build Hanya Target Tertentu
Edit `src-tauri/tauri.conf.json`:
```json
"bundle": {
  "active": true,
  "targets": ["msi"]
}
```
Atau jalankan dengan flag:
```bash
npm run tauri build -- --bundles msi
npm run tauri build -- --bundles nsis
```

### Distribusi

**Opsi 1: Bagikan File Executable**
- Copy `.exe` ke folder manapun
- Share via USB, Email, OneDrive
- User tinggal double-click untuk jalankan
- Tidak perlu instalasi

**Opsi 2: Bagikan Installer**
- Distribute `.msi` atau NSIS `.exe` installer
- User double-click untuk install
- Terintegrasi dengan Windows (Start Menu, Uninstall)
- Professional presentation

**Opsi 3: GitHub Release**
- Upload ke GitHub Releases
- User download dari release page
- Automatic update checking (future feature)

---

## 📝 Coding Standards & Best Practices

### TypeScript
- Use strict mode (`"strict": true`)
- Define interfaces untuk semua data structures
- Avoid `any` type

### React
- Functional components dengan hooks
- Use Context untuk state management
- Prop drilling minimal
- Memoization untuk performance optimization
- Selalu perhatikan `useEffect` dependencies untuk hindari state reset tidak diinginkan

### File Organization
- One component per file
- Clear naming conventions
- Grouped by feature/domain

### Styling
- Tailwind CSS classes untuk consistency
- Gunakan utility standar Tailwind (hindari class custom yang tidak terdaftar di `@theme`)
- Dark mode support dengan CSS variables
- Responsive design mobile-first
- Test di both light & dark theme

### Version Control
- Commit messages yang descriptive
- One feature per branch
- Pull request dengan good documentation

---

## 🤝 Berkontribusi

Kami menerima kontribusi! Berikut cara berkontribusi:

### Langkah-Langkah:

1. **Fork repository**
```
Klik tombol "Fork" di GitHub
```

2. **Clone fork Anda**
```bash
git clone https://github.com/YOUR-USERNAME/Skejul-Upload-Studio.git
cd "Skejul Upload Studio"
```

3. **Buat feature branch**
```bash
git checkout -b feature/nama-fitur-anda
```

4. **Buat perubahan & commit**
```bash
git add .
git commit -m "Add: deskripsi fitur yang jelas"
```

5. **Push ke fork**
```bash
git push origin feature/nama-fitur-anda
```

6. **Buat Pull Request**
- Buka GitHub website
- Click "New Pull Request"
- Pilih fork Anda dan branch baru
- Describe perubahan dengan detail
- Submit!

### Kontribusi Ideas

- 🐛 Fix bugs
- ✨ Tambah fitur baru
- 📚 Improve documentation
- 🎨 UI/UX improvements
- 🚀 Performance optimization
- 🧪 Add tests

---

## 📄 Lisensi

Proyek ini dilisensikan di bawah **MIT License** - Lihat file `LICENSE` untuk detail.

MIT License memungkinkan:
- ✅ Penggunaan komersial
- ✅ Modifikasi
- ✅ Distribusi
- ✅ Penggunaan pribadi

Dengan syarat:
- ⚠️ Include license notice
- ⚠️ Disclose source code changes

---

## 💬 Hubungi Kami

### Issue & Bug Reports
- 🐛 GitHub Issues: https://github.com/Pendragon-Ancestor/Skejul-Upload-Studio/issues

### Feature Requests
- 💡 Create issue dengan tag "enhancement"
- Describe use case dengan detail

---

## 📊 Project Statistics

- **Language**: TypeScript, React, Rust
- **Lines of Code**: ~2500+ (Frontend React)
- **Components**: 15+ React components
- **Features**: 25+ features implemented (all functional)
- **Version**: 1.1.0
- **Last Updated**: October 2026

---

## 🗺️ Roadmap

### Versi 1.2 (Coming Soon)
- [ ] Fitur reminder/notification push (desktop notification)
- [ ] Export ke Calendar format (.ics)
- [ ] Custom category support
- [ ] Search & filter di Daftar Video
- [ ] Drag-and-drop reorder video

### Versi 1.5 (Future)
- [ ] Cloud synchronization
- [ ] Multi-device sync
- [ ] Collaborative features
- [ ] Auto-upload integration

### Versi 2.0 (Long Term)
- [ ] Web version
- [ ] Mobile app (iOS/Android)
- [ ] API backend integration
- [ ] YouTube/Platform API integration
- [ ] Advanced analytics dashboard
- [ ] AI-powered scheduling suggestions

---

## 🙏 Acknowledgments

**Technologies & Tools:**
- React team untuk excellent UI library
- Tauri team untuk desktop framework yang elegant
- Tailwind CSS untuk utility-first CSS
- GitHub untuk hosting & collaboration

**Community:**
- Thanks untuk semua yang sudah test dan memberikan feedback
- Special thanks kepada early adopters

---

## ⭐ Support Project

Jika project ini bermanfaat, jangan lupa:
- ⭐ **Star** repository
- 🔗 **Share** dengan teman
- 💬 **Feedback** di issues
- 🤝 **Contribute** untuk improvement

---

## 📞 Quick Links

| Link | Purpose |
|------|---------|
| [GitHub Repository](https://github.com/Pendragon-Ancestor/Skejul-Upload-Studio) | Source code & issues |
| [Releases](https://github.com/Pendragon-Ancestor/Skejul-Upload-Studio/releases) | Download aplikasi |
| [Issues](https://github.com/Pendragon-Ancestor/Skejul-Upload-Studio/issues) | Report bugs & request features |
| [MIT License](https://opensource.org/licenses/MIT) | License details |

---

**Made with ❤️ by Pendragon-Ancestor**

Selamat menggunakan Skejul Upload Studio! Happy scheduling! 🎬📅✨
