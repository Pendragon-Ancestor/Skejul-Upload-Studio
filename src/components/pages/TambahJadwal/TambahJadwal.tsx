import { useState, useEffect } from 'react';
import { useAppContext } from '../../../context/AppContext';
import { Modal } from '../../Modal/Modal';

// Fungsi helper untuk menghitung jadwal berikutnya
const calculateNextSchedule = (lastUpload: any, category: 'NOVEL_CHINA' | 'LIGHT_NOVEL', videos: any[]) => {
  const today = new Date();
  const todayStr = today.toISOString().split('T')[0];

  if (!lastUpload) {
    // Kondisi pertama kali (belum ada data)
    if (category === 'LIGHT_NOVEL') {
      return { date: todayStr, time: '00:00' };
    } else {
      return { date: todayStr, time: '06:00' };
    }
  }

  if (category === 'LIGHT_NOVEL') {
    // Light Novel: +1 hari, jam tetap sama
    const lastDate = new Date(lastUpload.uploadDate);
    const nextDate = new Date(lastDate);
    nextDate.setDate(nextDate.getDate() + 1);
    return {
      date: nextDate.toISOString().split('T')[0],
      time: lastUpload.uploadTime
    };
  } else {
    // Novel China: State transition dengan jam tetap [06:00, 12:00, 18:00]
    const slots = ['06:00', '12:00', '18:00'];
    const lastTime = lastUpload.uploadTime;
    const lastDate = new Date(lastUpload.uploadDate);

    // Cari index slot berikutnya
    const currentIndex = slots.indexOf(lastTime);

    if (currentIndex === -1) {
      // Jika jam tidak sesuai slot, cari slot terdekat
      const lastHour = parseInt(lastTime.split(':')[0]);
      let nextSlot = '06:00';
      
      if (lastHour < 6) {
        nextSlot = '06:00';
      } else if (lastHour < 12) {
        nextSlot = '12:00';
      } else if (lastHour < 18) {
        nextSlot = '18:00';
      } else {
        // Sudah lewat 18:00, pindah ke 06:00 hari berikutnya
        nextSlot = '06:00';
        lastDate.setDate(lastDate.getDate() + 1);
      }

      return {
        date: lastDate.toISOString().split('T')[0],
        time: nextSlot
      };
    }

    // State transition normal
    if (currentIndex < slots.length - 1) {
      // Masih ada slot di hari yang sama
      return {
        date: lastUpload.uploadDate,
        time: slots[currentIndex + 1]
      };
    } else {
      // Slot 18:00, pindah ke 06:00 hari berikutnya
      const nextDate = new Date(lastDate);
      nextDate.setDate(nextDate.getDate() + 1);
      return {
        date: nextDate.toISOString().split('T')[0],
        time: '06:00'
      };
    }
  }
};

export function TambahJadwal() {
  const { videos, addVideo } = useAppContext();
  const [judulNovel, setJudulNovel] = useState('');
  const [date, setDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [time, setTime] = useState('06:00');
  const [category, setCategory] = useState<'NOVEL_CHINA' | 'LIGHT_NOVEL'>('NOVEL_CHINA');
  const [status, setStatus] = useState<'PENDING' | 'UPLOADED'>('PENDING');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [collisionModal, setCollisionModal] = useState<{
    isOpen: boolean;
    existingTitle: string;
  }>({ isOpen: false, existingTitle: '' });

  // Get last upload for each category - using precision penuh (date + time)
  const lastChinaUpload = videos
    .filter(v => v.category === 'NOVEL_CHINA')
    .sort((a, b) => {
      const dateTimeA = `${a.uploadDate}T${a.uploadTime}:00`;
      const dateTimeB = `${b.uploadDate}T${b.uploadTime}:00`;
      return new Date(dateTimeB).getTime() - new Date(dateTimeA).getTime();
    })[0];
  
  const lastLNUpload = videos
    .filter(v => v.category === 'LIGHT_NOVEL')
    .sort((a, b) => {
      const dateTimeA = `${a.uploadDate}T${a.uploadTime}:00`;
      const dateTimeB = `${b.uploadDate}T${b.uploadTime}:00`;
      return new Date(dateTimeB).getTime() - new Date(dateTimeA).getTime();
    })[0];

  const lastUpload = category === 'NOVEL_CHINA' ? lastChinaUpload : lastLNUpload;

  // Calculate next schedule for "Update Otomatis" display
  const nextSchedule = calculateNextSchedule(lastUpload, category, videos);

  // Auto-update time and date based on category and last upload
  useEffect(() => {
    const lastUploadByCategory = category === 'NOVEL_CHINA' ? lastChinaUpload : lastLNUpload;
    const next = calculateNextSchedule(lastUploadByCategory, category, videos);
    setDate(next.date);
    setTime(next.time);
  }, [category, lastChinaUpload, lastLNUpload, videos]);

  // Check collision
  const collision = videos.find(v => v.uploadDate === date && v.uploadTime === time);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (collision) {
      setCollisionModal({ isOpen: true, existingTitle: collision.title });
      return;
    }
    submitVideo();
  };

  const submitVideo = () => {
    addVideo({
      title: judulNovel,
      category,
      series: judulNovel,
      part: 1,
      uploadDate: date,
      uploadTime: time,
      status,
    });
    setJudulNovel('');
    setShowSuccessModal(true);
  };

  const handleQuickAction = (action: string) => {
    const currentDate = new Date(date);
    const [hours, minutes] = time.split(':').map(Number);
    
    switch(action) {
      case 'nextslot':
        if (hours === 0) {
          setTime('06:00');
        } else if (hours === 6) {
          setTime('12:00');
        } else if (hours === 12) {
          setTime('18:00');
        } else {
          currentDate.setDate(currentDate.getDate() + 1);
          setDate(currentDate.toISOString().split('T')[0]);
          setTime('00:00');
        }
        break;
      case 'nextday':
        currentDate.setDate(currentDate.getDate() + 1);
        setDate(currentDate.toISOString().split('T')[0]);
        break;
      case 'addhours':
        const newHours = hours + 6;
        if (newHours >= 24) {
          currentDate.setDate(currentDate.getDate() + 1);
          setDate(currentDate.toISOString().split('T')[0]);
          setTime('00:00');
        } else {
          setTime(`${String(newHours).padStart(2, '0')}:00`);
        }
        break;
      case 'copylatest':
        if (lastUpload) {
          setJudulNovel(lastUpload.title);
          setDate(lastUpload.uploadDate);
          setTime(lastUpload.uploadTime);
        }
        break;
    }
  };

  const formatDate = (dateStr: string, timeStr: string = '') => {
    const [year, month, day] = dateStr.split('-');
    const months = ['JANUARI', 'FEBRUARI', 'MARET', 'APRIL', 'MEI', 'JUNI', 'JULI', 'AGUSTUS', 'SEPTEMBER', 'OKTOBER', 'NOVEMBER', 'DESEMBER'];
    const finalTime = timeStr || time;
    return `${day} ${months[parseInt(month) - 1]} ${year} JAM ${finalTime}`;
  };

  return (
    <div className="flex gap-6 h-full">
      <div className="flex-1 flex flex-col gap-6 max-w-2xl">
        <div>
          <h1 className="text-xl font-bold text-on-surface">Tambah Jadwal Baru</h1>
          <p className="text-xs text-on-surface/60">Formulir penambahan jadwal video ke pipeline dengan validasi otomatis</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-container-low border border-container-high rounded-xl p-4 flex flex-col gap-4 text-xs">
          {collision && (
            <div className="p-3 bg-warning/10 border border-warning/30 text-warning rounded-lg flex items-center justify-between">
              <span>⚠️ Slot tanggal {date} pukul {time} sudah terisi: <strong>{collision.title}</strong></span>
            </div>
          )}

          <div>
            <label className="font-semibold block mb-1">Judul Novel</label>
            <input
              type="text"
              value={judulNovel}
              onChange={(e) => setJudulNovel(e.target.value)}
              className="w-full px-3 py-1.5 bg-surface rounded-lg border border-container-high focus:outline-none focus:ring-1 focus:ring-primary"
              placeholder="Masukkan judul novel lengkap..."
            />
          </div>

          <div>
            <label className="font-semibold block mb-1">Tanggal Upload</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-3 py-1.5 bg-surface rounded-lg border border-container-high focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>

          <div>
            <label className="font-semibold block mb-1">Jam Upload</label>
            {category === 'LIGHT_NOVEL' ? (
              <div className="px-3 py-1.5 bg-surface rounded-lg border border-container-high text-on-surface font-semibold">
                00:00 WIB (Tetap)
              </div>
            ) : (
              <div className="grid grid-cols-3 gap-2">
                {['06:00', '12:00', '18:00'].map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setTime(t)}
                    className={`py-1.5 rounded-lg border font-medium text-center ${
                      time === t ? 'bg-primary text-white border-primary' : 'bg-surface text-on-surface border-container-high'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div>
            <label className="font-semibold block mb-1">Status Upload</label>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setStatus('PENDING')}
                className={`flex-1 px-3 py-1.5 rounded-lg border font-medium ${
                  status === 'PENDING' ? 'bg-warning text-on-warning border-warning' : 'bg-surface text-on-surface border-container-high'
                }`}
              >
                BELUM DIUPLOAD
              </button>
              <button
                type="button"
                onClick={() => setStatus('UPLOADED')}
                className={`flex-1 px-3 py-1.5 rounded-lg border font-medium ${
                  status === 'UPLOADED' ? 'bg-success text-on-success border-success' : 'bg-surface text-on-surface border-container-high'
                }`}
              >
                SUDAH DIUPLOAD
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="mt-2 w-full py-2 bg-primary text-white font-bold rounded-lg hover:bg-primary-container transition-colors"
          >
            Simpan Jadwal
          </button>
        </form>
      </div>

      {/* Detail Panel */}
      <div className="w-96 flex flex-col gap-4 overflow-y-auto">
        {/* Tabs */}
        <div className="flex gap-1 border-b border-container-high">
          <button
            onClick={() => setCategory('NOVEL_CHINA')}
            className={`flex-1 py-2 px-3 text-xs font-bold border-b-2 transition-colors ${
              category === 'NOVEL_CHINA'
                ? 'text-info border-info'
                : 'text-on-surface/60 border-transparent hover:text-on-surface'
            }`}
          >
            NOVEL CHINA
          </button>
          <button
            onClick={() => setCategory('LIGHT_NOVEL')}
            className={`flex-1 py-2 px-3 text-xs font-bold border-b-2 transition-colors ${
              category === 'LIGHT_NOVEL'
                ? 'text-tertiary border-tertiary'
                : 'text-on-surface/60 border-transparent hover:text-on-surface'
            }`}
          >
            LIGHT NOVEL
          </button>
        </div>

        {/* Jadwal Terakhir */}
        {lastUpload && (
          <div className="p-4 bg-container-low rounded-xl border border-container-high">
            <div className="flex items-center gap-2 mb-2">
              <span className="material-symbols-outlined text-danger text-lg">location_on</span>
              <span className="text-xs font-bold text-on-surface/60">JADWAL TERAKHIR [{category === 'NOVEL_CHINA' ? 'NOVEL CHINA' : 'LIGHT NOVEL'}]</span>
            </div>
            <div className="text-sm font-semibold text-on-surface mb-3 line-clamp-2">{lastUpload.title}</div>
            
            <div className="space-y-2 text-xs mb-4 pb-4 border-b border-container-high">
              <div className="flex justify-between text-on-surface/70">
                <span>Upload Terakhir:</span>
                <span className="font-semibold text-on-surface">{lastUpload.uploadDate} {lastUpload.uploadTime}</span>
              </div>
              <div className="flex justify-between text-on-surface/70">
                <span>Update Otomatis:</span>
                <span className="font-semibold text-success">{formatDate(nextSchedule.date, nextSchedule.time)}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                setDate(nextSchedule.date);
                setTime(nextSchedule.time);
              }}
              className="w-full py-2 bg-success text-on-success font-bold text-xs rounded-lg hover:bg-success/90 transition-colors"
            >
              Pakai Waktu Ini
            </button>
          </div>
        )}

        {/* Pintasan Cepat */}
        <div className="p-4 bg-container-low rounded-xl border border-container-high">
          <div className="text-xs font-bold text-on-surface/60 mb-3">PINTASAN CEPAT</div>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => handleQuickAction('nextslot')}
              className="px-3 py-1.5 bg-warning/20 text-warning border border-warning rounded-lg text-[10px] font-bold hover:bg-warning/30 transition-colors"
            >
              +Slot Berikut
            </button>
            <button
              type="button"
              onClick={() => handleQuickAction('nextday')}
              className="px-3 py-1.5 bg-info/20 text-info border border-info rounded-lg text-[10px] font-bold hover:bg-info/30 transition-colors"
            >
              +1 Hari
            </button>
            <button
              type="button"
              onClick={() => handleQuickAction('addhours')}
              className="px-3 py-1.5 bg-info/20 text-info border border-info rounded-lg text-[10px] font-bold hover:bg-info/30 transition-colors"
            >
              +6 Jam
            </button>
            <button
              type="button"
              onClick={() => handleQuickAction('copylatest')}
              className="px-3 py-1.5 bg-info/20 text-info border border-info rounded-lg text-[10px] font-bold hover:bg-info/30 transition-colors"
            >
              Salin Terakhir
            </button>
          </div>
        </div>

        {/* Format Tersimpan */}
        <div className="p-4 bg-container-low rounded-xl border border-container-high">
          <div className="text-xs font-bold text-on-surface/60 mb-3">FORMAT TERSIMPAN</div>
          <div className="p-3 bg-container rounded-lg border border-container-high text-xs font-semibold text-on-surface text-center">
            {formatDate(date)}
          </div>
        </div>
      </div>

      {/* Success Modal */}
      <Modal
        isOpen={showSuccessModal}
        type="success"
        title="Jadwal Berhasil Ditambahkan!"
        message="Jadwal Anda telah berhasil disimpan ke pipeline upload. Form siap untuk input jadwal berikutnya."
        primaryButtonText="Tutup"
        onPrimaryClick={() => setShowSuccessModal(false)}
      />

      {/* Collision Confirmation Modal */}
      <Modal
        isOpen={collisionModal.isOpen}
        type="confirmation"
        title="Slot Waktu Bentrok!"
        message={`Slot tanggal ${date} pukul ${time} sudah terisi oleh "${collisionModal.existingTitle}". Apakah Anda tetap ingin menambahkan jadwal ini?`}
        primaryButtonText="Tetap Tambah"
        secondaryButtonText="Batal"
        onPrimaryClick={() => {
          setCollisionModal({ isOpen: false, existingTitle: '' });
          submitVideo();
        }}
        onSecondaryClick={() => setCollisionModal({ isOpen: false, existingTitle: '' })}
      />
    </div>
  );
}