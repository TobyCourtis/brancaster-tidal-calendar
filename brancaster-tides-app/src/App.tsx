import React, { useState, useEffect } from 'react';
import './App.css';

interface TideEntry {
    date: Date;
    dateLabel: string;
    times: string;
    heights: string;
}

function parseIcs(text: string): TideEntry[] {
    const events = text.split('BEGIN:VEVENT').slice(1);
    const entries: TideEntry[] = [];

    for (const event of events) {
        const dateMatch = event.match(/DTSTART;VALUE=DATE:(\d{4})(\d{2})(\d{2})/);
        const summaryMatch = event.match(/SUMMARY:(.+)/);
        const descMatch = event.match(/DESCRIPTION:(.+)/);

        if (dateMatch && summaryMatch) {
            const [, year, month, day] = dateMatch;
            const date = new Date(Number(year), Number(month) - 1, Number(day));
            const times = summaryMatch[1].replace(/\\,/g, ',');
            const heights = descMatch ? descMatch[1].replace(/\\,/g, ',') : '';

            entries.push({
                date,
                dateLabel: date.toLocaleDateString('en-GB', {
                    weekday: 'short',
                    day: 'numeric',
                    month: 'short',
                }),
                times,
                heights,
            });
        }
    }

    return entries;
}

const DownloadIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="7 10 12 15 17 10" />
        <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
);

function App() {
    const [upcomingTides, setUpcomingTides] = useState<TideEntry[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/Brancaster_Tides_2026.ics')
            .then(res => res.text())
            .then(text => {
                const all = parseIcs(text);
                const now = new Date();
                now.setHours(0, 0, 0, 0);
                const future = all
                    .filter(e => e.date >= now)
                    .sort((a, b) => a.date.getTime() - b.date.getTime())
                    .slice(0, 5);
                setUpcomingTides(future);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    return (
        <div className="App">
            <header>
                <h1>Brancaster Tidal Calendar</h1>
                <p className="subtitle">
                    High tide times for Brancaster, Norfolk — add them straight to your calendar
                </p>
            </header>

            <main>
                <div className="tides-preview">
                    <h2>Upcoming High Tides</h2>
                    {loading ? (
                        <p className="tides-loading">Loading tide times...</p>
                    ) : upcomingTides.length > 0 ? (
                        upcomingTides.map((tide, i) => (
                            <div className="tide-entry" key={i}>
                                <span className="tide-date">{tide.dateLabel}</span>
                                <span className="tide-times">{tide.times}</span>
                                <span className="tide-heights">{tide.heights}</span>
                            </div>
                        ))
                    ) : (
                        <p className="tides-loading">No upcoming tides available</p>
                    )}
                </div>

                <div className="download-section">
                    <h2>Download Calendar</h2>
                    <div className="download-links">
                        <a
                            href="/Brancaster_Tides_2025.ics"
                            download="brancaster_tides_2025.ics"
                            className="download-link"
                        >
                            <DownloadIcon />
                            2025
                        </a>
                        <a
                            href="/Brancaster_Tides_2026.ics"
                            download="brancaster_tides_2026.ics"
                            className="download-link"
                        >
                            <DownloadIcon />
                            2026
                        </a>
                    </div>
                    <p className="calendar-note">
                        Works with Apple Calendar, Google Calendar, and Outlook
                    </p>
                </div>
            </main>

            <footer>
                <p className="donate-text">
                    Found this helpful? You can support me by donating to my London Marathon fundraiser!
                </p>
                <a
                    href="https://2026tcslondonmarathon.enthuse.com/pf/toby-courtis"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="coffee-link"
                    onClick={() => {
                        try {
                            fetch("https://api.counterapi.dev/v2/toby-courtiss-team-2758/london-fundraiser/up", {
                                mode: "no-cors"
                            }).catch(() => {});
                        } catch {}
                    }}
                >
                    Donate here
                </a>
                <p className="attribution">Brancaster Tidal Calendar</p>
            </footer>
        </div>
    );
}

export default App;
