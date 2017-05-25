steal(
    '../models/auth/authenticate',
    '../views/main',
    'components/menu.js',
    'can/control',
    'can/map',
    'can/route',
    'can/view/stache',
function(Auth, mainView) {
    var App = can.Control.extend({
        authorize: null,

        // HTML elements
        bodyEl: null,
        mainEl: null,

        routeState: null,

    }, {
        init: function() {
            var app = can.Map.extend({ });

            this.routeState = new app();
            this.bodyEl = $(document.body);
            this.loginEl = $('#auth-wrap');
            this.mainEl = $('#main-wrap');

            this.initAjax();
            this.applyRoute();

            // Initialize authentication and try to get
            // authentication
            this.initAuth()
        },

        applyRoute: function() {
            can.route(':page/:id', {});
            can.route(':page', { page: 'home' });
            can.route.map(this.routeState)
            can.route.ready();
        },

        beforeSend: function(xhr) {
            var key = sessionStorage.getItem('authkey');

            if(key) {
                xhr.setRequestHeader('Authorization', 'Bearer ' + key);
            }
        },

        decodeError: function(error) {
            var error = error || [];

            switch (typeof error) {
                case "Object":
                    error = [error];
                    break;

                case "String":
                    error = [{
                        message: error
                    }];
                    break;

                default:
                    error = [{
                        message: "Unknown error"
                    }];
            }

            return error[0]['message'];
        },

        initAjax: function() {
            can.ajaxSetup({
                beforeSend: this.beforeSend
            });
        },

        initAuth: function() {
            var map = new Auth({
                authenticate: true
            });
            map.bind('valid', can.proxy(this.state, this));
            map.bind('saveStatus', can.proxy(map.doSave, map));

            this.authorize = map;
        },

        isAuthError: function(response) {
            var response = response || undefined;

            if(typeof response == 'object' && response['status'] == 401) {
                return true;
            }

            return false;
        },

        route: function(e, attr, how, newVal, oldVal) {
            if(newVal == 'logout') {
                this.authorize.newLogout();
            }
        },

        state: function(e, newValue, oldValue) {
            var body = this.bodyEl,
                login = this.loginEl,
                main = this.mainEl,
                mainEmpty = main.is(':empty'),
                loginEmpty = login.is(':empty');

            if(mainEmpty && newValue) {
                main.append(
                    mainView(this.routeState)
                );
            }
            
            if(!newValue) {
                if(loginEmpty) {
                    renderer = can.stache('<view-auth {login-data}="login" {^save-status}="saveStatus"/>');
                    login.append(renderer(this.authorize));
                }

                this.authorize.newLogin();
            }

            main[!newValue ? 'addClass' : 'removeClass']('hidden');
            login[newValue ? 'addClass' : 'removeClass']('hidden');
        },

        logout: function() {
            this.authorize.attr('valid', false);
        },

        run: function() {
            this.routeState.bind('change', can.proxy(this.route, this));
        }
    });


    return App;
});