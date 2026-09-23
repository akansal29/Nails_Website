/* ==========================================================================
   Memory Match — flip cards, find the matching polish pairs.
   ========================================================================== */

(function () {
  "use strict";

  const ICONS = ["A", "B", "C", "D", "E", "F", "G", "H"]; // swap for emoji/images once styled

  function shuffledDeck() {
    const deck = ICONS.concat(ICONS).map((icon) => ({ icon, flipped: false, matched: false }));
    for (let i = deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    return deck;
  }

  function buildMem() {
    let deck = shuffledDeck();
    let moves = 0;
    let pairs = 0;
    let lock = false;
    let firstIndex = null;

    const grid = document.getElementById("mem-grid");
    const movesEl = document.getElementById("mem-moves");
    const pairsEl = document.getElementById("mem-pairs");

    function render() {
      grid.innerHTML = deck
        .map(
          (c, i) => `<button class="mem-card ${c.flipped || c.matched ? "flipped" : ""} ${c.matched ? "matched" : ""}" data-i="${i}">${
            c.flipped || c.matched ? c.icon : ""
          }</button>`
        )
        .join("");
      grid.querySelectorAll(".mem-card").forEach((el) => {
        el.addEventListener("click", () => flip(Number(el.dataset.i)));
      });
      movesEl.textContent = `Moves: ${moves}`;
      pairsEl.textContent = `Pairs: ${pairs}/${ICONS.length}`;
    }

    function flip(i) {
      if (lock || deck[i].flipped || deck[i].matched) return;
      deck[i].flipped = true;
      if (firstIndex === null) {
        firstIndex = i;
        render();
        return;
      }
      moves++;
      if (deck[firstIndex].icon === deck[i].icon) {
        deck[firstIndex].matched = true;
        deck[i].matched = true;
        pairs++;
        firstIndex = null;
        render();
      } else {
        lock = true;
        render();
        setTimeout(() => {
          deck[firstIndex].flipped = false;
          deck[i].flipped = false;
          firstIndex = null;
          lock = false;
          render();
        }, 650);
      }
    }

    document.getElementById("mem-reset").onclick = buildMem;
    render();
  }

  document.addEventListener("gamechange", (e) => {
    if (e.detail.game === "mem") buildMem();
  });
})();
