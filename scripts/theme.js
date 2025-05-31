//To change and save the theme for user
const themeSelector = document.getElementById('themes');

themeSelector.addEventListener('change', function () {
  const theme = this.value;
  document.body.className = ''; 

  if (theme !== 'default') {
    document.body.classList.add(theme);
  }

  localStorage.setItem('theme', theme); 
});

// On page load and apply saved theme
window.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('theme') || 'default';
  if (savedTheme !== 'default') {
    document.body.classList.add(savedTheme);
  }
  themeSelector.value = savedTheme;
});
