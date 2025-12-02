# Technical Specifications: TutorialOverlay Component

**File Path:** `frontend/src/components/TutorialOverlay.jsx`

## 1. Goal
Create a new React component that acts as an immersive, **"Visual Novel" style onboarding system**. It must overlay the 3D scene (DOM Element) and guide the user through physics concepts using a character persona.

## 2. Dependencies
* **React:** `useState`, `useEffect`
* **State Management:** `useSceneStore` from `../store.js`
* **Assets:** `mad_scientist_3-removebg-preview.png` (located in `/public`)

## 3. Architecture (Crucial)
* **Rendering Context:** **NO CANVAS**. This component must render standard HTML/CSS `<div>` elements.
* **Placement:** It is designed to sit on top of the React-Three-Fiber `<Canvas>`, not inside it (z-index overlay).

## 4. State Requirements

### Global State (Zustand)
* **Logic Control:** Subscribe to `tutorialStep` (integer) and `setTutorialStep`.
* **Physics Monitoring:** Subscribe to `clicksPerSecond` to detect if the user has completed a specific physics task based on radiation intensity.

### Local State
* **UI Animation:** Manage `typedText` (string) to handle the typewriter text effect.

## 5. Step Logic (The Script)
Define a constant `STEPS` array containing objects with the following structure:
* `title`: String (Header)
* `text`: String (The dialog)
* `action`: String (Enum: `NEXT`, `TASK_CRITICAL`, `TASK_SAFE`, `CLOSE`)

### The Narrative Arc

| Step | Phase | Description | Logic / Trigger |
| :--- | :--- | :--- | :--- |
| **0** | **Intro** | "Dr. Geiger" introduces himself (Ghost/Hologram). | Action: `NEXT` |
| **1** | **Navigation** | Explain Mouse/Camera controls. | Action: `NEXT` |
| **2** | **Inverse-Square** | Challenge user to find the "Critical" radiation zone. | Wait for `clicksPerSecond > 150` |
| **3** | **Shielding** | Challenge user to lower the radiation. | Wait for `clicksPerSecond < 50` (and `> 0`) |
| **4** | **Free Roam** | Final success message. | Action: `CLOSE` |

## 6. Visual Style (Costume Contest)

### Layout & Positioning
* **Container:** Absolute positioning (**Bottom Left**).
* **Background:** Semi-transparent black (`rgba(0, 20, 0, 0.9)`).
* **Borders:** Glowing Green (`#00ff00`).

### Aesthetic: "Holographic Transmission"
* **Font:** Monospace (`Courier New`).
* **Avatar:** Circular image of the scientist with a glowing green border.

### Animations & UX
* **Typewriter Effect:** Text must appear letter-by-letter.
* **Conditional Buttons:** The "Next" button should **only** appear for non-physics tasks (Step 0, 1, and 4). Steps 2 and 3 require user interaction with the scene to advance.