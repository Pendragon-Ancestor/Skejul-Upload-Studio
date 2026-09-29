import { useAppContext } from '../../../context/AppContext';

export function Statistik() {
  const { videos, exportData, importData } = useAppContext();

  const chinaCount = videos.filter(v => v.category === 'NOVEL_CHINA').length;
  const lnCount = videos.filter(v => v.category === 'LIGHT_NOVEL').length;

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = JSON.parse(e.target?.result as string);
        importData(data);
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="flex flex-col gap-6 h-full overflow-auto">
      <div>
        <h1 className="text-xl font-bold text-on-surface">Statistik & Arsip</h1>
        <p className="text-xs text-on-surface/60">Metrik performa dan manajemen data lokal JSON</p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-container-low border border-container-high rounded-xl p-4 flex flex-col justify-between">
          <span className="text-xs text-on-surface/60 font-semibold uppercase">Total Video</span>
          <div className="text-2xl font-bold text-primary mt-2">{videos.length}</div>
          <span className="text-[10px] text-on-surface/50 mt-1">Video terdaftar dalam pipeline</span>
        </div>
        <div className="bg-container-low border border-container-high rounded-xl p-4 flex flex-col justify-between">
          <span className="text-xs text-on-surface/60 font-semibold uppercase">Konsistensi</span>
          <div className="text-2xl font-bold text-emerald-600 mt-2">4 Video/Hari</div>
          <span className="text-[10px] text-on-surface/50 mt-1">Batch slot jam 00, 06, 12, 18</span>
        </div>
        <div className="bg-container-low border border-container-high rounded-xl p-4 flex flex-col justify-between">
          <span className="text-xs text-on-surface/60 font-semibold uppercase">Novel China</span>
          <div className="text-2xl font-bold text-secondary mt-2">{chinaCount}</div>
          <span className="text-[10px] text-on-surface/50 mt-1">{((chinaCount/videos.length)*100).toFixed(1)}% dari total pipeline</span>
        </div>
        <div className="bg-container-low border border-container-high rounded-xl p-4 flex flex-col justify-between">
          <span className="text-xs text-on-surface/60 font-semibold uppercase">Light Novel</span>
          <div className="text-2xl font-bold text-tertiary mt-2">{lnCount}</div>
          <span className="text-[10px] text-on-surface/50 mt-1">{((lnCount/videos.length)*100).toFixed(1)}% dari total pipeline</span>
        </div>
      </div>

      {/* Distribution Progress Bar */}
      <div className="bg-container-low border border-container-high rounded-xl p-4 flex flex-col gap-2">
        <h2 className="font-bold text-sm text-on-surface">Distribusi Kategori</h2>
        <div className="w-full bg-container-high rounded-full h-3 flex overflow-hidden">
          <div
            className="bg-primary h-full transition-all duration-500"
            style={{ width: `${(chinaCount/videos.length)*100}%` }}
          />
          <div
            className="bg-emerald-500 h-full transition-all duration-500"
            style={{ width: `${(lnCount/videos.length)*100}%` }}
          />
        </div>
        <div className="flex justify-between text-xs text-on-surface/60">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-primary" /> Novel China ({chinaCount})
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500" /> Light Novel ({lnCount})
          </span>
        </div>
      </div>

      {/* Backup Management */}
      <div className="bg-container-low border border-container-high rounded-xl p-4 flex flex-col gap-3">
        <h2 className="font-bold text-sm text-on-surface">Manajemen Backup JSON</h2>
        <p className="text-xs text-on-surface/60">Simpan atau pulihkan file data lokal secara luring (offline).</p>
        <div className="flex gap-2">
          <button 
            onClick={exportData}
            className="px-4 py-2 bg-primary text-white rounded-lg text-xs font-bold hover:bg-primary-container transition-colors">
            Export Master JSON
          </button>
          <label className="px-4 py-2 bg-white text-on-surface border border-container-high rounded-lg text-xs font-bold hover:bg-container transition-colors cursor-pointer">
            Import Master JSON
            <input type="file" onChange={handleImport} className="hidden" accept=".json" />
          </label>
        </div>
      </div>
    </div>
  );
}