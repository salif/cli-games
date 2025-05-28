#!/usr/bin/env bash

dir=$(dirname $0)

# Function to display menu with current selection
display_menu() {
    clear
    echo "Use arrow keys to navigate, Enter to select, or type the number:"
    echo
    for i in "${!options[@]}"; do
        if [ $i -eq $current_selection ]; then
            echo "> ${options[$i]}" | lolcat -as 10000
        else
            echo "  ${options[$i]}" | lolcat -as 10000
        fi
    done
}

# Initialize menu options
options=(
    "[1]  Hangman"
    "[2]  MazeEscape"
    "[3]  RockPaperScissors"
    "[4]  Snake"
    "[5]  TextAdventure"
    "[6]  TicTacToe"
    "[e]  Exit"
)

current_selection=0
selection_made=false

# Enable raw mode for reading arrow keys
stty -icanon -echo

# Main menu loop
while ! $selection_made; do
    display_menu
    
    # Read a single character
    read -n1 key
    
    # Check for arrow keys (they send 3 characters: ESC [ and then A/B/C/D)
    if [ "$key" = $'\e' ]; then
        read -n2 key
        case "$key" in
            "[A") # Up arrow
                current_selection=$(( (current_selection - 1 + ${#options[@]}) % ${#options[@]} ))
                ;;
            "[B") # Down arrow
                current_selection=$(( (current_selection + 1) % ${#options[@]} ))
                ;;
        esac
    elif [ "$key" = "" ]; then
        # Enter key pressed
        selection_made=true
    else
        # Check for number input
        case "$key" in
            "1"|"2"|"3"|"4"|"5"|"6"|"e")
                current_selection=$(( ${key//[^0-9]/} - 1 ))
                if [ "$key" = "e" ]; then
                    current_selection=6
                fi
                selection_made=true
                ;;
        esac
    fi
done

# Restore terminal settings
stty icanon echo

# Get the selected option
selected_option=${options[$current_selection]}
option=$(echo "$selected_option" | grep -o '^\[[^]]*\]' | tr -d '[]')

case $option in
	"1")
	echo -e "Python or Javascript/JS version:\c"
	read game
	case $game in
		"js"|"JS"|"Js"|"jS"|"Javascript"|"javascript")
		cd $dir/Hangman && node index.js
	;;
		"py"|"python"|"PY"|"Python")
		cd $dir/Hangman && python3 hangman.py
	;;
		*)
		printf "Not valid option"
	esac
;;

	"2")
	cd $dir/MazeEscape && npm run play
;;

	"3")
	cd $dir/RockPaperScissors && python3 rockpaperscissors.py
;;

	"4")
	cd $dir/Snake && npm run play
;;

	"5")
	cd $dir/TextAdventures && npm run play
;;

	"6")
	echo -e "Python or Javascript/JS version:\c"
	read tictactoe
	case $tictactoe in
		"js"|"JS"|"Js"|"jS"|"Javascript"|"javascript"|"j")
		cd $dir/TicTacToe && node index.js
	;;
		"py"|"python"|"PY"|"Python"|"p")
		cd $dir/TicTacToe && python3 tictactoe.py
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
