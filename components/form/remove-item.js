import component from 'can-component';
import stache from '~/views/form/remove-item.stache';

export default component.extend({
    tag: 'form-remove-item',
    leakScope: false,
    view: stache,
    viewModel: {
        showConfirm: { type: 'boolean' }
    },
    events: {
        '{element} button[remove-item] click': function(el, ev) {
            var model = this.viewModel;

            if(model.showConfirm) {
                return
            }

            model.showConfirm = true;
        },
        '{element} button[confirm-dissmis] click': function(el, ev) {
            this.viewModel.assign({
                showConfirm: false
            })
        },
        '{element} button[confirm-remove] click': function(el, ev) {
            this.viewModel.assign({
                showConfirm: false
            })

            this.viewModel.dispatch('destroy', [ el, ev ]);
        },
        '{viewModel} showConfirm': function(scope, ev, value) {
            var modal = $(this.element.querySelector('div.modal'));

            if(value === true) {
                modal.modal({
                    keyboard: false
                });
            } else {
                modal.modal('hide')
            }
        },
        '{window} keyup': function(el, ev) {
            if(ev.key == 'Escape') {
                this.viewModel.assign({
                    showConfirm: false
                })
            }
        }
    },
    helpers: {
        Confirm: function(options) {
            var mode = this.get('data-toggle');

            if(mode == 'modal') {
                return options.fn(this)
            }
        }
    }
});
