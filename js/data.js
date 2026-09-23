/* ==========================================================================
   Sample content for the Art and Nails galleries.
   Replace these with your own pieces/sets — swap the generated SVG
   thumbnails for real <img> photos once you have them.
   ========================================================================== */

// Each art piece gets a generated blob-shape thumbnail (see gallery.js).
// colors: [gradient start, gradient end, background]
const ART_PIECES = [
  { title: "Melty Sunset",     medium: "gouache",    colors: ["#ff9db3", "#ff5c8a", "#fff0f4"] },
  { title: "Sea Glass Study",  medium: "watercolor", colors: ["#8fe3ce", "#4fd1b5", "#eafaf6"] },
  { title: "Late Night Doodle",medium: "ink",         colors: ["#b7a9ff", "#8d7bff", "#f1eeff"] },
  { title: "Citrus Blob",      medium: "digital",     colors: ["#ffe08a", "#ffcb3d", "#fff8e6"] },
  { title: "Untitled #14",     medium: "pastel",      colors: ["#ffb4a2", "#ff5c8a", "#fff0ea"] },
  { title: "Warm Static",      medium: "acrylic",     colors: ["#9ad9ff", "#4fd1b5", "#eaf8ff"] },
];

// Each nail set is drawn as five little nail shapes.
const NAIL_SETS = [
  { name: "Milk Bath",        service: "Gel-X",     polish: ["#f7e9e2", "#f0d8cc", "#f7e9e2", "#f0d8cc", "#f7e9e2"] },
  { name: "Cherry Coke",      service: "Press-ons", polish: ["#8a1230", "#b3244a", "#8a1230", "#b3244a", "#8a1230"] },
  { name: "Aura Chrome",      service: "Gel-X",     polish: ["#c9c2ff", "#9fe3d8", "#c9c2ff", "#9fe3d8", "#c9c2ff"] },
  { name: "Butter Nails",     service: "Press-ons", polish: ["#ffe08a", "#ffefc2", "#ffe08a", "#ffefc2", "#ffe08a"] },
  { name: "Espresso Martini", service: "Gel-X",     polish: ["#5a3b2e", "#7a5240", "#5a3b2e", "#7a5240", "#5a3b2e"] },
  { name: "Barbie Chrome",    service: "Press-ons", polish: ["#ff5c8a", "#ff9db3", "#ff5c8a", "#ff9db3", "#ff5c8a"] },
];
