const fs = require('fs').promises;
const path = require('path');
const fse = require('fs-extra');

var exports = module.exports = {};

exports.getFilesInDir = getFilesInDir;
exports.isHiddenFile = isHiddenFile;
exports.copyFiles = copyFiles;





/**
 *	Return an array with all the files in a directory
 *	- defaults to folders but can use ["hidden", "files", "fileExts", "folders", "ignoreErrors"]
 */
async function getFilesInDir(dirPath, includeArr = ["folders"]) {
	// console.log(dirPath);
	let filenames = [];

	// does the directory exist?
	let pathExists = await fse.pathExists(dirPath);
	if (!pathExists) {
		if (!includeArr.includes("ignoreErrors")) {
			throw new Error("PATH DOES NOT EXIST");
			return;
		}
		return;
	}

	// read files in directory, returning file meta info
	await fs.readdir(dirPath, {
		withFileTypes: true
	}).then((dirEntries, err) => {
		// console.log(files.length, files);

		if (err) throw new Error(err);

		// remove those we don't need
		dirEntries.forEach((dirEntry) => {
			const {
				name
			} = dirEntry;
			// console.log(dirPath +"/"+ name);

			// is it a hidden file? - return = continue in forEach()
			if (isHiddenFile(name) && !includeArr.includes("hidden")) return;
			// it is a file
			if (dirEntry.isFile() && !includeArr.includes("files")) return;


			// it is a folder
			if (dirEntry.isDirectory() && !includeArr.includes("folders")) return;

			// it is a file with extension "X"
			if (includeArr.includes("fileExts") && !includeArr.includes(path.extname(name))) return;

			// else push it to the array
			filenames.push(name);
		});

	}).catch(err => {
		console.error("ERROR in getFilesInDir()", err);
	});
	return filenames;
}
// console.log(getFilesInDir("./"));


/**
 *	Return true if filename (string) should be ignored
 */
function isHiddenFile(str) {
	// hidden files
	if (/^\..*/.test(str)) return true;
	// starts with a character; e.g. "_meta" files
	else if (/^_/.test(str)) return true;
	// default
	return false;
}


/**
 *	Copy all files @ inputPath to outputPath
 *	- Will create all directories required to build new path
 */
async function copyFiles(inputPath, outputPath, ignoreMissing = false) {
	await fse.copy(inputPath, outputPath, {
		filter: filterFunc
	}, err => {
		if (err) {
			// missing files
			if (err.errno == -2 && ignoreMissing) return;
			return console.error(err);
		} else console.log('copyFiles() success!');
	});
}
// will run if filter returns true
// https://github.com/jprichardson/node-fs-extra/blob/master/docs/copy.md
const filterFunc = (src, dest) => {
	return true;
};
