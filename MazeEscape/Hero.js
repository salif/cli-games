
class Hero {

    constructor(map) {
        this.x = 0;
        this.y = 0;
        this.map = map;
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
            this.map[y][x] = '♟';
        }
    }

    leave()  {
        this.map[this.y][this.x] = " ";
    }

    canGo(x, y) {
        return this.map[y] && this.map[y][x] == " ";
    }

}

module.exports = Hero;