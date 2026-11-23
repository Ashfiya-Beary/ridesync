# RideSync

This is our college mini project. Students at our college don't know where the bus is, so they wait at the stop and can't tell if it already left or is still coming. RideSync is our try to fix that.

A student opens the page, picks their stop, and sees the bus on a map, how many minutes it will take to reach that stop, and a "BUS IS NEAR" message when it gets close.

We don't have a real GPS device, so the bus you see is a fake one made by a simulator. Everything else works the same way it would with a real bus.

## What it can do right now
- Shows the bus stops on a map
- Shows a bus moving on the map, updated every second
- Shows the ETA for the stop you choose
- Shows "BUS IS NEAR" when the bus gets close to your stop

## How it works
Our Flask server has a simulator that moves the bus. The web page asks the server every second, "where is the bus?". If you picked a stop, it also asks "how many minutes?" and "is the bus near?". The answers come back, and the page shows them on the map and in the box on the right side.

## Tools we used
- Python and Flask for the server
- HTML, CSS and JavaScript for the page
- Leaflet and OpenStreetMap for the map
- Git and GitHub to work together as a team

## How to run it
First time only, in the backend folder:
python -m venv venv
venv\Scripts\activate
python -m pip install flask flask-cors

Start the server, in the backend folder:
venv\Scripts\activate
python app.py

Start the page, in a second terminal, in the frontend folder:
python -m http.server 8000

Then open http://localhost:8000 in the browser.

## Who did what
- Member 1:Fathima Sheik (Flask server)
- Member 2:Nowsiya (simulator, ETA and near logic)
- Member 3:Beary Aysha Asfiya Sadiq (map page, panel, GitHub)
- Member 4:Rhonuk Shifana (panel and driver page)

## Problems we ran into
- On one laptop, Windows blocked pip, so we used "python -m pip install" instead.
- The browser kept showing the old page after we changed the code. A hard reload (Ctrl + Shift + R) fixed it.
- The stops on the map are still sample places, not our real bus route.

## What it can't do yet
- The bus is fake, not real GPS
- The ETA is just distance divided by speed. It doesn't know if the bus already passed your stop.
- Only one bus and one route

## What we want to add later
- Real GPS from the driver's phone
- A QR bus pass and an admin page
- A better ETA that uses the order of the stops