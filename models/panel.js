import map from 'can-define/map/map';
import route from 'can-route';

export default map.extend(
    'PanelModel',
    {
        seal: true
    }, {
        api: 'Object',
        title: 'string',

        id: function() {
            return route.data.attr('itemId');
        },
        route: function(id) {
            var id = id || (typeof id == "number" ? 0 : null);
        
            if(parseInt(id) > -1) {
                route.data.attr({
                    itemId: id
                }, true);
            } else {
                route.data.removeAttr('itemId');
            }
        }
    });
