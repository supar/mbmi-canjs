import component from 'can-component';
import assign from 'can-assign';
import stache from '~/views/form/autocomplete.stache'

export default component.extend({
    tag: 'form-autocomplete',
    leakScope: false,
    view: stache,
    viewModel: {
        id: 'string',
        defaultDelay: {
            type: 'number',
            value: 600
        },
        dropdown: '*',
        toggle: '*',
        focus: {
            type: 'boolean',
            value: false
        },
        open: {
            type: 'boolean',
            value: false
        },

        stop: 'boolean',
        value: 'string',

        maxListHeight: {
            type: 'string',
            value: 'auto'
        },

        // Cancel delayed action
        cancel: function() {
            this.focus = false;
            this.stop = true;
            this.delay();
            this.stop = false;
        },

        // Change delayed task timeout
        delay: function(val, ms) {
            var me = this,
                ms = ms || this.get('defaultDelay'),
                id = this.get('id'),
                stop = this.get('stop') || false,
                val = val || '';

            if(id) {
                clearTimeout(id);
            }

            if(stop) {
                return;
            }

            this.id = setTimeout(function() {
                me.value = val;
                me.stop = false;
            }, ms)
        },

        data: {
            get: function(last, setAttr) {
                var model = this,
                    store = model.get('api') || null,
                    filter = model.get('filter') || null,
                    focus = model.get('focus') || false,
                    params = {
                        query: model.get('value')
                    };

                // No action if input is not focused
                // Don't remove null
                if(!focus) {
                    return;
                }

                if(filter && typeof filter == "object") {
                    params = $.extend(params, filter.get());
                }

                return store.getList(params).then(function(response) {
                    setAttr(response);
                });
            }
        },

        select: function(item) {
            this.assign({value: item})
        },

        updateListHeight: function() {
            var win = $(window),
                offset = this.toggle.offset();

            assign(offset, {
                height: this.toggle.height()
            });

            this.assign({
                maxListHeight: (win.height() - (offset.top + offset.height)) - 20 + 'px'
            })
        }
    },
    events: {
        'inserted': function() {
            var me = this,
                model = me.viewModel;

            model.assign({
                dropdown: $(me.element.querySelector('.dropdown-menu')),
                toggle: $(me.element.querySelector('[data-toggle=dropdown]'))
            });

            $(me.element).find('.dropdown').on('show.bs.dropdown', function() {
                model.assign({open: true})
            })
            $(me.element).find('.dropdown').on('hidden.bs.dropdown', function() {
                model.assign({open: false})
            })
        },
        '{element} input keyup': function(el, e) {
            var value = el.value;

            switch(e.key) {
                case 'Shift':
                case 'Control':
                case 'Alt':
                case 'Meta':
                    break;

                case 'Escape':
                    el.blur();

                    break;

                case 'Enter':
                    this.viewModel.delay(value, 1);

                    break;

                default:
                    this.viewModel.delay(value);
            }
        },

        '{element} input focus': function(el, e) {
            this.viewModel.assign({ focus: true });
        },

        '{element} input blur': function(el, e) {
            this.viewModel.cancel();
        },

        '{viewModel} open': function() {
            this.viewModel.updateListHeight()
        },
        '{window} resize': function() {
            this.viewModel.updateListHeight()
        }
    },
    helpers: {
        dropDown: function(options) {
            if(this.get('api')) {
                return options.fn(this.get('data'))
            }

            return options.inverse()
        }
    }
});
