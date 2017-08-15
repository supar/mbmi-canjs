steal(
    '../models/transport',
    './grid',
    './form',
    'can/util',
    'can/component',
function(Model) {
    can.Component.extend({
        tag: 'transport-panel',
        template: can.stache([
            '<div class="panel panel-default">',
            '<div class="panel-heading">{{title}}</div>',
            '{{#if error}}',
                '<div class="panel-body">',
                    '<div class="alert alert-danger" role="alert">{{error}}</div>',
                '</div>',
            '{{/if}}',
            '{{#if isGrid()}}',
            '<panel-grid {api}="api" {^error}="error">',
            '<div class="panel-body">',
                '<div role="toolbar" role="toolbar">',
                    '<div class="btn-group" role="group">',
                        '<button type="button" class="btn btn-primary btn-sm" ($click)="create">New transport</button>',
                    '</div>',
                '</div>',
            '</div>',
            '{{#each items}}<tr row-index="{{%index}}" ($click)="edit(%index, %scope)">',
                '<td data-title="ID">{{id}}</td>',
                '<td data-title="Domain">{{domain}}</td>',
                '<td data-title="Transport">{{transport}}</td>',
                '<td data-title="Disk directory">{{rootdir}}</td>',
            '</tr>{{/each}}',
            '</panel-grid>',
            '{{/if}}',
            '{{#if isForm()}}',
            '<panel-form {item-id}="id" {api}="api" {^error}="error" {^form-data}="formData">',
                '<fieldset>',
                '<input type="hidden" can-value="{formData.id}">',
                '<div class="form-group">',
                    '<label for="inputClient" class="col-sm-4 control-label">Domain name</label>',
                    '<div class="col-sm-4">',
                        '<input type="input" class="form-control" id="inputClient" placeholder="Domain name" can-value="{formData.domain}">',
                    '</div>',
                '</div>',
                '<div class="form-group">',
                    '<label for="inputClient" class="col-sm-4 control-label">Transport</label>',
                    '<div class="col-sm-4">',
                        '<input type="input" class="form-control" id="inputTransport" placeholder="Transport" can-value="{formData.transport}">',
                    '</div>',
                '</div>',
                '<div class="form-group">',
                    '<label for="inputClient" class="col-sm-4 control-label">Mailboxes root directory</label>',
                    '<div class="col-sm-4">',
                        '<input type="input" class="form-control" id="inputRootdir" placeholder="Mailboxes root directory" can-value="{formData.rootdir}">',
                    '</div>',
                '</div>',
                '<div class="form-group">',
                    '<div class="col-sm-offset-4 col-xs-offset-4 col-sm-6">',
                        '<button type="button" class="btn btn-primary">Save</button>',
                        '<button type="button" class="btn btn-default">Cancel</button>',
                    '</div>',
                '</div>',
                '</fieldset>',
            '</panel-form>',
            '{{/if}}',
            "</div>"
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
            'form button.btn-primary click': function(el, ev) {
                var model = this.viewModel,
                    transport = model.attr('formData');
                
                if(transport) {
                    transport.save(function() {
                        model.route();
                    }, function(error) {
                        model.attr('error', error['message'] || 'Unknown error')
                    });
                } 
            },
            'form button.btn-default click': function(el, ev) {
                var model = this.viewModel;

                model.route();
            }
        },
        helpers: {
            isGrid: function() {
                return (this.page() && this.attr('id') == null)
            },
            isForm: function() {
                return (this.page() && this.attr('id') != null)
            }
        }
    });
});
