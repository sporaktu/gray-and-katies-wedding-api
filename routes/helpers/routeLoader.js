const fs = require('fs');

const DIRECTORY = '../../routes';

function routeLoader(app) {
    fs.readdirSync(DIRECTORY, (err, fileNames) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log(fileNames)
        fileNames.forEach(fileName => {
            const route = DIRECTORY + fileName;
            console.log(route);
            require(route)(app);
        })
    })
}

module.exports = routeLoader;
