steal(
    './panel',
function(Panel) {
    return Panel.extend({
        define: {
            apiCfg: {
                value: {
                    findAll: 'GET transports',
                    findOne: 'GET transport/{id}',
                    update: 'PUT transport/{id}',
                    create: 'POST transport',
                    parseModel: function(data, xhr) {
                        return xhr ? data['data'] : data;
                    }
                }
            },
            // Panel title
            title: {
                value: "Mail transports"
            }
        },
        page: function() {
            return (this.attr('app.route.page') == 'transport')
        }
    });
});
