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

var AppModel = map.extend({
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
                this.set({
                    session: undefined
                });
            }
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
    }
});

var Application = window.Application = new AppModel({
    jwt: sessionStorage.getItem('authkey')
});
// Remove loader
Application.bind('ready', function(ev, val) {
    $('#load-wrap').addClass('loaded');
});

// Set authorization key to each request
$.ajax({
    beforeSend: function(xhr) {
        var key = this.get('jwt');
    
        if(key) {
            xhr.setRequestHeader('Authorization', 'Bearer ' + key);
        }
    }.bind(Application)
});

// Configure routes map
route.data = Application;
route('{page}');
route('{page}/{itemId}');

// Render template
$('body').append(tpl(Application));

// Start application
Application.initSession();
route.ready();
