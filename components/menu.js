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
            set: function(val) {
                this.attr('visible', !this.isSmallScreen(val));
                return val;
            }
        }
    },
    isSmallScreen: function(val) {
        return (val <= 768);
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
            this.screen();
        },

        '{window} resize': function() {
            this.screen();
        },

        '.menu-toggle click': function() {
            var model = this.viewModel,
                visible = model.attr('visible');

            model.attr('visible', !visible)
        },

        'ul.menu-panel a click': function() {
            var model = this.viewModel;

            if(model.isSmallScreen(this.screen())) {
                model.attr('visible', false);
            }
        },

        '.nav-row .btn-logout click': function() {
            var model = this.viewModel;

            model.app.set('jwt', '');
        },

        screen: function() {
            this.viewModel.attr('winsize', $(window).width());
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
        },
        screen: function() {
            var model = this.viewModel;

            model.attr('winsize', $(window).width())
        }
    }
});

