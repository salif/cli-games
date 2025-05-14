function generateRandomMaze(width, height) {
    // initialize the maze with walls
    const maze = Array.from({ length: height }, () => Array(width).fill("▉"));

    // DFS carving algorithm
    function carve(x, y) {
        maze[y][x] = " ";
        const dirs = [
            [0, -2], [2, 0], [0, 2], [-2, 0]
        ].sort(() => Math.random() - 0.5);

        for (const [dx, dy] of dirs) {
            const nx = x + dx, ny = y + dy;
            if (ny > 0 && ny < height - 1 && nx > 0 && nx < width - 1 && maze[ny][nx] === "▉") {
                maze[y + dy / 2][x + dx / 2] = " ";
                carve(nx, ny);
            }
        }
    }

    // start carving from (1, 1)
    carve(1, 1);

    // BFS
    const visited = Array.from({ length: height }, () => Array(width).fill(false));
    const queue = [[1, 1]];
    visited[1][1] = true;
    let farthest = [1, 1];

    while (queue.length) {
        const [x, y] = queue.shift();
        farthest = [x, y];
        for (const [dx, dy] of [[0,1], [1,0], [-1,0], [0,-1]]) {
            const nx = x + dx, ny = y + dy;
            if (maze[ny]?.[nx] === " " && !visited[ny][nx]) {
                visited[ny][nx] = true;
                queue.push([nx, ny]);
            }
        }
    }

    // place the hero and the goal
    maze[1][1] = "♟";
    const [fx, fy] = farthest;
    maze[fy][fx] = "▣";

    return maze;
}

module.exports = { generateRandomMaze };
