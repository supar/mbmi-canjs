var fs = require('fs');
var path = require("path");
var utils = require('./utils');
var stealTools = require('steal-tools');

var project = path.basename(path.dirname(__dirname));

var build = function() {
    var config = {
            main: path.join(project, 'index'),
            config: __dirname + "/../../config.js",
            bundlesPath: path.join(project, '/build/bundles'),
            npmAlgorithm: "flat",
            map: {},
            paths: {
                "index": path.join(project, 'index.js'),
                "components/*": path.join(project, 'components', '*.js'),
                "models/*": path.join(project, 'models', '*.js'),
                "models/auth": path.join(project, 'models', 'auth', '*.js'),
                "views/*": path.join(project, 'views', '*.js'),
                "less/*": path.join(project, 'less', '*')
            },
            meta: {
                "models/fixtures": {
                    "bundle": false
                }
            },
            bundle: [
                "components/application",
                "components/authenticate",
                "components/access-panel",
                "components/spam-panel"
            ]
        },
        map = ['index', 'components', 'models', 'views'];

    for(var i in map) {
        config.map[path.join(project, map[i])] = map[i];
    }

    stealTools.build(config, {
        minify: true,
        debug: true,
        quiet: false,
        bundleSteal: true,
        removeDevelopmentCode: true
    }).then(function() {
        fs.createReadStream(__dirname + '/../index_prod.html')
            .pipe(fs.createWriteStream(__dirname + '/../build/bundles/index.html'));
    });
};

module.exports = {
    "build": build,
    "clear": utils.rmDirRecursive
}
