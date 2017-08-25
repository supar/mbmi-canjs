import $ from 'jquery';
import 'bootstrap';
import './less/application.less!';

import map from 'can-map';
import 'can-map-define';
import route from 'can-route';

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

        ready: {
            type: 'boolean',
            value: false
        },

        page: {
            serialize: true
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

// Set authorization key to each request
$.ajax({
    beforeSend: function(xhr) {
        var key = sessionStorage.getItem('authkey');
    
        if(key) {
            xhr.setRequestHeader('Authorization', 'Bearer ' + key);
        }
    }
});

var Application = new AppModel();
// Remove loader
Application.bind('ready', function(ev, val) {
    $('#load-wrap').addClass('loaded');
});

// Configure routes
route.data = Application;
route('{page}/{id}', {
    page: 'home'
});

// Render template
$('body').append(tpl(Application));

// Start application
Application.initSession();
route.ready();
