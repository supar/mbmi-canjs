steal(
    'can/util',
    './pagination',
    'can/model',
    'can/map/define',
function(can, Paginate, Model) {
    var Store = Model.extend({
        findAll: 'GET spam'
    }, {});
    
    return can.Map.extend({
        define: {
            title: {
                value: "Spam stat"
            },
            paginate: {
                value: function() {
                    return new Paginate({ 
                        limit: 50
                    });
                }
            },
            gridData: {
                get: function() {
                     var ready = this.attr('panelActive');
                     if(!ready) {
                         return null;
                     } else {
                        return this.getGridData();
                     }
                }
            },
            gridVisible: {
                type: 'boolean',
                get: function() {
                    return this.attr('id') ? false : true;
                }
            },
            panelActive: {
                type: 'boolean',
                get: function() {
                    return !!(can.route.attr('page') == 'spam');
                }
            }
        },
        edit: function(idx, scope) {
            var id = scope.attr('client');

            // TODO: 
            //this.changeRoute(id);
        },
        changeRoute: function(id) {
            var id = id || null;

            if(id) {
                can.route.attr({
                    page: 'spam',
                    id: id
                });
            } else {
                can.route.removeAttr('id');
            }
        },
        Error: function(response) {
            this.attr('error', response.responseJSON.error);
        },
        getGridData: function() {
            var params = {
                    limit: this.attr('paginate.limit'),
                    offset: this.attr('paginate.offset')
                },
                gridData = Store.findAll(params),

                success =  can.proxy(function(data) {
                    this.attr('paginate.count', data.count);
                }, this),
                error = can.proxy(this.Error, this);

            gridData.then(success, error);

            return gridData;
        },
    });
});
