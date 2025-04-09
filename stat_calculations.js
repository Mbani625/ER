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
  
  function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
  }
  
  function updateLevel() {
    const total = ATTRIBUTES.reduce((sum, stat) => {
      const input = document.querySelector(`input[name="${stat}"]`);
      return sum + parseInt(input.value, 10);
    }, 0);
  
    const levelInput = document.querySelector('input[name="level"]');
    levelInput.value = total;
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
        });
      }
  
      if (decrement) {
        decrement.addEventListener('click', () => {
          let value = parseInt(input.value, 10) || 0;
          input.value = clamp(value - 1, 0, 99);
          updateLevel();
        });
      }
    });
  }
  
  // Auto-run on page load
  document.addEventListener('DOMContentLoaded', () => {
    setupStatControls();
    updateLevel();
  });
  