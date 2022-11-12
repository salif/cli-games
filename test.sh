#!/bin/bash

function MazeEscape() {

printf "Installing MazeEscape dependences..."
cd MazeEscape && npm install .

if [[ -d node_modules ]]; then
        printf "MazeEscape dependences installed correctly"
else
        printf "MazeEscape dependences not installed or installed uncorrectly"
        return 1
fi

}

MazeEscape
