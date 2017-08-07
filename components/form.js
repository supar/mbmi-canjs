steal(
    'can/util',
    './mask',
function(can) {
    can.Component.extend({
        tag: 'panel-form',
        template: can.stache([
            '<mask {waiting}="formData.isPending" />',
            '<div masked class="panel-body">',
            '<form class="form-horizontal" role="form"><content /></form>',
            '</div>',
        ].join('')),
        viewModel: {
            define: {
                formData: {
                    get: function(last, setAttrValue) {
                        var model = this,
                            store = model.attr('api'),
                            id = model.attr('itemId');
                        
                        if(id > 0) {
                            return store.findOne({
                                id: id
                            }, function(response) {
                                setAttrValue(response);
                            }, function(response) {
                                var err = response['message'] || 
                                    (response['responseJSON'] ? response.responseJSON['error'] : 'Unknown error');

                                err = err || 'Unknown error';
                                model.attr('error', err)
                            }); 
                        } 

                        return new store();
                    }
                }
            }
        }
    });
});

