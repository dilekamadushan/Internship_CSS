/*
 * AccessCodeManager class which handles AccessCodes
 */
 
var YAWS_PATH = config.yaws_file_path + 'access_code_manager.yaws';
 
function AccessCodeManager() {
	
}


AccessCodeManager.prototype.getAccessCode = function() {

	var obj_common = new Common();
	var request_data = '{"action":"GET_CONFIGURATIONS", "user_name":"wavenet"}';

	response_data = obj_common.ajaxRequest( YAWS_PATH, request_data);
	var rec_list 	= '';
	var checked  	= "";
	var rec_count 	= 0; 
	
	

	console.log(JSON.stringify(response_data));

	if(response_data != '')
	{
		for (var i in response_data) {
			rec_count++;
			var chk_str = response_data[i].id;
			
			rec_list += '<tr>'
				+ '<td>' + response_data[i].acc_nbr + '</td>'
				+ '<td>' + response_data[i].app_type + '</td>'
				+ '<td>' + response_data[i].login_url + '</td>'
				+ '<td>' + response_data[i].logout_url + '</td>'
				+ '<td align="center"><a title="Edit" >edit</a>'
//					'<a title="Delete" >delete</a>''</td>'
//					'<a title="View" >view</a>'
			+ '</tr>'; 
		}
	}
	else
	{
		rec_list += '<tr>'
			+ '<td>' + response_data[i].acc_nbr + '</td>'
		+'</tr>'; 
	}		
 
	var list_table = ''	
	+ '<table border="0" align="center" cellpadding="0" cellspacing="1" class="results_mini" id="mts">'
		+ '<tr>'
			+ '<th width="15%">Access Number</th>'
			+ '<th width="15%">Application Type</th>'
			+ '<th width="32%">Login URL</th>'
			+ '<th width="32%">Logout URL</th>'
			+ '<th width="6%"></th>'
		+ '</tr>'
		+ rec_list
	+ '</table>' 
	+ '<div id="pagers" style="margin: auto;">';

	jQuery('#access_tbl').html(list_table);
	
	$('#pagers').smartpaginator({ 
		totalrecords: rec_count,
		recordsperpage: 10, 
		datacontainer: 'mts', 
		dataelement: 'tr',
		theme: 'custom',
		initval:0,
		onchange: this.onPageChange
	});	
}

// Update user
AccessCodeManager.prototype.createAccessCode = function() {
	
	var fields = $('#frm_crt_access_code').serializeArray();
	var request_data = '{"action":"CREATE_ACCESS_CODE",';

	if ($('#audio_cdc_lst').val() == "") {
		objApp.setFlash('info', "Select atleast one audio type.");
		return false;
	}

	jQuery.each(fields,
 function(i, field) {
		if (field.name == 'dtmf')
		{
			if(field.value == "0")
				request_data += '"' + field.name + '":"25",';
			else
				request_data += '"' + field.name + '":"1",';
		}
		else
		{
			request_data += '"' + field.name + '":"' + field.value + '",';
		}
	});
	request_data = request_data.slice(0,(request_data.length-1)); // Removing last comma,
	request_data += '}';

	response_data = obj_common.ajaxRequest(YAWS_PATH, request_data);

	if ('ok' == response_data[0].status) 
	{
		obj_common.resetForm($('#frm_crt_access_code'));
		objApp.setFlash('success', response_data[0].reason);
	} 
	else 
	{
		objApp.setFlash('error', response_data[0].reason);
	}
}


var objAccessManager = new AccessCodeManager();
var obj_common = new Common();

jQuery(document).ready(function() {

	objAccessManager.getAccessCode();
//	$('#frm_crt_access_code').validationEngine({'custom_error_messages' : {
//	}
//	});

	//Saving general configurations
//	$('#access_save').bind("click", function () {
//		if($("#frm_crt_access_code").validationEngine('validate')) {
//			objAccessCode.createAccessCode();  				
//			return false;
//		}
//		return false;
//	});

});
