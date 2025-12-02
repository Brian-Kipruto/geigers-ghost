# SPECS: RadiationMonitor Component

## 1. Goal
Create a new React component `frontend/src/components/RadiationMonitor.jsx`.

## 2. Visual Style (Costume Contest)
- It must look like a "heads-up display" (HUD) or a digital scientific instrument.
- Use a monospaced font (like 'Courier New' or 'monospace').
- Text color: Bright Orange (#ffaa00) to match the "spooky lab" aesthetic.
- Position: Top-left or Top-right of the screen (absolute positioning).

## 3. Functionality
- Subscribe to `useSceneStore` to get the `clicksPerSecond`.
- Convert clicks per second (CPS) to **microsieverts per hour (µSv/h)** using a conversion factor (e.g., `CPS * 0.05`).
- Display both the raw CPS and the calculated µSv/h.
- Add a "Safety Level" text indicator:
    - Low (< 10 CPS): "SAFE" (Green)
    - Moderate (< 50 CPS): "CAUTION" (Yellow)
    - High (> 50 CPS): "DANGER" (Red)