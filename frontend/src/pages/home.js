import React from 'react';
import FeaturedVideo from '../components/FeaturedVideo';
import VideoList from '../components/videoList';

function Home({ videos, openPlayer, featured }) {
  return (
    <main>
      <section id="featured">
        {featured && <FeaturedVideo video={featured} openPlayer={openPlayer} />}
      </section>
      <h3 className="gallery-subtitle" id="gallerySubtitle">Vídeos Rescentes</h3>
      <section id="gallery" className="gallery">
        <VideoList videos={videos} openPlayer={openPlayer} />
      </section>
    </main>
  );
}

export default Home;