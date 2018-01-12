import component from 'can-component';
import map from 'can-define/map/map';
import connect from 'can-connect';
import dataUrl from 'can-connect/data/url/url';
import constructor from 'can-connect/constructor/constructor';
import parse from 'can-connect/data/parse/parse';
import canMap from 'can-connect/can/map/map';
import error from 'util/error';
import ajax from 'util/ajax-setup';


import $ from 'jquery';

let login = map.extend({
    '*': {
        serialize: false
    },
    jwt: 'string',
    email: {
        serialize: true,
        type: 'string'
    },
    password: {
        serialize: true,
        type: 'string'
    }
});

connect(
    [ constructor, dataUrl, parse, canMap, ajax ],
    {
        Map: login,
        // This is strange hook to prevent error
        // while behavior initialized
        List: function() {},
        parseInstanceProp: 'data',
        url: {
            createData: 'login',
            destroyData: 'logout',
        }
    });

export default component.extend({
    tag: 'login-panel',
    events: {
        'form submit': function(el, ev) {
            var model = this.viewModel;

            ev.preventDefault();

            model.save().then(
                // success
                function(instance) {
                    instance.set('password', '');
                },
                // fail
                function(response) {
                    model.set('error', (new error(response)).Error());
                }
            );

            return false;
        }
    },
    viewModel: function(attr, parentScope) {
        var model = new login();

        model.bind('jwt', function(ev, val) {
            if(val) {
                this.set('jwt', val);
                this.get('initSession')();
            }
        }.bind(parentScope));

        return model;
    }
});
