import connect from 'can-connect';
import dataUrl from 'can-connect/data/url/url';
import constructor from 'can-connect/constructor/constructor';
import parse from 'can-connect/data/parse/parse';

export default connect(
    [ constructor, dataUrl, parse ],
    {
        parseInstanceProp: 'data',
        url: {
            getData: 'user/me',
            createData: 'login',
            destroyData: 'logout'
        }
    });
