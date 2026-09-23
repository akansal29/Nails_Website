/* ==========================================================================
   Top-level tab switching (Art / Nails / Quote / Games).
   Dispatches a "tabchange" event so other modules (drawpad, games) can
   lazily initialize themselves only once their tab is actually visible.
   ========================================================================== */

(function () {
  "use strict";

  const tabBtns = Array.from(document.querySelectorAll(".tab-btn"));
  const panels = {
    art: document.getElementById("tab-art"),
    nails: document.getElementById("tab-nails"),
    quote: document.getElementById("tab-quote"),
    games: document.getElementById("tab-games"),
  };

  tabBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const target = btn.dataset.tab;
      tabBtns.forEach((b) => b.setAttribute("aria-selected", b === btn ? "true" : "false"));
      Object.entries(panels).forEach(([key, panel]) => {
        panel.hidden = key !== target;
      });
      document.dispatchEvent(new CustomEvent("tabchange", { detail: { tab: target } }));
    });
  });
})();
