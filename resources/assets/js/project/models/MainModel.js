var modMain = Backbone.Model.extend({
    url: function(method){
        return '/api';
    },
    initialize: function(){

    }
});
var MainModel = new modMain();