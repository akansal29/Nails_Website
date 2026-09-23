# Tips & Sketches

A passion-project personal site: an art gallery, a nail-set gallery, a nail-design
quote request form (inspo photo upload + freehand sketch pad), and a Games tab
with a few playable mini games.

This is a static site — plain HTML/CSS/JS, no build step, no framework. The
markup and behavior are done; **the visual design is intentionally left to you**
(see `css/style.css` — it's a bare, mostly-unstyled base with `DESIGN THIS`
comments marking the sections worth styling first).

## Structure

```
index.html
css/
  style.css        # base layout only — add your own visual design here
js/
  data.js          # sample art pieces + nail sets — replace with your own
  tabs.js          # top-level tab switching (Art / Nails / Quote / Games)
  gallery.js       # renders the Art and Nails galleries from data.js
  drawpad.js        # freehand drawing pad used in the quote form
  quote.js         # form validation, photo upload, submit handling
  game-ttt.js       # Tic-Tac-Toe
  game-memory.js    # Memory Match
  game-catch.js     # Polish Catch (canvas mini game)
  main.js           # wires up the Games sub-tabs
assets/            # put real photos/art here once you have them
```

## Running it locally

No build tools needed — just serve the folder and open it.

```bash
# from the project folder
python3 -m http.server 8000
# then visit http://localhost:8000
```

(Opening `index.html` directly by double-clicking mostly works too, but some
browsers restrict `<canvas>`/file APIs on the `file://` protocol, so a local
server is more reliable.)

## The quote form — how it works right now

There's no backend, so "submitting" the form:

1. Builds a `mailto:` link pre-filled with the request details, addressed to
   the email in `js/quote.js` (`CONTACT_EMAIL`).
2. If a photo was uploaded or something was drawn, offers a merged PNG
   download so it can be attached to that email.

This keeps the site fully static (free to host, nothing to maintain). To turn
it into a real one-click submission later, swap the mailto step in
`js/quote.js` for a form backend like [Formspree](https://formspree.io/) or
[EmailJS](https://www.emailjs.com/), or a small serverless function — the
`lines`/`text` recap already built there is exactly the payload you'd send.

## Deploying to GitHub Pages

1. Push this repo to GitHub.
2. In the repo settings, go to **Pages** → set the source to the `main`
   branch, root folder.
3. Your site will be live at `https://<username>.github.io/<repo-name>/`.

## To customize

- Swap the sample art/nail entries in `js/data.js` for your own work (photos
  can go in `assets/` and be referenced with a plain `<img>` instead of the
  generated SVG placeholders in `gallery.js`).
- Update `CONTACT_EMAIL` in `js/quote.js`.
- Style it — `css/style.css` is deliberately minimal.
