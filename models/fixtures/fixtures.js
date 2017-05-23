// map fixtures for this application
steal(
    "can/util/fixture", 
function(fixture) {
    var loginData =  [
            { id: 1, name: "Менеджер 1", login: "some_1@domain.com", pass: "123", auth_key: "asdfqwerdzsflkewu-1" },
            { id: 2, name: "Менеджер 2", login: "some_2@domain.com", pass: "123", auth_key: "asdfqwerdzsflkewu-2" },
            { id: 3, name: "Менеджер 3", login: "some_3@domain.com", pass: "123", auth_key: "asdfqwerdzsflkewu-3" },
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
                { client: "193.200.211.254", ip: "193.200.211.254", from: "rea@vit-net.ru", score: 1, index: 0.024690087971667385 },
                { client: "cannibalk1@gmail.com", ip: "88.250.181.166", from: "cannibalk1@gmail.com", score: 1, index: 0.024690087971667385 },
                { client: "105.225.155.9", ip: "105.225.155.9", from: "pottierh0032@googlemail.com", score: 1, index: 0.024690087971667385 },
                { client: "yjmosmd@bizneroa.co.ua", ip: "85.25.13.120", from: "yjmosmd@bizneroa.co.ua", score: 1, index: 0.024690087971667385 },
                { client: "bogdanov.209@mail.ru", ip: "114.38.27.184", from: "bogdanov.209@mail.ru", score: 1, index: 0.024690087971667385 },
                { client: "wgrovsflieukvoy@narod.ru", ip: "31.24.30.98", from: "wgrovsflieukvoy@narod.ru", score: 1, index: 0.024690087971667385 },
                { client: "112.158.228.51", ip: "112.158.228.51", from: "info@bucci.org", score: 1, index: 0.024690087971667385 },
                { client: "ykdownp@holihik.co.ua", ip: "217.172.177.226", from: "ykdownp@holihik.co.ua", score: 1, index: 0.024690087971667385 },
                { client: "malololopez@aol.com", ip: "178.207.161.114", from: "malololopez@aol.com", score: 1, index: 0.024690087971667385 },
                { client: "5.141.219.117", ip: "5.141.219.117", from: "unbendingo076@list.ru", score: 1, index: 0.024690087971667385 }
        ];

    fixture({
        'GET user/me': function(request, response) {
            var auth = Authorize();

            try {
                if(auth == false) {
                    throw new AuthError();
                }

                response(200, {
                    success: true,
                    data: auth
                });
            } catch(err) {
                response(err.code, {
                    error: err.message
                });
            }
        },
        'PUT user/login': function(request, response) {
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
                    if(loginData[i].login == data['email'] && loginData[i].pass == data['password']) {
                        setCookie('authsess', i);
                        authSess = loginData[i];
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
                    error: err.message
                });
            }

        },
        'DELETE user/login/{id}': function(request, response) {
            setCookie('authsess', '');
            response(401);
        },
        'GET accesses': function(request, response) {
            var auth = Authorize(),
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
        'GET accesses/{id}': function(request, response) {
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
        'POST accesses': function(request, response) {
            var auth = Authorize(),
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
                success: true
            });    
        },
        'PUT accesses': function(request, response) {
            var auth = Authorize(),
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
    
                data.id = maxId;
                console.log(data);
                accessData.push(data);

                response(200, {
                    success: true
                });    
            }
            catch (err) {
                response(err.code, {
                    success: false,
                    error: err.message
                });
            }

        },
        'GET spammers': function(request, response) {
            var start = request.data.offset || 0,
                end = start + (request.data.limit || data.length);

            response(200, {
                count: spamData.length,
                data: spamData.slice(start, end)
            });
        }
    });

    function Authorize() {
        var auth = getCookie('authsess');

        if(typeof auth == undefined || !loginData[auth]) {
            return false;
        }

        return loginData[auth]
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
});
