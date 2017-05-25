steal(
    'can/util',
    'can/component',
    'can/map/define',
    'can/view/stache',
function(can) {
    can.Component.extend({
        tag: 'grid',
        template: can.stache([
            '<div class="{{^if gridVisible}}hidden{{/if}}">',
            '<table class="table "><tbody><content/></tbody></table>',
            '<pager {paginate}="paginate" />',
            '</div>'
        ].join('')),
        viewModel: {
            define: {
                items: {
                    get: function(last, resolve) {
                        var gridData = this.attr('gridData');
                        if(gridData) {
                            gridData.then(resolve);
                        }
                    }
                },
                waiting: function(last, resolve) {
                    var data = this.attr('gridData');

                    return true;
                }
            }
        }
    });
})
