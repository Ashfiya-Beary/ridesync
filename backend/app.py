import sqlite3

from flask import Flask, jsonify, request
from flask_cors import CORS

from data import DATABASE_FILE, STOPS

app = Flask(__name__)
CORS(app)


def read_location(bus_id):
    connection = sqlite3.connect(DATABASE_FILE)
    connection.row_factory = sqlite3.Row

    location = connection.execute(
        """
        SELECT bus_id, lat, lng, next_stop_id
        FROM bus_locations
        WHERE bus_id = ?
        """,
        (bus_id,),
    ).fetchone()

    connection.close()

    if location is None:
        return {
            "bus_id": 1,
            "lat": 13.0700,
            "lng": 74.9900,
            "next_stop_id": 2,
        }

    return dict(location)


@app.get("/api/stops")
def get_stops():
    return jsonify(STOPS)


@app.get("/api/location/1")
def get_bus_location():
    return jsonify(read_location(1))


@app.post("/api/location")
def save_bus_location():
    new_location = request.get_json()

    connection = sqlite3.connect(DATABASE_FILE)
    connection.execute(
        """
        INSERT OR REPLACE INTO bus_locations
        (bus_id, lat, lng, next_stop_id)
        VALUES (?, ?, ?, ?)
        """,
        (
            new_location["bus_id"],
            new_location["lat"],
            new_location["lng"],
            2,
        ),
    )
    connection.commit()
    connection.close()

    return jsonify({"message": "saved"})


@app.get("/api/eta/1/<int:stop_id>")
def get_eta(stop_id):
    return jsonify({
        "stop_id": stop_id,
        "minutes": 4.5,
    })


@app.get("/api/alert/1/<int:stop_id>")
def get_alert(stop_id):
    return jsonify({
        "stop_id": stop_id,
        "near": True,
        "distance_m": 180,
    })


if __name__ == "__main__":
    app.run(debug=True)