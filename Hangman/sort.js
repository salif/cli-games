var fs = require("fs")
var language = "en-us";

if(process.argv.length > 2) {
	language = process.argv[2];
}

var db = require(`./words/${language}.json`);
db.words = db.words.sort();
fs.writeFile(`./words/${language}.json`, JSON.stringify(db, null, "\t"), function(err) {
    if (err) {
        console.log(err);
    }
});
