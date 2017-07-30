/*
 * Handle Other settings page in 
 * main configuration page
 */
var CONF_YAWS = config.yaws_file_path + 'configuration_manager.yaws';
var traceNumberCount=0;
function OtherSettings() {
	
}

OtherSettings.prototype.getLogLevels = function(id) {
	var levels = config.log_levels;

	i = 0;
	for (var key in levels) { 
		var value = $.parseJSON(JSON.stringify(levels[key]));
		$(id).append($('<option/>')
		.attr("value", key)
		.text(value[i]));
		i++;
	}
}


OtherSettings.prototype.getCallTypes = function(id) {
	var call_types = config.call_types;
	i = 0;
	for (var key in call_types) { 
		var value = call_types[key];
		$(id).append($('<option/>')
		.attr("value", value[i])
		.text(value[i]));
		i++;
	}
}

OtherSettings.prototype.getAudioCodecs = function(id) {
	var audio_codecs = config.audio_codecs;
	for (var key in audio_codecs) { 
		var value = audio_codecs[key];
		$(id).append($('<option/>')
		.attr("value", value["value"])
		.text(value["description"]));
	}
}

OtherSettings.prototype.getVideoCodecs = function(id) 
{
	var video_codecs = config.video_codecs;
	for (var key in video_codecs) 
	{ 
		var value = video_codecs[key];
		$(id).append($('<option/>')
		.attr("value", value["value"])
		.text(value["description"]));
	}
}

OtherSettings.prototype.getPassBlock = function(id) 
{
	var pass_block = config.pass_block;
	for (var key in pass_block) 
	{ 
		var value = pass_block[key];
		$(id).append($('<option/>')
		.attr("value", value["value"])
		.text(value["description"]));
	}
}

OtherSettings.prototype.getDefValues = function(id) 
{
	var def_vals = config.def_val;
	i = 0;
	for (var key in def_vals) 
	{ 
		var value = def_vals[key];
		$(id).append($('<option/>')
		.attr("value", key)
		.text(value[i]));
		i++;
	}
}

OtherSettings.prototype.getDtmfVals = function(id) 
{
	var dtmf_vals = config.dtmf_vals;
	i = 0;
	for (var key in dtmf_vals) 
	{ 
		var value = $.parseJSON(JSON.stringify(dtmf_vals[key]));
		$(id).append($('<option/>')
		.attr("value", key)
		.text(value[i]));
		i++;
	}
}


OtherSettings.prototype.getSilenceType = function(id) 
{
	var silnce_type = config.silnce_type;
	i = 0;
	for (var key in silnce_type) 
	{ 
		var value = $.parseJSON(JSON.stringify(silnce_type[key]));
		$(id).append($('<option/>')
		.attr("value", key)
		.text(value[i]));
		i++;
	}
}


OtherSettings.prototype.saveLogLevels = function() 
{
	var fields = $('#frm_log_levels').serializeArray();
	
	var request_data = '{"action":"SAVE_LOG_LEVELS",';
	
	jQuery.each(fields, function(i, field) {
		request_data += '"' + field.name + '":"' + field.value + '",';
	});	
	
	request_data = request_data.slice(0,(request_data.length-1)); 	//Removing trailing comma ,	
	request_data += '}';	
	response_data = obj_common.ajaxRequest(CONF_YAWS, request_data);

	if ('ok' == response_data[0].status) 
	{
		objApp.setFlash('success', response_data[0].reason);
	} 
	else 
	{
		objApp.setFlash('error', response_data[0].reason);
	}
}



OtherSettings.prototype.getConfValues = function() 
{
	
	var request_data = '{"action":"GET_CONF_VALUES"}';

	response_data = obj_common.ajaxRequest(CONF_YAWS, request_data);

	if ('ok' == response_data[0].status) 
	{
		// Getting and loading general configuration data
		var gen_data = response_data[0].message[0].gen_data.split("|");

		$("#node_desc").val(gen_data[0]);
		$("#max_douts").val(gen_data[1]);
		$("#chanfree_timeout").val(gen_data[2]);
		$("#cmn_blocklist").val(gen_data[3]);
		$("#dout_call_type").val(gen_data[4]);
		$("#reinvite_timeout").val(gen_data[5]);
	
		// Getting and loading http configuration data
		var http_request = response_data[0].message[1].http_request.split("|");
		$("#http_time_out").val(http_request[0]);
		$("#http_down_dir").val(http_request[1]);
		$("#http_cache_timeout").val(http_request[2]);
		$("#http_file_chk_freq").val(http_request[3]);

		// Getting and loading digit configuration data

		var digit_data = response_data[0].message[2].digit_data.split("|");
		$("#digit_dtmf").val(digit_data[0]);
		if($("#digit_dtmf").val()=="0"){
			$("#dtmf_payload").hide();
		}
		$("#digit_max_digits").val(digit_data[3]);
		$("#digit_dtmf_pyld").val(digit_data[1]);
		$("#digit_gnrt_dtmf").val(digit_data[2]);
		$("#digit_frst_tout").val(digit_data[4]);
		$("#digit_inter_tout").val(digit_data[5]);

		// Getting and loading record configuration data
		var record_data = response_data[0].message[3].rec_data.split("|");
		$("#rec_max_time").val(record_data[0]);
		$("#rec_voice_tout").val(record_data[1]);
		$("#rec_sil_tout").val(record_data[2]);
		$("#rec_sil_ampl").val(record_data[3]);
		$("#silnce_det_type").val(record_data[4]);

		// Getting and loading play configuration data
		var play_data = response_data[0].message[4].play_data.split("|");
		$("#ply_max_count").val(play_data[0]);

		// Getting and loading codec configuration data
		var codec_data = response_data[0].message[5].codec_data.split("|");
		$("#codec_video_frmt").val(codec_data[0]);
		$("#codec_audio_frmt").val(codec_data[1]);

		// Getting and loading silence configuration data
		//var silence_data = response_data[0].message[6].silence_data.split("|");
		//$("#silnce_det_type").val(silence_data[0]);

		// Getting and loading rtcp configuration data
		var rtcp_data = response_data[0].message[6].rtcp_data.split("|");
		$("#rtcp_support").val(rtcp_data[0]);
		$("#rtcp_pkt_intrvl").val(rtcp_data[1]);
		$("#rtcp_recve_tout").val(rtcp_data[2]);

		// Getting and loading amr configuration data
		var amr_data = response_data[0].message[7].amr_data.split("|");
		$("#amr_oct_algn").val(amr_data[0]);
		$("#amr_intr_lvng").val(amr_data[1]);
		$("#amr_crc").val(amr_data[2]);

		// Getting and loading fax configuration data
		var fax_data = response_data[0].message[8].fax_data.split("|");
		$("#fax_supprt").val(fax_data[0]);
		
		// Getting and loading number list configuration data
		var number_list_data = response_data[0].message[9].number_list_data.split("|");
		$("#nbr_lst_chk").val(number_list_data[0]);
		$("#nbr_lst_wba").val(number_list_data[1]);

		// Getting and loading ivr status configuration data
		var ivr_status_data = response_data[0].message[10].ivr_status_data.split("|");
		$("#ivr_notfy_url").val(ivr_status_data[0]);

		// Getting and loading snmp status configuration data
		var snmp_data = response_data[0].message[11].snmp_data.split("|");
		$("#snmp_time_val").val(snmp_data[0]);

	} 
	else
	{
		return "error";
	}
}


OtherSettings.prototype.saveConfigurations = function(conf_type, data_form) {
	$("#dtmf_payload").show();
	var fields = $(data_form).serializeArray();
	if($("#digit_dtmf").val()=="0"){
			$("#dtmf_payload").hide();
		}
	var request_data = '{"action":"UPDATE_CONF_VALUES", "conf_type":"'+conf_type+'"';
	jQuery.each(fields, function(i, field) {
		value = field.value.trim();
		request_data += ',"' + field.name + '":"' + value + '"';
	});
	request_data += '}';

	response_data = obj_common.ajaxRequest(CONF_YAWS, request_data);
	
	if ('ok' == response_data[0].status)
	{
		objApp.setLocalFlash('success', response_data[0].message,"#"+conf_type);

	}
	else
	{
		objApp.setLocalFlash('error', response_data[0].message,"#"+conf_type);
	}

	return false;
}




// //update log level of given number
// OtherSettings.prototype.updateNumber = function(number) {
	
// 	var pltfm_log_lvl=$('#numberPlat'+number).val();
// 	var app_log_lvl	=$('#numberApp'+number).val();
// 	var request_data = '{"action":"UPDATE_NUMBERS","number":"'+number+'","pltfm_log_lvl":"'+pltfm_log_lvl+'","app_log_lvl":"'+app_log_lvl+'"}';
// 	console.log(request_data);
// 	response_data = obj_common.ajaxRequest(CONF_YAWS, request_data);

// 	if ('ok' == response_data[0].status) {
// 		objApp.setFlash('success', response_data[0].message);
// 	} else {
// 		objApp.setFlash('error', response_data[0].message);
// 	}
// 	return false;
// }

//update log level of given chanel
OtherSettings.prototype.updateChannel = function(channel) {
	
	var pltfm_log_lvl=$('#channelPlat'+channel).val();
	var app_log_lvl	=$('#channelApp'+channel).val();
	var request_data = '{"action":"UPDATE_CHANNELS","node":"'+$("#server_id").val()+'","channel":"'+channel+'","pltfm_log_lvl":"'+pltfm_log_lvl+'","app_log_lvl":"'+app_log_lvl+'"}';

	response_data = obj_common.ajaxRequest(CONF_YAWS, request_data);

	if ('ok' == response_data[0].status) {
		objApp.setLocalFlash('success', response_data[0].message,"#channel_flash");
	} else {
		objApp.setLocalFlash('error', response_data[0].message,"#channel_flash");
	}
	return false;
}

//Retrieve all numbers and display in table
OtherSettings.prototype.listNumbers = function () {
	var obj_common = new Common();
	var request_data = '{"action":"GET_ALL_NUMBERS"}';
	response_data = obj_common.ajaxRequest(CONF_YAWS, request_data);
	var rec_list 	= '';
	var rec_count 	= 0; 
	var checked  	= "checked";
	var max_rec_count=config.number_of_numbers;
		for (var i=0;i<max_rec_count;i++) {
			rec_count++;
			if(response_data.length-1>=i){
				checked  	= "checked";
			}
			else{
				checked  	= "";
			}
			var chk_str = (response_data.length-1>=i?response_data[i].id+"|"+response_data[i].platform+"|"+response_data[i].application:"empthy");
			rec_list += '<tr>'
				+ '<td><input type="checkbox" name="chk_number" id="chk_number_' +i+ '" value="' + chk_str + '" ' + checked + '/></td>'
				+ '<td><input type="text" id="number'+i+'" value="' +(response_data.length-1>=i?response_data[i].id:"") + '" data-validation-engine="validate[custom[integer]]"></td>'
				+ '<td class="numberPlatList"><select style="width:100%;" id="numberPlat'+i+'">'+objOthset.newLogLevels(response_data.length-1>=i?response_data[i].platform:0)+'</select></td>'
				+ '<td class="numberAppList"><select style="width:100%;" id="numberApp'+i+'">'+objOthset.newLogLevels(response_data.length-1>=i?response_data[i].application:0)+'</select></td>'	
			+ '</tr>'; 
		}
	var list_table = ''	
	+ '<table border="0" align="center" cellpadding="0" cellspacing="1" class="results_mini" id="mt">'
		+ '<tr>'
			+ '<th width="4%"><input type="checkbox" name="numberChkAll" id="numberChkAll" onChange="obj_common.checkUncheckAll(\'numberChkAll\',\'chk_number\')" onClick="obj_common.checkUncheckAll(\'numberChkAll\',\'chk_number\')" id="numberChkAll" /></th>'
			+ '<th width="20%">Number</th>'
			+ '<th width="20%" class="numberPlatList">Platform Log Level</th>'
			+ '<th width="20%" class="numberAppList">Application Log Level</th>'
		+ '</tr>'
		+ rec_list
	+ '</table>' 
	+ '<div id="pager" style="margin: auto;">';

	jQuery('#number_tbl').html(list_table);
	$('#pager').smartpaginator({ 
		totalrecords: rec_count,
		recordsperpage: 10,//config.rec_per_page, 
		datacontainer: 'mt', 
		dataelement: 'tr',
		theme: 'custom',
		initval:0,
		onchange: this.onPageChange
	});	
		
}

OtherSettings.prototype.listServerIds = function () {

	var obj_common = new Common();
	var request_data = '{"action":"GET_SERVER_IDS"}';
	response_data = obj_common.ajaxRequest(CONF_YAWS, request_data);
	var rec_list 	= '';
	var checked  	= "";
	var rec_count 	= 0; 
	if(response_data != '')
	{	
		var servers = document.getElementById('server_id');
		for (var i in response_data) {
			servers.options[servers.options.length] = new Option(response_data[i].id, response_data[i].node+","+response_data[i].cookie);
		}
		objOthset.listChannels(response_data[0].node+","+response_data[0].cookie);
	}
	else{
		
	}

}

//Retrieve channels and display in table
OtherSettings.prototype.listChannels = function (node) {
	var obj_common = new Common();
	var request_data = '{"action":"GET_ALL_CHANNELS","node":"'+node+'"}';
	response_data = obj_common.ajaxRequest(CONF_YAWS, request_data);
	var rec_list 	= '';
	var checked  	= "";
	var rec_count 	= 0; 
	if(response_data != '')
	{	
		for (var i in response_data) {
			for (var j in response_data[i].data) {
				rec_count++;
				var link_submit = '<a href="#" class="chanel_links" onClick="objOthset.updateChannel(' + response_data[i].data[j].id + ');return false;"><button style="width:100%;" value="update">Update</button>';//<img align="absmiddle" src="' + config.image_path + 'ico_view.png"/></a>'; 
				var chk_str = response_data[i].data[j].id;
				rec_list += '<tr>'
					+ '<td><input type="checkbox" class="'+response_data[i].server+'"name="chk_channel" id="chk_channel_' + response_data[i].data[j].id + '" value="' + chk_str + '" ' + checked + '/></td>'
					+ '<td>' + response_data[i].data[j].id + '</td>'
					+ '<td class="channelPlatList"><select style="width:100%;" id="channelPlat'+response_data[i].data[j].id+'">'+objOthset.newLogLevels(response_data[i].data[j].platform)+'</select></td>'
					+ '<td class="channelAppList"><select style="width:100%;" id="channelApp'+response_data[i].data[j].id+'">'+objOthset.newLogLevels(response_data[i].data[j].application)+'</select></td>'	
					+ '<td align="center">' + link_submit  + '</a></td>'
				+ '</tr>'; 
			}
		}
	}
	else
	{
		rec_list += '<tr>'
			+ '<td colspan="8">No Channels</td>'
		+ '</tr>';		
	}		
	var list_table = ''	
	+ '<table border="0" align="center" cellpadding="0" cellspacing="1" class="results_mini" id="mts">'
		+ '<tr>'
			+ '<th width="4%"><input type="checkbox" name="channelChkAll" id="channelChkAll" onChange="obj_common.checkUncheckAll(\'channelChkAll\',\'chk_channel\')" onClick="obj_common.checkUncheckAll(\'channelChkAll\',\'chk_channel\')" id="channelChkAll" /></th>'
			+ '<th width="5%">Channel</th>'
			+ '<th width="18%" class="channelPlatList">Platform Log Level</th>'
			+ '<th width="20%" class="channelAppList">Application Log Level</th>'
			+ '<th width="6%"></th>'
		+ '</tr>'
		+ rec_list
	+ '</table>' 
	+ '<div id="pagers" style="margin: auto;">';
	jQuery('#channel_tbl').html(list_table);
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
OtherSettings.prototype.channelBulkUpdate = function() {
	if ($("[name=chk_channel]:checked").length == 0) {
			objApp.setLocalFlash('error', 'Please select atleast one record',"#channel_flash");
	} 
	else {
		var request_data = '{"action":"CHANNEL_BULK_UPDATE","node":"'+$("#server_id").val()+'",';		
		var selected_recs = '';
		$("input:checkbox[name=chk_channel]:checked").each(function() {
			selected_recs += $(this).val() + '#'+$("#channelPlat"+$(this).val()).val()+'#'+$("#channelApp"+$(this).val()).val()+'|';
		});
		request_data += '"channel":"' + selected_recs + '"}';
		response_data = obj_common.ajaxRequest(CONF_YAWS, request_data);
		if ('ok' == response_data[0].status) {
			objApp.setLocalFlash('success', response_data[0].message,"#channel_flash");
		} 
		else {
			objApp.setLocalFlash('error', response_data[0].message,"#channel_flash");
			if ("" != response_data[0].fail_list) {
				$('#failed_list').html('<div id="notice" class="notice">Status change failed for these retailers(s):<br />' + obj_common.wordwrap(obj_common.ltrim(response_data[0].fail_list, ','), 200, '<br />', true) + '</div>');
			}
		}
	}
	objOthset.listChannels($("#server_id").val());
	return false;
}

OtherSettings.prototype.numberBulkUpdate = function() {

	var request_data = '{"action":"NUMBER_BULK_UPDATE",';		
	var selected_recs='';
	for(var i=0;i<config.number_of_numbers;i++) {
		
		if($("#chk_number_"+i).is(':checked')){
			if($("#number"+i).val()!=""){
				var w=new RegExp($("#number"+i).val());
				if(w.test(selected_recs)){
					objApp.setLocalFlash('error',"duplicate numbers not allowed","#number_flash");	
					return false;
					}
					selected_recs += $("#number"+i).val() + '#'+$("#numberPlat"+i).val()+'#'+$("#numberApp"+i).val()+'|';

				}
		}	
		else{
				if($("#chk_number_"+i).val()!="empthy"){
					var logLevels=$("#chk_number_"+i).val().split("|");
					selected_recs += logLevels[0] + '#'+logLevels[1]+'#'+logLevels[2]+'|';
				
				}
			}
	}
	if(selected_recs==''){
		selected_recs='empthy';
	//	alert(selected_recs);
	}
	request_data += '"number":"' + selected_recs + '"}';
	response_data = obj_common.ajaxRequest(CONF_YAWS, request_data);
	if ('ok' == response_data[0].status) {
		objApp.setLocalFlash('success', response_data[0].message,"#number_flash");
	} 
	else {
		objApp.setLocalFlash('error', response_data[0].message,"#number_flash");
		if ("" != response_data[0].fail_list) {
			$('#failed_list').html('<div id="notice" class="notice">Status change failed for these retailers(s):<br />' + obj_common.wordwrap(obj_common.ltrim(response_data[0].fail_list, ','), 200, '<br />', true) + '</div>');
		}
	}
	objOthset.listNumbers();
	return false;
}

OtherSettings.prototype.numberBulkDelete = function() {

	var request_data = '{"action":"NUMBER_BULK_UPDATE",';		//this is not a bug ,delete numbers using updte function :)
	var selected_recs='';
	var select=true;
	for(var i=0;i<config.number_of_numbers;i++) {
		
		if($("#chk_number_"+i).is(':checked')){
			if($("#number"+i).val()!=""){
				select=false;
			}
		}	
		else{
				if($("#chk_number_"+i).val()!="empthy"){
					var logLevels=$("#chk_number_"+i).val().split("|");
					selected_recs += logLevels[0] + '#'+logLevels[1]+'#'+logLevels[2]+'|';
				
				}
			}
	}
	if(select){
		objApp.setLocalFlash('error', "Select at least one number to delete","#number_flash");
		return false;
	}
	if(selected_recs==''){
		selected_recs='empthy';
	//	alert(selected_recs);
	}
	request_data += '"number":"' + selected_recs + '"}';
	response_data = obj_common.ajaxRequest(CONF_YAWS, request_data);
	if ('ok' == response_data[0].status) {
		objApp.setLocalFlash('success', "Number log levels deleted.","#number_flash");
	} 
	else {
		objApp.setLocalFlash('error', "Number log levels delete failed.","number_flash");
		if ("" != response_data[0].fail_list) {
			$('#failed_list').html('<div id="notice" class="notice">Status change failed for these retailers(s):<br />' + obj_common.wordwrap(obj_common.ltrim(response_data[0].fail_list, ','), 200, '<br />', true) + '</div>');
		}
	}
	objOthset.listNumbers();
	return false;
}


OtherSettings.prototype.newLogLevels = function(level,currentValue) {
	
	var trigger_list =  config.channel_log_levels;
	var str = '';
		
	for (var i in trigger_list)
	{
		if (currentValue != null && currentValue == trigger_list[i].value) 
		{
			return trigger_list[i].description; // returning value when key is given
		}
		if(level==trigger_list[i].value){
			str += '<option value="' + trigger_list[i].value + '" selected>' + trigger_list[i].description + '</option>';
		}
		else
		{
			str += '<option value="' + trigger_list[i].value + '">' + trigger_list[i].description + '</option>';
		}	
	}
	
	return str;
}

OtherSettings.prototype.listTraceNumbers=function() {
	traceNumberCount=0;
	var obj_common = new Common();
	var request_data = '{"action":"GET_ALL_TRACE_NUMBERS"}';
	response_data = obj_common.ajaxRequest(CONF_YAWS, request_data);
	if(response_data != '')
	{
		for (var i in response_data) {

			if(traceNumberCount>=config.number_of_trace_numbers){
				break;
			}
			
			console.log("inside loope= "+traceNumberCount+"=="+config.number_of_trace_numbers);
			var row='<tr id="tr'+traceNumberCount+'"><td id="traceNum'+traceNumberCount+'">'+response_data[i].number+'</td><td width="10%"><input type="button" onclick="removeNumber('+ traceNumberCount+')" value="Remove" /></td></tr>';
			traceNumberCount++;
			$('#traceNumberList').append(row);	
		}

	}
	else{


	}
}
OtherSettings.prototype.updateTraceNumbers=function() {
	var request_data = '{"action":"TRACE_NUMBERS_UPDATE",';
	var numberList="";
	for (var i=0;i<traceNumberCount;i++){
		var num="#traceNum"+i;
		if($(num).val()!=undefined){
			numberList+=$(num).html()+",";
		}
	}
	numberList=numberList.slice(0,-1);

	request_data += '"numbers":"' + numberList + '"}';
	response_data = obj_common.ajaxRequest(CONF_YAWS, request_data);
	if ('ok' == response_data[0].status) {
		objApp.setLocalFlash('success', response_data[0].message,"#trace_flash");
	} 
	else {
		objApp.setLocalFlash('error', response_data[0].message,"#trace_flash");
	}
}

OtherSettings.prototype.addTraceNumbers=function() {
	if( $('#traceNumberList tr').length-1<config.number_of_trace_numbers){
			for (var i=0;i<traceNumberCount;i++){
				var num="#traceNum"+i;
				if($(num).html() == undefined){
					continue;
				}
				if($(num).html().trim()== $("#newtraceNumber").val().trim()){
					$("#newtraceNumber").validationEngine('showPrompt', 'Duplicate entries not allowed. ', 'error');
					return false;
				}	
			}
			
		var row='<tr id="tr'+traceNumberCount+'"><td id="traceNum'+traceNumberCount+'">'+$("#newtraceNumber").val()+'</td><td width="10%"><input type="button" onclick="removeNumber('+ traceNumberCount+')" value="Remove" /></td></tr>';
		traceNumberCount++;
		$('#traceNumberList').append(row);
		$('#newtraceNumber').val("");
		objOthset.updateTraceNumbers();
	}
	else{	
		objApp.setLocalFlash('error', "You can insert only  "+config.number_of_trace_numbers+"  numbers.","#trace_flash");
		$('#newtraceNumber').val("");
	}
}


OtherSettings.prototype.grantAccess = function() {
	if(objApp.checkPermission('ivr_edit_general_configs')){
		$("#save_gen_conf").show();
	}
	if(objApp.checkPermission('ivr_edit_http_configs')){
		$("#save_http_conf").show();
	}
	if(objApp.checkPermission('ivr_edit_digit_configs')){
		$("#save_digit_conf").show();
	}
	if(objApp.checkPermission('ivr_edit_record_configs')){
		$("#save_record_conf").show();
	}
	if(objApp.checkPermission('ivr_edit_play_configs')){
		$("#save_play_conf").show();
	}
	if(objApp.checkPermission('ivr_edit_codec_configs')){
		$("#save_codecs_conf").show();
	}
	if(objApp.checkPermission('ivr_edit_silence_detection_configs')){
		$("#save_silence_conf").show();
	}
	if(objApp.checkPermission('ivr_edit_rtcp_configs')){
		$("#save_rtcp_conf").show();
	}
	if(objApp.checkPermission('ivr_edit_fax_configs')){
		$("#save_fax_conf").show();
	}
	if(objApp.checkPermission('ivr_edit_amr_configs')){
		$("#save_amr_conf").show();
	}
	if(objApp.checkPermission('ivr_edit_numberlist_configs')){
		$("#save_nbr_lst_conf").show();
	}
	if(objApp.checkPermission('ivr_edit_ivrstatus_configs')){
		$("#save_ivr_ntfy_conf").show();
	}
	if(objApp.checkPermission('ivr_edit_snmp_configs')){
		$("#save_snmp_conf").show();
	}
	if(objApp.checkPermission('ivr_edit_channelwise_app_logs') || objApp.checkPermission('ivr_edit_channelwise_platform_logs')){
		$("#channel_bulk_update").show();
		$(".chanel_links").show();
	}
	if(objApp.checkPermission('ivr_view_channelwise_app_logs')){
		$('.channelAppList').show();
	}
	if(objApp.checkPermission('ivr_view_channelwise_platform_logs')){
		$('.channelPlatList').show();
	}
	if(objApp.checkPermission('ivr_view_channelwise_platform_logs') || objApp.checkPermission('ivr_view_channelwise_app_logs') ){
		$("#chan-head").show();
	}
	if(objApp.checkPermission('ivr_edit_numberwise_app_logs') || objApp.checkPermission('ivr_edit_numberwise_platform_logs')){
		$("#number_bulk_update").show();
		$("#number_bulk_delete").show();
	}
	if(objApp.checkPermission('ivr_view_numberwise_app_logs')){
		$('.numberAppList').show();
	}
	if(objApp.checkPermission('ivr_view_numberwise_platform_logs')){
		$('.numberPlatList').show();
	}
	if(objApp.checkPermission('ivr_view_numberwise_platform_logs') || objApp.checkPermission('ivr_view_numberwise_app_logs')){
			$("#num-head").show();
	}
	if(objApp.checkPermission('ivr_edit_trace_numbers')){
		$("#number_trace_update").show();
	}
	if(objApp.checkPermission('ivr_view_trace_numbers')){
		$("#trc-head").show();
	}
	if(objApp.checkPermission('ivr_view_general_configs')){
		$("#gen-head").show();
	}
	if(objApp.checkPermission('ivr_view_http_configs')){
		$("#http-head").show();
	}
	if(objApp.checkPermission('ivr_view_digit_configs')){
		$("#dgt-head").show();
	}
	if(objApp.checkPermission('ivr_view_record_configs')){
		$("#rcd-head").show();
	}
	if(objApp.checkPermission('ivr_view_play_configs')){
		$("#ply-head").show();
	}
	if(objApp.checkPermission('ivr_view_codec_configs')){
		$("#cdcf-head").show();
	}
	if(objApp.checkPermission('ivr_view_silence_detection_configs')){
		$("#sil-head").show();
	}
	if(objApp.checkPermission('ivr_view_rtcp_configs')){
		$("#rtcp-head").show();
	}
	if(objApp.checkPermission('ivr_view_fax_configs')){
		$("#fax-head").show();
	}
	if(objApp.checkPermission('ivr_view_amr_configs')){
		$("#amr-head").show();
	}
	if(objApp.checkPermission('ivr_view_numberlist_configs')){
		$("#nbrl-head").show();
	}
	if(objApp.checkPermission('ivr_view_ivrstatus_configs')){
		$("#ivr-head").show();
	}
	if(objApp.checkPermission('ivr_view_snmp_configs')){
		$("#snmp-head").show();
	}
	if(objApp.checkPermission('ivr_add_trace_numbers')){
		$("#add_number").show();
	}

	var set=true;
	i=0;
	$('#accordion').children('div').each(function () {
		var contentPanelId = jQuery(this).attr("id");
		if($("#"+contentPanelId).is(":visible") && set==true){
		$("#accordion").accordion("activate", i-1);
		$("#accordion").accordion("activate", i);
		$("#accordion").accordion("activate", i-1);
	    set=false;
	    }
	    i++;
	});
}


OtherSettings.prototype.checkMinMax = function(field) {

	if ((field.val() < config[$(field).attr('id')][0]['min']) || (field.val() > config[$(field).attr('id')][0]['max'])) {
		return "Minimum value = " + config[$(field).attr('id')][0]['min'] + ". Maximum value = "+ config[$(field).attr('id')][0]['max'];
	}
	return true;
}

OtherSettings.prototype.checkPath = function(field){
			if (field.val().charAt(field.val().length-1) != "/") {
				return "Path should end with  a '/'  symbole";
			}
		}

var objOthset = new OtherSettings();

jQuery(document).ready(function() { 	

//start set permision
//view
	$("#gen-head").hide();
	$("#http-head").hide();
	$("#dgt-head").hide();
	$("#rcd-head").hide();
	$("#ply-head").hide();
	$("#cdcf-head").hide();
	$("#sil-head").hide();
	$("#rtcp-head").hide();
	$("#fax-head").hide();
	$("#amr-head").hide();
	$("#nbrl-head").hide();
	$("#ivr-head").hide();
	$("#snmp-head").hide();
	$("#chan-head").hide();
	$("#num-head").hide();
	$("#trc-head").hide();
	//$("#frm_general_conf").hide();

//edit
	$("#save_gen_conf").hide();
	$("#save_http_conf").hide();
	$("#save_digit_conf").hide();
	$("#save_record_conf").hide();
	$("#save_play_conf").hide();
	$("#save_codecs_conf").hide();
	$("#save_silence_conf").hide();
	$("#save_rtcp_conf").hide();
	$("#save_fax_conf").hide();
	$("#save_amr_conf").hide();
	$("#save_nbr_lst_conf").hide();
	$("#save_ivr_ntfy_conf").hide();
	$("#save_snmp_conf").hide();
	$("#channel_bulk_update").hide();
	$("#number_bulk_update").hide();
	$("#number_bulk_delete").hide();
	$("#number_trace_update").hide();
	$("#add_number").hide();
	

	$('.numberPlatList').hide();
	$('.numberAppList').hide();
	$('.channelPlatList').hide();
	$('.channelAppList').hide();
	$('.chanel_links').hide();
	objOthset.grantAccess();
//end permision


	objOthset.getConfValues();
	// Save log levels
	$('#save_log_lvls').bind("click", function () {
		if($("#save_log_lvls").validationEngine('validate')) {
			objOthset.saveLogLevels();
			return false;
		}
		return false;
	});	

	$('#number_bulk_update').bind("click", function () {	
		if($("#frm_number_logs").validationEngine('validate')) {
			objOthset.numberBulkUpdate(); 
		} 				
		return false;
	});


	$('#number_bulk_delete').bind("click", function () {	
		if($("#frm_number_logs").validationEngine('validate')) {
			objOthset.numberBulkDelete(); 
		} 				
		return false;
	});
	

	$('#channel_bulk_update').bind("click", function () {	
		objOthset.channelBulkUpdate();  				
		return false;
	});

	// $('#frm_general_conf').validationEngine({
		// 'custom_error_messages' : {}
	// });
	//Saving general configurations
	$('#save_gen_conf').bind("click", function () {
		if($("#frm_general_conf").validationEngine('validate')) {
			objOthset.saveConfigurations("gen_data", "#frm_general_conf");
			return false;
		}
		return false;
	});
	
	// $('#frm_http_conf').validationEngine({
		// 'custom_error_messages' : {}
	// });
	
	//Saving http configurations
	$('#save_http_conf').bind("click", function () {
		if($("#frm_http_conf").validationEngine('validate')) {		
			objOthset.saveConfigurations("http_request", "#frm_http_conf");  				
			return false;
		}
		return false;
	});

	// $('#frm_digit_conf').validationEngine({
		// 'custom_error_messages' : {}
	// });
	//Saving digit configurations
	$('#save_digit_conf').bind("click", function () {
		if($("#frm_digit_conf").validationEngine('validate')) {		
			objOthset.saveConfigurations("digit_data", "#frm_digit_conf");  				
			return false;
		}
		return false;
	});

	// $('#frm_record_conf').validationEngine({
		// 'custom_error_messages' : {}
	// });
	//Saving record configurations
	$('#save_record_conf').bind("click", function () {	
		if($("#frm_record_conf").validationEngine('validate')) {				
			objOthset.saveConfigurations("rec_data", "#frm_record_conf");  				
			return false;
		}
		return false;
	});

	// $('#frm_play_conf').validationEngine({
		// 'custom_error_messages' : {}
	// });
	//Saving play configurations
	$('#save_play_conf').bind("click", function () {	
		if($("#frm_play_conf").validationEngine('validate')) {				
			objOthset.saveConfigurations("play_data", "#frm_play_conf");  				
			return false;
		}
		return false;
	});

	// $('#frm_codecs_conf').validationEngine({
		// 'custom_error_messages' : {}
	// });
	//Saving codecs configurations
	$('#save_codecs_conf').bind("click", function () {	
		if($("#frm_codecs_conf").validationEngine('validate')) {				
			objOthset.saveConfigurations("codec_data", "#frm_codecs_conf");  				
			return false;
		}
		return false;
	});

	// $('#frm_silence_conf').validationEngine({
		// 'custom_error_messages' : {}
	// });
	
	//Saving silence configurations
	// $('#save_silence_conf').bind("click", function () {	
	// 	if($("#frm_silence_conf").validationEngine('validate')) {				
	// 		objOthset.saveConfigurations("silence_data", "#frm_silence_conf");  				
	// 		return false;
	// 	}
	// 	return false;
	// });

	// $('#frm_rtcp_conf').validationEngine({
		// 'custom_error_messages' : {}
	// });
	//Saving rtcp configurations
	$('#save_rtcp_conf').bind("click", function () {
		if($("#frm_rtcp_conf").validationEngine('validate')) {
			objOthset.saveConfigurations("rtcp_data", "#frm_rtcp_conf");
			return false;
		}
		return false;
	});

	// $('#frm_fax_conf').validationEngine({
		// 'custom_error_messages' : {}
	// });
	//Saving fax configurations
	$('#save_fax_conf').bind("click", function () {	
		//if($("#frm_fax_conf").validationEngine('validate')) {				
			objOthset.saveConfigurations("fax_data", "#frm_fax_conf");  				
			return false;
		//}
		//return false;
	});

	// $('#frm_amr_conf').validationEngine({
		// 'custom_error_messages' : {}
	// });
	//Saving amr configurations
	$('#save_amr_conf').bind("click", function () {	
	//	if($("#frm_amr_conf").validationEngine('validate')) {				
			objOthset.saveConfigurations("amr_data", "#frm_amr_conf");  				
			return false;
		//}
		//return false;
	});

	// $('#frm_nbr_lst_conf').validationEngine({
		// 'custom_error_messages' : {}
	// });
	//Saving number list configurations
	$('#save_nbr_lst_conf').bind("click", function () {	
		if($("#frm_nbr_lst_conf").validationEngine('validate')) {		
			objOthset.saveConfigurations("number_list_data", "#frm_nbr_lst_conf");  				
			return false;
		}
		return false;
	});

	// $('#frm_ivr_conf').validationEngine({
		// 'custom_error_messages' : {}
	// });
	//Saving ivr configurations
	$('#save_ivr_ntfy_conf').bind("click", function () {	
		if($("#frm_ivr_conf").validationEngine('validate')) {		
			objOthset.saveConfigurations("ivr_status_data", "#frm_ivr_conf");  				
			return false;
		}
		return false;
	});

	// $('#frm_snmp_conf').validationEngine({
		// 'custom_error_messages' : {}
	// });
	//Saving snmp configurations	
	$('#save_snmp_conf').bind("click", function () {	
		if($("#frm_snmp_conf").validationEngine('validate')) {
			objOthset.saveConfigurations("snmp_data", "#frm_snmp_conf");  				
			return false;
		}
		return false;
	});

	// $('#frm_number_logs').validationEngine({
		// 'custom_error_messages' : {}
	// });
	// $('#frm_trace_numbers').validationEngine({
		// 'custom_error_messages' : {}
	// });
	
	$('#add_number').bind("click", function () {
		if($("#frm_trace_numbers").validationEngine('validate')) {	
			objOthset.addTraceNumbers();
			return false;
		}
	});

	$('#number_trace_update').bind("click", function () {	
		objOthset.updateTraceNumbers();
	});
	
	//load trace numbers after load the page
	objOthset.listTraceNumbers();

	$('#digit_dtmf').bind("change", function () {
		
		if($("#digit_dtmf").val()=="0"){
			$("#dtmf_payload").hide();
		}
		else{
			$("#dtmf_payload").show()
		}
	});

	$('#server_id').bind("change", function () {
		
		objOthset.listChannels($("#server_id").val());
	});

	
	

});

function removeNumber(id){
	var element="#tr"+id;
	var num="#traceNum"+id;
	$(num).val("");
	$(element).remove();
	objOthset.updateTraceNumbers();
	  
}
