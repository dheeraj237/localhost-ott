export interface Movie {
	filename: string;
	path: string;
	size: string;
	createdTime: string;
	modifiedTime: string;
}
export interface MoviesResponse {
	servingFrom: string;
	directoryPath: string;
	files: Movie[];
	directories: string[];
	totalFiles: number;
	totalDirectories: number;
	basePath: string;
}
