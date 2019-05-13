"""
      Hangman
"""

import re
import sys
from random import randint

word = []
wordl = 0
obfWord = []
playedLetters = []
guessesRemaining = 8
words = ["javascript", "java", "python", "typescript", "hangman", "programmer",
    "developer", "coder", "github", "google", "terminal", "machine",
    "scripting", "server", "program", "array", "bytecode", "command",
    "function", "constructor", "arguments", "visual", "variable", "source"]

def randWord():
    return words[randint(0, len(words))]

def initGame():
    global word, wordl, obfWord
    word = list(randWord())
    wordl = len(word) - 2
    obfWord = [word[0]]
    for i in range(1, len(word) - 1):
        obfWord.append("_")
    obfWord.append(word[len(word) - 1])

def check(data):
    global word, wordl, obfWord, playedLetters, guessesRemaining
    if re.search("^[a-z]{1}$", data):
        if data in playedLetters:
            print(clr("\n The letter you wrote was already played!", "red"))
        else:
            playedLetters.append(data)
            if data in word:
                for i in range(1, len(word) - 1):
                    if word[i] == data:
                        obfWord[i] = word[i]
                        wordl -= 1
                if wordl < 1:
                    print(clr("\n " + " ".join(obfWord), "cian"))
                    print(clr("\n ++++++++++++++++++++++++++++++", "blue"))
                    print(clr("\n  You won!\n", "green"))
                    sys.exit()
            else:
                guessesRemaining -= 1
            if guessesRemaining < 1:
                print(clr("\n " + " ".join(obfWord) + "\n", "cian"))
                print(clr("\n ++++++++++++++++++++++++++++++", "blue"))
                print(clr("\n  You lose! \n", "red"))
                print(clr("  The word was: " + "".join(word) + "\n", "red"))
                sys.exit()
    else:
        print(clr("\n Write just one character!", "red"))
    print(clr("\n " + (" ").join(obfWord) + "\n", "cian"))
    print(clr(" " + str(guessesRemaining) + " guesses remaining", "green"))
    print(clr(" Letters already played: " + (", ").join(playedLetters), "green"))
    print(clr("\n ++++++++++++++++++++++++++++++\n", "blue"))
    print(clr(" Guess letter: ", "yellow"), end='')
    data = input()
    check(data)

def clr(text, color):
    if color=="red":
        return "\x1b[91m" + text + "\x1b[91m"
    elif color=="green":
        return "\x1b[92m" + text + "\x1b[92m"
    elif color=="blue":
        return "\x1b[34m" + text + "\x1b[34m"
    elif color=="cian":
        return "\x1b[96m" + text + "\x1b[96m"
    elif color=="yellow":
        return "\x1b[93m" + text + "\x1b[93m"

def main():
    print(clr("\n     Hangman", "green"))
    print(clr("\n ++++++++++++++++++++++++++++++\n", "blue"))
    initGame()
    print(clr(" " + " ".join(obfWord) + "\n", "cian"))
    print(clr(" Guess letter: ", "yellow"), end='')
    data = input()
    check(data.strip().lower())

main()