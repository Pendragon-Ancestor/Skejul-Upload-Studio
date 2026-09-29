import React, { createContext, useState, ReactNode, useEffect } from 'react';

export interface VideoEntry {
  id: string;
  title: string;
  category: 'NOVEL_CHINA' | 'LIGHT_NOVEL';
  series: string;
  part: number;
  uploadDate: string;
  uploadTime: string;
  status: 'PENDING' | 'UPLOADED';
}

interface AppContextType {
  videos: VideoEntry[];
  addVideo: (video: Omit<VideoEntry, 'id' | 'status'>) => void;
  deleteVideo: (id: string) => void;
  updateVideo: (id: string, updates: Partial<VideoEntry>) => void;
  updateMultipleVideos: (ids: string[], updates: Partial<VideoEntry>) => void;
  exportData: () => void;
  importData: (data: any[]) => void;
}

const parseIndonesianDate = (dateStr: string): { date: string, time: string } => {
  // Format: "22 AGUSTUS 2026 JAM 00.00"
  const parts = dateStr.toUpperCase().split(/ JAM /);
  const datePart = parts[0];
  const timePart = parts[1] ? parts[1].replace('.', ':') : "00:00";

  const months: { [key: string]: string } = {
    'JANUARI': '01', 'FEBRUARI': '02', 'MARET': '03', 'APRIL': '04', 'MEI': '05', 'JUNI': '06',
    'JULI': '07', 'AGUSTUS': '08', 'SEPTEMBER': '09', 'OKTOBER': '10', 'NOVEMBER': '11', 'DESEMBER': '12'
  };

  const [d, mName, y] = datePart.split(' ');
  const m = months[mName];
  
  return { date: `${y}-${m}-${d.padStart(2, '0')}`, time: timePart };
};

const mapLegacyToNew = (legacy: any): VideoEntry => {
  const { date, time } = parseIndonesianDate(legacy.tanggal);
  return {
    id: `v-${legacy.no}-${Date.now()}`,
    title: legacy.nama,
    category: legacy.kategori === 'Novel China' ? 'NOVEL_CHINA' : 'LIGHT_NOVEL',
    series: legacy.nama.split(' Part')[0],
    part: parseInt(legacy.nama.match(/Part (\d+)/)?.[1] || '0'),
    uploadDate: date,
    uploadTime: time,
    status: legacy.status === 'done' ? 'UPLOADED' : 'PENDING'
  };
};

const STORAGE_KEY = 'skejul_upload_studio_data';

export const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [videos, setVideos] = useState<VideoEntry[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load data from localStorage on mount
  useEffect(() => {
    const loadData = () => {
      try {
        const storedData = localStorage.getItem(STORAGE_KEY);
        if (storedData) {
          const parsedData = JSON.parse(storedData);
          setVideos(Array.isArray(parsedData) ? parsedData : []);
        }
      } catch (error) {
        console.error('Error loading data from localStorage:', error);
        setVideos([]);
      } finally {
        setIsInitialized(true);
      }
    };

    loadData();
  }, []);

  // Save data to localStorage whenever videos change
  useEffect(() => {
    if (isInitialized) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(videos));
      } catch (error) {
        console.error('Error saving data to localStorage:', error);
      }
    }
  }, [videos, isInitialized]);

  const addVideo = (newVideo: Omit<VideoEntry, 'id' | 'status'>) => {
    setVideos(prev => [...prev, {
      ...newVideo,
      id: `v-${Date.now()}`,
      status: 'PENDING'
    }]);
  };

  const deleteVideo = (id: string) => {
    setVideos(prev => prev.filter(v => v.id !== id));
  };

  const updateVideo = (id: string, updates: Partial<VideoEntry>) => {
    setVideos(prev => prev.map(v => v.id === id ? { ...v, ...updates } : v));
  };

  const updateMultipleVideos = (ids: string[], updates: Partial<VideoEntry>) => {
    setVideos(prev => prev.map(v => ids.includes(v.id) ? { ...v, ...updates } : v));
  };

  const exportData = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(videos, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", `skejul_data_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  const importData = (data: any[]) => {
    if (!Array.isArray(data) || data.length === 0) {
      alert('Format JSON tidak valid atau file kosong');
      return;
    }

    try {
      // Check if it's legacy format or new format
      const isLegacyFormat = data[0].hasOwnProperty('kategori') || data[0].hasOwnProperty('nama');
      
      let newVideos: VideoEntry[];
      if (isLegacyFormat) {
        // Convert legacy format to new format
        newVideos = data.map(mapLegacyToNew);
      } else if (data[0].hasOwnProperty('category') && data[0].hasOwnProperty('uploadDate')) {
        // Already in new format
        newVideos = data as VideoEntry[];
      } else {
        alert('Format JSON tidak dikenali');
        return;
      }

      // Validate each entry
      const validVideos = newVideos.filter(v => 
        v.id && v.title && v.category && v.uploadDate && v.uploadTime && v.status
      );

      if (validVideos.length === 0) {
        alert('Tidak ada data valid dalam file JSON');
        return;
      }

      // Merge with existing data (append, not overwrite)
      setVideos(prev => [...prev, ...validVideos]);
      alert(`Berhasil import ${validVideos.length} video!`);
    } catch (error) {
      console.error('Import error:', error);
      alert('Gagal mengimport file: ' + (error instanceof Error ? error.message : 'Unknown error'));
    }
  };

  return <AppContext.Provider value={{ videos, addVideo, deleteVideo, updateVideo, updateMultipleVideos, exportData, importData }}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const context = React.useContext(AppContext);
  if (!context) throw new Error('useAppContext must be used within AppProvider');
  return context;
};
