#!/usr/bin/env bash


echo "[1]  Hangman " | lolcat -as 10000
echo "[2]  MazeEscape " | lolcat -as 10000
echo "[3]  RockPaperScissors " | lolcat -as 10000
echo "[4]  Snake " | lolcat -as 10000
echo "[5]  TextAdventure " | lolcat -as 10000
echo "[6]  TicTacToe " | lolcat -as 10000
echo "[e]  Exit" | lolcat -as 10000

#select the game
echo -e "Enter a Choice:\c" | lolcat
read option

case $option in
	"1")
	echo -e "Python or Javascript/JS version:\c"
	read game
	case $game in
		"js"|"JS"|"Js"|"jS"|"Javascript"|"javascript")
		cd Hangman && node hangman.js
	;;
		"py"|"python"|"PY"|"Python")
		cd Hangman && python3 hangman.py
	;;
		*)
		printf "Not valid option"
	esac
;;

	"2")
	cd MazeEscape && npm run play
;;

	"3")
	cd RockPaperScissors && python3 rockpaperscissors.py
;;

	"4")
	cd Snake && npm run play
;;

	"5")
	cd TextAdventures && npm run play
;;

	"6")
	echo -e "Python or Javascript/JS version:\c"
	read tictactoe
	case $tictactoe in
		"js"|"JS"|"Js"|"jS"|"Javascript"|"javascript"|"j")
		cd TicTacToe && node tictactoe.js
	;;
		"py"|"python"|"PY"|"Python"|"p")
		cd TicTacToe && python tictactoe.py
	;;
		*)
		printf "Not valid option"
	esac
;;

	"e")
	echo "▄▄▄▄·  ▄· ▄▌▄▄▄ .      " | lolcat -s 10000
	echo "▐█ ▀█▪▐█▪██▌▀▄.▀·      " | lolcat -s 10000
	echo "▐█▀▀█▄▐█▌▐█▪▐▀▀▪▄      " | lolcat -s 10000
	echo "██▄▪▐█ ▐█▀·.▐█▄▄▌      " | lolcat -s 10000
	echo "·▀▀▀▀   ▀ •  ▀▀▀  ▀  ▀ " | lolcat -s 10000
;;

	*)
	printf "Invalid argument, just select the game by the number"
	exit 1
esac
