from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
import math

app = FastAPI(title="Geiger's Ghost Physics API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- CONFIGURATION ---

SOURCES = [
    # Left Mushrooms
    {"x": -2.3, "y": 0.85, "z": 0.0, "strength": 10.0}, 
    # Right Vat
    {"x": 2.3, "y": 0.85, "z": 0.0, "strength": 12.0},
]

# LOGIC UPDATE:
# 1. CUTOFF_RADIUS: 
#    If the counter is > 1.8m away from a source, that source turns OFF.
#    This creates a guaranteed "Safe Zone" in the middle of the room.
CUTOFF_RADIUS = 1.8 

# 2. INTENSITY:
#    Since we have a cutoff, we can boost intensity for the "Hot Zone"
#    without flooding the rest of the room.
INTENSITY_FACTOR = 8.0  

SHIELDING_THRESHOLD = 0.8 
ATTENUATION_FACTOR = 0.02
BACKGROUND_RADIATION = 0.5 
MAX_CLICKS = 999.0
EPSILON = 0.1

def calculate_distance(x1, y1, z1, x2, y2, z2):
    return math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2 + (z2 - z1) ** 2)

def point_to_line_segment_distance(px, py, pz, ax, ay, az, bx, by, bz):
    abx, aby, abz = bx - ax, by - ay, bz - az
    apx, apy, apz = px - ax, py - ay, pz - az
    ab_length_squared = abx**2 + aby**2 + abz**2
    if ab_length_squared < 1e-6:
        return calculate_distance(px, py, pz, ax, ay, az)
    t = (apx * abx + apy * aby + apz * abz) / ab_length_squared
    t = max(0.0, min(1.0, t))
    closest_x = ax + t * abx
    closest_y = ay + t * aby
    closest_z = az + t * abz
    return calculate_distance(px, py, pz, closest_x, closest_y, closest_z)

def is_shielding(shield_pos, source_pos, counter_pos):
    dist = point_to_line_segment_distance(
        shield_pos["x"], shield_pos["y"], shield_pos["z"],
        source_pos["x"], source_pos["y"], source_pos["z"],
        counter_pos["x"], counter_pos["y"], counter_pos["z"]
    )
    return dist < SHIELDING_THRESHOLD

@app.get("/api/activity")
async def get_activity(
    counter_x: float = Query(...), counter_y: float = Query(...), counter_z: float = Query(...),
    shield_x: float = Query(...), shield_y: float = Query(...), shield_z: float = Query(...),
):
    total_clicks = 0.0
    counter_pos = {"x": counter_x, "y": counter_y, "z": counter_z}
    shield_pos = {"x": shield_x, "y": shield_y, "z": shield_z}

    for source in SOURCES:
        dist = calculate_distance(
            source["x"], source["y"], source["z"],
            counter_x, counter_y, counter_z
        )

        # --- THE FIX: "IF STATEMENT" LOGIC ---
        # Acts like a video game trigger. Outside the bubble? Zero radiation.
        if dist > CUTOFF_RADIUS:
            continue
        
        # Inside the bubble? Use physics.
        source_clicks = (INTENSITY_FACTOR * source["strength"]) / (dist**2 + EPSILON)
        
        if is_shielding(shield_pos, source, counter_pos):
            source_clicks *= ATTENUATION_FACTOR
            
        total_clicks += source_clicks

    total_clicks += BACKGROUND_RADIATION
    
    return {"clicks_per_second": min(total_clicks, MAX_CLICKS)}