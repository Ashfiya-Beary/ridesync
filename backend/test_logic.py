from logic import distance_m, eta_minutes, is_near, estimate_arrival_time, stop_alert
# College Gate location
college_lat = 13.0700
college_lng = 74.9900

# Hostel location
hostel_lat = 13.0695
hostel_lng = 74.9925

# Calculate distance
distance = distance_m(
    college_lat,
    college_lng,
    hostel_lat,
    hostel_lng
)

print("Distance:", round(distance, 2), "metres")
eta = eta_minutes(
    college_lat,
    college_lng,
    hostel_lat,
    hostel_lng
)

print("ETA using 25 km/h:", eta, "minutes")

# Estimate arrival time
speed = 20  # km/hour

arrival = estimate_arrival_time(distance, speed)

print("Estimated arrival time:", arrival, "minutes")

# Test bus movement simulation

from logic import simulate_bus_movement

current_distance = 276.43
speed = 20
time_seconds = 10

remaining = simulate_bus_movement(
    current_distance,
    speed,
    time_seconds
)

print("Bus movement test:")
print("Remaining distance:", remaining, "metres")
# Calculate bus arrival time
eta = estimate_arrival_time(remaining, speed)

print("Estimated arrival time:", eta, "minutes")
# Test nearby stop warning

near = is_near(
    hostel_lat,
    hostel_lng,
    college_lat,
    college_lng
)

print("Is bus near Hostel?", near)
# Stop warning
if near:
    print("Warning! Your stop is nearby.")
else:
    print("Your stop is not nearby yet.")
    # Test passenger stop alert


alert = stop_alert(
    13.0698,
    74.9910,
    college_lat,
    college_lng
)

print("Passenger stop alert:")


print(alert)