var word = [];
var wordl = 0;
var obfWord = [];
var playedLetters = [];
var guessesRemaining = 8;
var language = "en-us";

if(process.argv.length > 2) {
	language = process.argv[2];
}

var db = require(`./words/${language}.json`);
var pics = require('./hangarts.json');
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
				showLetter(data);
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
                console.log(pics[0].join('\n'));
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
    console.log(pics[guessesRemaining].join('\n'));
	console.log(clr(`\n ${obfWord.join(" ")}\n`, "cian"));
	console.log(clr(` ${guessesRemaining} ${db.remaining}`, "green"));
	console.log(clr(` ${db.letters} ${playedLetters.join(", ")}`, "green"));
	console.log(clr("\n ++++++++++++++++++++++++++++++\n", "blue"));
	process.stdout.write(clr(` ${db.guess} `, "yellow"));
}

/** show given letter in word */
function showLetter(data) {
    for (var i = 0; i < word.length; i++) {
        if (word[i] === data) {
            obfWord[i] = word[i];
            wordl--;
        }
    }
}

/** return random word from array of words */
function randWord() {
	return words[Math.floor(Math.random() * words.length)];
}

/** create new game */
function initGame() {
	word = randWord().split("");
	wordl = word.length;
    
	for (var i = 0; i < word.length; i++) {
		obfWord.push("_");
	}
    
    showLetter(word[0]);
    showLetter(word[word.length - 1]);
}

function clr(text, color) {
	var code = { red: 91, green: 92, blue: 34, cian: 96, yellow: 93 }[color];
	if (code) return "\x1b[" + code + "m" + text + "\x1b[0m";
}
