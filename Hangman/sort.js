#!/usr/bin/env node

const fs = require("fs")
let words_file = "./locales/en/words/all.json"

if (process.argv.length > 2) {
    words_file = process.argv[2]
}

const db = require(words_file)
const newWords = new Set()
const testRegex = db.regexp != undefined
const regexp = new RegExp(db.regexp)

db.words.forEach(word => {
    if (testRegex) {
        if (!regexp.test(word)) {
            console.log(word)
        }
    }
    newWords.add(word)
})
const words = Array.from(newWords).sort()

fs.writeFileSync(words_file, JSON.stringify(db, null, "\t"))
