var fs = require('fs');

var rmDirRecursive = function(path) {
    var path = path || null;

    if(!path) {
        console.warn("rmDirRecursive: Path required");
        return;
    }

    if(fs.existsSync(path)) {
        if(fs.lstatSync(path).isDirectory()) {
            fs.readdirSync(path).forEach(function(file,index) {
                var curPath = path + "/" + file;
                rmDirRecursive(curPath);
            });

            fs.rmdirSync(path);
        } else {
            fs.unlinkSync(path);
        }
    }
};

module.exports.rmDirRecursive = rmDirRecursive;
