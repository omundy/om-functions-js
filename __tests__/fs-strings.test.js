/**
 *	Import revealing Libule pattern as ES6 Libule and test using jest
 * 	run: npm test
 */

// import Libule
const Lib = require('../lib/fs-strings.js');

//1.

// adds a leading 0
test('add leading 0 to string', () => {
	var string = "123456789";
	const leadingZero = Lib.pad('0', string.length);
	expect(leadingZero).toBe("000000000");
});

// adds a leading 0
test('add leading 0 to string', () => {
	var string = "1";
	const leadingZero = Lib.pad('0', string.length);
	expect(leadingZero).toBe("0");
});

//2.

// checks for vowel
test('check string for vowel', () => {
	var string = "banana";
	const containVowel = Lib.containsVowel(string);
	expect(containVowel).toBe(true);
});

// checks for vowel
test('check string for vowel', () => {
	var string = "100";
	const containVowel = Lib.containsVowel(string);
	expect(containVowel).toBe(false);
});

//3.

// upper case first letter of string
test('upper case first letter of string', () => {
	var string = "banana";
	const ucFirst = Lib.ucFirst(string);
	expect(ucFirst).toBe("Banana");
});

// upper case first letter of string
test('upper case first letter of string', () => {
	var string = "test";
	const ucFirst = Lib.ucFirst(string);
	expect(ucFirst).toBe("Test");
});

//4.

// removeHTML
test('remove html', () => {
	var string = "<b>banana</b>";
	let clean = Lib.removeHTML(string).trim();
	expect(clean).toEqual(expect.not.stringContaining("<"));
	expect(clean).toEqual(expect.not.stringContaining(">"));
	expect(clean).toBe("banana");
});

//5.

// trim str
test('trim string to certain length', () => {
	var string = "batman   ";
	const trimmed = Lib.trimStr(string, 6);
	expect(trimmed).toBe("bat" + "&hellip;");
});

// trim str
test('trim string to certain length', () => {
	var string = "baseball   ";
	const trimmed = Lib.trimStr(string, 7);
	expect(trimmed).toBe("base" + "&hellip;");
});

// //6.
//
// // clean str
// test('remove numbers and punctuation from string and lowercase', () => {
//   var string = "TE@S;T1234:)";
//   const cleaned = Lib.cleanStringReturnTagArray(string)
// 	expect(cleaned).toBe(["test"]);
// });
//
// // clean str
// test('remove numbers and punctuation from string and lowercase', () => {
//   var string = "HEL#LO;,.?W1234O#R23LD";
//   const cleaned = Lib.cleanStringReturnTagArray(string)
// 	expect(cleaned).toBe(["helloworld"]);
// });

//7.

// remove small words
test('remove all words smaller than length 3', () => {
	var strings = ["we", "purchased", "a", "bike"];
	const removeSmallWords = Lib.removeSmallWords(strings);
	expect(removeSmallWords).toStrictEqual(["purchased", "bike"]);
});
