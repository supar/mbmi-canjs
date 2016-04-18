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

var runServer = function(docRoot) {
    var exec = require('child_process').exec;

    try {
        process.chdir(docRoot);
        exec('http-server -p 80', function() {});
    }
    catch(err) {
        console.log('Cannot start http-server: ' + err);
    }
};

module.exports.rmDirRecursive = rmDirRecursive;
module.exports.runServer = runServer;
