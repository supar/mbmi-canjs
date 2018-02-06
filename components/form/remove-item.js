import component from 'can-component';
import stache from '~/views/form/remove-item.stache';

export default component.extend({
    tag: 'form-remove-item',
    leakScope: false,
    view: stache,
    viewModel: {
        isNew: { type: 'any' }
    },
    events: {
        '{element} button click': function(el, ev) {
            this.viewModel.dispatch('destroy', [ el, ev ]);
        }
    }
});
