import React, { useMemo, useCallback, useState } from "react";
import EventItem from "./EventItem";

function Calendar({ events }) {

    const [selectedEvent, setSelectedEvent] = useState(null);

    const totalEvents = useMemo(() => {
        console.log("Calculating total events...");
        return events.length;
    }, [events]);

    const handleEventClick = useCallback((event) => {
        setSelectedEvent(event);
    }, []);

    return (
        <div className="calendar-container">

            <h2>Interactive Calendar</h2>

            <p>
                Total Events: <strong>{totalEvents}</strong>
            </p>

            <div className="event-list">

                {events.map((event) => (
                    <EventItem
                        key={event.id}
                        event={event}
                        onEventClick={handleEventClick}
                    />
                ))}

            </div>

            {selectedEvent && (
                <div className="selected-event">

                    <h3>Selected Event</h3>

                    <p>
                        Event: {selectedEvent.title}
                    </p>

                    <p>
                        Date: {selectedEvent.date}
                    </p>

                </div>
            )}

        </div>
    );
}

export default React.memo(Calendar);