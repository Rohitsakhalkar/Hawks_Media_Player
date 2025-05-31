import { songs } from '../songs/songsmp.js'; 

const audi = document.getElementById("audis");
const progress = document.getElementById("timer");
const currentTimeEl = document.getElementById("currentTime");
const totalTimeEl = document.getElementById("totalTime");
const songTitle = document.getElementById("song_play");
const songImg = document.getElementById("player_img");
const btnForward = document.getElementById("forward");
const btnBackward = document.getElementById("backward");
const playbtn = document.getElementById("play");
const playicon = document.getElementById("playicon");

const urlParams = new URLSearchParams(window.location.search);
const playlistName = urlParams.get('playlist');
const songKey = urlParams.get('song');
const allSongKeys = Object.keys(songs);

let songKeys = allSongKeys;
let currentIndex = 0;

// Play the songs from playlist 
if (playlistName) {
  const playlists = JSON.parse(localStorage.getItem('playlists') || '{}');
  if (playlists[playlistName] && playlists[playlistName].length > 0) {
    songKeys = playlists[playlistName];
    currentIndex = songKey ? songKeys.indexOf(songKey) : 0;
    if (currentIndex === -1) currentIndex = 0;
  }
} else if (songKey && allSongKeys.includes(songKey)) {
  currentIndex = allSongKeys.indexOf(songKey);
  songKeys = allSongKeys;
}
//checks if audio is playing or not and set the svg for play and pause
function player() {
  if (audi.paused) {
    audi.play();
    setPauseIcon();
  } else {
    audi.pause();
    setplayicon();
  }
}
window.player = player;
//play button
function setplayicon(){
  playicon.innerHTML='<svg width="30px" height="35px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M20.4086 9.35258C22.5305 10.5065 22.5305 13.4935 20.4086 14.6474L7.59662 21.6145C5.53435 22.736 3 21.2763 3 18.9671L3 5.0329C3 2.72368 5.53435 1.26402 7.59661 2.38548L20.4086 9.35258Z" stroke="#000000" stroke-width="2.5"></path> </g></svg>';
}
//pause button 
function setPauseIcon(){
  playicon.innerHTML='<svg width="30px" height="35px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M8 5V19M16 5V19" stroke="#000000" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>';
}
//load songs and all the information from songsmp.js
function loadSong(index) {
  if (index < 0 || index >= songKeys.length) return;
  const key = songKeys[index];
  const song = songs[key];
  songTitle.textContent = song.title;
  songImg.src = song.cover;
  audi.src = song.file;
  audi.load();
}
//button to play next song
btnForward.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % songKeys.length;
  loadSong(currentIndex);
  audi.play();
  setPauseIcon();
});
//button to play previous song
btnBackward.addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + songKeys.length) % songKeys.length;
  loadSong(currentIndex);
  audi.play();
  setPauseIcon();
});
//formats time in minutes and seconds
function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}
//loads metadata or audio to play
audi.addEventListener("loadedmetadata", () => {
  if (!isNaN(audi.duration) && isFinite(audi.duration)) {
    progress.max = Math.floor(audi.duration);
    totalTimeEl.textContent = formatTime(audi.duration);
  }
});
//updates the time in timer
audi.addEventListener("timeupdate", () => {
  if (!progress.dragging) {
    progress.value = audi.currentTime;
    currentTimeEl.textContent = formatTime(audi.currentTime);
  }
});

progress.addEventListener("input", () => {
  audi.currentTime = progress.value;
});

loadSong(currentIndex);  // 🎧 Load on page open
//volume functions changes the value 
window.setVolume = function(e) {
  const slider = e.currentTarget;
  const level = document.getElementById('volumelevel'); // Be careful with the casing here
  const rect = slider.getBoundingClientRect(); // typo was here: getBoundingClient**React**
  const clickY = e.clientY - rect.top;
  const height = slider.offsetHeight; // typo was here: offdetHeight
  const percent = 1 - clickY / height;
  const clamped = Math.max(0, Math.min(percent, 1));
  level.style.height = `${clamped * 100}%`;

  const volume = clamped;
  const display = document.getElementById('volumeDisplay');
if (display) {
  display.textContent = `${Math.round(volume * 100)}%`;
}
  console.log('Volume:', volume);
    audi.volume = volume;
}