What I built: A web page with a map that shows 5 bus stops as pins.

Why it is needed: Students need to see the bus stops on a map. This page is the base where we will later show the moving bus, the ETA, and the alert.

How it works: The page uses Leaflet to show the map. A list called stops holds the name, latitude and longitude of each stop. A loop (forEach) puts one pin for each stop, and clicking a pin shows its name.