import component from 'can-component';
import map from 'can-define/map/map';
import list from 'can-define/list/list';
import connect from 'can-connect';
import dataUrl from 'can-connect/data/url/url';
import constructor from 'can-connect/constructor/constructor';
import parse from 'can-connect/data/parse/parse';
import baseMap from 'can-connect/can/map/map';

import tpl from '../views/alias.stache!';
import panel from '../models/panel';

// Define alias list
let alias = map.extend({
    id: 'number',
    alias: 'string',
    recipient: 'string',
    comment: 'string'
});

alias.List = list.extend({
    '#': alias
});

connect(
    [ constructor, dataUrl, parse, baseMap ],
    {
        Map: alias,
        List: alias.List,
        parseInstanceProp: 'data',
        url: {
            getListData: 'aliases'
        }
    });

// Define alias groups
let aliasGroup = map.extend({
    name: 'string'
});

aliasGroup.List = list.extend({
    '#': aliasGroup
});

aliasGroup.addEventListener('load', function() {
    console.log('load')
})

connect(
    [ constructor, dataUrl, parse, baseMap ],
    {
        Map: aliasGroup,
        List: aliasGroup.List,
        parseInstanceProp: 'data',
        url: {
            getListData: 'alias/groups'
        }
    });

// Extend default panel
let panelExt = panel.extend({
    aliasFilter: {
        Value: map
    },
    groups: 'observable',
    groupSelected: {
        type: 'observable',
        set: function(newVal) {
            var name;
            
            if(newVal && (name = newVal.get('name'))) {
                this.aliasFilter.update({
                    alias: name
                });
            }

            return newVal
        }
    },
    listView: {
        type: 'boolean',
        value: true
    },
    pagination: {
        type: 'boolean',
        value: false
    },
    toggle: {
        type: 'boolean',
        value: false
    },
    winwidth: 'number',
    winsmall: 'boolean',

    activeGroup: function(item) {
        this.groupSelected = item;
    },

    doToggle: function() {
        this.toggle = !this.toggle;
    },

    setWinWidth: function() {
        this.winwidth = $(window).width();
        this.winsmall = !(this.winwidth > 767);

        if(!this.winsmall && this.toggle) {
            this.doToggle();
        } 
    }
});

export default component.extend({
    tag: 'alias-panel',
    view: tpl,
    viewModel: function(attr, parentScope) {
        return new panelExt({
            api: alias,
            groups: aliasGroup,
            title: "Mail box aliases"
        });
    },
    events: {
        init: function() {
            this.viewModel.setWinWidth();
        },

        // Select first record when load is completed
        '{groups} load': function(arg, e, response) {
            var group = undefined;

            if(response.length > 0) {
                group = response.get(0)
            }

            this.viewModel.assign({
                groupSelected: group
            });
        },

        '{window} resize': function() {
            this.viewModel.setWinWidth();
        }
    },

    helpers: {
        isGrid: function() {
            return (this.id() == null)
        },
        isForm: function() {
            return (this.id() >= 0)
        },
        isViewSmall: function(options) {
            if(this.winsmall) {
                return options.fn();
            }

            return options.inverse();
        },
        isGroupActive: function(options) {
            if(options.context == this.groupSelected){
                return options.fn();
            }

            return options.inverse();
        }
    }
});
