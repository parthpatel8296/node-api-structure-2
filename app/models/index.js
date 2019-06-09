// Internal Imports
const fs = require('fs');

// Initialize all models 
module.exports = () => {
    fs.readdirSync(__dirname).forEach((file) => {
        if (file === "index.js") return;
        let model = file.substr(0, file.lastIndexOf('.'));
        require('./' + model);
    });
}