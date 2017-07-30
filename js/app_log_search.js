	/*
 * LogManager class which handles user management
 */
var cur_page = 0;
 
function LogManager() {
	
}

/* Summary POP-UP Function Set End */


LogManager.prototype.getLogTypes = function(currentValue) {
	
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

LogManager.prototype.SearchLog = function() {	
	
	var search_date   	= $('#fromTime').val();
	var keyword   		= $('#keyword').val();
	var log_type		= $('#types').val();	
	
	var user_list	= '';
	var rec_count 	= 0; 
	
	if(keyword == "")
	{
		user_list += '<tbody role="alert" aria-live="polite" aria-relevant="all"><tr class="even">'
				+ '<td colspan="6">No data</td>'
			+ '</tr></tbody>';
	}
	else
	{
		var request_data = '{"action":"LOG_SEARCH","search_date":"' + search_date + '","keyword":"' + keyword + '","log_type":"' + log_type + '"}';		
		
		var response_data = obj_common.ajaxRequest(config.yaws_file_path + 'log_search.yaws', request_data); 
		
		user_list = '';
		
		if(response_data[0].status == "ok")
		{
			if(response_data[0].message != "")
			{
				user_list += '<tbody role="alert" aria-live="polite" aria-relevant="all">';	
				
				var res = response_data[0].message;
				
				for (var i in res) 
				{
					rec_count++;
					
					var style = (i % 2 != 0 ? "even" : "odd");
					
					switch(log_type)
					{
						case 'admin_log':
						
							user_list += '<tr>'
								+ '<td>' + res[i].date_time + '</td>'		
								+ '<td>' + res[i].user + '</td>'		
								+ '<td>' + res[i].unique_id + '</td>'	
								//+ '<td>' + res[i].err_type + '</td>'		
								+ '<td>' + res[i].message + '</td>'	
							+ '</tr>';
							
							break;
							
						case 'user_log':
						
							user_list += '<tr>'
								+ '<td>' + res[i].date + ' ' + res[i].time + '</td>'		
								+ '<td>' + res[i].user + '</td>'		
								+ '<td>' + res[i].unique_id + '</td>'			
								+ '<td>' + res[i].message + '</td>'	
							+ '</tr>';
							
							break;
			
					}
				}

				user_list += '</tbody>';
				
				$('#csv').show();

			}
			else
			{
				user_list += '<tbody role="alert" aria-live="polite" aria-relevant="all"><tr class="even">'
					+ '<td colspan="6">No data</td>'
				+ '</tr></tbody>';
				
				$('#csv').hide();
			}			
		}
		else
		{
			user_list += '<tbody role="alert" aria-live="polite" aria-relevant="all"><tr class="even">'
				+ '<td colspan="6">No data</td>'
			+ '</tr></tbody>';
			
			$('#csv').hide();
			
			objApp.setFlash('error', response_data[0].message);
		}		
	}
	
	switch(log_type)
	{
		case 'admin_log':
		
			var user_table = ''	
			+ '<table border="0" align="center" cellpadding="0" cellspacing="1" class="results_mini" id="mt" width="100%">'
				+ '<thead><tr>'
					+ '<th width="20%" id="name">Date/Time</th>'
					+ '<th width="10%" id="des">User</th>'
					+ '<th width="10%" id="frm">Unique ID</th>'
					//+ '<th width="10%" id="frm">Error Type</th>'
					+ '<th width="50%" id="to">Message</th>'
				+ '</tr></thead>'
				+ user_list
			+ '</table>'
			+ '<div id="pager" style="margin: auto;">';
			
			break;
			
		case 'user_log':
		
			var user_table = ''	
			+ '<table border="0" align="center" cellpadding="0" cellspacing="1" class="results_mini" id="mt" width="100%">'
				+ '<thead><tr>'
					+ '<th width="15%" id="name">Date/Time</th>'
					+ '<th width="10%" id="des">User</th>'
					+ '<th width="10%" id="frm">Unique ID</th>'
					+ '<th width="65%" id="to">Message</th>'
				+ '</tr></thead>'
				+ user_list
			+ '</table>'
			+ '<div id="pager" style="margin: auto;">';
			
			break;
						
	}	
	
	jQuery('#log_data_tbl').html(user_table); 

	$('#pager').smartpaginator({ 
		totalrecords: rec_count,
		recordsperpage: config.rec_per_page, 
		datacontainer: 'mt', 
		dataelement: 'tr',
		theme: 'custom',
		initval:cur_page,
		onchange: this.onPageChange
	});	
}

/**
 * Export numbers to CSV.
 */
LogManager.prototype.exportCsv = function() {
		
	var search_date   	= $('#fromTime').val();
	var keyword   		= $('#keyword').val();
	var log_type		= $('#types').val();	
	
	var user_list	= '';
	var rec_count 	= 0; 
	
	if(keyword == "")
	{
		objApp.setFlash('error', "Please enter the keyword");
	}
	else
	{
		var request_data = '{"action":"LOG_SEARCH_CSV","search_date":"' + search_date + '","keyword":"' + keyword + '","log_type":"' + log_type + '"}';		
		
		var response_data = obj_common.ajaxRequest(config.yaws_file_path + 'log_search.yaws', request_data); 

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
}


jQuery(document).ready(function() {

	// User management form
	$('#frm_log').validationEngine({'custom_error_messages' : {

	    }
	});
	
	$('#search').bind("click", function () {
		if(!$("#frm_log").validationEngine('validate')) {
			return false;
		}
	
		objLog.SearchLog();	 
		return false;
	});	
	
	// CSV Export 
	$('#csv').bind("click", function () {				
		objLog.exportCsv(); 				
		return false;
	});	

	var startDateTextBox = $('#fromTime');
	var endDateTextBox = $('#toTime');

	startDateTextBox.datepicker({
		showSecond: true,
		timeFormat: 'hh:mm:ss',
		dateFormat: "yy/mm/dd",
		onClose: function(dateText, inst) {
			if (endDateTextBox.val() != '') {
				var testStartDate = startDateTextBox.datepicker('getDate');
				var testEndDate = endDateTextBox.datepicker('getDate');
				if (testStartDate > testEndDate)
					endDateTextBox.datepicker('setDate', testStartDate);
			}
			else {
				endDateTextBox.val(dateText);
			}
		},
		onSelect: function (selectedDateTime){
			endDateTextBox.datepicker('option', 'minDate', startDateTextBox.datepicker('getDate') );
		}
	});
	endDateTextBox.datepicker({
		showSecond: true,
		timeFormat: 'hh:mm:ss',
		dateFormat: "yy/mm/dd",
		onClose: function(dateText, inst) {
			if (startDateTextBox.val() != '') {
				var testStartDate = startDateTextBox.datepicker('getDate');
				var testEndDate = endDateTextBox.datepicker('getDate');
				if (testStartDate > testEndDate)
					startDateTextBox.datepicker('setDate', testEndDate);
			}
			else {
				startDateTextBox.val(dateText);
			}
		},
		onSelect: function (selectedDateTime){
			startDateTextBox.datepicker('option', 'maxDate', endDateTextBox.datepicker('getDate') );
		}
	});
	
	// Hide update button on page load
	$('#csv').hide();
});

var objLog = new LogManager();

