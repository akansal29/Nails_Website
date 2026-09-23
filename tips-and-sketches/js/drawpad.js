/* ==========================================================================
   Freehand drawing pad used in the quote form, so someone can sketch
   their own nail design idea instead of (or alongside) uploading inspo pics.
   Exposes window.drawpad = { canvas, hasInk() } once initialized.
   ========================================================================== */

(function () {
  "use strict";

  let initialized = false;

  function initDrawpad() {
    if (initialized) return;
    const canvas = document.getElementById("drawpad");
    const ctx = canvas.getContext("2d");

    // Fill white so exports/downloads don't come out transparent.
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    let drawing = false;
    let color = "#000000";
    let brushWidth = 4;
    const history = [];

    function snapshot() {
      try {
        history.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
        if (history.length > 25) history.shift();
      } catch (e) {
        /* canvas not ready yet */
      }
    }
    snapshot();

    function pointerPos(e) {
      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      return [(clientX - rect.left) * scaleX, (clientY - rect.top) * scaleY];
    }

    function start(e) {
      e.preventDefault();
      drawing = true;
      const [x, y] = pointerPos(e);
      ctx.beginPath();
      ctx.moveTo(x, y);
    }

    function move(e) {
      if (!drawing) return;
      e.preventDefault();
      const [x, y] = pointerPos(e);
      ctx.strokeStyle = color;
      ctx.lineWidth = brushWidth;
      ctx.lineTo(x, y);
      ctx.stroke();
    }

    function end() {
      if (!drawing) return;
      drawing = false;
      snapshot();
    }

    canvas.addEventListener("mousedown", start);
    canvas.addEventListener("mousemove", move);
    window.addEventListener("mouseup", end);
    canvas.addEventListener("touchstart", start, { passive: false });
    canvas.addEventListener("touchmove", move, { passive: false });
    canvas.addEventListener("touchend", end);

    document.querySelectorAll(".swatch").forEach((sw) => {
      sw.addEventListener("click", () => {
        document.querySelectorAll(".swatch").forEach((s) => s.classList.remove("active"));
        sw.classList.add("active");
        color = sw.dataset.color;
        document.getElementById("q-color").value = color;
      });
    });
    document.getElementById("q-color").addEventListener("input", (e) => {
      color = e.target.value;
      document.querySelectorAll(".swatch").forEach((s) => s.classList.remove("active"));
    });
    document.getElementById("q-brush").addEventListener("input", (e) => {
      brushWidth = Number(e.target.value);
    });
    document.getElementById("q-clear").addEventListener("click", () => {
      ctx.fillStyle = "#fff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      snapshot();
    });
    document.getElementById("q-undo").addEventListener("click", () => {
      if (history.length > 1) {
        history.pop();
        ctx.putImageData(history[history.length - 1], 0, 0);
      }
    });

    window.drawpad = {
      canvas,
      hasInk: () => history.length > 1,
    };
    initialized = true;
  }

  document.addEventListener("tabchange", (e) => {
    if (e.detail.tab === "quote") initDrawpad();
  });
})();
