# Brancaster Tidal Calendar

A web app that provides downloadable tidal calendar files (ICS) for Brancaster, Norfolk. High tide times and water heights are available as calendar imports for 2025 and 2026.

Deployed at [bssctides.tobycourtis.com](http://bssctides.tobycourtis.com).

## How it works

1. Raw tidal data (`.txt` files in `2025/`) is cleaned into CSV format using `2025/clean_data.py`
2. `main.py` converts the CSV data into ICS calendar files (output in `ics_output/`)
3. A React app (`brancaster-tides-app/`) serves as a download page for the generated ICS files

## Tech stack

- **Frontend:** React, TypeScript (Create React App)
- **Data processing:** Python 3, `ics` library

## Getting started

### Data processing

```bash
pip install -r requirements.txt
python main.py
```

### React app

```bash
cd brancaster-tides-app
npm install
npm start
```

## Donate button counter

View the donate button click counter at [counterapi.dev](https://app.counterapi.dev/team/toby-courtiss-team/counters/3135).
