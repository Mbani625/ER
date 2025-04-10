import requests
import json
import os
import time

BASE_URL = "https://eldenring.fanapis.com/api"
CATEGORIES = {
    "weapons": "weapons",
    "armor": "armors",
    "sorceries": "sorceries",
    "talismans": "talismans",
    "ammos": "ammos",
    "shields": "shields",
    "classes": "classes",
    "ashes": "ashes"
}

HEADERS = {
    "User-Agent": "Mozilla/5.0"
}

# Create data folder
os.makedirs("data", exist_ok=True)

def fetch_category_data(endpoint, filename):
    print(f"\nFetching {filename}...")
    all_items = []
    page = 0
    more_data = True

    while more_data:
        page += 1
        url = f"{BASE_URL}/{endpoint}?page={page}"
        res = requests.get(url, headers=HEADERS)

        if res.status_code != 200:
            print(f"Failed to fetch page {page} of {filename}: {res.status_code}")
            break

        data = res.json().get("data", [])
        if not data:
            more_data = False
            break

        all_items.extend(data)
        print(f"  Page {page}: {len(data)} items")
        time.sleep(0.2)

    print(f"  Total {filename}: {len(all_items)} items")

    with open(f"data/{filename}.json", "w", encoding="utf-8") as f:
        json.dump(all_items, f, indent=2, ensure_ascii=False)

    print(f"  Saved to data/{filename}.json")

def fetch_all():
    start = time.time()
    for label, endpoint in CATEGORIES.items():
        fetch_category_data(endpoint, label)
    print(f"\n✅ Completed in {time.time() - start:.2f} seconds.")

if __name__ == "__main__":
    fetch_all()
