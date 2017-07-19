steal(
    'can/util',
    'can/component',
    'can/map/define',
    'can/view/stache',
function(can) {
    can.Component.extend({
        tag: 'transport-form',
        template: can.stache([
            '<div masked class="panel-body {{#if gridVisible}}hidden{{/if}}">',
            '<form class="form-horizontal" role="form" ($submit)="send"><content /></form>',
            '</div>'
        ].join('')),
        viewModel: {
            define: {
                transport: {
                    get: function() {
                        return ['virtual'];
                    }
                }
            },
            send: function(map) {
                var transport = this.attr('transportData');
                
                if(transport) {
                    this.attr('saveStatus', transport.save());
                } 
                return false;
            }
        }
    });
});
