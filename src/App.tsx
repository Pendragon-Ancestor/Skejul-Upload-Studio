import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { ThemeProvider } from './context/ThemeContext';
import { Header } from './components/Layout/Header';
import { Sidebar } from './components/Layout/Sidebar';
import { DaftarVideo } from './components/pages/DaftarVideo/DaftarVideo';
import { KalenderUpload } from './components/pages/KalenderUpload/KalenderUpload';
import { TambahJadwal } from './components/pages/TambahJadwal/TambahJadwal';
import { Statistik } from './components/pages/Statistik/Statistik';
import './App.css';

function App() {
  return (
    <AppProvider>
      <ThemeProvider>
        <Router>
          <div className="flex h-screen bg-surface text-on-surface font-sans overflow-hidden">
            <Sidebar />
            <div className="flex-1 flex flex-col min-w-0">
              <Header />
              <main className="flex-1 overflow-auto p-6 transition-all duration-300">
                <Routes>
                  <Route path="/" element={<DaftarVideo />} />
                  <Route path="/calendar" element={<KalenderUpload />} />
                  <Route path="/add" element={<TambahJadwal />} />
                  <Route path="/stats" element={<Statistik />} />
                  <Route path="/daftar-video" element={<DaftarVideo />} />
                  <Route path="/kalender-upload" element={<KalenderUpload />} />
                  <Route path="/tambah-jadwal" element={<TambahJadwal />} />
                  <Route path="/statistik" element={<Statistik />} />
                </Routes>
              </main>
            </div>
          </div>
        </Router>
      </ThemeProvider>
    </AppProvider>
  );
}

export default App;