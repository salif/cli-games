const fs = require("fs")
var language = "en-us"

if (process.argv.length > 2) {
    language = process.argv[2]
}

const db = require(`./words/${language}.json`)
const newWords = new Set()
const testRegex = db.regexp != undefined
const regexp = new RegExp(db.regexp)
db.words.forEach(word => {
    if (testRegex) {
        if (!regexp.test(word)) {
            console.log(word)
        }
    }
    newWords.add(word)
})
db.words = Array.from(newWords).sort()
fs.writeFile(`./words/${language}.json`, JSON.stringify(db, null, "\t"), function (err) {
    if (err) {
        console.log(err)
    }
})
