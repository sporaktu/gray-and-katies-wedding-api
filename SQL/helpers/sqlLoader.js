const fs = require('fs');

const DIRECTORY = './sql/';
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

function readFile(fileName) {
    console.log(fileName, DIRECTORY)
    fs.readFile(DIRECTORY + fileName, 'utf-8', (err, content) => {
        if (err) {
            console.error(err);
            return;
        }
        SQL_SCRIPTS[fileName.replace('.sql', '')] = content;
    })
}

(function init() {
    getAllSqlFiles();
})();

module.exports = SQL_SCRIPTS;
