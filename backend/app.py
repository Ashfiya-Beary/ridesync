import sqlite3

from flask import Flask, jsonify, request
from flask_cors import CORS

import logic
import simulator
from data import DATABASE_FILE, STOPS

app = Flask(__name__)
CORS(app)


def save_location(bus_id, lat, lng, next_stop_id):
    connection = sqlite3.connect(DATABASE_FILE)
    connection.execute(
        """
        INSERT OR REPLACE INTO bus_locations
        (bus_id, lat, lng, next_stop_id)
        VALUES (?, ?, ?, ?)
        """,
        (bus_id, lat, lng, next_stop_id),
    )
    connection.commit()
    connection.close()


def find_stop(stop_id):
    for stop in STOPS:
        if stop["id"] == stop_id:
            return stop
    return None


@app.get("/api/stops")
def get_stops():
    return jsonify(STOPS)


@app.get("/api/location/1")
def get_bus_location():
    position = simulator.advance()

    save_location(
        1,
        position["lat"],
        position["lng"],
        position["next_stop_id"],
    )

    return jsonify({
        "bus_id": 1,
        "lat": position["lat"],
        "lng": position["lng"],
        "next_stop_id": position["next_stop_id"],
    })


@app.post("/api/location")
def save_bus_location():
    new_location = request.get_json()
    next_stop_id = simulator.get_current_position()["next_stop_id"]

    save_location(
        new_location["bus_id"],
        new_location["lat"],
        new_location["lng"],
        next_stop_id,
    )

    return jsonify({"message": "saved"})


@app.get("/api/eta/1/<int:stop_id>")
def get_eta(stop_id):
    stop = find_stop(stop_id)

    if stop is None:
        return jsonify({"error": "Stop not found"}), 404

    position = simulator.get_current_position()
    minutes = logic.eta_minutes(
        position["lat"],
        position["lng"],
        stop["lat"],
        stop["lng"],
    )

    return jsonify({
        "stop_id": stop_id,
        "minutes": minutes,
    })


@app.get("/api/alert/1/<int:stop_id>")
def get_alert(stop_id):
    stop = find_stop(stop_id)

    if stop is None:
        return jsonify({"error": "Stop not found"}), 404

    position = simulator.get_current_position()
    near = logic.is_near(
        position["lat"],
        position["lng"],
        stop["lat"],
        stop["lng"],
    )
    distance = logic.distance_m(
        position["lat"],
        position["lng"],
        stop["lat"],
        stop["lng"],
    )

    return jsonify({
        "stop_id": stop_id,
        "near": near,
        "distance_m": round(distance),
    })


if __name__ == "__main__":
    app.run(debug=True)