steal(
    'can/component',
    '../models/spam.js',
    './grid.js',
    './pager.js',
    'can/view/stache',
function(Component, Model) {
    Component.extend({
        tag: 'spam-panel',
        template: can.stache([
            '<div class="panel panel-default">',
            '<div class="panel-heading">{{title}}</div>',
            '{{#if error}}',
                '<div class="panel-body">',
                    '<div class="alert alert-danger" role="alert">{{error}}</div>',
                '</div>',
            '{{/if}}',
            '<grid {grid-data}="gridData">',
            '{{#each items}}',
                '<tr row-index="{{%index}}" ($click)="edit(%index, %scope)">',
                    '<td>{{client}}</td>',
                    '<td>{{from}}</td>',
                    '<td>{{ip}}</td>',
                    '<td>{{attempt}}</td>',
                    '<td>{{indexRound}}</td>',
                '</tr>',
            '{{/each}}',
            '</grid>',
            '</div>'].join('')
        ),
        viewModel: Model,
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
