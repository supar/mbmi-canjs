steal(
    './mask',
    'can/util',
    'can/component',
    'can/map/define',
    'can/view/stache',
function() {
    can.Component.extend({
        tag: 'panel-grid',
        template: can.stache([
            '<panel-mask {waiting}="gridData.isPending" />',
            '<div masked>',
                '<table class="table table-data table-responsive-condense"><content/></table>',
                '{{#if pagination}}',
                '<div class="panel-footer">',
                    '<div class="row">',
                    '<div class="col-xs-12 col-sm-4 col-md-4 col-lg-4 panel-page-info">',
                        '{{entryFirst}} to {{entryNext}} of {{count}} entries',
                    '</div>',
                    '<div class="col-xs-12 col-sm-6 col-md-6 col-lg-7">',
                    '<ul class="pager">',
                        '<li class="previous {{^canPrev}}disabled{{/canPrev}}"><a href="javascript://" ($click)="prev()">&larr;</a></li>',
                        '<li>{{page}}</li>',
                    '<li class="next {{^canNext}}disabled{{/canNext}}"><a href="javascript://" ($click)="next()">&rarr;</a></li>',
                    '</ul>',
                    '</div>',
                    '<div class="col-xs-12 col-sm-2 col-md-2 col-lg-1 panel-page-limit">',
                        '<select class="form-control page-limit-control" can-value="{limit}">',
                            '{{#each limitSizes}}',
                            '<option {{#is limit .}}selected{{/is}}>{{.}}</option>',
                            '{{/each}}',
                        '</select>',
                    '</div>',
                    '</div>',
                '</div>',
                '{{/if pagination}}',
            '</div>'
        ].join('')),
        viewModel: {
            define: {
                // grid content
                gridData: {
                    get: function() {
                        var model = this,
                            store = model.attr('api'),
                            pages = model.attr('pagination') || false,
                            filter = model.attr('filter') || null,
                            params = pages ? {
                                limit: model.attr('limit'),
                                offset: model.attr('offset')
                            } : {};

                        if(typeof filter == "object") {
                            params = $.extend(params, filter.attr());
                        }

                        return store.findAll(params);
                    }
                },
                items: {
                    get: function(last, setAttrValue) {
                        var model = this,
                            gridData = model.attr('gridData'),
                            pages = model.attr('pagination') || false;

                        gridData.then(function(response) {
                            if(pages) {
                                model.attr('count', response.count);
                            }
                            setAttrValue(response)
                        }, function(response) {
                            var err = response['message'] || 
                                (response['responseJSON'] ? response.responseJSON['error'] : 'Unknown error');

                            err = err || 'Unknown error';
                            model.attr('error', err);
                        });
                    }
                },
                // Pagination
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
                limitSizes: {
                    value: [
                        10, 50, 100, 500
                    ]
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
                        return Math.floor(this.attr('offset') / this.attr('limit')) + 1;
                    },
                    set: function(newVal) {
                        this.attr('offset', (parseInt(newVal, 10) - 1) * this.attr('limit'));
                    }
                }
            },
            prev: function() {
                this.attr('offset', this.offset - this.limit);
            },
            next: function() {
                if(this.canNext()) {
                    this.attr('offset', this.offset + this.limit);
                }
            },
            canPrev: function() {
                return this.attr('offset') > 0;
            },
            canNext: function() {
                return this.attr('offset') < this.attr('count') - this.attr('limit');
            },
            entryFirst: function() {
                return (this.attr('offset') + 1)
            },
            entryNext: function() {
                var next = this.attr('offset') + this.attr('limit')
                return next > this.attr('count') ? this.attr('count') : next;
            }
        }
    });
})
