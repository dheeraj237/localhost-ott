# Local OTT Player

Your own home network OTT player. This project allows you to stream and manage your movie collection over your home network. Built with React, Node.js, Express, and Tailwind CSS, it provides a simple yet powerful way to turn your movie directory into a personal OTT platform.

### Stream Anywhere at Home: Easily watch your favorite movies from your laptop on any device—be it your TV, tablet, or smartphone—right over your home's WiFi. No cables, no hassle.
### Your Movies, Everywhere: Transform your home into a cinema where your movie collection follows you, seamlessly streaming from your laptop to any screen in the house.

## Features

This project, a local OTT (Over-the-Top) streaming server, offers a variety of features for hosting and streaming your personal movie collection. Here's what you can do with it:

- **Environment Configuration**: Easily configure your environment to specify the directory where your movies are stored using a `.env` file. This allows the application to locate and stream your movies seamlessly.

- **Movie Streaming**: Stream your movie collection directly from your local server. The server supports various video formats like MP4, AVI, and WEBM, ensuring broad compatibility with different types of video content.

- **Directory Explorer**: YOu can browse your movie collection through a directory explorer that displays all the movies in your base directory, making it easy to find and stream your favorite films.

- **Video Format Compatibility Check**: Automatically filters out incompatible video files (e.g., MKV format) to ensure a smooth streaming experience.

- **Video Conversion Script**: Includes a script to convert incompatible video files (MKV) to a compatible format (MP4), enhancing the compatibility of your movie collection with the streaming platform.

- **Responsive Web Interface**: Comes with a responsive web interface built with Bootstrap, allowing you to browse and stream your movies on various devices.

- **Real-time Directory and File Information**: Displays real-time information about the current directory, number of movies, and folders directly on the web interface, keeping you informed about your collection's structure.

- **Easy Server Start**: Start the server with a simple npm script, making it quick and easy to get your streaming platform up and running.

- **Local Development and Deployment**: Designed for local use, this project allows you to host and stream your movie collection from your own computer, ensuring privacy and control over your media.

Enjoy streaming your movie collection with this local OTT platform!

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
npm run ott
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

You can also use - https://oxelon.com/media-converter to convert the files.