/* ==========================================================================
   Renders the Art and Nails galleries from js/data.js.
   ========================================================================== */

(function () {
  "use strict";

  // Generates a simple blob-shape SVG thumbnail as a stand-in for a real photo.
  function blobSvg(seed, colors) {
    const paths = [
      "M42,4 C70,2 92,26 90,52 C88,80 64,94 38,90 C14,86 2,62 6,38 C10,16 22,6 42,4 Z",
      "M50,6 C78,10 94,34 88,58 C82,84 56,96 30,88 C6,80 -2,52 10,30 C20,12 30,2 50,6 Z",
      "M36,2 C62,-2 92,18 92,46 C92,74 68,92 40,90 C12,88 0,64 4,40 C8,20 14,6 36,2 Z",
    ];
    const path = paths[seed % paths.length];
    const rotation = ((seed * 37) % 40) - 20;
    return `<svg viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg">
      <defs><linearGradient id="g${seed}" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="${colors[0]}"/>
        <stop offset="100%" stop-color="${colors[1]}"/>
      </linearGradient></defs>
      <rect width="96" height="96" fill="${colors[2]}"/>
      <g transform="rotate(${rotation} 48 48)"><path d="${path}" fill="url(#g${seed})"/></g>
    </svg>`;
  }

  function renderArt() {
    const grid = document.getElementById("art-grid");
    grid.innerHTML = ART_PIECES.map(
      (p, i) => `
      <div class="piece">
        <div class="thumb">${blobSvg(i, p.colors)}</div>
        <div class="cap"><b>${p.title}</b><span>${p.medium}</span></div>
      </div>`
    ).join("");
  }

  function renderNails() {
    const grid = document.getElementById("nails-grid");
    grid.innerHTML = NAIL_SETS.map(
      (n) => `
      <div class="nailset">
        <div class="nailrow">
          ${n.polish.map((c) => `<div class="nail" style="background:${c}"></div>`).join("")}
        </div>
        <div class="cap"><b>${n.name}</b></div>
        <span class="tag">${n.service}</span>
      </div>`
    ).join("");
  }

  renderArt();
  renderNails();
})();
