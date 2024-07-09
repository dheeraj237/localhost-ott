import { useMovies } from "../providers/MovieProvider";

const Navbar = () => {
	const { moviesResponse, setMoviesResponse } = useMovies();
	return (
		<nav className="bg-gray-800 p-4">
			<h1 className="text-white text-2xl">
				Localhost OTT ({moviesResponse?.servingFrom})
			</h1>
		</nav>
	);
};

export default Navbar;
