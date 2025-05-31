import { songs } from '../songs/songsmp.js';

const songsList = document.getElementById('song_list');
const songKeys = Object.keys(songs);
const searchInput = document.getElementById('song_search');
//search option for songs
function renderSongs(filterText = '') {
  const filteredKeys = songKeys.filter(key => {
    const song = songs[key];
    const searchText = filterText.toLowerCase();
    return (
      song.title.toLowerCase().includes(searchText) ||
      song.artist.toLowerCase().includes(searchText)
    );
  });
//creates the song list to play songs 
  songsList.innerHTML = filteredKeys.map(key => {
    const song = songs[key];
    return `
      <div class="song_player_card" style="display:flex;align-items:center;gap:12px;margin:12px 0;cursor:pointer;" data-key="${key}">
        <img src="${song.cover}" alt="${song.title}" style="width:50px;height:50px;object-fit:cover;border-radius:8px;">
        <div>
          <div class="song_player_card" style="font-weight:bold;">${song.title}</div>
          <div class="song_player_card" style="font-size:0.9em;">${song.artist}</div>
        </div>
      </div>
    `;
  }).join('');

}

// Render all songs initially
renderSongs();

//  Search filter event
searchInput.addEventListener('input', () => {
  renderSongs(searchInput.value);
});

//  Click to play
songsList.addEventListener('click', function(e) {
  let card = e.target.closest('.song_player_card');
  if (card) {
    const key = card.getAttribute('data-key');
    window.location.href = `player.html?song=${encodeURIComponent(key)}`;
  }
});
