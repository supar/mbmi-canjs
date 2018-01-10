import component from 'can-component';
import map from 'can-define/map/map';
import list from 'can-define/list/list';
import connect from 'can-connect';
import dataUrl from 'can-connect/data/url/url';
import constructor from 'can-connect/constructor/constructor';
import parse from 'can-connect/data/parse/parse';
import baseMap from 'can-connect/can/map/map';
import ajax from 'util/ajax-setup';

import tpl from '../views/alias.stache!';
import panel from '../models/panel';

// Define alias list
let Alias = map.extend({
    id: 'number',
    alias: 'string',
    recipient: 'string',
    comment: 'string'
});

Alias.List = list.extend({
    '#': Alias
});

connect(
    [ constructor, dataUrl, parse, baseMap, ajax ],
    {
        Map: Alias,
        List: Alias.List,
        parseInstanceProp: 'data',
        url: {
            getListData: 'aliases'
        }
    });

// Extend alias model to retrieve groups alias data
let Group = map.extend({
    alias: 'string'
});

Group.List = list.extend({
    '#': Group
});

connect(
    [ constructor, dataUrl, parse, baseMap, ajax ],
    {
        Map: Group,
        List: Group.List,
        parseInstanceProp: 'data',
        url: {
            getListData: 'aliases/groups'
        }
    });

// Extend default panel
let panelExt = panel.extend({
    aliasFilter: {
        Value: map
    },
    groupCount: 'number',
    groupFilter: {
        Value: map.extend({
            recipient: 'string',
            group: {
                type: 'number',
                value: 1
            }
        })
    },
    groupSelected: {
        type: 'string',
        set: function(newVal) {
            this.aliasFilter.update({
                alias: newVal,
                recipient: this.groupFilter.get('recipient')
            });

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
    search: 'string',
    title: {
        type: 'string',
        value: 'Mail box aliases'
    },
    toggle: {
        type: 'boolean',
        value: false
    },
    winwidth: 'number',
    winsmall: 'boolean',

    activeGroup: function(item) {
        this.groupSelected = item.get('alias');

        if(this.get('toggle') === true) {
            this.toggle = false;
        }
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
            api: Alias,
            group: Group
        });
    },
    events: {
        init: function() {
            this.viewModel.setWinWidth();
        },

        // Select first record when load is completed
        '{group} load': function(arg, e, response) {
            var model = this.viewModel,
                found = false,
                group = model.get('groupSelected');
                
            model.groupCount = response.length;

            if(response.length > 0) {
                if(group) {
                    response.forEach(function(item) {
                        if(item.get('alias') == group) {
                            found = true;
                            return false;
                        }
                    });
                }

                if(!found) {
                    group = response.get(0).get('alias')
                }
            }

            model.groupSelected = group;
        },

        '{viewModel} search': function(model, e, value) {
            model.groupFilter.assign({
                recipient: value
            })
        },

        '{window} resize': function() {
            this.viewModel.setWinWidth();
        }
    },

    helpers: {
        isForm: function() {
            return (this.id() >= 0)
        },
        isGrid: function() {
            return (this.id() == null)
        },
        isGroupActive: function(options) {
            var alias = options.context.get('alias');

            if(alias == this.groupSelected){
                return options.fn();
            }

            return options.inverse();
        },
        isGroupContentReady: function(options) {
            var model = this;

            if(model.get('groupCount') < 1 ||
                !model.get('groupSelected'))
            {
                return options.inverse();
            }

            return options.fn();
        },
        isViewSmall: function(options) {
            if(this.winsmall) {
                return options.fn();
            }

            return options.inverse();
        }
    }
});
