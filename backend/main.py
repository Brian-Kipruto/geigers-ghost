from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
import math

app = FastAPI(title="Geiger's Ghost Physics API")

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Hardcoded radiation source position
SOURCE_POSITION = {"x": 2.0, "y": 1.0, "z": -3.0}

# Constants
INTENSITY_FACTOR = 500.0
EPSILON = 1e-6
SHIELDING_THRESHOLD = 0.1
ATTENUATION_FACTOR = 0.05


def calculate_distance(x1: float, y1: float, z1: float, x2: float, y2: float, z2: float) -> float:
    """Calculate 3D Euclidean distance between two points."""
    return math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2 + (z2 - z1) ** 2)


def point_to_line_segment_distance(
    px: float, py: float, pz: float,
    ax: float, ay: float, az: float,
    bx: float, by: float, bz: float
) -> float:
    """
    Calculate the distance from point P to line segment AB.
    
    Args:
        px, py, pz: Point coordinates
        ax, ay, az: Line segment start point (A)
        bx, by, bz: Line segment end point (B)
    
    Returns:
        Minimum distance from point to line segment
    """
    # Vector from A to B
    abx, aby, abz = bx - ax, by - ay, bz - az
    
    # Vector from A to P
    apx, apy, apz = px - ax, py - ay, pz - az
    
    # Calculate the parameter t for the projection of P onto line AB
    ab_length_squared = abx ** 2 + aby ** 2 + abz ** 2
    
    if ab_length_squared < EPSILON:
        # A and B are the same point
        return calculate_distance(px, py, pz, ax, ay, az)
    
    t = (apx * abx + apy * aby + apz * abz) / ab_length_squared
    
    # Clamp t to [0, 1] to stay within the line segment
    t = max(0.0, min(1.0, t))
    
    # Find the closest point on the line segment
    closest_x = ax + t * abx
    closest_y = ay + t * aby
    closest_z = az + t * abz
    
    # Return distance from P to the closest point
    return calculate_distance(px, py, pz, closest_x, closest_y, closest_z)


def is_shielding(
    shield_x: float, shield_y: float, shield_z: float,
    source_x: float, source_y: float, source_z: float,
    counter_x: float, counter_y: float, counter_z: float
) -> bool:
    """
    Check if the shield is blocking the path between source and counter.
    
    Returns True if the shield is within the shielding threshold distance
    from the line segment connecting source and counter.
    """
    distance = point_to_line_segment_distance(
        shield_x, shield_y, shield_z,
        source_x, source_y, source_z,
        counter_x, counter_y, counter_z
    )
    return distance < SHIELDING_THRESHOLD


@app.get("/api/activity")
async def get_activity(
    counter_x: float = Query(..., description="Counter X position"),
    counter_y: float = Query(..., description="Counter Y position"),
    counter_z: float = Query(..., description="Counter Z position"),
    shield_x: float = Query(..., description="Shield X position"),
    shield_y: float = Query(..., description="Shield Y position"),
    shield_z: float = Query(..., description="Shield Z position"),
):
    """
    Calculate radiation activity (clicks per second) at the counter position.
    
    Applies inverse-square law and shielding attenuation.
    """
    # Calculate distance from source to counter
    distance = calculate_distance(
        SOURCE_POSITION["x"], SOURCE_POSITION["y"], SOURCE_POSITION["z"],
        counter_x, counter_y, counter_z
    )
    
    # Apply inverse-square law with epsilon to avoid division by zero
    clicks_per_second = INTENSITY_FACTOR / (distance ** 2 + EPSILON)
    
    # Check if shield is blocking the path
    if is_shielding(
        shield_x, shield_y, shield_z,
        SOURCE_POSITION["x"], SOURCE_POSITION["y"], SOURCE_POSITION["z"],
        counter_x, counter_y, counter_z
    ):
        clicks_per_second *= ATTENUATION_FACTOR
    
    return {"clicks_per_second": clicks_per_second}


@app.get("/")
async def root():
    """Health check endpoint."""
    return {"status": "ok", "message": "Geiger's Ghost Physics API"}
