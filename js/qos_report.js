//Handle IVR Reports

var YAWS_PATH = config.yaws_file_path + 'hits_counter_report.yaws';
var csvMessage="";

function qosReport() {
	
}
qosReport.prototype.getStartYear = function(currentValue) {
	
	var start_year = config.start_year;
	
	var str = '<option value="" selected>--</option>';

	for (var i in start_year)
	{
		if (currentValue != null && currentValue == start_year[i].value) 
		{
			return start_year[i].description;
		}
		
		str += '<option value="' + start_year[i].value + '">' + start_year[i].description + '</option>';
	}

	if(currentValue)
	{
		return currentValue;
	}	
	
	$('#start_year').html(str); 
}


qosReport.prototype.getStartMonth = function(currentValue) {
	
	var start_month = config.start_month;
	
	var str = '<option value="" selected>--</option>';

	for (var i in start_month)
	{
		if (currentValue != null && currentValue == start_month[i].value) 
		{
			return start_month[i].description;
		}
		
		str += '<option value="' + start_month[i].value + '">' + start_month[i].description + '</option>';
	}

	if(currentValue)
	{
		return currentValue;
	}	
	
	$('#start_month').html(str); 
}
qosReport.prototype.getMonths = function() {
	selection = document.getElementById('months');
	for (i=1;i <=config.months_limit;i++){
		selection.options[selection.options.length] = new Option(i, i);
	}
}
qosReport.prototype.getHours = function() {
	selection = document.getElementById('hours');
	for (i=1;i <=config.hours_limit;i++){
		selection.options[selection.options.length] = new Option(i, i);
	}
}
qosReport.prototype.getDays = function() {
	selection = document.getElementById('days');
	for (i=1;i <=config.days_limit;i++){
		selection.options[selection.options.length] = new Option(i, i);
	}
}

qosReport.prototype.getYears = function() {
	selection = document.getElementById('years');
	for (i=1;i <=config.years_limit;i++){
		selection.options[selection.options.length] = new Option(i, i);
	}
}

qosReport.prototype.search = function() {
	var fromDate=objQosReport.calculateDate()[0];	
	var toDate=objQosReport.calculateDate()[1];	
	var type=$("#type").val();
	if(type=="Hourly"){
		var fromTS=(fromDate.getUTCFullYear().toString().substring(2));
		fromTS+=fromDate.getMonth()+1 >9 ? fromDate.getMonth()+1 : '0'+(fromDate.getMonth()+1);
		fromTS+=fromDate.getUTCDate()  >9 ? fromDate.getUTCDate() : '0'+(fromDate.getUTCDate());
		fromTS+=fromDate.getUTCHours() >9 ? fromDate.getUTCHours(): '0'+(fromDate.getUTCHours());

		var toTS=(toDate.getUTCFullYear().toString().substring(2));
		toTS+=toDate.getMonth()+1 >9 ? toDate.getMonth()+1 : '0'+(toDate.getMonth()+1);
		toTS+=toDate.getUTCDate()  >9 ? toDate.getUTCDate() : '0'+(toDate.getUTCDate());
		toTS+=toDate.getUTCHours() >9 ? toDate.getUTCHours(): '0'+(toDate.getUTCHours());
	}
	if(type=="Daily"){
		var fromTS=(fromDate.getUTCFullYear().toString().substring(2));
		fromTS+=fromDate.getMonth()+1 >9 ? fromDate.getMonth()+1 : '0'+(fromDate.getMonth()+1);
		fromTS+=fromDate.getUTCDate()  >9 ? fromDate.getUTCDate() : '0'+(fromDate.getUTCDate());

		var toTS=(toDate.getUTCFullYear().toString().substring(2));
		toTS+=toDate.getMonth()+1 >9 ? toDate.getMonth()+1 : '0'+(toDate.getMonth()+1);
		toTS+=toDate.getUTCDate()  >9 ? toDate.getUTCDate() : '0'+(toDate.getUTCDate());	
	}
	if(type=="Monthly"){
		var fromTS=(fromDate.getUTCFullYear().toString().substring(2));
		fromTS+=fromDate.getMonth()+1 >9 ? fromDate.getMonth()+1 : '0'+(fromDate.getMonth()+1);

		var toTS=(toDate.getUTCFullYear().toString().substring(2));
		toTS+=toDate.getMonth()+1 >9 ? toDate.getMonth()+1 : '0'+(toDate.getMonth()+1);	
	}
	if(type=="Yearly"){
		var fromTS=(fromDate.getUTCFullYear().toString().substring(2));
		var toTS=(toDate.getUTCFullYear().toString().substring(2));
		}
	var graph_type=$("#graph_type").val();
	var log_type="ivr_cdr_log";
	var searching_category="qos_report";
	var request_data="hits";
	var static_data=',"log_type":"'+log_type+'","searching_category":"'+searching_category+'","request_data":"'+request_data+'"';
	var searchData="shortcode:"+$("#access_code").val()+"#error_type:"+$("#failure_type").val()+"#error_reason:"+$("#failure_reason").val()+"#action_point:"+$("#failure_location").val();
	var request_data = '{"action":"GET_REPORT_DATA","from_date":"'+fromTS+'","to_date":"'+toTS+'","type":"'+type+'","search_data":"'+searchData+'","graph_type":"'+graph_type+'"'+static_data+'}';
	response_data = obj_common.ajaxRequest(YAWS_PATH, request_data);

	if ('error' == response_data[0].status) 
	{
		$("#graphs_badfill").hide();
		$("#tables_badfill").hide();
		//objApp.setFlash('error', response_data[0].reason);
		$( "#dialog" ).html("<br><center><h1>No Result Found</h1></center>").dialog( "open" );
		return false;
	} 
	else 
	{
		objQosReport.showTable(response_data);
		objQosReport.drawGraph(response_data);
		return true;
		//obj_common.resetForm($('#frm_hits_counter'));
	}
}


qosReport.prototype.drawGraph = function(response_data) {


	var x=[];
	for (i in response_data){
			x=x.concat(response_data[i].short_code);
	}
	// //alert(x);
	var uniqX = [];
	$.each(x, function(i, el){
	    if($.inArray(el, uniqX) === -1) 
	    	uniqX.push(el);
	});
	 ////alert(uniqX);
	var y=[];
	for (var i in response_data){
			y=y.concat(response_data[i].time_digit);
	}
	// //alert(y);
	var uniqY = [];
	$.each(y, function(i, el){
	    if($.inArray(el, uniqY) === -1) 
	    	uniqY.push(el);
	});
	var seriesData=[];
	var hits;


	var total_hits=0;
	var success_hits=0;
	var total_failures=0;
	var total_system_failures=0;
	var total_user_failures=0;
	var total_network_failures=0;
	var total_application_failures=0;

	for(i in response_data){
		if(response_data[i].data[0].total_hits ==undefined){
		}
		else{
			success_hits+=parseInt(response_data[i].data[0].total_hits);
		}
		if(response_data[i].data[0].total_failures ==undefined){
               			
                }
                else{
                        total_failures+=parseInt(response_data[i].data[0].total_failures);
                        total_system_failures+=parseInt(response_data[i].data[0].system_failures);
                        total_user_failures+=parseInt(response_data[i].data[0].user_failures);
                        total_network_failures+=parseInt(response_data[i].data[0].network_failures);
                        total_application_failures+=parseInt(response_data[i].data[0].application_failures);

                }
			
	}
	//	alert("total_failures:"+total_failures+"\ntotal_hits:"+total_hits+"\ntotal_system_failures:"+total_system_failures+"\ntotal_user_failures"+total_user_failures+"\ntotal_application_failures:"+total_application_failures+"\npercentage of system failuers:"+total_system_failures/(total_failures+total_hits)*100);
		total_hits=success_hits+total_failures;
		total_system_failures=parseFloat((total_system_failures/total_hits*100).toFixed(2));
		total_user_failures=parseFloat((total_user_failures/total_hits*100).toFixed(2));
		total_network_failures=parseFloat((total_network_failures/total_hits*100).toFixed(2));
		total_application_failures=parseFloat((total_application_failures/total_hits*100).toFixed(2));
		success_hits=parseFloat((success_hits/total_hits*100).toFixed(2));
	//alert("total_system_failures="+total_system_failures+"%\ntotal_user_failures:"+total_user_failures+"%\ntotal_application_failures:"+total_application_failures+"%\nsuccess_hits:"+success_hits+"%\n");
		
		

		var data=[
                ['Total System Failures', total_system_failures],
                ['Total Network Failures', total_network_failures],
                ['Total User Failures', total_user_failures],
                {
                    name: 'Success Hits',
                    y: success_hits,
                    sliced: true,
                    selected: true
                },
                ['Total Application Failures', total_application_failures],
            ]

		$(function () {
  		 var chart = new Highcharts.Chart({
		                chart: {
		                    plotBackgroundColor: null,
		                    plotBorderWidth: null,
		                    plotShadow: false,
		                    renderTo: 'graphs',
		                    zoomType: 'xy',
		                    type: 'pi'
		                },
        title: {
            text: 'QoS/Performance Report'
        },
        tooltip: {
            formatter: function() {
    		return Highcharts.numberFormat(this.y, 2) +' %';
			},
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>: {point.y:.1f} %',
                    style: {
                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                    }
                }
            }
        },
        series: [{
            type: 'pie',
            name: 'QOS Reports',
            data: data
        }]
    });
});

}



qosReport.prototype.showTable = function(response_data) {
	csvMessage="";
	csvMessage="Failure Type,Qos Percentage %\n";
	var rec_count=0;
	var rec_list='';
	var x=[];
	for (i in response_data){
			x=x.concat(response_data[i].short_code);
	}
	// //alert(x);
	var uniqX = [];
	$.each(x, function(i, el){
	    if($.inArray(el, uniqX) === -1) 
	    	uniqX.push(el);
	});
	 ////alert(uniqX);
	var y=[];
	for (var i in response_data){
			y=y.concat(response_data[i].time_digit);
	}
	// //alert(y);
	var uniqY = [];
	$.each(y, function(i, el){
	    if($.inArray(el, uniqY) === -1) 
	    	uniqY.push(el);
	});



	var total_hits=0;
	var success_hits=0;
	var total_failures=0;
	var total_system_failures=0;
	var total_user_failures=0;
	var total_network_failures=0;
	var total_application_failures=0;

	for(i in response_data){
		if(response_data[i].data[0].total_hits ==undefined){
		}
		else{
			success_hits+=parseInt(response_data[i].data[0].total_hits);
		}
		if(response_data[i].data[0].total_failures ==undefined){
                        total_failures+=0;
                        total_system_failures+=0;
                        total_user_failures+=0;
                        total_network_failures+=0;
                        total_application_failures+=0;
                }
                else{
                        total_failures+=parseInt(response_data[i].data[0].total_failures);
                        total_system_failures+=parseInt(response_data[i].data[0].system_failures);
                        total_user_failures+=parseInt(response_data[i].data[0].user_failures);
                        total_network_failures+=parseInt(response_data[i].data[0].network_failures);
                        total_application_failures+=parseInt(response_data[i].data[0].application_failures);
                }

	}
		//alert("total_failures:"+total_failures+"\ntotal_hits:"+total_hits+"\ntotal_system_failures:"+total_system_failures+"\ntotal_user_failures"+total_user_failures+"\ntotal_application_failures:"+total_application_failures+"\npercentage of system failuers:"+total_system_failures/(total_failures+total_hits)*100);
		total_hits=success_hits+total_failures;
		total_system_failures=(total_system_failures/total_hits*100);
		total_user_failures=(total_user_failures/total_hits*100);
		total_network_failures=(total_network_failures/total_hits*100);
		total_application_failures=(total_application_failures/total_hits*100);
		success_hits=(success_hits/total_hits*100);

		csvMessage+="Total System Failures,"+total_system_failures+"\nTotal User Failures,"+total_user_failures+"\nTotal Network Failures,"+total_network_failures+"\nTotal Application Failures,"+total_application_failures+"\nSuccess Hits,"+success_hits+"\n";
		rec_list += '<tr>'
			+ '<td >Total System Failures</td>'
		rec_list += '<td>'+total_system_failures.toFixed(2)+'</td>'		
		+ '</tr>'; 


		rec_list += '<tr>'
			+ '<td >Total User Failures</td>'
		rec_list += '<td>'+total_user_failures.toFixed(2)+'</td>'		
		+ '</tr>'; 

		rec_list += '<tr>'
			+ '<td >Total Network Failures</td>'
		rec_list += '<td>'+total_network_failures.toFixed(2)+'</td>'		
		+ '</tr>'; 

		rec_list += '<tr>'
				+ '<td >Total Application Failures</td>'
			rec_list += '<td>'+total_application_failures.toFixed(2)+'</td>'		
			+ '</tr>'; 

		rec_list += '<tr>'
			+ '<td >Success Hits</td>'
		rec_list += '<td>'+success_hits.toFixed(2)+'</td>'		
		+ '</tr>'; 

		rec_count=5;
		 var list_table = ''	
		+ '<table border="0" align="center" cellpadding="0" cellspacing="1" class="results_mini" id="mt" width="50%">'
			+ '<tr>'
				+ '<th width="50%">Failure Type and Success Hits </th>';
				
					list_table += '<th width="50%" > Qos Percentage % (roundup values)</th>';
				
			list_table += '</tr>';
			list_table += rec_list
		+ '</table>' 
		+ '<div id="pager" style="margin: auto;">';

	jQuery('#tables	').html(list_table);
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

qosReport.prototype.showFildes = function() {
	var type=$("#type").val();
	if(type =="Hourly"){

		$("#days-tr").hide();
		$("#months-tr").hide();
		$("#years-tr").hide();
		$("#start_time-tr").show();
		$("#start_date-tr").show();
		$("#start_month-tr").hide();
		$("#start_year-tr").hide();
		$("#hours-tr").show();
	}
	if(type =="Daily"){
		$("#hours-tr").hide();
		$("#months-tr").hide();
		$("#start_time-tr").hide();
		$("#start_date-tr").show();
		$("#start_month-tr").hide();
		$("#start_year-tr").hide();
		$("#years-tr").hide();
		$("#days-tr").show();
	}
	if(type =="Monthly"){
		$("#hours-tr").hide();
		$("#days-tr").hide();
		$("#start_time-tr").hide();
		$("#start_date-tr").hide();
		$("#start_month-tr").show();
		$("#start_year-tr").show();
		$("#years-tr").hide();
		$("#months-tr").show();
	}
	if(type =="Yearly"){
		$("#hours-tr").hide();
		$("#days-tr").hide();
		$("#start_time-tr").hide();
		$("#start_date-tr").hide();
		$("#start_month-tr").hide();
		$("#start_year-tr").show();
		$("#months-tr").hide();
		$("#years-tr").show();
	}


}

qosReport.prototype.showFailiureLocation = function() {
	var reason=$('#failure_reason').val();
	if(reason=="internal_error" || reason=="app_not_found" || reason=="app_timeout" || reason=="app_error" || reason=="app_parse_error" ){
		$('#failure_location').empty();
		$('#failure_location').append($("<option></option>").attr("value","").text("Select"));
		$('#failure_location').append($("<option></option>").attr("value","before_anm").text("Before Answer"));
		$('#failure_location').append($("<option></option>").attr("value","after_anm").text("After Answer"));
		$('#failure_location-tr').show();	
	}
	else{
		$('#failure_location').empty();
		$('#failure_location').append($("<option></option>").attr("value","").text("Select"));
		$('#failure_location-tr').hide();
	}
	

}

qosReport.prototype.hideFailiureLocation = function() {
	$('#failure_location').empty();
	$('#failure_location').append($("<option></option>").attr("value","").text("Select"));
	$('#failure_location-tr').hide();
}

qosReport.prototype.showFailiureFildes = function() {

	if($("#failure_type").val()==""){
		$("#failure_reason-tr").hide();
		$('#failure_reason').empty();
		$('#failure_reason').append($("<option></option>").attr("value","").text("Select"));

	}else{
		$("#failure_reason-tr").show();
		if($("#failure_type").val()=="system_failures"){
			var type=config.system_failures_reasons;
		}
		if($("#failure_type").val()=="user_failures"){
			var type=config.user_failures_reasons;
		}
		if($("#failure_type").val()=="application_failures"){
			var type=config.application_failures_reasons;
		}
		$('#failure_reason').empty();
		$('#failure_reason').append($("<option></option>").attr("value","").text("Select"));
		var currentValue;
		for (var i in type)
		{
			if (currentValue != null && currentValue == type[i].value) 
			{
				//alert(type[i].value); // returning value when key is given
			}
			////alert(type[i].value);
			$('#failure_reason').append($("<option></option>").attr("value",type[i].value).text(type[i].description));
		}
	
	}
}

qosReport.prototype.calculateDate= function() {
	var start_date=$("#start_date").val();
	var type=$("#type").val();
	if(type=="Hourly"){
		var start_time=$("#start_time").val();
		var num_of_hours=$("#hours").val();
		var date=new Date((start_date+"T"+start_time+"Z").split("/").join("-"));
		toDate=new Date(new Date(date).setHours(date.getHours()+parseInt(num_of_hours)));
		return [date,toDate];
	} 
	if(type=="Daily"){
		var num_of_days=$("#days").val();
		var date=new Date((start_date+"T00:00:00Z").split("/").join("-"));
		toDate=new Date(new Date(date).setDate(date.getDate()+parseInt(num_of_days)));
		return [date,toDate];

	} 
	if(type=="Monthly"){
		var start_year=$("#start_year").val();
		var start_month=$("#start_month").val();
		var num_of_months=$("#months").val();
		var date=new Date((start_year+"/"+start_month+"/01T00:00:00Z").split("/").join("-"));
		toDate=new Date(new Date(date).setMonth(date.getMonth()+parseInt(num_of_months)));
		return [date,toDate];
	} 
	if(type=="Yearly"){
		var start_year=$("#start_year").val();
		var num_of_years=$("#years").val();
		var date=new Date((start_year+"/01/01T00:00:00Z").split("/").join("-"));
		toDate=new Date(new Date(date).setFullYear(date.getFullYear()+parseInt(num_of_years)));
		return [date,toDate];
	} 
}


qosReport.prototype.csvExport = function() {
var name=new Date().toString()+".csv";
var request_data = '{"action":"EXPORT_CSV","message":"'+csvMessage+'","name":"'+name+'"}';
	response_data = obj_common.ajaxRequest(YAWS_PATH, request_data);

	if ('ok' == response_data[0].status) {
		objApp.setFlash('success', response_data[0].message);
		window.open(response_data[0].csv_url);
	} else {
		objApp.setFlash('error', response_data[0].message);
	}
}


jQuery(document).ready(function() {
	$("#start_time").val("00:00:00");
	$("#days-tr").hide();
	$("#months-tr").hide();
	$("#years-tr").hide();
	$("#failure_reason-tr").hide();
	$("#failure_type-tr").hide();
	$("#failure_reason-tr").hide();
	$("#graph_type-tr").hide();
	$('#failure_reason').empty();
	$('#failure_reason').append($("<option></option>").attr("value","").text("Select"));
	$('#failure_location').empty();
	$('#failure_location').append($("<option></option>").attr("value","").text("Select"));
	$("#graphs_badfill").hide();
	$("#tables_badfill").hide();
	$('#failure_location-tr').hide();

	// $('#frm_hits_counter').validationEngine({
		// 'custom_error_messages' : {

		// }
	// });

	$('#type').change(function()
	{
		objQosReport.showFildes();		
	});

	$('#failure_type').change(function()
	{
		objQosReport.showFailiureFildes();
		objQosReport.hideFailiureLocation();
	});
	$('#failure_reason').change(function()
	{
		objQosReport.showFailiureLocation();
	});


	$("#start_date").datepicker({
		// showSecond: true,
		 timeFormat: 'HH:mm:ss',
		 defaultValue: '00:00:00',
		 dateFormat: "yy/mm/dd",
		onClose: function(dateText, inst) {
			
		},
		onSelect: function (selectedDateTime){
		}
	});

	$('#start_time').timepicker({
		showSecond: false,
		showMinute: false,
		showButtonPanel: true,
		minuteMax : 0,
		secondMax : 0,
		timeFormat: 'HH:mm:ss'
	});


	$('#report').click(function()
	{
		if(!$("#frm_hits_counter").validationEngine('validate')) {
			return false;
		}
		$("#graphs_badfill").hide();
		$("#tables_badfill").show();
		objQosReport.search();
		return false;
		
	});

	$('#graph').click(function()
	{
		if(!$("#frm_hits_counter").validationEngine('validate')) {
			return false;
		}
		$("#graphs_badfill").show();
		$("#tables_badfill").hide();
		objQosReport.search();
		return false;
	});

	$('#csv').click(function()
	{
		if(!$("#frm_hits_counter").validationEngine('validate')) {
			return false;
		}
		if(objQosReport.search()){
			objQosReport.csvExport();
		}
		return false;
	});
	objQosReport.getStartYear();
	objQosReport.getStartMonth();
	$('#start_year-tr').hide();
	$('#start_month-tr').hide();

});
var objQosReport = new qosReport();
