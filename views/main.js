steal(
    'can/view/stache',
function(stache, spamPanel) {
        return stache([
            '<view-navbar />',
            '<section class="main-content">',
                '<div class="container-fluid card-layout {{^eq route.page "transport"}}hidden{{/eq}}">',
                '<transport-panel />',
                '</div>',
                '<div class="container-fluid card-layout {{^eq route.page "spam"}}hidden{{/eq}}">',
                '<spam-panel />',
                '</div>',
                '<div class="container-fluid card-layout {{^eq route.page "access"}}hidden{{/eq}}">',
                '<access-panel {page}="page" {page-id}="id">', , '</access-panel>',
                '</div>',
            '</section>',
        ].join(''));
});
