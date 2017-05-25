steal(
    'can/util',
    'can/map/define',
function(can) {
    return can.Map.extend({
        define: {
            items: {
                get: function(lastSet, resolve) {
                    var data = this.attr('gridData');
                    data.then(resolve);
                }
            }       
        }
    });
})
