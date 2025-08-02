import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar';
import Footer from './components/footer';
import SettingsModal from './components/SettingsModal';

import Home from './pages/home';
import VideosPage from './pages/videospage';
import AboutPage from './pages/aboutpage';
import SuggestionsPage from './pages/suggestionspage';

import RegisterPage from './pages/registerpage';

const mockVideos = [
  {
    id: 'dQw4w9WgXcQ',
    title: 'Rick Astley - Never Gonna Give You Up',
    artist: 'Rick Astley',
    thumbnail_url: 'https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg',
    video_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    publishedAt: '1987-10-25T00:00:00Z',
    views: 9999999
  },
  {
    id: '3JZ_D3ELwOQ',
    title: 'Mark Ronson - Uptown Funk ft. Bruno Mars',
    artist: 'Mark Ronson',
    thumbnail_url: 'https://img.youtube.com/vi/3JZ_D3ELwOQ/hqdefault.jpg',
    video_url: 'https://www.youtube.com/watch?v=3JZ_D3ELwOQ',
    publishedAt: '2014-11-19T00:00:00Z',
    views: 8888888
  },
  {
    id: 'dQw4w9WgXcQ',
    title: 'Rick Astley - Never Gonna Give You Up',
    artist: 'Rick Astley',
    thumbnail_url: 'https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg',
    video_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    publishedAt: '1987-10-25T00:00:00Z',
    views: 9999999
  },
  {
    id: '3JZ_D3ELwOQ',
    title: 'Mark Ronson - Uptown Funk ft. Bruno Mars',
    artist: 'Mark Ronson',
    thumbnail_url: 'https://img.youtube.com/vi/3JZ_D3ELwOQ/hqdefault.jpg',
    video_url: 'https://www.youtube.com/watch?v=3JZ_D3ELwOQ',
    publishedAt: '2014-11-19T00:00:00Z',
    views: 8888888
  },
  {
    id: 'dQw4w9WgXcQ',
    title: 'Rick Astley - Never Gonna Give You Up',
    artist: 'Rick Astley',
    thumbnail_url: 'https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg',
    video_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    publishedAt: '1987-10-25T00:00:00Z',
    views: 9999999
  },
];

function App() {
  // const [videos, setVideos] = useState([]);
  // const [showPlayer, setShowPlayer] = useState(false);
  // const [playerVideo, setPlayerVideo] = useState(null);

  // useEffect(() => {
  //   fetch('http://localhost:3000/api/youtube')
  //     .then((res) => res.json())
  //     .then(setVideos)
  //     .catch((err) => console.error('Erro ao buscar vídeos:', err));
  // }, []);

  // const [featured, setFeatured] = useState(null);

  // useEffect(() => {
  //   fetch('http://localhost:3000/api/youtube')
  //     .then((res) => res.json())
  //     .then(videos => {
  //       setVideos(videos);
  //       if (videos.length > 0) {
  //         const randomIndex = Math.floor(Math.random() * videos.length);
  //         setFeatured(videos[randomIndex]);
  //       }
  //     })
  //     .catch((err) => console.error('Erro ao buscar vídeos:', err));
  // }, []);
  // const recent = videos;

  const [videos] = useState(mockVideos);
  const [showPlayer, setShowPlayer] = useState(false);
  const [playerVideo, setPlayerVideo] = useState(null);
  const [featured, setFeatured] = useState(null);

  useEffect(() => {
    if (videos.length > 0) {
      const randomIndex = Math.floor(Math.random() * videos.length);
      setFeatured(videos[randomIndex]);
    }
  }, [videos]);

  useEffect(() => {
    if (showPlayer) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    // Limpa ao desmontar
    return () => {
      document.body.style.overflow = '';
    };
  }, [showPlayer]);

  const openPlayer = (video) => {
    setPlayerVideo(video);
    setShowPlayer(true);
  };

  const closePlayer = () => {
    setShowPlayer(false);
    setPlayerVideo(null);
  };

  return (
    <Router>
      <div className="app">
        <Routes>
          <Route
            path="/"
            element={<Navbar />}
          />
          <Route
            path="/videos"
            element={
              <Navbar subtitle="Todos os Vídeos" />
            }
          />
          <Route
            path="/about"
            element={
              <Navbar subtitle="Sobre" />
            }
          />
          <Route
            path="/suggestions"
            element={
              <Navbar subtitle="Sugestões" />
            }
          />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>

        <Routes>
          <Route path="/" element={<Home videos={videos} openPlayer={openPlayer} featured={featured} />} />
          <Route path="/videos" element={<VideosPage videos={videos} openPlayer={openPlayer} />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/suggestions" element={<SuggestionsPage />} />
        </Routes>
        {showPlayer && playerVideo && (
          <div id="player-modal" className="modal">
            <div className="modal-content">
              <span className="close-button" onClick={closePlayer}>&times;</span>
              <h2 id="player-title">{playerVideo.title}</h2>
              <div id="player-meta">
                <span id="player-views">{playerVideo.views} views</span>
                <span id="player-date" className="modal-date">
                  {playerVideo.publishedAt
                    ? new Date(playerVideo.publishedAt).toLocaleDateString()
                    : ''}
                </span>
              </div>
              <iframe
                id="videoPlayer"
                width="100%"
                height="400"
                src={`https://www.youtube.com/embed/${playerVideo.id}`}
                frameBorder="0"
                allowFullScreen
                title={playerVideo.title}
              />
            </div>
          </div>
        )}
        <Footer />
        <SettingsModal />
      </div>
    </Router>
  );
}

export default App;