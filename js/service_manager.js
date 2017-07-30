	/*
 * ServiceManager class which handles service managment
 */
var cur_page = 0;
var data = "";
var response_data; 
var logRetrievalInterval;
var selected_recs="";
var session_ ="";

function ServiceManager() {
	
}

ServiceManager.prototype.AddService = function() {
	
	var service_name		=	$("#serv_name").val();
	var mo_code				=	$("#mo_code").val();
	var description			=	$("#desc").val();
	var servicegroup_id		=	$("#service_group_select").val();
	var mt					=	$("#mt").val().replace(/\r?\n/g, ",");
	var provider			=	$("#provider_select").val();
	var operator			=	$("#operator_select").val();
	var effective_date		=	$("#effective_date").val();
	var expiry_date			=	$("#expir_date").val();
	var subscribe_keyword	=	$("#subs").val().replace(/\r?\n/g, ",");
	var unsubscribe_keyword	=	$("#unsubs").val().replace(/\r?\n/g, ",");
	var sms_lang			=	$("#sms_language_select").val();
	var sender				=	$("#sender").val();
	var blacklist			=	$("#blacklist").val().replace(/\r?\n/g, ",");

	var request_data = '{"action":"CREATE","service_name":"' + service_name + '","mo_code":"' + mo_code + '","description":"' + description + '", "mt":"' + mt + '", "provider":"' + provider + '", "operator":"' + operator + '", "effective_date":"' + effective_date + '", "expiry_date":"' + expiry_date + '", "subscribe_keyword":"' + subscribe_keyword + '", "unsubscribe_keyword":"' + unsubscribe_keyword + '", "sms_lang":"' + sms_lang + '", "sender":"' + sender + '", "blacklist":"' + blacklist + '", "servicegroup_id":"' + servicegroup_id + '"}';
	var response_data = obj_common.ajaxRequest(config.yaws_file_path + 'css_service_manager.yaws', request_data);
	
	if(response_data[0].status == "ok"){
		objApp.setFlash('success', response_data[0].message);
	}
	else{
		objApp.setFlash('error', response_data[0].message);
	}	
};

ServiceManager.prototype.GetProviders = function() {
	
	var request_data = '{"action":"GET_ALL_PROVIDERS"}';
	var response_data = obj_common.ajaxRequest(config.yaws_file_path + 'css_provider_manager.yaws', request_data); 
	
	if(response_data.data.length > 0){
		//Fill provider drop down
		var options = $("#provider_select");
		$("#provider_select").empty();
		$.each(response_data.data, function(item) {
			options.append($("<option />").val(response_data.data[item][0]).text(response_data.data[item][1]));
		});
	}	
}

ServiceManager.prototype.GetOperators = function() {
	
	var request_data = '{"action":"GET_ALL_OPERATORS"}';
	var response_data = obj_common.ajaxRequest(config.yaws_file_path + 'css_operator_manager.yaws', request_data); 
	
	if(response_data.data.length > 0){
		//Fill operator drop down
		var options = $("#operator_select");
		$("#operator_select").empty();
		$.each(response_data.data, function(item) {
			options.append($("<option />").val(response_data.data[item][0]).text(response_data.data[item][1]));
		});
	}	
}

ServiceManager.prototype.GetServiceGroups = function() {
	
	var request_data = '{"action":"GET_ALL_SERVICEGROUPS"}';
	var response_data = obj_common.ajaxRequest(config.yaws_file_path + 'css_servicegroup_manager.yaws', request_data); 
	
	if(response_data.data.length > 0){
		//Fill operator drop down
		var options = $("#service_group_select");
		$("#service_group_select").empty();
		$.each(response_data.data, function(item) {
			options.append($("<option />").val(response_data.data[item][0]).text(response_data.data[item][1]));
		});
	}	
}

ServiceManager.prototype.GetSmsLanguage = function() {
	
	var options = $("#sms_language_select");
	$("#sms_language_select").empty();
	$.each(config.sms_language, function(item) {
		options.append($("<option />").val(config.sms_language[item].id).text(config.sms_language[item].lang));
	});
	
}

ServiceManager.prototype.SearchServices = function() {
	
}

var objServiceManager = new ServiceManager();

jQuery(document).ready(function() {
	
	objServiceManager.GetSmsLanguage();
	objServiceManager.GetProviders();
	objServiceManager.GetOperators();
	objServiceManager.GetServiceGroups();
	if ($("#frm_service_search").length > 1){
		objServiceManager.SearchServices();
	}
	
	//Search Channel form
	$('#frm_service_create').validationEngine({'custom_error_messages' : {
	     }
	 });
	
	//Button binding
	$('#create_service').bind("click", function () {
		if(!$("#frm_service_create").validationEngine('validate')) {
			return false; 
		}
		objServiceManager.AddService(); 
		return false;
	});
	
	$('#search_service').bind("click", function () {
		if(!$("#frm_service_search").validationEngine('validate')) {
			return false; 
		}
		objChannelManager.SearchChannel(); 
		return false;
	});

});