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
            '</header>',
            '<aside>',
            '<div class="nav-panel {{^visible}}hidden{{/visible}}">',
                '<ul class="menu-panel">',
                '{{#each items}}',
                    '<li class=""><a class="{{#is id page}}active{{/is}}" href="#!{{id}}"><span>{{name}}</span></a></li>',
                '{{/each}}',
                '</ul>',
            '</div>',
            '</aside>'
            ].join('')),
        viewModel: Model,
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
            }
        }
    });
})
