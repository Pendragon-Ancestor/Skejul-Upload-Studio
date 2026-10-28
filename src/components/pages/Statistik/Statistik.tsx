import { useRef } from 'react';
import { useAppContext } from '../../../context/AppContext';
import { EmptyState } from '../../EmptyState/EmptyState';
import { Modal } from '../../Modal/Modal';
import { useState } from 'react';

export function Statistik() {
  const { videos, exportData, importData } = useAppContext();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [modal, setModal] = useState<{
    isOpen: boolean;
    type: 'success' | 'danger';
    title: string;
    message: string;
  }>({ isOpen: false, type: 'success', title: '', message: '' });

  const totalCount = videos.length;
  const chinaCount = videos.filter(v => v.category === 'NOVEL_CHINA').length;
  const lnCount = videos.filter(v => v.category === 'LIGHT_NOVEL').length;
  const uploadedCount = videos.filter(v => v.status === 'UPLOADED').length;
  const pendingCount = videos.filter(v => v.status === 'PENDING').length;
  const chinaPercent = totalCount > 0 ? ((chinaCount / totalCount) * 100).toFixed(1) : '0.0';
  const lnPercent = totalCount > 0 ? ((lnCount / totalCount) * 100).toFixed(1) : '0.0';
  const uploadedPercent = totalCount > 0 ? ((uploadedCount / totalCount) * 100).toFixed(1) : '0.0';

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result as string);
        if (!Array.isArray(data)) {
          setModal({ isOpen: true, type: 'danger', title: 'Import Gagal', message: 'File JSON harus berupa array.' });
          return;
        }
        const result = importData(data);
        setModal({
          isOpen: true,
          type: result.success ? 'success' : 'danger',
          title: result.success ? 'Import Berhasil!' : 'Import Gagal',
          message: result.message,
        });
      } catch {
        setModal({ isOpen: true, type: 'danger', title: 'Import Gagal', message: 'File JSON tidak valid atau rusak.' });
      }
    };
    reader.onerror = () => {
      setModal({ isOpen: true, type: 'danger', title: 'Import Gagal', message: 'Gagal membaca file.' });
    };
    reader.readAsText(file);
    event.target.value = '';
  };

  const handleExport = () => {
    if (videos.length === 0) {
      setModal({ isOpen: true, type: 'danger', title: 'Export Gagal', message: 'Tidak ada data untuk diexport.' });
      return;
    }
    exportData();
    setModal({ isOpen: true, type: 'success', title: 'Export Berhasil!', message: `${videos.length} entri telah diexport ke file JSON.` });
  };

  if (videos.length === 0) {
    return (
      <div className="flex flex-col gap-6 h-full">
        <div>
          <h1 className="text-xl font-bold text-on-surface">Statistik & Arsip</h1>
          <p className="text-xs text-on-surface/60">Metrik performa dan manajemen data lokal JSON</p>
        </div>
        <EmptyState
          icon="analytics"
          title="Belum Ada Data Statistik"
          description="Tambahkan jadwal video atau import data untuk melihat statistik performa di sini."
        />
        <Modal
          isOpen={modal.isOpen}
          type={modal.type}
          title={modal.title}
          message={modal.message}
          primaryButtonText="Tutup"
          onPrimaryClick={() => setModal(m => ({ ...m, isOpen: false }))}
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 h-full overflow-auto">
      <div>
        <h1 className="text-xl font-bold text-on-surface">Statistik & Arsip</h1>
        <p className="text-xs text-on-surface/60">Metrik performa dan manajemen data lokal JSON</p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-container-low border border-container-high rounded-xl p-4 flex flex-col justify-between">
          <span className="text-xs text-on-surface/60 font-semibold uppercase">Total Video</span>
          <div className="text-2xl font-bold text-primary mt-2">{totalCount}</div>
          <span className="text-[10px] text-on-surface/50 mt-1">Video terdaftar dalam pipeline</span>
        </div>
        <div className="bg-container-low border border-container-high rounded-xl p-4 flex flex-col justify-between">
          <span className="text-xs text-on-surface/60 font-semibold uppercase">Sudah Upload</span>
          <div className="text-2xl font-bold text-success mt-2">{uploadedCount}</div>
          <span className="text-[10px] text-on-surface/50 mt-1">{uploadedPercent}% dari total pipeline</span>
        </div>
        <div className="bg-container-low border border-container-high rounded-xl p-4 flex flex-col justify-between">
          <span className="text-xs text-on-surface/60 font-semibold uppercase">Novel China</span>
          <div className="text-2xl font-bold text-secondary mt-2">{chinaCount}</div>
          <span className="text-[10px] text-on-surface/50 mt-1">{chinaPercent}% dari total pipeline</span>
        </div>
        <div className="bg-container-low border border-container-high rounded-xl p-4 flex flex-col justify-between">
          <span className="text-xs text-on-surface/60 font-semibold uppercase">Light Novel</span>
          <div className="text-2xl font-bold text-tertiary mt-2">{lnCount}</div>
          <span className="text-[10px] text-on-surface/50 mt-1">{lnPercent}% dari total pipeline</span>
        </div>
      </div>

      {/* Distribution Progress Bar */}
      <div className="bg-container-low border border-container-high rounded-xl p-4 flex flex-col gap-3">
        <h2 className="font-bold text-sm text-on-surface">Distribusi Kategori</h2>
        <div className="w-full bg-container-high rounded-full h-3 flex overflow-hidden">
          <div
            className="bg-primary h-full transition-all duration-500"
            style={{ width: `${(chinaCount / totalCount) * 100}%` }}
          />
          <div
            className="bg-success h-full transition-all duration-500"
            style={{ width: `${(lnCount / totalCount) * 100}%` }}
          />
        </div>
        <div className="flex justify-between text-xs text-on-surface/60">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-primary" /> Novel China ({chinaCount})
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-success" /> Light Novel ({lnCount})
          </span>
        </div>
      </div>

      {/* Upload Status Progress Bar */}
      <div className="bg-container-low border border-container-high rounded-xl p-4 flex flex-col gap-3">
        <h2 className="font-bold text-sm text-on-surface">Status Upload</h2>
        <div className="w-full bg-container-high rounded-full h-3 flex overflow-hidden">
          <div
            className="bg-success h-full transition-all duration-500"
            style={{ width: `${(uploadedCount / totalCount) * 100}%` }}
          />
          <div
            className="bg-warning h-full transition-all duration-500"
            style={{ width: `${(pendingCount / totalCount) * 100}%` }}
          />
        </div>
        <div className="flex justify-between text-xs text-on-surface/60">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-success" /> Sudah Upload ({uploadedCount})
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-warning" /> Belum Upload ({pendingCount})
          </span>
        </div>
      </div>

      {/* Backup Management */}
      <div className="bg-container-low border border-container-high rounded-xl p-4 flex flex-col gap-3">
        <h2 className="font-bold text-sm text-on-surface">Manajemen Backup JSON</h2>
        <p className="text-xs text-on-surface/60">Simpan atau pulihkan file data lokal secara luring (offline).</p>
        <div className="flex gap-2">
          <button
            onClick={handleExport}
            className="px-4 py-2 bg-primary text-on-primary rounded-lg text-xs font-bold hover:opacity-90 transition-opacity"
          >
            Export Master JSON
          </button>
          <button
            onClick={() => fileInputRef.current?.click()}
            className="px-4 py-2 bg-surface text-on-surface border border-container-high rounded-lg text-xs font-bold hover:bg-container transition-colors cursor-pointer"
          >
            Import Master JSON
          </button>
          <input
            ref={fileInputRef}
            type="file"
            onChange={handleImport}
            className="hidden"
            accept=".json"
          />
        </div>
      </div>

      <Modal
        isOpen={modal.isOpen}
        type={modal.type}
        title={modal.title}
        message={modal.message}
        primaryButtonText="Tutup"
        onPrimaryClick={() => setModal(m => ({ ...m, isOpen: false }))}
      />
    </div>
  );
}
