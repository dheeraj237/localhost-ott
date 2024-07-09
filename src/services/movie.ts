/**
 * Fetch movies by directory.
 * @param {string} dir - The directory to fetch movies from.
 * @returns {Promise<any>} The fetched movies.
 */
export async function fetchMoviesByDirectory(dir: string): Promise<any> {
	try {
		const response = await fetch(
			`/api/v1/movies?dir=${encodeURIComponent(dir)}`
		);
		if (!response.ok) {
			throw new Error("Network response was not ok");
		}
		const movies = await response.json();
		return movies;
	} catch (error) {
		console.error("Failed to fetch movies:", error);
		throw error; // Rethrow to handle it in the component
	}
}
