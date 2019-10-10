# Text Adventures

> A text adventures game for Salif's CLI game collection

### Playing

You have to follow these steps in order to play this game

- Clone this repository to your local machine (only if you haven't cloned this before)
   ```sh
   git clone https://github.com/salifm/cli-games.git
   ```

- Move to `TextAdventures` directory
    ```sh
    cd TextAdventures
    ```

-   ```sh
    npm install
    ```
-   ```sh
    npm run play
    ```

<hr>

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
            <li><a href='/#creating-a-new-story'>Creating a new story</a></li>
            <li>Fixing bugs</li>
            <li>Improvements for the code</li>
        </ul>
</details>

### Creating a new story

Before starting to create a new story, please read this guidelines.

- `stories.json` is the file that is responsible for holding all the stories. Note this is a `.json` file so you should be familiar with it's syntax.
- `stories` is the root node of our file. Therefore it is the place you have to add the story.
- You will notice a strict structure in this file. Look below if you didn'tasks

```
    stories
        |____ a story
            |____ title
            |____ description
            |____ answers
                |____ answer 1
                |   |___ title
                |   |___ description
                |   |___ over
                |   |___ ...
                |____ answer 2
                    |___ title
                    |___ description
                    |___ over
                    |___ ...

            (and so goes)
```

- Here is an example of how you can add a new story to the file

```json
    {
        "stories": [
            ...
            {
                "title": "My story",
                "description": "Some description",
                "answers": []
            }
        ]
    }
```

- `answers` is the container that hold the options of your story. All the options must have the following keys

```json
    {
        "title": "Option 1",
        "description": "Description related with the option 1",
        "over": false,
        "answers": []
    }
```

- You must specify `true` to the `over` key if the game is over, and otherwise `false`. If it is `true`, you must add another key called `win` and the value must be a boolean value related with victory or lose.
- You can nest more and more options inside `answers` table as you did before.
- Enjoy!

