# 🛡️ SafeRoute — Real-Time Safe Navigation for Women

> Routes designed for safety, not just speed.

## Problem Statement
Existing navigation apps (Google Maps, Apple Maps) optimize routes by speed or distance.
Women — especially at night — need routes that prioritize **safety**: lit streets,
CCTV coverage, busy areas, and low crime zones.

## Solution
SafeRoute is a web app that:
- Takes a start and end location
- Asks for time of travel (day or night)
- Shows a safety-scored route on a map
- Displays safety tips and risk warnings for the area

## Tech Stack
- **Frontend:** HTML, CSS, JavaScript, Leaflet.js
- **Map Data:** OpenStreetMap (free)
- **Routing API:** OSRM (free walking routes)
- **Geocoding:** Nominatim (free address lookup)
- **Backend:** Node.js + Express

## How to Run Locally
```bash
git clone https://github.com/abhinavkhedwal4-maker/saferoute
cd saferoute
npm install
node server.js
```
Then open http://localhost:3000 in your browser.

## Live Demo
[Link to your deployed app]

## Team
[Code OPS/Abhinav Khedwal/Nishi Agarwal]