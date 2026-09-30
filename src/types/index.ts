export interface Video {
  id: string;
  no: number;
  category: 'LIGHT_NOVEL' | 'NOVEL_CHINA' | 'CUSTOM';
  title: string;
  subtitle: string;
  scheduleDate: string;
  scheduleTime: string;
  status: 'DONE' | 'PENDING' | 'DRAFT';
  platform: string;
}

export interface Schedule {
  id: string;
  date: string;
  time: string;
  videoId: string;
  video: Video;
  status: 'SCHEDULED' | 'DONE' | 'FAILED';
}

export interface Serie {
  id: string;
  name: string;
  category: 'LIGHT_NOVEL' | 'NOVEL_CHINA' | 'CUSTOM';
  totalEpisodes: number;
  description: string;
  lastUpdated: string;
}

export interface AppState {
  videos: Video[];
  schedules: Schedule[];
  series: Serie[];
  selectedDate: string | null;
  selectedVideo: Video | null;
}
