document.addEventListener('DOMContentLoaded', () => {
  const colorBox = document.getElementById('color-box');
  const changeBtn = document.getElementById('change-color-btn');

  if (!colorBox || !changeBtn) return;

  // Generates a random hex color like #a3f4c1
  function getRandomColor() {
    const hex = Math.floor(Math.random() * 0xffffff).toString(16);
    return `#${hex.padStart(6, '0')}`;
  }

  // Convert rgb(...) string to hex if needed
  function rgbStringToHex(rgb) {
    const m = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    if (!m) return null;
    const r = parseInt(m[1], 10);
    const g = parseInt(m[2], 10);
    const b = parseInt(m[3], 10);
    return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
  }

  // Return black or white depending on background luminance for contrast
  function contrastColor(hex) {
    const h = hex.replace('#','');
    const r = parseInt(h.substr(0,2),16);
    const g = parseInt(h.substr(2,2),16);
    const b = parseInt(h.substr(4,2),16);
    // relative luminance
    const luminance = (0.299*r + 0.587*g + 0.114*b)/255;
    return luminance > 0.6 ? '#000000' : '#ffffff';
  }

  // Update box display with given hex color
  function applyColor(hex) {
    colorBox.style.backgroundColor = hex;
    colorBox.textContent = hex.toUpperCase();
    colorBox.style.color = contrastColor(hex);
  }

  // Initialize display to current background color
  const initialBg = window.getComputedStyle(colorBox).backgroundColor;
  const initialHex = initialBg.startsWith('rgb') ? (rgbStringToHex(initialBg) || '#E0E0E0') : initialBg;
  applyColor(initialHex);

  changeBtn.addEventListener('click', () => {
    const newColor = getRandomColor();
    applyColor(newColor);
  });
});