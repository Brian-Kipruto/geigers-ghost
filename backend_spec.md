# SPECS: Geiger's Ghost Physics API

## 1. Goal
Create a FastAPI backend in the `/backend/main.py` file. This API will act as a stateless physics calculator.

## 2. File Structure
- The app MUST be in `/backend/main.py`.
- It MUST use a Python virtual environment in `/backend/venv`.
- It MUST read dependencies from `/backend/requirements.txt`.

## 3. Dependencies
The `/backend/requirements.txt` file must contain:
- `fastapi`
- `uvicorn[standard]`
- `fastapi-cors`

## 4. API Endpoint
Create a single GET endpoint: `/api/activity`

- **Input:** It must accept three query parameters, all of which are floats:
    1.  `counter_x`
    2.  `counter_y`
    3.  `counter_z`
    4.  `shield_x`
    5.  `shield_y`
    6.  `shield_z`

- **Output:** It must return a JSON object with one key:
    - `{"clicks_per_second": float}`

## 5. Core Logic
1.  **Hardcoded Source:** Define an immutable, hardcoded radiation source position at `(x=2.0, y=1.0, z=-3.0)`.
2.  **Inverse-Square Law:** Calculate the 3D distance between the `counter` position and the `source` position. The base `clicks_per_second` should be `1 / (distance^2)`.
    - To avoid a `divide by zero` error if the distance is 0, add a small epsilon (like `1e-6`) to the denominator.
    - Multiply this result by a constant factor (e.g., 500) to get a good audible range.
3.  **Shielding Check:**
    - Define a `shielding_threshold` (e.g., 0.1).
    - Calculate the 3D distance from the `shield` position to the line segment that connects the `source` and the `counter`.
    - If this distance is less than the `shielding_threshold`, apply a 95% attenuation factor (i.e., `clicks_per_second *= 0.05`).
4.  **CORS:** The FastAPI app MUST include `CORSMiddleware` to allow all requests from `http://localhost:5173` (our React app).

## 6. Implementation
- Use pure Python functions for the physics calculations (e.g., `calculate_distance`, `is_shielding`).
- Use Pydantic models for the query parameters if it makes the code cleaner.
- The file must be runnable with `uvicorn backend.main:app --reload`.