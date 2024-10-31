const { JSONParser } = require('formidable/parsers');
const fs = require('fs');
const path = require('path');

const  filePath = path('./data/tasks.json');

exports.writeTasksToFile =  (task) => {

    fs.writeFileSync(filePath , JSON.stringify(task));
}

exports.readTasksFromFile = () => {
    if(!fs.existsSync(filePath)){
        writeTasksToFile([]);
    }

    const data = fs.readFileSync(filePath);
    return JSON.parse(data);
}
