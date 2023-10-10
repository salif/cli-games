#!/bin/env bash

#this script will automatically install the node dependences and the python ones, it's just really simple
text_installed="dependencies installed correctly \n\n"
text_not_installed="dependencies not installed, please refer the problem log above"


printf "Installing Hangman dependencies... \n"
pip install pyfiglet lolcat


printf "Installing MazeEscape dependencies... \n"
cd $(dirname $0)/MazeEscape && npm install .

if [[ -d node_modules ]]; then
	printf "MazeEscape $text_installed"
else
	printf "MazeEscape $text_not_installed"
	exit 1
fi

printf "Installing Snake dependencies... \n"
cd ../Snake && npm install .

if [[ -d node_modules ]]; then
	printf "Snake $text_installed"
else
	printf "Snake $text_not_installed"
	exit 1
fi

printf "Installing TextAdventures dependencies... \n"
cd ../TextAdventures && npm install .

if [[ -d node_modules ]]; then
	printf "TextAdventures $text_installed"
else
	printf "TextAdventures $text_not_installed"
	exit 1
fi

printf "Dependences installed succesfully"
exit 0
