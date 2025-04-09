document.querySelectorAll('.equipment-slot').forEach(slot => {
    slot.addEventListener('click', function() {
      const equipmentType = this.id;
      // Placeholder for equipment selection logic
      alert(`Select equipment for ${equipmentType}`);
    });
  });
  