import component from 'can-component';
import map from 'can-define/map/map';
import list from 'can-define/list/list';
import connect from 'can-connect';
import dataUrl from 'can-connect/data/url/url';
import constructor from 'can-connect/constructor/constructor';
import parse from 'can-connect/data/parse/parse';
import baseMap from 'can-connect/can/map/map';
import ajax from 'util/ajax-setup';

import tpl from '../views/spam.stache!';
import panel from '../models/panel';

let spam = map.extend({
    id: 'number',
    domain: 'string',
    spam: 'string',
    rootdir: 'string'
});

spam.List = list.extend({
    '#': spam
});

connect(
    [ constructor, dataUrl, parse, baseMap, ajax ],
    {
        Map: spam,
        List: spam.List,
        parseInstanceProp: 'data',
        url: {
            getListData: 'spam',
        }
    });

let panelExt = panel.extend({
    filter: {
        type: 'observable',
        Value: map.extend({
            sort: { type: 'string', value: 'index' }
        })
    }
});

export default component.extend({
    tag: 'spam-panel',
    view: tpl,
    viewModel: function(attr, parentScope) {
        return new panelExt({
            api: spam,
            title: "Mail spams"
        });
    },
    helpers: {
        indexRound: function(options) {
            var index = options.scope.get('index') || 0.0;

            return index.toFixed(4);
        },
        isGrid: function() {
            return (this.id() == null)
        }
    }
});

