const fs = require('fs');

const DIRECTORY = '../../routes';

function routeLoader(app) {
    fs.readdirSync(DIRECTORY, (err, fileNames) => {
        if (err) {
            console.error(err);
            return;
        }
        fileNames.forEach(fileName => {
            const route = DIRECTORY + fileName;
            require(route)(app);
        })
    })
}

module.exports = routeLoader;
