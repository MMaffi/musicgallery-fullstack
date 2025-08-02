import React from 'react';
import VideoList from '../components/videoList';

function VideosPage({ videos, openPlayer }) {
  return (
    <main>
      <section id="gallery" className="gallery">
        <VideoList videos={videos} openPlayer={openPlayer} />
      </section>
    </main>
  );
}

export default VideosPage;