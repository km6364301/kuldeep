# AI Video Generator App (Frontend Prototype)

A responsive HTML/CSS/JavaScript prototype for an AI Video Generator interface.

## Included features

- Text prompt-based video request form
- Extended duration options from 5s to 1h
- Style, color, camera, lighting, audio language and narration controls
- Dark/light mode toggle
- Progress bar simulation during generation
- Preview player + download + share buttons
- Local history list of generated items

## Run locally

Use any static server, for example:

```bash
python3 -m http.server 4173
```

Then open `http://localhost:4173`.

## Backend integration point

The form payload is collected in `buildPayload()` in `app.js`.
Replace the `simulateRender()` flow with an actual API request to your text-to-video provider.
