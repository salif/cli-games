const prompts = require('prompts');
const stories = require('./stories.json');

let response = {};
response.value = {};
response.value.description = "Choose your story!";
let node = stories.stories;

function getValues(n) {
    let choices = [];
    for (let s of n) {
        choices.push({title: s.title, value: s})
    }
    return choices;
}

(async () => {

    while (true) {
    response = await prompts({
        type: 'select',
        name: 'value',
        message: response.value.description,
        choices: getValues(node),
        hint: '- Space to select. Return to submit'
    });
    if (response.value.over == "true") {
        console.log(response.value.description)
        break;
    }
    node = response.value.answers;
    }

})();
