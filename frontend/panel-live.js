// panel-live.js: the info panel (a fixed copy of Member 4's panel.js)
// Only functions here. No test data.

let lastEta = null;
let lastAlertInfo = null;

function showPanel(stops, location, eta, alertInfo) {
  const panel = document.getElementById("panel");

  // Build the dropdown only the first time, so it does not reset every second
  if (!document.getElementById("stopSelect")) {
    let output = "<h2>Bus Stops</h2>";
    output += "<label>Select your bus stop:</label>";
    output += '<select id="stopSelect">';
    output += '<option value="">Choose a stop</option>';
    stops.forEach(function (stop) {
      output += '<option value="' + stop.id + '">' + stop.name + "</option>";
    });
    output += "</select>";
    output += '<div id="etaDisplay">Please select your stop</div>';
    output += '<div id="alertDisplay"></div>';
    panel.innerHTML = output;

    document.getElementById("stopSelect").addEventListener("change", function () {
      showMessages();
    });
  }

  lastEta = eta;
  lastAlertInfo = alertInfo;
  showMessages();
}

function showMessages() {
  const selectedId = getSelectedStopId();
  const etaDisplay = document.getElementById("etaDisplay");
  const alertDisplay = document.getElementById("alertDisplay");

  etaDisplay.innerHTML = "";
  alertDisplay.innerHTML = "";

  if (selectedId === null) {
    etaDisplay.innerHTML = "Please select your stop";
    return;
  }

  if (lastEta && lastEta.stop_id === selectedId) {
    etaDisplay.innerHTML = "Bus will arrive in " + lastEta.minutes + " minutes";
  } else {
    etaDisplay.innerHTML = "ETA not available yet";
  }

  if (lastAlertInfo && lastAlertInfo.stop_id === selectedId && lastAlertInfo.near) {
    alertDisplay.innerHTML =
      "<h3>BUS IS NEAR!</h3>" +
      "<p>Your bus is " + lastAlertInfo.distance_m + " metres away. Please get ready!</p>";
  }
}

function getSelectedStopId() {
  const dropdown = document.getElementById("stopSelect");
  if (dropdown === null || dropdown.value === "") {
    return null;
  }
  return Number(dropdown.value);
}