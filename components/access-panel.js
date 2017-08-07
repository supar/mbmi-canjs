steal(
    'can/component',
    '../models/access.js',
    './grid.js',
    './access-form.js',
function(Component, Model) {
    Component.extend({
        tag: 'access-panel',
        template: can.stache([
            '<div class="panel panel-default">',
            '<div class="panel-heading">{{title}}</div>',
            '{{#if error}}',
                '<div class="panel-body">',
                    '<div class="alert alert-danger" role="alert">{{error}}</div>',
                '</div>',
            '{{/if}}',
            '<grid {grid-data}="gridData">',
            '<div class="panel-body">',
                '<div role="toolbar" role="toolbar">',
                    '<div class="btn-group" role="group">',
                        '<button type="button" class="btn btn-primary btn-sm" ($click)="newItem">New Item</button>',
                    '</div>',
                '</div>',
            '</div>',
            '{{#each items}}<tr row-index="{{%index}}" ($click)="edit(%index, %scope)">',
                '<td>{{client}}</td>',
                '<td>{{access}}</td>',
            '</tr>{{/each}}',
            '</grid>',
            '<access-form {access-data}="access" {^save-status}="saveStatus">',
                '<fieldset>',
                '<input type="hidden" can-value="{accessData.id}">',
                '<div class="form-group">',
                    '<label for="inputClient" class="col-sm-4 control-label">Client</label>',
                    '<div class="col-sm-4">',
                        '<input type="input" class="form-control" id="inputClient" placeholder="Client" can-value="{accessData.client}">',
                    '</div>',
                '</div>',
                '<div class="form-group">',
                    '<label for="inputClient" class="col-sm-4 control-label">Access</label>',
                    '<div class="col-sm-4">',
                        '<select class="form-control" can-value="{accessData.access}">',
                            '{{#each access}}',
                            '<option {{#is accessData.access .}}selected{{/is}}>{{.}}</option>',
                            '{{/each}}',
                        '</select>',
                    '</div>',
                '</div>',
                '<div class="form-group">',
                    '<div class="col-sm-offset-4 col-xs-offset-4 col-sm-6">',
                        '<button type="submit" class="btn btn-primary">Save</button>',
                        '<button type="input" class="btn btn-default">Cancel</button>',
                    '</div>',
                '</div>',
                '</fieldset>',
            '</access-form>',
            '</div>'
        ].join('')),
        viewModel: Model,
        events: {
            init: function() {
                this.readForm();
            },
            '{scope} id': function() {
                this.readForm();
            },
            '{scope} saveStatus': function(map) {
                var state = map.attr('saveStatus'),
                    success = can.proxy(function(response) {
                        map.doBack(true);

                        return response;
                    }, map),
                    error = can.proxy(map.Error, map);

                if(state && state.state() === 'pending') {
                    state.then(success, error);
                }
            },
            '.btn-default click': function(el, ev) {
                var model = this.viewModel;
                model.doBack();
            },
            readForm: function() {
                var model = this.viewModel,
                    id = model.attr('id');

                model.getFormData();

                model.attr({
                    gridShow: id != null ? false : true
                });
            }
        }
    });
});
