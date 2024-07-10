import { useState } from "react";
import { Movie } from "../types/common";
import VideoPlayer from "./VideoPlayer";

const MovieItem = ({ movie }: { movie: Movie }) => {
	const [isModalOpen, setModalOpen] = useState(false);

	const toggleModal = () => setModalOpen(!isModalOpen);
	return (
		<>
			<div
				className="bg-gray-200 p-4 rounded-lg shadow-md mb-4 cursor-pointer"
				onClick={toggleModal}
			>
				<h2 className="font-bold">{movie.filename}</h2>
				<p className="text-s text-gray-500">
					Size: {movie.size} Created:
					{movie.createdTime}
				</p>
			</div>

			{isModalOpen && (
				<VideoPlayer path={movie.path} modalClose={toggleModal}></VideoPlayer>
			)}
		</>
	);
};

export default MovieItem;
