/* ==========================================================================
   Tic-Tac-Toe — two players, same device.
   ========================================================================== */

(function () {
  "use strict";

  let initialized = false;

  function initTTT() {
    if (initialized) return;
    initialized = true;

    const WINS = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6],
    ];
    let board = Array(9).fill(null);
    let turn = "X";

    const boardEl = document.getElementById("ttt-board");
    const statusEl = document.getElementById("ttt-status");

    function checkWinner() {
      for (const [a, b, c] of WINS) {
        if (board[a] && board[a] === board[b] && board[a] === board[c]) return board[a];
      }
      return board.every(Boolean) ? "draw" : null;
    }

    function render() {
      boardEl.innerHTML = board
        .map((v, i) => `<button class="ttt-cell" data-i="${i}" ${v ? "disabled" : ""}>${v || ""}</button>`)
        .join("");
      boardEl.querySelectorAll(".ttt-cell").forEach((cell) => {
        cell.addEventListener("click", () => play(Number(cell.dataset.i)));
      });
    }

    function play(i) {
      if (board[i]) return;
      board[i] = turn;
      const winner = checkWinner();
      if (winner === "draw") {
        statusEl.textContent = "It's a draw!";
        render();
        disableAll();
        return;
      }
      if (winner) {
        statusEl.textContent = `${winner} wins!`;
        render();
        disableAll();
        return;
      }
      turn = turn === "X" ? "O" : "X";
      statusEl.textContent = `${turn}'s turn`;
      render();
    }

    function disableAll() {
      boardEl.querySelectorAll(".ttt-cell").forEach((c) => (c.disabled = true));
    }

    document.getElementById("ttt-reset").addEventListener("click", () => {
      board = Array(9).fill(null);
      turn = "X";
      statusEl.textContent = "X's turn";
      render();
    });

    render();
  }

  document.addEventListener("tabchange", (e) => {
    if (e.detail.tab === "games") initTTT();
  });
})();
