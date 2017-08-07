steal(
    './panel',
function(Panel) {
    return Panel.extend({
        define: {
            apiCfg: {
                value: {
                    findAll: 'GET spam'
                }
            },
            // Panel title
            title: {
                value: "Spam stat"
            }
        },
        page: function() {
            return (this.attr('app.route.page') == 'spam')
        }
    });
});
