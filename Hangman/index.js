#!/usr/bin/env node

const {Hangman, Colors} = require("./Hangman")

let language = "en"
let words = "all"
const argLanguage = process.argv[2]
if (argLanguage != undefined && /^[A-Za-z\-\_]{1,}$/.test(argLanguage)) {
    language = argLanguage
    argWords = process.argv[3]
    if (argWords != undefined) {
        words = argWords
    }
}

process.stdin.setEncoding('utf-8')

new Hangman({
    locale: require(`./locales/${language}/locale.json`),
    words: require(`./locales/${language}/words/${words}.json`),
    pics: require('./hangarts.json'),
    colors: new Colors(),
    input: process.stdin,
    output: process.stdout
}).play()
