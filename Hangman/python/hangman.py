# Jogo da forca pelo


import re
import sys
from random import randint
import sys

from colorama import init
init(strip=not sys.stdout.isatty()) 

from termcolor import cprint 
from pyfiglet import figlet_format

cprint(figlet_format('Forca!', font='starwars'),
       'white')

word = []
wordl = 0
obfWord = []
playedLetters = []
guessesRemaining = 8
words = ["javascript", "java", "python", "typescript", "forca", "programador",
    "desenvolvedor", "codigo", "github", "google", "terminal", "maquina",
    "scripting", "servidor", "programa", "matriz", "bytecode", "comando",
    "funcao", "constructor", "arguments", "visual", "variavel", "fonte"]

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
            print(clr("\n A letra foi escolhida", "red"))
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
                    print(clr("\n  Voce ganhou!\n", "green"))
                    sys.exit()
            else:
                guessesRemaining -= 1
            if guessesRemaining < 1:
                print(clr("\n " + " ".join(obfWord) + "\n", "cian"))
                print(clr("\n ++++++++++++++++++++++++++++++", "blue"))
                print(clr("\n  Voce perdeu! \n", "red"))
                print(clr("  A plavra era: " + "".join(word) + "\n", "red"))
                sys.exit()
    else:
        print(clr("\n Escolha apenas uma letra!", "red"))
    print(clr("\n " + (" ").join(obfWord) + "\n", "cian"))
    print(clr(" " + str(guessesRemaining) + " vidas", "green"))
    print(clr(" Letra usada: " + (", ").join(playedLetters), "green"))
    print(clr("\n ++++++++++++++++++++++++++++++\n", "blue"))
    print(clr(" Escolha a letra: ", "yellow"), end='')
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
    print(clr("\n     Forca", "green"))
    print(clr("\n ++++++++++++++++++++++++++++++\n", "blue"))
    initGame()
    print(clr(" " + " ".join(obfWord) + "\n", "cian"))
    print(clr(" Escolha uma letra: ", "yellow"), end='')
    data = input()
    check(data.strip().lower())

main()
