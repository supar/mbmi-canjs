var utils = require('./utils');
var stealTools = require('steal-tools');

var build = function() {
    stealTools.build({
        main: "app/index",
        config: __dirname + "/../../config.js",
        bundlesPath: "app/build/bundles",
        bundle: ["app/components/application"]
    }, {
        debug: true,
        bundleSteal: true
    });
};


var standalong = function() {
    stealTools.export({
        system: {
            main: "app/index",
            config: __dirname + "/../config.js",
        },
        options: {
            verbose: true
        },
        outputs: {
            standalone: {
                format: "global",
                minify: true,
                modules: ["app/index"],
                dest: __dirname + "/build/standalone.js"
            }
        }
    });
}

module.exports = {
    "build": build,
    "export": standalong,
    "clear": utils.rmDirRecursive
}
