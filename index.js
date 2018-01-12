import $ from 'jquery';
import 'bootstrap';
import './less/application.less!';

import map from 'can-define/map/map';
import route from 'can-route';
import 'can-stache/helpers/route';

//!steal-remove-start
import 'models/fixtures/fixtures';
//!steal-remove-end

import session from './models/session';
import tpl from './views/main.stache!';

let AppModel = map.extend({
    '*': {
            serialize: false,
    },
    isAuthorized: {
        get: function() {
            return !!this.get('session');
        }
    },
    jwt: {
        type: 'string',
        set: function(val) {
            sessionStorage.setItem('authkey', val);
    
            if(!val && this.get('session')) {
                this.assign({
                    session: undefined
                });
            }

            return val;
        }
    },
    ready: 'boolean',
    itemId: {
        serialize: true,
        type: 'number'
    },
    page: {
        serialize: true,
        type: 'string'
    },
    session: Object,

    initSession: function() {
        var me = this;

         session.get({}).then(function(response) {
             if(response && response['id']) {
                 me.set('session', response);
             }

             me.set('ready', true);
         }, function(response) {
             me.set('ready', true);
         });
    },
    cunrrent: function() {
        
    }
});

var Application = 
//!steal-remove-start
window.Application = 
//!steal-remove-end
new AppModel({
    jwt: sessionStorage.getItem('authkey')
});

// Remove loader
Application.bind('ready', function(ev, val) {
    $('#load-wrap').addClass('loaded');
});

// Set authorization key to each request
$.ajaxSetup({
    beforeSend: function(xhr) {
        var key = this.get('jwt');
    
        if(key) {
            xhr.setRequestHeader('Authorization', 'Bearer ' + key);
        }
    }.bind(Application)
});

// Register route helper
let routeWithAccess = function(str) {
    let options = Array.prototype.slice.call(arguments, -1)[0],
        access = options.scope.get('session.manager') || 0,
        check = options.scope.get('vars@*Access') || function() { return false },
        id = route.data.get('page');

    if(str === id && check(id, access)) {
        return options.fn(this);
    }
};

// Configure routes map
route.data = Application;
route('{page}');
route('{page}/{itemId}');
route.ready();

// Render template
$('body').append(tpl(Application, {
    'routing': routeWithAccess
}));
// Start application
Application.initSession();
