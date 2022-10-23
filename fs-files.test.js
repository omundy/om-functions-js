/**
 *	Import revealing module pattern as ES6 module and test using jest
 * 	run: npm test
 */

// import module
const Mod = require('./fs-files.js');


test('Return an array', async () => {
	const arr = await Mod.getFilesInDir('./');
	// console.log(arr);
	expect([]).toEqual(expect.any(Array)); // passes
	expect(arr.length).toBeGreaterThanOrEqual(12);
});


test('returns true (ignore)', () => {
	const val = Mod.ignoredFiles('.');
	expect(val).toEqual(true);
});
test('returns false (do not ignore)', () => {
	const val = Mod.ignoredFiles('package.json');
	expect(val).toEqual(false);
});
