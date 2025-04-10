import requests
import json
import os
import time

BASE_URL = "https://eldenring.fanapis.com/api"
CATEGORIES = {
    "weapons": {"endpoint": "weapons", "paginate": True},
    "armor": {"endpoint": "armors", "paginate": True},
    "sorceries": {"endpoint": "sorceries", "paginate": True},
    "talismans": {"endpoint": "talismans", "paginate": True},
    "ammos": {"endpoint": "ammos", "paginate": True},
    "shields": {"endpoint": "shields", "paginate": True},
    "ashes": {"endpoint": "ashes", "paginate": True},
    "classes": {"endpoint": "classes", "paginate": False},  # No pagination
}

HEADERS = {
    "User-Agent": "Mozilla/5.0"
}

# Ensure data folder exists
os.makedirs("data", exist_ok=True)

def fetch_category_data(endpoint, filename, use_pagination):
    print(f"\nFetching {filename}...")

    all_items = []

    if use_pagination:
        page = 0
        more_data = True
        while more_data:
            page += 1
            url = f"{BASE_URL}/{endpoint}?page={page}"
            res = requests.get(url, headers=HEADERS)

            if res.status_code != 200:
                print(f"  Failed to fetch page {page}: {res.status_code}")
                break

            data = res.json().get("data", [])
            if not data:
                more_data = False
                break

            all_items.extend(data)
            print(f"  Page {page}: {len(data)} items")
            time.sleep(0.2)
    else:
        url = f"{BASE_URL}/{endpoint}"
        res = requests.get(url, headers=HEADERS)

        if res.status_code != 200:
            print(f"  Failed to fetch {filename}: {res.status_code}")
        else:
            all_items = res.json().get("data", [])
            print(f"  Retrieved {len(all_items)} items")

    with open(f"data/{filename}.json", "w", encoding="utf-8") as f:
        json.dump(all_items, f, indent=2, ensure_ascii=False)

    print(f"  Saved to data/{filename}.json")

def fetch_all():
    start = time.time()
    for label, info in CATEGORIES.items():
        fetch_category_data(info["endpoint"], label, info["paginate"])
    print(f"\n✅ All data fetched in {time.time() - start:.2f} seconds.")

if __name__ == "__main__":
    fetch_all()
