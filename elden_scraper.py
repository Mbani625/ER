'''
import requests
from bs4 import BeautifulSoup
from concurrent.futures import ThreadPoolExecutor
import json
import time
import os

BASE_URL = "https://eldenring.wiki.fextralife.com"
WEAPON_LIST_URL = f"{BASE_URL}/Weapons"

HEADERS = {
    "User-Agent": "Mozilla/5.0"
}

# Ensure output folder exists
os.makedirs("data", exist_ok=True)

def get_weapon_links():
    print("Fetching weapon list...")
    response = requests.get(WEAPON_LIST_URL, headers=HEADERS)
    soup = BeautifulSoup(response.text, 'html.parser')
    links = []

    for a in soup.select('div[class*="wiki_page"] a'):
        href = a.get("href", "")
        if "/weapon" in href.lower() or "/Weapons/" in href:
            full_url = BASE_URL + href if href.startswith("/") else href
            links.append(full_url)

    # Remove duplicates and filter invalid ones
    links = list(set(links))
    print(f"Found {len(links)} weapon pages.")
    return links

def parse_weapon_page(url):
    try:
        res = requests.get(url, headers=HEADERS)
        soup = BeautifulSoup(res.text, 'html.parser')

        title = soup.select_one("h1.page-title").text.strip()
        tables = soup.select("table")

        weapon_data = {
            "name": title,
            "url": url,
        }

        # Try to find relevant stats table
        for table in tables:
            rows = table.select("tr")
            for row in rows:
                if ":" not in row.text:
                    continue
                cols = row.select("td, th")
                if len(cols) == 2:
                    key = cols[0].text.strip()
                    val = cols[1].text.strip()
                    weapon_data[key] = val

        return weapon_data
    except Exception as e:
        print(f"Error parsing {url}: {e}")
        return None

def scrape_all_weapons():
    weapon_links = get_weapon_links()
    all_weapons = []

    print("Scraping weapon pages in parallel...")

    with ThreadPoolExecutor(max_workers=10) as executor:
        futures = executor.map(parse_weapon_page, weapon_links)

        for weapon in futures:
            if weapon:
                all_weapons.append(weapon)

    print(f"Scraped {len(all_weapons)} weapons.")
    with open("data/weapons.json", "w", encoding="utf-8") as f:
        json.dump(all_weapons, f, indent=2, ensure_ascii=False)

    print("Saved to data/weapons.json")

if __name__ == "__main__":
    start = time.time()
    scrape_all_weapons()
    print(f"Completed in {time.time() - start:.2f} seconds.")
'''