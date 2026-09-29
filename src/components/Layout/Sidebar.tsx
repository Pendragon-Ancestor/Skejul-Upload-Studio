import { useNavigate, useLocation } from 'react-router-dom';

const navigationItems = [
  {
    path: '/',
    icon: 'view_list',
    label: 'Daftar Video',
  },
  {
    path: '/calendar',
    icon: 'calendar_month',
    label: 'Kalender Upload',
  },
  {
    path: '/add',
    icon: 'add_circle',
    label: 'Tambah Jadwal Baru',
  },
  {
    path: '/stats',
    icon: 'analytics',
    label: 'Statistik & Arsip',
  },
];

export function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <aside className="w-64 bg-container-low border-r border-container-high flex flex-col justify-between p-4 h-full">
      <div className="flex flex-col gap-2">
        <div className="px-2 py-2">
          <span className="text-xs text-on-surface/60 uppercase tracking-wider font-semibold">
            Manajemen Konten
          </span>
        </div>
        <nav className="flex flex-col gap-1">
          {navigationItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 ${
                  isActive
                    ? 'bg-primary text-white font-medium shadow-sm'
                    : 'text-on-surface/80 hover:bg-container hover:text-on-surface'
                }`}
              >
                <span className="material-symbols-outlined text-xl">{item.icon}</span>
                <span className="text-sm">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      <div className="flex flex-col gap-2 p-3 bg-container rounded-xl shadow-xs border border-container-high">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-semibold text-on-surface">Lokal (JSON) Aktif</span>
          </div>
          <span className="material-symbols-outlined text-base text-emerald-600">check_circle</span>
        </div>
        <div className="flex items-center justify-between text-xs text-on-surface/70 pt-2 border-t border-container-high">
          <span>Data Tersimpan</span>
          <span className="font-semibold text-on-surface">212 item</span>
        </div>
        <div className="flex items-center justify-between text-xs text-on-surface/70">
          <span>Mode Engine</span>
          <span className="font-semibold text-secondary">Offline</span>
        </div>
      </div>
    </aside>
  );
}
