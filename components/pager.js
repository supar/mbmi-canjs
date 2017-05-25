steal(
    'can/component',
    'can/view/stache',
function(Component) {
    Component.extend({
        tag: 'pager',
        template: can.stache([
                '<div class="panel-footer">',
                '<ul class="pager">',
                '<li class="previous {{^paginate.canPrev}}disabled{{/paginate.canPrev}}"><a href="javascript://" ($click)="paginate.prev()">&larr; Back</a></li>',
                '<li>{{paginate.page}}</li>',
                '<li class="next {{^paginate.canNext}}disabled{{/paginate.canNext}}"><a href="javascript://" ($click)="paginate.next()">Next &rarr;</a></li>',
                '</ul>',
                '</div>'].join('')
        )
    })
});
