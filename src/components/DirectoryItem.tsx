import { FaFolder } from "react-icons/fa";
import { fetchMoviesByDirectory } from "../services/movie";

interface DirectoryItemProps {
	dir: string;
	onDirectoryClick?: (movies: any) => void;
}

const DirectoryItem = ({
	dir,
	onDirectoryClick = () => {},
}: DirectoryItemProps) => {
	async function handleItemClick(dir: string): Promise<void> {
		const movies = await fetchMoviesByDirectory(dir);
		onDirectoryClick(movies);
	}

	return (
		<div
			className="bg-gray-200 p-4 rounded-lg shadow-md mb-4 flex items-center"
			onClick={() => handleItemClick(dir)}
		>
			<FaFolder className="mr-2" />
			<span>{dir}</span>
		</div>
	);
};

export default DirectoryItem;
