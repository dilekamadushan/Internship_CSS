/*
 * ReportManager class which handles user management
 */
 
var cur_page = 0; 
var refreshIntervalID = 0;
var objDiv = ""; 
var report = "";
var initialStartVal = "0";
 
function ReportManager() {
	
}


ReportManager.prototype.logMonitor = function () {
	// request_data = new Object();
	// request_data.action = "LOG_MONITOR";
	// request_data = JSON.stringify(request_data);

	var request_data = '{"action":"LOG_MONITOR","lineCount":"'+ $('#tail_number').val() +'", "startIndex":"'+ initialStartVal +'"}';
	//console.log("Point 3");
	console.log(config.yaws_file_path + 'report_manager.yaws');
	response_data = obj_common.ajaxRequest(config.yaws_file_path + 'report_manager.yaws', request_data);
	//response_data = obj_common.str_replace("\n", "<br />", response_data);
	if(response_data[0].lines != ""){
		var response_data_formatted = obj_common.str_replace("<br />", "", response_data[0].lines);
		response_data_formatted = obj_common.str_replace("<", "&lt;", response_data_formatted);
		response_data_formatted = obj_common.str_replace(">", "&gt;", response_data_formatted);
		response_data_formatted = obj_common.str_replace("\n", "<br/>", response_data_formatted);
		response_data_formatted = obj_common.str_replace("\t", "&nbsp;&nbsp;&nbsp;&nbsp;", response_data_formatted);
		//response_data_formatted = "<br/><br/><br/><br/><br/>" + response_data_formatted;
		report = report + response_data_formatted;
	 	initialStartVal = response_data[0].startVal;
		$("#log_monitor_result").html(report);
	}
}

ReportManager.prototype.clearCMD = function () {
	report = "";
	$("#log_monitor_result").html("");
}

ReportManager.prototype.startCMD = function () {
	$("#trace_log_div").css("font-size", $('#term_font_size').val());
	$("#trace_log_div").css("color", $('#term_font_color').val());
	$("#trace_log_div").css("background-color", $('#term_bk_color').val());
	var request_data = '{"action":"WRITE_TO_ADMIN_LOG","log_action":"start"}';
	obj_common.ajaxRequest(config.yaws_file_path + 'report_manager.yaws', request_data);

	$('#onOroff').val("Stop");
	refreshIntervalID = window.setInterval(function() {
		objDiv = document.getElementById("trace_log_div");
		objDiv.scrollTop = 10000;
		objReport.logMonitor();
	}, $('#refresh_interval').val());
}

ReportManager.prototype.stopCMD = function () {
	 report = "";
	var request_data = '{"action":"WRITE_TO_ADMIN_LOG","log_action":"stop"}';
	obj_common.ajaxRequest(config.yaws_file_path + 'report_manager.yaws', request_data);
	clearInterval(refreshIntervalID);
	$('#onOroff').val("Start");
}



jQuery(document).ready(function() {

	objDiv = document.getElementById("trace_log_div");
	objDiv.scrollTop = 10000;

	$('#clear_cmd').bind("click", function () {	
		objReport.clearCMD(); 				
		return false;
	});

	$('#onOroff').bind("click", function () {	
		if($('#onOroff').val() == "Start"){
			objReport.startCMD(); 	
			$( "#tail_number" ).prop( "disabled", true);
			$( "#refresh_interval" ).prop( "disabled", true);
			$( "#term_font_size" ).prop( "disabled", true);
			$( "#term_font_color" ).prop( "disabled", true);
			$( "#term_bk_color" ).prop( "disabled", true);			
			return false;
		}

		if($('#onOroff').val() == "Stop"){
			objReport.stopCMD(); 
			$( "#tail_number" ).prop( "disabled", false);
			$( "#refresh_interval" ).prop( "disabled", false);
			$( "#term_font_size" ).prop( "disabled", false);
			$( "#term_font_color" ).prop( "disabled", false);
			$( "#term_bk_color" ).prop( "disabled", false);					
			return false;
		}

		
	});	
	

});

var objReport = new ReportManager();
var obj_common = new Common();