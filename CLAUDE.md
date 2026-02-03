# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Brancaster Tidal Calendar — a web app that provides downloadable ICS calendar files containing high tide times and water heights for Brancaster, Norfolk. Deployed at http://bssctides.tobycourtis.com.

## Commands

All React app commands run from `brancaster-tides-app/`:

```bash
npm start          # Dev server on port 58300
npm test           # Jest tests (watch mode)
npm run build      # Production build
```

Python data processing (from repo root):

```bash
pip install -r requirements.txt
python 2025/clean_data.py    # Convert raw .txt tidal data to CSV
python main.py               # Convert CSV to ICS calendar files
```

Deployment (on Linux server):

```bash
cd brancaster-tides-app && nvm use v16.20.0 && npm run build
sudo cp -r ./build/* /var/www/bssctides.tobycourtis.com/
```

## Architecture

The project has two tiers:

### Data Pipeline (Python, offline/manual)

1. **Raw data** (`2025/*.txt`) — space-separated tidal data (date, time, height)
2. **`2025/clean_data.py`** — parses raw text into normalized CSV files in `tidal_data/`
3. **`main.py`** — reads CSV, groups tides by date, generates ICS calendar events using the `ics` library. Each event is an all-day entry named "HT [time1], [time2]" with heights in the description. Output goes to `ics_output/` and `brancaster-tides-app/public/`

### Web Frontend (React/TypeScript, Create React App)

Single-page app with one component (`App.tsx`) that displays download buttons linking to pre-generated ICS files in `public/`. Styling is plain CSS with flexbox layout. The ICS files are served as static assets — there is no backend API.

## Key Files

- `main.py` — ICS generation logic (set `YEAR` variable to target year)
- `2025/clean_data.py` — raw data parser
- `brancaster-tides-app/src/App.tsx` — the entire UI
- `brancaster-tides-app/public/Brancaster_Tides_*.ics` — served calendar files
- `tidal_data/*.csv` — intermediate processed data
