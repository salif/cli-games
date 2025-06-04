# Maze Escape Game

> A maze escape game for Salif's CLI game collection

### Playing

You have to follow these steps in order to play this game

- Clone this repository to your local machine (only if you haven't cloned this before)
   ```bash
   git clone https://github.com/salif/cli-games.git
   ```

- Move to `MazeEscape` directory
    ```bash
    cd MazeEscape
    ```

-   ```bash
    npm install
    ```
-   ```bash
    npm run play
    ```

<hr>

### 🌀 New Feature: Random Maze Mode (2025/05/14)

We've added a brand new **Random Maze Mode**!

When starting game, you can press **2** to enter this mode. In this mode, the game will generate a random maze for you to escape from. Each time you play, you'll face a different maze layout, making the game even more challenging and exciting.

But if you prefer the classic experience, you can still choose the **1** option to play the original maze.

No more predictable maps — enjoy endless variety!

## Contributing

Want to contribute this game? Great! Here are some ways that you can help us with this.

<details>
    <summary>Creating issues</summary>
    You can create a new issue for the following stuffs<br>
        <ul>
            <li>If something is not working properly (a bug)</li>
            <li>Suggestions</li>
        </ul>
</details>

<details>
    <summary>Submitting PRs</summary>
    You can create PRs for following tasks<br>
        <ul>
            <li><a href='/#creating-a-new-map'>Creating a new map</a></li>
            <li>Fixing bugs</li>
            <li>Improvements for the code</li>
        </ul>
</details>

### Creating a new map

Before starting to create a new map, please read this guidelines.

- `maps.json` is the file that is responsible for holding all the maps. Note this is a `.json` file so you should be familiar with it's syntax.
- `maps` is the root node of our file. Therefore it is the place you have to add the map.
- The file doesn't follow a strict rule. Here is an example of how you can add a new story to the file

```json
    {
        "maps": [
            ...
            [
                ["♟", " "],
                [" ", "▣"]
            ],
        ]
    }
```

- <b>Note that you must enter the player character (`"♟"`) and the door (`"▣"`) into the map to make it a valid map</b>
- You can also specify walls using `"▉"` character.

- Enjoy!
