import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import FeaturedVideo from './components/FeaturedVideo';
import VideoList from './components/VideoList';
import Footer from './components/Footer';
import SettingsModal from './components/SettingsModal';

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
    id: '3JZ_D3ELwOQ',
    title: 'Mark Ronson - Uptown Funk ft. Bruno Mars',
    artist: 'Mark Ronson',
    thumbnail_url: 'https://img.youtube.com/vi/3JZ_D3ELwOQ/hqdefault.jpg',
    video_url: 'https://www.youtube.com/watch?v=3JZ_D3ELwOQ',
    publishedAt: '2014-11-19T00:00:00Z',
    views: 8888888
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
    id: '3JZ_D3ELwOQ',
    title: 'Mark Ronson - Uptown Funk ft. Bruno Mars',
    artist: 'Mark Ronson',
    thumbnail_url: 'https://img.youtube.com/vi/3JZ_D3ELwOQ/hqdefault.jpg',
    video_url: 'https://www.youtube.com/watch?v=3JZ_D3ELwOQ',
    publishedAt: '2014-11-19T00:00:00Z',
    views: 8888888
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

  const openPlayer = (video) => {
    setPlayerVideo(video);
    setShowPlayer(true);
  };

  const closePlayer = () => {
    setShowPlayer(false);
    setPlayerVideo(null);
  };

  return (
    <div className="app">
      <Navbar />
      <main>
        <section id="featured">
          {featured && <FeaturedVideo video={featured} openPlayer={openPlayer} />}
        </section>
        <h3 className="gallery-subtitle" id="gallerySubtitle">Vídeos Rescentes</h3>
        <section id="gallery" className="gallery">
          <VideoList videos={videos} openPlayer={openPlayer} />
        </section>
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
      </main>
      <Footer />
      <SettingsModal />
    </div>
  );
}

export default App;