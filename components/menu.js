import component from 'can-component';
import map from 'can-define/map/map';

let menu = map.extend({
    visible: 'boolean',
    items: Array,
    winsize: {
        type: 'number',
        set: function(val) {
            this.set('visible', !this.isSmallScreen(val));
            return val;
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
            app: parentScope,
            items: [
                { id: 'home', name: 'Home' },
                { id: 'access', name: 'SMTP restrictions' },
                { id: 'spam', name: 'Spam' },
                { id: 'transport', name: "Transport" }
            ]
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
                visible = model.get('visible');

            model.set('visible', !visible)
        },

        'ul.menu-panel a click': function() {
            var model = this.viewModel;

            if(model.isSmallScreen(this.screen())) {
                model.set('visible', false);
            }
        },

        '.nav-row .btn-logout click': function() {
            var model = this.viewModel;

            model.app.set('jwt', '');
        },

        screen: function() {
            this.viewModel.set('winsize', $(window).width());
        }
    },
    helpers: {
        email: function() {
            var session = this.app.get('session') || null;

            if(session) {
                return [
                    session.get('login'),
                    session.get('domainname')
                ].join('@')
            }
            return null
        },
        screen: function() {
            var model = this.viewModel;

            model.set('winsize', $(window).width())
        }
    }
});

