import fixture from 'can-fixture';

    var loginData =  [
            { id: 1, name: "Менеджер 1", login: "some_1", domain: 1, domainname: "domain.com", password: "123", smtp: 1, pop3: 0, imap: 1, sieve: 0, manager: 0 },
            { id: 2, name: "Менеджер 2", login: "some_2", domain: 1, domainname: "domain.com", password: "123", smtp: 1, pop3: 0, imap: 1, sieve: 0, manager: 0 },
            { id: 3, name: "Менеджер 3", login: "some_3", domain: 1, domainname: "domain.com", password: "123", smtp: 1, pop3: 0, imap: 1, sieve: 1, manager: 1 },
        ],

        accessData = [
                { id: 1, client: "103.31.232.92", access: "REJECT", created: "2015-10-29 10:42:23" },
                { id: 2, client: "113.176.82.181", access: "REJECT", created: "2016-01-15 10:50:31" },
                { id: 3, client: "113.246.54.104", access: "REJECT", created: "2015-10-29 10:42:10" },
                { id: 4, client: "176.192.99.178", access: "OK", created: "2016-01-14 12:12:35" },
                { id: 5, client: "42.118.167.35", access: "REJECT", created: "2016-01-17 10:11:37" },
                { id: 6, client: "62.117.107.106", access: "OK", created: "2016-01-14 11:55:42" },
                { id: 7, client: "alshamil.net.ae", access: "REJECT", created: "2015-10-29 10:41:56" },
                { id: 8, client: "lanbilling.ru", access: "OK", created: "2016-01-14 11:51:45" },
                { id: 9, client: "mx.14mos-seminar.ru", access: "REJECT", created: "2015-10-19 10:26:06" },
                { id: 10, client: "mx.seminar5inst.ru", access: "REJECT", created: "2015-10-19 10:27:10" }
        ],

        spamData = [
                { client: "193.200.211.254", ip: "193.200.211.254", from: "rea@vit-net.ru", attempt: 1, index: 0.024690087971667385 },
                { client: "cannibalk1@gmail.com", ip: "88.250.181.166", from: "cannibalk1@gmail.com", attempt: 1, index: 0.024690087971667385 },
                { client: "105.225.155.9", ip: "105.225.155.9", from: "pottierh0032@googlemail.com", attempt: 1, index: 0.024690087971667385 },
                { client: "yjmosmd@bizneroa.co.ua", ip: "85.25.13.120", from: "yjmosmd@bizneroa.co.ua", attempt: 1, index: 0.024690087971667385 },
                { client: "bogdanov.209@mail.ru", ip: "114.38.27.184", from: "bogdanov.209@mail.ru", attempt: 1, index: 0.024690087971667385 },
                { client: "wgrovsflieukvoy@narod.ru", ip: "31.24.30.98", from: "wgrovsflieukvoy@narod.ru", attempt: 1, index: 0.024690087971667385 },
                { client: "112.158.228.51", ip: "112.158.228.51", from: "info@bucci.org", attempt: 1, index: 0.024690087971667385 },
                { client: "ykdownp@holihik.co.ua", ip: "217.172.177.226", from: "ykdownp@holihik.co.ua", attempt: 1, index: 0.024690087971667385 },
                { client: "malololopez@aol.com", ip: "178.207.161.114", from: "malololopez@aol.com", attempt: 1, index: 0.024690087971667385 },
                { client: "5.141.219.117", ip: "5.141.219.117", from: "unbendingo076@list.ru", attempt: 1, index: 0.024690087971667385 }
        ],

        transportData = [
            { id: "1", domain: "domain.com", transport: "virtual", rootdir: "/var/mail" },
            { id: "2", domain: "example.com", transport: "virtual", rootdir: "/var/mail" }
        ],
        
        aliasData = [
            {id: 1, alias: "a_group@domain.com", recipient: "some_1@domain.com", comment: "Any text 1" },
            {id: 2, alias: "a_group@domain.com", recipient: "some_2@domain.com", comment: "Any text 2" },
            {id: 3, alias: "b_group@domain.com", recipient: "some_1@domain.com", comment: "Any text 3" },
            {id: 4, alias: "b_group@domain.com", recipient: "some_3@domain.com", comment: "Any text 4" },
            {id: 5, alias: "f_group@domain.com", recipient: "any_1@extenal.com", comment: "Any text ext-text" },
            {id: 6, alias: "f_group@domain.com", recipient: "any_2@extenal.com", comment: "Any text ext-text" },
            {id: 7, alias: "f_group@domain.com", recipient: "any_3@extenal.com", comment: "Any text ext-text" },
            {id: 8, alias: "f_group@domain.com", recipient: "any_4@extenal.com", comment: "Any text ext-text" },
            {id: 9, alias: "d_long_group@data.domain.com", recipient: "fuzzy@intenet.com", comment: "Long text here and there" },
            {id: 10, alias: "d_long_group@data.domain.com", recipient: "zxy@intenet.com", comment: "Any text here and there" },
            {id: 11, alias: "team_a@domain.com", recipient: "a_group@intenet.com", comment: "Team A" },
            {id: 12, alias: "team_b@domain.com", recipient: "b_group@intenet.com", comment: "Team B" },
            {id: 13, alias: "team_cb@domain.com", recipient: "c_group@intenet.com", comment: "Team C" },
            {id: 14, alias: "flash@local.local", recipient: "iron@intenet.internet", comment: "" },
            {id: 14, alias: "insta@local.local", recipient: "pre@intenet.internet", comment: "" },
            {id: 14, alias: "bro@local.local", recipient: "brew@intenet.internet", comment: "" },
        ],
    
        serviceStatData = [
            {"uid":1,"service":"imap","ip":"","updated":"2018-11-16T12:17:09+03:00","attempt":1},
            {"uid":2,"service":"imap","ip":"10.0.0.1","updated":"2017-10-10 11:10:00","attempt":12}
        ],
    
        bccData = [
            {id: 1, sender: "", recipient: "some_4@domain.com", copy: "foo@domain.com"}
        ];


    function Authorize(request) {
        var authkey = sessionStorage.getItem('authkey'),
            authHeader = request.headers['Authorization'] || '';

        if(String(authHeader).substr(7) === authkey) {
            for(var i in loginData) {
                if(JWTKEY(loginData[i].id) == authkey) {
                    return loginData[i];
                }
            }
        }

        return false;
    }

    function JWTKEY(suffix) {
        if(suffix == '') {
            return;
        }

        return 'JWT-KEY-' + suffix;
    }

    function AuthError(msg) {
        return new RespError(msg || 'Unauthorized', 401);
    }

    function RespError(msg, code) {
        var code = code || 500;

        this.message = msg || 'Unknown error';
        this.code = code;
        this.name = 'RespError';
    }

    function getCookie(name) {
        var name = name || '',
            matches = document.cookie.match(new RegExp(
                "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
            ));
        return matches ? decodeURIComponent(matches[1]) : undefined;
    }

    function setCookie(name, value, options) {
        var options = options || {},
            expires = options.expires;

        if (typeof expires == "number" && expires) {
            var d = new Date();
            d.setTime(d.getTime() + expires * 1000);
            expires = options.expires = d;
        }
        if (expires && expires.toUTCString) {
            options.expires = expires.toUTCString();
        }

        value = encodeURIComponent(value);

        var updatedCookie = name + "=" + value;

        for (var propName in options) {
            updatedCookie += "; " + propName;
            var propValue = options[propName];
            if (propValue !== true) {
                updatedCookie += "=" + propValue;
            }
        }

        document.cookie = updatedCookie;
    }

function Aliases(request, response) {
    var group = !!(request.data['groups']) || false,
        start = request.data['offset'] || 0,
        end = start + (request.data['limit'] || aliasData.length),
        alias = request.data['alias'] || '',
        recipient = request.data['recipient'] || null,
        id = request.data['id'] || null,
        items = [],
        groupCache = [];

    if(recipient) {
        recipient = new RegExp('^' + recipient);
    }

    for(var i in aliasData) {
        if(id) {
            if(id != aliasData[i].id) {
                continue;
            }
        } else {
            if(!group && aliasData[i].alias != alias) {
                continue;
            }
            if(recipient && !recipient.test(aliasData[i].recipient)) {
                continue;
            }

            if(group) {
                if(groupCache.indexOf(aliasData[i].alias) > -1) {
                    continue;
                }

                groupCache.push(aliasData[i].alias);
            }
        }

        items.push(aliasData[i]);
    }

    if(id) {
        if(items.length == 1) {
            response(200, {
                success: true,
                data: items[0]
            });
        } else {
            response(404, {
                success: false,
                error: 'Unknown item'
            });
        }
    } else {
        response(200, {
            count: items.length,
            data: items.slice(start, end)
        });
    }
};

fixture({
    'GET users': function(request, response) {
        var auth = Authorize(request),
            items = [],
            mode = request.data.mode || 'all',
            start = request.data['offset'] || 0,
            end = start + (request.data['limit'] || loginData.length),

            flt = function(v) {
                switch(mode) {
                    case 'all': return true;
                    case 'on': return (v.smtp || v.imap || v.pop3);
                    case 'off': return (!v.smtp && !v.imap && !v.pop3);
                }

                return false;
            };

        try {
            if(auth == false) {
                throw new AuthError();
            }

            items = loginData.filter(flt);

            response(200, {
                count: items.length,
                data: items.slice(start, end)
            });
        } catch(err) {
            response(err.code, {
                error: err.message
            });
        }
    },
    'GET user/{id}': function(request, response) {
        var auth = Authorize(request),
            id = request.data.id,
            flt = function() {},
            data = null;

        try {
            if(auth == false) {
                throw new AuthError();
            }

            if(id == 'me') {
                data = auth;
            }
            else if(parseInt(id) > 0) {
                flt = function(v) {
                    return v.id == id
                }

                data = loginData.find(flt);
            } else {
                throw new RespError('Unknown item');
            }

            if(data == null) {
                throw new AuthError()
            }
        } catch(err) {
            response(err.code, {
                error: err.message
            });

            return;
        }

        response(200, {
            success: true,
            data: data
        });
    },
    'PUT user/{id}': function(request, response) {
        var auth = Authorize(request),
            data = request.data,
            done = false,
            domain;

        try {
            if(!auth) {
                throw new AuthError();
            }

            if(!data['id']) {
                throw new RespError('Unknown item');
            }

            if(!data['login']) {
                throw new RespError('Empty email login value');
            }

            if(!data['domain']) {
                throw new RespError('Empty email domain value');
            }

            domain = transportData.find(function(v) {
                return (v.id == data.domain);
            });

            if(!domain) {
                throw new RespError('Unknown domain');
            }

            data.domainname = domain.domain

            for(var i in loginData) {
                if(loginData[i].id == data.id) {
                    $.extend(loginData[i], data);

                    done = true;
                    break;
                }
            }

            if(!done) {
                throw new Error('Unknown item');
            }
        } catch(err) {
            response(err.code, {
                success: false,
                error: err.message
            });

            return;
        }

        response(200, {
            success: true,
            data: data
        });
    },
    'POST user': function(request, response) {
        var auth = Authorize(request),
            data = request.data,
            maxId = 0,
            domain;

        try {
            if(!auth) {
                throw new AuthError();
            }

            if(!data['login']) {
                throw new RespError('Empty email login value');
            }

            if(!data['domain']) {
                throw new RespError('Empty email domain value');
            }

            domain = transportData.find(function(v) {
                return (v.id == data.domain);
            });

            if(!domain) {
                throw new RespError('Unknown domain');
            }

            data.domainname = domain.domain

            for(var i in loginData) {
                maxId = loginData[i].id > maxId ? loginData[i].id : maxId;
            }

            maxId++;

            data['id'] = maxId;
            loginData.push(data);

            response(200, {
                success: true,
                data: data
            });
        }
        catch (err) {
            response(err.code, {
                success: false,
                error: err.message
            });
        }
    },
    'POST login': function(request, response) {
        var data = request.data,
            auth = getCookie('authsess'),
            authSess;
        
        try {
            if(!data['email']) {
                throw new Error('Empty login value');
            }
        
            if(!data['password']) {
                throw new Error('Empty password value');
            }

            for(var i in loginData) {
                if([loginData[i].login, loginData[i].domainname].join('@') == data['email'] && loginData[i].password == data['password']) {
                    authSess = {
                        jwt: JWTKEY(loginData[i].id)
                    };
                    break;
                }
            }
            
            if(!authSess) {
                throw new Error('Unknown manager');
            }

            response(200, {
                success: true,
                data: authSess
            });
        }
        catch (err) {
            response(401, {
                success: false,
                error: {
                    code: 401,
                    message: err.message
                }
            });
        }

    },
    'DELETE user/logout': function(request, response) {
        sessionStorage.removeItem('authkey');
        response(401);
    },
    'GET accesses': function(request, response) {
        var auth = Authorize(request),
            start = request.data.offset || 0,
            end = start + (request.data.limit || data.length);

        try {
            if(!auth) {
                throw new AuthError();
            }
            response(200, {
                count: accessData.length,
                data: accessData.slice(start, end)
            });
        }
        catch(err) {
            response(err.code, {
                error: err.message,
                success: false
            });
        }
    },
    'GET access/{id}': function(request, response) {
        var id = request.data.id,
            item, a;

        for(var i in accessData) {
            if(a = accessData[i], a.id == id) {
                item = a;
                break;
            }
        }

        if(item) {
            response(200, {
                success: true,
                data: item
            });
        } else {
            response(404, {
                success: false,
                error: 'Unknown item'
            });
        }
    },
    'PUT access/{id}': function(request, response) {
        var auth = Authorize(request),
            data = request.data,
            done = false;

        try {
            if(!auth) {
                throw new AuthError();
            }

            if(!data['id']) {
                throw new RespError('Unknown item');
            }

            if(data['access'] != 'REJECT' && data['access'] != 'OK') {
                throw new RespError('Unknown access value');
            }

            if(!data['client']) {
                throw new RespError('Empty client value');
            }

            for(var i in accessData) {
                if(accessData[i].id == data.id) {
                    accessData[i].client = data.client;
                    accessData[i].access = data.access;

                    done = true;
                    break;
                }
            }

            if(!done) {
                throw new Error('Unknown item');
            }
        } catch(err) {
            response(err.code, {
                success: false,
                error: err.message
            });

            return;
        }

        response(200, {
            success: true,
            data: data
        });    
    },
    'POST access': function(request, response) {
        var auth = Authorize(request),
            data = request.data,
            maxId = 0;
        
        try {
            if(!auth) {
                throw new AuthError();
            }

            if(!data['client']) {
                throw new RespError('Empty client value');
            }
        
            if(data['access'] != 'REJECT' && data['access'] != 'OK') {
                throw new RespError('Unknown access value');
            }

            for(var i in accessData) {
                maxId = accessData[i].id > maxId ? accessData[i].id : maxId;
            }
            
            maxId++;

            data['id'] = maxId;
            accessData.push(data);

            response(200, {
                success: true,
                data: data
            });
        }
        catch (err) {
            response(err.code, {
                success: false,
                error: err.message
            });
        }
    },
    'DELETE access/{id}': function(request, response) {
        var id = request.data.id,
            auth = Authorize(request),
            data = request.data;
        
        try {
            if(!auth) {
                throw new AuthError();
            }

            for(var i in accessData) {
                if(accessData[i].id == id) {
                    accessData.splice(i, 1);
                    break;
                }
            }

            response(200, {
                success: true,
                data: data
            });
        }
        catch (err) {
            response(err.code, {
                success: false,
                error: err.message
            });
        }
    },
    'GET spam': function(request, response) {
        var start = request.data['offset'] || 0,
            end = start + (request.data['limit'] || spamData.length);

        response(200, {
            count: spamData.length,
            data: spamData.slice(start, end)
        });
    },
    'GET transports': function(request, response) {
        var start = request.data['offset'] || 0,
            end = start + (request.data['limit'] || transportData.length);

        response(200, {
            count: transportData.length,
            data: transportData.slice(start, end)
        });
    },
    'GET transport/{id}': function(request, response) {
        var id = request.data.id,
            item, a;

        for(var i in transportData) {
            if(a = transportData[i], a.id == id) {
                item = a;
                break;
            }
        }

        if(item) {
            response(200, {
                success: true,
                data: item
            });
        } else {
            response(404, {
                success: false,
                error: 'Unknown item'
            });
        }
    },
    'POST transport': function(request, response) {
        var auth = Authorize(request),
            data = request.data,
            maxId = 0;

        try {
            if(!auth) {
                throw new AuthError();
            }

            if(!data['domain']) {
                throw new RespError('Empty domain value');
            }

            for(var i in transportData) {
                maxId = transportData[i].id > maxId ? transportData[i].id : maxId;
            }
            
            maxId++;

            transportData.push({
                id: maxId,
                domain: data['domain'] || '',
                transport: data['transport'] || 'virtaul',
                rootdir: data['rootdir'] || '/var/mail'
            });

            data['id'] = maxId;

            response(200, {
                success: true,
                data: data
            });    
        } catch(err) {
            response(err.code, {
                success: false,
                error: err.message
            });

            return;
        }
    },
    'PUT transport/{id}': function(request, response) {
        var auth = Authorize(request),
            data = request.data,
            done = false;

        try {
            if(!auth) {
                throw new AuthError();
            }

            if(!data['id']) {
                throw new RespError('Unknown item');
            }

            for(var i in transportData) {
                if(transportData[i].id == data.id) {
                    transportData[i] = {
                        id: data['id'],
                        domain: data['domain'] || transportData[i].domain,
                        transport: data['transport'] || transportData[i].transport,
                        rootdir: data['rootdir'] || transportData[i].rootdir
                    };
                    done = true;
                    break;
                }
            }

            if(!done) {
                throw new Error('Unknown item');
            }
        } catch(err) {
            response(err.code, {
                success: false,
                error: err.message
            });

            return;
        }

        response(200, {
            success: true,
            data: data
        });    
    },
    'GET aliases/groups': function(request, response) {
        request.data['groups'] = 1;
        Aliases(request, response);
    },
    'GET aliases': Aliases,
    'GET alias/{id}': Aliases,
    'POST alias': function(request, response) {
        var auth = Authorize(request),
            data = request.data,
            maxId = 0;

        try {
            if(!auth) {
                throw new AuthError();
            }

            for(var key in data) {
                if((key == 'alias' || key == 'recipient') && !data[key]) {
                    throw new RespError('Empty ' + key + ' value');
                }
            }

            for(var i in aliasData) {
                maxId = aliasData[i].id > maxId ? aliasData[i].id : maxId;
            }
            
            maxId++;

            aliasData.push({
                id: maxId,
                alias: data['alias'] || '',
                recipient: data['recipient'] || '',
                comment: data['comment'] || ''
            });

            data['id'] = maxId;

            response(200, {
                success: true,
                data: data
            });    
        } catch(err) {
            response(err.code, {
                success: false,
                error: err.message
            });

            return;
        }
    },
    'PUT alias/{id}': function(request, response) {
        var auth = Authorize(request),
            data = request.data,
            done = false;

        try {
            if(!auth) {
                throw new AuthError();
            }

            if(!data['id']) {
                throw new RespError('Unknown item');
            }

            for(var i in aliasData) {
                if(aliasData[i].id == data.id) {
                    aliasData[i] = {
                        id: data['id'],
                        alias: data['alias'] || aliasData[i].alias,
                        recipient: data['recipient'] || aliasData[i].recipient,
                        comment: data['comment'] || aliasData[i].comment
                    };
                    done = true;
                    break;
                }
            }

            if(!done) {
                throw new Error('Unknown item');
            }
        } catch(err) {
            response(err.code, {
                success: false,
                error: err.message
            });

            return;
        }

        response(200, {
            success: true,
            data: data
        });    
    },
    'DELETE alias/{id}': function(request, response) {
        var auth = Authorize(request),
            data = request.data,
            id = data.id,
            done = false;

        try {
            if(!auth) {
                throw new AuthError();
            }

            for(var i in aliasData) {
                if(aliasData[i].id == id) {
                    aliasData.splice(i, 1);
                    break;
                }
            }

            response(200, {
                success: true,
                data: data
            });
        }
        catch (err) {
            response(err.code, {
                success: false,
                error: err.message
            });
        }
    },
    'GET aliases/search': function(request, response) {
        var auth = Authorize(request),
            mail = request.data['query'] || '',
            items = [];

        try {
            if(!auth) {
                throw new AuthError();
            }

            if(mail) {
                mail = new RegExp('^' + mail);
            }

            for(var i in aliasData) {
                var m = aliasData[i].alias;

                if(mail && !mail.test(m)) {
                    continue
                }

                if(items.indexOf(m) < 0) {
                    items.push(m)
                }
            }

            for(var i in loginData) {
                var m = loginData[i].login + '@' + loginData[i].domainname;

                if(mail && !mail.test(m)) {
                    continue
                }

                if(items.indexOf(m) < 0) {
                    items.push(m)
                }
            }
        } catch(err) {
            response(err.code, {
                success: false,
                error: err.message
            });

            return;
        }
        
        response(200, {
            success: true,
            data: items
        });    
    },
    'GET password': function(request, response) {
        var auth = Authorize(request),
            items = [];

        try {
            if(!auth) {
                throw new AuthError();
            }

            for (var i = 0; i < 5; i++) {
                items.push(Math.random().toString(36).substring(2));
            }
        } catch(err) {
            response(err.code, {
                success: false,
                error: err.message
            });

            return;
        }
        
        response(200, {
            success: true,
            data: items
        });    
    },
    'GET servicestat': function(request, response) {
        var auth = Authorize(request),
            args = request.data || {},
            start = args.offset || 0,
            end = start + (args.limit || serviceStatData.length),
            uid = args.uid || 0,
            items = [];

        try {
            if(!auth) {
                throw new AuthError();
            }

            if(uid > 0) {
                for(var i in serviceStatData) {
                    if(uid == serviceStatData[i].uid) {
                        items.push(serviceStatData[i])
                    }
                }
            } else {
                items = serviceStatData;
            }

            response(200, {
                count: items.length,
                data: items.slice(start, end)
            });
        }
        catch(err) {
            response(err.code, {
                error: err.message,
                success: false
            });
        }
    },
    "GET bccs": function(request, response) {
        var auth = Authorize(request),
            args = request.data || {},
            start = args.offset || 0,
            end = start + (args.limit || bccData.length),
            uid = args.uid || 0,
            search = args.query || '',
            items = [];

        try {
            if(!auth) {
                throw new AuthError();
            }

            if(search) {
                if(search) {
                    search = new RegExp('^' + search);
                }
                for(var i in bccData) {
                    if(search.test(bccData[i].sender) || search.test(bccData[i].recipient) || search.test(bccData[i].copy)) {
                        items.push(bccData[i])
                    }
                }
            } else {
                items = bccData;
            }

            response(200, {
                count: items.length,
                data: items.slice(start, end)
            });
        }
        catch(err) {
            response(err.code, {
                error: err.message,
                success: false
            });
        }
    },
    "GET bcc/{id}": function(request, response) {
        var auth = Authorize(request),
            args = request.data || {},
            flt = function() {},
            id = args.id || 0,
            data = null;

        try {
            if(!auth) {
                throw new AuthError();
            }

            if(parseInt(id) > 0) {
                flt = function(v) {
                    return v.id == id
                }

                data = bccData.find(flt);
            } else {
                throw new RespError('Unknown item');
            }

            if(data == null) {
                throw new AuthError()
            }
        } catch(err) {
            response(err.code, {
                error: err.message
            });

            return;
        }

        response(200, {
            success: true,
            data: data
        });
    },
    "POST bcc": function(request, response) {
        var auth = Authorize(request),
            data = request.data,
            maxId = 0;

        try {
            if(!auth) {
                throw new AuthError();
            }

            if(!data['sender'] && !data['recipient']) {
                if(!data['sender']) {
                    throw new RespError('Empty sender value');
                }
                if(!data['recipient']) {
                    throw new RespError('Empty recipient value');
                }
            }

            if(!data['copy']) {
                throw new RespError('Empty copy to value');
            }

            for(var i in bccData) {
                maxId = bccData[i].id > maxId ? bccData[i].id : maxId;
            }
            
            maxId++;

            bccData.push({
                id: maxId,
                sender: data['sender'] || '',
                recipient: data['recipient'] || '',
                copy: data['copy'] || '',
                comment: data['comment'] || ''
            });

            data['id'] = maxId;

            response(200, {
                success: true,
                data: data
            });    
        } catch(err) {
            response(err.code, {
                success: false,
                error: err.message
            });

            return;
        }
    },
    "PUT bcc/{id}": function(request, response) {
        var auth = Authorize(request),
            data = request.data,
            done = false;

        try {
            if(!auth) {
                throw new AuthError();
            }

            if(!data['id']) {
                throw new RespError('Unknown item');
            }

            for(var i in bccData) {
                if(bccData[i].id == data.id) {
                    bccData[i] = {
                        id: data['id'],
                        sender: data['sender'] || '',
                        recipient: data['recipient'] || '',
                        copy: data['copy']
                    };
                    done = true;
                    break;
                }
            }

            if(!done) {
                throw new Error('Unknown item');
            }
        } catch(err) {
            response(err.code, {
                success: false,
                error: err.message
            });

            return;
        }

        response(200, {
            success: true,
            data: data
        });    
    },
    "DELETE bcc/{id}": function(request, response) {
        var auth = Authorize(request),
            data = request.data,
            id = data.id,
            done = false;

        try {
            if(!auth) {
                throw new AuthError();
            }

            for(var i in bccData) {
                if(bccData[i].id == id) {
                    bccData.splice(i, 1);
                    break;
                }
            }

            response(200, {
                success: true,
                data: data
            });
        }
        catch (err) {
            response(err.code, {
                success: false,
                error: err.message
            });
        }
    }
});
