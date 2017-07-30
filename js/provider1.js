	/*
 * ProviderManager class which handles user management
 */
var cur_page = 0;
var data = "";
var response_data; 
var logRetrievalInterval;
var selected_recs="";
var session_ ="";
 
function ProviderManager() {
 
}
ProviderManager.prototype.escapeHtml = function(str) {
	
	var entityMap = {
		"&": "&amp;",
		"<": "&lt;",
		">": "&gt;",
		'"': '&quot;',
		"'": '&#39;',
		"/": '&#x2F;'
	};	
	  
    return String(str).replace(/[&<>"'\/]/g, function (s) {
      return entityMap[s];	  
	});  
}

ProviderManager.prototype.formatString = function(str) {
  
	str = this.escapeHtml(str);
   
	var len 	= str.length; 
	var ret_val = str;
	var limit   = 100;	
	
	if(len > limit)
	{
		var init_str = str.substring(0, limit) + "...";
		var view_str = '&nbsp&nbsp<a href="#" title="Full view" onClick="objLog.viewDesc(\'' + escape(str) + '\'); return false;"><span style=\'color:blue;font-weight: bold;\'>[Full View]</span></a>';
		
		ret_val = init_str + view_str;
	}
	
	return ret_val;
}

ProviderManager.prototype.viewDesc = function(str) {
 
	jQuery('#view-pop1').html(unescape(str)); 
	$( "#view-pop1" ).dialog( "open" );
}

ProviderManager.prototype.replaceAll = function(find, str) {
  
  replace = "<span style='color:red;font-weight: bold;'>" + find + "</span>";
  
  return str.replace(new RegExp(find, 'g'), replace);
}

/* Summary POP-UP Function Set End */


ProviderManager.prototype.getLogLevel = function(currentValue) {
	
	var type_list = config.log_levels;
	
	var str = '<option value="" selected>--</option>';

	for (var i in type_list)
	{
		if (currentValue != null && currentValue == type_list[i].value) 
		{
			return type_list[i].description; // returning value when key is given
		}
		
		str += '<option value="' + type_list[i].value + '">' + type_list[i].description + '</option>';
	}

	if(currentValue)
	{
		return currentValue;
	}	
	
	$('#log_level').html(str); 
}

ProviderManager.prototype.getWebServices = function(currentValue) {
	
	var type_list = config.web_services;
	
	// var str = '<option value="" selected>--</option>';
	var str = '';

	for (var i in type_list)
	{
		if (currentValue != null && currentValue == type_list[i].value) 
		{
			return type_list[i].description; // returning value when key is given
		}
		
		str += '<option value="' + type_list[i].value + '">' + type_list[i].description + '</option>';
	}

	if(currentValue)
	{
		return currentValue;
	}	
	
	$('#web_service').html(str); 
}



ProviderManager.prototype.getServerId = function(currentValue) {
	
	var type_list = config.act_server_id;
	
	var str = '<option value="" selected>--</option>';

	for (var i in type_list)
	{
		if (currentValue != null && currentValue == type_list[i].value) 
		{
			return type_list[i].description; // returning value when key is given
		}
		
		str += '<option value="' + type_list[i].value + '">' + type_list[i].description + '</option>';
	}

	if(currentValue)
	{
		return currentValue;
	}	
	
	$('#server_id').html(str); 
}

ProviderManager.prototype.getEventType = function(currentValue) {
	
	var type_list = config.act_event_type;
	
	var str = '<option value="" selected>--</option>';

	for (var i in type_list)
	{
		if (currentValue != null && currentValue == type_list[i].value) 
		{
			return type_list[i].description; // returning value when key is given
		}
		
		str += '<option value="' + type_list[i].value + '">' + type_list[i].description + '</option>';
	}	
	
	if(currentValue)
	{
		return currentValue;
	}	
	
	$('#event_type').html(str);
}

ProviderManager.prototype.getCdrEventType = function(currentValue) {
	
	var type_list = config.cdr_log_type;
	
	var str = '<option value="" selected>--</option>';

	for (var i in type_list)
	{
		if (currentValue != null && currentValue == type_list[i].value) 
		{
			return type_list[i].description; // returning value when key is given
		}
		
		str += '<option value="' + type_list[i].value + '">' + type_list[i].description + '</option>';
	}	
	
	if(currentValue)
	{
		return currentValue;
	}	
	
	$('#cdr_event_type').html(str);
}

ProviderManager.prototype.getCallType = function(currentValue) {
	
	var type_list = config.act_call_types;
	
	var str = '';//<option value="" selected>--</option>';

	for (var i in type_list)
	{
		if (currentValue != null && currentValue == type_list[i].value) 
		{
			return type_list[i].description; // returning value when key is given
		}
		
		str += '<option value="' + type_list[i].value + '">' + type_list[i].description + '</option>';
	}

	if(currentValue)
	{
		return currentValue;
	}	
	
	$('#call_type').html(str);
}

ProviderManager.prototype.getCallCategory = function(currentValue) {
	
	var type_list = config.act_call_direction;
	
	var str = '<option value="" selected>--</option>'; 

	for (var i in type_list)
	{
		if (currentValue != null && currentValue == type_list[i].value) 
		{
			return type_list[i].description; // returning value when key is given
		}
		
		str += '<option value="' + type_list[i].value + '">' + type_list[i].description + '</option>';
	}

	if(currentValue)
	{
		return currentValue;
	}	
	
	$('#call_category').html(str);
}

ProviderManager.prototype.getModule = function(currentValue) {
	
	var type_list = config.act_module;
	
	var str = '<option value="" selected>--</option>'; 

	for (var i in type_list)
	{
		if (currentValue != null && currentValue == type_list[i].value) 
		{
			return type_list[i].description; // returning value when key is given
		}
		
		str += '<option value="' + type_list[i].value + '">' + type_list[i].description + '</option>';
	}	
	
	$('#module').html(str);
}

ProviderManager.prototype.getLogTypes = function(currentValue) {
	
	var type_list = config.log_type_list;
	
	var str = '';

	for (var i in type_list)
	{
		if (currentValue != null && currentValue == type_list[i].value) 
		{
			return value; // returning value when key is given
		}
		
		str += '<option value="' + type_list[i].value + '">' + type_list[i].description + '</option>';
	}	
	
	$('#types').html(str);
}

ProviderManager.prototype.getAdmins = function(currentValue) {
	
	var request_data = '{"action":"GET_ADMINS"}';		
		
		var response_data = obj_common.ajaxRequest(config.yaws_file_path + 'ivr_log_search.yaws', request_data); 
		
		user_list = '';
		
		


	var type_list = response_data;
	var str = '';
	for (var i in type_list)
	{
		if (currentValue != null && currentValue == type_list[i].value) 
		{
			return value; // returning value when key is given
		}
		
		str += '<option value="' + type_list[i].value + '">' + type_list[i].description + '</option>';
	}	
	
	$('#admin').html(str);
}




ProviderManager.prototype.CreateProvider = function() {	
	


	
	
	var provider_code   = 1;
	var provider_name_th   = 2;
	var provider_name_en   = 3;
	var description   = 4;
	var address   = 5;
	var telephone   = 6;
	var contact_name   = 7;
	var contact_telephone   = 8;
	var contact_mobile   = 9;
	var shortcode_manager 	  = 10;
	
	
	
	var request_data = '{"action":"CREATE","provider_code":"' + provider_code + '","provider_name_th":"' + provider_name_th + '", "provider_name_en":"' + provider_name_en 
	+ '", "description":"' + description + '", "address":"' + address + '", "telephone":"' + telephone + '", "contact_name":"' + contact_name + '", "contact_telephone":"' + contact_telephone 
	+ '", "contact_mobile":"' + contact_mobile + '", "shortcode_manager":"' + shortcode_manager + '" }';		
	
	
	
	
	var response_data = obj_common.ajaxRequest(config.yaws_file_path + 'manage_provider.yaws', request_data); 
	
	user_list = '';
	
	if(response_data[0].status == "ok")
	{
		if(response_data[0].message != "")
		{
			// user_list += '<tbody role="alert" aria-live="polite" aria-relevant="all">';	
			
			var res = response_data[0].message;
			
			for (var i in res) 
			{
				rec_count++;
				
				var style = (i % 2 != 0 ? "even" : "odd");
				
				user_list += '<tr>'
					+ '<td>' + res[i].date_time + '</td>'		
					+ '<td>' + res[i].user + '</td>'		
					+ '<td>' + res[i].unique_id + '</td>'	
					+ '<td>' + res[i].message + '</td>'	
				+ '</tr>';
			}

			// user_list += '</tbody>';
			
			$('#log_csv').show();

			var user_list_ = user_list;
			if(keyword != "|"){
				user_list_ = this.replaceAll(keyword, user_list);
			}	

			var user_table = ''	
			+ '<table border="0" align="center" style="color:#666;font-size: 12px;text-align:center" cellpadding="0" cellspacing="1" id="mts" width="100%">'
				+ '<thead align="center">'
					+ '<th width="18%" id="name">Date/Time</th>'
					+ '<th width="10%" id="des">User</th>'
					+ '<th width="15%" id="frm">Unique ID</th>'
					+ '<th width="60%" id="to">Message</th>' 
				+ '</thead>'
				+ user_list_
			+ '</table>';
			
			jQuery('#log_data_tbl').html(user_table); 
			if(response_data[0].message != "" && response_data[0].status == "ok"){
				var dataTab=$('#mts').dataTable({
						"bPaginate": true,
						"sPaginationType": "full_numbers",
						"bSortClasses": false,
			       	    "sScrollX": "100%",
			       	    "bScrollCollapse": true, 
						"sScrollY": "500px",	
					});
				dataTab.fnSort( [ [0,'desc'] ] );
			}

		}
		else
		{
			$( "#alert" ).html("<br><center><h1>"+"No Result Found"+"</h1></center>").dialog( "open" );
	 
			$('#log_csv').hide();
		}	



	}
	else
	{
		/*
		objApp.setFlash('error', "No records found");
		user_list += '<tbody role="alert" aria-live="polite" aria-relevant="all"><tr class="even">'
			+ '<td colspan="6">No data</td>'
		+ '</tr></tbody>';
		*/
		$( "#alert" ).html("<br><center><h1>"+response_data[0].message+"</h1></center>").dialog( "open" );
		return false;
		
		$('#log_csv').hide();  
	}	


}






















ProviderManager.prototype.SearchLog = function() {	
	
	$('#log_csv').hide();
	var search_date   = $('#adminFromDate').val();
	var search_to_date   = $('#adminToDate').val();
	var keyword 	  = $('#keyword').val();
	
	if(keyword == ""){
		keyword = "|";
	}
	
	var user_list	= '';
	var rec_count 	= 0; 
	
	var request_data = '{"action":"LOG_SEARCH","search_date":"' + search_date + '","search_to_date":"' + search_to_date + '", "keyword":"' + keyword + '"}';		
	var response_data = obj_common.ajaxRequest(config.yaws_file_path + 'ivr_log_search.yaws', request_data); 
	
	user_list = '';
	
	if(response_data[0].status == "ok")
	{
		if(response_data[0].message != "")
		{
			// user_list += '<tbody role="alert" aria-live="polite" aria-relevant="all">';	
			
			var res = response_data[0].message;
			
			for (var i in res) 
			{
				rec_count++;
				
				var style = (i % 2 != 0 ? "even" : "odd");
				
				user_list += '<tr>'
					+ '<td>' + res[i].date_time + '</td>'		
					+ '<td>' + res[i].user + '</td>'		
					+ '<td>' + res[i].unique_id + '</td>'	
					+ '<td>' + res[i].message + '</td>'	
				+ '</tr>';
			}

			// user_list += '</tbody>';
			
			$('#log_csv').show();

			var user_list_ = user_list;
			if(keyword != "|"){
				user_list_ = this.replaceAll(keyword, user_list);
			}	

			var user_table = ''	
			+ '<table border="0" align="center" style="color:#666;font-size: 12px;text-align:center" cellpadding="0" cellspacing="1" id="mts" width="100%">'
				+ '<thead align="center">'
					+ '<th width="18%" id="name">Date/Time</th>'
					+ '<th width="10%" id="des">User</th>'
					+ '<th width="15%" id="frm">Unique ID</th>'
					+ '<th width="60%" id="to">Message</th>' 
				+ '</thead>'
				+ user_list_
			+ '</table>';
			
			jQuery('#log_data_tbl').html(user_table); 
			if(response_data[0].message != "" && response_data[0].status == "ok"){
				var dataTab=$('#mts').dataTable({
						"bPaginate": true,
						"sPaginationType": "full_numbers",
						"bSortClasses": false,
			       	    "sScrollX": "100%",
			       	    "bScrollCollapse": true, 
						"sScrollY": "500px",	
					});
				dataTab.fnSort( [ [0,'desc'] ] );
			}

		}
		else
		{
			$( "#alert" ).html("<br><center><h1>"+"No Result Found"+"</h1></center>").dialog( "open" );
	 
			$('#log_csv').hide();
		}	



	}
	else
	{
		/*
		objApp.setFlash('error', "No records found");
		user_list += '<tbody role="alert" aria-live="polite" aria-relevant="all"><tr class="even">'
			+ '<td colspan="6">No data</td>'
		+ '</tr></tbody>';
		*/
		$( "#alert" ).html("<br><center><h1>"+response_data[0].message+"</h1></center>").dialog( "open" );
		return false;
		
		$('#log_csv').hide();  
	}	


}

ProviderManager.prototype.exportDynamicContent = function() {

	var dataSet = response_data[0].message;
	var headingSet = Object.keys(response_data[0].message[0]);
	var name=new Date().toString()+".csv";
	var headingStetement = "";
	var dataStatement = "";

	for(var col in headingSet)
	{
		headingStetement += headingSet[col] + ",";
	}
	headingStetement = headingStetement.substring(0, headingStetement.length - 1);
	headingStetement += "\\n";
	for(var row in dataSet)
	{
		for(var col in headingSet)
		{
			var array = $.map(dataSet[row], function(value, index) {
    					return [value];
			});
			if(headingSet[col] == "components_names" || headingSet[col] == "components_ids"){
				dataStatement += array[col].replace(new RegExp(",", 'g'), "|");
				dataStatement += ',';
			}
			if(headingSet[col] == "description"){
				dataStatement += array[col].replace(new RegExp(",", 'g'), " ");
				dataStatement += ',';
			}
			else{
				dataStatement += array[col] + ',';
			}
		}
		dataStatement = dataStatement.substring(0, dataStatement.length - 1);
		dataStatement += "\\n";
		
	}

	var csvMessage = headingStetement + (dataStatement.replace(new RegExp("\"", 'g'), "\'")).replace(new RegExp("\"", 'g'), "\'");
	var request_data = '{"action":"EXPORT_CSV","message":"'+csvMessage+'","name":"'+name+'"}';
	var response =obj_common.ajaxRequest(config.yaws_file_path + 'ivr_log_search.yaws', request_data);
	if ('ok' == response[0].status) {
		objApp.setFlash('success', response[0].message);
		window.open(response[0].csv_url,'_blank');
		//window.location.assign(response[0].csv_url);
	} else {
		objApp.setFlash('error', response[0].message);
	}

}

/**
 * Export numbers to CSV.
 */
ProviderManager.prototype.exportCsv = function() {
		
	var search_date   = $('#adminFromDate').val();
	var search_to_date   = $('#adminToDate').val();
	var keyword 	  = $('#keyword').val();

	if(keyword == ""){
		keyword = "|";
	}
	
	var user_list	= '';
	var rec_count 	= 0; 	

	//var request_data = '{"action":"LOG_SEARCH_CSV","search_date":"' + search_date + '","keyword":"' + keyword + '"}';
	var request_data = '{"action":"LOG_SEARCH_CSV","search_date":"' + search_date + '","search_to_date":"' + search_to_date + '", "keyword":"' + keyword + '"}';		
		
	var response_data = obj_common.ajaxRequest(config.yaws_file_path + 'ivr_log_search.yaws', request_data); 

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


ProviderManager.prototype.WebLogSearch = function(state) {
	jQuery('#access_tbl').html("");
	var log_type  =	$("#web_service").val();
	var from_date = $('#webFromDate').val();
	var to_date   = $('#webToDate').val();
	// if(from_date==to_date && from_time==to_time){
	// addOneSecondToWebLogSearch();
	// }
	if (state == "start"){
		var session = "";
	}
	else{
		var session = session_;

	}
	var from	= from_date ;
	var to		= to_date ;	
	var fromDates= from_date.split(" ");
	var from_ts = this.formatDateTime(fromDates[0],fromDates[1]);
	var data="";

	if($("#log_level").val()){
		data+="|log_level,"+$("#log_level").val();
	}
	if($("#user_name").val()){
		data+="|user_name,"+$("#user_name").val();
	}
	if(log_type=="service_mgt_webservice_log"){
		if($("#service_id").val()){
			data+="|service_id,"+$("#service_id").val();
		}
		if($("#response_code").val()){
			data+="|response_code,"+$("#response_code").val();
		}
	}
	else if(log_type==="list_management_webservice_log"){
		if($("#app_id").val()){
			data+="|app_id,"+$("#app_id").val();
		}
	}
	else if(log_type==="obd_webservice_log"){
		console.log("obd");
	}
	var toDates= to_date.split(" ");
	var to_ts   = this.formatDateTime(toDates[0],toDates[1]);
	var request_data='{"action":"GET_WEB_SERVICE_DATA","from_ts":"'+from_ts+'","to_ts":"'+to_ts+'","from_date":"'+from+'","to_date":"'+to+'","data":"'+data+'","log_type":"'+log_type+'","session":"'+session+'"}';
	 response_data = obj_common.ajaxRequest(config.yaws_file_path + 'ivr_log_search.yaws', request_data); 

	var data_rec='<table border="0" style="color:#666;font-size: 12px;text-align:left" align="center" cellpadding="0" cellspacing="1" id="mts">'
	var rec_count=0;
	 if(response_data[0].status=="error"){
	 	$('#web_log_search_next').hide();
	 	//objApp.setFlash('error', response_data[0].reason);
		$( "#alert" ).html("<br><center><h1>"+response_data[0].reason+"</h1></center>").dialog( "open" );
	 }
	 else if(response_data[0].status=="ok"){
	 		session_ = response_data[0].session;
			if(response_data[0].state =="eof"){
				$('#web_log_search_next').hide();
			}
			else{
				$('#web_log_search_next').show();
			}
	 $('#web_log_csv').show();
	 if(log_type==="statistics_webservice_log"){

	 	data_rec+="<thead>"
	 	+"<tr>"
	 	+"<th width='15%'>Time</th>"
	 	+"<th width='5%'>Log Level</th>"
	 	+"<th width='10%'>User Name</th>"
	 	+"<th width='70%'>Log</th></tr>"
	 	+"</thead><tbody>";
	 	
	 	for (i in response_data[0].message){
	 		var log=response_data[0].message[i].log;
		 	log=log.replace(/</g, "&lt;");
		 	log=log.replace(/>/g, "&gt;");
		 	log="<pre> "+log+" </pre>";

	 		data_rec+="<tr><td>"+response_data[0].message[i].time_stamp+"</td>"
	 		+"<td>"+response_data[0].message[i].log_level+"</td>"
	 		+"<td>"+response_data[0].message[i].user_name+"</td>"
	 		+"<td>"+log+"</td>";
	 		rec_count++;
	 	}

	 	data_rec+="</tbody></table>"
		//alert(data_rec);
	}
	else if(log_type=="service_mgt_webservice_log"){
		data_rec+="<thead>"
	 	+"<tr>"
	 	+"<th width='15%'>Time</th>"
	 	+"<th width='5%'>Log Level</th>"
	 	+"<th width='10%'>User Name</th>"
	 	+"<th width='10%'>Service ID</th>"
	 	+"<th width='10%'>Response Code</th>"
	 	+"<th width='50%'>Log</th></tr>"
	 	+"</thead><tbody>";

	 	for (i in response_data[0].message){
	 		var log=response_data[0].message[i].log;
		 	log=log.replace(/</g, "&lt;");
		 	log=log.replace(/>/g, "&gt");
		 	log="<pre> "+log+" </pre>";
	 		data_rec+="<tr><td>"+response_data[0].message[i].time_stamp+"</td>"
	 		+"<td>"+response_data[0].message[i].log_level+"</td>"
	 		+"<td>"+response_data[0].message[i].user_name+"</td>"
	 		+"<td>"+ (response_data[0].message[i].service_id == "0" ? "N/A" : response_data[0].message[i].service_id) +"</td>"
	 		+"<td>"+response_data[0].message[i].response_code+"</td>"
	 		+"<td>"+log+"</td>";
	 		rec_count++;
	 	}

	 	data_rec+="</tbody></table>"
	}
	else if(log_type==="list_management_webservice_log"){
		data_rec+="<thead>"
	 	+"<tr>"
	 	+"<th width='15%'>Time</th>"
	 	+"<th width='5%'>Log Level</th>"
	 	+"<th width='10%'>User Name</th>"
	 	+"<th width='10%'>Application ID</th>"
	 	+"<th width='50%'>Log</th></tr>"
	 	+"</thead><tbody>";

	 	for (i in response_data[0].message){
	 		var log=response_data[0].message[i].log;
		 	log=log.replace(/</g, "&lt;");
		 	log=log.replace(/>/g, "&gt;");
		 	log="<pre> "+log+" </pre>";
	 		data_rec+="<tr><td>"+response_data[0].message[i].time_stamp+"</td>"
	 		+"<td>"+response_data[0].message[i].log_level+"</td>"
	 		+"<td>"+response_data[0].message[i].user_name+"</td>"
	 		+"<td>"+response_data[0].message[i].app_id+"</td>"
	 		+"<td>"+log+"</td>";
	 		rec_count++;
	 	}

	 	data_rec+="</tbody></table>"
	}
	else if(log_type==="obd_webservice_log"){
		data_rec+="<thead>"
	 	+"<tr>"
	 	+"<th width='15%'>Time</th>"
	 	+"<th width='5%'>Log Level</th>"
	 	+"<th width='10%'>User Name</th>"
	 	+"<th width='70%'>Log</th></tr>"
	 	+"</thead><tbody>";

	 	for (i in response_data[0].message){
	 		var log=response_data[0].message[i].log;
		 	log=log.replace(/</g, "&lt;");
		 	log=log.replace(/>/g, "&gt;");
		 	log="<pre> "+log+" </pre>";
	 		data_rec+="<tr><td>"+response_data[0].message[i].time_stamp+"</td>"
	 		+"<td>"+response_data[0].message[i].log_level+"</td>"
	 		+"<td>"+response_data[0].message[i].user_name+"</td>"
	 		+"<td>"+log+"</td>";
	 		rec_count++;
	 	}

	 	data_rec+="</tbody></table>"
	}
	jQuery('#access_tbl').html(data_rec);
	var dataTab= $('#mts').dataTable({
		"bPaginate": true,
		"sPaginationType": "full_numbers",
		"bSortClasses": false,
   	    "sScrollX": "100%",
   	    "bScrollCollapse": true, 
		"sScrollY": "500px"});
	 	
	 	dataTab.fnSort( [ [0,'desc'] ] );
	 }
	
}	
	
ProviderManager.prototype.WebLogCsv = function() {
	var log_type  =	$("#web_service").val();
	var from_date = $('#webFromDate').val();
	var to_date   = $('#webToDate').val();
	var from	= from_date ;
	var to		= to_date;
	var fromDates= from_date.split(" ");
	var from_ts = this.formatDateTime(fromDates[0],fromDates[1]);
	var data="";

	if($("#log_level").val()){
		data+="|loglevel,"+$("#log_level").val();
	}
	if($("#user_name").val()){
		data+="|user_name,"+$("#user_name").val();
	}
	if(log_type=="service_mgt_webservice_log"){
		if($("#service_id").val()){
			data+="|service_id,"+$("#service_id").val();
		}
		if($("#response_code").val()){
			data+="|response_code,"+$("#response_code").val();
		}
	}
	else if(log_type==="list_management_webservice_log"){
		if($("#response_code").val()){
			data+="|app_id,"+$("#app_id").val();
		}
	}
	else if(log_type==="obd_webservice_log"){
		console.log("obd");
	}

	var toDates= to_date.split(" ");
	var to_ts = this.formatDateTime(toDates[0],toDates[1]);
	var request_data='{"action":"GET_WEB_SERVICE_CSV","from_ts":"'+from_ts+'","to_ts":"'+to_ts+'","from_date":"'+from+'","to_date":"'+to+'","data":"'+data+'","log_type":"'+log_type+'"}';
	response_data = obj_common.ajaxRequest(config.yaws_file_path + 'ivr_log_search.yaws', request_data); 
	if ('ok' == response_data[0].status) {
		objApp.setFlash('success', response_data[0].message);
		window.open(response_data[0].csv_url,'_blank');
		//window.location.assign(response[0].csv_url);
	} else {
		//objApp.setFlash('error', response_data[0].message);
		$( "#alert" ).html("<br><center><h1>"+response_data[0].reason+"</h1></center>").dialog( "open" );
		
	}
}

ProviderManager.prototype.ActivitySearch = function(state) {	

	$('#act_csv').hide();
	var seletitems = "";
	
	var log_type		= $('#log_type').val();
	var from_date   	= $('#fromDate').val();
	var to_date   		= $('#toDate').val();
	var server_id 		= $('#server_id').val();
	var event_type 		= $('#event_type').val();
	var channel 		= $('#channel').val();
	var session_id 		= $('#session_id').val();
	var call_category 	= $('#call_category').val();
	var calling 		= $('#calling').val();
	var called		 	= $('#called').val();
	var module 			= $('#module').val();

	if (state == "start"){
		var session = "";
	}
	else{
		var session = session_;

	}
	
	if($('#req_data').val() != null){
		data = $('#req_data').val().toString();
	}else{
		data = "";
	}

	var from	= from_date ;
	var to		= to_date;		
	var fromDates= from_date.split(" ");
	var from_ts = this.formatDateTime(fromDates[0],fromDates[1]);
	var toDates= to_date.split(" ");
	var to_ts = this.formatDateTime(toDates[0],toDates[1]);
	var user_list	= '';
	var rec_count 	= 0; 
	var search_data = "";
	var status = false;
	
	if(server_id)
	{
		status = true;
		search_data+= "serverid," + server_id;
	}
	
	if(event_type)
	{
		if(status)
		{
			search_data+= "|event_type," + event_type;
		}
		else
		{
			status = true;
			search_data+= "event_type," + event_type; 
		}	
	}	

	if(channel)
	{
		if(status)
		{
			search_data+= "|channel," + channel;
		}
		else
		{
			status = true;
			search_data+= "channel," + channel;
		}	
	}	

	if(session_id)
	{
		if(status)
		{
			search_data+= "|sessionid," + session_id;
		}
		else
		{
			status = true;
			search_data+= "sessionid," + session_id;
		}	
	}	

	// if(call_type)
	// {
	// 	if(status)
	// 	{
	// 		search_data+= "|type," + call_type;
	// 	}
	// 	else
	// 	{
	// 		status = true;
	// 		search_data+= "type," + call_type;
	// 	}	
	// }

	if(call_category)
	{
		if(status)
		{
			search_data+= "|direction," + call_category;
		}
		else
		{
			status = true;
			search_data+= "direction," + call_category;
		}	
	}

	if(calling)
	{
		if(status)
		{
			search_data+= "|from," + calling;
		}
		else
		{
			status = true;
			search_data+= "from," + calling;
		}	
	}

	if(called)
	{
		if(status)
		{
			search_data+= "|to," + called;
		}
		else
		{
			status = true;
			search_data+= "to," + called;
		}	
	}	

	if(module)
	{
		if(status)
		{
			search_data+= "|module_name," + module;
		}
		else
		{
			status = true;
			search_data+= "module_name," + module;
		}	
	}
	
	selectitems = data.split(",");
	for(var i in selectitems){

		if(selectitems[i] == "all"){
			data = "";
			selectitems = "";
			break;
		}		
	}
	
	var request_data 			= new Object();
	request_data.action 		= "ACT_SEARCH";
	request_data.log_type 		= log_type;
	request_data.from_date 		= from;
	request_data.to_date 		= to;
	request_data.from_ts 		= from_ts;
	request_data.to_ts 			= to_ts;
	request_data.search_data 	= search_data;
	request_data.data 			= data;
	request_data.session 		= session;
	request_data 				= JSON.stringify(request_data);
	
	$('#uploading').show();
	response_data = obj_common.ajaxRequest(config.yaws_file_path + 'ivr_log_search.yaws', request_data); 
	$('#uploading').hide();  
	
	user_list = '';
	var tbl_width = "100%";	
	
	if(response_data[0].status == "ok")
	{
		if(response_data[0].message != "")
		{
			session_ = response_data[0].session;
			if(response_data[0].state =="eof"){
				$('#activity_search_next').hide();
			}
			else{
				$('#activity_search_next').show();
			}
			$('#log_data_tbl').show();
			user_list += '<tbody role="alert" aria-live="polite" aria-relevant="all">';	
			
			var res = response_data[0].message;
			
			for (var i in res) 
			{
				/*rec_count++;
				
				var style = (i % 2 != 0 ? "even" : "odd");					
						
				user_list += '<tr>'
					+ '<td>' + res[i].date_time + '</td>'		
					+ '<td>' + res[i].server_id + '</td>'		
					+ '<td>' + res[i].event_type + '</td>'	
					+ '<td>' + res[i].channel + '</td>'		
					+ '<td>' + res[i].session_id + '</td>'
					+ '<td>' + this.getCallType(res[i].type) + '</td>'		
					+ '<td>' + this.getCallCategory(res[i].direction) + '</td>'		
					+ '<td>' + res[i].from + '</td>'	
					+ '<td>' + res[i].to + '</td>'		
					+ '<td>' + res[i].module_name + '</td>'
					+ '<td>' + this.formatString(res[i].description) + '</td>' 								
				+ '</tr>';*/
				rec_count++;
					
				var style = (i % 2 != 0 ? "even" : "odd");
				user_list += '<tr>';
				
				if(selectitems !="")
				{
					if(selectitems.length < 6)
					{
						tbl_width = "100%";
					}
					
					for(j in selectitems)
					{					
						if(selectitems[j] == "time"){
							user_list +='<td>' + formatTimeToHHMMSS(res[i].time) + '</td>';
						}
						if(selectitems[j] =="serverid"){
							user_list +='<td>' + res[i].serverid  + '</td>';
						}
						if(selectitems[j] =="event_type"){
							user_list +='<td>' + res[i].event_type  + '</td>';
						}
						if(selectitems[j] =="channel"){
							user_list +='<td>' + res[i].channel  + '</td>'; 
						}
						// if(selectitems[j] =="type"){
						// 	user_list +='<td>' + this.getCallType(res[i].type)  + '</td>';
						// }
						if(selectitems[j] =="sessionid"){
							user_list +='<td>' + res[i].sessionid  + '</td>';
						}
						if(selectitems[j] =="direction"){
							user_list +='<td>' +res[i].direction  + '</td>';
						}
						if(selectitems[j] =="from"){
							user_list +='<td>' +res[i].from  + '</td>';
						}
						if(selectitems[j] =="to"){
							user_list +='<td>' +res[i].to  + '</td>';
						}
						if(selectitems[j] =="module_name"){
							user_list +='<td>' +res[i].module_name  + '</td>';
						}
						if(selectitems[j] =="description"){
							user_list +='<td>' +this.formatString(res[i].description)  + '</td>';
						}
					}
				}
				else 
				{
					user_list += '<td>' + formatTimeToHHMMSS(res[i].time) + '</td>'
						//+ '<td>' + res[i].short_code + '</td>'
						+ '<td>' + res[i].serverid  + '</td>'
						+ '<td>' + res[i].event_type + '</td>'
						+ '<td>' + res[i].channel + '</td>'
						// + '<td>' + this.getCallType(res[i].type) + '</td>'
						+ '<td>' + res[i].sessionid + '</td>'
						+ '<td>' + res[i].direction + '</td>'						
						+ '<td>' + res[i].from + '</td>'
						+ '<td>' + res[i].to + '</td>'
						+ '<td>' + res[i].module_name + '</td>'
						+ '<td>' + this.formatString(res[i].description) + '</td>';
				}
				
				user_list += '</tr>';
			}

			user_list += '</tbody>';
			
			$('#act_csv').show();

		}
		else
		{
			/*
			user_list += '<tbody role="alert" aria-live="polite" aria-relevant="all"><tr class="even">'
				+ '<td colspan="10">No data</td>'
			+ '</tr></tbody>';*/
			$('#act_csv').hide();
			$('#log_data_tbl').hide();	
			$( "#alert" ).html("<br><center><h1>"+"No Result Found"+"</h1></center>").dialog( "open" );			
			
		}			
	}
	// else if(response_data[0].status == "file_processing"){
	// 	//alert(response_data[0].reason);
	// 	user_list += '<tbody role="alert" aria-live="polite" aria-relevant="all"><tr class="even">'
	// 		+ '<td colspan="11"><span>Search result is too large to display. A downloadable CSV will be available in CDR Log Files section</span></td>'
	// 	+ '</tr></tbody>';
	// } 
	else {
		/*
		 user_list += '<tbody role="alert" aria-live="polite" aria-relevant="all"><tr class="even">'
			+ '<td colspan="11">No data</td>'
		+ '</tr></tbody>'; */
		$('#act_csv').hide();
		$('#log_data_tbl').hide();	
		$( "#alert" ).html("<br><center><h1>"+"No Result Found"+"</h1></center>").dialog( "open" );
		 
		
	}		

		
	/*var user_table = ''	
	+ '<table border="0" align="center" cellpadding="0" cellspacing="1" class="results_mini" id="mt" width="200%">'
		+ '<thead><tr>'
			+ '<th width="10%" id="name">Date/Time</th>'
			+ '<th width="5%" id="des">Server ID</th>'
			+ '<th width="10%" id="frm">Event</th>'
			+ '<th width="5%" id="frm">Channel</th>'
			+ '<th width="10%" id="to">Session ID</th>'
			+ '<th width="5%" id="name">Type</th>'
			+ '<th width="5%" id="des">Direction</th>' 
			+ '<th width="5%" id="frm">From</th>'
			+ '<th width="5%" id="frm">To</th>'
			+ '<th width="5%" id="to">Module</th>'	
			+ '<th width="35%" id="to">Description</th>' 					
		+ '</tr></thead>'
		+ user_list
	+ '</table>';	*/

var user_table = ''	
	+ '<table border="0" align="center" cellpadding="0" style="color:#666;font-size: 12px;text-align:center" cellspacing="1" id="mts" width="' + tbl_width + '">'
		+ '<thead><tr>';
		
	if(selectitems !="")
	{
		for(j in selectitems)
		{			
			if(selectitems[j] == "time"){
				user_table +='<th width="10%" id="name">Date/Time</th>';
			}
			if(selectitems[j] =="serverid"){
				user_table +='<th width="5%" id="frm">Server ID</th>';
			}
			if(selectitems[j] =="event_type"){
				user_table +='<th width="5%" id="des">Event Type</th>';
			}
			if(selectitems[j] =="channel"){
				user_table +='<th width="10%" id="to">Channel</th>';
			}
			// if(selectitems[j] =="type"){
			// 	user_table +='<th width="5%" id="name">Type</th>';
			// }
			if(selectitems[j] =="sessionid"){
				user_table +='<th width="10%" id="to">Session ID</th>';
			}
			if(selectitems[j] =="direction"){
				user_table +='<th width="5%" id="name">Direction</th>';
			}
			if(selectitems[j] =="from"){
				user_table +='<th width="5%" id="frm">From</th>';
			}
			if(selectitems[j] =="to"){
				user_table +='<th width="5%" id="frm">To</th>';
			}
			if(selectitems[j] =="module_name"){
				user_table +='<th width="5%" id="frm">Module Name</th>';
			}
			if(selectitems[j] =="description"){
				user_table +='<th width="40%" id="to">Description</th>';
			}				
		}
	}
	else
	{
		user_table += '<th width="10%" id="name">Date/Time</th>' 
				+ '<th width="5%" id="des">Server ID</th>'
				+ '<th width="5%" id="frm">Event Type</th>'
				+ '<th width="5%" id="frm">Channel</th>'
				// + '<th width="5%" id="frm">Type</th>'
				+ '<th width="10%" id="to">Session ID</th>'
				+ '<th width="5%" id="name">Direction</th>'
				+ '<th width="5%" id="frm">From</th>'
				+ '<th width="5%" id="frm">To</th>'
				+ '<th width="5%" id="frm">Module Name</th>'
				+ '<th width="40%" id="to">Description</th>'; 
	}	 
	
	user_table+= '</tr></thead>';
	user_table+= user_list;
	user_table+= '</table>';	
	
	jQuery('#log_data_tbl').html(user_table); 

	if(response_data[0].message != "" && response_data[0].status != "file_processing"){
		var oTable= $('#mts').dataTable({
			"bPaginate": true,
			"sPaginationType": "full_numbers",
			"bSortClasses": false,
       	    "sScrollX": "100%",
       	    "bScrollCollapse": true, 
			"sScrollY": "500px",
		});
		oTable.fnSort( [ [0,'desc'] ] );
	
	}
}

/**
 * Export numbers to CSV.
 */
ProviderManager.prototype.ActivityCsv = function() {	
	
	var log_type		= $('#log_type').val();
	var from_date   	= $('#fromDate').val();
	var to_date   		= $('#toDate').val();
	var server_id 		= $('#server_id').val();
	var event_type 		= $('#event_type').val();
	var channel 		= $('#channel').val();
	var session_id 		= $('#session_id').val();
	// var call_type 		= $('#call_type').val();
	var call_category 	= $('#call_category').val();
	var calling 		= $('#calling').val();
	var called		 	= $('#called').val();
	var module 			= $('#module').val();

	var from			= from_date ;
	var to				= to_date ;

	if($('#req_data').val() != null){
		data = $('#req_data').val().toString();
	}else{
		data = "";
	}	

	var fromDates= from_date.split(" ");
	var from_ts = this.formatDateTime(fromDates[0],fromDates[1]);

	var toDates= to_date.split(" ");
	var to_ts = this.formatDateTime(toDates[0],toDates[1]);

	
	var user_list	= '';
	var rec_count 	= 0; 
	
	var search_data = "";
	var status = false;
	
	if(server_id)
	{
		status = true;
		search_data+= "serverid," + server_id;
	}
	
	if(event_type)
	{
		if(status)
		{
			search_data+= "|event_type," + event_type;
		}
		else
		{
			status = true;
			search_data+= "event_type," + event_type; 
		}	
	}	

	if(channel)
	{
		if(status)
		{
			search_data+= "|channel," + channel;
		}
		else
		{
			status = true;
			search_data+= "channel," + channel;
		}	
	}	

	if(session_id)
	{
		if(status)
		{
			search_data+= "|sessionid," + session_id;
		}
		else
		{
			status = true;
			search_data+= "sessionid," + session_id;
		}	
	}	

	// if(call_type)
	// {
	// 	if(status)
	// 	{
	// 		search_data+= "|type," + call_type;
	// 	}
	// 	else
	// 	{
	// 		status = true;
	// 		search_data+= "type," + call_type;
	// 	}	
	// }

	if(call_category)
	{
		if(status)
		{
			search_data+= "|direction," + call_category;
		}
		else
		{
			status = true;
			search_data+= "direction," + call_category;
		}	
	}

	if(calling)
	{
		if(status)
		{
			search_data+= "|from," + calling;
		}
		else
		{
			status = true;
			search_data+= "from," + calling;
		}	
	}

	if(called)
	{
		if(status)
		{
			search_data+= "|to," + called;
		}
		else
		{
			status = true;
			search_data+= "to," + called;
		}	
	}	

	if(module)
	{
		if(status)
		{
			search_data+= "|module_name," + module;
		}
		else
		{
			status = true;
			search_data+= "module_name," + module;
		}	
	}		

	selectitems = data.split(",");
	for(var i in selectitems){

		if(selectitems[i] == "all"){
			data = "";
			selectitems = "";
			break;
		}		
	}
	
	var request_data 				= new Object();
	request_data.action 		= "ACT_SEARCH_CSV";
	request_data.log_type 		= log_type;
	request_data.from_date 		= from;
	request_data.to_date 		= to;		
	request_data.from_ts 		= from_ts;
	request_data.to_ts 			= to_ts;
	request_data.search_data 	= search_data;
	request_data.data 			= data;
	request_data 				= JSON.stringify(request_data);
	
	$('#uploading').show(); 
	
	var response_data = obj_common.ajaxRequest(config.yaws_file_path + 'ivr_log_search.yaws', request_data); 
	
	$('#uploading').hide();
	
	user_list = '';
	
	if(response_data != "")
	{
		if ('ok' == response_data[0].status) 
		{
			objApp.setFlash('success', response_data[0].message);
			window.open(response_data[0].csv_url)
		} 
		else 
		{
			objApp.setFlash('error', response_data[0].message);
		}
	}
	else 
	{
		objApp.setFlash('error', "No records found");
	}
}

ProviderManager.prototype.CdrLogSearch = function(state) {	
	
	
	var log_type		= $('#log_type').val();
	var from_date   	= $('#fromDate').val();
	var to_date   		= $('#toDate').val();
	var server_id 		= $('#server_id').val();
	var event_type 		= $('#cdr_event_type').val();
	var channel 		= $('#channel').val();
	var session_id 		= $('#session_id').val();
	// var call_type 		= $('#call_type').val();
	var call_category 	= $('#call_category').val();
	var calling 		= $('#calling').val();
	var called		 	= $('#called').val();
	var first_redirect	= $('#first_redirect_no').val();
	var last_redirect	= $('#last_redirect_no').val();
	var module 			= $('#module').val();
	 
	var from			= from_date ;
	var to				= to_date ;	


	var fromDates= from_date.split(" ");
	var from_ts = this.formatDateTime(fromDates[0],fromDates[1]);

	var toDates= to_date.split(" ");
	var to_ts = this.formatDateTime(toDates[0],toDates[1]);
	
	var user_list	= '';
	var rec_count 	= 0; 
	
	var search_data = "";
	var status = false;
	var search_fields = "";

	if (state == "start"){
		var session = "";
	}
	else{
		var session = session_;
	}
	
	if(server_id)
	{
		status = true;
		search_data+= "server_ID," + server_id;
	}
	
	if(event_type)
	{
		if(status)
		{
			search_data+= "|call_progress," + event_type;
		}
		else
		{
			status = true;
			search_data+= "call_progress," + event_type; 
		}	
	}	

	if(channel)
	{
		if(status)
		{
			search_data+= "|product_channel," + channel;
		}
		else
		{
			status = true;
			search_data+= "product_channel," + channel;
		}	
	}	

	if(session_id)
	{
		if(status)
		{
			search_data+= "|session_ID," + session_id;
		}
		else
		{
			status = true;
			search_data+= "session_ID," + session_id;
		}	
	}	

	// if(call_type)
	// {
	// 	if(status)
	// 	{
	// 		search_data+= "|type," + call_type;
	// 	}
	// 	else
	// 	{
	// 		status = true;
	// 		search_data+= "type," + call_type;
	// 	}	
	// }

	if(call_category)
	{
		if(status)
		{
			search_data+= "|direction," + call_category;
		}
		else
		{
			status = true;
			search_data+= "direction," + call_category;
		}	
	}

	if(calling)
	{
		if(status)
		{
			search_data+= "|calling," + calling;
		}
		else
		{
			status = true;
			search_data+= "calling," + calling;
		}	
	}

	if(called)
	{
		if(status)
		{
			search_data+= "|called," + called;
		}
		else
		{
			status = true;
			search_data+= "called," + called;
		}	
	}

	if(first_redirect)
	{
		if(status)
		{
			search_data+= "|first_redirect," + first_redirect;
		}
		else
		{
			status = true;
			search_data+= "first_redirect," + first_redirect;
		}	
	}
	
	if(last_redirect)
	{
		if(status)
		{
			search_data+= "|last_redirect," + last_redirect;
		}
		else
		{
			status = true;
			search_data+= "last_redirect," + last_redirect;
		}	
	}			

	if($('#req_data').val() !=""){
		search_fields = $('#req_data').val().toString();
	}else{}
	
	request_data 				= new Object();
	request_data.action 		= "CDR_LOG_SEARCH";
	request_data.log_type 		= log_type;
	request_data.from_date 		= from;
	request_data.to_date 		= to;
	request_data.from_ts 		= from_ts;
	request_data.to_ts 			= to_ts;
	request_data.search_data 	= search_data;
	request_data.session 		= session;
	request_data.search_fields 	= search_fields;
	request_data 				= JSON.stringify(request_data);
	
	
	$('#uploading').show();
	
	response_data = obj_common.ajaxRequest(config.yaws_file_path + 'ivr_log_search.yaws', request_data); 
	
	$('#uploading').hide();  
	
	user_list = '';
	var columns = "";
	if(response_data[0].status == "ok")
	{
		if(response_data[0].message != "")
		{
			session_ = response_data[0].session;
			if(response_data[0].state =="eof"){
				$('#cdr_log_search_next').hide();
			}
			else{
				$('#cdr_log_search_next').show();
			}
			$('#log_data_tbl').show();
			columns = Object.keys(response_data[0].message[0]);
			user_list += '<tbody role="alert" aria-live="polite" aria-relevant="all">';	
			
			res = response_data[0].message;

			for(var row in res)
			{
				rec_count++;
				var style = (row % 2 != 0 ? "even" : "odd");
				user_list += '<tr>';
				var columns = Object.keys(response_data[0].message[0]);
				for(var col in columns)
				{
					var array = $.map(res[row], function(value, index) {
    					return [value];
					});
					var index_array = $.map(res[row], function(value, index) {
    					return [index];
					});
					
					if(index_array[col] == "start_time"){
					array[col] = formatTimeToHHMMSS(array[col]);
					}
					if(index_array[col] == "end_time"){
					array[col] = formatTimeToHHMMSS(array[col]);
					}				 
					if(index_array[col] == "answer_time"){
					array[col] = formatTimeToHHMMSS(array[col]);
					}  
					  
					user_list += '<td>' + array[col] + '</td>';
				}
				user_list += '</tr>';
			}
			
			// for (var i in res) 
			// {
			// 	rec_count++;
				
			// 	var style = (i % 2 != 0 ? "even" : "odd");					
						
			// 	user_list += '<tr>'
			// 		+ '<td>' + res[i].start_time + '</td>'	
			// 		+ '<td>' + res[i].end_time + '</td>'		
			// 		+ '<td>' + res[i].server_ID + '</td>'		
			// 		+ '<td>' + res[i].product_channel + '</td>'	
			// 		+ '<td>' + res[i].direction + '</td>'		
			// 		+ '<td>' + res[i].session_ID + '</td>'
			// 		+ '<td>' + res[i].type + '</td>'		
			// 		+ '<td>' + res[i].answer_time + '</td>'	
			// 		+ '<td>' + res[i].calling + '</td>'		
			// 		+ '<td>' + res[i].called + '</td>'	
			// 		+ '<td>' + res[i].calling_URI + '</td>'		
			// 		+ '<td>' + res[i].called_URI + '</td>'
			// 		+ '<td>' + res[i].cell + '</td>' 	
			// 		+ '<td>' + res[i].first_redirect + '</td>'		
			// 		+ '<td>' + res[i].last_redirect + '</td>'
			// 		+ '<td>' + res[i].early_media + '</td>' 
			// 		+ '<td>' + res[i].duration + '</td>' 
			// 		+ '<td>' + res[i].disconnected_reason + '</td>' 
			// 		+ '<td>' + res[i].call_progress + '</td>' 							
			// 	+ '</tr>';
			// }

			user_list += '</tbody>';
			
			$('#act_csv').show();
			$('#cdr_csv').show();

		}
		else
		{
		/*
			columns = ["start_time", "end_time", "server_ID", "product_channel", "direction", "session_ID", "type", "answer_time", "calling", "called", "cell", "calling_URI", "called_URI", "first_redirect", "last_redirect", "early_media", "duration", "disconnected_reason", "call_progress"];
			user_list += '<tbody role="alert" aria-live="polite" aria-relevant="all"><tr class="even">'
				+ '<td colspan="19">No data</td>'
			+ '</tr></tbody>';
			
			*/
			$( "#alert" ).html("<br><center><h1>"+"No Result Found"+"</h1></center>").dialog( "open" );
			$('#act_csv').hide();
			$('#cdr_csv').hide(); 	
		}			
	}
	// else if(response_data[0].status == "file_processing"){
	// 	columns = ["start_time", "end_time", "server_ID", "product_channel", "direction", "session_ID", "type", "answer_time", "calling", "called", "cell", "calling_URI", "called_URI", "first_redirect", "last_redirect", "early_media", "duration", "disconnected_reason", "call_progress"];
	// 	user_list += '<tbody role="alert" aria-live="polite" aria-relevant="all"><tr class="even">'
	// 		+ '<td colspan="19"><span>Search result is too large to display. A downloadable CSV will be available in CDR Log Files section</span></td>'
	// 	+ '</tr></tbody>';
	// }

	else 
	{
	/*
	 	columns = ["start_time", "end_time", "server_ID", "product_channel", "direction", "session_ID", "type", "answer_time", "calling", "called", "cell", "calling_URI", "called_URI", "first_redirect", "last_redirect", "early_media", "duration", "disconnected_reason", "call_progress"];
		user_list += '<tbody role="alert" aria-live="polite" aria-relevant="all"><tr class="even">'
			+ '<td colspan="19">No data</td>'
		+ '</tr></tbody>';
		
		$('#act_csv').hide();
		$('#cdr_csv').hide(); 	
	*/
	$( "#alert" ).html("<br><center><h1>"+"No Result Found"+"</h1></center>").dialog( "open" );
	$('#act_csv').hide();
	$('#cdr_csv').hide();	
	}		
	
		
	var user_table = ''	
	+ '<table border="0" align="center" cellpadding="0" cellspacing="1" id="mts" style="color:#666;font-size: 12px;text-align:center">'
		+ '<thead><tr>';
			var arr = new Array();
		    arr["start_time"] = "150px";
		    arr["end_time"] = "150px";
		    arr["server_ID"] = "10px";
		    arr["product_channel"] = "10px";
		    arr["direction"] = "60px";
		    arr["session_ID"] = "260px";
		    // arr["type"] = "45px";
		    arr["answer_time"] = "100px";
		    arr["calling"] = "100px";
		    arr["called"] = "100px";
		    arr["cell"] = "25px";
		    arr["calling_URI"] = "220px";
		    arr["called_URI"] = "220px";
		    arr["first_redirect"] = "80px";
		    arr["last_redirect"] = "80px";
		    arr["early_media"] = "50px";
		    arr["duration"] = "100px";
		    arr["disconnected_reason"] = "130px";
		    arr["call_progress"] = "80px";

				for(var col in columns)
				{
					user_table += '<th style="word-wrap: break-word;" width='+arr[columns[col]]+'>' + columns[col].charAt(0).toUpperCase() + columns[col].replace('_', ' ').slice(1) + '</th>';
				}
			// + '<th width="15%" id="name">Start Time</th>'
			// + '<th width="15%" id="des">End Time</th>'
			// + '<th width="5%" id="frm">Server ID</th>'
			// + '<th width="5%" id="frm">Product Channel</th>'
			// + '<th width="10%" id="to">Direction</th>'
			// + '<th width="5%" id="name">Session ID</th>'
			// + '<th width="5%" id="des">Type</th>' 
			// + '<th width="5%" id="frm">Answer Time</th>'
			// + '<th width="5%" id="frm">Calling</th>'
			// + '<th width="5%" id="to">Called</th>'	
			// + '<th width="35%" id="to">Calling URI</th>' 	
			// + '<th width="5%" id="to">Called URI</th>'	
			// + '<th width="35%" id="to">Cell</th>' 	
			// + '<th width="5%" id="to">First Redirect</th>'	
			// + '<th width="35%" id="to">Last Redirect</th>' 	
			// + '<th width="35%" id="to">Early Media</th>' 	
			// + '<th width="35%" id="to">Duration</th>' 
			// + '<th width="35%" id="to">Disconnected Reason</th>' 
			// + '<th width="35%" id="to">Call Progress</th>' 							
	user_table += '</tr></thead>'
		+ user_list
	+ '</table>';			
	
	jQuery('#log_data_tbl').html(user_table); 

	if(response_data[0].message != "" && response_data[0].status != "file_processing"){
		$('#mts').dataTable({
			"bPaginate": true,
			"sPaginationType": "full_numbers",
			"bSortClasses": false,
       	    "sScrollX": "100%",
			"bScrollCollapse": true, 
			"sScrollY": "500px",
		}); 
		var oTable = $('#mts').dataTable();
		oTable.fnSort( [ [0,'desc'] ] );
	}
	
}

/**
 * Export numbers to CSV.
 */
ProviderManager.prototype.CdrLogCsv = function() {	
	
	var log_type		= $('#log_type').val();
	var from_date   	= $('#fromDate').val();
	var to_date   		= $('#toDate').val();
	var to_time   		= $('#actToTime').val();
	var server_id 		= $('#server_id').val();
	var event_type 		= $('#cdr_event_type').val();
	var channel 		= $('#channel').val();
	var session_id 		= $('#session_id').val();
	// var call_type 		= $('#call_type').val();
	var call_category 	= $('#call_category').val();
	var calling 		= $('#calling').val();
	var called		 	= $('#called').val();
	var module 			= $('#module').val();

	var first_redirect	= $('#first_redirect_no').val();
	var last_redirect	= $('#last_redirect_no').val();

	var from			= from_date ;
	var to				= to_date ;
	var search_fields   = "";


	var fromDates= from_date.split(" ");
	var from_ts = this.formatDateTime(fromDates[0],fromDates[1]);

	var toDates= to_date.split(" ");
	var to_ts = this.formatDateTime(toDates[0],toDates[1]);
	
	var user_list	= '';
	var rec_count 	= 0; 
	
	var search_data = "";
	var status = false;
	
	if(server_id)
	{
		status = true;
		search_data+= "server_ID," + server_id;
	}
	
	if(event_type)
	{
		if(status)
		{
			search_data+= "|call_progress," + event_type;
		}
		else
		{
			status = true;
			search_data+= "call_progress," + event_type; 
		}	
	}	

	if(channel)
	{
		if(status)
		{
			search_data+= "|channel," + channel;
		}
		else
		{
			status = true;
			search_data+= "channel," + channel;
		}	
	}	

	if(session_id)
	{
		if(status)
		{
			search_data+= "|session_ID," + session_id;
		}
		else
		{
			status = true;
			search_data+= "session_ID," + session_id;
		}	
	}	

	// if(call_type)
	// {
	// 	if(status)
	// 	{
	// 		search_data+= "|type," + call_type;
	// 	}
	// 	else
	// 	{
	// 		status = true;
	// 		search_data+= "type," + call_type;
	// 	}	
	// }

	if(call_category)
	{
		if(status)
		{
			search_data+= "|direction," + call_category;
		}
		else
		{
			status = true;
			search_data+= "direction," + call_category;
		}	
	}

	if(calling)
	{
		if(status)
		{
			search_data+= "|from," + calling;
		}
		else
		{
			status = true;
			search_data+= "from," + calling;
		}	
	}

	if(called)
	{
		if(status)
		{
			search_data+= "|to," + called;
		}
		else
		{
			status = true;
			search_data+= "to," + called;
		}	
	}
	if(first_redirect)
	{
		if(status)
		{
			search_data+= "|first_redirect," + first_redirect;
		}
		else
		{
			status = true;
			search_data+= "first_redirect," + first_redirect;
		}	
	}
	
	if(last_redirect)
	{
		if(status)
		{
			search_data+= "|last_redirect," + last_redirect;
		}
		else
		{
			status = true;
			search_data+= "last_redirect," + last_redirect;
		}	
	}		

	if($('#req_data').val() !=""){
		search_fields = $('#req_data').val().toString();
	}else{}
	
	var request_data 				= new Object();
	request_data.action 		= "CDR_LOG_SEARCH_CSV";
	request_data.log_type 		= log_type;
	request_data.from_date 		= from;
	request_data.to_date 		= to;		
	request_data.from_ts 		= from_ts;
	request_data.to_ts 			= to_ts;
	request_data.search_data 	= search_data; 
	request_data.search_fields 	= search_fields;
	request_data 				= JSON.stringify(request_data);
	
	$('#uploading').show(); 
	
	var response_data = obj_common.ajaxRequest(config.yaws_file_path + 'ivr_log_search.yaws', request_data); 
	
	$('#uploading').hide();
	
	user_list = '';
	
	if(response_data != "")
	{
		if ('ok' == response_data[0].status) 
		{
			objApp.setFlash('success', response_data[0].message);
			window.open(response_data[0].csv_url)
		} 
		else 
		{
			objApp.setFlash('error', response_data[0].message);
		}
	}
	else 
	{
		objApp.setFlash('error', "No records found");
	}
}

ProviderManager.prototype.resetDownloadedFrm = function(){
	multiDelStatus = 2;
	$( "#bulk_del_reset_area" ).hide();
	
}

ProviderManager.prototype.bulkDelete = function() {
	objLog.collectDeletionLogs();
	var response_data_csv_bulk_del = "";
	if (selected_recs == "") {
			objApp.setFlash('error', 'Please select atleast one log file to delete');
			multiDelStatus = 3;
	} 
	else {

		document.getElementById('viewMsg').innerHTML="Are you sure to delete selected log files ? .";
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
						var request_data = '{"action":"LOGS_BULK_DELETE","logs":"'+selected_recs+'"}';
						response_data_csv_bulk_del = obj_common.ajaxRequest(config.yaws_file_path + 'ivr_log_search.yaws', request_data);
						if ('ok' == response_data_csv_bulk_del[0].status) {
							// document.getElementById('viewAlert').innerHTML="List of the successfully deleted items "+response_data[0].success_list.replace(",", "<br>");	
							selected_recs = "";
							$(function() {
								$( "#dialog-alert" ).dialog({
								modal: true,
									buttons: {
										Ok: function() {
											$( this ).dialog( "close" );
										}
									}
								});
							});
							$("#dialog-alert").show();
							objApp.setFlash('success', response_data_csv_bulk_del[0].message);
						} 
						else {
							objApp.setFlash('error', response_data_csv_bulk_del[0].message);
							selected_recs = "";
							if ("" != response_data_csv_bulk_del[0].fail_list) {
								// document.getElementById('viewAlert').innerHTML="List of the successfully deleted items "+response_data[0].success_list.replace(",", "<br>") + " <br> List of deletion failed items "+response_data[0].success_list.replace(",", "<br>");
							}
						}

						$( this ).dialog( "close" );
					},
					Cancel: function() {
						selected_recs = "";
						$( this ).dialog( "close" );
						return false;
					}
				}
			});
		});



	}

	return false;
}

ProviderManager.prototype.hideMultiDelColumn = function() {
	var elemsTD = document.getElementsByClassName('delete_logs_columns');
	var elemsTH = document.getElementsByClassName('delete_all_logs_columns');

	for (var i = 0; i < elemsTD.length; i++) {
		elemsTD[i].style.display = 'none';
	}

	for (var ii = 0; ii < elemsTH.length; ii++) {
		elemsTH[ii].style.display = 'none';
	}

}

ProviderManager.prototype.showMultiDelColumn = function() {
	var elemsTD = document.getElementsByClassName('delete_logs_columns');
	var elemsTH = document.getElementsByClassName('delete_all_logs_columns');

	for (var i = 0; i < elemsTD.length; i++) {
		elemsTD[i].style.display = '';
	}

	for (var ii = 0; ii < elemsTH.length; ii++) {
		elemsTH[ii].style.display = '';
	}

}

ProviderManager.prototype.formatDateTime = function(date, time) {

	var date_arr = date.split("/");
	var time_arr = time.split(":");
	
	return date_arr[0].substring(2,4)  + date_arr[1] + date_arr[2] + time_arr[0] + time_arr[1];	
}

ProviderManager.prototype.grantAccess = function() {
	if(objApp.checkPermission('ivr_downloaded_logs_bulk_del')){
		$("#bulk_del_area_div").show();
	}
}

jQuery(document).ready(function() {
	//hide call type drop box since we have only audio type as call type  and audio is set as default value for call_type
	
	objProvider.CreateProvider();	
	$("#call_type-tr").hide();
	$('#cdr_csv').hide();
	$('#numbers').hide();
	$('#uploading').hide();
	$('#uploading').hide();
	$("#bulk_del_area_div").hide();
	$('#activity_search_next').hide();
	$('#cdr_log_search_next').hide();
	$('#web_log_search_next').hide();

	// User management form
	// $('#frm_log').validationEngine({'custom_error_messages' : {

	    // }
	// });
	// $('#frm_web_log').validationEngine({'custom_error_messages' : {

	    // }
	// });

	$("#dialog-confirm").hide();
	
	$('#activity_search').bind("click", function () {
		if(!$("#frm_log").validationEngine('validate')) {
			return false;
		}
		
		objLog.ActivitySearch("start");	 
		return false;
	});

	$('#activity_search_next').bind("click", function () {
		if(!$("#frm_log").validationEngine('validate')) {
			return false;
		}
		objLog.ActivitySearch("continue");	 
		return false;
	});

	$("#activityLogSearch").bind("load", function(){
    	alert("Image loaded.");
	}); 

	$('#cdr_log_search').bind("click", function () {
		if(!$("#frm_log").validationEngine('validate')) {
			return false;
		}
		
		objLog.CdrLogSearch("start");	 
		return false;
	});

	$('#cdr_log_search_next').bind("click", function () {
		if(!$("#frm_log").validationEngine('validate')) {
			return false;
		}
		
		objLog.CdrLogSearch("continue");	 
		return false;
	});


	// CSV Export 
	$('#act_csv').bind("click", function () {	
		//objLog.exportDynamicContent();	
		objLog.ActivityCsv();	
		return false;
	});	

	$('#cdr_csv').bind("click", function () {				
		objLog.CdrLogCsv();
		//objLog.exportDynamicContent(); 				
		return false;
	});		
	
	$('#search').bind("click", function () {
		if(!$("#frm_log").validationEngine('validate')) {
			return false;
		}
	
		objLog.SearchLog();	 
		return false;
	});	


	$('#types').bind("change", function () {
		if($('#types').val()=="rej_calls_log"){
			$('#numbers').show();
		}
		else
		{
			$('#numbers').hide();
		}
	});
	
	// CSV Export 
	$('#log_csv').bind("click", function () {				
		objLog.exportCsv(); 				
		return false;
	});	

	$('#reset').bind("click", function () {							
		return false;
	});	


	$.fx.speeds._default = 1000;  
	$(function() {
	   $( "#view_dialog" ).dialog({
		  autoOpen: false,
		  show: "blind",
		  hide: "explode",
		  resizable: false
	   });
	   
	   $("#view_dialog").dialog({ minHeight: 200 });
	   $("#view_dialog").dialog({ minWidth: 720 }); 		   
	});
	
	// Hide update button on page load	
	$('#log_csv').hide();
	$('#act_csv').hide();
	$('#uploading').hide(); 
	objLog.grantAccess();

	$('#web_service').bind("change", function () {
		if($('#web_service').val()=="statistics_webservice_log"){
			$('#app_id_tr').hide();
			$('#service_id_tr').hide();
			$('#response_code_tr').hide();
		}
		 else if($('#web_service').val()=="service_mgt_webservice_log")
		{
			$('#app_id_tr').hide();
			$('#service_id_tr').show();
			$('#response_code_tr').show();
		}
		else if($('#web_service').val()=="list_management_webservice_log")
		{
			$('#app_id_tr').show();
			$('#service_id_tr').hide();
			$('#response_code_tr').hide();
		}
	});

	$('#web_log_search').bind("click", function () {
		if(!$("#frm_web_log").validationEngine('validate')) {
			return false;
		}
		$('#web_log_csv').hide();
		$('#web_log_search_next').hide();
		objLog.WebLogSearch("start");	 
		return false;
	});

	$('#web_log_search_next').bind("click", function () {
		objLog.WebLogSearch("continue");	 
		return false;
	});

	$('#web_log_csv').bind("click", function () {
		if(!$("#frm_web_log").validationEngine('validate')) {
			return false;
		}
		
		objLog.WebLogCsv();	 
		return false;
	});


	//hide on  onload
	$('#app_id_tr').hide();
	$('#service_id_tr').hide();
	$('#response_code_tr').hide();
	$('#web_log_csv').hide();


var startDateTextBox = $('#fromDate');
var endDateTextBox = $('#toDate');
  $.timepicker.datetimeRange(
  startDateTextBox,
  endDateTextBox,
  {
    minInterval: (1000*60), // 1s
    maxInterval: (config.log_search_maximum_range), 
    dateFormat: 'yy/mm/dd', 
    timeFormat: 'HH:mm:ss',
    start: {showSecond: false,}, // start picker options
    end: { showSecond: false,  onSelect: function (selectedDateTime){
		startWebDateTextBox.datetimepicker('option', 'maxDate', null );
	}}        
  }
);

var startWebDateTextBox = $('#webFromDate');
var endWebDateTextBox = $('#webToDate');
  $.timepicker.datetimeRange(
  startWebDateTextBox,
  endWebDateTextBox,
  {
    minInterval: (1000*60), // 1s
    maxInterval: (config.web_service_log_search_maximum_range), 
    dateFormat: 'yy/mm/dd', 
    timeFormat: 'HH:mm:ss',
    start: {showSecond: false}, 
    end: {showSecond: false, onSelect: function (selectedDateTime){
		startWebDateTextBox.datetimepicker('option', 'maxDate', null );
	}}         
  }
);

var startAdminDateTextBox = $('#adminFromDate');
var endAdminDateTextBox = $('#adminToDate');
  $.timepicker.datetimeRange(
  startAdminDateTextBox,
  endAdminDateTextBox,
  {
    minInterval: (1000*60), // 1s
    maxInterval: (config.admin_log_search_maximum_range), 
    dateFormat: 'yy/mm/dd', 
    timeFormat: 'HH:mm:ss',
    start: {showSecond: false}, 
    end: {showSecond: false, onSelect: function (selectedDateTime){
		startAdminDateTextBox.datetimepicker('option', 'maxDate', null );
	}}         
  }
);

});

function formatTimeToHHMMSS( date_time){
	var format_time_date="N/A";
	if(date_time !="undefined"){
	var	time_date = date_time.split(' ');
	var date_g = time_date[0];
	var time_g = time_date[1];
	var time_array = time_g.split(':');
	if(time_array[0]<10){
	time_array[0]='0'+time_array[0];
	}
	if(time_array[1]<10){
	time_array[1]='0'+time_array[1];
	}
	if(time_array[2]<10){
	time_array[2]='0'+time_array[2];
	}
	  format_time_date = date_g + " " + time_array[0] + ":" + time_array[1] + ":" + time_array[2];
	}
	return format_time_date;
}

var objProvider= new ProviderManager();

