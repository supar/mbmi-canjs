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

let User = map.extend({
    id: 'number',
    name: 'string',
    login: 'string',
    password: 'string',
    domain: 'number',
    domainname: 'string',
    smtp: 'number',
    pop3: 'number',
    imap: 'number',
    sieve: 'number',
    manager: 'number'
});

User.List = list.extend({
    '#': User
});

connect(
    [ constructor, dataUrl, parse, baseMap, ajax ],
    {
        Map: User,
        List: User.List,
        parseInstanceProp: 'data',
        url: {
            createData: 'user',
            destroyData: 'user/{id}',
            getData: 'user/{id}',
            getListData: 'users',
            updateData: "user/{id}",
        },
        instance: function(data) {
            return new User();
        }
    });

// Domain transport model
let Transport = map.extend({
    id: 'number',
    domain: 'string',
});

Transport.List = list.extend({
    '#': Transport
});

connect(
    [ constructor, dataUrl, parse, baseMap, ajax ],
    {
        Map: Transport,
        List: Transport.List,
        parseInstanceProp: 'data',
        url: {
            getListData: 'transports',
        }
    });

// Extend default panel
let panelExt = panel.extend({
    search: 'string',
    transport: {
        get: function(last, setAttr) {
            var model = this;

            return Transport.getList().then(function(response) {
                setAttr(response);
            });
        }
    }
});

export default component.extend({
    tag: 'user-panel',
    view: tpl,
    viewModel: function(attr, parentScope) {
        return new panelExt({
            api: User,
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
