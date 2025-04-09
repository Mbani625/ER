document.querySelectorAll('.spell-slot').forEach(slot => {
    slot.addEventListener('click', function() {
      const spellType = this.id;
      // Placeholder for equipment selection logic
      alert(`Select spell for ${spellType}`);
    });
  });