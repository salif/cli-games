var fs = require('fs');

var word = [];
var wordl = 0;
var obfWord = [];
var playedLetters = [];
var guessesRemaining = 8;
var language = "en-us";

if(process.argv.length > 2) {
	language = process.argv[2];
}

var db = JSON.parse(fs.readFileSync(`words/${language}.json`, "utf8"));
var words = db.words;

var input = process.stdin;
input.setEncoding('utf-8');

console.log(clr(`\n     ${db.hangman}`, "green"));
console.log(clr("\n ++++++++++++++++++++++++++++++\n", "blue"));

initGame();

console.log(clr(" " + obfWord.join(" ") + "\n", "cian"));
process.stdout.write(clr(` ${db.guess} `, "yellow"));

input.on('data', function (data) {
	check(data.trim().toLowerCase());
});

function check(data) {
	if (/^.{1}$/i.test(data)) {
		if (playedLetters.indexOf(data) >= 0) {
			console.log(clr(`\n ${db.played}`, "red"));
		} else {
			playedLetters.push(data);
			if (word.indexOf(data) >= 0) {
				for (var i = 1; i < word.length - 1; i++) {
					if (word[i] === data) {
						obfWord[i] = word[i];
						wordl--;
					}
				}
				if (wordl < 1) {
					console.log(clr(`\n ${obfWord.join(" ")}`, "cian"));
					console.log(clr("\n ++++++++++++++++++++++++++++++", "blue"));
					console.log(clr(`\n  ${db.you_won}\n`, "green"));
					process.exit(0);
				}
			} else {
				guessesRemaining -= 1;
			}
			if (guessesRemaining < 1) {
				console.log(clr(`\n ${obfWord.join(" ")}\n`, "cian"));
				console.log(clr("\n ++++++++++++++++++++++++++++++", "blue"));
				console.log(clr(`\n  ${db.you_lose} \n`, "red"));
				console.log(clr(`  ${db.word_was} ${word.join("")}\n`, "red"));
				process.exit(0);
			}
		}
	} else {
		console.log(clr(`\n ${db.one_char}`, "red"));
	}
	console.log(clr(`\n ${obfWord.join(" ")}\n`, "cian"));
	console.log(clr(` ${guessesRemaining} ${db.remaining}`, "green"));
	console.log(clr(` ${db.letters} ${playedLetters.join(", ")}`, "green"));
	console.log(clr("\n ++++++++++++++++++++++++++++++\n", "blue"));
	process.stdout.write(clr(` ${db.guess} `, "yellow"));
}

/** return random word from array of words */
function randWord() {
	return words[Math.floor(Math.random() * words.length)];
}

/** create new game */
function initGame() {
	word = randWord().split("");
	wordl = word.length - 2;
	obfWord = [word[0]];
	for (var i = 1; i < word.length - 1; i++) {
		obfWord.push("_");
	}
	obfWord.push(word[word.length - 1]);
}

function clr(text, color) {
	switch (color) {
		case "red":
			return "\x1b[91m" + text + "\x1b[0m";
			break;
		case "green":
			return "\x1b[92m" + text + "\x1b[0m";
			break;
		case "blue":
			return "\x1b[34m" + text + "\x1b[0m";
			break;
		case "cian":
			return "\x1b[96m" + text + "\x1b[0m";
			break;
		case "yellow":
			return "\x1b[93m" + text + "\x1b[0m";
			break;
	}
}
