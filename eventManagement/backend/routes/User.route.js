const express = require("express");
const User = require("../models/User");
const router = express.Router();

router.get("/", async (req, res) => {
	try {
		const users = await User.find();
		res.json(users);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

router.post("/", async (req, res) => {
	const user = new User({
		name: req.body.name,
		email: req.body.email,
		password: req.body.password,
	});

	try {
		const newUser = await user.save();
		res.status(201).json(newUser);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

router.delete("/:id", async (req, res) => {
	try {
		await User.findByIdAndDelete(req.params.id);
		res.json({ message: "User Deleted" });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

router.put("/:id", async (req, res) => {
	const eventId = req.params.id;
	const { name, email, password } = req.body;

	try {
		const userUpdate = await User.findById(eventId);

		if (!userUpdate) {
			return res.status(404).json({ message: "User not found" });
		}

		userUpdate.name = name;
		userUpdate.email = email;
		userUpdate.password = password;

		await userUpdate.save();
		res.json(userUpdate);
	} catch (error) {
		console.error("Error updating event:", error);
	}
});

module.exports = router;
