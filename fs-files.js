const fs = require('fs').promises;
const path = require('path');



var exports = module.exports = {};

exports.getFilesInDir = getFilesInDir;
exports.ignoredFiles = ignoredFiles;
exports.getFilenames = getFilenames;





/**
 *	Return an array with all the files in a directory
 */
async function getFilesInDir(dirPath) {
	try {
		console.log(dirPath);
		let arr = [];

		// read files in directory
		await fs.readdir(dirPath).then(files => {
			// console.log(files.length, files);

			files.sort().forEach(file => {
				if (ignoredFiles(file)) return;
				// console.log(dirPath + file);
				arr.push(file);
			});
		}).catch(err => console.error("ERROR in getFilesInDir()", err));
		// console.log(arr);
		return arr;
	} catch (err) {
		console.error(err);
	}
}
// getFilesInDir("./");


/**
 *	Return true if filename (string) should be ignored
 */
function ignoredFiles(str, add) {
	try {
		// hidden files
		if (/^\..*/.test(str)) return true;
		// "_meta" files
		if (/^_/.test(str)) return true;
	} catch (err) {
		console.error(err);
	}
}

/**
 *	Return all the file or folder names in directory - AN OLD VERSION ?
 */
async function getFilenames() {
	let dirs = [];
	// loop through top level
	fs.readdirSync(fullSVGPath).sort()
		.forEach(file => {
			if (ignoredFiles(file)) return;
			// console.log(file);
			// console.log(importPath + file);
			dirs.push(file);
		}).catch(err => console.error("ERROR in getFilenames()", err));
	// console.log(dirs.join("\n"));
	return dirs;
}