import { useEffect, useState } from "react";
import MovieItem from "./MovieItem";
import { Movie, MoviesResponse } from "../types/common";
import DirectoryItem from "./DirectoryItem";
import { useMovies } from "../providers/MovieProvider";
import { FaArrowLeft } from "react-icons/fa";
import { fetchMoviesByDirectory } from "../services/movie";

const MoviesList = () => {
	const { moviesResponse, setMoviesResponse } = useMovies();

	const [movies, setMovies] = useState<Movie[]>([]);
	const [directories, setDirectories] = useState<string[]>([]);

	useEffect(() => {
		if (moviesResponse) {
			setMovies(moviesResponse.files);
			setDirectories(moviesResponse.directories);
		}
	}, [moviesResponse]);

	const handleDirectoryClick = (newMovies: MoviesResponse) => {
		setMoviesResponse(newMovies);
	};

	async function handleBack(): Promise<void> {
		if (moviesResponse) {
			let path = moviesResponse.directoryPath.replace(
				moviesResponse.basePath,
				""
			);
			path = path.substring(0, path.lastIndexOf("/"));
			const response = await fetchMoviesByDirectory(path);
			setMoviesResponse(response);
		}
	}

	const showBAckButton = () => {
		if (moviesResponse) {
			return (
				moviesResponse.directoryPath.replace(moviesResponse.basePath, "") !== ""
			);
		}
		return false;
	};
	return (
		<div className="p-4">
			{showBAckButton() && (
				<div
					className="bg-gray-200 p-4 rounded-lg shadow-md mb-4 flex items-center"
					onClick={() => handleBack()}
				>
					<FaArrowLeft className="mr-2" />
					<span>Back</span>
				</div>
			)}
			{directories &&
				directories.map((path) => (
					<DirectoryItem dir={path} onDirectoryClick={handleDirectoryClick} />
				))}
			{movies &&
				movies.map((movie) => <MovieItem key={movie.filename} movie={movie} />)}
			{
				<div className="flex flex-row m-3">
					<div className="flex flex-col">
						<p className="text-gray-500">
							Movies: {moviesResponse?.totalFiles} | Folders:
							{moviesResponse?.totalDirectories} | Directory:
							{moviesResponse?.directoryPath}
						</p>
					</div>
				</div>
			}
		</div>
	);
};

export default MoviesList;
