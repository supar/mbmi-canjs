import component from 'can-component';
import map from 'can-define/map/map';
import tpl from '../views/grid.stache!';

let model = map.extend({
        // grid content
        gridData: {
            get: function(last, setAttr) {
                var model = this,
                    store = model.get('api'),
                    pages = model.get('pagination') || false,
                    filter = model.get('filter') || null,
                    params = pages ? {
                        limit: model.get('limit'),
                        offset: model.get('offset')
                    } : {};
        
                if(filter && typeof filter == "object") {
                    params = $.extend(params, filter.get());
                }

                return store.getList(params).then(function(response) {
                    if(pages) {
                        model.assign({
                            count: response.count
                        });
                    }
                    setAttr(response);
                });
            }
        },
        // Don't use table tags
        // by default false
        listView: {
            type: 'boolean',
            value: false
        },
        // Show pagination panel
        pagination: {
            type: 'boolean',
            value: true
        }, 
        count: {
            value: Infinity,
            count: function(newValue) {
                return newValue < 0 ? 0 : newValue;
            }
        },
        limit: {
            type: 'number',
            value: 50
        },
        offset: {
            type: 'number',
            value: 0,
            set: function(newValue) {
                return newValue < 0 ? 
                    0 : 
                    Math.min(newValue, !isNaN(this.count - 1) ? 
                        this.count - 1 :
                        Infinity);
            }
        },
        page: {
            type: 'number',
            get: function() {
                return Math.floor(this.get('offset') / this.get('limit')) + 1;
            },
            set: function(newVal) {
                this.assign({
                    offset: (parseInt(newVal, 10) - 1) * this.get('limit')
                });
            }
        },
        limitSizes: function() {
            return [
                10, 50, 100, 500
            ];
        },
        prev: function() {
            this.assign({
                offset: this.offset - this.limit
            });
        },
        next: function() {
            if(this.canNext()) {
                this.assign({
                    offset: this.offset + this.limit
                });
            }
        },
        canPrev: function() {
            return this.get('offset') > 0;
        },
        canNext: function() {
            return this.get('offset') < this.get('count') - this.get('limit');
        },
        entryFirst: function() {
            return (this.get('offset') + 1)
        },
        entryNext: function() {
            var next = this.get('offset') + this.get('limit')
            return next > this.get('count') ? this.get('count') : next;
        }
});

export default component.extend({
    tag: 'panel-grid',
    view: tpl,
    ViewModel: model
});
