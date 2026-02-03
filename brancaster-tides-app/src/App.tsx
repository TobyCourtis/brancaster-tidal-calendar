import React from 'react';
import './App.css';

function App() {
    return (
        <div className="App">
            <header>
                <h1>Brancaster Tidal Calendar</h1>
            </header>
            <main>
                <p>Download here:</p>
                <div className="download-links">
                    <a href="/Brancaster_Tides_2026.ics" download="brancaster_tides_2026.ics" className="download-link">
                        2026
                    </a>
                </div>
                <p className="donate-text">Found this helpful? You can support me by donating to my London Marathon fundraiser!</p>
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
            </main>
        </div>
    );
}

export default App;
