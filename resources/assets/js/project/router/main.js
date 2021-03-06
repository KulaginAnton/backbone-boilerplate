var AppRouter = Backbone.Router.extend({

    routes: {
        "":"start",
        "welcome/:name":"welcome"
    },

    initialize: function () {
        window.location.hash="";
        this.MainView = new MainView({model:MainModel});
        Backbone.history.bind('url-changed', function(path,e){
            console.log("url change", path, e);
        });
    },
    start:function(){
        var _this = this;
        this.MainView.model.fetch({
            success:function(){
                $('.container').html(_this.MainView.render().el);
            }
        });
    },
    welcome:function(name){
        alert(name);
    }
});

i18n.setLocal("ru");
window.App={};
window.app = new AppRouter();
Backbone.history.start();

//utils.loadTemplate([
//    'MainView',
//    'Header',
//    'ProcessingView',
//    'CheckAdress',
//    'CladrView'
//], function() {
//
//    app = new AppRouter();
//    Backbone.history.start();
//
//
//});
