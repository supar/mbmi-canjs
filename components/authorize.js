import component from 'can-component';
import map from 'can-map';
import connect from 'can-connect';
import dataUrl from 'can-connect/data/url/url';
import constructor from 'can-connect/constructor/constructor';
import parse from 'can-connect/data/parse/parse';
import baseMap from 'can-connect/can/map/map';
import error from 'util/error';

import 'can-map-define';

let login = map.extend({
    define: {
        '*': {
            serialize: false
        },
        jwt: {
            type: 'string'
        },
        email: {
            serialize: true,
            type: 'string'
        },
        password: {
            serialize: true,
            type: 'string'
        }
    }
});

connect(
    [ constructor, dataUrl, parse, baseMap ],
    {
        Map: login,
        parseInstanceProp: 'data',
        url: {
            createData: 'login',
            destroyData: 'logout'
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
                    instance.attr('password', '');
                },
                // fail
                function(response) {
                    model.attr('error', (new error(response)).Error());
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
