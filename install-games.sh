#!/bin/env bash

#this script will automatically install the node dependences and the python ones, it's just really simple
text_installed="dependences installed correctly"
text_not_installed="dependences not installed, please refer the problem log above"


printf "Installing Hangman dependences..."
pip install pyfiglet


printf "Installing MazeEscape dependences..."
cd MazeEscape && npm install .

if [[ -d node_modules ]]; then
	printf "MazeEscape $text_installed"
else
	printf "MazeEscape $text_not_installed"
	exit 1
fi

printf "Installing Snake dependences..."
cd ../Snake && npm install .

if [[ -d node_modules ]]; then
	printf "Snake $text_installed"
else
	printf "Snake $text_not_installed"
	exit 1
fi

printf "Installing TextAdventures dependences..."
cd ../TextAdventures && npm install .

if [[ -d node_modules ]]; then
	printf "TextAdventures $text_installed"
else
	printf "TextAdventures $text_not_installed"
	exit 1
fi

printf "Dependences installed succesfully (or not probably lol)"

#hangman
#MazeEscape
#Snake
