/* ==========================================================================
   Quote request form: validation, inspo-photo upload, and submit handling.

   There's no backend here, so "submitting" does two things:
   1. Builds a mailto: link pre-filled with the request details, addressed
      to the email below.
   2. If there's a drawing and/or uploaded photos, offers to download them
      merged into one image so the sender can attach it to that email.

   To make this a real one-click submission (no manual email + attach),
   swap the mailto step for a form backend like Formspree, EmailJS, or a
   small serverless function — the recap data below is already exactly
   what you'd POST.
   ========================================================================== */

(function () {
  "use strict";

  const CONTACT_EMAIL = "mkansal2@illinois.edu";
  const uploaded = []; // { name, dataUrl }

  document.getElementById("q-upload").addEventListener("change", (e) => {
    Array.from(e.target.files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        uploaded.push({ name: file.name, dataUrl: reader.result });
        renderThumbs();
      };
      reader.readAsDataURL(file);
    });
    e.target.value = "";
  });

  function renderThumbs() {
    const box = document.getElementById("q-thumbs");
    box.innerHTML = uploaded
      .map(
        (u, i) => `
      <div class="th">
        <img src="${u.dataUrl}" alt="${u.name}">
        <button type="button" data-i="${i}" aria-label="Remove">&times;</button>
      </div>`
      )
      .join("");
    box.querySelectorAll("button").forEach((btn) => {
      btn.addEventListener("click", () => {
        uploaded.splice(Number(btn.dataset.i), 1);
        renderThumbs();
      });
    });
  }

  async function buildMergedImage(hasDrawing) {
    const imgs = [];
    if (hasDrawing) imgs.push(window.drawpad.canvas);
    for (const u of uploaded) {
      const img = await new Promise((resolve) => {
        const im = new Image();
        im.onload = () => resolve(im);
        im.src = u.dataUrl;
      });
      imgs.push(img);
    }

    const pad = 16;
    const w = 700;
    let totalH = pad;
    imgs.forEach((el) => {
      totalH += (w - 2 * pad) * (el.height / el.width) + pad;
    });

    const merged = document.createElement("canvas");
    merged.width = w;
    merged.height = Math.max(totalH, 200);
    const ctx = merged.getContext("2d");
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, merged.width, merged.height);

    let y = pad;
    imgs.forEach((el) => {
      const h = (w - 2 * pad) * (el.height / el.width);
      ctx.drawImage(el, pad, y, w - 2 * pad, h);
      ctx.strokeStyle = "#000";
      ctx.lineWidth = 1;
      ctx.strokeRect(pad, y, w - 2 * pad, h);
      y += h + pad;
    });

    return merged;
  }

  const form = document.getElementById("quote-form");
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("q-name").value.trim();
    const contact = document.getElementById("q-contact").value.trim();
    const service = document.querySelector('input[name="service"]:checked');

    document.getElementById("err-name").hidden = !!name;
    document.getElementById("err-contact").hidden = !!contact;
    document.getElementById("err-service").hidden = !!service;
    if (!name || !contact || !service) return;

    const caption = document.getElementById("q-caption").value.trim();
    const hasDrawing = window.drawpad && window.drawpad.hasInk();
    const hasUploads = uploaded.length > 0;

    const lines = [
      `Name: ${name}`,
      `Contact: ${contact}`,
      `Service: ${service.value}`,
      caption ? `Details: ${caption}` : "Details: (none written)",
      `Inspo pics attached: ${hasUploads ? uploaded.length : "none"}`,
      `Hand-drawn sketch: ${hasDrawing ? "yes — download it below and attach it" : "none"}`,
    ];
    const text = lines.join("\n");

    const recap = document.getElementById("q-recap");
    document.getElementById("q-recap-text").textContent = text;
    recap.hidden = false;

    const subject = encodeURIComponent(`Nail quote request — ${name} (${service.value})`);
    const body = encodeURIComponent(
      text +
        "\n\n(If you uploaded inspo pics or drew a sketch on the site, download it from the recap below and attach it to this email before sending!)"
    );
    document.getElementById("q-mailto").href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;

    const dlLink = document.getElementById("q-download");
    if (hasDrawing || hasUploads) {
      const merged = await buildMergedImage(hasDrawing);
      merged.toBlob((blob) => {
        if (!blob) return;
        const url = URL.createObjectURL(blob);
        dlLink.href = url;
        dlLink.download = `${name.replace(/\s+/g, "-").toLowerCase()}-nail-request.png`;
        dlLink.hidden = false;
      }, "image/png");
    } else {
      dlLink.hidden = true;
    }

    recap.scrollIntoView({ behavior: "smooth", block: "nearest" });
  });
})();
