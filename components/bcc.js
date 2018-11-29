import component from 'can-component';
import map from 'can-define/map/map';
import list from 'can-define/list/list';
import connect from 'can-connect';
import dataUrl from 'can-connect/data/url/url';
import constructor from 'can-connect/constructor/constructor';
import parse from 'can-connect/data/parse/parse';
import baseMap from 'can-connect/can/map/map';
import ajax from 'util/ajax-setup';

import tpl from '../views/bcc.stache!';
import panel from '../models/panel';

let Bcc = map.extend({
    id: 'number',
    sender: 'string',
    recipient: 'string',
    copy: 'string',
    comment: 'string',
    mode: {
        type: 'string',
        serialize: false,
        get: function(lastValue) {
            if(!lastValue) {
                if(this.sender) {
                    return 'sender';
                }
                return 'recipient';
            }
            return lastValue;
        },
        set: function(field) {
            if(field == 'sender') {
                this.sender = this.recipient;
                this.recipient = '';
            } else {
                this.recipient = this.sender;
                this.sender = '';
            }

            return field;
        }
    },
    fromValue: {
        serialize: false,
        get: function() {
            return this.mode == 'sender' ? this.sender : this.recipient;
        },
        set: function(value) {
            if(this.mode == 'sender') {
                this.sender = value;
            } else {
                this.recipient = value;
            }
            return value;
        }
    },
});

Bcc.List = list.extend({
    '#': Bcc
});

connect(
    [ constructor, dataUrl, parse, baseMap, ajax ],
    {
        Map: Bcc,
        List: Bcc.List,
        parseInstanceProp: 'data',
        url: {
            createData: 'bcc',
            destroyData: 'bcc/{id}',
            getData: 'bcc/{id}',
            getListData: 'bccs',
            updateData: "bcc/{id}"
        }
    });

// Extend alias model to retrieve alias and mailboxes in the system
// Remove parse and baseMap helpers. Use own instance function
let Complete = connect(
    [ constructor, dataUrl, ajax ],
    {
        instance: function(data) {
            return data
        },
        url: {
            getListData: 'aliases/search'
        }
    });

// Extend default panel
let panelExt = panel.extend({
    search: 'string',
    form: 'observable',
    bccFilter: {
        get: function() {
            return {
                query: this.search
            };
        }
    },
    // @param prop   Property name to change
    // @param scope  Form model scope
    // @param args   Event arguments
    setValue: function(prop, scope, args) {
        var data = {};

        // Get new value from the second key
        data[prop] = args[1];
        scope.assign(data);
    },
});

export default component.extend({
    tag: 'bcc-panel',
    view: tpl,
    viewModel: function(attr, parentScope) {
        return new panelExt({
            api: Bcc,
            complete: Complete,
            title: "Blind carbon copy"
        });
    },
    helpers: {
        isGrid: function() {
            return (this.id() == null)
        },
        isForm: function() {
            return (this.id() >= 0)
        },
        isList: function(mode, options) {
            var flt = this.getListMode();

            if (mode == flt) {
                return options.fn();
            }

            return options.inverse();
        }
    }
});
