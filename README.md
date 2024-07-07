# localhost-ott

Your own home network OTT player. This project allows you to stream and manage your movie collection over your home network. Built with Node.js and Express, it provides a simple yet powerful way to turn your movie directory into a personal OTT platform.

### Stream Anywhere at Home: Easily watch your favorite movies from your laptop on any device—be it your TV, tablet, or smartphone—right over your home's WiFi. No cables, no hassle.
### Your Movies, Everywhere: Transform your home into a cinema where your movie collection follows you, seamlessly streaming from your laptop to any screen in the house.

## Features

- **Local Movie Streaming**: Stream movies from your local storage directly to any device on your home network.
- **Automatic Movie Listing**: Automatically scans a specified directory for movies and lists them for streaming.
- **Dynamic Content Serving**: Utilizes Express to serve movie content dynamically. Supports streaming to various devices with appropriate MIME type handling.
- **Pagination and Search**: Offers an API endpoint for listing movies with support for pagination and search functionality. This makes it easy to find the movies you want to watch.
- **Scheduled Scanning**: The server periodically rescans the movie directory to update the movie list, ensuring that new additions are automatically included without manual intervention.
- **Static File Serving**: Serves the front-end HTML file and enables browsing of movie directories with file icons for an enhanced user experience.
- **Environment Variable Configuration**: Configurable movie directory path through environment variables, allowing for flexible deployment and management.
- **Lightweight and Fast**: Built with efficiency in mind, ensuring fast load times and minimal resource usage on your home server.

![Demo](demo.gif)

## Getting Started

To get started with `localhost-ott`, clone the repository and install the dependencies:

```sh
git clone https://github.com/your-repository/localhost-ott.git
cd localhost-ott
npm install
```

After installing the dependencies, you need to set up the environment variables. Create a `.env` file in the root directory of the project:

```sh
touch .env
```

Open the `.env` file and add the following line to specify the directory where your movies are stored:

```plaintext
MOVIES_DIRECTORY=/path/to/your/movies/in/your/system
```

Replace `/path/to/your/movies/in/your/system` with the actual path to your movie directory. This path will be used by the application to locate and stream your movies.

Once you have configured the environment variable, you can start the server:

```sh
npm run dev
```

Your OTT platform will now be running at `http://localhost:3008`. Enjoy streaming your movie collection!

### Incompatible Video In Path

If you encounter any incompatible movie files (e.g., MKV format) that cannot be streamed, you can use the provided script to convert them to a compatible format (MP4). Follow these steps:

1. Ensure you have `ffmpeg` installed on your system. You can check by running `ffmpeg -version` in your terminal. If it's not installed, please install it from [ffmpeg.org](https://ffmpeg.org/download.html).

2. Navigate to the directory containing your movie files in the terminal.

3. Run the conversion script:
    ```sh
    ./convert_mkv_to_mp4.sh
    ```
    This script will automatically convert all MKV files in the directory to MP4 format, ensuring compatibility with the streaming platform.

After converting the files, you can restart the server to update the movie list with the newly compatible files.