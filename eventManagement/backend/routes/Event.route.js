const express = require("express");
const router = express.Router();
const Event = require("../models/Event");

router.get("/", async (req, res) => {
	try {
		const events = await Event.find();
		res.json(events);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

router.post("/", async (req, res) => {
	const event = new Event({
		title: req.body.title,
		date: req.body.date,
		reminder: req.body.reminder || false,
	});

	try {
		const newEvent = await event.save();
		res.status(201).json(newEvent);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
});

router.delete("/:id", async (req, res) => {
	try {
		await Event.findByIdAndDelete(req.params.id);

		res.json({ message: "Event Deleted" });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

router.put("/:id", async (req, res) => {
	const eventId = req.params.id;
	const { title, date, reminder } = req.body;

	try {
		const event = await Event.findById(eventId);

		if (!event) {
			return res.status(404).json({ message: "Event not find" });
		}
		event.title = title;
		event.date = date;
		event.reminder = reminder;

		await event.save();

		res.json(event);
	} catch (error) {
		console.error("Error updating event:", error);
	}
});

module.exports = router;
