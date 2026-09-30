import { useState } from 'react';
import { useAppContext, VideoEntry } from '../../../context/AppContext';
import { EmptyState } from '../../EmptyState/EmptyState';
import { Modal } from '../../Modal/Modal';

// Helper function to format date
const formatDate = (dateStr: string, timeStr: string) => {
  const [year, month, day] = dateStr.split('-');
  return `${day}/${month}/${year} ${timeStr}`;
};

// Helper function to parse date back
const parseDate = (formatted: string) => {
  const [datePart, timePart] = formatted.split(' ');
  const [day, month, year] = datePart.split('/');
  return {
    date: `${year}-${month}-${day}`,
    time: timePart
  };
};

export function DaftarVideo() {
  const { videos, deleteVideo, updateVideo, updateMultipleVideos } = useAppContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [sortOrder, setSortOrder] = useState('newest');
  const [selectedVideo, setSelectedVideo] = useState<VideoEntry | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<{ date: string; time: string; status: 'PENDING' | 'UPLOADED' } | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [deleteConfirmModal, setDeleteConfirmModal] = useState<{ isOpen: boolean; videoId: string; videoTitle: string }>({ isOpen: false, videoId: '', videoTitle: '' });
  const itemsPerPage = 15;

  // Copy to clipboard function
  const handleCopyToClipboard = (text: string, videoId: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedId(videoId);
      setTimeout(() => setCopiedId(null), 2000); // Reset after 2 seconds
    });
  };

  const filteredVideos = videos.filter((video) => {
    const matchSearch = video.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        video.series.toLowerCase().includes(searchTerm.toLowerCase());
    const matchCategory = categoryFilter === 'ALL' || video.category === categoryFilter;
    const matchStatus = statusFilter === 'ALL' || video.status === statusFilter;
    return matchSearch && matchCategory && matchStatus;
  });

  // Sort videos based on sortOrder
  // HANYA gunakan uploadDate + uploadTime, parse ke DateTime untuk precision hingga jam/menit
  const sortedVideos = [...filteredVideos].sort((a, b) => {
    // Combine date + time untuk parsing presisi
    const dateTimeA = `${a.uploadDate}T${a.uploadTime}:00`;
    const dateTimeB = `${b.uploadDate}T${b.uploadTime}:00`;
    
    const timeA = new Date(dateTimeA).getTime();
    const timeB = new Date(dateTimeB).getTime();
    
    if (sortOrder === 'newest') {
      // Terbaru: Paling baru ke paling lama (Descending)
      return timeB - timeA;
    } else {
      // Terlama: Paling lama ke paling baru (Ascending)
      return timeA - timeB;
    }
  });

  const totalPages = Math.ceil(sortedVideos.length / itemsPerPage);
  const paginatedVideos = sortedVideos.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  // Checkbox handlers
  const toggleSelectAll = (checked: boolean) => {
    if (checked) {
      const allIds = new Set(paginatedVideos.map(v => v.id));
      setSelectedIds(allIds);
    } else {
      setSelectedIds(new Set());
    }
  };

  const toggleSelectVideo = (id: string) => {
    const newSelected = new Set(selectedIds);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedIds(newSelected);
  };

  const isAllSelected = paginatedVideos.length > 0 && paginatedVideos.every(v => selectedIds.has(v.id));

  // Bulk update status
  const handleBulkStatusUpdate = (newStatus: 'PENDING' | 'UPLOADED') => {
    if (selectedIds.size === 0) return;
    updateMultipleVideos(Array.from(selectedIds), { status: newStatus });
    setSelectedIds(new Set());
  };

  // Edit modal handlers
  const openEditModal = (video: VideoEntry) => {
    setEditingId(video.id);
    setEditForm({
      date: video.uploadDate,
      time: video.uploadTime,
      status: video.status
    });
  };

  const handleEditSave = () => {
    if (editingId && editForm) {
      updateVideo(editingId, {
        uploadDate: editForm.date,
        uploadTime: editForm.time,
        status: editForm.status
      });
      setEditingId(null);
      setEditForm(null);
    }
  };

  return (
    <div className="flex gap-6 h-full">
      <div className="flex-1 flex flex-col min-w-0 gap-4">
        {/* Empty State */}
        {videos.length === 0 ? (
          <EmptyState
            icon="video_library"
            title="Belum Ada Data Video"
            description="Mulai dengan mengimport file Master JSON atau tambahkan video baru melalui sidebar 'Tambah Jadwal Baru'"
          />
        ) : (
          <>
            {/* Header & Metrics */}
            <div className="flex flex-col gap-4">
          <div>
            <h1 className="text-xl font-bold text-on-surface">Daftar Video & Jadwal</h1>
            <p className="text-xs text-on-surface/60">Manajemen pipeline video upload (212 total entries)</p>
          </div>

          <div className="grid grid-cols-4 gap-3">
            <div className="p-3 bg-container-low rounded-xl border border-container-high">
              <span className="text-xs text-on-surface/60 font-medium">Total Entry</span>
              <div className="text-lg font-bold text-primary mt-1">{videos.length}</div>
            </div>
            <div className="p-3 bg-container-low rounded-xl border border-container-high">
              <span className="text-xs text-on-surface/60 font-medium">Novel China</span>
              <div className="text-lg font-bold text-secondary mt-1">
                {videos.filter(v => v.category === 'NOVEL_CHINA').length}
              </div>
            </div>
            <div className="p-3 bg-container-low rounded-xl border border-container-high">
              <span className="text-xs text-on-surface/60 font-medium">Light Novel</span>
              <div className="text-lg font-bold text-tertiary mt-1">
                {videos.filter(v => v.category === 'LIGHT_NOVEL').length}
              </div>
            </div>
            <div className="p-3 bg-container-low rounded-xl border border-container-high">
              <span className="text-xs text-on-surface/60 font-medium">Uploaded</span>
              <div className="text-lg font-bold text-emerald-600 mt-1">
                {videos.filter(v => v.status === 'UPLOADED').length}
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center justify-between gap-4 bg-container-low p-2 rounded-xl border border-container-high">
          <div className="flex items-center gap-2 flex-1">
            <input
              type="text"
              placeholder="Cari berdasarkan judul atau series..."
              className="px-3 py-1.5 bg-white text-xs rounded-lg border border-container-high focus:outline-none focus:ring-1 focus:ring-primary flex-1"
              value={searchTerm}
              onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
            />
            <div className="flex gap-1">
              {['ALL', 'NOVEL_CHINA', 'LIGHT_NOVEL'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => { setCategoryFilter(cat); setCurrentPage(1); }}
                  className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                    categoryFilter === cat ? 'bg-primary text-white' : 'bg-white text-on-surface/70 hover:bg-container'
                  }`}
                >
                  {cat === 'ALL' ? 'Semua' : cat === 'NOVEL_CHINA' ? 'Novel China' : 'Light Novel'}
                </button>
              ))}
            </div>
          </div>
          <select
            value={statusFilter}
            onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(1); }}
            className="px-3 py-1.5 bg-white text-xs rounded-lg border border-container-high focus:outline-none text-on-surface/80"
          >
            <option value="ALL">Semua Status</option>
            <option value="PENDING">Belum Upload</option>
            <option value="UPLOADED">Sudah Upload</option>
          </select>
          <select
            value={sortOrder}
            onChange={(e) => { setSortOrder(e.target.value); setCurrentPage(1); }}
            className="px-3 py-1.5 bg-white text-xs rounded-lg border border-container-high focus:outline-none text-on-surface/80"
          >
            <option value="newest">Terbaru</option>
            <option value="oldest">Terlama</option>
          </select>
        </div>

        {/* Bulk Action Bar */}
        {selectedIds.size > 0 && (
          <div className="p-3 bg-blue-50 rounded-xl border border-blue-200 flex items-center justify-between">
            <span className="text-xs font-semibold text-blue-900">{selectedIds.size} item dipilih</span>
            <div className="flex gap-2">
              <button
                onClick={() => handleBulkStatusUpdate('UPLOADED')}
                className="px-3 py-1.5 bg-emerald-500 text-white text-xs rounded-lg hover:bg-emerald-600 transition-colors font-medium"
              >
                Tandai Sudah Upload
              </button>
              <button
                onClick={() => handleBulkStatusUpdate('PENDING')}
                className="px-3 py-1.5 bg-amber-500 text-white text-xs rounded-lg hover:bg-amber-600 transition-colors font-medium"
              >
                Tandai Belum Upload
              </button>
            </div>
          </div>
        )}

        {/* Table */}
        <div className="flex-1 bg-white rounded-xl border border-container-high overflow-hidden flex flex-col">
          <div className="overflow-x-auto flex-1">
            <table className="w-full text-left text-xs">
              <thead className="bg-container-low border-b border-container-high text-on-surface/60 uppercase font-semibold sticky top-0">
                <tr>
                  <th className="p-3 w-10">
                    <input
                      type="checkbox"
                      checked={isAllSelected}
                      onChange={(e) => toggleSelectAll(e.target.checked)}
                      className="w-4 h-4 cursor-pointer"
                    />
                  </th>
                  <th className="p-3 w-12">NO</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 w-28">Kategori</th>
                  <th className="p-3">Nama Video</th>
                  <th className="p-3">Tanggal & Waktu Upload</th>
                  <th className="p-3">Sisa Waktu</th>
                  <th className="p-3 w-40">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-container-high">
                {paginatedVideos.map((video, index) => (
                  <tr
                    key={video.id}
                    className={`hover:bg-container-low/50 transition-colors ${selectedIds.has(video.id) ? 'bg-blue-50' : ''}`}
                  >
                    <td className="p-3">
                      <input
                        type="checkbox"
                        checked={selectedIds.has(video.id)}
                        onChange={() => toggleSelectVideo(video.id)}
                        className="w-4 h-4 cursor-pointer"
                      />
                    </td>
                    <td className="p-3 font-semibold text-on-surface/60">{(currentPage - 1) * itemsPerPage + index + 1}</td>
                    <td className="p-3">
                      <span className={`px-2 py-1 rounded-full text-[10px] font-bold flex items-center gap-1 w-fit ${
                        video.status === 'UPLOADED' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {video.status === 'UPLOADED' && <span className="material-symbols-outlined text-sm">check_circle</span>}
                        {video.status === 'UPLOADED' ? 'Sudah Upload' : 'Belum Upload'}
                      </span>
                    </td>
                    <td className="p-3 whitespace-nowrap">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        video.category === 'NOVEL_CHINA' ? 'bg-blue-100 text-blue-800' : 'bg-emerald-100 text-emerald-800'
                      }`}>
                        {video.category === 'NOVEL_CHINA' ? 'Novel China' : 'Light Novel'}
                      </span>
                    </td>
                    <td className="p-3 font-semibold text-on-surface line-clamp-2">{video.title}</td>
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <span className="text-on-surface/80 font-mono text-xs">
                          {formatDate(video.uploadDate, video.uploadTime)}
                        </span>
                        <button
                          onClick={() => {
                            const dateOnly = video.uploadDate.split('-').reverse().join('/');
                            handleCopyToClipboard(dateOnly, video.id);
                          }}
                          title="Copy tanggal"
                          className={`p-1 rounded transition-all ${
                            copiedId === video.id 
                              ? 'bg-emerald-500/20 text-emerald-600' 
                              : 'bg-gray-200/50 text-on-surface/60 hover:bg-gray-300/70'
                          }`}
                        >
                          <span className="material-symbols-outlined text-sm">
                            {copiedId === video.id ? 'done' : 'content_copy'}
                          </span>
                        </button>
                      </div>
                    </td>
                    <td className="p-3 text-on-surface/80">
                      {video.status === 'UPLOADED' ? (
                        <span className="text-emerald-600 font-semibold">Selesai</span>
                      ) : (
                        <span className="text-amber-600 font-semibold">Menunggu</span>
                      )}
                    </td>
                    <td className="p-3">
                      <div className="flex gap-2">
                        <button
                          onClick={() => setSelectedVideo(video)}
                          title="Lihat detail"
                          className="p-1.5 bg-blue-500/10 text-blue-500 border border-blue-500 rounded hover:bg-blue-500/20 transition-colors"
                        >
                          <span className="material-symbols-outlined text-sm">visibility</span>
                        </button>
                        <button
                          onClick={() => openEditModal(video)}
                          title="Edit"
                          className="p-1.5 bg-amber-500/10 text-amber-500 border border-amber-500 rounded hover:bg-amber-500/20 transition-colors"
                        >
                          <span className="material-symbols-outlined text-sm">edit</span>
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setDeleteConfirmModal({ isOpen: true, videoId: video.id, videoTitle: video.title });
                          }}
                          title="Hapus"
                          className="p-1.5 bg-red-500/10 text-red-500 border border-red-500 rounded hover:bg-red-500/20 transition-colors"
                        >
                          <span className="material-symbols-outlined text-sm">delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="p-3 bg-container-low border-t border-container-high flex items-center justify-between text-xs text-on-surface/60">
            <span>Menampilkan {paginatedVideos.length} dari {sortedVideos.length} item</span>
            <div className="flex gap-1">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                className="px-2 py-1 bg-white rounded border border-container-high disabled:opacity-50"
              >
                Prev
              </button>
              <span className="px-2 py-1 font-semibold text-on-surface">{currentPage} / {totalPages || 1}</span>
              <button
                disabled={currentPage === totalPages || totalPages === 0}
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                className="px-2 py-1 bg-white rounded border border-container-high disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        </div>
          </>
        )}
    </div>

      {/* Detail Panel */}
      {selectedVideo && videos.length > 0 && (
        <div className="w-80 bg-container-low border border-container-high rounded-xl p-4 flex flex-col gap-4">
          <div className="flex items-center justify-between pb-2 border-b border-container-high">
            <h2 className="font-bold text-sm text-on-surface">Detail Video</h2>
            <button onClick={() => setSelectedVideo(null)} className="text-on-surface/50 hover:text-on-surface">
              <span className="material-symbols-outlined text-sm">close</span>
            </button>
          </div>
          <div className="flex flex-col gap-3 text-xs select-text">
            <div>
              <span className="text-on-surface/60 block">ID Video</span>
              <span className="font-mono font-semibold">{selectedVideo.id}</span>
            </div>
            <div>
              <span className="text-on-surface/60 block">Judul</span>
              <span className="font-semibold text-on-surface">{selectedVideo.title}</span>
            </div>
            <div>
              <span className="text-on-surface/60 block">Series</span>
              <span className="text-on-surface">{selectedVideo.series} (Part {selectedVideo.part})</span>
            </div>
            <div>
              <span className="text-on-surface/60 block">Kategori</span>
              <span className="text-on-surface">{selectedVideo.category === 'NOVEL_CHINA' ? 'Novel China' : 'Light Novel'}</span>
            </div>
            <div>
              <span className="text-on-surface/60 block">Jadwal Upload</span>
              <span className="text-on-surface font-mono">{formatDate(selectedVideo.uploadDate, selectedVideo.uploadTime)} WIB</span>
            </div>
            <div>
              <span className="text-on-surface/60 block">Status</span>
              <span className="font-bold text-primary">{selectedVideo.status === 'UPLOADED' ? 'Sudah Upload' : 'Belum Upload'}</span>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editingId && editForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-96 shadow-lg">
            <h2 className="text-lg font-bold text-on-surface mb-4">Edit Video</h2>
            
            <div className="flex flex-col gap-4">
              <div>
                <label className="text-xs font-semibold text-on-surface/70 block mb-1">Tanggal Upload (YYYY-MM-DD)</label>
                <input
                  type="date"
                  value={editForm.date}
                  onChange={(e) => setEditForm({ ...editForm, date: e.target.value })}
                  className="w-full px-3 py-2 border border-container-high rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-on-surface/70 block mb-1">Waktu Upload (HH:mm)</label>
                <input
                  type="time"
                  value={editForm.time}
                  onChange={(e) => setEditForm({ ...editForm, time: e.target.value })}
                  className="w-full px-3 py-2 border border-container-high rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-on-surface/70 block mb-1">Status</label>
                <select
                  value={editForm.status}
                  onChange={(e) => setEditForm({ ...editForm, status: e.target.value as 'PENDING' | 'UPLOADED' })}
                  className="w-full px-3 py-2 border border-container-high rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-primary"
                >
                  <option value="PENDING">Belum Upload</option>
                  <option value="UPLOADED">Sudah Upload</option>
                </select>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  onClick={handleEditSave}
                  className="flex-1 px-4 py-2 bg-primary text-white text-xs rounded-lg hover:bg-primary/90 transition-colors font-medium"
                >
                  Simpan
                </button>
                <button
                  onClick={() => {
                    setEditingId(null);
                    setEditForm(null);
                  }}
                  className="flex-1 px-4 py-2 bg-container-low text-on-surface text-xs rounded-lg hover:bg-container transition-colors font-medium"
                >
                  Batal
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={deleteConfirmModal.isOpen}
        type="danger"
        title="Hapus Data Video?"
        message={`Anda akan menghapus video "${deleteConfirmModal.videoTitle}". Tindakan ini tidak dapat dibatalkan.`}
        primaryButtonText="Hapus"
        secondaryButtonText="Batal"
        onPrimaryClick={() => {
          deleteVideo(deleteConfirmModal.videoId);
          setSelectedIds(prev => {
            const newSet = new Set(prev);
            newSet.delete(deleteConfirmModal.videoId);
            return newSet;
          });
          setDeleteConfirmModal({ isOpen: false, videoId: '', videoTitle: '' });
        }}
        onSecondaryClick={() => setDeleteConfirmModal({ isOpen: false, videoId: '', videoTitle: '' })}
      />
    </div>
  );
}
