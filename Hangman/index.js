#!/usr/bin/env node

const readline = require("readline/promises");
const { Hangman, Colors } = require("./Hangman");

let language = "en";
let words = "all";

const argLanguage = process.argv[2];
if (argLanguage !== undefined && /^[A-Za-z\-\_]+$/.test(argLanguage)) {
  language = argLanguage;
}

const argWords = process.argv[3];
if (argWords !== undefined) {
  words = argWords;
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function main() {
  const hangman = new Hangman({
    locale: require(`./locales/${language}/locale.json`),
    words: require(`./locales/${language}/words/${words}.json`),
    pics: require("./hangarts.json"),
    colors: new Colors(),
    rl: rl,
  });

  await hangman.play();
  rl.close();
}

main().catch((err) => {
  console.error(err);
  rl.close();
  process.exit(1);
});
