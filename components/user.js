import component from 'can-component';
import map from 'can-define/map/map';
import list from 'can-define/list/list';
import connect from 'can-connect';
import dataUrl from 'can-connect/data/url/url';
import constructor from 'can-connect/constructor/constructor';
import parse from 'can-connect/data/parse/parse';
import baseMap from 'can-connect/can/map/map';
import ajax from 'util/ajax-setup';

import tpl from '../views/user.stache!';
import panel from '../models/panel';

let user = map.extend({
    id: 'number',
    login: 'string',
    domainname: 'string',
    smtp: 'number',
    pop3: 'number',
    imap: 'number',
    sieve: 'number',
    manager: 'number'
});

user.List = list.extend({
    '#': user
});

connect(
    [ constructor, dataUrl, parse, baseMap, ajax ],
    {
        Map: user,
        List: user.List,
        parseInstanceProp: 'data',
        url: {
            createData: 'user',
            destroyData: 'user/{id}',
            getData: 'user/{id}',
            getListData: 'users',
            updateData: "user/{id}",
        }
    });

// Extend default panel
let panelExt = panel.extend({
    search: 'string',
});

export default component.extend({
    tag: 'user-panel',
    view: tpl,
    viewModel: function(attr, parentScope) {
        return new panelExt({
            api: user,
            title: "User mail box"
        });
    },
    helpers: {
        fullLogin: function(options) {
            var login = options.scope.get('login') || '',
                domain = options.scope.get('domainname') || '';

            return (login && domain) ? login + '@' + domain : '';
        },
        isGrid: function() {
            return (this.id() == null)
        },
        isForm: function() {
            return (this.id() >= 0)
        }
    }
});
