# SPECS: AudioPlayer Component

## 1. Goal
Create a new React component file at `frontend/src/components/AudioPlayer.jsx`. This component will be invisible and return `null`.

## 2. Dependencies
- Must import `useRef`, `useEffect` from `react`.
- Must import `useSceneStore` from `../store.js`.

## 3. Functionality
The component `AudioPlayer` must:
1.  **Load Audio:** Create a new `Audio` object and set its `src` to `/click.wav`. Use a `useRef` to hold this audio object so it's only created once.
2.  **Subscribe to State:** Get `clicksPerSecond` from the `useSceneStore`.
3.  **Manage Loop:**
    - Create a `useRef` to hold the interval timer ID.
    - Create a `useEffect` hook that re-runs *only* when `clicksPerSecond` changes.
    - Inside this `useEffect`, it must **clear any existing interval** using `clearInterval()`.
    - If `clicksPerSecond` is greater than 0:
        - It must calculate the `delay` (in milliseconds) between clicks. This formula is `1000 / clicksPerSecond`.
        - It must start a **new interval** using `setInterval()`.
        - The interval's callback function must play the audio: `audioRef.current.play()`.
        - It must store the new interval ID in the `useRef`.