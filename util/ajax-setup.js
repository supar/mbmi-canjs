import $ from 'jquery';
import connect from 'can-connect';
import each from 'can-util/js/each/each';
import assign from 'can-assign';

let ajax = function(options) {
    options.contentType = options.contentType || 'application/x-www-form-urlencoded';

    switch(options.contentType) {
        case 'application/json':
            options.data = JSON.stringify(options.data || {});
            break;
    }
    return $.ajax.call(this, options)
}

export default connect.behavior('util/ajax', function(baseConnection) {
    let behavior = {},
        interfaces = [
            'getListData',
            'getData',
            'createData',
            'updateData:',
            'destroyDataa'
        ];

    each(interfaces, function(name) {
        behavior[name] = function(params) {
            this.ajax = this['ajax'] || ajax;
            return baseConnection[name].call(this, params)
        }
    });

    return behavior;
});
