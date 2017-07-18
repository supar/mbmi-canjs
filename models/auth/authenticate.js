steal(
    'can/util',
    'can/model',
    'can/map/define',
function(can, Model) {
    var Store = Model.extend({
        findOne: 'GET user/me',
        create: 'PUT login',
        destroy: 'DELETE logout'
    }, {});

    return can.Map.extend({
        define: {
            authenticate: {
                type: 'bool',
                Value: false,
                set: function(newValue) {
                    // Retrieve manager
                    this.getManager();

                    return false;
                }
            },
            login: {
                Value: Store
            }
        },
        doSave: function(last, state) {
            var success = can.proxy(this.Success, this),
                error = can.proxy(this.Error, this);

            if(state && state.state() === 'pending') {
                state.then(success, error);
            }
        },
        Error: function(response) {
            if(response['responseJSON'] && response.responseJSON['error']) {
                this.attr('error', response.responseJSON.error);
            }

            if(App.isAuthError(response) && this.attr('valid')) {
                this.attr('valid', false);
            }
        },
        Success: function(response) {
            var key;

            if(!(key = response.attr('data.jwt'))) {
                this.attr('error', 'Invalid auth token');
                this.attr('valid', false);

                return
            }

            sessionStorage.setItem('authkey', key);

            this.removeAttr('error');
            this.attr('valid', true);

            if(can.route.attr('page') == 'logout'){
                can.route.attr({ page: 'home' });
            }
        },
        getManager: function() {
            var man = Store.findOne(),

                success =  can.proxy(function(map) {
                    var man = map.attr('data');

                    if(man && man['id']) {
                        this.attr('valid', true);
                        this.attr('manager', man);
                    }
                }, this),
                error = can.proxy(function() {
                    this.attr('valid', false);
                }, this);

            man.then(success, error);

            return man;
        },
        newLogin: function() {
            this.attr('login', new Store()); 
        },
        newLogout: function() {
            var man = this.attr('manager'),
                model = new Store({
                    id: man ? man.attr('id') : 0,
                    login: man ? man.attr('login') : ''
                });

            this.attr('saveStatus', model.destroy())
        }
    });
});
