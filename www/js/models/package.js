var Backbone = require('backbone');
var Model = require('./model');

module.exports = Model.extend({
    urlRoot: '/api/packages',
    idAttribute: 'uuid',
    defaults: {
        'default': false,
        'traits': {}
    }
});