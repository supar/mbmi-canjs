import component from 'can-component';
import map from 'can-define/map/map';
import list from 'can-define/list/list';
import connect from 'can-connect';
import dataUrl from 'can-connect/data/url/url';
import constructor from 'can-connect/constructor/constructor';
import parse from 'can-connect/data/parse/parse';
import baseMap from 'can-connect/can/map/map';

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
    [ constructor, dataUrl, parse, baseMap ],
    {
        Map: spam,
        List: spam.List,
        parseInstanceProp: 'data',
        url: {
            createData: 'spam',
            destroyData: 'spam/{id}',
            getData: 'spam/{id}',
            getListData: 'spams',
            updateData: "spam/{id}",
        }
    });

export default component.extend({
    tag: 'spam-panel',
    view: tpl,
    viewModel: function(attr, parentScope) {
        return new panel({
            api: spam,
            title: "Mail spams"
        });
    },
    helpers: {
        indexRound: function(opts) {
            var opts = opts || {},
                context = opts['context'] || null,
                index = 0.0;

            if(context) {
                index = context.get('index') || 0.0;
            }

            return index.toFixed(4);
        },
        isGrid: function() {
            return (this.id() == null)
        }
    }
});

