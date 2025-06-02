# -*- coding: utf-8 -*-

import os
import json
import pyfiglet
import re
from random import randint

def choose_language():
    available_langs = [d for d in os.listdir("locales") if os.path.isdir(os.path.join("locales", d))]
    print("Available languages:")
    for i, lang in enumerate(available_langs):
        print(f"{i+1}. {lang}")
    while True:
        choice = input("Choose your language (number): ").strip()
        if choice.isdigit():
            idx = int(choice) - 1
            if 0 <= idx < len(available_langs):
                return available_langs[idx]
        print("Invalid choice. Please enter a number from the list.")

def clr(text, color):
    if color == "red":
        return "\x1b[91m" + text + "\x1b[0m"
    elif color == "green":
        return "\x1b[92m" + text + "\x1b[0m"
    elif color == "blue":
        return "\x1b[34m" + text + "\x1b[0m"
    elif color == "cian":
        return "\x1b[96m" + text + "\x1b[0m"
    elif color == "yellow":
        return "\x1b[93m" + text + "\x1b[0m"
    return text

def showLetter(data, word, obfWord, wordl):
    for i in range(len(word)):
        if word[i] == data:
            obfWord[i] = word[i]
            wordl[0] -= 1

def randWord(words):
    return words[randint(0, len(words) - 1)]

def initGame(words):
    word = list(randWord(words))
    wordl = [len(word)]
    obfWord = ["_"] * wordl[0]
    playedLetters = []
    guessesRemaining = [8]

    showLetter(word[0], word, obfWord, wordl)
    showLetter(word[-1], word, obfWord, wordl)
    playedLetters.append(word[0])
    playedLetters.append(word[-1])

    return word, wordl, obfWord, playedLetters, guessesRemaining

def check(data, word, wordl, obfWord, playedLetters, guessesRemaining, db):
    if re.search("^.{1}$", data):
        if data in playedLetters:
            print(clr("\n " + db["played"], "red"))
        else:
            playedLetters.append(data)
            if data in word:
                showLetter(data, word, obfWord, wordl)
                if wordl[0] < 1:
                    return "won"
            else:
                guessesRemaining[0] -= 1
            if guessesRemaining[0] < 1:
                return "lost"
    else:
        print(clr("\n " + db["one_char"], "red"))

    print(clr("\n " + (" ").join(obfWord) + "\n", "cian"))
    print(clr(" " + str(guessesRemaining[0]) + " " + db["remaining"], "green"))
    print(clr(" " + db["letters"] + " " + (", ").join(playedLetters), "green"))
    print(clr("\n --------------------------------------------\n", "blue"))
    return "continue"

def playGame(words, db):
    word, wordl, obfWord, playedLetters, guessesRemaining = initGame(words)
    print(clr(" " + " ".join(obfWord) + "\n", "cian"))
    while True:
        print(clr(" " + db["guess"] + " ", "yellow"), end='')
        data = input().strip().lower()
        result = check(data, word, wordl, obfWord, playedLetters, guessesRemaining, db)
        if result == "won":
            print(clr("\n " + " ".join(obfWord), "cian"))
            print(clr("\n --------------------------------------------", "blue"))
            print(clr("\n  " + db["you_won"] + "\n", "green"))
            break
        elif result == "lost":
            print(clr("\n " + " ".join(obfWord) + "\n", "cian"))
            print(clr("\n --------------------------------------------", "blue"))
            print(clr("\n " + "".join(word), "cian"))
            print(clr("\n " + db["you_lose"] + "\n", "red"))
            break

def main():
    language = choose_language()
    print(pyfiglet.figlet_format("Hello!"))

    with open(f"locales/{language}/locale.json", encoding="utf-8") as json_file:
        db = json.load(json_file)

    with open(f"locales/{language}/words/all.json", encoding="utf-8") as json_file:
        db_words = json.load(json_file)

    print(clr(db["rules"], "yellow"))

    while True:
        playGame(db_words["words"], db)
        print(clr(f"{db['play_again']} (R) / {db['quit']} (Q): ", "yellow"), end='')
        choice = input().strip().lower()
        if choice == 'r':
            continue
        elif choice == 'q':
            print(clr(db["goodbye"], "green"))
            break
        else:
            print(clr(db["invalid_choice"], "red"))

if __name__ == "__main__":
    main()
