import pandas as pd
import os

# -----------------------------
# Paths
# -----------------------------
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
INDICATORS_FILE = os.path.join(BASE_DIR, "..", "data", "indicators", "simulated_satellite_indicators.csv")
OUTPUT_FILE = os.path.join(BASE_DIR, "..", "data", "indicators", "zone_source_attribution.csv")

# -----------------------------
# Load simulated indicators
# -----------------------------
df = pd.read_csv(INDICATORS_FILE)

# -----------------------------
# Normalize scores to 0-100
# -----------------------------
score_columns = ["Traffic_Score", "Dust_Score", "Biomass_Score", "Industry_Score"]

# Min-max normalization per column
for col in score_columns:
    min_val = df[col].min()
    max_val = df[col].max()
    if max_val - min_val == 0:
        df[col + "_norm"] = 0
    else:
        df[col + "_norm"] = ((df[col] - min_val) / (max_val - min_val)) * 100

# -----------------------------
# Determine dominant and secondary sources
# -----------------------------
primary_sources = []
secondary_sources = []
primary_confidences = []
secondary_confidences = []

for index, row in df.iterrows():
    norm_scores = {col.replace("_Score_norm",""): row[col+"_norm"] for col in score_columns}
    sorted_sources = sorted(norm_scores.items(), key=lambda x: x[1], reverse=True)
    
    primary_sources.append(sorted_sources[0][0])
    primary_confidences.append(round(sorted_sources[0][1],1))
    
    if len(sorted_sources) > 1:
        secondary_sources.append(sorted_sources[1][0])
        secondary_confidences.append(round(sorted_sources[1][1],1))
    else:
        secondary_sources.append(None)
        secondary_confidences.append(None)

# -----------------------------
# Save results
# -----------------------------
df["Primary_Source"] = primary_sources
df["Primary_Confidence"] = primary_confidences
df["Secondary_Source"] = secondary_sources
df["Secondary_Confidence"] = secondary_confidences

# Keep only relevant columns for frontend
output_df = df[["Zone", "Primary_Source", "Primary_Confidence", "Secondary_Source", "Secondary_Confidence"]]

output_df.to_csv(OUTPUT_FILE, index=False)

print(f"Source attribution complete. Results saved to {OUTPUT_FILE}")
print(output_df)
