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
            '{{#if isGrid()}}',
            '<panel-grid {api}="api" {filter}="filter" {^error}="error">',
            '<thead>',
                '<tr>',
                    '<th>Host / IP</th>',
                    '<th>Restriction</th>',
                '</tr>',
            '</thead>',
            '<tbody>',
            '{{#each items}}',
                '<tr row-index="{{%index}}">',
                    '<td data-title="Host">{{from}}</td>',
                    '<td data-title="IP">{{ip}}</td>',
                    '<td data-title="Attempts">{{attempt}}</td>',
                    '<td data-title="Index">{{indexRound}}</td>',
                '</tr>',
            '{{/each}}',
            '</tbody>',
            '</panel-grid>',
            '{{/if}}',
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
            },
            isGrid: function() {
                return (this.page() && this.attr('id') == null)
            }
        }
    });
})
