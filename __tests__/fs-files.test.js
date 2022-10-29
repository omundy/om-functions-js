/**
 *	Import revealing module pattern as ES6 module and test using jest
 * 	run: npm test
 */

// import module
const Lib = require('../lib/fs-files.js');
const fse = require('fs-extra');


test('Return an array', async () => {
	const arr = await Lib.getFilesInDir('./');
	// console.log(arr);
	expect([]).toEqual(expect.any(Array));
	expect(arr.length).toBeGreaterThanOrEqual(3); // 4 files in this directory
});


test('returns true (ignore)', () => {
	const val = Lib.ignoredFiles('.');
	expect(val).toEqual(true);
});
test('returns false (do not ignore)', () => {
	const val = Lib.ignoredFiles('package.json');
	expect(val).toEqual(false);
});


// test('files copied', async () => {
// 	await Lib.copyFiles('./input', './output');
// 	// does the directory exist?
// 	let fileExists = await fse.pathExists('./output/hello.txt');
// 	expect(fileExists).toEqual(true);
// });
