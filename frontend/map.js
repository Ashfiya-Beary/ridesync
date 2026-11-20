// Where the stops come from. Now: a file. Later: our Flask server.
const STOPS_URL = "stops.json";

// Make the map first. The pins come after the stops arrive.
const map = L.map("map").setView([13.0680, 74.9950], 15);

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution: "&copy; OpenStreetMap contributors",
}).addTo(map);

// Ask for the stops. When the answer arrives, show them.
fetch(STOPS_URL)
  .then(function (response) {
    return response.json();
  })
  .then(function (stops) {
    showStops(stops);
    startBus(stops);
  })
  .catch(function (error) {
    alert("Could not load the stops. Is the server running?");
    console.log(error);
  });

// One pin for each stop. Clicking a pin shows its name.
function showStops(stops) {
  stops.forEach(function (stop) {
    L.marker([stop.lat, stop.lng]).addTo(map).bindPopup(stop.name);
  });
  map.fitBounds(stops.map(function (stop) { return [stop.lat, stop.lng]; }));
}

// The fake bus: a red dot that moves from stop to stop.
function startBus(stops) {
  const busMarker = L.circleMarker([stops[0].lat, stops[0].lng], {
    radius: 10,
    color: "red",
    fillColor: "red",
    fillOpacity: 1,
  }).addTo(map);
  busMarker.bindTooltip("Bus 1", { permanent: true, direction: "top" });

  let stopIndex = 0;  // the stop the bus is leaving now
  let step = 0;       // which small step we are on
  const STEPS = 20;   // how many small steps between two stops

  function moveBus() {
    const from = stops[stopIndex];
    const to = stops[(stopIndex + 1) % stops.length];
    const fraction = step / STEPS;

    const lat = from.lat + (to.lat - from.lat) * fraction;
    const lng = from.lng + (to.lng - from.lng) * fraction;
    busMarker.setLatLng([lat, lng]);

    step = step + 1;
    if (step > STEPS) {
      step = 0;
      stopIndex = (stopIndex + 1) % stops.length;
    }
  }

  setInterval(moveBus, 500);
}