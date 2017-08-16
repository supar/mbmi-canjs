steal(
    '../models/access',
    './grid',
    './form',
    'can/util',
    'can/component',
function(Model) {
    can.Component.extend({
        tag: 'access-panel',
        template: can.stache([
            '<div class="panel panel-default">',
            '<div class="panel-heading">{{title}}</div>',
            '{{#if error}}',
                '<div class="panel-body">',
                    '<div class="alert alert-danger" role="alert">{{error}}</div>',
                '</div>',
            '{{/if}}',
            '{{#if isGrid()}}',
            '<div class="panel-body">',
                '<div role="toolbar" role="toolbar">',
                    '<div class="btn-group" role="group">',
                        '<button type="button" class="btn btn-primary btn-sm" ($click)="create">New restriction</button>',
                    '</div>',
                '</div>',
            '</div>',
            '<panel-grid {api}="api" {^error}="error">',
             '<thead>',
             '<tr>',
                 '<th>Host / IP</th>',
                 '<th>Restriction</th>',
             '</tr>',
             '</thead>',
             '<tbody>',
             '{{#each items}}',
                '<tr row-index="{{%index}}" ($click)="edit(%index, %scope)">',
                    '<td data-title="Host / IP">{{client}}</td>',
                    '<td data-title="Restriction">{{access}}</td>',
                '</tr>',
             '{{/each}}',
             '</tbody>',
            '</panel-grid>',
            '{{/if}}',
            '{{#if isForm()}}',
            '<panel-form {item-id}="id" {api}="api" {^error}="error" {^form-data}="formData">',
                '<fieldset>',
                '<input type="hidden" can-value="{formData.id}">',
                '<div class="form-group">',
                    '<label for="inputHost" class="col-sm-4 control-label">Host / IP</label>',
                    '<div class="col-sm-4">',
                        '<input type="input" class="form-control" id="inputHost" placeholder="Host / IP" can-value="{formData.client}">',
                    '</div>',
                '</div>',
                '<div class="form-group">',
                    '<label for="inputAccess" class="col-sm-4 control-label">Access</label>',
                    '<div class="col-sm-4">',
                        '<select class="form-control" id="inputAccess" can-value="{formData.access}">',
                            '{{#each access}}',
                            '<option {{#is accessData.access .}}selected{{/is}}>{{.}}</option>',
                            '{{/each}}',
                        '</select>',
                    '</div>',
                '</div>',
                '<div class="form-group">',
                    '<div class="row">',
                        '<div class="col-sm-12 text-center form-grou-buttons">',
                        '<button type="button" class="btn btn-success">Save</button>',
                        '<button type="button" class="btn btn-default">Cancel</button>',
                        '{{^if isNew()}}<button type="button" class="btn btn-danger">Remove</button>{{/if}}',
                        '</div>',
                    '</div>',
                '</div>',
                '</fieldset>',
            '</panel-form>',
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
        events: {
            '{scope.app.route} change': function() {
                this.viewModel.removeAttr('error');
            },
            'form button.btn-success click': function(el, ev) {
                var model = this.viewModel,
                    restriction = model.attr('formData');
                
                if(restriction) {
                    restriction.save(function() {
                        model.route();
                    }, can.proxy(model.error, model));
                } 
            },
            'form button.btn-default click': function(el, ev) {
                var model = this.viewModel;

                model.route();
            },
            'form button.btn-danger click': function(el, ev) {
                var model = this.viewModel,
                    restriction = model.attr('formData');
                
                if(restriction) {
                    restriction.destroy(function() {
                        model.route();
                    }, can.proxy(model.error, model));
                } 
            },
        },
        helpers: {
            isGrid: function() {
                return (this.page() && this.attr('id') == null)
            },
            isForm: function() {
                return (this.page() && this.attr('id') != null)
            },
            isNew: function() {
                return (this.page() && this.attr('id') == 0)
            }
        }
    });
});
