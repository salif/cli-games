import re
import sys
from random import randint
import json
import pyfiglet

language = "de"
if(len(sys.argv) > 1):
	language = sys.argv[1]

print(pyfiglet.figlet_format("Hello!"))

with open("words/" + language + ".json") as json_file:
	db = json.load(json_file)

word = []
wordl = 0
obfWord = []
playedLetters = []
guessesRemaining = 8
words = db["words"]

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
	if re.search("^.{1}$", data):
		if data in playedLetters:
			print(clr("\n " + db["played"], "red"))
		else:
			playedLetters.append(data)
			if data in word:
				for i in range(1, len(word) - 1):
					if word[i] == data:
						obfWord[i] = word[i]
						wordl -= 1
				if wordl < 1:
					print(clr("\n " + " ".join(obfWord), "cian"))
					print(clr("\n --------------------------------------------", "blue"))
					print(clr("\n  " + db["you_won"] + "\n", "green"))
					sys.exit()
			else:
				guessesRemaining -= 1
			if guessesRemaining < 1:
				print(clr("\n " + " ".join(obfWord) + "\n", "cian"))
				print(clr("\n --------------------------------------------", "blue"))
				print(clr("\n  " + db["you_lose"] + " \n", "red"))
				print(clr("  " + db["word_was"] + " " + "".join(word) + "\n", "red"))
				sys.exit()
	else:
		print(clr("\n " + db["one_char"], "red"))
	print(clr("\n " + (" ").join(obfWord) + "\n", "cian"))
	print(clr(" " + str(guessesRemaining) + " " + db["remaining"], "green"))
	print(clr(" " + db["letters"] + " " + (", ").join(playedLetters), "green"))
	print(clr("\n --------------------------------------------\n", "blue"))
	print(clr(" " + db["guess"] + " ", "yellow"), end='')
	data = input()
	check(data)

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

def main():
	print(clr("     " + db["hangman"], "green"))
	print(clr("\n --------------------------------------------\n", "blue"))
	initGame()
	print(clr(" " + " ".join(obfWord) + "\n", "cian"))
	print(clr(" " + db["guess"] + " ", "yellow"), end='')
	data = input()
	check(data.strip().lower())

main()
