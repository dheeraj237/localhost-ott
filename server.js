const express = require('express');
const serveIndex = require('serve-index');
const path = require("path");
const fs = require("fs");
const utils = require("./utils");
const os = require("os");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

const moviesDirectory = process.env.MOVIES_DIRECTORY;

// get current server / system name like macboo, windows laptop, linux server
app.get("/server", (req, res) => {
	res.json({ server: "process.env.SERVER_NAME" });
});

// static content for all movies
app.use(
	"/stream",
	express.static(moviesDirectory),
	serveIndex(moviesDirectory, { icons: true })
);

// get all moview with json array of objects containing data path, idDirectroy. if not isDirectory the filename, path (remove prefix match with moviesDirectory ), size, created time, modified time
app.get("/movies", (req, res) => {
	const dir = req.query.dir || "";
	const movieData = listMoviesRecursively(moviesDirectory, dir);
	res.json(movieData);
});

function listMoviesRecursively(baseDirectory, directory) {
	const directoryPath = baseDirectory + directory || "";
	const files = fs.readdirSync(directoryPath, { withFileTypes: true });

	const filesData = [];
	const directoriesData = [];

	files.forEach((file) => {
		const filePath = path.join(directoryPath, file.name);
		const item = {};

		if (file.isDirectory()) {
			directoriesData.push(filePath.replace(moviesDirectory, ""));
		} else {
			if (!/\.(mp4|avi|webm)$/.test(file.name)) {
				return;
			}
			const stats = fs.statSync(filePath);

			// Convert the size to a human-readable format
			const size = utils.getSizeInGB(stats);
			item.filename = file.name;
			item.path = "/stream" + filePath.replace(moviesDirectory, "");
			filesData.push(item);
			item.size = size;
			item.createdTime = stats.ctime;
			item.modifiedTime = stats.mtime;
		}
	});

	return {
		servingFrom: os.hostname(),
		directoryPath,
		files: filesData,
		directories: directoriesData,
		totalFiles: filesData.length,
		totalDirectories: directoriesData.length,
	};
}

// Serve the HTML file
app.get("/", (req, res) => {
	res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(PORT, () => {
	console.log(`Server is running at http://localhost:${PORT}`);
});

