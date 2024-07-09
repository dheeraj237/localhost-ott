function getSizeInGB(stats) {
	const fileSizeInBytes = stats.size;
	const fileSizeInGB = (fileSizeInBytes / (1024 * 1024 * 1024)).toFixed(2);
	const size = `${fileSizeInGB} GB`;
	return size;
}

function removeSpecialCharsAndExtension(filename) {
	if (!filename) {
		return;
	}
	filename = filename.replace(/\.[^/.]+$/, "");
	return filename.replace(/[._-]/g, " ");
}

module.exports = {
	getSizeInGB,
	removeSpecialCharsAndExtension,
};
