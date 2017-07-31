steal(
    'can/component',
    '../models/navbar.js',
    'can/view/stache',
function(Component, Model) {
    Component.extend({
        tag: "view-navbar",
        template: can.stache([
            '<header class="header">',
                '<div class="nav-panel-toggle">',
                    '<div class="navbar-toggle menu-toggle">',
                        '<span class="icon-bar"></span>',
                        '<span class="icon-bar"></span>',
                        '<span class="icon-bar"></span>',
                    '</div>',
                '</div>',
                '<div class="nav-panel-right">',
                    '<div class="nav-panel-client-info">',
                        '<div class="glyphicon glyphicon-user" />',
                        '<span>{{email}}</span>',
                    '</div>',
                    '<div>',
                        '<div>',
                            '<button type="button" class="btn btn-primary btn-sm">Logout</button>',
                        '</div>',
                    '</div>',
                '</div>',
            '</header>',
            '<aside>',
            '<div class="nav-panel {{^visible}}hidden{{/visible}}">',
                '<ul class="menu-panel">',
                '{{#each items}}',
                    '<li class=""><a class="{{#is id route.page}}active{{/is}}" href="#!{{id}}"><span>{{name}}</span></a></li>',
                '{{/each}}',
                '</ul>',
            '</div>',
            '</aside>'
            ].join('')),
        viewModel:function(attr, parentScope) {
            return new Model({app: parentScope})
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

            '.nav-panel-right > div button.btn click': function() {
                var model = this.viewModel;

                model.app.attr('auth.authKey', '')
            }
        },
        helpers: {
            email: function() {
                var auth = this.app.attr('auth') || null;

                if(auth) {
                    return [
                        auth.attr('login.login'),
                        auth.attr('login.domainname')
                    ].join('@')
                }
                return null
            }
        }
    });
})
