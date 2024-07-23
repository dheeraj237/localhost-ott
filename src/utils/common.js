function getSizeInGB(stats) {
	const fileSizeInBytes = stats.size;
	let size;

	if (fileSizeInBytes >= 1024 * 1024 * 1024) {
		const fileSizeInGB = (fileSizeInBytes / (1024 * 1024 * 1024)).toFixed(2);
		size = `${fileSizeInGB} GB`;
	} else if (fileSizeInBytes >= 1024 * 1024) {
		const fileSizeInMB = (fileSizeInBytes / (1024 * 1024)).toFixed(2);
		size = `${fileSizeInMB} MB`;
	} else if (fileSizeInBytes >= 1024) {
		const fileSizeInKB = (fileSizeInBytes / 1024).toFixed(2);
		size = `${fileSizeInKB} KB`;
	} else {
		size = `${fileSizeInBytes} bytes`;
	}
	
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
