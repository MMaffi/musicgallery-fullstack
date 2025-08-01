import React, { useEffect, useState } from 'react';

function App() {
	const [musics, setMusics] = useState([]);

	useEffect(() => {
		fetch('http://localhost:3000/api/youtube')
		.then((res) => res.json())
		.then((data) => setMusics(data))
		.catch((err) => console.error('Erro ao buscar músicas:', err));
	}, []);

	return (
		<div className="App" style={{ padding: '20px' }}>
		<h1>Music Gallery</h1>
		<div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
			{musics.map((music) => (
			<div key={music.id} style={{ border: '1px solid #ccc', padding: '10px', width: '250px' }}>
				<img src={music.thumbnail_url} alt={music.title} style={{ width: '100%' }} />
				<h3>{music.title}</h3>
				<p>{music.artist}</p>
				<p>Views: {music.views}</p>
				<a href={music.video_url} target="_blank" rel="noreferrer">Assistir no YouTube</a>
			</div>
			))}
		</div>
		</div>
	);
}

export default App;