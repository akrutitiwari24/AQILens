// ===============================
// STEP 1: CREATE MAP
// ===============================
const map = L.map("map").setView([28.6139, 77.2090], 10);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "© OpenStreetMap contributors"
}).addTo(map);

// ===============================
// STEP 2: LOAD CSV DATA
// ===============================
const zoneData = {};

fetch("data/zone_source_attribution.csv")
  .then(res => res.text())
  .then(text => {
    const rows = text.trim().split("\n").slice(1);

    rows.forEach(row => {
      const [zone, primarySource, primaryConfidence, secondarySource, secondaryConfidence] = row.split(",");
      zoneData[zone.trim()] = {
        primary_source: primarySource,
        primary_confidence: Number(primaryConfidence),
        secondary_source: secondarySource,
        secondary_confidence: Number(secondaryConfidence)
      };
    });

    console.log("Zone attribution loaded:", zoneData);
    loadGeoJSON(); // load GeoJSON only after CSV
  });

// ===============================
// STEP 3: COLORS & ADVISORIES
// ===============================
const sourceColors = {
  Traffic_Score: "#e74c3c",
  Dust_Score: "#f39c12",
  Industry_Score: "#3498db",
  Biomass_Score: "#2ecc71"
};

const sourceAdvisoryMap = {
  Traffic_Score: [
    "Avoid peak traffic hours (8–10 AM, 6–8 PM)",
    "Use masks during long commutes",
    "Prefer public transport when possible"
  ],
  Dust_Score: [
    "Limit outdoor exposure during dry conditions",
    "Wear masks in construction-heavy areas",
    "Keep windows closed during dust events"
  ],
  Industry_Score: [
    "Avoid prolonged outdoor exposure near industrial zones",
    "Use indoor air purifiers if available",
    "Follow local pollution advisories"
  ],
  Biomass_Score: [
    "Stay indoors during early morning and late evening",
    "Avoid outdoor exercise during smoke periods",
    "Ensure proper indoor ventilation"
  ]
};

// ===============================
// STEP 4: CLICK HANDLER
// ===============================
function onEachZone(feature, layer) {
  layer.on("click", () => {
    const zoneName = feature.properties.A_CNST_NM;
    const data = zoneData[zoneName];

    if (!data) return;

    // Update text fields
    document.getElementById("zone-name").textContent = zoneName;
    document.getElementById("zone-desc").textContent = "Pollution source attribution for this zone";

    document.getElementById("primary-source").textContent = data.primary_source.replace("_Score", "");
    document.getElementById("secondary-source").textContent = data.secondary_source.replace("_Score", "");

    document.getElementById("primary-confidence").textContent = data.primary_confidence + "%";
    document.getElementById("secondary-confidence").textContent = data.secondary_confidence + "%";

    // Update bars
    const primaryBar = document.getElementById("primary-bar");
    primaryBar.style.width = data.primary_confidence + "%";
    primaryBar.style.background = sourceColors[data.primary_source];

    const secondaryBar = document.getElementById("secondary-bar");
    secondaryBar.style.width = data.secondary_confidence + "%";
    secondaryBar.style.background = sourceColors[data.secondary_source];

    // ===============================
    // RECOMMENDATIONS
    // ===============================
    const advisoryList = document.getElementById("advisory-list");
    advisoryList.innerHTML = "";

    // Add primary source tips
    (sourceAdvisoryMap[data.primary_source] || []).forEach(tip => {
      const li = document.createElement("li");
      li.textContent = tip;
      advisoryList.appendChild(li);
    });

    // Add secondary source tips
    (sourceAdvisoryMap[data.secondary_source] || []).forEach(tip => {
      const li = document.createElement("li");
      li.textContent = tip;
      advisoryList.appendChild(li);
    });
  });
}

// ===============================
// STEP 5: LOAD GEOJSON
// ===============================
function loadGeoJSON() {
  fetch("data/delhi_zones.geojson")
    .then(res => res.json())
    .then(geojson => {
      L.geoJSON(geojson, {
        style: feature => ({
          color: "#333",
          weight: 1,
          fillColor: sourceColors[zoneData[feature.properties.A_CNST_NM]?.primary_source] || "#999",
          fillOpacity: 0.6
        }),
        onEachFeature: onEachZone
      }).addTo(map);
    });
}
