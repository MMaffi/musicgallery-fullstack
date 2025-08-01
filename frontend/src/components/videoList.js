import React from 'react';
import '../styles/style.css';

function VideoList({ videos, openPlayer }) {
  if (!videos || videos.length === 0) return <p>Nenhum vídeo encontrado.</p>;
  return (
    <div className="video-list">
      {videos.map((video) => (
        <div key={video.id} className="video-card" onClick={() => openPlayer(video)}>
          <img
            src={video.thumbnail_url}
            alt={video.title}
            className="video-thumb"
            onError={e => { e.target.src = '/assets/images/no-image.png'; }}
          />
          <div className="video-info">
            <h4>{video.title}</h4>
            <span>{video.views} views</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default VideoList;