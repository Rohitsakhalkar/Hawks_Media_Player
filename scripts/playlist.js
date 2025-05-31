import { songs } from '../songs/songsmp.js';
//gets playlists 
function getPlaylists() {
  return JSON.parse(localStorage.getItem('playlists') || '{}');
}
//saves the songs in the playlist or updates the playlist
function savePlaylists(playlists) {
  localStorage.setItem('playlists', JSON.stringify(playlists));
}
//displays playlist with songs and a play button to play the songs from the playlist and a delete button to delete a playlist
function renderPlaylists() {
  const playlists = getPlaylists();
  const playlistsDiv = document.getElementById('playlists');
  playlistsDiv.innerHTML = Object.keys(playlists).length === 0
    ? '<p>No playlists yet.</p>'
    : Object.keys(playlists).map(name => `
      <div class="playlist_card" >
        <h3 class="playlist_name">${name}</h3>
        <ul class="playlist_listid">
          ${playlists[name].map(songKey => {
            const song = songs[songKey];
            if (!song) return `<li>${songKey}</li>`;
            return `<li style="display:flex;align-items:center;gap:8px;">
              <img src="${song.cover}" alt="${song.title}" style="width:32px;height:32px;object-fit:cover;border-radius:4px;">
              <span>${song.title}</span>
            </li>`;
          }).join('')}
        </ul>
        <button class="playlist_btn" onclick="deletePlaylist('${name}')">Delete</button>
        <a href="../pages/player.html?playlist=${encodeURIComponent(name)}&song=${encodeURIComponent(playlists[name][0] || '')}">
        <button class="playlist_btn">Play</button>
      </a>
      </div>
    `).join('');
  playlistsDiv.classList.toggle("playlist_lists");
}
//creation of playlist
document.getElementById('create_playlist_btn').onclick = () => {
  const name = document.getElementById('new_playlist_name').value.trim();
  if (!name) return;
  const playlists = getPlaylists();
  if (!playlists[name]) playlists[name] = [];
  else alert("playlist exist");
  savePlaylists(playlists);
  renderPlaylists();
  document.getElementById('new_playlist_name').value = '';
};
renderPlaylists();
populateDropdowns();

//deletion of playlist
window.deletePlaylist = function(name) {
  const playlists = getPlaylists();
  delete playlists[name];
  savePlaylists(playlists);
  renderPlaylists();
};


//function for dropdown menu to add songs in the playlist
function populateDropdowns() {
  const songSelector = document.getElementById('song_selector');
  const playlistSelector = document.getElementById('playlist_selector');

  
  Object.keys(songs).forEach(songName => {
    const option = document.createElement('option');
    option.value = songName;
    option.textContent = songName;
    songSelector.appendChild(option);
    option.classList.toggle("option_songs");
  });

 
  const playlists = getPlaylists();
  Object.keys(playlists).forEach(playlistName => {
    const option = document.createElement('option');
    option.value = playlistName;
    option.textContent = playlistName;
    playlistSelector.appendChild(option);
    option.classList.toggle("option_songs");
  });
}
//button to add song in the playlist
document.getElementById('add_song_btn').onclick = () => {
  const song = document.getElementById('song_selector').value;
  const playlist = document.getElementById('playlist_selector').value;

  if (!song || !playlist) return;
 
  const playlists = getPlaylists();
  if (!playlists[playlist].includes(song)) {
    playlists[playlist].push(song);
    savePlaylists(playlists);
    renderPlaylists();
  }
  else alert("Song already exist in playlists");
};
