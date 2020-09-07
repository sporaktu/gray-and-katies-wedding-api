const fs = require('fs');

const DIRECTORY = './sql';
const SQL_SCRIPTS = {};

function getAllSqlFiles() {
    fs.readdir(DIRECTORY, (err, fileNames) => {
        if (err) {
            console.error(err);
            return;
        }
        fileNames.forEach(readFile)
    })
}

function readFile(fileName, directory = DIRECTORY) {
    fs.readFile(directory + fileName, 'utf-8', (err, content) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log(fileName, content);
    })
}

module.exports = SQL_SCRIPTS;
