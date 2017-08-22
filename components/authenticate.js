import Component from 'can/component/component';

export default Component.extend({
    tag: 'view-auth',
    template: can.stache([
        '<div class="panel-login">',
        '<div class="panel-login-body">',
        '<form role="form" ($submit)="send">',
        '<h2 class="form-signin-heading">{{title}}</h2>',
            '{{#if error}}',
                '<div class="panel-body">',
                    '<div class="alert alert-danger e" role="alert">',
                        '{{error}}',
                    '</div>',
                '</div>',
            '{{/if}}',
            '<div class="login-wrap">',
            '<div class="form-group">',
                '<label for="inputEmail3" class="control-label">Email</label>',
                '<input type="email" class="form-control" placeholder="Email" can-value="loginData.email">',
            '</div>',
            '<div class="form-group">',
                '<label for="inputPassword3" class="control-label">Пароль</label>',
                '<input type="password" class="form-control" placeholder="Password" can-value="loginData.password">',
            '</div>',
            '<div class="form-group">',
                '<button type="submit" class="btn btn-lg btn-primary btn-block">{{btnName}}</button>',
            '</div>',
            '</div>',
        '</form>',
        '</div>',
        '</div>'
    ].join('')),
    viewModel: {
        title: 'Please sign in',
        btnName: 'Sign in',
        send: function() {
            var login = this.attr('loginData');
            
            if(login) {
                this.attr('saveStatus', login.save());
            } 

            return false
        }
    }
});
