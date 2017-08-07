steal(
    '../models/spam',
    './grid',
    'can/util',
    'can/component',
function(Model) {
    can.Component.extend({
        tag: 'spam-panel',
        template: can.stache([
            '<div class="panel panel-default">',
            '<div class="panel-heading">{{title}}</div>',
            '{{#if error}}',
                '<div class="panel-body">',
                    '<div class="alert alert-danger" role="alert">{{error}}</div>',
                '</div>',
            '{{/if}}',
            '<panel-grid {api}="api" {^error}="error">',
            '{{#each items}}',
                '<tr row-index="{{%index}}">',
                    '<td>{{client}}</td>',
                    '<td>{{from}}</td>',
                    '<td>{{ip}}</td>',
                    '<td>{{attempt}}</td>',
                    '<td>{{indexRound}}</td>',
                '</tr>',
            '{{/each}}',
            '</panel-grid>',
            '</div>'
        ].join('')),
        viewModel: function(attr, parentScope) {
            return new Model({
                app: new can.Map({
                    route: parentScope.attr('route'),
                    identity: parentScope.attr('auth')
                })
            });
        },
        helpers: {
            indexRound: function(opts) {
                var opts = opts || {},
                    context = opts['context'] || null,
                    index = 0.0;

                if(context) {
                    index = context.attr('index') || 0.0;
                }

                return index.toFixed(4);
            }
        }
    });
})
