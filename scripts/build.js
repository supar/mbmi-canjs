var fs = require('fs');
var utils = require('./utils');
var stealTools = require('steal-tools');

var build = function() {
    stealTools.build({
        main: "mail-admin/index",
        config: __dirname + "/../../config.js",
        bundlesPath: "mail-admin/build/bundles",
        npmAlgorithm: "flat",
        map: {
            "mail-admin/index": "index",
            "mail-admin/components": "components",
            "mail-admin/models": "models",
            "mail-admin/views": "views",
        },
        paths: {
            "index": "mail-admin/index.js",
            "components/*": "mail-admin/components/*.js",
            "models/*": "mail-admin/models/*.js",
            "models/auth": "mail-admin/models/auth/*.js",
            "views/*": "mail-admin/views/*.js",
            "less/*": "mail-admin/less/*"
        },
        meta: {
            "models/fixtures/fixtures": {
                "bundle": false
            }
        },
        bundle: [
            "components/application",
            "components/authenticate",
            "components/access-panel",
            "components/spam-panel"
        ]
    }, {
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
