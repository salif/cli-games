gamemat = [0] * 4
for i in range(4):
    gamemat[i] = [0] * 4
player = 1
gameEnd = False
gameResult = None

def readInput(currentPlayer):
    print("Player " + str(currentPlayer) + " (input x and y, seperated with a space): ", end = "")
    try:
        x,y = input().split()
        x = int(x)
        y = int(y)
    except ValueError:
        print("Invalid move")
        readInput(currentPlayer)
        return
    if x >= 4 or y >= 4 or x <= 0 or y <= 0:
        print("Invalid move")
        readInput(currentPlayer)
        return
    if gamemat[x][y] != 0:
        # Occupied
        print("Invalid move")
        readInput(currentPlayer)
        return
    else:
        gamemat[x][y] = currentPlayer # 0 => blank / 1 => player 1 / 2 => player 2
    global player
    player = int(not bool(currentPlayer-1)) +1

    print("player: " + str(player))
    renderGamemat()


def printPos(x, y):
    toPrint = None
    if gamemat[x][y]:
        toPrint = "X" if gamemat[x][y] == 1 else "O"
    else:
        toPrint = " "
    return str(toPrint)

def renderGamemat():
    print("     1 | 2 | 3 => x-axis")
    print("   -------------")
    print(" 1 | " + printPos(1, 1) + " | " + printPos(2, 1) + " | " + printPos(3 ,1) + " |")
    print("   -------------")
    print(" 2 | " + printPos(1, 2) + " | " + printPos(2, 2) + " | " + printPos(3, 2) + " |")
    print("   -------------")
    print(" 3 | " + printPos(1, 3) + " | " + printPos(2, 3) + " | " + printPos(3, 3) + " |")
    print(" |")
    print("y-axis")
    print()

def checkWiningConditions():
    # algorithm to be improved later
    return 0

def gameInit():
    gameEnd = False
    while not gameEnd:
        for i in range(5):
            print()
        renderGamemat()
        readInput(player)
        gameResult = checkWiningConditions()
        if gameResult != 0:
            gameEnd = True
    # Game ends
    print("Player " + str(gameResult) + " wins!")
    print("Do you want to play again?")


def main():
    print("Welcome to Tic Tac Toe")
    print("This game needs 2 players")
    print("Press enter to start!")
    input()
    gameInit()

main()