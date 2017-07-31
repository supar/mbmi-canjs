steal(
    'can/component',
    'can/view/stache',
function(Component) {
    Component.extend({
        tag: 'pager',
        template: can.stache([
                '<div class="panel-footer">',
                    '<div class="row">',
                    '<div class="col-xs-12 col-sm-4 col-md-4 col-lg-4 panel-page-info">',
                        '{{paginate.entryFirst}} to {{paginate.entryNext}} of {{paginate.count}} entries',
                    '</div>',
                    '<div class="col-xs-12 col-sm-6 col-md-6 col-lg-7">',
                    '<ul class="pager">',
                        '<li class="previous {{^paginate.canPrev}}disabled{{/paginate.canPrev}}"><a href="javascript://" ($click)="paginate.prev()">&larr;</a></li>',
                        '<li>{{paginate.page}}</li>',
                    '<li class="next {{^paginate.canNext}}disabled{{/paginate.canNext}}"><a href="javascript://" ($click)="paginate.next()">&rarr;</a></li>',
                    '</ul>',
                    '</div>',
                    '<div class="col-xs-12 col-sm-2 col-md-2 col-lg-1 panel-page-limit">',
                        '<select class="form-control page-limit-control" can-value="{paginate.limit}">',
                            '{{#each paginate.limitSizes}}',
                            '<option {{#is paginate.limit .}}selected{{/is}}>{{.}}</option>',
                            '{{/each}}',
                        '</select>',
                    '</div>',
                    '</div>',
                '</div>'
            ].join('')
        )
    })
});
