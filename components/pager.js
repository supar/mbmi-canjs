steal(
    'can/component',
    'can/view/stache',
function(Component) {
    Component.extend({
        tag: 'pager',
        template: can.stache([
                '<div class="panel-footer">',
                    '<div class="row">',
                    '<div class="col-xs-12 col-sm-5 col-md-5 panel-page-info">',
                        'Showing {{paginate.entryFirst}} to {{end}} of {{paginate.count}} entries',
                    '</div>',
                    '<div class="col-xs-12 col-sm-7 col-md-7">',
                    '<ul class="pager">',
                        '<li class="previous {{^paginate.canPrev}}disabled{{/paginate.canPrev}}"><a href="javascript://" ($click)="paginate.prev()">&larr;</a></li>',
                        '<li>{{paginate.page}}</li>',
                    '<li class="next {{^paginate.canNext}}disabled{{/paginate.canNext}}"><a href="javascript://" ($click)="paginate.next()">&rarr;</a></li>',
                    '</ul>',
                    '</div>',
                    '</div>',
                '</div>'
            ].join('')
        )
    })
});
