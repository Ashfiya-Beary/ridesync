
// Store the latest ETA and alert information
let latestEta = null;
let latestAlertInfo = null;


// Function to display the bus panel
function showPanel(stops, location, eta, alertInfo) {

    // Save the latest data received from the server
    latestEta = eta;
    latestAlertInfo = alertInfo;

    const panel = document.getElementById("panel");

    // Build the dropdown only for the first time
    if (!document.getElementById("stopSelect")) {

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

        output += '<div id="etaDisplay"></div>';

        output += '<div id="alertDisplay"></div>';

        panel.innerHTML = output;

        // Listen when the user changes the selected stop
        const dropdown = document.getElementById("stopSelect");

        dropdown.addEventListener("change", updateMessages);
    }

    // Update messages using the latest server data
    updateMessages();
}


// Function to update ETA and alert messages
function updateMessages() {

    const selectedId = getSelectedStopId();

    const etaDisplay = document.getElementById("etaDisplay");

    const alertDisplay = document.getElementById("alertDisplay");

    if (!etaDisplay || !alertDisplay) {
        return;
    }

    etaDisplay.innerHTML = "";

    alertDisplay.innerHTML = "";

    // Check whether a stop is selected
    if (selectedId === null) {

        etaDisplay.innerHTML = "Please select your stop";

        return;
    }

    // Check ETA for the selected stop
    const selectedEta = latestEta
    ? latestEta.find(function(item) {
        return item.stop_id === selectedId;
    })
    : null;

if (selectedEta) {

    etaDisplay.innerHTML =
        "Bus will arrive in " + selectedEta.minutes + " minutes";

}
    else {

        etaDisplay.innerHTML = "ETA not available yet";

    }

    // Check whether the bus is near the selected stop
    if (
        latestAlertInfo &&
        selectedId === latestAlertInfo.stop_id &&
        latestAlertInfo.near === true
    ) {

        alertDisplay.innerHTML =
            "<h3>BUS IS NEAR!</h3>" +
            "<p>Your bus is " + latestAlertInfo.distance_m +
            " metres away. Please get ready!</p>";

    }
}


// Function to get the selected stop ID
function getSelectedStopId() {

    const dropdown = document.getElementById("stopSelect");

    if (!dropdown || dropdown.value === "") {

        return null;

    }

    return Number(dropdown.value);
}

