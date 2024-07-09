function getSizeInGB(stats) {
	const fileSizeInBytes = stats.size;
	const fileSizeInGB = (fileSizeInBytes / (1024 * 1024 * 1024)).toFixed(2);
	const size = `${fileSizeInGB} GB`;
	return size;
}

module.exports = {
	getSizeInGB,
};
