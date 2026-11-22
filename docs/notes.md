What I built: A web page with a map that shows 5 bus stops as pins.

Why it is needed: Students need to see the bus stops on a map. This page is the base where we will later show the moving bus, the ETA, and the alert.

How it works: The page uses Leaflet to show the map. A list called stops holds the name, latitude and longitude of each stop. A loop (forEach) puts one pin for each stop, and clicking a pin shows its name.

 What I built: A fake bus, shown as a red dot, that moves from stop to stop on the map.

Why it is needed: We have no real GPS device, so we need a fake bus to test and to show the project. Later the simulator on the server, built by my teammate, will give the bus position, and the page will show it.

How it works: A function called moveBus finds a point between two stops and moves the red dot there. setInterval runs moveBus every half second, so the dot moves a little at a time. After the last stop, the bus goes back to the first stop.

 What I built: The page now loads the bus stops with fetch from stops.json, instead of using a list typed in the code.

Why it is needed: A real app gets its data from a server. Now we only need to change one line (STOPS_URL) to use our teammate's Flask server.

How it works: fetch asks for the file, and .then runs when the answer arrives. The stops are turned into pins, and the fake bus starts moving between them. 

 What I built: My map page now gets the bus stops from the Flask server (/api/stops) and not from a file.

Why it is needed: In the real project, the server holds the data and the page shows it. This is how the frontend and backend parts of our team connect.

How it works: fetch asks the Flask server at port 5000 for the stops. CORS lets my page at port 8000 talk to it. If the server stops, my page cannot load the stops (I tested this by stopping the server).

 What I built: The red bus on my map now gets its position from the Flask server (/api/location/1), asked every second.

Why it is needed: The server and its simulator decide where the bus is. The page only shows it. This is how the real bus will work later.

How it works: setInterval calls updateBus every second. updateBus uses fetch to ask the server for the location, and moves the red dot with setLatLng. If the server stops, the bus stops moving.