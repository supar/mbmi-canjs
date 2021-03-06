import map from 'can-define/map/map';
import route from 'can-route';
import error from 'util/error';

let Error = function(scope) {
    return function(e) {
//!steal-remove-start
        console.error(e)
//!steal-remove-end
        this.set('error', (new error(e)).Error());
    }.bind(scope);
}

export default map.extend(
    'PanelModel',
    {
        seal: true
    }, {
        api: 'observable',
        error: 'string',
        title: 'string',

        onSuccess: function() {
            var me = this;
            return function() {
                me.route();
            }
        },

        onError: function(scope) {
            return Error(scope || this);
        },

        id: function() {
            return route.data.get('itemId');
        },
        getRouteParam: function(item) {
            if(item) {
                return route.data.get(item);
            }

            return route.data
        },
        route: function(id) {
            var id = id || (typeof id == "number" ? 0 : null);
        
            if(parseInt(id) > -1) {
                route.data.assign({
                    itemId: id
                });
            } else {
                this.assign({error: ''});
                route.data.assign({
                    itemId: undefined
                });
            }
        }
    });
