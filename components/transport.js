import component from 'can-component';
import map from 'can-define/map/map';
import list from 'can-define/list/list';
import connect from 'can-connect';
import dataUrl from 'can-connect/data/url/url';
import constructor from 'can-connect/constructor/constructor';
import parse from 'can-connect/data/parse/parse';
import baseMap from 'can-connect/can/map/map';

import tpl from '../views/transport.stache!';
import panel from '../models/panel';

let transport = map.extend({
    id: 'number',
    domain: 'string',
    transport: 'string',
    rootdir: 'string'
});

transport.List = list.extend({
    '#': transport
});

connect(
    [ constructor, dataUrl, parse, baseMap ],
    {
        Map: transport,
        List: transport.List,
        parseInstanceProp: 'data',
        url: {
            createData: 'transport/{id}',
            destroyData: 'transport/{id}',
            getData: 'transport/{id}',
            getListData: 'transports',
            updateData: "transport/{id}",
        }
    });

export default component.extend({
    tag: 'transport-panel',
    view: tpl,
    viewModel: function(attr, parentScope) {
        return new panel({
            api: transport,
            title: "Mail transports"
        });
    },
    helpers: {
        isGrid: function() {
            return (this.id() == null)
        },
        isForm: function() {
            return (this.id() >= 0)
        }
    }
});
