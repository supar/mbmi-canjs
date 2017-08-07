steal(
    'can/util',
function(can) {
    return can.Map.extend({
        define: {
            activeItem: {
                type: 'string'
            },
            apiCfg: {
                Type: Object
            },
            api: {
                get: function(val) {
                    var cfg = this.attr('apiCfg') || {};
                
                    if(!val) {
                        val = can.Model.extend(cfg, {});
                        // Don't use setter to prevent loop here
                        this.api = val;
                    }

                    return val;
                }
            },
            id: {
                type: 'number',
                get: function() {
                    var id = this.attr('app.route.id');

                    return (this.page() && /^\d+$/.test(id)) ? 
                        id : null;
                }
            }
        },
        create: function() {
            this.route(0);
        },
        edit: function(idx, scope) {
            var id = scope.attr('id');

            this.route(id);
        },
        route: function(id) {
            var id = id || (typeof id == "number" ? 0 : null);

            if(parseInt(id) > -1) {
                can.route.attr({
                    page: can.route.attr('page'),
                    id: id
                });
            } else {
                can.route.removeAttr('id');
            }
        }
    });
});
