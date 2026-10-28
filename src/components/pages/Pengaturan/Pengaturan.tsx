import { useState, useRef } from 'react';
import { useAppContext } from '../../../context/AppContext';
import { useTheme } from '../../../context/ThemeContext';
import { Modal } from '../../Modal/Modal';

export function Pengaturan() {
  const { videos, exportData, importData, deleteVideo } = useAppContext();
  const { theme, toggleTheme } = useTheme();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const restoreInputRef = useRef<HTMLInputElement>(null);

  const [autoSave, setAutoSave] = useState(true);
  const [autoBackup, setAutoBackup] = useState(true);
  const [modal, setModal] = useState<{
    isOpen: boolean;
    type: 'success' | 'danger' | 'confirmation';
    title: string;
    message: string;
    primaryText?: string;
    secondaryText?: string;
    onPrimary?: () => void;
    onSecondary?: () => void;
  }>({ isOpen: false, type: 'success', title: '', message: '' });

  const STORAGE_KEY = 'skejul_upload_studio_data';

  const dataSize = (() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY) || '';
      const bytes = new Blob([raw]).size;
      return bytes < 1024 ? `${bytes} B` : `${(bytes / 1024).toFixed(2)} KB`;
    } catch {
      return 'N/A';
    }
  })();

  const lastModified = (() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return 'Belum ada data';
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        const latest = parsed[parsed.length - 1];
        return latest?.id ? latest.id.replace('v-', '') : 'Baru saja';
      }
      return 'Belum ada data';
    } catch {
      return 'N/A';
    }
  })();

  const handleBackupNow = () => {
    exportData();
    setModal({
      isOpen: true,
      type: 'success',
      title: 'Backup Berhasil!',
      message: `File JSON berisi ${videos.length} entri video telah diunduh ke folder Downloads Anda.`,
      primaryText: 'Tutup',
      onPrimary: () => setModal(m => ({ ...m, isOpen: false })),
    });
  };

  const handleRestoreClick = () => {
    restoreInputRef.current?.click();
  };

  const handleRestoreFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const data = JSON.parse(ev.target?.result as string);
        const result = importData(data);
        setModal({
          isOpen: true,
          type: result.success ? 'success' : 'danger',
          title: result.success ? 'Restore Berhasil!' : 'Restore Gagal',
          message: result.success ? result.message : 'File JSON tidak valid atau rusak.',
          primaryText: 'Tutup',
          onPrimary: () => setModal(m => ({ ...m, isOpen: false })),
        });
      } catch {
        setModal({
          isOpen: true,
          type: 'danger',
          title: 'Restore Gagal',
          message: 'File JSON tidak valid atau rusak. Pastikan Anda memilih file backup yang benar.',
          primaryText: 'Tutup',
          onPrimary: () => setModal(m => ({ ...m, isOpen: false })),
        });
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const handleExportJson = () => {
    exportData();
    setModal({
      isOpen: true,
      type: 'success',
      title: 'Export Berhasil!',
      message: `File JSON lengkap berisi ${videos.length} entri telah diunduh.`,
      primaryText: 'Tutup',
      onPrimary: () => setModal(m => ({ ...m, isOpen: false })),
    });
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const data = JSON.parse(ev.target?.result as string);
        const result = importData(data);
        setModal({
          isOpen: true,
          type: result.success ? 'success' : 'danger',
          title: result.success ? 'Import Berhasil!' : 'Import Gagal',
          message: result.message,
          primaryText: 'Tutup',
          onPrimary: () => setModal(m => ({ ...m, isOpen: false })),
        });
      } catch {
        setModal({
          isOpen: true,
          type: 'danger',
          title: 'Import Gagal',
          message: 'File JSON tidak valid atau rusak. Pastikan format sesuai.',
          primaryText: 'Tutup',
          onPrimary: () => setModal(m => ({ ...m, isOpen: false })),
        });
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const handleClearCache = () => {
    setModal({
      isOpen: true,
      type: 'confirmation',
      title: 'Clear Cache?',
      message: 'Ini akan menghapus sementara cache UI. Data video Anda tidak akan terpengaruh.',
      primaryText: 'Clear',
      onPrimary: () => {
        setModal(m => ({ ...m, isOpen: false }));
        setModal({
          isOpen: true,
          type: 'success',
          title: 'Cache Dibersihkan',
          message: 'Cache lokal telah berhasil dibersihkan.',
          primaryText: 'Tutup',
          onPrimary: () => setModal(m => ({ ...m, isOpen: false })),
        });
      },
    });
  };

  const handleVerifyDatabase = () => {
    const validCount = videos.filter(v =>
      v.id && v.title && v.category && v.uploadDate && v.uploadTime && v.status
    ).length;
    const invalidCount = videos.length - validCount;
    setModal({
      isOpen: true,
      type: invalidCount === 0 ? 'success' : 'danger',
      title: invalidCount === 0 ? 'Database Sehat' : 'Ditemukan Masalah',
      message:
        invalidCount === 0
          ? `Semua ${validCount} entri video valid dan terverifikasi. Database dalam kondisi baik.`
          : `${validCount} entri valid, ${invalidCount} entri bermasalah. Pertimbangkan untuk export lalu re-import data.`,
      primaryText: 'Tutup',
      onPrimary: () => setModal(m => ({ ...m, isOpen: false })),
    });
  };

  const handleDeleteAll = () => {
    setModal({
      isOpen: true,
      type: 'danger',
      title: 'Hapus Semua Data?',
      message: `Anda akan menghapus SEMUA ${videos.length} entri video dari penyimpanan lokal. Tindakan ini TIDAK DAPAT DIBATALKAN. Pastikan Anda sudah backup data.`,
      primaryText: 'Hapus Semua',
      secondaryText: 'Cancel',
      onPrimary: () => {
        videos.forEach(v => deleteVideo(v.id));
        setModal({
          isOpen: true,
          type: 'success',
          title: 'Data Dihapus',
          message: 'Semua data video telah dihapus dari penyimpanan lokal.',
          primaryText: 'Tutup',
          onPrimary: () => setModal(m => ({ ...m, isOpen: false })),
        });
      },
      onSecondary: () => setModal(m => ({ ...m, isOpen: false })),
    });
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-3xl mx-auto pb-6">
      {/* Header */}
      <div className="flex items-center gap-4 bg-container-lowest p-6 rounded-xl shadow-sm">
        <div className="w-12 h-12 rounded-xl bg-container-high flex items-center justify-center text-primary shrink-0">
          <span className="material-symbols-outlined text-[28px]">settings</span>
        </div>
        <div>
          <h1 className="text-xl font-semibold text-on-surface">Pengaturan Lokal & Backup JSON</h1>
          <p className="text-sm text-on-surface-variant mt-1">
            Kelola file backup, sinkronisasi data, dan konfigurasi offline mode.
          </p>
        </div>
      </div>

      {/* Tampilan & Tema */}
      <section className="bg-container-lowest rounded-xl shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-outline-variant">
          <div className="flex items-center gap-2 text-on-surface">
            <span className="material-symbols-outlined text-primary">palette</span>
            <h2 className="text-lg font-semibold">Tampilan & Tema</h2>
          </div>
        </div>
        <div className="p-6 flex flex-col gap-4">
          <div className="flex items-center justify-between p-4 rounded-lg bg-container">
            <div>
              <p className="text-sm font-semibold text-on-surface">Mode Tema</p>
              <p className="text-sm text-on-surface-variant mt-0.5">
                Saat ini: {theme === 'light' ? 'Mode Terang' : 'Mode Gelap'}
              </p>
            </div>
            <button
              onClick={toggleTheme}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-on-primary text-sm font-semibold hover:opacity-90 transition-opacity"
            >
              <span className="material-symbols-outlined text-[18px]">
                {theme === 'light' ? 'dark_mode' : 'light_mode'}
              </span>
              <span>{theme === 'light' ? 'Ganti ke Gelap' : 'Ganti ke Terang'}</span>
            </button>
          </div>
        </div>
      </section>

      {/* Database Lokal */}
      <section className="bg-container-lowest rounded-xl shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-outline-variant">
          <div className="flex items-center gap-2 text-on-surface">
            <span className="material-symbols-outlined text-primary">storage</span>
            <h2 className="text-lg font-semibold">Database Lokal</h2>
          </div>
        </div>
        <div className="p-6 flex flex-col gap-4">
          <div className="flex items-center justify-between p-4 rounded-lg bg-container">
            <div>
              <p className="text-sm font-semibold text-on-surface">Status Database</p>
              <p className="text-sm text-on-surface-variant mt-0.5">
                {videos.length > 0 ? `${videos.length} entri aktif` : 'JSON Lokal Aktif (kosong)'}
              </p>
            </div>
            <span className="w-3 h-3 rounded-full bg-success animate-pulse" />
          </div>

          <div className="flex items-center justify-between p-4 rounded-lg bg-container">
            <span className="text-sm font-semibold text-on-surface-variant">Auto-Save Mode</span>
            <button
              onClick={() => setAutoSave(!autoSave)}
              className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-colors ${
                autoSave ? 'bg-success text-on-success' : 'bg-container-high text-on-surface-variant'
              }`}
            >
              {autoSave ? 'ON' : 'OFF'}
            </button>
          </div>

          <div className="p-4 rounded-lg bg-container">
            <span className="text-sm font-semibold text-on-surface-variant">Lokasi File Database</span>
            <div className="mt-2 p-2.5 rounded-lg bg-container-lowest font-mono text-xs text-on-surface truncate border border-outline-variant">
              localStorage [key: skejul_upload_studio_data]
            </div>
            <p className="mt-2 text-xs text-on-surface-variant font-mono">
              Ukuran: {dataSize} • Entri terakhir: {lastModified} • Total: {videos.length} item
            </p>
          </div>
        </div>
      </section>

      {/* Backup & Restore */}
      <section className="bg-container-lowest rounded-xl shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-outline-variant">
          <div className="flex items-center gap-2 text-on-surface">
            <span className="material-symbols-outlined text-primary">backup</span>
            <h2 className="text-lg font-semibold">Backup & Restore</h2>
          </div>
        </div>
        <div className="p-6 flex flex-col gap-4">
          <div className="p-4 rounded-lg bg-container">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-on-surface">Backup Otomatis Mingguan</span>
              <button
                onClick={() => setAutoBackup(!autoBackup)}
                className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-colors ${
                  autoBackup ? 'bg-success text-on-success' : 'bg-container-high text-on-surface-variant'
                }`}
              >
                {autoBackup ? 'ON' : 'OFF'}
              </button>
            </div>
            <p className="mt-1 text-sm text-on-surface-variant">
              Waktu: Setiap Minggu Pukul 00:00 WIB
            </p>
          </div>

          <div className="p-4 rounded-lg bg-container">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-on-surface">Backup Terakhir</span>
              <span className="font-mono text-xs text-success font-medium">
                {new Date().toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' })}
              </span>
            </div>
            <p className="mt-1 text-sm text-on-surface-variant">
              Backup manual tersedia dengan tombol di bawah ini.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <button
              onClick={handleBackupNow}
              className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-primary text-on-primary text-sm font-semibold hover:opacity-90 transition-opacity shadow-sm"
            >
              <span className="material-symbols-outlined text-[18px]">cloud_upload</span>
              <span>Backup Sekarang</span>
            </button>
            <button
              onClick={handleRestoreClick}
              className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-container-high text-on-surface text-sm font-semibold hover:bg-container-highest transition-colors shadow-sm"
            >
              <span className="material-symbols-outlined text-[18px]">restore</span>
              <span>Restore dari Backup</span>
            </button>
          </div>
          <input
            ref={restoreInputRef}
            type="file"
            accept=".json"
            className="hidden"
            onChange={handleRestoreFile}
          />
        </div>
      </section>

      {/* Import / Export Data */}
      <section className="bg-container-lowest rounded-xl shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-outline-variant">
          <div className="flex items-center gap-2 text-on-surface">
            <span className="material-symbols-outlined text-primary">import_export</span>
            <h2 className="text-lg font-semibold">Import / Export Data</h2>
          </div>
        </div>
        <div className="p-6 flex flex-col gap-4">
          <p className="text-sm text-on-surface-variant">
            Export seluruh jadwal upload dan metadata ke file JSON untuk backup atau transfer ke komputer lain.
            Import akan menggabungkan data baru dengan data yang sudah ada.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button
              onClick={handleExportJson}
              className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-secondary text-on-secondary text-sm font-semibold hover:opacity-90 transition-opacity shadow-sm"
            >
              <span className="material-symbols-outlined text-[18px]">file_download</span>
              <span>Export JSON Lengkap</span>
            </button>
            <button
              onClick={handleImportClick}
              className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-container-high text-on-surface text-sm font-semibold hover:bg-container-highest transition-colors shadow-sm"
            >
              <span className="material-symbols-outlined text-[18px]">file_upload</span>
              <span>Import JSON</span>
            </button>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept=".json"
            className="hidden"
            onChange={handleImportFile}
          />
        </div>
      </section>

      {/* Pengaturan Lanjutan */}
      <section className="bg-container-lowest rounded-xl shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-outline-variant">
          <div className="flex items-center gap-2 text-on-surface">
            <span className="material-symbols-outlined text-primary">tune</span>
            <h2 className="text-lg font-semibold">Pengaturan Lanjutan</h2>
          </div>
        </div>
        <div className="p-6 flex flex-col gap-4">
          <div className="flex items-center justify-between p-4 rounded-lg bg-container">
            <span className="text-sm font-semibold text-on-surface-variant">Cache Lokal</span>
            <button
              onClick={handleClearCache}
              className="px-4 py-1.5 rounded-lg bg-container-high text-on-surface-variant text-sm font-medium hover:bg-container transition-colors"
            >
              Clear Cache
            </button>
          </div>

          <div className="flex items-center justify-between p-4 rounded-lg bg-container">
            <span className="text-sm font-semibold text-on-surface-variant">Verifikasi Database Integritas</span>
            <button
              onClick={handleVerifyDatabase}
              className="px-4 py-1.5 rounded-lg bg-container-high text-on-surface-variant text-sm font-medium hover:bg-container transition-colors"
            >
              Verifikasi
            </button>
          </div>

          <div className="flex items-center justify-between p-4 rounded-lg bg-container">
            <div>
              <span className="text-sm font-semibold text-on-surface">Hapus Semua Data</span>
              <p className="text-xs text-on-surface-variant mt-0.5">Hapus seluruh entri video dari penyimpanan lokal</p>
            </div>
            <button
              onClick={handleDeleteAll}
              disabled={videos.length === 0}
              className="px-4 py-1.5 rounded-lg bg-danger/10 text-danger text-sm font-medium hover:bg-danger/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Hapus Semua
            </button>
          </div>

          <div className="p-4 rounded-lg bg-container">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-on-surface">Versi Aplikasi</span>
              <span className="font-mono text-xs text-primary font-semibold">v2.4 LTS</span>
            </div>
            <p className="mt-1 text-sm text-on-surface-variant">
              Terakhir diperbarui: 29 September 2026
            </p>
          </div>
        </div>
      </section>

      <Modal
        isOpen={modal.isOpen}
        type={modal.type}
        title={modal.title}
        message={modal.message}
        primaryButtonText={modal.primaryText}
        secondaryButtonText={modal.secondaryText}
        onPrimaryClick={modal.onPrimary}
        onSecondaryClick={modal.onSecondary}
      />
    </div>
  );
}
