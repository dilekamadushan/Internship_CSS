function ContentProviderManager() {}

ContentProviderManager.prototype.initialize = function(){
	alert("initializing data");
}

ContentProviderManager.prototype.update = function(){
	
	bypass_mode 		= $('#bypass_mode').val();
	enable_blacklist	= $('#enable_blacklist').val();
	global_key_sub 		= $('#glo_key_sub').val();
	global_key_unsub	= $('#glo_key_unsub').val();
	
	return false;
}

var contentProviderManager = new ContentProviderManager();


jQuery(document).ready(function(){
	
	contentProviderManager.initialize();
		
	$('#create_provider').bind("click", function(event){

		contentProviderManager.update();
		return false;
	});
})