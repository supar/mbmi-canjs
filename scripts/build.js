var fs = require('fs');
var path = require("path");
var utils = require('./utils');
var stealTools = require('steal-tools');

var project = path.basename(path.dirname(__dirname));

var build = function() {
    var config = {
            main: path.join(project, 'index'),
            config: __dirname + "/../package.json!npm",
            npmAlgorithm: "flat",
            map: {},
            meta: {
                "models/fixtures": {
                    "bundle": false
                }
            }
        };

    stealTools.build(config, {
        minify: true,
        debug: true,
        quiet: false,
        bundleSteal: true,
        removeDevelopmentCode: true,
        dest: 'build',
    }).then(function() {
        fs.createReadStream(__dirname + '/../index_prod.html')
            .pipe(fs.createWriteStream(__dirname + '/../build/bundles/index.html'));
    });
};

module.exports = {
    "build": build,
    "clear": utils.rmDirRecursive
}
