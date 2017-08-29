import $ from 'jquery';
import 'bootstrap';
import './less/application.less!';

import map from 'can-map';
import 'can-map-define';
import route from 'can-route';
import 'can-stache/helpers/route';

//!steal-remove-start
import 'models/fixtures/fixtures';
//!steal-remove-end

import session from './models/session';
import tpl from './views/main.stache!';

var AppModel = map.extend({
    define: {
        '*': {
                serialize: false,
        },

        isAuthorized: {
            get: function() {
                return !!this.attr('session');
            }
        },

        jwt: {
            type: 'string',
            set: function(val) {
                sessionStorage.setItem('authkey', val);

                if(!val && this.attr('session')) {
                    this.removeAttr('session');
                }
            }
        },

        ready: {
            type: 'boolean',
            value: false
        },

        itemId: {
            serialize: true,
            type: 'number'
        },

        page: {
            serialize: true,
            type: 'string'
        }
    },
    initSession: function() {
        var me = this;

         session.get({}).then(function(response) {
             if(response && response['id']) {
                 me.attr('session', response);
             }

             me.attr('ready', true);
         }, function(response) {
             me.attr('ready', true);
         });
    }
});

var Application = window.Applicatio = new AppModel({
    jwt: sessionStorage.getItem('authkey')
});
// Remove loader
Application.bind('ready', function(ev, val) {
    $('#load-wrap').addClass('loaded');
});

// Set authorization key to each request
$.ajax({
    beforeSend: function(xhr) {
        var key = this.attr('jwt');
    
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
