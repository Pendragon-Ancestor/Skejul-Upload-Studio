export function Pengaturan() {
  return (
    <div className="pl-64">
      <main className="relative pt-10 min-h-screen bg-surface px-space-xl py-space-lg">
        <div className="flex flex-col w-full max-w-2xl mx-auto">
          {/* Header */}
          <div className="flex flex-col gap-space-md mb-space-lg bg-surface-container-lowest p-space-lg rounded-xl shadow-sm">
            <div className="flex items-center gap-space-md">
              <div className="w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-[24px]">settings</span>
              </div>
              <div>
                <h1 className="font-headline-md text-headline-md text-on-surface">Pengaturan Lokal & Backup JSON</h1>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Kelola file backup, sinkronisasi data, dan konfigurasi offline mode.
                </p>
              </div>
            </div>
          </div>

          {/* Settings Sections */}
          <div className="flex flex-col gap-space-lg">
            {/* Database Settings */}
            <div className="p-space-lg rounded-xl bg-surface-container-lowest shadow-sm">
              <div className="flex items-center gap-space-xs mb-space-md pb-space-md border-b border-outline-variant">
                <span className="material-symbols-outlined text-primary">storage</span>
                <h2 className="font-headline-sm text-headline-sm text-on-surface">Database Lokal</h2>
              </div>

              <div className="flex flex-col gap-space-md">
                <div className="flex items-center justify-between p-space-md rounded-lg bg-surface-container-low">
                  <div className="flex flex-col">
                    <span className="font-label-md text-label-md font-semibold text-on-surface">Status Database</span>
                    <span className="font-body-sm text-body-sm text-on-surface-variant">JSON Lokal Aktif • 212 item</span>
                  </div>
                  <span className="w-3 h-3 rounded-full bg-tertiary animate-pulse" />
                </div>

                <div className="flex items-center justify-between p-space-md rounded-lg bg-surface-container">
                  <div>
                    <span className="font-label-sm text-label-sm font-semibold text-on-surface-variant">Auto-Save Mode</span>
                  </div>
                  <button className="px-space-md py-1.5 rounded-full bg-tertiary text-on-tertiary font-label-sm text-label-sm font-semibold">
                    ON
                  </button>
                </div>

                <div className="p-space-md rounded-lg bg-surface-container-low">
                  <span className="font-label-sm text-label-sm font-semibold text-on-surface-variant">Lokasi File Database</span>
                  <div className="mt-1.5 p-2 rounded bg-surface-container-lowest font-code-sm text-code-sm text-on-surface truncate">
                    C:\Users\Admin\Documents\SkejulUpload\skejul_upload_video_2026-09-29.json
                  </div>
                  <div className="mt-1.5 text-code-sm text-code-sm text-on-surface-variant">
                    Ukuran: 1.42 MB • Terakhir: 14:22:05 WIB
                  </div>
                </div>
              </div>
            </div>

            {/* Backup Settings */}
            <div className="p-space-lg rounded-xl bg-surface-container-lowest shadow-sm">
              <div className="flex items-center gap-space-xs mb-space-md pb-space-md border-b border-outline-variant">
                <span className="material-symbols-outlined text-primary">backup</span>
                <h2 className="font-headline-sm text-headline-sm text-on-surface">Backup & Restore</h2>
              </div>

              <div className="flex flex-col gap-space-md">
                <div className="p-space-md rounded-lg bg-surface-container-low">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-label-sm text-label-sm font-semibold text-on-surface">Backup Otomatis Mingguan</span>
                    <button className="px-space-md py-1.5 rounded-full bg-tertiary text-on-tertiary font-label-sm text-label-sm font-semibold">
                      ON
                    </button>
                  </div>
                  <span className="font-body-sm text-body-sm text-on-surface-variant">Waktu: Setiap Minggu Pukul 00:00 WIB</span>
                </div>

                <div className="p-space-md rounded-lg bg-surface-container-low">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-label-sm text-label-sm font-semibold text-on-surface">Backup Terakhir</span>
                    <span className="font-code-sm text-code-sm text-tertiary-container font-medium">22 Sep 2026</span>
                  </div>
                  <span className="font-body-sm text-body-sm text-on-surface-variant">Lokasi: ...backup/skejul_2026-09-22.json</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
                  <button className="flex items-center justify-center gap-space-xs py-space-sm px-space-md rounded-lg bg-primary text-on-primary font-label-md text-label-md font-semibold hover:opacity-90 transition-all shadow-sm">
                    <span className="material-symbols-outlined text-[18px]">cloud_upload</span>
                    <span>Backup Sekarang</span>
                  </button>
                  <button className="flex items-center justify-center gap-space-xs py-space-sm px-space-md rounded-lg bg-surface-container-high text-on-surface font-label-md text-label-md font-semibold hover:bg-surface-container-highest transition-colors shadow-sm">
                    <span className="material-symbols-outlined text-[18px]">restore</span>
                    <span>Restore dari Backup</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Import/Export */}
            <div className="p-space-lg rounded-xl bg-surface-container-lowest shadow-sm">
              <div className="flex items-center gap-space-xs mb-space-md pb-space-md border-b border-outline-variant">
                <span className="material-symbols-outlined text-primary">import_export</span>
                <h2 className="font-headline-sm text-headline-sm text-on-surface">Import / Export Data</h2>
              </div>

              <div className="flex flex-col gap-space-md">
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Export seluruh jadwal upload dan metadata ke file JSON untuk backup atau transfer ke komputer lain.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
                  <button className="flex items-center justify-center gap-space-xs py-2 px-space-md rounded-lg bg-secondary-container text-on-secondary-container font-label-md text-label-md font-semibold hover:opacity-90 transition-all shadow-sm">
                    <span className="material-symbols-outlined text-[18px]">file_download</span>
                    <span>Export JSON Lengkap</span>
                  </button>
                  <button className="flex items-center justify-center gap-space-xs py-2 px-space-md rounded-lg bg-surface-container-high text-on-surface font-label-md text-label-md font-semibold hover:bg-surface-container-highest transition-colors shadow-sm">
                    <span className="material-symbols-outlined text-[18px]">file_upload</span>
                    <span>Import JSON</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Advanced Settings */}
            <div className="p-space-lg rounded-xl bg-surface-container-lowest shadow-sm">
              <div className="flex items-center gap-space-xs mb-space-md pb-space-md border-b border-outline-variant">
                <span className="material-symbols-outlined text-primary">tune</span>
                <h2 className="font-headline-sm text-headline-sm text-on-surface">Pengaturan Lanjutan</h2>
              </div>

              <div className="flex flex-col gap-space-md">
                <div className="flex items-center justify-between p-space-md rounded-lg bg-surface-container-low">
                  <div>
                    <span className="font-label-sm text-label-sm font-semibold text-on-surface-variant">Cache Lokal</span>
                  </div>
                  <button className="px-space-md py-1 rounded-lg bg-surface-container text-on-surface-variant font-label-sm text-label-sm hover:bg-surface-container-high transition-colors">
                    Clear Cache
                  </button>
                </div>

                <div className="flex items-center justify-between p-space-md rounded-lg bg-surface-container-low">
                  <div>
                    <span className="font-label-sm text-label-sm font-semibold text-on-surface-variant">Verifikasi Database Integritas</span>
                  </div>
                  <button className="px-space-md py-1 rounded-lg bg-surface-container text-on-surface-variant font-label-sm text-label-sm hover:bg-surface-container-high transition-colors">
                    Verifikasi
                  </button>
                </div>

                <div className="p-space-md rounded-lg bg-surface-container-low">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-label-sm text-label-sm font-semibold text-on-surface">Versi Aplikasi</span>
                    <span className="font-code-sm text-code-sm font-semibold text-primary">v2.4 LTS</span>
                  </div>
                  <span className="font-body-sm text-body-sm text-on-surface-variant">Terakhir diperbarui: 29 September 2026</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
