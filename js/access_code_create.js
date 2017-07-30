/*
 * AccessCode class which handles AccessCodes
 */
 
var YAWS_PATH = config.yaws_file_path + 'access_code_manager.yaws';
 
function AccessCode() {
	
}

// Load Dtmf Values to SelectBox
AccessCode.prototype.getDtmfValues = function (id) {
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
AccessCode.prototype.getXmlTypes = function (id) {
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
AccessCode.prototype.getXmlTypes = function (id) {
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
AccessCode.prototype.getCallCtrlTypes = function (id) {
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

//Update user
AccessCode.prototype.getAdjNodeList = function(OverWrite) {

	var request_data = '{"action":"LOAD_ADJ_NODE_LIST"}';

	response_data = obj_common.ajaxRequest(YAWS_PATH, request_data);
	var currentValue;
	var str="";
	if ('ok' == response_data[0].status) {
		var nodeList=response_data[0].message;
		var nodesArray=nodeList.split(",");
		for (var i in nodesArray){
			if (currentValue != null && currentValue == nodesArray[i]) {
				return nodesArray[i];
			}
			str += '<option value="' + nodesArray[i] + '">' + nodesArray[i] + '</option>';
		}	
	
	$('#adjc_type').html(str); 

	}
}


// Update user
AccessCode.prototype.createAccessCode = function(OverWrite) {
	
	if ($('#dtmf').val() == "0") {
		$('#dtmf_pyld').val("500");
	}

	var fields = $('#frm_crt_access_code').serializeArray();
	var request_data = '{"action":"CREATE_ACCESS_CODE",';
	
	if ($('#audio_cdc_lst').val() == "") {
		objApp.setFlash('info', "Select atleast one audio type.");
		return false;
	}

	jQuery.each(fields,function(i, field) {

		if(field.name == "adjc_type"){
			field.value = "\'" + field.value + "\'";
		}

		// if(field.name == "dtmf_pyld" && field.value == ""){
		// 	field.value = 0;
		// }

		if (field.name == 'audio_cdc_lst')
		{
			request_data += '"' + field.name + '":"'+ field.value.slice(0,(field.value.length-1))+'",';
		}
		else if (field.name == 'video_cdc_lst' )
		{
			request_data += '"' + field.name + '":"'+ field.value.slice(0,(field.value.length-1))+'",';
		}
		else
		{
			request_data += '"' + field.name + '":"' + field.value + '",';
		}
	});
	request_data = request_data.slice(0,(request_data.length-1)); // Removing last comma,
	request_data += ',"over_write":"'+OverWrite+'"}';

	response_data = obj_common.ajaxRequest(YAWS_PATH, request_data);

	if ('ok' == response_data[0].status) 
	{
		$('#access_save').show();
		$('#access_update').hide();
		obj_common.resetForm($('#frm_crt_access_code'));
		$('#a_law').val("8").attr('readonly', true);
		$('#mu_law').val("0").attr('readonly', true);

		objApp.setFlash('success', response_data[0].reason);
		objAccessCode.getAccessCode();
		$('#acc_num').attr("readonly", false);
		$('#audio_amr').hide();
		$('#audio_namr').hide();
		$('#audio_g723').hide();
		$('#audio_g729').hide();
		$('#video_h264').hide();
		$('#video_h263').hide();
		$('#video_mpeg4').hide();
		$('#pload2').hide();
		$("#early_media").attr("disabled", true);
		$("#cc_type").empty()
		objAccessCode.getCallCtrlTypes('#cc_type');
		$('#audio_cdc_lst').val("");
		$('#video_cdc_lst').val("");
	} 
	else 
	{
		objApp.setFlash('error', response_data[0].reason);
	}
	
}


AccessCode.prototype.getAccessCode = function() {

	var obj_common = new Common();
	var request_data = '{"action":"GET_CONFIGURATIONS", "user_name":"wavenet"}';

	response_data = obj_common.ajaxRequest( YAWS_PATH, request_data);
	var rec_list 	= '';
	var checked  	= "";
	var rec_count 	= 0; 

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
				+ '<td style="text-align:center;">';				
				if(objApp.checkPermission('ivr_view_access_code')){
					rec_list += '<a title="View" class="viewBtn" onClick=objAccessCode.viewAccessCode("' + response_data[i].acc_nbr + '");return false;><img src="images/ico_view.png"></a>&nbsp;';
				}
				else{
					rec_list += '<img src="images/ico_view_no.png">&nbsp;';
				}

				if(objApp.checkPermission('ivr_edit_access_code')){
					if(response_data[i].creator != "sce"){
						rec_list +='<a title="Edit" class="editBtn" onClick= onClick=objAccessCode.loadAccessCode("' + response_data[i].acc_nbr + '");return false;><img src="images/ico_edit.png"></a>&nbsp;';
						}
					else{
						rec_list +='<img src="images/ico_edit_no.png"></a>&nbsp;';
					}
				}
				else{
					rec_list +='<img src="images/ico_edit_no.png"></a>&nbsp;';
				}
				if(objApp.checkPermission('ivr_delete_access_code')){
					if(response_data[i].creator != "sce"){
						rec_list += '<a title="Delete" class="deleteBtn" onClick= onClick=objAccessCode.deleteAccessCode("' + response_data[i].acc_nbr + '");return false;><img src="images/ico_delete.png"></a>&nbsp;';
						
					}
					else{
						rec_list += '<img src="images/ico_delete_no.png"></a>&nbsp;';
					}

				}
				else{
					rec_list += '<img src="images/ico_delete_no.png"></a>&nbsp;';
				}
				rec_list += '</td>'
			+ '</tr>'; 
		}
	}
	else
	{
		rec_list += '<tr>'
			+ '<td colspan = 5>No Data</td>'
		+'</tr>'; 
	}		
 
	var list_table = ''	
	+ '<table border="0" align="center" cellpadding="0" cellspacing="1" class="results_mini" id="mts">'
	+'<thead>'
		+ '<tr>'
			+ '<th width="20%">Access Number</th>'
			+ '<th width="10%">Application Type</th>'
			+ '<th width="30%">Login URL</th>'
			+ '<th width="30%">Logout URL</th>'
			+ '<th width="10%"></th>'
		+ '</tr>'
		+'</thead>'
		+'<tbody>'
		+ rec_list
		+'</tbody>'
	+ '</table>' 
	+ '<div id="pagers" style="margin: auto;">';

	jQuery('#access_tbl').html(list_table);
	
	// $('#pagers').smartpaginator({ 
	// 	totalrecords: rec_count,
	// 	recordsperpage: 10, 
	// 	datacontainer: 'mts', 
	// 	dataelement: 'tr',
	// 	theme: 'custom',
	// 	initval:0,
	// 	onchange: this.onPageChange
	// });	
	$('#mts').dataTable({
		"aoColumns": [
                { "sType": 'numeric'  },
                null,
                null,
                null,
                null
            ],

		"bPaginate": true,
		"sPaginationType": "full_numbers",
		"bSortClasses": false,
		 "aoColumnDefs" : [ {
             'bSortable' : false,
             'aTargets' : [2,3,4]
         }, { "bSearchable": false, "aTargets": [2,3,4] }]});

objAccessCode.grantPermission();
}

// Update user
AccessCode.prototype.deleteAccessCode = function(accessCode) {

/////////////////////////
document.getElementById('viewMsg').innerHTML="Are you sure to delete access code "+accessCode+" ?";
	jQuery.fn.extend({
			propAttr: $.fn.prop || $.fn.attr
	});
	$("#dialog-confirm").show();
	$(function() {
		$( "#dialog-confirm" ).dialog({
			resizable: false,
			height:150,
			width:400,
			modal: true,
			buttons: {
				"Continue": function() {
						var request_data = '{"action":"DELETE_ACCESS_CODE", "access_code":"' + accessCode + '"}';
						response_data = obj_common.ajaxRequest(YAWS_PATH, request_data);

						if ('ok' == response_data[0].status) 
						{
							objApp.setFlash('success', response_data[0].message);
							objAccessCode.getAccessCode();
						} 
						else 
						{
							objApp.setFlash('error', response_data[0].message);
						}

					$( this ).dialog( "close" );
				},
				Cancel: function() {
					$( this ).dialog( "close" );
					return false;
				}
			}
		});
	});


}


// Update user
AccessCode.prototype.loadAccessCode = function(accessCode) {
	
	$('#access_save').hide();
	$('#access_update').show();
	$('#acc_num').attr("readonly", true);

	var request_data = '{"action":"LOAD_ACCESS_CODE", "access_code":"' + accessCode + '"}';
	response_data = obj_common.ajaxRequest(YAWS_PATH, request_data);

	if (response_data[0]) 
	{
		$('#acc_num').val(response_data[0].acc_nbr);
		$('#app_type').val(response_data[0].app_type);
		$('#adjc_type').val(response_data[0].adjc_type.replace(/'/g , ""));
		$('#login_url').val(response_data[0].login_url);
		$('#logout_url').val(response_data[0].logout_url);
		$('#cc_type').val(response_data[0].cc_type);
		$('#silence_type').val(response_data[0].silence_detection_type);
		$('#dtmf').val(response_data[0].dtmf).change();
		$('#dtmf_pyld').val(response_data[0].dtmf_payload);
		$('#description').val(response_data[0].description);
		$('#dci_data').val(response_data[0].dci_data);
		$('#a_law').val("8").attr("readonly", true);
		$('#mu_law').val("0").attr("readonly", true);
		$('#acc_type').val(response_data[0].acc_type);
		$('#video_mpeg4').val(response_data[0].mpeg4_payload); 
		$('#video_h263').val(response_data[0].h263_2429_payload); 
		$('#video_h264').val(response_data[0].h264_payload); 
		$('#audio_g723').val(response_data[0].g723_payload); 
		$('#audio_g729').val(response_data[0].g729_payload); 

		if(response_data[0].cc_type=="0"){
			$("#early_media").attr("disabled", true);
		}
		else{
			$("#early_media").attr("disabled", false);
		}
		
		if (response_data[0].audio_amr != 0)
		{
			$('#audio_amr').val(response_data[0].audio_amr);
		}

		if (response_data[0].audio_namr != 0)
		{
		$('#pload2').show();
			$('#audio_namr').val(response_data[0].audio_namr);
		}else{
		$('#pload2').hide();
		}
		
		$('#audio_cdc_lst').val(response_data[0].audio_cdc_lst+",");
		var audio_codecs = response_data[0].audio_cdc_lst;
		var codecs_arr = audio_codecs.split(",");

		var video_codecs = response_data[0].video_codec_list;
		var video_arr = video_codecs.split(",");

		if (codecs_arr.indexOf("7") != -1)
		{
			$('#check_mu_law').prop('checked', true);
		}
		else
		{
			$('#check_mu_law').prop('checked', false);
		}

		if (codecs_arr.indexOf("6") != -1)
		{
			$('#check_a_law').prop('checked', true);
		}
		else
		{
			$('#check_a_law').prop('checked', false);
		}
		if (codecs_arr.indexOf("8") != -1)
		{
			$('#check_g723').prop('checked', true);
			$('#audio_g723').show();
		}
		else
		{
			$('#check_g723').prop('checked', false);
			$('#audio_g723').hide();
		}
		if (codecs_arr.indexOf("9") != -1)
		{
			$('#check_g729').prop('checked', true);
			$('#audio_g729').show();
		}
		else
		{
			$('#check_g729').prop('checked', false);
			$('#audio_g729').hide();
		}

		if (codecs_arr.indexOf("4353") != -1)
		{
			$('#check_namr').prop('checked', true);
			$('#audio_namr').show();
		}
		else
		{
			$('#check_namr').prop('checked', false);
			$('#audio_namr').val("");
		}

		if (codecs_arr.indexOf("4354") != -1)
		{
			$('#check_amr').prop('checked', true);
			$('#audio_amr').show();
		}
		else
		{
			$('#check_amr').prop('checked', false);
			$('#audio_amr').val("");
		}

		if (video_arr.indexOf("5121") != -1)
		{
			$('#check_h264').prop('checked', true);
			$('#video_h264').show();
		}
		else
		{
			$('#check_h264').prop('checked', false);
			$('#video_h264').val("");
		}

		if (video_arr.indexOf("4608") != -1)
		{
			$('#check_h263').prop('checked', true);
			$('#video_h263').show();
		}
		else
		{
			$('#check_h263').prop('checked', false);
			$('#video_h263').val("");
		}
		if (video_arr.indexOf("4865") != -1)
		{
			$('#check_mpeg4').prop('checked', true);
			$('#video_mpeg4').show();
		}
		else
		{
			$('#check_mpeg4').prop('checked', false);
			$('#video_mpeg4').val("");
		}

		

		if (response_data[0].acc_code_status == 1)
		{
			$('#acc_code_status').prop('checked', true);
		}
		else
		{
			$('#acc_code_status').prop('checked', false);
		}

		if (response_data[0].gen_dtmf == 1)
		{
			$('#gen_dtmf').prop('checked', true);
		}
		else
		{
			$('#gen_dtmf').prop('checked', false);
		}

		if (response_data[0].cnf_support == 1)
		{
			$('#cnf_support').prop('checked', true);
		}
		else
		{
			$('#cnf_support').prop('checked', false);
		}

		if (response_data[0].cnf_re_invite == 1)
		{
			$('#cnf_re_invite_support').prop('checked', true);
		}
		else
		{
			$('#cnf_re_invite_support').prop('checked', false);
		}

		if (response_data[0].stream_re_invite == 1)
		{
			$('#stream_re_invite').prop('checked', true);
		}
		else
		{
			$('#stream_re_invite').prop('checked', false);
		}

		if (response_data[0].gen_dtmf== 1)
		{
			$('#gen_dtmf').prop('checked', true);
		}
		else
		{
			$('#gen_dtmf').prop('checked', false);
		}

		if (response_data[0].early_media== 1)
		{
			$('#early_media').prop('checked', true);
			var preval=$("#cc_type").val();
			$("#cc_type").find('[value="0"]').remove();
			$("#cc_type").val(preval);
		}
		else
		{
			$('#early_media').prop('checked', false);
			var preval=$("#cc_type").val();
			$("#cc_type").empty()
			objAccessCode.getCallCtrlTypes('#cc_type');
			$("#cc_type").val(preval);
		}


	}
	else
	{
		objApp.setFlash('error', "Access Code data loadig failed");
	}
}

AccessCode.prototype.viewAccessCode = function(accessCode) {

var request_data = '{"action":"LOAD_ACCESS_CODE", "access_code":"' + accessCode + '"}';
	response_data = obj_common.ajaxRequest(YAWS_PATH, request_data);

	if (response_data[0]) 
	{
		var dtmf = (response_data[0].dtmf == 0 ? "SIP Info":"RFC 2833");

		var silence_detection_type = (response_data[0].silence_detection_type == 1 ? "Enable":"Disable");
		var stream_re_invite = (response_data[0].stream_re_invite == 1 ? "Enable":"Disable");
		var acc_code_status = (response_data[0].acc_code_status == 1 ? "Enable":"Disable");
		var early_media = (response_data[0].early_media == 1 ? "Enable":"Disable");
		var cnf_support = (response_data[0].cnf_support == 1 ? "Enable":"Disable");
		var generate_dtmf = (response_data[0].generate_dtmf == 1 ? "Enable":"Disable");
		var cnf_re_invite = (response_data[0].cnf_re_invite == 1 ? "Enable":"Disable");

		if (response_data[0].cc_type == 0) {
			var callc_type = 'Full Control';
		} else if (response_data[0].cc_type == 1) {
			var callc_type = 'Half Control';
		} else {
			var callc_type = 'App Server Control';
		}

		var table = ''
				+'<table style="word-break:break-all;table-layout:fixed;width:800px;" width = "800px" align="center" cellspacing="0" cellpadding="0" border="0" class="fancytbl" >'
					+'<tr>'
						+'<td width="25%" style="text-align:right;color: #B54848;">Access Number</td>'
						+'<td width="25%">: '+response_data[0].acc_nbr+'</td>'
						+'<td width="5%">&nbsp;</td>'
						+'<td width="20%" style="text-align:right;color: #B54848;">Application Type</td>'
						+'<td width="25%">: '+response_data[0].app_type+'</td>'
					+'</tr>'

					+'<tr>'
						+'<td style="text-align:right;color: #B54848;">DTMF</td>'
						+'<td>: '+dtmf+'</td>'
						+'<td width="5%">&nbsp;</td>'
						+'<td style="text-align:right;color: #B54848;">DTMF Payload</td>'
						+'<td>: '+response_data[0].dtmf_payload+'</td>'
					+'</tr>'					
					+'<tr>'
						+'<td style="text-align:right;color: #B54848;">Silence Detection Type</td>'
						+'<td>: '+silence_detection_type+'</td>'
						+'<td>&nbsp;</td>'
						+'<td style="text-align:right;color: #B54848;">Stream Re-Invite</td>'
						+'<td>: '+stream_re_invite+'</td>'
					+'</tr>'
					+'<tr>'
						+'<td style="text-align:right;color: #B54848;">Activate the Access Code</td>'
						+'<td>: '+acc_code_status+'</td>'
						+'<td>&nbsp;</td>'
						+'<td style="text-align:right;color: #B54848;">Early Media</td>'
						+'<td>: '+early_media+'</td>'
					+'</tr>'
					+'<tr>'
						+'<td style="text-align:right;color: #B54848;">Conference Support</td>'
						+'<td>: '+cnf_support+'</td>'
						+'<td>&nbsp;</td>'
						+'<td style="text-align:right;color: #B54848;">Generate DTMF</td>'
						+'<td>: '+generate_dtmf+'</td>'
					+'</tr>'
					+'<tr>'
						+'<td style="text-align:right;color: #B54848;">Conference Re-Invite</td>'
						+'<td>: '+cnf_re_invite+'</td>'
						+'<td>&nbsp;</td>'
						+'<td style="text-align:right;color: #B54848;">Call Controll Type</td>'
						+'<td>'+callc_type+'</td>'
					+'</tr>'
					+'<tr>'
						+'<td style="text-align:right; color: #B54848;">Adjecent Node</td>'
						+'<td>: '+response_data[0].adjc_type+'</td>'
						+'<td>&nbsp;</td>'
						+'<td style="text-align:right; color: #B54848;">Description</td>'
						+'<td>: '+response_data[0].description+'</td>'
					+'</tr>'
						+'<tr>'
						+'<td style="text-align:right;color: #B54848;">Login URL</td>'
						+'<td colspan=4 width=100%>: '+response_data[0].login_url+'</td>'						 
					+'</tr>'
					+'<tr>'
						+'<td style="text-align:right;color: #B54848;">Logout URL</td>'
						+'<td colspan=4 width=100%>: '+response_data[0].logout_url+'</td>'						 
					+'</tr>'
					+'<tr>'
						+'<td style="text-align:right;color: #B54848;">Access Type</td>'
						+'<td>: '+response_data[0].acc_type+'</td>'
						+'<td>&nbsp;</td>'
						+'<td>&nbsp;</td>'
						/*
						+'<td style="text-align:right;color: #B54848;">DCI Data</td>'
						+'<td>: '+response_data[0].dci_data+'</td>'
						*/
						+'<td>&nbsp;</td>'
				 
					+'</tr>'

					+'<tr>'
						+'<td style="text-align:right; border-bottom:2px solid #B54848;color: #B54848;"></td>'
						+'<td style="border-bottom:2px solid #B54848;"></td>'
						+'<td style="border-bottom:2px solid #B54848;">&nbsp;</td>'
						+'<td style="text-align:right; border-bottom:2px solid #B54848;color: #B54848;"></td>'
						+'<td style="border-bottom:2px solid #B54848;"></td>'
					+'</tr>'
					+'<tr>'
						+'<td style="text-align:right; color: #B54848;">Audio Codec List</td>'
						+'<td colspan="4">: '+getAudioCodeListFromNumber(response_data[0].audio_cdc_lst)+'</td>'
					 +'</tr>'
					 
					
										
					+'<tr>'
						+'<td style="text-align:right; border-bottom:2px solid #B54848;color: #B54848;"></td>'
						+'<td style="border-bottom:2px solid #B54848;"></td>'
						+'<td style="border-bottom:2px solid #B54848;">&nbsp;</td>'
						+'<td style="text-align:right; border-bottom:2px solid #B54848;color: #B54848;"></td>'
						+'<td style="border-bottom:2px solid #B54848;"></td>'
					+'</tr>'
							
					/*
					+'<tr>'
						+'<td style="text-align:right; color: #B54848;">Video Codec List</td>'
						+'<td>: '+response_data[0].video_codec_list+'</td>'
						+'<td colspan="4">&nbsp;</td>'
						+'<td colspan="4">&nbsp;</td>'
						+'<td colspan="4">&nbsp;</td>'
					+'</tr>'
					*/

				+'</table>';

	$( "#dialog" ).html(table).dialog( "open" );
	}

}

AccessCode.prototype.grantPermission = function() {
	if(objApp.checkPermission('ivr_create_access_code')){
		$('#frm_crt_access_code').show();
		$('#create-tbl2').show();
		$('#access_code_create_div').show();
	}
	if(objApp.checkPermission('ivr_view_access_codes_table')){
		$('#access_tbl').show();
	}
//	if(objApp.checkPermission('ivr_view_access_code')){
//		$('.viewBtn').show();
//	}
//	if(objApp.checkPermission('ivr_edit_access_code')){
//		$('.editBtn').show();
//	}
//	if(objApp.checkPermission('ivr_delete_access_code')){
//		$('.deleteBtn').show();
//	}	
}

var objAccessCode = new AccessCode();
var obj_common = new Common();

jQuery(document).ready(function() {

	//disble erly media at page load
	$("#early_media").attr("disabled", true);

	$('#frm_crt_access_code').hide();
	$('#create-tbl2').hide();
	$('#access_tbl').hide();
	$('.ui-icon-alert').hide();
	$('#frm_crt_access_code').validationEngine({'custom_error_messages' : {
	}
	});

	$('#access_save').show();
	$('#access_update').hide();
	$('#audio_amr').hide();
	$('#audio_namr').hide();
	$('#audio_g723').hide();
	$('#audio_g729').hide();
	$('#video_h264').hide();
	$('#video_h263').hide();
	$('#video_mpeg4').hide();
	$('#access_code_create_div').hide();

	objAccessCode.getAccessCode();

	//Saving general configurations
	$('#access_save').bind("click", function () {
		if($("#frm_crt_access_code").validationEngine('validate')) {
			objAccessCode.createAccessCode(false);  				
			return false;
		}
		return false;
	});

	//Updating general configurations
	$('#access_update').bind("click", function () {
		if($("#frm_crt_access_code").validationEngine('validate')) {
			objAccessCode.createAccessCode(true);  				
			return false;
		}
		return false;
	});

	$('#access_reset').bind("click", function () {
		obj_common.resetForm($("#frm_crt_access_code"));
		$('#access_update').hide();
		$('#access_save').show();
		$('#acc_num').attr("readonly", false);
		$('#audio_amr').hide();
		$('#audio_namr').hide();
		$('#audio_g723').hide();
		$('#audio_g729').hide();
		$('#video_h264').hide();
		$('#video_h263').hide();
		$('#video_mpeg4').hide();
		$('#access_code_create_div').hide();
		$('#pload2').hide();
		$('#frm_crt_access_code').validationEngine('hideAll');
		$("#early_media").attr("disabled", true);
		$("#cc_type").empty()
		objAccessCode.getCallCtrlTypes('#cc_type');

		if ($('#dtmf').val() == 0) {
			$('#dtmf_pyld').val("500").hide();
			$('#pyld').hide();
		} else {
			$('#dtmf_pyld').val("").show();
			$('#pyld').show();
		}
		$cdc_lst.val("");
		$video_cdc_lst.val("");
		return false;
	});

	var $cdc_lst = $('#audio_cdc_lst');
	var $video_cdc_lst = $('#video_cdc_lst');

	$('#check_a_law').bind("click", function () {
		if (document.getElementById('check_a_law').checked) {
			$cdc_lst.val($cdc_lst.val() + "6,");
		} else {
			var exists = $('#audio_cdc_lst').val();
			exists = exists.replace('6,', '');
			$('#audio_cdc_lst').val(exists);
		}
	});

	$('#check_mu_law').bind("click", function () {
		if (document.getElementById('check_mu_law').checked) {
			$cdc_lst.val($cdc_lst.val() + "7,");
		} else {
			var exists2 = $('#audio_cdc_lst').val();
			exists2 = exists2.replace('7,', '');
			$('#audio_cdc_lst').val(exists2);
		}
	});

	$('#acc_code_status').bind("click", function () {
		if (document.getElementById('acc_code_status').checked) {
			$('#acc_code_status').val("1");
		} else {
			$('#acc_code_status').val("0");
		}
	});

	$('#gen_dtmf').bind("click", function () {
		if (document.getElementById('gen_dtmf').checked) {
			$('#gen_dtmf').val("1");
		} else {
			$('#gen_dtmf').val("0");
		}
	});




	$('#check_amr').bind("click", function () {
		if (document.getElementById('check_amr').checked) {
			if ($('#audio_cdc_lst').val().indexOf('4354,') === -1) {
				$cdc_lst.val($cdc_lst.val() + "4354,");
			}
			$('#pload1').show();
			$('#audio_amr').show();
		} else {
			var exists3 = $('#audio_cdc_lst').val();
			exists3 = exists3.replace('4354,', '');
			$('#audio_cdc_lst').val(exists3);
			$('#audio_amr').hide();
			$('#pload1').hide();
			$('#audio_amr').val("");
		}
	});


	$('#check_namr').bind("click", function () {
		if (document.getElementById('check_namr').checked) {
			if ($('#audio_cdc_lst').val().indexOf('4353,') === -1) {
				$cdc_lst.val($cdc_lst.val() + "4353,");
			}
			
			$('#pload2').show();
			$('#audio_namr').show();
		} else {
			var exists3 = $('#audio_cdc_lst').val();
			exists3 = exists3.replace('4353,', '');
			$('#audio_cdc_lst').val(exists3);
			$('#audio_namr').hide();
			$('#pload2').hide();
			$('#audio_namr').val("");
		}
	});

	if ($('#dtmf').val() == 0) {
		$('#dtmf_pyld').val("500").hide();
		$('#pyld').hide();
	} else {
		$('#dtmf_pyld').val("").show();
		$('#pyld').show();
	}
	
	$('#dtmf').change(function() {
		if ($('#dtmf').val() == 0) {
			$('#dtmf_pyld').val("500").hide();
			$('#pyld').hide();
		} else {
			$('#dtmf_pyld').val("").show();
			$('#pyld').show();
			
		}
	});


	$('#check_g723').bind("click", function () {
		if (document.getElementById('check_g723').checked) {
			if ($('#audio_cdc_lst').val().indexOf('8,') === -1) {
				$cdc_lst.val($cdc_lst.val() + "8,");
			}
			 $('#audio_g723').val("4");
			 $('#audio_g723').hide();
		 
			
		} else {
			var exists3 = $('#audio_cdc_lst').val();
			exists3 = exists3.replace('8,', '');
			$('#audio_cdc_lst').val(exists3);
			 $('#audio_g723').val("4");
			$('#audio_g723').hide();
		}
	});

	$('#check_g729').bind("click", function () {
		if (document.getElementById('check_g729').checked) {
			if ($('#audio_cdc_lst').val().indexOf('9,') === -1) {
				$cdc_lst.val($cdc_lst.val() + "9,");
			}
			
			$('#audio_g729').val("18");
			$('#audio_g729').hide();
		} else {
			var exists3 = $('#audio_cdc_lst').val();
			exists3 = exists3.replace('9,', '');
			$('#audio_cdc_lst').val(exists3);
			
			$('#audio_g729').val("18");
			$('#audio_g729').hide();
		}
	});

	$('#check_mpeg4').bind("click", function () {
		if (document.getElementById('check_mpeg4').checked) {
			if ($('#video_cdc_lst').val().indexOf('4865,') === -1) {
				$video_cdc_lst.val($video_cdc_lst.val() + "4865,");
			}
			$('#video_mpeg4').show();
		} else {
			var exists3 = $('#video_cdc_lst').val();
			exists3 = exists3.replace('4865,', '');
			$('#video_cdc_lst').val(exists3);
			$('#video_mpeg4').hide();
			$('#video_mpeg4').val("");
		}
	});

	$('#check_h263').bind("click", function () {
		if (document.getElementById('check_h263').checked) {
			if ($('#video_cdc_lst').val().indexOf('4608,') === -1) {
				$video_cdc_lst.val($video_cdc_lst.val() + "4608,");
			}
			$('#video_h263').show();
		} else {
			var exists3 = $('#video_cdc_lst').val();
			exists3 = exists3.replace('4608,', '');
			$('#video_cdc_lst').val(exists3);
			$('#video_h263').hide();
			$('#video_h263').val("");
		}
	});

	$('#check_h264').bind("click", function () {
		if (document.getElementById('check_h264').checked) {
			if ($('#video_cdc_lst').val().indexOf('5121,') === -1) {
				$video_cdc_lst.val($video_cdc_lst.val() + "5121,");
			}
			$('#video_h264').show();
		} else {
			var exists3 = $('#video_cdc_lst').val();
			exists3 = exists3.replace('5121,', '');
			$('#video_cdc_lst').val(exists3);
			$('#video_h264').hide();
			$('#video_h264').val("");
		}
	});


	$('#cc_type').bind("change", function () {
		if ($('#cc_type').val() == "0") {
			$("#early_media").attr("checked", false);
			$("#early_media").attr("disabled", true);
		} else if ($('#cc_type').val() == "1") {
			$("#early_media").attr("disabled", false);
		} else if($('#cc_type').val() == "2"){
			$("#early_media").attr("disabled", false);
		}

	});

	$('#early_media').bind("change", function () {
		if ($("#early_media").is(':checked')) {
				var preval=$("#cc_type").val();
				$("#cc_type").find('[value="0"]').remove();
				$("#cc_type").val(preval);
		}
		 else {
		 	var preval=$("#cc_type").val();
			$("#cc_type").empty()
			objAccessCode.getCallCtrlTypes('#cc_type');
			$("#cc_type").val(preval);
		}

	});

	


	objAccessCode.grantPermission();
});


function getAudioCodeListFromNumber(list){
	var audio_Codec_List =list.split(',');
	for (i = 0; i < audio_Codec_List.length; i++) { 
		 if(audio_Codec_List[i]=='4354'){
			audio_Codec_List[i]='Wide Band AMR ';
		 }else if(audio_Codec_List[i]=='8'){
		 audio_Codec_List[i]='G723';
		 }else if(audio_Codec_List[i]=='9'){
		 audio_Codec_List[i]='G729';
		 }else if(audio_Codec_List[i]=='4353'){
		 audio_Codec_List[i]='Narrow Band AMR';
		 }else if(audio_Codec_List[i]=='7'){
		 audio_Codec_List[i]='G711 Mu law (0)';
		 }else if(audio_Codec_List[i]=='6'){
		 audio_Codec_List[i]='G711 A law (8)';
		 }
	} 
	return audio_Codec_List;
}

