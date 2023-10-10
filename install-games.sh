#!/bin/sh

#this script will automatically install the node dependences and the python ones, it's just really simple
printf "Installing Hangman dependences..."
pip install pyfiglet

printf "Installing MazeEscape dependences..."
cd MazeEscape && npm install .

printf "Installing Snake dependences..."
cd ../Snake && npm install .

printf "Installing TextAdventures dependences..."
cd ../TextAdventures && npm install .

printf "Dependences installed succesfully (probably lol)"
