document.addEventListener('DOMContentLoaded', () => {
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

    // Update UI via data-labels
    const setLabel = (label, value) => {
      const el = document.querySelector(`[data-label="${label}"] span`);
      if (el) el.textContent = value;
    };

    setLabel("hp", `${Math.round(hp)} / ${Math.round(hp)}`);
    setLabel("fp", `${Math.round(fp)} / ${Math.round(fp)}`);
    setLabel("stamina", `${Math.round(stamina)}`);
    setLabel("equip-load", `${equipLoad.toFixed(1)} / ${(equipLoad * 1.6).toFixed(1)}`);
    setLabel("discovery", discovery.toFixed(1));
    setLabel("poise", "0");
    setLabel("memory-slots", "0");
  }

  // Use input event listeners instead of MutationObserver
  document.querySelectorAll('.stat-control input').forEach(input => {
    input.addEventListener('input', updateDerivedStats);
  });

  document.getElementById('baseBuild')?.addEventListener('change', () => {
    setTimeout(updateDerivedStats, 100);
  });

  updateDerivedStats();
});

  