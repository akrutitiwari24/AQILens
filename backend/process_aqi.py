import pandas as pd

# File paths
import os
import pandas as pd

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
INPUT_FILE = os.path.join(BASE_DIR, "..", "data", "aqi", "Delhi_AQI_Dataset.csv")
OUTPUT_FILE = os.path.join(BASE_DIR, "..", "data", "aqi", "pm25_summary.csv")

def main():
    # Load dataset
    df = pd.read_csv(INPUT_FILE)

    # Standardize column names (defensive)
    df.columns = [c.lower().strip() for c in df.columns]

    # Identify PM2.5 column (robust handling)
    pm_candidates = ["pm2_5", "pm25", "pm2.5"]

    pm_col = None
    for col in pm_candidates:
        if col in df.columns:
            pm_col = col
            break

    if pm_col is None:
        raise ValueError("PM2.5 column not found in dataset")


    # Identify date column
    if "date" not in df.columns:
        raise ValueError("Date column not found in dataset")

    # Convert date column to datetime
    df["date"] = pd.to_datetime(df["date"], errors="coerce")
    df = df.dropna(subset=["date"])

    # Extract month
    df["month"] = df["date"].dt.month

    # Filter months
    sept_df = df[df["month"] == 9]
    nov_df = df[df["month"] == 11]

    # Compute averages
    sept_avg = sept_df[pm_col].mean()
    nov_avg = nov_df[pm_col].mean()

    # Create summary dataframe
    summary_df = pd.DataFrame({
        "period": ["normal_month", "high_pollution_month"],
        "month": ["September", "November"],
        "avg_pm25": [round(sept_avg, 2), round(nov_avg, 2)]
    })

    # Save output
    summary_df.to_csv(OUTPUT_FILE, index=False)

    print("PM2.5 processing complete.")
    print(summary_df)

if __name__ == "__main__":
    main()
