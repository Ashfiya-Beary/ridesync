from flask import Flask, jsonify
from flask_cors import CORS

from data import STOPS

app = Flask(__name__)
CORS(app)


@app.get("/api/stops")
def get_stops():
    return jsonify(STOPS)


if __name__ == "__main__":
    app.run(debug=True)