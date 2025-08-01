import React from 'react';
import '../styles/style.css';

function FeaturedVideo({ video, openPlayer }) {
  if (!video) return null;
  return (
    <div className="featured-video">
      <img src={video.thumbnail_url} alt={video.title} className="featured-thumbnail" />
      <div className="featured-info">
        <h2>{video.title}</h2>
        <button className="featured-play-btn" onClick={() => openPlayer(video)}>
          ASSISTIR
        </button>
      </div>
    </div>
  );
}

export default FeaturedVideo;