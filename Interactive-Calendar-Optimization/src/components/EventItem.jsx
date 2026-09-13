import React from "react";

const EventItem = React.memo(function EventItem({ event, onEventClick }) {

    console.log("EventItem rendered:", event.title);

    return (
        <div
            className="event-item"
            onClick={() => onEventClick(event)}
        >
            {event.title}
        </div>
    );
});

export default EventItem;