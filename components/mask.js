steal(
    'can/util',
    'can/component',
    'can/view/stache',
function(can) {
    can.Component.extend({
        tag: 'panel-mask',
        template: can.stache([
            '<div class="waiting-mask {{^if waiting}}hidden{{/if}}"><div></div></div>'
        ].join('')),
        events: {
            '{scope} waiting': function(map) {
                var map = map || {}, 
                    me = this.element.find(":first-child"),
                    masked = this.element.parent().find("[masked]"),
                    position = masked.position();

                me.height(masked.outerHeight(true));
                me.width(masked.outerWidth(true));
            }
        }
    });
});

