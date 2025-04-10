const ATTRIBUTES = [
  'vigor',
  'mind',
  'endurance',
  'strength',
  'dexterity',
  'intelligence',
  'faith',
  'arcane'
];

let baseStats = {};
let baseLevel = 1;

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function updateLevel() {
  const levelInput = document.querySelector('input[name="level"]');
  let totalIncrease = 0;

  ATTRIBUTES.forEach(stat => {
    const input = document.querySelector(`input[name="${stat}"]`);
    const current = parseInt(input.value, 10);
    const base = baseStats[stat] || 0;
    totalIncrease += current - base;
  });

  levelInput.value = baseLevel + totalIncrease;
}

function setupStatControls() {
  ATTRIBUTES.forEach(stat => {
    const container = document.querySelector(`.stat-control[data-stat="${stat}"]`);
    const input = container.querySelector('input');
    const increment = container.querySelector('.increment');
    const decrement = container.querySelector('.decrement');

    if (increment) {
      increment.addEventListener('click', () => {
        let value = parseInt(input.value, 10) || 0;
        input.value = clamp(value + 1, 0, 99);
        updateLevel();
        input.dispatchEvent(new Event('input')); // 👈 manually trigger input event
      });
    }

    if (decrement) {
      decrement.addEventListener('click', () => {
        let value = parseInt(input.value, 10) || 0;
        const base = baseStats[stat] || 0;
        input.value = clamp(value - 1, base, 99);
        updateLevel();
        input.dispatchEvent(new Event('input')); // 👈 manually trigger input event
      });
    }
  });
}


function applyBaseStats(stats) {
  baseLevel = stats.level;
  baseStats = { ...stats };
  delete baseStats.level;
  updateLevel();
}

// Export so classSelector.js can use it
window.applyBaseStats = applyBaseStats;

// Auto-run on page load
document.addEventListener('DOMContentLoaded', () => {
  setupStatControls();
});
