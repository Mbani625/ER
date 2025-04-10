let classData = {};

// Load class data from JSON
fetch('data/classes.json')
  .then(res => res.json())
  .then(data => {
    // Store classes by lowercase name for easy lookup
    data.forEach(c => {
      classData[c.name.toLowerCase()] = c;
    });
  })
  .catch(err => console.error("Failed to load class data:", err));

// When the dropdown changes
document.addEventListener('DOMContentLoaded', () => {
  const classSelect = document.getElementById('baseBuild');

  if (!classSelect) return;

  classSelect.addEventListener('change', (e) => {
    const selected = e.target.value.toLowerCase();
    const cls = classData[selected];

    if (!cls) return;

    // Update level
    document.querySelector('[data-stat="level"] input').value = cls.stats.level;

    // Update attributes
    Object.entries(cls.stats).forEach(([stat, value]) => {
      if (stat === "level") return;
      const input = document.querySelector(`[data-stat="${stat.toLowerCase()}"] input`);
      if (input) input.value = value;
    });
  });
});
