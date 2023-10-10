# Hangman game

## Play

### Node.js 

```bash
node index.js

# specify language:
node index.js [language]
# e.g.
node index.js pt-br

# specify words:
node index.js en code
```

### Python

```bash
python hangman.py
# or specify language:
python hangman.py [language]
# e.g.
python hangman.py pt-br
```

## Contributing

### Translate

```bash
cp locales/en/locale.json locales/[language]/locale.json
# Translate locales/[language]/locale.json
```

### Add a word list

```bash
echo '{"words": ["word 1", "word 2"]}' > locales/[language]/words/[name].json
# Edit locales/[language]/words/[name].json
```
