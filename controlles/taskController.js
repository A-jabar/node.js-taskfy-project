const {IncomingForm} = require('formidable')
const {copyFileSync} = require('fs')
const { readTasksFromFile, writeTasksToFile } = require("../utils/fileHandler")
const path = require('path')


exports.getTasks = (req , res) => {
    const tasks = readTasksFromFile();
    res.writeHead(200 , {'content-type':'application/json'});
    res.end(JSON.stringify(tasks));
}

exports.createTask = (req ,res) =>{
    const form =  new IncomingForm();
    form.parse(req , (err, fields , files) => {
        if (err){
            res.writeHead(400, {'content-type':'application/json'});
            res.end(JSON.stringify({
                message :  'error parsing form'
            }))
            return;
        }

        const image  = files.image[0];

        let task = readTasksFromFile();
        const newTask = {
            id:  task.length + 1 ,

            title: fields.title,
            description: fields?.description ||  '',
            status: fields?.status || 'pending',
            image: image ? `/uploads/${image.originalFilename}` : null

        }
        task.push(newTask);
        writeTasksToFile(task);

        if (files.image){
            copyFileSync(image.filepath, path.join(__dirname , '../uploads' , image.originalFilename));
            res.end(JSON.stringify(newTask));
        }

    })

}

exports.updateTask = (req , res) => {
    res.end(JSON.stringify({
        message : 'not implemented yet'
    }))
}

exports.deleteTask = (req , res) =>{
    res.end(JSON.stringify({
        message : 'not implemented yet'
    }))
}