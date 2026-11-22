// The address of the Flask server
const SERVER = "http://127.0.0.1:5000";

// Make the map
const map = L.map("map").setView([13.0680, 74.9950], 15);

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution: "&copy; OpenStreetMap contributors",
}).addTo(map);

let busMarker = null;  // the red dot, made when the first location arrives
let allStops = [];     // the stops, kept for the panel

// Ask the server for the stops. When they arrive, show them and start the bus.
fetch(SERVER + "/api/stops")
  .then(function (response) {
    return response.json();
  })
  .then(function (stops) {
    allStops = stops;
    showStops(stops);
    showPanel(allStops, null, null, null);
    startBus();
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

// Ask for the bus position now, and then again every second.
function startBus() {
  updateBus();
  setInterval(updateBus, 1000);
}

function updateBus() {
  fetch(SERVER + "/api/location/1")
    .then(function (response) {
      return response.json();
    })
    .then(function (location) {
      const point = [location.lat, location.lng];
      if (busMarker === null) {
        busMarker = L.circleMarker(point, {
          radius: 10,
          color: "red",
          fillColor: "red",
          fillOpacity: 1,
        }).addTo(map);
        busMarker.bindTooltip("Bus 1", { permanent: true, direction: "top" });
      } else {
        busMarker.setLatLng(point);
      }
      refreshPanel(location);
    })
    .catch(function (error) {
      console.log("Could not get the bus location", error);
    });
}

// Ask the server for the ETA and the alert of the chosen stop, then update the panel.
function refreshPanel(location) {
  const stopId = getSelectedStopId();

  if (stopId === null) {
    showPanel(allStops, location, null, null);
    return;
  }

  // Promise.all: ask both questions at the same time, continue when both answers arrive
  Promise.all([
    fetch(SERVER + "/api/eta/1/" + stopId).then(function (r) { return r.json(); }),
    fetch(SERVER + "/api/alert/1/" + stopId).then(function (r) { return r.json(); }),
  ])
    .then(function (results) {
      showPanel(allStops, location, results[0], results[1]);
    })
    .catch(function (error) {
      console.log("Could not get the ETA or alert", error);
    });
}