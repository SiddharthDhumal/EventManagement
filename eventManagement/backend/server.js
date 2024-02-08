const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const eventRoutes = require("./routes/Event.route");
const userRoutes = require("./routes/User.route");
const cors = require("cors");
require("dotenv").config();
const { createProxyMiddleware } = require("http-proxy-middleware");
const app = express();

app.use(cors());
app.use(bodyParser.json());

const port = process.env.PORT;

const DB = process.env.DATABASE_LOCAL;

mongoose
	.connect(DB, {
		useNewurlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		console.log("Connected to MongoDB");
	});

app.use(
	"/api/events",
	createProxyMiddleware({
		target: "http://www.example.org",
		changeOrigin: true,
	}),
	eventRoutes
);

app.use(
	"/api/users",
	createProxyMiddleware({
		target: "http://www.example.org",
		changeOrigin: true,
	}),
	userRoutes
);

app.listen(port, () => {
	console.log("App is listening at port 5000");
});
