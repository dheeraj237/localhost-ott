const express = require("express");
const serveIndex = require("serve-index");
const path = require("path");
const fs = require("fs");
const utils = require("./src/utils/common");
const os = require("os");
const mime = require("mime");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;
const API_VERSION = process.env.API_VERSION || "v1";
const API_PREFIX = `/api/${API_VERSION}`;

const moviesDirectory = process.env.MOVIES_DIRECTORY;

// static content for all movies
app.use(
	`${API_PREFIX}/stream`,
	express.static(moviesDirectory, {
		setHeaders: (res, filePath) => {
			const mimeType = mime.getType(filePath);
			res.setHeader("Content-Type", mimeType);
		},
	}),
	serveIndex(moviesDirectory, { icons: true })
);

/**
 * API to list all the movies in the directory
 */
app.get(`${API_PREFIX}/movies`, (req, res) => {
	const dir = req.query.dir || "";
	const movieData = listMoviesRecursively(moviesDirectory, dir);
	res.json(movieData);
});

/**
 * get all moview and directories from the provided directory
 */
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
			item.filename = utils.removeSpecialCharsAndExtension(file.name);

			item.path =
				`${API_PREFIX}/stream` + filePath.replace(moviesDirectory, "");
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
		basePath: moviesDirectory,
	};
}

// Serve the HTML file
app.use(express.static(path.join(__dirname, "./build")));
app.use("/static", express.static(path.join(__dirname, "./build/static")));

app.get("/", (req, res) => {
	res.sendFile(path.join(__dirname, "./build/index.html"));
});

app.listen(PORT, () => {
	console.log(`Server is running at http://localhost:${PORT}`);
});
