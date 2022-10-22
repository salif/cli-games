#!/bin/sh

echo "[1]  Hangman " | lolcat -as 100
echo "[2]  MazeEscape " | lolcat -as 100
echo "[3]  RockPaperScissors " | lolcat -as 100
echo "[4]  Snake " | lolcat -as 100
echo "[5]  TextAdventure " | lolcat -as 100
echo "[6]  TicTacToe " | lolcat -as 100
echo "[e]  Exit" | lolcat -as 100

#select the game
echo -e "Enter a Choice :\c" | lolcat
read option

case $option in
	"1")
	cd Hangman && python3 hangman.py
;;
	"2")
	cd MazeEscape && npm run play
;;

	"3")
	cd RockPaperScissors && python3 rockpaperscissors.py
;;

	"4")
	cd Snake && node index.js
;;

	"5")
	cd TextAdventures && npm run play
;;

	"6")
	cd TicTacToe && python3 tictactoe.py
;;

	"e")
	echo "▄▄▄▄·  ▄· ▄▌▄▄▄ .      " | lolcat -s 10000
	echo "▐█ ▀█▪▐█▪██▌▀▄.▀·      " | lolcat -s 10000
	echo "▐█▀▀█▄▐█▌▐█▪▐▀▀▪▄      " | lolcat -s 10000
	echo "██▄▪▐█ ▐█▀·.▐█▄▄▌      " | lolcat -s 10000
	echo "·▀▀▀▀   ▀ •  ▀▀▀  ▀  ▀ " | lolcat -s 10000
	break
;;

	*)
	printf "Invalid argument, just select the game by the number"
	break
esac
