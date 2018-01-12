import component from 'can-component';
import map from 'can-define/map/map';
import list from 'can-define/list/list';
import connect from 'can-connect';
import dataUrl from 'can-connect/data/url/url';
import constructor from 'can-connect/constructor/constructor';
import parse from 'can-connect/data/parse/parse';
import baseMap from 'can-connect/can/map/map';
import ajax from 'util/ajax-setup';

import tpl from '../views/smtp-access.stache!';
import panel from '../models/panel';

let access = map.extend({
    id: 'number',
    client: 'string',
    access: 'string'
});

access.List = list.extend({
    '#': access
});

connect(
    [ constructor, dataUrl, parse, baseMap, ajax ],
    {
        Map: access,
        List: access.List,
        parseInstanceProp: 'data',
        url: {
            createData: 'access',
            destroyData: 'access/{id}',
            getData: 'access/{id}',
            getListData: 'accesses',
            updateData: "access/{id}",
        }
    });

export default component.extend({
    tag: 'access-panel',
    view: tpl,
    viewModel: function(attr, parentScope) {
        return new panel({
            api: access,
            title: "SMTP accesss",
            accesses: [
                'OK',
                'REJECT'
            ]
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

