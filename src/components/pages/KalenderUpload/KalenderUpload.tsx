import { useState } from 'react';
import { useAppContext } from '../../../context/AppContext';

export function KalenderUpload() {
  const { videos } = useAppContext();
  const [currentDate, setCurrentDate] = useState(new Date());

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const timeSlots = ['00:00', '06:00', '12:00', '18:00'];

  const getVideosForDayAndTime = (day: number, time: string) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return videos.filter(v => v.uploadDate === dateStr && v.uploadTime === time);
  };

  const changeMonth = (delta: number) => {
    setCurrentDate(new Date(year, month + delta, 1));
  };

  const monthNames = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
  ];

  return (
    <div className="flex flex-col gap-6 h-full">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-on-surface">Kalender Upload</h1>
          <p className="text-xs text-on-surface/60">Jadwal harian dengan 4 slot waktu (00:00, 06:00, 12:00, 18:00 WIB)</p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => changeMonth(-1)} className="px-4 py-2 bg-container hover:bg-container-high rounded-lg font-bold text-on-surface transition-all active:scale-95 shadow-sm border border-container-high">←</button>
          <span className="text-sm font-semibold text-primary w-32 text-center">{monthNames[month]} {year}</span>
          <button onClick={() => changeMonth(1)} className="px-4 py-2 bg-container hover:bg-container-high rounded-lg font-bold text-on-surface transition-all active:scale-95 shadow-sm border border-container-high">→</button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-2 bg-container-low p-3 rounded-xl border border-container-high flex-1 overflow-auto">
        {['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'].map(day => (
          <div key={day} className="text-center text-xs font-bold text-on-surface/60 py-1">
            {day}
          </div>
        ))}

        {Array.from({ length: daysInMonth }).map((_, i) => {
          const dayNum = i + 1;
          return (
            <div
              key={dayNum}
              className="bg-white border border-container-high rounded-lg p-2 min-h-[140px] flex flex-col justify-start gap-1 hover:border-primary transition-all shadow-sm"
            >
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs font-bold text-on-surface">{dayNum}</span>
              </div>

              <div className="flex flex-col gap-1 flex-1">
                {timeSlots.map(time => {
                  const match = getVideosForDayAndTime(dayNum, time);
                  const hasVideo = match.length > 0;
                  return (
                    <div
                      key={time}
                      className={`text-[9px] p-1 rounded flex gap-1 items-center overflow-hidden whitespace-nowrap ${
                        hasVideo ? 'bg-primary/10 text-primary font-medium' : 'bg-container text-on-surface/30'
                      }`}
                      title={hasVideo ? match[0].title : 'KOSONG'}
                    >
                      <span className="font-bold shrink-0">{time}</span>
                      <span className="truncate">
                        {hasVideo ? match[0].title : 'KOSONG'}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}