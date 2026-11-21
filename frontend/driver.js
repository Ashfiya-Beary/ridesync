
function updateLocation() {

    const busId = document.getElementById("busId").value.trim();

    const location = document.getElementById("busLocation").value;

    const status = document.getElementById("status");

    if (busId === "") {
        alert("Please enter Bus ID");
        return;
    }

    if (location === "") {
        alert("Please select bus location");
        return;
    }

    const busData = {
        bus_id: busId,
        location: location,
        updated_at: new Date().toISOString(),
        tracking: true
    };

    localStorage.setItem(
        "ridesync_location",
        JSON.stringify(busData)
    );

    status.innerText =
        "Location updated: " + location;

    status.style.color = "green";
}

function stopTracking() {

    const status = document.getElementById("status");

    const oldData = localStorage.getItem("ridesync_location");

    if (oldData) {
        const busData = JSON.parse(oldData);
        busData.tracking = false;

        localStorage.setItem(
            "ridesync_location",
            JSON.stringify(busData)
        );
    }

    status.innerText = "Tracking stopped";
    status.style.color = "red";
}
