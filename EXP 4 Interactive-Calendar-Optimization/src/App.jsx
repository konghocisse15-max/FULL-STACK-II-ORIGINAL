import React, { useState, useCallback } from "react";
import Calendar from "./components/Calendar";
import eventsData from "./data/events";
import "./App.css";

function App() {

    const [events, setEvents] = useState(eventsData);

    const addEvent = useCallback(() => {

        const newEvent = {
            id: Date.now().toString(),
            title: "New Event",
            date: "2026-08-20"
        };

        setEvents((previousEvents) => [
            ...previousEvents,
            newEvent
        ]);

    }, []);

    return (
        <div className="App">

            <h1>Interactive Calendar Scheduler</h1>

            <p className="student-name">
                Prepared by: KONGHO CISSE
            </p>

            <button onClick={addEvent}>
                Add Event
            </button>

            <Calendar events={events} />

        </div>
    );
}

export default App;