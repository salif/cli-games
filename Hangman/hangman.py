import re
import sys
from random import randint
import json
import pyfiglet

language = "en"
if(len(sys.argv) > 1):
	language = sys.argv[1]

print(pyfiglet.figlet_format("Hello!"))

with open("locales/" + language + "/locale.json") as json_file:
	db = json.load(json_file)

with open("locales/" + language + "/words/all.json") as json_file:
	db_words = json.load(json_file)

word = []
wordl = 0
obfWord = []
playedLetters = []
guessesRemaining = 8
words = db_words["words"]

def showLetter(data):
	global word, wordl, obfWord
	for i in range(len(word)):
		if word[i] == data:
			obfWord[i] = word[i]
			wordl -= 1

def randWord():
	return words[randint(0, len(words)-1)]

def initGame():
	global word, wordl, obfWord, playedLetters, guessesRemaining
	word = list(randWord())
	wordl = len(word)
	obfWord = ["_"]*wordl
	playedLetters = []
	guessesRemaining = 8
	showLetter(word[0])
	showLetter(word[-1])
	playedLetters.append(word[0])
	playedLetters.append(word[-1])

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

def check(data):
	global word, wordl, obfWord, playedLetters, guessesRemaining
	if re.search("^.{1}$", data):
		if data in playedLetters:
			print(clr("\n " + db["played"], "red"))
		else:
			playedLetters.append(data)
			if data in word:
				showLetter(data)
				if wordl < 1:
					return "won"
			else:
				guessesRemaining -= 1
			if guessesRemaining < 1:
				return "lost"
	else:
		print(clr("\n " + db["one_char"], "red"))

	print(clr("\n " + (" ").join(obfWord) + "\n", "cian"))
	print(clr(" " + str(guessesRemaining) + " " + db["remaining"], "green"))
	print(clr(" " + db["letters"] + " " + (", ").join(playedLetters), "green"))
	print(clr("\n --------------------------------------------\n", "blue"))
	return "continue"

def playGame():
	initGame()
	print(clr(" " + " ".join(obfWord) + "\n", "cian"))
	while True:
		print(clr(" " + db["guess"] + " ", "yellow"), end='')
		data = input().strip().lower()
		result = check(data)
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
	print(clr("     " + db["hangman"], "green"))
	print(clr("\n --------------------------------------------\n", "blue"))
	while True:
		playGame()
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
