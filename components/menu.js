import component from 'can-component';
import map from 'can-map';

import 'can-map-define';

let menu = map.extend({
    define: {
        visible: {
            type: 'boolean',
            value: false
        },
        items: {
            value: [
                { id: 'home', name: 'Home' },
                { id: 'access', name: 'SMTP restrictions' },
                { id: 'spam', name: 'Spam' },
                { id: 'transport', name: "Transport" }
            ]
        },
        winsize: {
            type: 'number',
            set: function(newVal) {
                this.attr('visible', (newVal <= 768) ? false : true);
                return newVal;
            }
        }
    }
});

export default component.extend({
    tag: "navigation-panel",
    viewModel:function(attr, parentScope) {
        return new menu({
            app: parentScope
        });
    },
    events: {
        init: function() {
            this.menuResponsive();
        },

        menuResponsive: function() {
            this.viewModel.attr('winsize', $(window).width());
        },

        '{window} resize': function() {
            this.menuResponsive();
        },

        '.menu-toggle click': function() {
            var model = this.viewModel,
                visible = model.attr('visible');

            model.attr('visible', !visible)
        },

        '.nav-row .btn-logout click': function() {
            var model = this.viewModel;

            model.app.set('jwt', '');
        }
    },
    helpers: {
        email: function() {
            var session = this.app.get('session') || null;

            if(session) {
                return [
                    session.attr('login'),
                    session.attr('domainname')
                ].join('@')
            }
            return null
        }
    }
});

