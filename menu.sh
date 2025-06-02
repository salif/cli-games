#!/usr/bin/env bash

# Function to create an interactive menu
# Usage: interactive_menu "Option 1" "Option 2" "Option 3"
function interactive_menu() {
    local -a options=("$@")
    local current_selection=0
    local key

    # Function to display the menu
    function display_menu() {
        clear
        echo "Use arrow keys to navigate, Enter to select, type the number, or the character in []:"
        echo
        for i in "${!options[@]}"; do
            if [ $i -eq $current_selection ]; then
                echo "> ${options[$i]}" | lolcat -as 10000
            else
                echo "  ${options[$i]}" | lolcat -as 10000
            fi
        done
    }

    # Function to handle key press
    handle_key() {
        read -rsn1 key
        case "$key" in
            $'\x1B')  # ESC sequence
                read -rsn2 key
                case "$key" in
                    "[A") # Up arrow
                        if [ $current_selection -gt 0 ]; then
                            ((current_selection--))
                        fi
                        ;;
                    "[B") # Down arrow
                        if [ $current_selection -lt $((${#options[@]} - 1)) ]; then
                            ((current_selection++))
                        fi
                        ;;
                esac
                ;;
            "") # Enter key
                return 0
                ;;
            [0-9]) # Number key
                local num=$((10#$key))  # Convert to decimal, handles leading zeros
                if [ $num -lt ${#options[@]} ]; then
                    current_selection=$num
                    return 0
                fi
                ;;
            "e"|"E") # Exit key
                current_selection=$((${#options[@]} - 1))  # Select last option (Exit)
                return 0
                ;;
        esac
        return 1
    }

    # Main menu loop
    while true; do
        display_menu
        handle_key
        if [ $? -eq 0 ]; then
            break
        fi
    done

    # Store the selection in a global variable
    MENU_SELECTION=$current_selection
    return $current_selection
}

# Function to handle recursive menu selections
# Usage: handle_menu_selection "menu_name" "option1" "option2" ...
function handle_menu_selection() {
    local menu_name="$1"
    shift
    local -a options=("$@")
    
    interactive_menu "${options[@]}"
    local selected=$MENU_SELECTION
    
    # Return the selected option text (without the [x] prefix)
    local selected_text="${options[$selected]}"
    if [[ "$selected_text" =~ \[[^]]+\]\ (.+) ]]; then
        echo "${BASH_REMATCH[1]}"
    else
        echo "$selected_text"
    fi
}

# Example usage with recursive menus:
main_options=(
    "[1] Games"
    "[2] Settings"
    "[e] Exit"
)

game_options=(
    "[1] Snake"
    "[2] Tetris"
    "[b] Back"
)

settings_options=(
    "[1] Sound"
    "[2] Graphics"
    "[b] Back"
)

# Main program loop
while true; do
    selection=$(handle_menu_selection "Main Menu" "${main_options[@]}")
    
    case "$selection" in
        "Games")
            while true; do
                game_selection=$(handle_menu_selection "Games" "${game_options[@]}")
                case "$game_selection" in
                    "Snake")
                        echo "Starting Snake..."
                        # Add your game logic here
                        read -p "Press Enter to continue..."
                        ;;
                    "Tetris")
                        echo "Starting Tetris..."
                        # Add your game logic here
                        read -p "Press Enter to continue..."
                        ;;
                    "Back")
                        break
                        ;;
                esac
            done
            ;;
        "Settings")
            while true; do
                settings_selection=$(handle_menu_selection "Settings" "${settings_options[@]}")
                case "$settings_selection" in
                    "Sound")
                        echo "Sound settings..."
                        # Add your settings logic here
                        read -p "Press Enter to continue..."
                        ;;
                    "Graphics")
                        echo "Graphics settings..."
                        # Add your settings logic here
                        read -p "Press Enter to continue..."
                        ;;
                    "Back")
                        break
                        ;;
                esac
            done
            ;;
        "Exit")
            echo "Goodbye!"
            exit 0
            ;;
    esac
done
