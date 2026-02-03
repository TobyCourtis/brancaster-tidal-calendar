import csv
import os
from ics import Calendar, Event
from datetime import datetime

YEAR = 2026

script_dir = os.path.dirname(os.path.abspath(__file__))
csv_path = os.path.join(script_dir, f'tidal_data/{YEAR}_tides.csv')

calendar = Calendar()


def parse_date(date_str):
    date_str = date_str.replace("/", "")
    return datetime.strptime(date_str, "%d%m%Y")


events_by_date = {}
with open(csv_path, 'r') as file:
    reader = csv.DictReader(file)
    for row in reader:
        date = parse_date(row['date']).date()
        if date not in events_by_date:
            events_by_date[date] = []
        events_by_date[date].append(row)


def height_one_dp(e):
    return round(float(e['height']), 1)


for date, events in events_by_date.items():
    event = Event()
    event.begin = date
    event.make_all_day()
    event.alarms = []

    if len(events) == 1:
        event.name = f"HT {events[0]['time']}"
        event.description = f"{height_one_dp(events[0])}m"
    elif len(events) == 2:
        event.name = f"HT {events[0]['time']}, {events[1]['time']}"
        event.description = f"{height_one_dp(events[0])}m, {height_one_dp(events[1])}m"

    calendar.events.add(event)

filename = f'ics_output/Brancaster Tides {YEAR}.ics'
ics_path = os.path.join(script_dir, filename)
with open(ics_path, 'w') as file:
    file.writelines(calendar)

print(f'Saved output to {filename}')
