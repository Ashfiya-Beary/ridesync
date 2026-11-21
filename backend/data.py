import sqlite3
from pathlib import Path


STOPS = [
    {"id": 1, "name": "College Gate", "lat": 13.0700, "lng": 74.9900},
    {"id": 2, "name": "Hostel", "lat": 13.0695, "lng": 74.9925},
    {"id": 3, "name": "Market", "lat": 13.0680, "lng": 74.9950},
    {"id": 4, "name": "Temple Road", "lat": 13.0665, "lng": 74.9975},
    {"id": 5, "name": "Bus Stand", "lat": 13.0650, "lng": 75.0000},
]

DATABASE_FILE = Path(__file__).parent / "ridesync.db"


def create_tables():
    connection = sqlite3.connect(DATABASE_FILE)

    connection.execute("""
        CREATE TABLE IF NOT EXISTS stops (
            id INTEGER PRIMARY KEY,
            name TEXT NOT NULL,
            lat REAL NOT NULL,
            lng REAL NOT NULL
        )
    """)

    connection.execute("""
        CREATE TABLE IF NOT EXISTS bus_locations (
            bus_id INTEGER PRIMARY KEY,
            lat REAL NOT NULL,
            lng REAL NOT NULL,
            next_stop_id INTEGER NOT NULL
        )
    """)

    for stop in STOPS:
        connection.execute(
            """
            INSERT OR REPLACE INTO stops (id, name, lat, lng)
            VALUES (?, ?, ?, ?)
            """,
            (stop["id"], stop["name"], stop["lat"], stop["lng"]),
        )

    connection.commit()
    connection.close()


create_tables()