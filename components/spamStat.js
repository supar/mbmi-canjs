steal(
    'can/component',
    './../models/spam.js',
    './pager.js',
    'can/view',
    './../views/spamstat.mustache',
function(Component, Model) {
    Component.extend({
        tag: "grid",
        //template: can.view("./views/spamstat.mustache"),
        template: can.stache("<table><tbody {{#waiting}}class='waiting'{{/waiting}}><content></content></tbody></table>"),
        viewModel: Model
    });
})
