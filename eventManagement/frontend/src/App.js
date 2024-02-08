import React from "react";
import EventForm from "./component/EventForm";
import EventList from "./component/EventList";
import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

const App = () => {
	const [events, setEvents] = useState([]);
	useEffect(() => {
		// Fetch events from the server
		// https://event-mangement-app.onrender.com
		axios
			.get("https://event-mangement-app.onrender.com/api/events")
			.then((response) => setEvents(response.data))
			.catch((error) => console.error(error));
	}, []);

	const handleEventAdd = (newEvent) => {
		setEvents([...events, newEvent]);
	};

	const handleEventDelete = (id) => {
		console.log("delete event " + id);
		// Delete an event
		axios
			.delete(`https://event-mangement-app.onrender.com/api/events/${id}`)
			.then(() => setEvents(events.filter((event) => event._id !== id)))
			.catch((error) => console.error(error));
	};

	const handleToggleReminder = (eventId) => {
		// console.log('HI');

		// Find the event by ID
		const selectedEvent = events.find((event) => event._id === eventId);

		// Toggle the reminder status
		const updatedEvent = {
			...selectedEvent,
			reminder: !selectedEvent.reminder,
		};

		// console.log('Updated',updatedEvent);

		// Update the event in the database
		axios
			.put(
				`https://event-mangement-app.onrender.com/api/events/${eventId}`,
				updatedEvent
			)
			.then((response) => {
				// console.log('res',response.data);

				// If the update is successful, update the events in the state
				const updatedEvents = events.map((event) =>
					event._id === eventId ? updatedEvent : event
				);
				setEvents(updatedEvents);
			})
			.catch((error) =>
				console.error(
					`Error updating reminder status for
				event with ID ${eventId}:`,
					error
				)
			);
	};

	const onEventEdit = (eventId, updatedData) => {
		// Update the event in the database
		axios
			.put(
				`https://event-mangement-app.onrender.com/api/events/${eventId}`,
				updatedData
			)
			.then((response) => {
				// If the update is successful, update the events in the state
				const updatedEvents = events.map((event) =>
					event._id === eventId ? { ...event, ...updatedData } : event
				);
				setEvents(updatedEvents);
			})
			.catch((error) =>
				console.error(
					`Error updating event with
						ID ${eventId}:`,
					error
				)
			);
	};

	return (
		<div>
			<div className="main-container">
				<h2>Event Management App</h2>
				<EventForm onEventAdd={handleEventAdd} />
				<EventList
					events={events}
					onEventDelete={handleEventDelete}
					onToggleReminder={handleToggleReminder}
					onEventEdit={onEventEdit}
				/>
			</div>
		</div>
	);
};

export default App;
