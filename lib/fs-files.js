const fs = require('fs').promises;
const path = require('path');
const fse = require('fs-extra');

var exports = module.exports = {};

exports.getFilesInDir = getFilesInDir;
exports.ignoredFiles = ignoredFiles;
exports.copyFiles = copyFiles;





/**
 *	Return an array with all the files in a directory
 */
async function getFilesInDir(dirPath) {
	// console.log(dirPath);
	let arr = [];

	// // does the directory exist?
	// let fileExists = await fse.pathExists(dirPath);
	// if (!fileExists) return;

	// read files in directory
	await fs.readdir(dirPath).then(files => {
		// console.log(files.length, files);

		files.sort().forEach(file => {
			if (ignoredFiles(file)) return;
			// console.log(dirPath +"/"+ file);
			arr.push(file);
		});
	}).catch(err => {
		console.error("ERROR in getFilesInDir()", err);
	});
	return arr;
}
// console.log(getFilesInDir("./"));


/**
 *	Return true if filename (string) should be ignored
 */
function ignoredFiles(str, add) {
	// hidden files
	if (/^\..*/.test(str)) return true;
	// e.g. "_meta" files
	else if (/^_/.test(str)) return true;
	// default
	return false;
}


/**
 *	Copy all files @ inputPath to outputPath
 *	- Will create all directories required to build new path
 */
async function copyFiles(inputPath, outputPath) {
	await fse.copy(inputPath, outputPath, {
		filter: filterFunc
	}, err => {
		if (err) return console.error(err);
		console.log('copyFiles() success!');
	});
}
// will run if filter returns true
// https://github.com/jprichardson/node-fs-extra/blob/master/docs/copy.md
const filterFunc = (src, dest) => {
	return true;
};
