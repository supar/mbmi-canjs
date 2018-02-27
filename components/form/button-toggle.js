import component from 'can-component';
import stache from '~/views/form/button-toggle.stache'

export default component.extend({
    tag: 'form-button-toggle',
    leakScope: false,
    view: stache,
    viewModel: {
        text: { type: 'string', value: 'Undefined' },
        value: { type: 'boolean', value: false }
    },
    events: {
        '{element} button:not(.btn-inactive) click': function(el, ev) {
            var model = this.viewModel,
                toggle = !(model.value);

            model.assign({
                value: toggle
            });
        },
        '{viewModel} value': function(model, ev, value, old) {
            this.viewModel.dispatch('toggle', [ value, old ])
        }
    },
    helpers: {
        Toggle: function() {
            return !!this.get('value');
        }
    }
});
