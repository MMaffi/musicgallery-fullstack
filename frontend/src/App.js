import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import FeaturedVideo from './components/FeaturedVideo';
import VideoList from './components/VideoList';
import Footer from './components/Footer';
import SettingsModal from './components/SettingsModal';

function App() {
  const [videos, setVideos] = useState([]);
  const [showPlayer, setShowPlayer] = useState(false);
  const [playerVideo, setPlayerVideo] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3000/api/youtube')
      .then((res) => res.json())
      .then(setVideos)
      .catch((err) => console.error('Erro ao buscar vídeos:', err));
  }, []);

  const featured = videos[0];
  const recent = videos.slice(1);

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
          <VideoList videos={recent} openPlayer={openPlayer} />
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