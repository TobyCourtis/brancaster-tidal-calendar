import React from 'react';
import './App.css';

function App() {
    const files = {
        2025: "/Brancaster_Tides_2025.ics",
        2026: "/Brancaster_Tides_2026.ics"
    };

    return (
        <div className="App">
            <header>
                <h1>Brancaster Tidal Calendar</h1>
            </header>
            <main>
                <p>Download here:</p>
                <div className="download-links">
                    <a href={files[2025]} download="brancaster_tides_2025.ics" className="download-link">
                        2025
                    </a>

                    <a href={files[2026]} download="brancaster_tides_2026.ics" className="download-link">
                        2026
                    </a>
                </div>
            </main>
        </div>
    );
}

export default App;
