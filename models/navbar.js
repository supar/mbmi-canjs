steal(
    'can/map/define',
function() {
    return can.Map.extend({
        define: {
            visible: {
                type: 'boolean',
                value: false
            },
            items: {
                value: [
                    { id: 'home', name: 'Home' },
                    { id: 'transport', name: "Transport" },
                    //{ id: 'access', name: 'Access' },
                    { id: 'spam', name: 'Spam' }
                ]
            },
            winsize: {
                type: 'number',
                set: function(newVal) {
                    this.attr('visible', (newVal <= 768) ? false : true);
                    return newVal;
                }
            }
        }
    });
});
