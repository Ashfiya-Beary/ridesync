
# RideSync Bus Simulator

# Sample bus stops
stops = [
    {"id": 1, "name": "College Gate", "lat": 13.0700, "lng": 74.9900},
    {"id": 2, "name": "Hostel", "lat": 13.0695, "lng": 74.9925},
    {"id": 3, "name": "Market", "lat": 13.0680, "lng": 74.9950},
    {"id": 4, "name": "Temple Road", "lat": 13.0665, "lng": 74.9975},
    {"id": 5, "name": "Bus Stand", "lat": 13.0650, "lng": 75.0000}
]

# Current bus position
current_stop_index = 0

# Number of small steps between stops
total_steps = 20

# Current movement step
current_step = 0

# Starting bus location
bus_lat = stops[0]["lat"]
bus_lng = stops[0]["lng"]


def advance():

    global current_stop_index
    global current_step
    global bus_lat, bus_lng

    # Find the next stop
    next_index = (current_stop_index + 1) % len(stops)

    start = stops[current_stop_index]
    end = stops[next_index]

    # Move one small step
    current_step += 1

    fraction = current_step / total_steps

    bus_lat = start["lat"] + (end["lat"] - start["lat"]) * fraction
    bus_lng = start["lng"] + (end["lng"] - start["lng"]) * fraction

    # Check if the bus reached the next stop
    if current_step >= total_steps:
        current_stop_index = next_index
        current_step = 0

    return get_current_position()


def get_current_position():

    next_stop_index = (current_stop_index + 1) % len(stops)

    return {
        "lat": bus_lat,
        "lng": bus_lng,
        "next_stop_id": stops[next_stop_index]["id"]
    }
