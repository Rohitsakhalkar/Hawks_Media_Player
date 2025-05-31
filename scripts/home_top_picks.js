import { songs } from '../songs/songsmp.js';
//for home to pick 6 random songs to display everytime the page refreshes 
function getTopPicks(count = 6) {
  const allSongs = Object.entries(songs);
  const shuffled = allSongs.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

const topPicksDiv = document.querySelector('.top_picks');
const topPicks = getTopPicks();
//to display each item in the top picks dynamically 
topPicks.forEach(([key,song]) => {
  const card = document.createElement('div');
  card.className = 'top_pick';
 card.innerHTML = `
  <a href="../pages/player.html?song=${encodeURIComponent(key)}" class="song-card">
    <div class="cover-wrapper">
      <img src="${song.cover}" alt="${song.title}" class="cover" />
      <div class="play-icon">▶</div>
      <h3>${song.title}</h3>
    </div>
  </a>
`;
  topPicksDiv.appendChild(card);
});
