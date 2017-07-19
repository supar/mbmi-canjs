import $ from 'jquery';
import 'bootstrap';

import './less/application.less!';
import './less/responsive.less!';
import './less/authorize.less!';

steal(
    'components/application.js',
    'components/authenticate.js',
    'components/transport-panel.js',
    'components/access-panel.js',
    'components/spam-panel.js',
    //!steal-remove-start
    'models/fixtures/fixtures.js',
    //!steal-remove-end
function(App){
    window.App = new App($(window));
    window.App.run();
});

