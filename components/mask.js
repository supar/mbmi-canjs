steal(
    'can/util',
    'can/component',
    'can/view/stache',
function(can) {
    can.Component.extend({
        tag: 'mask',
        template: can.stache([
            '<div class="waiting {{^waiting}}hidden{{/waiting}}"><div>Loading</div></div>'
        ].join('')),
        events: {
            '{scope} waiting': function(map) {
                var map = map || {}, 
                    me = this.element.find(":first-child"),
                    masked = this.element.parent().find("[masked]"),
                    position = masked.position();

                me.height(masked.height());
                me.width(masked.width());

                console.log(position)
            }
        }
    });
});

