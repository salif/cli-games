const readline = require("readline/promises");

class Colors {
    constructor() {
        this.red = 91;
        this.green = 92;
        this.blue = 34;
        this.cian = 96;
        this.yellow = 93;
    }
}

class Game {
    constructor(word, colors, availChars) {
        this.word = word;
        this.colors = colors;
        this.availChars = availChars;
        this.lives = 8;
        this.toGuess = 0;
        this.playedChars = new Set();
    }
}

class Hangman {
    constructor(args) {
        this.db = args.locale;
        this.words = args.words.words;
        this.pics = args.pics;
        this.colors = args.colors;
        this.rl = args.rl;
    }

    async play() {
        const availChars = this.getUniqueChars(this.words);
        const word = this.getRandomWord();
        this.game = new Game(word.split(""), this.colors, availChars);

        this.write(this.clr(`\n     ${this.db.hangman}\n`, this.colors.green));

        this.game.playedChars.add(this.game.word[0]);
        this.game.playedChars.add(this.game.word[this.game.word.length - 1]);

        await this.showPrompt();

        while (true) {
            const guess = await this.rl.question(this.clr(`\n ${this.db.guess} `, this.colors.yellow));
            const cleaned = guess.trim().toLowerCase();

            if (cleaned.length !== 1) {
                await this.showPrompt(this.clr(`\n ${this.db.one_char}`, this.colors.red));
                continue;
            }

            const status = await this.processGuess(cleaned);
            if (status === "won" || status === "lost") {
                await this.askReplay();
                break;
            }
        }
    }

    async askReplay() {
        this.write(this.clr("\n ++++++++++++++++++++++++++++++\n", this.colors.blue));
        while (true) {
            const choice = await this.rl.question(
                this.clr(`\n ${this.db.play_again} (R) / ${this.db.quit} (Q): `, this.colors.yellow)
            );

            const trimmed = choice.trim().toUpperCase();
            if (trimmed === "R") {
                return this.play();  // relance le jeu et attend
            } else if (trimmed === "Q") {
                this.write(this.clr(`\n ${this.db.goodbye}\n`, this.colors.green));
                process.exit(0);
            } else {
                this.write(this.clr(`\n ${this.db.invalid_choice}\n`, this.colors.red));
            }
        }
    }

    async showPrompt(message = null) {
        this.write(this.clr("\n ++++++++++++++++++++++++++++++\n", this.colors.blue));
        if (message) this.write(message + "\n");

        const obfWord = this.obfuscate(this.game.word, this.game.playedChars);
        this.write(this.clr(`\n ${this.db.letters} ${Array.from(this.game.playedChars).join(", ")}\n`, this.colors.green));
        this.write(this.clr(`\n ${obfWord}\n`, this.colors.cian));
        this.write(this.pic());
    }

    getUniqueChars(arr) {
        const set = new Set();
        for (const word of arr) {
            for (const char of word) {
                set.add(char.toLowerCase());
            }
        }
        return set;
    }

    getRandomWord() {
        return this.words[Math.floor(Math.random() * this.words.length)];
    }

    clr(text, color) {
        return color == null ? text : `\x1b[${color}m${text}\x1b[0m`;
    }

    obfuscate(word, playedChars) {
        let result = [];
        let toGuess = 0;

        for (const c of word) {
            if (playedChars.has(c)) {
                result.push(c);
            } else if (c === " ") {
                result.push(" ");
            } else {
                result.push("_");
                toGuess++;
            }
        }

        this.game.toGuess = toGuess;
        return result.join(" ");
    }

    pic() {
        return "\n" + this.pics[this.game.lives].join('\n') + "\n";
    }

    async processGuess(c) {
        if (this.game.playedChars.has(c)) {
            await this.showPrompt(this.clr(`\n ${this.db.played}`, this.colors.red));
            return;
        }

        if (!this.game.availChars.has(c)) {
            await this.showPrompt(
                this.clr(`\n ${this.db.one_char} `, this.colors.red) +
                this.clr(`\n [${Array.from(this.game.availChars).sort().join(", ")}]`, this.colors.green)
            );
            return;
        }

        this.game.playedChars.add(c);

        if (this.game.word.includes(c)) {
            const obfWord = this.obfuscate(this.game.word, this.game.playedChars);
            if (this.game.toGuess < 1) {
                this.write(this.clr("\n ++++++++++++++++++++++++++++++\n", this.colors.blue));
                this.write(this.clr(`\n ${this.game.word.join("")}\n`, this.colors.cian));
                this.write(this.clr(`\n ${this.db.you_won}\n\n`, this.colors.green));
                return "won";
            } else {
                await this.showPrompt();
                return;
            }
        } else {
            this.game.lives--;
            if (this.game.lives < 1) {
                this.write(this.clr("\n ++++++++++++++++++++++++++++++\n", this.colors.blue));
                this.write(this.clr(`\n ${this.game.word.join("")}\n`, this.colors.cian));
                this.write(this.clr(`\n ${this.db.you_lose}\n\n`, this.colors.red));
                return "lost";
            } else {
                await this.showPrompt();
                return;
            }
        }
    }

    write(str) {
        process.stdout.write(str);
    }
}

module.exports = { Hangman, Colors };
