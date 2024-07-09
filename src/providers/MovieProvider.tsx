// Import React modules
import React, { createContext, useContext, useEffect, useState } from "react";
import { MoviesResponse } from "../types/common";
import { fetchMoviesByDirectory } from "../services/movie";

// Define the context with an initial empty state
const MoviesContext = createContext<{
	moviesResponse: MoviesResponse | null;
	setMoviesResponse: React.Dispatch<
		React.SetStateAction<MoviesResponse | null>
	>;
} | null>(null);

// Create a MoviesProvider component
export const MoviesProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [moviesResponse, setMoviesResponse] = useState<MoviesResponse | null>(
		null
	);

	useEffect(() => {
		fetchData();
	}, []);

	const fetchData = async () => {
		try {
			const movies = await fetchMoviesByDirectory("");
			setMoviesResponse(movies);
		} catch (error) {
			console.error("Failed to fetch movies:", error);
		}
	};
	return (
		<MoviesContext.Provider value={{ moviesResponse, setMoviesResponse }}>
			{children}
		</MoviesContext.Provider>
	);
};

// Custom hook to use the movies context
export const useMovies = () => {
	const context = useContext(MoviesContext);
	if (!context) {
		throw new Error("useMovies must be used within a MoviesProvider");
	}
	return context;
};
