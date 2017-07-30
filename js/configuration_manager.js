/*
 * OtherConfManager class which handles user management
 */
function OtherConfManager() {
	
}

OtherConfManager.prototype.getConfigurations = function () {
		
	var obj_common = new Common();
	
	var request_data = '{"action":"GET_CONF"}';

	response_data = obj_common.ajaxRequest(config.yaws_file_path + 'other_conf_manager.yaws', request_data);

	if(response_data != '')
	{
		$('#local_apn').val(response_data[0].local_apn);		
		$('#sms_from').val(response_data[0].sms_from);
		$('#vlr_gt').val(response_data[0].vlr_gt);
		$('#hrl_gt').val(response_data[0].hrl_gt);
		$('#sgsn_gt').val(response_data[0].sgsn_gt);
		$('#trans_type').val(response_data[0].trans_type);
		$('#virtual_no').val(response_data[0].virtual_period);
		$('#deact_timeout').val(response_data[0].deact_timeout);
		$('#credit_timeout').val(response_data[0].credit_timeout);
		$('#recharge_timeout').val(response_data[0].recharge_timeout);
	}	
}

// Create new user
OtherConfManager.prototype.updateCommon = function() {
	
	var obj_common = new Common();
	var fields = $('#frm_conf').serializeArray();
	
	var request_data = '{"action":"UPDATE_COMM",';
	
	jQuery.each(fields, function(i, field) {
		request_data += '"' + field.name + '":"' + field.value + '",';
	});	
	
	request_data = request_data.slice(0,(request_data.length-1)); // Removing last comma ,	
	request_data += '}';	
	
	response_data = obj_common.ajaxRequest(config.yaws_file_path + 'other_conf_manager.yaws', request_data);

	if ('ok' == response_data[0].status) {
		objApp.setFlash('success', response_data[0].reason);
		this.getConfigurations();
	} else {
		objApp.setFlash('error', response_data[0].reason);
	}
}

OtherConfManager.prototype.updateSubsMgt = function() {

	var obj_common = new Common();
	var fields = $('#frm_subscribed_conf').serializeArray();
	
	var request_data = '{"action":"UPDATE_SUBS_MGT",';
	
	jQuery.each(fields, function(i, field) {
		request_data += '"' + field.name + '":"' + field.value + '",';
	});	
	
	request_data = request_data.slice(0,(request_data.length-1)); // Removing last comma ,	
	request_data += '}';	
	
	response_data = obj_common.ajaxRequest(config.yaws_file_path + 'other_conf_manager.yaws', request_data);
	
	if ('ok' == response_data[0].status) {
		objApp.setFlash('success', response_data[0].reason);
		objConf.getConfigurations();
	} else {
		objApp.setFlash('error', response_data[0].reason);
	}
}

/**
 * Export numbers to CSV.
 */
OtherConfManager.prototype.exportCsv = function() {
		
	var obj_common = new Common();
	
	request_data = '{"action":"EXPORT_CSV"}';
	
	response_data = obj_common.ajaxRequest(config.yaws_file_path + 'other_conf_manager.yaws', request_data);
	
	if(response_data != ""){
		if ('ok' == response_data[0].status) {
			objApp.setFlash('success', response_data[0].message);
			window.open(response_data[0].csv_url)
		} else {
			objApp.setFlash('error', response_data[0].message);
		}
	}else {
		objApp.setFlash('error', "No records found");
	}	
}

// Reset form
OtherConfManager.prototype.resetForm = function() {
	var obj_common = new Common();
	obj_common.resetForm($('#frm_conf'));
}

jQuery(document).ready(function() {

	$('#log_svr').prop('disabled',false);
		
	if($("#quata_status").val()=="enable")
	{			
		$("#quata_size").attr('disabled',false);
	}
	else 
	{
		$("#quata_size").attr('disabled',true);
	}
	
	if($("#charge_enable").val()=="enable")
	{
		$("#charge_svr").attr('disabled',false);
	}
	else 
	{
		$("#charge_svr").attr('disabled',true);
	}
	
	// User management form
	$('#frm_conf').validationEngine({'custom_error_messages' : {
	    }
	});	

		$('#frm_subscribed_conf').validationEngine({'custom_error_messages' : {
	    }
	});

		$('#frm_trace_numbers').validationEngine({'custom_error_messages' : {
	    }
	});

		

	
	
	$('#update_common').bind("click", function () {
		if(!$("#frm_conf").validationEngine('validate')) {
			return false;
		}

		objConf.updateCommon();
		
		return false;
	});	
	
	$('#update_sub_mgt').bind("click", function () {
		if(!$("#frm_subscribed_conf").validationEngine('validate')) {
			return false;
		}

		objConf.updateSubsMgt();
		
		return false;
	});	

	// Bind to export to CSV button
	$('#export_csv').bind("click", function () {	
		
		objConf.exportCsv(); 				
		return false;
	});	
	
	$('#quata_status').change(function()
	{	
		if($("#quata_status").val()=="enable")
		{			
			$("#quata_size").attr('disabled',false);		
		}
		else 
		{	
			$("#quata_size").attr('disabled',true);
			$("#quata_size").attr('value','0');
		}
	});
	
	$('#charge_enable').change(function()
	{	
		if($("#charge_enable").val()=="enable")
		{		
			$("#charge_svr").attr('disabled',false);		
		}
		else 
		{			
			$("#charge_svr").attr('disabled',true);			
		}	
	});
	
	objConf.getConfigurations();
	
	// Hide update button on page load
	$('#update').hide();
});

var objConf = new OtherConfManager();
