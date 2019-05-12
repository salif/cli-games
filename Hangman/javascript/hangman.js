/*
 * Hangman
 */

var word = [];
var wordl = 0;
var obfWord = [];
var playedLetters = [];
var guessesRemaining = 8;
var words = ["javascript", "java", "python", "typescript", "hangman", "programmer",
    "developer", "coder", "github", "google", "terminal", "machine",
    "scripting", "server", "program", "array", "bytecode", "command",
    "function", "constructor", "arguments", "visual", "variable", "source"];

var input = process.stdin;
input.setEncoding('utf-8');

console.log(clr("\n Jogo da Forca", "green"));
console.log(clr("\n ++++++++++++++++++++++++++++++\n", "blue"));

initGame();

console.log(clr(" " + obfWord.join(" ") + "\n", "cian"));
process.stdout.write(clr(" Escolha uma letra: ", "yellow"));

input.on('data', function (data) {
    check(data.trim().toLowerCase());
});

function check(data) {
    if (/^[a-z]{1}$/i.test(data)) {
        if (playedLetters.indexOf(data) >= 0) {
            console.log(clr("\n A letra que você escolheu foi jogada", "red"));
        }
        else {
            playedLetters.push(data);
            if (word.indexOf(data) >= 0) {
                for (var i = 1; i < word.length - 1; i++) {
                    if (word[i] === data) {
                        obfWord[i] = word[i];
                        wordl--;
                    }
                }
                if (wordl < 1) {
                    console.log(clr("\n " + obfWord.join(" "), "cian"));
                    console.log(clr("\n ++++++++++++++++++++++++++++++", "blue"));
                    console.log(clr("\n  Você venceu !\n", "green"));
                    process.exit(0);
                }
            }
            else {
                guessesRemaining -= 1;
            }
            if (guessesRemaining < 1) {
                console.log(clr("\n " + obfWord.join(" ") + "\n", "cian"));
                console.log(clr("\n ++++++++++++++++++++++++++++++", "blue"));
                console.log(clr("\n  Você perdeu! \n", "red"));
                console.log(clr("  A palavra nao era essa : " + word.join("") + "\n", "red"));
                process.exit(0);
            }
        }
    }
    else {
        console.log(clr("\n Escolha apenas uma letra!", "red"));
    }
    console.log(clr("\n " + obfWord.join(" ") + "\n", "cian"));
    console.log(clr(" " + guessesRemaining + " guesses remaining", "green"));
    console.log(clr(" Letters already played: " + playedLetters.join(", "), "green"));
    console.log(clr("\n ++++++++++++++++++++++++++++++\n", "blue"));
    process.stdout.write(clr(" Escolha uma letra: ", "yellow"));
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
            return "\x1b[91m" + text + "\x1b[91m";
            break;
        case "green":
            return "\x1b[92m" + text + "\x1b[92m";
            break;
        case "blue":
            return "\x1b[34m" + text + "\x1b[34m";
            break;
        case "cian":
            return "\x1b[96m" + text + "\x1b[96m";
            break;
        case "yellow":
            return "\x1b[93m" + text + "\x1b[93m";
            break;
    }
}
