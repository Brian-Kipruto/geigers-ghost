# Tech Stack Steering

This is a monorepo with a React frontend and a Python backend.

## Frontend (`/frontend`)
- **Framework:** React 18+ with Vite.
- **Language:** JavaScript (ES6+ Modules, JSX).
- **3D Engine:** `react-three-fiber` (R3F) is mandatory.
- **3D Helpers:** We MUST use `react-three-drei`. This is our primary library for helpers like `useGLTF`, `useDrag`, `Environment`, and post-processing effects. Always prefer a `drei` helper if one exists.
- **State Management:** We MUST use `zustand` for all global state (e.g., model positions). Do not suggest Redux or Context API.
- **Styling:** Plain CSS modules (`.module.css`).
- **Code Style:** Follow Prettier defaults.

## Backend (`/backend`)
- **Framework:** FastAPI (Python 3.10+).
- **Server:** Uvicorn.
- **Dependencies:** We will need `fastapi-cors` to handle cross-origin requests from the React app.
- **Logic:** The backend's only job is to be a stateless physics calculator. All logic should be in `main.py`.
- **Calculations:** All physics logic (inverse-square, attenuation) must be in pure functions.
- **Data:** No databases. No file storage.
- **Code Style:** Follow PEP 8 guidelines.

## Communication
- The frontend (on `localhost:5173`) will make `fetch` requests to the backend (on `localhost:8000`).
- The backend MUST have **CORS middleware** enabled to allow requests from the frontend's origin.