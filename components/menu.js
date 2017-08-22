import Component from 'can/component/component';
import stache from 'can/view/stache/stache';
import Model from '../models/navbar.js';

export default Component.extend({
    tag: "view-navbar",
    template: stache([
        '<header class="header">',
            '<div class="container-fluid nav-row">',
                '<div>',
                    '<div class="navbar-toggle menu-toggle">',
                        '<span class="icon-bar"></span>',
                        '<span class="icon-bar"></span>',
                        '<span class="icon-bar"></span>',
                    '</div>',
                '</div>',
                '<div class="row-center">',
                    '<div class="flex-row">',
                        '<div>',
                            '<div class="flex-item-right overflow-item">',
                                '<i class="glyphicon glyphicon-user"></i>&nbsp;{{email}}',
                            '</div>',
                        '</div>',
                    '</div>',
                '</div>',
                '<div>',
                    '<button type="button" class="btn btn-primary">Logout</button>',
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

