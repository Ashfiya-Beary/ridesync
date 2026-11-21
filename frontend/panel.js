
const stops = [
    {id: 1, name: "College Gate", lat: 13.0700, lng: 74.9900},
    {id: 2, name: "Hostel", lat: 13.0695, lng: 74.9925},
    {id: 3, name: "Market", lat: 13.0680, lng: 74.9950},
    {id: 4, name: "Temple Road", lat: 13.0665, lng: 74.9975},
    {id: 5, name: "Bus Stand", lat: 13.0650, lng: 75.0000}
];

const eta = {
    stop_id: 2,
    minutes: 4.5
};

const alert = {
    stop_id: 2,
    near: true,
    distance_m: 180
};

function showPanel(stops, location, eta, alert) {

    const panel = document.getElementById("panel");

    let output = "<h2>Bus Stops</h2>";

    output += '<label>Select your bus stop:</label>';

    output += '<select id="stopSelect">';
    output += '<option value="">Choose a stop</option>';

    stops.forEach(function(stop) {
        output += '<option value="' + stop.id + '">';
        output += stop.name;
        output += '</option>';
    });

    output += '</select>';

    output += '<div id="etaDisplay">';
    output += 'Please select your stop';
    output += '</div>';

    output += '<div id="alertDisplay"></div>';

    panel.innerHTML = output;

    const dropdown = document.getElementById("stopSelect");

    dropdown.addEventListener("change", function() {

        const selectedId = getSelectedStopId();

        const etaDisplay = document.getElementById("etaDisplay");
        const alertDisplay = document.getElementById("alertDisplay");

        etaDisplay.innerHTML = "";
        alertDisplay.innerHTML = "";

        if (selectedId === null) {
            etaDisplay.innerHTML = "Please select your stop";
        }

        else if (eta && selectedId === eta.stop_id) {

            etaDisplay.innerHTML =
                "Bus will arrive in " + eta.minutes + " minutes";
        }

        else {
            etaDisplay.innerHTML = "ETA not available yet";
        }

        if (alert && selectedId === alert.stop_id && alert.near) {

            alertDisplay.innerHTML =
                "<h3>BUS IS NEAR!</h3>" +
                "<p>Your bus is " + alert.distance_m +
                " metres away. Please get ready!</p>";
        }

    });
}

function getSelectedStopId() {

    const dropdown = document.getElementById("stopSelect");

    if (dropdown.value === "") {
        return null;
    }

    return Number(dropdown.value);
}

showPanel(stops, null, eta, alert);

function showDriverLocation() {
    const savedData = localStorage.getItem("ridesync_location");

    if (!savedData) {
        alert("No bus location updated yet");
        return;
    }

    const busData = JSON.parse(savedData);

    if (!busData.tracking) {
        alert("Bus tracking is stopped");
        return;
    }

    alert(
        "Bus ID: " + busData.bus_id +
        "\nCurrent Location: " + busData.location
    );
}
