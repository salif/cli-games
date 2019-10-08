let player = 1;
let p1 = null;
let p2 = null;
let board = [
    [' ', ' ', ' '],
    [' ', ' ', ' '],
    [' ', ' ', ' '],
];
let gameInit = false;

let input = process.stdin;

function print(out) {
    process.stdout.write(out);
}

function printBoard() {
    let nl = '\n  -------------\n';
    let res = '    1   2   3 \n' + nl;
    for (let row in board) {
        res += (1 - -row) + " | " + board[row].join(' | ') + ' |\n' + nl;
    }
    print(res);
}

function main() {
    if (!gameInit) {
        print("Please enter Player 1 name: ");
    }
}

function prompt() {
    print(`It's ${player == 1 ? p1 : p2}'s turn. \nPlease enter the position of row and column you like to play: `);
}

function check(data) {
    data = data.toString().replace(/\n/, '').trim();
    if (/^(1|2|3)\s+(1|2|3)$/gi.test(data)) {
        return data.toString().replace(/\s+/g, ' ').split(' ');
    }
    print("Wrong input!");
    prompt();
    return false;
}

function isWinner(p) {
    let m = p == 1 ? 'X' : 'O';
    return checkDiagonals(m) || checkRows(m) || checkDiagonals(m);
}

function checkRows(m) {
    for (let row of board) {
        if (row[0] == m && row[1] == m && row[2] == m) return true;
    }
    return false;
}

function checkColumns(m) {
    for (let col in board) {
        if (board[0][col] === m && board[1][col] === m && board[2][col] === m) return true;
    }
    return false;
}

function checkDiagonals(m) {
    return (board[0][0] === m && board[1][1] === m && board[2][2] === m) || (board[2][0] === m && board[1][1] === m && board[0][2] === m);
}


/**LISTENERS**/

input.on('data', data => {
   if (!gameInit) {
       if (!p1) {
           p1 = data.toString().replace(/\n/g, '');
           print("Please enter Player 2 name: ");
       }
       else if (!p2) {
           p2 = data.toString().replace(/\n/g, '');
           gameInit = true;
           prompt();
       }
   } else {
       if (check(data)) {
           let i = check(data).map(x => parseInt(x) - 1);
           if (board[i[0]][i[1]] !== ' ') {
               print('Invalid move! Somebody has already marked it down\n');
               prompt();
           } else {
                board[i[0]][i[1]] = player == 1 ? 'X' : 'O';
                if (isWinner(player)) {
                    printBoard();
                    print(`Congrats! ${player == 1 ? p1 : p2} is the winner!!!\n`);
                    process.exit();
                }
                player = player == 1 ? 2 : 1;
                printBoard();
                prompt();
           }
       }
   }
})

main()
