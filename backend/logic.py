import math 
def distance_m(lat1, lng1, lat2, lng2):

    # Convert GPS values into radians
    lat1 = math.radians(lat1)
    lng1 = math.radians(lng1)
    lat2 = math.radians(lat2)
    lng2 = math.radians(lng2)

    # Find the difference
    dlat = lat2 - lat1
    dlng = lng2 - lng1

    # Haversine formula
    a = (math.sin(dlat / 2) ** 2 +
         math.cos(lat1) * math.cos(lat2) *
         math.sin(dlng / 2) ** 2)

    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))

    # Earth's radius in metres
    earth_radius = 6371000

    distance = earth_radius * c

    return distance
def estimate_arrival_time(distance, speed):
    if speed <= 0:
        return None

    time_hours = distance / (speed * 1000)
    time_minutes = time_hours * 60

    return round(time_minutes, 2)

def simulate_bus_movement(current_distance, speed, time_seconds):
    """
    Calculate the bus's remaining distance after moving.
    """
    distance_travelled = (speed * 1000 / 3600) * time_seconds

    remaining_distance = current_distance - distance_travelled

    if remaining_distance < 0:
        remaining_distance = 0

    return round(remaining_distance, 2)


def eta_minutes(bus_lat, bus_lng, stop_lat, stop_lng):

    # Find distance between bus and stop
    distance = distance_m(
        bus_lat,
        bus_lng,
        stop_lat,
        stop_lng
    )

    # Average bus speed: 25 km per hour
    speed_m_per_minute = 25000 / 60

    # Calculate time in minutes
    time_minutes = distance / speed_m_per_minute

    return round(time_minutes, 2)

def is_near(bus_lat, bus_lng, stop_lat, stop_lng):

    # Calculate distance between bus and stop
    distance = distance_m(
        bus_lat,
        bus_lng,
        stop_lat,
        stop_lng
    )

    # Check whether distance is within 200 metres
    if distance <= 200:
        return True
    else:
        return False
        # Passenger stop alert
def stop_alert(bus_lat, bus_lng, stop_lat, stop_lng):

    if is_near(bus_lat, bus_lng, stop_lat, stop_lng):
        return "Warning! Your stop is nearby."

    else:
        return "Your stop is not nearby yet."
