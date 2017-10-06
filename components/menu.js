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
    },
    itemAccess: function(id, role) {
        var id = id || '',
            role = role || 0,
            items = this.get('items');

        return !!items.find(function(item) {
            return (item.id == id && item.role == role);
        });
    }
});

export default component.extend({
    tag: "navigation-panel",
    viewModel:function(attr, parentScope) {
        return new menu({
            app: parentScope,
            items: [
                { id: 'home', name: 'Home', role: 0 },
                { id: 'access', name: 'SMTP restrictions', role: 1 },
                { id: 'spam', name: 'Spam', role: 1 },
                { id: 'transport', name: 'Transport', role: 1 }
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
        roleFilter: function() {
            var session = this.app.get('session.manager') || 0,
                items = this.get('items'),
                fn = function(item) {
                    return (item.role == 0 || 
                        item.role == session);
                };

            return items.filter(fn)
        },
        screen: function() {
            var model = this.viewModel;

            model.set('winsize', $(window).width())
        }
    }
});

