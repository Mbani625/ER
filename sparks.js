const canvas = document.getElementById('sparkCanvas');
const ctx = canvas.getContext('2d');

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resize();
window.addEventListener('resize', resize);

// -- Spark Pool --
const sparks = [];
const MAX_SPARKS = 100;
const BASE_SPARKS = 75;

class Spark {
  constructor(isBig = false) {
    this.reset(isBig);
  }

  reset(isBig = false) {
    const centerBias = (Math.random() + Math.random()) / 2 - 0.5;
    const range = canvas.width;
    this.x = canvas.width / 2 + centerBias * range;
    this.y = canvas.height;
    this.life = 0;
    this.offset = Math.random() * 1000;
    this.wiggle = Math.random() * 0.05 + 0.01;

    if (isBig) {
      this.size = 5 + Math.random() * 3;
      this.speed = 8 + Math.random() * 2;
      this.maxLife = 60 + Math.random() * 30;
      this.color = 180 + Math.floor(Math.random() * 75);
    } else {
      this.size = Math.random() * 2 + 1;
      this.speed = 6 - this.size;
      this.maxLife = 100 + Math.random() * 50;
      this.color = 100 + Math.floor(Math.random() * 80);
    }
  }

  update() {
    this.y -= this.speed;
    this.x += Math.sin(this.life * this.wiggle + this.offset) * 1.5;
    this.life++;
    if (this.life > this.maxLife || this.y < 0) {
      this.reset(); // reuse, not remove
    }
  }

  draw() {
    const fade = Math.max(0, (this.y - canvas.height * 0.4) / (canvas.height * 0.6));
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, ${this.color}, 0, ${fade})`;
    ctx.shadowColor = `rgba(255, 140, 0, ${fade})`;
    ctx.shadowBlur = 8;
    ctx.fill();
  }
}

// -- Initialize --
function createInitialSparks() {
  for (let i = 0; i < BASE_SPARKS; i++) {
    sparks.push(new Spark());
  }
}

// -- Add Rare Burst Spark --
function maybeAddBigSpark() {
  if (Math.random() < 0.015 && sparks.length < MAX_SPARKS) {
    sparks.push(new Spark(true));
  }
}

// -- Main Loop --
let lastTime = 0;
function animate(time) {
  if (time - lastTime < 16) return requestAnimationFrame(animate); // ~60 FPS cap
  lastTime = time;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.globalCompositeOperation = 'lighter';
  sparks.forEach(spark => {
    spark.update();
    spark.draw();
  });
  ctx.globalCompositeOperation = 'source-over';

  maybeAddBigSpark();
  requestAnimationFrame(animate);
}

createInitialSparks();
animate();
