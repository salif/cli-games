const symbols = require('./maps').symbols;

class Hero {

    constructor(map) {
        this.x = 0;
        this.y = 0;
        this.map = map;
        this.won = false;
    }

    moveUp() {
        if (this.canGo(this.x, this.y - 1)) {
            this.leave();
            this.goto(this.x, this.y - 1);
        }
    }

    moveDown()  {
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

    leave()  {
        this.map[this.y][this.x] = " ";
    }

    canGo(x, y) {
        return this.map[y] && (this.map[y][x] == " " || this.map[y][x] == symbols.door);
    }

    isWinningPosition(x, y) {
        return this.map[y][x] == symbols.door
    }

    hasWon() {
        return this.won;
    }

    nextMap(map) {
        this.map = map;
        this.x = 0;
        this.y = 0;
        this.won = false;
    }

}

module.exports = Hero;