var modMain = Backbone.Model.extend({
    url: function(method){
        return '/api/test';
    },
    initialize: function(){

    }
});
var MainModel = new modMain();