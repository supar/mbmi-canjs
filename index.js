import $ from 'jquery';
import 'bootstrap';

steal(
    'components/application.js',
    'components/authenticate.js',
    'components/access-panel.js',
    'components/spam-panel.js',
    //!steal-remove-start
    'models/fixtures/fixtures.js',
    //!steal-remove-end
    'less/application.less!',
    'less/responsive.less!',
function(App){
    window.App = new App($(window));
    window.App.run();
});

