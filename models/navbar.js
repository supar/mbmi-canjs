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
                    { id: 'access', name: 'SMTP restrictions' },
                    { id: 'spam', name: 'Spam' },
                    { id: 'transport', name: "Transport" }
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
