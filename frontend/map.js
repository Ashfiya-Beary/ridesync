// Fake stops. Later, the server will send the real ones.
const stops = [
  { id: 1, name: "College Gate", lat: 13.0700, lng: 74.9900 },
  { id: 2, name: "Hostel", lat: 13.0695, lng: 74.9925 },
  { id: 3, name: "Market", lat: 13.0680, lng: 74.9950 },
  { id: 4, name: "Temple Road", lat: 13.0665, lng: 74.9975 },
  { id: 5, name: "Bus Stand", lat: 13.0650, lng: 75.0000 },
];

// Make the map and put it inside the box with id "map"
const map = L.map("map").setView([stops[0].lat, stops[0].lng], 15);

// Load the map pictures from OpenStreetMap
L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution: "&copy; OpenStreetMap contributors",
}).addTo(map);

// Put one pin for each stop. Clicking a pin shows its name.
stops.forEach(function (stop) {
  L.marker([stop.lat, stop.lng]).addTo(map).bindPopup(stop.name);
});

// Zoom the map so all pins are visible
map.fitBounds(stops.map(function (stop) { return [stop.lat, stop.lng]; }));