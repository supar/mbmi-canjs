steal(
    'can/util',
    'can/model',
    'can/map/define',
function(can, Paginate, Model) {
    var Store = Model.extend({
        findAll: 'GET accesses',
        findOne: 'GET accesses/{id}',
        update: 'PATCH accesses/{id}',
        create: 'POST accesses',
    }, {});
    
    return can.Map.extend({
        define: {
            // Form data model
            access: {
                Value: Store
            },
            // Panel title
            title: {
                value: "Access"
            },
            id: {
                type: 'number',
                get: function() {
                    var page = this.attr('page'),
                        id = this.attr('pageId');

                    if(page == 'access' && /^\d+$/.test(id)) {
                        // Reset error
                        this.removeAttr('error');

                        return id;
                    }

                    return null;
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
                    return this.attr('id') != null ? false : true;
                }
            },
            panelActive: {
                type: 'boolean',
                get: function() {
                    return !!(this.attr('page') == 'access');
                }
            }
        },
        edit: function(idx, scope) {
            var id = scope.attr('id');

            this.changeRoute(id);
        },
        newItem: function() {
            this.changeRoute(0);
        },
        changeRoute: function(id) {
            var id = id || (typeof id == "number" ? 0 : null);

            if(parseInt(id) > -1) {
                can.route.attr({
                    page: 'access',
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
            this.removeAttr('access');

            if(reload) {
                this.attr('gridData', this.getGridData());
            }
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
                    
                    this.attr('access').attr(data);

                    return response;
                }, this),
                error = can.proxy(this.Error, this);

            if(id == null) {
                return null;
            }

            // Create model
            this.attr('access', new Store());
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

