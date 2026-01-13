# AQILens

**Delhi Pollution Source Attribution Map**  

AQILens is an interactive web app that visualizes air pollution in Delhi. Using local AQI data, GeoJSON zones, and simulated indicators, it identifies dominant pollution sources in each zone and provides confidence scores along with recommended actions.

This lightweight tool helps users understand **why different areas of Delhi are polluted** and what practical steps can be taken to reduce exposure.

---

## Features

- Interactive map of Delhi zones  
- Zones colored by **dominant pollution source**  
- Visual **confidence bars** for primary and secondary sources  
- **Recommended actions** based on the dominant source  
- Works entirely with **local CSV and GeoJSON files** (no external APIs needed)  
- Fully client-side and lightweight  

---

## Tech Stack

- **Frontend:** HTML, CSS, JavaScript  
- **Map library:** [Leaflet.js](https://leafletjs.com/)  
- **Data:** Local CSV files & GeoJSON files  

---

## 🚀 How to Run Locally

**Clone the repository** (if not done already):

```bash
git clone https://github.com/akrutitiwari24/AQILens.git
cd AQILens/frontend
```

Start a simple HTTP server using Python:

```bash
# For Python 3
python3 -m http.server 8000
```

Open your browser and go to:

```bash
http://localhost:8000
```

The map should load with Delhi zones, colored by dominant pollution source. Click a zone to see attribution and confidence bars.

