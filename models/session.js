import connect from 'can-connect';
import dataUrl from 'can-connect/data/url/url';
import constructor from 'can-connect/constructor/constructor';
import parse from 'can-connect/data/parse/parse';
import model from 'models/user';
import ajax from 'util/ajax-setup';

export default connect(
    [ constructor, dataUrl, parse, ajax ],
    {
        parseInstanceProp: 'data',
        instance: function(data) {
            return new model(data);
        },
        url: {
            getData: 'user/me',
        }
    });
