# 🎬 Skejul Upload Studio v1.0.0

**Aplikasi Desktop untuk Manajemen dan Penjadwalan Upload Video**

Skejul Upload Studio adalah aplikasi desktop modern yang membantu content creator mengelola jadwal upload video dengan efisien. Dilengkapi dengan fitur penjadwalan otomatis, manajemen data lengkap, dan antarmuka yang user-friendly.

---

## 📋 Daftar Isi

- [Fitur Utama](#-fitur-utama)
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

### 🎯 **Manajemen Data Lengkap (CRUD)**
- ✅ **Create** - Tambah jadwal video baru dengan auto-fill
- ✅ **Read** - Lihat semua upload dalam tabel terorganisir
- ✅ **Update** - Edit tanggal, waktu, dan status video
- ✅ **Delete** - Hapus video dengan konfirmasi modal

### 🎨 **UI/UX Modern & Responsif**
- 🌙 Toggle tema Dark/Light Mode dengan penyimpanan otomatis
- 📱 Layout responsive yang optimal di berbagai ukuran layar
- ✨ Modal elegan dengan animasi smooth
- 🎯 Desain profesional dengan kontrol intuitif
- 🌈 Warna-warna yang eye-pleasing dan konsisten

### 📊 **Fitur Manajemen Data Canggih**
- 📋 **Bulk Actions** - Pilih multiple video dan update status sekaligus
- 🔤 **Smart Sorting** - Urutkan "Terbaru" atau "Terlama" dengan presisi jam/menit
- 📋 **Checkbox Selection** - Select all / Select individual dengan ease
- 📋 **Edit Modal** - Form edit inline untuk update cepat
- 💾 **Copy to Clipboard** - Copy tanggal (DD/MM/YYYY) dengan sekali klik
- 🗂️ **Status Badge** - Visual indicator "Belum Upload" vs "Sudah Upload"

### 🔔 **Notifikasi & Alert System**
- 🔔 Bel notifikasi dengan daftar video akan dijadwalkan
- ⚠️ Deteksi duplikasi slot waktu dengan warning modal
- 🔄 Real-time status updates

### 💾 **Penyimpanan Data Otomatis**
- 📦 localStorage Persistence - Semua data tersimpan lokal otomatis
- 🚀 Zero data loss - Data tidak hilang saat refresh/restart
- 📥 Import Legacy JSON - Support konversi format lama (DD BULAN TAHUN JAM HH.MM)
- 📤 Export Data - Backup dan archive data dengan mudah

### 📆 **Tampilan Kalender**
- 📅 Navigasi bulan/tahun penuh untuk seluruh tahun
- 🗓️ Month/Year selector intuitif
- 📊 Gambaran visual jadwal keseluruhan

### 📱 **Empty State Handling**
- 🎯 UI bersih ketika belum ada data
- 🎯 Helpful instructions untuk user baru

---

## 💻 Prasyarat Sistem

### Untuk Menjalankan Aplikasi (.exe / .msi)
- **OS**: Windows 10 atau lebih baru (64-bit)
- **RAM**: Minimal 2GB (recommended 4GB+)
- **Disk Space**: ~300MB untuk installer, ~500MB setelah instalasi
- **Tidak perlu**: Node.js, npm, atau dependencies lainnya (sudah bundled)

### Untuk Development (Cloning & Build dari Source)
- **Node.js**: v16+ (download dari https://nodejs.org/)
- **npm**: v7+ (biasanya sudah include dengan Node.js)
- **Rust**: v1.70+ (untuk Tauri compilation, download dari https://rustup.rs/)
- **Git**: Untuk clone repository
- **Text Editor**: VS Code atau editor favorit Anda

---

## 📦 Instalasi

### Opsi 1: Download Pre-built Application (RECOMMENDED)

#### Windows Installer (.msi)
```bash
1. Download file: Skejul Upload Studio_1.0.0_x64.msi dari Releases
2. Double-click untuk menjalankan installer
3. Ikuti wizard instalasi
4. Aplikasi siap di Start Menu dan Desktop shortcut
```

#### Portable Executable (.exe)
```bash
1. Download file: Skejul Upload Studio_1.0.0_x64.exe dari Releases
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

#### Step 3A: Jalankan Development Server
```bash
npm run dev
```
Aplikasi akan buka di browser pada `http://localhost:5173`

#### Step 3B: Build untuk Production
```bash
# Build web bundle
npm run build

# Build aplikasi desktop Tauri (.exe + .msi)
tauri build
```

File executable akan tersimpan di:
- `.exe` → `src-tauri/target/release/Skejul Upload Studio.exe`
- `.msi` → `src-tauri/target/release/bundle/msi/Skejul Upload Studio_1.0.0_x64.msi`

---

## 🚀 Cara Penggunaan

### 1. Membuka Aplikasi
- **Jika install via .msi**: Cari "Skejul Upload Studio" di Start Menu atau klik shortcut Desktop
- **Jika portable .exe**: Double-click file `.exe`

### 2. Antarmuka Utama

#### Header (Bagian Atas)
- 🎬 Logo Aplikasi
- 🔔 Tombol Notifikasi - Lihat jadwal upload mendatang
- 🌙 Tombol Toggle Tema - Switch Dark/Light Mode

#### Sidebar Kiri (Navigasi)
- 📊 **Daftar Video** - Lihat semua video terjadwal
- ➕ **Tambah Jadwal Baru** - Tambah video baru
- 📅 **Kalender Upload** - Lihat jadwal dalam format kalender
- 📈 **Statistik** - Dashboard statistik dan import/export data
- ⚙️ **Pengaturan** - Konfigurasi aplikasi

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
2. Popup menampilkan hingga 5 jadwal upload mendatang
3. Format: "Novel Title - DD/MM/YYYY HH:MM"
4. Klik diluar popup untuk close
```

### 6. Tema Dark/Light Mode

```
1. Klik ikon Sun/Moon 🌙 di header kanan
2. Tema switch instantly
3. Pilihan tema tersimpan otomatis (tidak perlu di-set ulang)
```

### 7. Kalender Upload

```
1. Klik menu "Kalender Upload"
2. Tampil kalender bulan sekarang
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

---

## 📁 Struktur Proyek

```
Skejul Upload Studio/
├── src/                              # Source code React
│   ├── components/
│   │   ├── Layout/
│   │   │   ├── Header.tsx           # Header dengan theme toggle & notifications
│   │   │   └── Sidebar.tsx          # Navigation sidebar
│   │   ├── Modal/
│   │   │   └── Modal.tsx            # Custom modal component
│   │   ├── EmptyState/
│   │   │   └── EmptyState.tsx       # Empty state component
│   │   └── pages/
│   │       ├── DaftarVideo/
│   │       │   └── DaftarVideo.tsx  # Video list page dengan CRUD & bulk actions
│   │       ├── TambahJadwal/
│   │       │   └── TambahJadwal.tsx # Add schedule form page
│   │       ├── KalenderUpload/
│   │       │   └── KalenderUpload.tsx # Calendar view
│   │       ├── Statistik/
│   │       │   └── Statistik.tsx    # Stats & import/export
│   │       └── Pengaturan/
│   │           └── Pengaturan.tsx   # Settings page
│   ├── context/
│   │   ├── AppContext.tsx           # Global state management
│   │   └── ThemeContext.tsx         # Theme state management
│   ├── App.tsx                      # Main app component
│   ├── App.css                      # Global styles & theme vars
│   └── main.tsx                     # Entry point
│
├── src-tauri/                        # Tauri desktop framework
│   ├── tauri.conf.json              # Tauri configuration
│   ├── src/
│   │   └── main.rs                  # Rust main entry
│   └── target/                      # Build output (auto-generated)
│
├── public/                           # Static assets
├── dist/                            # Production build (auto-generated)
├── package.json                     # Project dependencies
├── tsconfig.json                    # TypeScript config
├── vite.config.ts                   # Vite bundler config
├── tailwind.config.js               # Tailwind CSS config
├── README.md                        # This file
└── .gitignore                       # Git ignore rules
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
  - localStorage persistence

**Components**
- `Header.tsx` - Header dengan logo, notifications, theme toggle
- `Modal.tsx` - Reusable modal dengan 3 types (success/confirmation/danger)
- `EmptyState.tsx` - Tampilan ketika data kosong

**Pages**
- `DaftarVideo.tsx` - Main list page dengan tabel, sorting, bulk actions, edit/delete modals
- `TambahJadwal.tsx` - Form page dengan category tabs, auto-fill logic, quick actions
- `KalenderUpload.tsx` - Calendar view dengan month/year navigation
- `Statistik.tsx` - Analytics & import/export buttons
- `Pengaturan.tsx` - Settings page (extensible untuk future features)

---

## 🛠️ Teknologi yang Digunakan

### Frontend
- **React 18** - UI library
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **Vite** - Fast build tool & dev server

### Desktop Framework
- **Tauri v2** - Build lightweight desktop apps with web technologies
- **Rust** - Backend runtime untuk Tauri

### State Management & Storage
- **React Context API** - Global state management
- **localStorage** - Client-side data persistence
- **JSON** - Data format untuk import/export

### Development Tools
- **npm** - Package manager
- **Git** - Version control
- **GitHub** - Repository hosting

### Build & Deployment
- **TypeScript Compiler** - Type checking
- **Vite Build** - Optimized production bundling
- **Tauri Bundler** - Create .exe dan .msi installers

---

## 💻 Development

### Setup Development Environment

```bash
# 1. Clone repository
git clone https://github.com/Pendragon-Ancestor/Skejul-Upload-Studio.git
cd "Skejul Upload Studio"

# 2. Install dependencies
npm install

# 3. Jalankan development server
npm run dev
```

Browser akan otomatis buka pada `http://localhost:5173`

### Development Commands

```bash
# Development server dengan hot reload
npm run dev

# Type checking dengan TypeScript
npm run type-check

# Build untuk production (web bundle)
npm run build

# Build aplikasi desktop Tauri (.exe + .msi)
tauri build

# Preview production build (sebelum push)
npm run preview
```

### File Editing Tips

- **Styling**: Edit `.tsx` file → Tailwind classes akan auto-apply
- **State Changes**: Modifikasi `src/context/AppContext.tsx` → Auto-sync ke semua components
- **UI Changes**: React hot reload → Changes visible instantly tanpa refresh
- **Theme**: Edit `src/App.css` → CSS variables untuk dark/light theme

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
3. Dark mode: Styles otomatis apply berdasarkan `data-theme` attribute
4. Test di both light & dark theme

---

## 🚀 Build untuk Production

### Build Web Bundle
```bash
npm run build
```
Output: `dist/` folder dengan optimized HTML/CSS/JS

### Build Aplikasi Desktop

#### Build .exe + .msi
```bash
tauri build
```

Output locations:
- **Portable .exe**: `src-tauri/target/release/Skejul Upload Studio.exe`
- **Installer .msi**: `src-tauri/target/release/bundle/msi/Skejul Upload Studio_1.0.0_x64.msi`

#### Build Hanya .msi (Installer)
Ubah `src-tauri/tauri.conf.json`:
```json
"bundle": {
  "active": true,
  "targets": ["msi"]
}
```

### Distribusi

**Opsi 1: Bagikan File Executable**
- Copy `.exe` ke folder manapun
- Share via USB, Email, OneDrive
- User tinggal double-click untuk jalankan
- Tidak perlu instalasi

**Opsi 2: Bagikan Installer**
- Distribute `.msi` file
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

### File Organization
- One component per file
- Clear naming conventions
- Grouped by feature/domain

### Styling
- Tailwind CSS classes untuk consistency
- Dark mode support dengan CSS variables
- Responsive design mobile-first

### Version Control
- Commit messages yang descriptive
- One feature per branch
- Pull request dengan good documentation

---

## 🤝 Berkontribusi

Kami menerima kontribusi! Berikut cara berkontribusi:

### Langkah-Langkah:

1. **Fork repository**
```bash
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
- **Lines of Code**: ~2000+ (Frontend React)
- **Components**: 15+ React components
- **Features**: 20+ features implemented
- **Version**: 1.0.0 (Initial Stable Release)
- **Last Updated**: September 2026

---

## 🗺️ Roadmap

### Versi 1.1 (Coming Soon)
- [ ] Fitur reminder/notification push
- [ ] Export ke Calendar format (.ics)
- [ ] Custom category support

### Versi 1.5 (Future)
- [ ] Cloud synchronization
- [ ] Multi-device sync
- [ ] Collaborative features

### Versi 2.0 (Long Term)
- [ ] Web version
- [ ] Mobile app (iOS/Android)
- [ ] API backend integration
- [ ] YouTube/Platform API integration
- [ ] Advanced analytics dashboard

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
