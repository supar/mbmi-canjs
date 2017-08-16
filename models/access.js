steal(
    './panel',
function(Panel) {
    return Panel.extend({
        define: {
            apiCfg: {
                value: {
                    findAll: 'GET accesses',
                    findOne: 'GET access/{id}',
                    update: 'PUT access/{id}',
                    create: 'POST access',
                    destroy: 'DELETE access/{id}',
                    parseModel: function(data, xhr) {
                        return xhr ? data['data'] : data;
                    }
                }
            },
            access: {
                value: ['OK', 'REJECT']
            },
            // Panel title
            title: {
                value: "SMTP access restriction"
            }
        },
        page: function() {
            return (this.attr('app.route.page') == 'access')
        }
    });
});
