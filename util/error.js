import construct from 'can-construct';

export default construct.extend({
    names: {
        error: 'server',
        responseJSON: 'server',
        responseText: 'text',
        statusText: 'text'
    },
    
    code: 520,

    message: 'Unknown error',

    init: function(response) {
        var me = this;

        if(!response) {
            return
        }

        if(typeof response == 'string') {
            this.message = response;
        }

        if(typeof response != 'object') {
            return;
        }

        try {
            for(var name in me.names) {
                if(name in response && response[name]) {
                    me[me.names[name]](response[name], response);

                    break;
                }
            }
        }
        catch(err) {
            this.message = err.message;
        }
    }, 

    server: function(data, response) {
        var me = this,
            errorMsg = data['error'] || {},
            names = ['code', 'message'];

        for(var i = 0; i < names.length; i++) {
            var name = names[i];

            if(name in errorMsg && name in me) {
                me[name] = errorMsg[name];
            }
        }
    },

    text: function(data, response) {
        var response = response || {},
            dataJSON;

        try {
            dataJSON = $.parseJSON(data);
            this.server(dataJSON);
        }
        catch(e) {
            this.message = data;

            if(response['status']) {
                this.code = response.status;
            }
        }
    },

    Code: function() {
        return this.code;
    },

    Error: function() {
        return this.message;
    }
});
