This is the repo of portfoli# Vekthorn Draelys Portfolio

A dark terminal-aesthetic portfolio site for a penetration tester / red team operator.

## Folder Structure

```
portfolio/
├── index.html          ← Main HTML entry point
├── css/
│   └── style.css       ← All styles (CSS variables, layout, animations)
├── js/
│   └── main.js         ← All JavaScript (matrix, counters, glitch, etc.)
├── assets/             ← Drop profile photo or cert badges here (optional)
└── README.md
```

## How to Run

Just open `index.html` in any modern browser — no build step needed.

For local development with live reload:
```bash
npx serve .
# or
python3 -m http.server 8080
```

## Customization Checklist

| Area             | Where to edit                          |
|------------------|----------------------------------------|
| Name / handle    | `index.html` — search `VekthornDraely` |
| Hero terminal    | `#hero` section in `index.html`        |
| Stats numbers    | `data-target="N"` attributes           |
| Skills / tags    | `.skill-tags` spans                    |
| Operations log   | `.op-card` blocks                      |
| Certifications   | `.cert-card` blocks                    |
| Contact links    | `#contact` section                     |
| Color scheme     | CSS variables at top of `style.css`    |
| Matrix speed     | `setInterval(draw, 50)` in `main.js`   |

## Color Variables

```css
--green:  #00ff88   /* primary accent  */
--cyan:   #00d4ff   /* secondary       */
--red:    #ff3c5c   /* alerts / danger */
--yellow: #ffd000   /* warnings        */
--bg:     #090d0f   /* base background */
```

## Features

- 🖥  Animated matrix rain background
- ⌨️  Terminal typewriter hero with blinking cursor
- 📊  Animated skill bars (IntersectionObserver triggered)
- 🔢  Counting stat numbers on scroll
- 🌀  Glitch text effect on op card hover
- 🖱  Cursor trail effect
- 🔦  Active nav section highlight
- 📱  Responsive (mobile nav hidden, single-column layout)
- 🔛  CRT scanline overlayo
