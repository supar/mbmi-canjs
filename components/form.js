import component from 'can-component';
import map from 'can-define/map/map';
import tpl from '../views/form.stache!';

let model = map.extend({
    formData: {
        get: function(promise, setAttr) {
            var model = this.get('panel'),
                store = model.get('api'),
                id = model.get('id'),
                onError = model.get('onError');


            if(id() > 0) {
                if(typeof onError != 'function') {
                    onError = function() {};
                }

                return store.get({id: id()}).
                    then(setAttr, onError(model));
            }

            return new store({});
        }
    }
});

export default component.extend({
    tag: 'panel-form',
    view: tpl,
    ViewModel: model,
    events: {
        '{viewModel} modify': function(caller, e, data) {
            var model = this.viewModel;

            if(typeof data == 'object' && model.formData) {
                model.formData.assign(data)
            }
        }
    }
});
