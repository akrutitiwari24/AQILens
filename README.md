# AQILens

**Delhi Pollution Source Attribution Map**

AQILens is a web app that visualizes air pollution in Delhi using satellite indicators, AQI data, and simple attribution logic to show dominant pollution sources in each zone.

This project was created as a lightweight, interactive visualization for understanding why different areas of Delhi are polluted and what actions to take.


---

## Overview

AQILens shows an interactive map of Delhi zones and:

- Highlights zones by dominant pollution source
- Displays pollution attribution per zone
- Shows confidence scores via visual bars
- Offers suggested actions based on dominant source (planned future enhancement)
- Uses data from local CSV and GeoJSON files
- No external APIs needed

---

## How to Run Locally

AQILens is a **static web project** (HTML, CSS, JS) and can be served using any simple static server.


If you have Python installed:

```bash
cd frontend
python3 -m http.server 8000

Then open your browser and go to:

http://localhost:8000


Data Sources

Delhi zone boundaries in GeoJSON format
Historical AQI / PM2.5 data in CSV
Simulated satellite indicators
Source attribution CSV linking zones to scores

All data is stored locally in the data/ folder — no external APIs.


---

1. Commit to your local repo:
```bash
git add README.md
git commit -m "Add detailed README"
git push
