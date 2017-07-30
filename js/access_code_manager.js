/*
 * AccessCodeManager class which handles AccessCodes
 */
 
var YAWS_PATH = config.yaws_file_path + 'access_code_manager.yaws';
 
function AccessCodeManager() {
	
}

// Load Dtmf Values to SelectBox
AccessCodeManager.prototype.getDtmfValues = function (id) {
	var dtmf_vals = config.dtmf_vals;

	i = 0;
	for (var key in dtmf_vals) { 
		var value = $.parseJSON(JSON.stringify(dtmf_vals[key]));
		$(id).append($('<option/>')
		.attr("value", key)
		.text(value[i]));
		i++;
	}
}

// Load xml types to SelectBox
AccessCodeManager.prototype.getXmlTypes = function (id) {
	var xml_types = config.xml_types;

	i = 0;
	for (var key in xml_types) { 
		var value = xml_types[key];
		$(id).append($('<option/>')
		.attr("value", value["value"])
		.text(value["description"]));
		i++;
	}
}

// Load xml types to SelectBox
AccessCodeManager.prototype.getXmlTypes = function (id) {
	var xml_types = config.xml_types;

	i = 0;
	for (var key in xml_types) { 
		var value = xml_types[key];
		$(id).append($('<option/>')
		.attr("value", value["value"])
		.text(value["description"]));
		i++;
	}
}

// Load xml types to SelectBox
AccessCodeManager.prototype.getCallCtrlTypes = function (id) {
	var call_ctrl_types = config.call_ctrl_type;

	i = 0;
	for (var key in call_ctrl_types) { 
		var value = call_ctrl_types[key];
		$(id).append($('<option/>')
		.attr("value", key)
		.text(value[i]));
		i++;
	}
}

// Update user
AccessCodeManager.prototype.createAccessCode = function() {
	
	var fields = $('#frm_crt_access_code').serializeArray();
	var request_data = '{"action":"CREATE_ACCESS_CODE",';
	
	jQuery.each(fields, function(i, field) {
		if (field.name == 'acc_code_status') 
		{
			if(field.value == "on")
				request_data += '"' + field.name + '":"1",';
			else
				request_data += '"' + field.name + '":"0",';
		}
		else if (field.name == 'gen_dtmf') 
		{
			if(field.value == "on")
				request_data += '"' + field.name + '":"1",';
			else
				request_data += '"' + field.name + '":"0",';
		}
		else
		{
			request_data += '"' + field.name + '":"' + field.value + '",';
		}
	});
	request_data = request_data.slice(0,(request_data.length-1)); // Removing last comma ,
	request_data += '}';

	response_data = obj_common.ajaxRequest(YAWS_PATH, request_data);

	if ('ok' == response_data[0].status) 
	{
		objApp.setFlash('success', response_data[0].reason);		
	} 
	else 
	{
		objApp.setFlash('error', response_data[0].reason);
	}
}


var objAccessCode = new AccessCodeManager();
var obj_common = new Common();

jQuery(document).ready(function() {

	$('#frm_crt_access_code').validationEngine({'custom_error_messages' : {
	}
	});	
	//Saving general configurations
	$('#access_save').bind("click", function () {
		if($("#frm_crt_access_code").validationEngine('validate')) {
			objAccessCode.createAccessCode();  				
			return false;
		}
		return false;
	});

});
