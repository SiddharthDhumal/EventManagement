// src/EventList.js
import React, { useState } from "react";
// Import the new EventItem component
import EventItem from "./EventItem";

const EventList = ({
	events,
	onEventDelete,
	onToggleReminder,
	onEventEdit,
}) => {
	const [editedEvents, setEditedEvents] = useState([]);

	const handleEventEdit = (eventId, updatedData) => {
		const eventIndex = editedEvents.findIndex((event) => event._id === eventId);

		if (eventIndex !== -1) {
			const updatedEditedEvents = [...editedEvents];
			updatedEditedEvents[eventIndex] = {
				...updatedEditedEvents[eventIndex],
				...updatedData,
			};

			setEditedEvents(updatedEditedEvents);
		} else {
			setEditedEvents([...editedEvents, { _id: eventId, ...updatedData }]);
		}

		onEventEdit(eventId, updatedData);
	};

	return (
		<div className="event-list">
			{events.map((event) => (
				<EventItem
					key={event._id}
					event={
						editedEvents.find((editedEvent) => editedEvent._id === event._id) ||
						event
					}
					onToggleReminder={onToggleReminder}
					onEventDelete={onEventDelete}
					onEventEdit={handleEventEdit}
				/>
			))}
		</div>
	);
};

export default EventList;
