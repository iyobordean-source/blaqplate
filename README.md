# Blaqplate — Website

"Not Just Food... A Feeling."

## Structure
```
blaqplate/
├── index.html      All page content and sections
├── css/style.css   All styling (design tokens at the top)
├── js/script.js    Countdown, menu data + filtering, nav, scroll reveals
└── assets/         Empty — drop final photography here
```

## How to preview
Just open `index.html` in a browser — no build step, no dependencies.

## Before launch, replace:
1. **Photos** — every element with a dashed placeholder look (hero background, about photo, dish cards, menu thumbnails, map, Instagram grid) is a styled placeholder, not a broken image. Swap the `.ph-image` divs for real `<img>` tags or background photos once you have final photography.
2. **Logo** — the nav and footer currently use a styled text wordmark ("BLAQPLATE" in gold/cream). No flyer file was attached to this request, so I couldn't trace the actual logo — drop your logo file in `assets/` and swap it into the `.nav-logo` and `.footer-logo` elements once you send it over.
3. **Menu data** — all dish names, descriptions and prices (both the 4 featured cards in `index.html` and the full list in the `MENU` array in `js/script.js`) are realistic placeholders. Edit the `MENU` array to update the whole interactive menu in one place.
4. **Map** — the location section has a styled placeholder where a real Google Maps `<iframe>` embed should go once you have final coordinates.
5. **Opening date/time** — set in `js/script.js` as `OPEN_DATE` (currently Aug 30, 2026, 9:00 AM WAT). The countdown automatically switches to "Blaqplate is OPEN 🎉" once this passes.

## Notes
- WhatsApp number (+234 915 550 1988) is wired into every order button, the nav CTA, the mobile sticky bar, and the location section.
- Fully responsive with a sticky mobile "Order on WhatsApp" bar under 720px.
- Respects `prefers-reduced-motion`.
