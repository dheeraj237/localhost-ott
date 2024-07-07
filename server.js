const express = require('express');
const serveIndex = require('serve-index');
const path = require('path');
const mime = require('mime-types');
const fs = require('fs');
require('dotenv').config();


const app = express();
const PORT = process.env.PORT || 3000;

const moviesDirectory = process.env.MOVIES_DIRECTORY;
let MOVIE_DATA = [];
let moviesList = [];

// run listMoviesRecursively every 60 minute and at the startup
setInterval(async () => {
    MOVIE_DATA = [];
    moviesList = [];
    MOVIE_DATA = await listMoviesRecursively(moviesDirectory);
    console.log('updated MOVIE_DATA', MOVIE_DATA.length);
}, 60 * 60 * 1000);

// get all movies recursively from the directory and retunr a array



// function 
async function listMoviesRecursively(dir) {
    let files = fs.readdirSync(dir, { withFileTypes: true });
    for (const file of files) {
        const res = path.resolve(dir, file.name);
        if (file.isDirectory()) {
            moviesList.concat(listMoviesRecursively(res));
        } else {
            // Check if the file is a movie based on its extension
            if (res.endsWith('.mp4') || res.endsWith('.webm') || res.endsWith('.avi')) {
                moviesList.push(res);
            }
        }
    }

    let moviesInfo = await Promise.all(moviesList.map(async (movie) => {
        // check if movie exists and not object type
        if (!movie || typeof movie !== 'string') {
            return;
        }
        stats = fs.statSync(movie);
        // Convert the size to a human-readable format
        const fileSizeInBytes = stats.size;
        const fileSizeInGB = (fileSizeInBytes / (1024 * 1024 * 1024)).toFixed(2);
        const size = `${fileSizeInGB} GB`;

        return {
            filename: path.basename(movie),
            path: "/stream" + movie.replace(moviesDirectory, ''),
            size: size,
            fileSizeInBytes: fileSizeInBytes,
            createdTime: stats.ctime,
            modifiedTime: stats.mtime
        };
    }));

    // console.log('moviesInfo', moviesInfo);

    // filter out undefined values
    moviesInfo = moviesInfo.filter(movie => movie !== undefined);

    // sort moviesInfo by created time
    moviesInfo.sort((a, b) => {
        return a.createdTime - b.createdTime;
    });
    return moviesInfo;
}

// Middleware to set MIME types
// app.use('/movies', (req, res, next) => {
//     const filePath = path.join(moviesDirectory, req.path);
//     const mimeType = mime.lookup(filePath);
//     if (mimeType) {
//         res.setHeader('Content-Type', mimeType);
//     }
//     next();
// });

// static content for all movies
app.use('/stream', express.static(moviesDirectory), serveIndex(moviesDirectory, { icons: true }));

// get all moview recusivly with json array of objects containing ony filename, path (remove prefix match with moviesDirectory ), size, created time, modified time
app.get('/movies', async (req, res) => {
    const page = parseInt(req.query.page) || 1; // Default to page 1 if not specified
    const limit = parseInt(req.query.limit) || 10; // Default to 10 movies per page if not 
    const term = req.query.term || ''; // Default to 10 movies per page if not specified
    const start = (page - 1) * limit; // Calculate the starting index
    let total  = MOVIE_DATA.length;

    let movies = MOVIE_DATA.slice(0, MOVIE_DATA.length);
    if (term && term.length > 2) {
        // console.log('term', term);
        movies = movies.filter(movie => movie.filename.toLowerCase().includes(term.toLowerCase()));
        total  = movies.length;
        movies = movies.slice(start, start + limit);
    } else {
        total  = MOVIE_DATA.length;
        movies = MOVIE_DATA.slice(0, MOVIE_DATA.length);
    }

    // Slice the allMovies array to get only the movies for the requested page

    res.json({
        page: page,
        limit: limit,
        totalMovies: total,
        totalPages: Math.ceil(total / limit),
        movies: movies
    });
});

// Serve the HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
    setTimeout(async () => {
        MOVIE_DATA = await listMoviesRecursively(moviesDirectory);
    }, 500);
});
