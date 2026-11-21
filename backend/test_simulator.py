
from simulator import advance, get_current_position

# Show starting bus location
print("Starting bus position:")
print(get_current_position())

# Move the bus 5 small steps
for i in range(20):
    position = advance()
    print("Step", i + 1, ":", position)
