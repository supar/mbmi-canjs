steal(
    'can/util',
    'can/component',
    'can/map/define',
    'can/view/stache',
function(can) {
    can.Component.extend({
        tag: 'access-form',
        template: can.stache([
            '<div masked class="panel-body {{#if gridVisible}}hidden{{/if}}">',
            '<form class="form-horizontal" role="form" ($submit)="send"><content /></form>',
            '</div>'
        ].join('')),
        viewModel: {
            define: {
                access: {
                    get: function() {
                        return ['REJECT', 'OK'];
                    }
                }
            },
            send: function(map) {
                var access = this.attr('accessData');
                
                if(access) {
                    this.attr('saveStatus', access.save());
                } 
                return false;
            }
        }
    });
});

