# SPECS: PhysicsEngine Component

## 1. Goal
Create a new React component file at `frontend/src/components/PhysicsEngine.jsx`. This component must be invisible and return `null`.

## 2. Dependencies
- Must import `useEffect` from `react`.
- Must import `useSceneStore` from `../store.js`.

## 3. Functionality
The component `PhysicsEngine` must:
1.  **Subscribe to State:** Get `geigerPosition`, `shieldPosition`, and `setClicksPerSecond` from the `useSceneStore`.
2.  **Use `useEffect`:** Create a `useEffect` hook that re-runs *only* when `geigerPosition` or `shieldPosition` changes.
3.  **Fetch from API:**
    - Inside the `useEffect`, create an `async` function `fetchActivity`.
    - This function must construct a URL to call our backend API at `http://127.0.0.1:8000/api/activity`.
    - It must include all 6 query parameters (`counter_x`, `counter_y`, `counter_z`, `shield_x`, `shield_y`, `shield_z`) using the values from the store.
    - It must use the `fetch()` API, parse the JSON response, and get the `clicks_per_second` value.
4.  **Update State:** After fetching, it must call `setClicksPerSecond` with the new value.
5.  **Run on Mount:** Call `fetchActivity()` once, inside the `useEffect`, so it runs when the component first loads.