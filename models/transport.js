steal(
    'can/util',
    './pagination',
    'can/model',
    'can/map/define',
function(can, Paginate, Model) {
    var Store = Model.extend({
        findAll: 'GET transports',
        findOne: 'GET transport/{id}',
        update: 'PUT transport/{id}',
        create: 'POST transport',
    }, {});
    
    return can.Map.extend({
        define: {
            // Form data model
            transport: {
                Value: Store
            },
            // Panel title
            title: {
                value: "Mail transports"
            },
            id: {
                type: 'number',
                get: function() {
                    var id = this.attr('app.route.id');

                    return (this.page() && /^\d+$/.test(id)) ? 
                        id : null;
                }
            },
            paginate: {
                value: function() {
                    return new Paginate({
                        limit: 5
                    });
                }
            },
            gridData: {
                get: function(last) {
                     if(!this.page()) {
                         return null;
                     } else {
                        return this.getGridData();
                     }
                }
            },
            gridVisible: {
                type: 'boolean',
                get: function() {
                    return !(this.attr('id') != null);
                }
            }
        },
        edit: function(idx, scope) {
            var id = scope.attr('id');

            this.changeRoute(id);
        },
        page: function() {
            return (this.attr('app.route.page') == 'transport')
        },
        newItem: function() {
            this.changeRoute(0);
        },
        changeRoute: function(id) {
            var id = id || (typeof id == "number" ? 0 : null);

            if(parseInt(id) > -1) {
                can.route.attr({
                    page: 'transport',
                    id: id
                });
            } else {
                can.route.removeAttr('id');
            }
        },
        Error: function(response) {
            if(!App.isAuthError(response)) {
                this.attr('error', App.decodeError(response.responseJSON));
            } else {
                App.logout();
            }
        },
        doBack: function(reload) {
            var reload = reload || false;

            this.changeRoute();
            this.removeAttr('transport');

            if(reload) {
                this.attr('gridData', this.getGridData());
            }
        },
        reload: function() {
            this.attr('gridData', this.getGridData());
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
        getFormData: function() {
            var id = this.attr('id'),
                formData,

                success = can.proxy(function(response) {
                    var data = response.attr('data').attr();
                    
                    this.attr('transport').attr(data);

                    return response;
                }, this),
                error = can.proxy(this.Error, this);

            if(id == null) {
                return null;
            }

            // Create model
            this.attr('transport', new Store());
            // Load data and push to model
            if(id > 0) {
                formData = Store.findOne({ 
                    id: id 
                });

                formData.then(success, error);
                return formData;
            } 

            return null;
        }
    });
});
