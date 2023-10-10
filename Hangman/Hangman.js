class Colors {
    constructor() {
        this.red = 91
        this.green = 92
        this.blue = 34
        this.cian = 96
        this.yellow = 93
    }
}

class Game {
    constructor(word, colors, availChars) {
        this.word = word
        this.colors = colors
        this.availChars = availChars
        this.lives = 8
        this.toGuess = 0
        this.playedChars = new Set()
    }
}

class Hangman {
    constructor(args) {
        this.db = args.locale
        this.words = args.words.words
        this.pics = args.pics
        this.colors = args.colors
        this.input = args.input
        this.output = args.output
    }

    play() {
        const availChars = this.getUniqueChars(this.words)
        const randWord = () => this.words[Math.floor(Math.random() * this.words.length)]
        this.game = new Game(randWord().split(""), this.colors, availChars)

        this.output.write(this.clr(`\n     ${this.db.hangman}\n`, this.game.colors.green))

        this.game.playedChars.add(this.game.word[0])
        this.game.playedChars.add(this.game.word[this.game.word.length - 1])

        this.showPrompt(this.obf(this.game.word, this.game.playedChars), this.pic())
        this.input.on('data', (data) => {
            this.guess(data.trim().toLowerCase())
        })
    }

    rePlay() {
        this.input.on('data', (data) => {
            this.output.write(this.clr("\n ++++++++++++++++++++++++++++++\n", this.game.colors.blue))
            this.play()
        })
    }

    showPrompt(obfWord, msg) {
        this.output.write(this.clr("\n ++++++++++++++++++++++++++++++\n", this.game.colors.blue))
        if (msg != null) {
            this.output.write(msg + "\n")
        }
        this.output.write(this.clr(`\n ${this.db.letters} ${Array.from(this.game.playedChars).join(", ")}\n`, this.game.colors.green))
        this.output.write(this.clr(`\n ${obfWord}\n`, this.colors.cian))

        this.output.write(this.clr(`\n ${this.db.guess} `, this.colors.yellow))
    }

    getUniqueChars(arr) {
        const uniqueChars = new Set()
        for (const str of arr) {
            for (const char of str) {
                uniqueChars.add(char)
            }
        }
        return uniqueChars
    }

    clr(text, color) {
        return color == null ? text : "\x1b[" + color + "m" + text + "\x1b[0m"
    }

    obf(word, playedChars) {
        const output = []
        let toGuess = 0
        for (const c of word) {
            if (playedChars.has(c)) {
                output.push(c)
            } else if (c === " ") {
                output.push(c)
            } else {
                toGuess += 1
                output.push("_")
            }
        }
        this.game.toGuess = toGuess
        return output.join(" ")
    }

    pic() {
        return "\n" + this.pics[this.game.lives].join('\n')
    }

    guess(c) {
        if (this.game.playedChars.has(c)) {
            this.showPrompt(this.obf(this.game.word, this.game.playedChars),
                this.clr(`\n ${this.db.played}`, this.game.colors.red))
        } else if (this.game.availChars.has(c)) {
            this.game.playedChars.add(c)
            if (this.game.word.includes(c)) {
                const obfWord = this.obf(this.game.word, this.game.playedChars)
                if (this.game.toGuess < 1) {
                    this.output.write(this.clr("\n ++++++++++++++++++++++++++++++\n", this.game.colors.blue))
                    this.output.write(this.clr(`\n ${this.game.word.join('')}\n`, this.colors.cian))
                    this.output.write(this.clr(`\n ${this.db.you_won}\n\n`, this.game.colors.green))
                    // process.exit(0)
                    this.rePlay()
                } else {
                    this.showPrompt(obfWord, null)
                }
            } else {
                this.game.lives -= 1
                if (this.game.lives < 1) {
                    this.output.write(this.clr("\n ++++++++++++++++++++++++++++++\n", this.game.colors.blue))
                    this.output.write(this.clr(`\n ${this.game.word.join('')}\n`, this.colors.cian))
                    this.output.write(this.clr(`\n ${this.db.you_lose}\n\n`, this.game.colors.red))
                    // process.exit(0)
                    this.rePlay()
                } else {
                    this.showPrompt(this.obf(this.game.word, this.game.playedChars), this.pic())
                }
            }
        } else {
            this.showPrompt(this.obf(this.game.word, this.game.playedChars),
                this.clr(`\n ${this.db.one_char} `, this.game.colors.red) +
                this.clr(`\n [${Array.from(this.game.availChars).sort().join(', ')}]`, this.colors.green))
        }
    }
}

if (typeof module !== 'undefined') {
    module.exports = { Hangman: Hangman, Colors: Colors }
}
