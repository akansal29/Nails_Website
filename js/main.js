/* ==========================================================================
   Wires up the Games sub-tabs (Tic-Tac-Toe / Memory Match / Polish Catch)
   and kicks off the default game once the Games tab is first opened.
   ========================================================================== */

(function () {
  "use strict";

  const gameBtns = Array.from(document.querySelectorAll(".game-tab-btn"));
  const gamePanels = {
    ttt: document.getElementById("game-ttt"),
    mem: document.getElementById("game-mem"),
    catch: document.getElementById("game-catch"),
  };
  let activeGame = "ttt";
  let gamesTabOpened = false;

  gameBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      activeGame = btn.dataset.game;
      gameBtns.forEach((b) => b.setAttribute("aria-selected", b === btn ? "true" : "false"));
      Object.entries(gamePanels).forEach(([key, panel]) => {
        panel.hidden = key !== activeGame;
      });
      document.dispatchEvent(new CustomEvent("gamechange", { detail: { game: activeGame } }));
    });
  });

  document.addEventListener("tabchange", (e) => {
    if (e.detail.tab === "games" && !gamesTabOpened) {
      gamesTabOpened = true;
      document.dispatchEvent(new CustomEvent("gamechange", { detail: { game: activeGame } }));
    }
  });
})();
