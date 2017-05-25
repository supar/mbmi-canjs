steal(
    'can/view/stache',
function(stache, spamPanel) {
        return stache([
            '<view-navbar {page}="page" />',
            '<section class="main-content">',
                '<div class="container-fluid card-layout {{^eq page "spam"}}hidden{{/eq}}">',
                '<spam-panel></spam-panel>',
                '</div>',
                '<div class="container-fluid card-layout {{^eq page "access"}}hidden{{/eq}}">',
                '<access-panel {page}="page" {page-id}="id">', , '</access-panel>',
                '</div>',
            '</section>',
        ].join(''));
});
