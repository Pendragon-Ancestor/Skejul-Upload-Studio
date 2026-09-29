import { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { useAppContext } from '../../context/AppContext';

export function Header() {
  const { theme, toggleTheme } = useTheme();
  const { videos } = useAppContext();
  const [showNotifications, setShowNotifications] = useState(false);

  // Get upcoming videos with status 'PENDING'
  const upcomingVideos = videos
    .filter(v => v.status === 'PENDING')
    .slice(0, 5);

  return (
    <header className="h-12 bg-container-low border-b border-container-high flex items-center justify-between px-4 select-none relative">
      <div className="flex items-center gap-3">
        <div className="w-6 h-6 rounded bg-primary flex items-center justify-center text-white font-bold text-xs">
          SU
        </div>
        <span className="font-semibold text-sm text-on-surface">
          SkejulUpload Studio
        </span>
        <span className="text-xs text-on-surface/50">/</span>
        <span className="text-xs text-on-surface/70">Workspace</span>
      </div>

      <div className="flex-1" />

      <div className="flex items-center gap-2">
        {/* Notification Bell */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="h-8 w-8 flex items-center justify-center text-on-surface/70 hover:bg-container rounded-lg transition-colors border border-container-high relative"
            title="Pengingat Upload"
          >
            <span className="material-symbols-outlined text-sm">notifications</span>
            {upcomingVideos.length > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary text-white font-bold text-[9px] rounded-full flex items-center justify-center">
                {upcomingVideos.length}
              </span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white border border-container-high rounded-xl shadow-lg p-3 z-50 flex flex-col gap-2">
              <div className="flex items-center justify-between pb-2 border-b border-container-high">
                <span className="font-bold text-xs text-on-surface">Pengingat Upload Mendatang</span>
                <span className="text-[10px] bg-primary/10 text-primary px-1.5 py-0.5 rounded font-bold">
                  {upcomingVideos.length} Jadwal
                </span>
              </div>
              <div className="flex flex-col gap-2 max-h-60 overflow-auto">
                {upcomingVideos.length === 0 ? (
                  <span className="text-xs text-on-surface/50 text-center py-4">Tidak ada jadwal mendatang.</span>
                ) : (
                  upcomingVideos.map(v => (
                    <div key={v.id} className="p-2 bg-container-low rounded-lg text-xs flex flex-col gap-1 border border-container-high">
                      <span className="font-semibold text-on-surface truncate">{v.title}</span>
                      <div className="flex justify-between text-[10px] text-on-surface/60">
                        <span>📅 {v.uploadDate}</span>
                        <span>⏰ {v.uploadTime} WIB</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="h-8 px-2.5 flex items-center gap-1.5 text-xs font-semibold text-on-surface/80 hover:bg-container rounded-lg transition-colors border border-container-high"
          title="Ganti Tema"
        >
          <span className="material-symbols-outlined text-sm">
            {theme === 'light' ? 'dark_mode' : 'light_mode'}
          </span>
          <span>{theme === 'light' ? 'Gelap' : 'Terang'}</span>
        </button>
      </div>
    </header>
  );
}