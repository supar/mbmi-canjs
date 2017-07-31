steal(
    'can/model',
    'can/map/define',
function(Model) {
    return can.Map.extend({
        define: {
            count: {
                value: Infinity,
                count: function(newValue) {
                    return newValue < 0 ? 0 : newValue;
                }
            },
            limit: {
                value: 50
            },
            offset: {
                value: 0,
                set: function(newValue) {
                    return newValue < 0 ? 
                        0 : 
                        Math.min(newValue, !isNaN(this.count - 1) ? 
                            this.count - 1 :
                            Infinity);
                }
            },
            page: {
                get: function() {
                    return Math.floor(this.attr('offset') / this.attr('limit')) + 1;
                },
                set: function(newVal) {
                    this.attr('offset', (parseInt(newVal, 10) - 1) * this.attr('limit'));
                }
            }
        },
        prev: function() {
            this.attr('offset', this.offset - this.limit);
        },
        next: function() {
            if(this.canNext()) {
                this.attr('offset', this.offset + this.limit);
            }
        },
        canPrev: function() {
            return this.attr('offset') > 0;
        },
        canNext: function() {
            return this.attr('offset') < this.attr('count') - this.attr('limit');
        },
        entryFirst: function() {
            return (this.attr('offset') + 1)
        },
        entryNext: function() {
            var next = this.attr('offset') + this.attr('limit')
            return next > this.attr('count') ? this.attr('count') : next;
        }
    });
});
