import component from 'can-component';

export default component.extend({
    tag: 'form-autocomplete',
    viewModel: {
        id: 'string',
        defaultDelay: {
            type: 'number',
            value: 600
        },
        stop: 'boolean',
        value: 'string',

        // Cancel delayed action
        cancel: function() {
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
    },
    events: {
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

        '{element} input blur': function(el, e) {
            this.viewModel.cancel();
        }
    }
});
