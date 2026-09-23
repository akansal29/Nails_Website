/* ==========================================================================
   Polish Catch — move the paddle to catch falling bottles, miss 3 and lose.
   ========================================================================== */

(function () {
  "use strict";

  let started = false;

  function initCatch() {
    if (started) return;
    started = true;

    const canvas = document.getElementById("catchcv");
    const ctx = canvas.getContext("2d");
    const W = canvas.width;
    const H = canvas.height;

    let paddleX = W / 2;
    const paddleW = 60;
    let drops = [];
    let score = 0;
    let lives = 3;
    let running = true;
    let spawnTimer = 0;

    const scoreEl = document.getElementById("catch-score");
    const livesEl = document.getElementById("catch-lives");

    function reset() {
      drops = [];
      score = 0;
      lives = 3;
      running = true;
      spawnTimer = 0;
      scoreEl.textContent = "Score: 0";
      livesEl.textContent = "Lives: 3";
    }

    function spawn() {
      drops.push({
        x: 20 + Math.random() * (W - 40),
        y: -20,
        speed: 2 + Math.random() * 2,
      });
    }

    function loop() {
      ctx.clearRect(0, 0, W, H);

      // ground line
      ctx.strokeStyle = "rgba(0,0,0,.2)";
      ctx.beginPath();
      ctx.moveTo(0, H - 30);
      ctx.lineTo(W, H - 30);
      ctx.stroke();

      if (running) {
        spawnTimer++;
        if (spawnTimer > 55) {
          spawn();
          spawnTimer = 0;
        }
        drops.forEach((d) => (d.y += d.speed));
        drops = drops.filter((d) => {
          const caught = d.y > H - 38 && d.y < H - 14 && Math.abs(d.x - paddleX) < paddleW / 2 + 10;
          if (caught) {
            score++;
            scoreEl.textContent = "Score: " + score;
            return false;
          }
          if (d.y > H + 20) {
            lives--;
            livesEl.textContent = "Lives: " + lives;
            if (lives <= 0) running = false;
            return false;
          }
          return true;
        });
      }

      // drops (plain shapes for now — swap for real art once styled)
      ctx.fillStyle = "#4fd1b5";
      drops.forEach((d) => {
        ctx.beginPath();
        ctx.arc(d.x, d.y, 10, 0, Math.PI * 2);
        ctx.fill();
      });

      // paddle
      ctx.fillStyle = "#333";
      ctx.fillRect(paddleX - paddleW / 2, H - 22, paddleW, 10);

      if (!running) {
        ctx.fillStyle = "rgba(0,0,0,.6)";
        ctx.fillRect(0, 0, W, H);
        ctx.fillStyle = "#fff";
        ctx.textAlign = "center";
        ctx.font = "bold 22px sans-serif";
        ctx.fillText("Game over!", W / 2, H / 2 - 14);
        ctx.font = "16px sans-serif";
        ctx.fillText("Score: " + score, W / 2, H / 2 + 16);
      }

      requestAnimationFrame(loop);
    }

    function setPaddle(clientX) {
      const rect = canvas.getBoundingClientRect();
      const scale = W / rect.width;
      paddleX = Math.max(20, Math.min(W - 20, (clientX - rect.left) * scale));
    }

    canvas.addEventListener("mousemove", (e) => setPaddle(e.clientX));
    canvas.addEventListener(
      "touchmove",
      (e) => {
        e.preventDefault();
        setPaddle(e.touches[0].clientX);
      },
      { passive: false }
    );
    document.getElementById("catch-reset").addEventListener("click", reset);

    reset();
    loop();
  }

  document.addEventListener("gamechange", (e) => {
    if (e.detail.game === "catch") initCatch();
  });
})();
