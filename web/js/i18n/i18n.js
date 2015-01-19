 var i18n = {
		local:"ru",
	data:{},
	debug:false,
    get:function(param){
    	if(this.data[this.local]===undefined){
    		console.log("Переводы еще не получены");
    		return false;
    	}
    	if(this.debug===true)
    		return (this.data[this.local][param]!==undefined)?this.data[this.local][param]:'<p class="text-error">'+param+'</p>';
    	else
    		return (this.data[this.local][param]!==undefined)?this.data[this.local][param]:param;

    },
    setLocal:function(local){
    	if(this.data[local]===undefined){
    
    		$.ajax({
    		     type: 'GET',
    		     url: "js/i18n/locales/"+local+".json",
    		     async: false,
    		     dataType: "json",
      		     success: function (data, textStatus) {
      		    	i18n.data[local]=data;
      		    	i18n.local=local;
    			       }
    			 
    		 });
    	}else{
    		this.local=local;
    	}
    		
    	
    }
};