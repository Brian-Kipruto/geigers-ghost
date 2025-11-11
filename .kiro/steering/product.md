# Product Vibe & Goals

## Product: "Geiger's Ghost"
We are building an open-source, web-based virtual lab to teach physics concepts. This is an educational tool first and a game second.

## Theme: "Spooky & Educational"
- **Visuals:** The theme is "haunted physics lab." The atmosphere is the priority. Think high-contrast, deep shadows, and a single, flickering `pointLight` casting dramatic shadows.
- **Color Palette:** Strictly avoid bright, primary colors. Stick to dark, desaturated tones, grays, and ambers. This is for the "Costume Contest" category.
- **Audio:** Audio is 50% of the experience. The Geiger "click" is the main feedback mechanism.

## Core Educational Goals (The "Potential Value")
1.  **Inverse-Square Law:** The user must *feel* this concept. The click frequency should increase exponentially, not linearly, as the counter gets closer to the source.
2.  **Radiation Attenuation (Shielding):** The user must *see* the effect of the shield. When the lead brick is placed in the path, the click rate must drop by ~90-95% (a dramatic, obvious change).

## User Interaction Loop
- **Goal:** The user should learn through exploration, not tutorials.
- **Controls:** Minimalist. The *only* user interactions are:
    1.  Drag-and-drop the Geiger counter.
    2.  Drag-and-drop the lead brick.
- **Feedback:** All feedback is **diegetic** (in-world). There are no "score" popups or UI buttons. The only feedback is the changing speed of the audio clicks and the flickering light.
- **Hackathon Context:** The final demo video *must* clearly show both physics concepts in action. The project write-up will heavily feature Kiro's role in building the API and frontend components from specs.