window.MainView = Backbone.View.extend({
    tagName:'div',
    initialize:function () {
    },
    events:{
    },
    render:function () {
        $(this.el).html(JST.MainView({name:this.model.toJSON()['name']}));
        return this;
    }



})