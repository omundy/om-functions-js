/**
 *	Import revealing module pattern as ES6 module and test using jest
 * 	run: npm test
 */

// import module
const Lib = require('../lib/fs-files.js');
const fse = require('fs-extra');
const rootDir = "./";
const testDir = `${rootDir}__tests__`;
const bogusDir = `${rootDir}FOOOOOOO`;


//////////////////////////////////
///////// getFilesInDir() ////////
//////////////////////////////////

test('return an array of filenames', async () => {
	const arr = await Lib.getFilesInDir(rootDir);
	// console.log(arr);
	expect(arr).toEqual(expect.any(Array));
	// 4 files in this directory
	expect(arr.length).toBeGreaterThanOrEqual(3);
});
test('return an error message', async () => {
	try {
		const arr = await Lib.getFilesInDir(bogusDir);
	} catch (e) {
		expect(e.message).toBe("PATH DOES NOT EXIST");
	}
});
test('return files only', async () => {
	const arr = await Lib.getFilesInDir(`${testDir}/input`, ["files"]);
	expect(arr.length).toBe(1);
});
test('return TXT files only', async () => {
	const arr = await Lib.getFilesInDir(`${testDir}/input`, ["files", "fileExts", ".txt"]);
	expect(arr.length).toBe(1);
});
test('return folders only', async () => {
	const arr = await Lib.getFilesInDir(`${testDir}`, ["folders"]);
	expect(arr.length).toBe(2);
});


//////////////////////////////////
///////// isHiddenFile() /////////
//////////////////////////////////

test('returns true (ignore)', () => {
	const val = Lib.isHiddenFile('.');
	expect(val).toEqual(true);
});
test('returns false (do not ignore)', () => {
	const val = Lib.isHiddenFile('package.json');
	expect(val).toEqual(false);
});






// test('files copied', async () => {
// 	await Lib.copyFiles('./input', './output');
// 	// does the directory exist?
// 	let fileExists = await fse.pathExists('./output/hello.txt');
// 	expect(fileExists).toEqual(true);
// });
