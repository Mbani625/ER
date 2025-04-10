document.addEventListener('DOMContentLoaded', () => {
    const statInputs = document.querySelectorAll('.stat-control input');
  
    function updateDerivedStats() {
      const vigor = +document.querySelector('[data-stat="vigor"] input').value || 0;
      const mind = +document.querySelector('[data-stat="mind"] input').value || 0;
      const endurance = +document.querySelector('[data-stat="endurance"] input').value || 0;
      const arcane = +document.querySelector('[data-stat="arcane"] input').value || 0;
  
      // HP (Vigor)
      let hp;
      if (vigor <= 40) hp = 300 + vigor * 20;
      else if (vigor <= 60) hp = 1100 + (vigor - 40) * 5;
      else hp = 1200 + (vigor - 60) * 1;
  
      // FP (Mind)
      let fp;
      if (mind <= 30) fp = 40 + mind * 4;
      else fp = 160 + (mind - 30) * 2;
  
      // Stamina (Endurance)
      let stamina = 80 + Math.min(endurance, 50) * 1.5;
  
      // Equip Load (Endurance)
      let equipLoad = 30 + endurance * 1.4;
  
      // Discovery (Arcane)
      let discovery = 100 + arcane;
  
      // Update UI
      document.querySelector('.right-panel label:nth-of-type(1) span').textContent = `${Math.round(hp)} / ${Math.round(hp)}`;
      document.querySelector('.right-panel label:nth-of-type(2) span').textContent = `${Math.round(fp)} / ${Math.round(fp)}`;
      document.querySelector('.right-panel label:nth-of-type(3) span').textContent = `${Math.round(stamina)}`;
      document.querySelector('.right-panel label:nth-of-type(4) span').textContent = `${equipLoad.toFixed(1)} / ${(equipLoad * 1.6).toFixed(1)}`;
      document.querySelector('.right-panel label:nth-of-type(6) span').textContent = discovery.toFixed(1);
    }
  
    statInputs.forEach(input => {
      input.parentElement.querySelector('.increment')?.addEventListener('click', () => {
        input.value = Math.min(99, +input.value + 1);
        updateDerivedStats();
      });
  
      input.parentElement.querySelector('.decrement')?.addEventListener('click', () => {
        input.value = Math.max(1, +input.value - 1);
        updateDerivedStats();
      });
    });
  
    // Also trigger stat update after base class selection
    document.getElementById('baseBuild')?.addEventListener('change', () => {
      setTimeout(updateDerivedStats, 100);
    });
  
    updateDerivedStats();
  });
  