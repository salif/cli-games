const symbols = require('./maps').symbols;

class Hero {
    constructor(map) {
        this.map = map;
        this.won = false;

        // find the player position
        for (let y = 0; y < map.length; y++) {
            for (let x = 0; x < map[y].length; x++) {
                if (map[y][x] === "♟") {
                    this.x = x;
                    this.y = y;
                    return;
                }
            }
        }

        throw new Error("Player ♟ not found in map.");
    }

    moveUp() {
        if (this.canGo(this.x, this.y - 1)) {
            this.leave();
            this.goto(this.x, this.y - 1);
        }
    }

    moveDown() {
        if (this.canGo(this.x, this.y + 1)) {
            this.leave();
            this.goto(this.x, this.y + 1);
        }
    }

    moveLeft() {
        if (this.canGo(this.x - 1, this.y)) {
            this.leave();
            this.goto(this.x - 1, this.y);
        }
    }

    moveRight() {
        //console.log(`[DEBUG] Trying to move RIGHT from (${this.x}, ${this.y})`);
        if (this.canGo(this.x + 1, this.y)) {
            this.leave();
            this.goto(this.x + 1, this.y);
        }
    }

    goto(x, y) {
        if (this.canGo(x, y)) {
            this.x = x;
            this.y = y;
            if (this.isWinningPosition(x, y)) this.won = true;
            this.map[y][x] = '♟';
        }
    }

    leave() {
        this.map[this.y][this.x] = " ";
    }

    canGo(x, y) {
        return this.map[y] && (this.map[y][x] === " " || this.map[y][x] === symbols.door);
    }

    isWinningPosition(x, y) {
        return this.map[y][x] === symbols.door;
    }

    hasWon() {
        return this.won;
    }

    nextMap(map) {
        this.map = map;
        this.won = false;

        // find the new position of ♟
        for (let y = 0; y < map.length; y++) {
            for (let x = 0; x < map[y].length; x++) {
                if (map[y][x] === "♟") {
                    this.x = x;
                    this.y = y;
                    return;
                }
            }
        }

        throw new Error("Player ♟ not found in new map.");
    }
}

module.exports = Hero;
