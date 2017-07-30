//Handle IVR Reports

var YAWS_PATH = config.yaws_file_path + 'hits_counter_report.yaws';
var response_data;

function CircuitUtilReport() {
}


CircuitUtilReport.prototype.getStartYear = function(currentValue) {
	
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


CircuitUtilReport.prototype.getStartMonth = function(currentValue) {
	
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


CircuitUtilReport.prototype.getTimeLabel = function() {

	if($("#type").val()=="Minutely"){
		return "Minute";
	}
	if($("#type").val()=="Hourly"){
		return "Hour";
	}
	if($("#type").val()=="Daily"){
		return "Day";
	}
	
	if($("#type").val()=="Monthly"){
		return "Month";
	}
	
	if($("#type").val()=="Yearly"){
		return "Year";
	}

}


CircuitUtilReport.prototype.showResultTable = function(list_table,rec_count) {
jQuery('#tables	').html(list_table);
	$('#pager').smartpaginator({ 
		totalrecords: rec_count,
		recordsperpage: 60,//config.rec_per_page, 
		datacontainer: 'mt', 
		dataelement: 'tr',
		theme: 'custom',
		initval:0,
		onchange: this.onPageChange
	});	
}

CircuitUtilReport.prototype.getMonths = function() {
	selection = document.getElementById('months');
	for (i=1;i <=config.months_limit;i++){
		selection.options[selection.options.length] = new Option(i, i);
	}
}
CircuitUtilReport.prototype.getHours = function() {
	selection = document.getElementById('hours');
	for (i=1;i <=config.hours_limit;i++){
		selection.options[selection.options.length] = new Option(i, i);
	}
}
CircuitUtilReport.prototype.getDays = function() {
	selection = document.getElementById('days');
	for (i=1;i <=config.days_limit;i++){
		selection.options[selection.options.length] = new Option(i, i);
	}
}

CircuitUtilReport.prototype.getYears = function() {
	selection = document.getElementById('years');
	for (i=1;i <=config.years_limit;i++){
		selection.options[selection.options.length] = new Option(i, i);
	}
}

CircuitUtilReport.prototype.search = function() {
	var fromDate=objCircuitUtil.calculateDate()[0];	
	var toDate=objCircuitUtil.calculateDate()[1];	
	var type=$("#type").val();
	if(type=="Minutely"){
		var fromTS=(fromDate.getUTCFullYear().toString().substring(2));
		fromTS+=fromDate.getMonth()+1 >9 ? fromDate.getMonth()+1 : '0'+(fromDate.getMonth()+1);
		fromTS+=fromDate.getUTCDate()  >9 ? fromDate.getUTCDate() : '0'+(fromDate.getUTCDate());
		fromTS+=fromDate.getUTCHours() >9 ? fromDate.getUTCHours(): '0'+(fromDate.getUTCHours());

		var toTS=(toDate.getUTCFullYear().toString().substring(2));
		toTS+=toDate.getMonth()+1 >9 ? toDate.getMonth()+1 : '0'+(toDate.getMonth()+1);
		toTS+=toDate.getUTCDate()  >9 ? toDate.getUTCDate() : '0'+(toDate.getUTCDate());
		toTS+=toDate.getUTCHours() >9 ? toDate.getUTCHours(): '0'+(toDate.getUTCHours());
	}
	
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
	
	if(type=="Minutely"){
			 searching_category="channel_usage_minite";
			 final_type = "Hourly";
		}else{
			searching_category="channel_usage";	
			final_type = type;
	}
	

	
	var log_type = "chan_utilization";
	var static_data=',"log_type":"'+log_type+'","searching_category":"'+searching_category+'"';
	var searchData;
	
	var request_data = '{"action":"GET_REPORT_DATA","from_date":"'+fromTS+'","to_date":"'+toTS+'","type":"'+final_type+'"'+static_data+'}';
	response_data = obj_common.ajaxRequest(YAWS_PATH, request_data);

	if ('error' == response_data[0].status) 
	{
		$("#graphs_badfill").hide();
		$("#tables_badfill").hide();
		//objApp.setFlash('error', response_data[0].reason);
		var respose_reason =response_data[0].reason ;
		 
		if( respose_reason == "No results found"){
		$('#alert').dialog('option', 'title', 'No results found');
		$( "#alert" ).html("<br><center><h1>"+respose_reason+"</h1></center>").dialog( "open" );
		}else{
		$('#alert').dialog('option', 'title', 'Excessive data found');		 
		$( "#alert" ).html("<br><center><h1 style='font-size: 19px;'>"+respose_reason+"</h1></center>").dialog( "open" );
		}		 
		return false;
		
	} 
	else 
	{
		objCircuitUtil.showTable(response_data);
		objCircuitUtil.drawGraph(response_data);
		return true;
		}
}

CircuitUtilReport.prototype.showFildes = function() {
	var type=$("#type").val();
	
if(type =="Minutely"){
		$("#days-tr").hide();
		$("#months-tr").hide();
		$("#years-tr").hide();
		$("#start_time-tr").show();
		$("#start_date-tr").show();
		$("#start_month-tr").hide();
		$("#start_year-tr").hide();
		$("#hours-tr").hide();
	}
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

CircuitUtilReport.prototype.calculateDate= function() {
	var start_date=$("#start_date").val();
	var type=$("#type").val();
	
	if(type=="Minutely"){
		var start_time=$("#start_time").val();
		var num_of_hours= 1;
		var date=new Date((start_date+"T"+start_time+"Z").split("/").join("-"));
		toDate=new Date(new Date(date).setHours(date.getHours()+parseInt(num_of_hours)));
		return [date,toDate];
	} 
	
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

CircuitUtilReport.prototype.getYaxis= function() {
	var start_date=$("#start_date").val();
	var type=$("#type").val();
	var yAxis=[];
	if(type=="Minutely"){
		var start_time=$("#start_time").val();
		var num_of_hours=parseInt($("#hours").val());
		var date=new Date((start_date+"T"+start_time+"Z").split("/").join("-"));
		for(i=1;i<=60;i++){
			yAxis.push(i+"");
		}
	}
	
	if(type=="Hourly"){
		var start_time=$("#start_time").val();
		var num_of_hours=parseInt($("#hours").val());
		var date=new Date((start_date+"T"+start_time+"Z").split("/").join("-"));
		for(i=1;i<=num_of_hours;i++){
			toDate=new Date(new Date(date).setHours(date.getHours()+i));
			var toTS = "";
			if(toDate.getUTCHours() == 0){
				var midNightToDate=new Date(new Date(toDate).setDate(toDate.getDate()-1));
				toTS+=(midNightToDate.getUTCFullYear().toString().substring(2));
				toTS+=midNightToDate.getMonth()+1 >9 ? midNightToDate.getMonth()+1 : '0'+(midNightToDate.getMonth()+1);
				toTS+=midNightToDate.getUTCDate()  >9 ? midNightToDate.getUTCDate() : '0'+(midNightToDate.getUTCDate());
				toTS+=24;
			}
			else{
				toTS+=(toDate.getUTCFullYear().toString().substring(2));
				toTS+=toDate.getMonth()+1 >9 ? toDate.getMonth()+1 : '0'+(toDate.getMonth()+1);
				toTS+=toDate.getUTCDate()  >9 ? toDate.getUTCDate() : '0'+(toDate.getUTCDate());
				toTS+=toDate.getUTCHours() >9 ? toDate.getUTCHours(): '0'+(toDate.getUTCHours());	
			}
			yAxis.push(toTS);
		}
	}
	if(type=="Daily"){
		var num_of_days=parseInt($("#days").val());
		var start_date=$("#start_date").val();
		var date=new Date((start_date+"T00:00:00Z").split("/").join("-"));
		for(i=0;i<num_of_days;i++){
			toDate=new Date(new Date(date).setDate(date.getDate()+i));
			var toTS=(toDate.getUTCFullYear().toString().substring(2));
			toTS+=toDate.getMonth()+1 >9 ? toDate.getMonth()+1 : '0'+(toDate.getMonth()+1);
			toTS+=toDate.getUTCDate()  >9 ? toDate.getUTCDate() : '0'+(toDate.getUTCDate());
			yAxis.push(toTS);
		}
	}

	if(type=="Monthly"){
		var start_year=$("#start_year").val();
		var start_month=$("#start_month").val();
		var num_of_months=$("#months").val();
		var date=new Date((start_year+"/"+start_month+"/01T00:00:00Z").split("/").join("-"));
		for(i=0;i<num_of_months;i++){
			toDate=new Date(new Date(date).setMonth(date.getMonth()+i));
			var toTS=(toDate.getUTCFullYear().toString().substring(2));
			toTS+=toDate.getMonth()+1 >9 ? toDate.getMonth()+1 : '0'+(toDate.getMonth()+1);
			yAxis.push(toTS);
		}
	}
		
	if(type=="Yearly"){
		var start_year=$("#start_year").val();
		var num_of_years=$("#years").val();
		var date=new Date((start_year+"/01/01T00:00:00Z").split("/").join("-"));
		for(i=0;i<num_of_years;i++){
			toDate=new Date(new Date(date).setFullYear(date.getFullYear()+i));
			var toTS=(toDate.getUTCFullYear().toString().substring(2));
			yAxis.push(toTS);
		}
	} 
		return yAxis;	
}


CircuitUtilReport.prototype.drawGraph = function(response_data) {
	var seriesData =[];
	uniqY=objCircuitUtil.getYaxis();
	var peak_values =[];
	var average_values =[];
	var type=$("#type").val();
	if(type=="Minutely"){
		for (var h in uniqY){
			var selected=false;
			for (var j in response_data){
				if( uniqY[h]==response_data[j].data[0].date_time ){
					selected = true;
					peak_values= peak_values.concat(parseInt(response_data[j].data[0].peak)); 
					average_values= average_values.concat(parseInt(response_data[j].data[0].average)); 	
				}
			}
				 if(!selected){
					peak_values= peak_values.concat(0);
					average_values= average_values.concat(0);		
				 }
				 selected=false;	
		}
		
	}
	else{
		
		for (var h in uniqY){
			
			var selected=false;
			for (var j in response_data){
				if( uniqY[h]==response_data[j].time_digit ){
					selected = true;
					peak_values= peak_values.concat(parseInt(response_data[j].data[0].peak)); 
					average_values= average_values.concat(parseInt(response_data[j].data[0].average)); 	
				}
			}
				 if(!selected){
					peak_values= peak_values.concat(0);
					average_values= average_values.concat(0);		
				 }
				 selected=false;	
		}
	}
	

		 seriesData=seriesData.concat({name:"Peak",data:peak_values });
		 seriesData=seriesData.concat({name:"Average",data:average_values });
		uniqX=[];
		for( i in uniqY){
			uniqX=uniqX.concat(uniqY[i].substring(uniqY[i].length-2));
		}
		//alert(JSON.stringify(seriesData));
		$(function () {
	   	 var chart = new Highcharts.Chart({
		                chart: {
		                    plotBackgroundColor: null,
		                    plotBorderWidth: null,
		                    plotShadow: false,
		                    renderTo: 'graphs',
		                    zoomType: 'xy',
		                    type: 'line'
		                },
	        title: {
	            text: 'Circuit Utilization Report'
	        },
	        xAxis: {
	            categories:uniqX,
	           //  title: {
            //     text: tableTime
            // }
	        },
	         yAxis: {
	         allowDecimals: false,
			 min: 0,
            title: {
                text: 'Hits '
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        },
	        tooltip: {
	            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
	            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
	                '<td style="padding:0"><b>{point.y} hits</b></td></tr>',
	            footerFormat: '</table>',
	            useHTML: true
	        },
	        series: seriesData
	    });
	});
}

CircuitUtilReport.prototype.showTable = function(response_data) {
	$("#tables").html("");
	var rec_count=0;
	var rec_list='';
	uniqY=objCircuitUtil.getYaxis();
	var type=$("#type").val();
	if(type=="Minutely"){
		for (var h in uniqY){
			var selected=false;
			for (var j in response_data){
				if( uniqY[h]==response_data[j].data[0].date_time ){
					selected= true;
					rec_count++;
					var peak = parseInt(response_data[j].data[0].peak);
					var average = parseInt(response_data[j].data[0].average);
				rec_list += '<tr>';
					rec_list += '<td>'+uniqY[h].substring(uniqY[h].length-2)+'</td>';	
					rec_list += '<td>'+peak+'</td>';	
					rec_list += '<td>'+average+'</td>';	
				rec_list += '</tr>'; 
					
				}
			}
				 if(!selected){
				 	rec_count++
					rec_list += '<tr>';
						rec_list += '<td>'+ uniqY[h].substring(uniqY[h].length-2)+'</td>';	
						rec_list += '<td>0</td>';	
						rec_list += '<td>0</td>';
					rec_list += '</tr>'; 	
				 }
				 selected=false;
		}
	}
	else{
		
		for (var h in uniqY){
			var selected=false;
			for (var j in response_data){
				if( uniqY[h]==response_data[j].time_digit ){
					selected= true;
					rec_count++;
					var peak = parseInt(response_data[j].data[0].peak);
					var average = parseInt(response_data[j].data[0].average);
				rec_list += '<tr>';
					rec_list += '<td>'+uniqY[h].substring(uniqY[h].length-2)+'</td>';	
					rec_list += '<td>'+peak+'</td>';	
					rec_list += '<td>'+average+'</td>';	
				rec_list += '</tr>'; 
					
				}
			}
				 if(!selected){
				 	rec_count++
					rec_list += '<tr>';
						rec_list += '<td>'+ uniqY[h].substring(uniqY[h].length-2)+'</td>';	
						rec_list += '<td>0</td>';	
						rec_list += '<td>0</td>';
					rec_list += '</tr>'; 	
				 }
				 selected=false;
		}
	}
	
		 var list_table = ''	
		+ '<table border="0" align="center" cellpadding="0" cellspacing="1" class="results_mini" id="mt" width="50%">';
			list_table += '<tr>';
					list_table += '<th width="20%">'+objCircuitUtil.getTimeLabel()+'</th>';
					list_table += '<th width="12.5%" >Peak</th>';
					list_table += '<th width="12.5%" >Average</th>';
					list_table += '</tr>';
					list_table += rec_list
		+ '</table>' 
		+ '<div id="pager" style="margin: auto;">';  

	objCircuitUtil.showResultTable(list_table,rec_count);
}
	

CircuitUtilReport.prototype.createCsv = function() {
	csvMessage="";
	csvMessage+=objCircuitUtil.getTimeLabel()+",Peak ,Average\n"
	//alert(JSON.stringify(response_data));
	uniqY=objCircuitUtil.getYaxis();
	var type=$("#type").val();
	if(type=="Minutely"){
		for (var h in uniqY){
			var selected=false;
			for (var j in response_data){
				if( uniqY[h]==response_data[j].data[0].date_time ){
					selected = true;
					csvMessage+=response_data[j].data[0].date_time+',';
					csvMessage+=response_data[j].data[0].peak+',';
					csvMessage+=response_data[j].data[0].average+'\n'; 	
				}
			}
				 if(!selected){
						
				 }
				 selected=false;	
		}
	}
	else{
		for (i in response_data){
			csvMessage+=response_data[i].time_digit.substring(response_data[i].time_digit.length-2)+',';
			csvMessage+=response_data[i].data[0].peak+',';
			csvMessage+=response_data[i].data[0].average+'\n';
		}
		
	}
		return csvMessage;
}

CircuitUtilReport.prototype.csvExport = function() {
var name="circuit_utilization_report_"+new Date().toString()+".csv";
csvMessage=objCircuitUtil.createCsv();
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

	//hide call type drop box since we have only audio type as call type  and audio is set as default value for call_type
	$("#call_type-tr").hide();
	$("#start_time").val("00:00:00");
	$("#days-tr").hide();
	$("#months-tr").hide();
	$("#years-tr").hide();
	$("#hours-tr").hide();
	// $("#call_type-tr").hide();
	$("#graphs_badfill").hide();
	$("#tables_badfill").hide();
	$("#result_badfill").hide();
	// $("#call_type-tr").hide();

	$('#frm_circuit_util').validationEngine({
		'custom_error_messages' : {

		}
	});

	$('#type').change(function()
	{
		objCircuitUtil.showFildes();		
	});

	$("#start_date").datepicker({
		// showSecond: true,
		 timeFormat: 'HH:mm:ss',
		 defaultValue: '00:00:00',
		 dateFormat: "yy/mm/dd",
	});

	$('#start_time').timepicker({
		showSecond: false,
		showMinute: false,//showMinute: false,
		showButtonPanel: true,
		minuteMax : 0,
		secondMax : 0,
		timeFormat: 'HH:mm:ss'
	});

	$('#report').click(function()
	{
		if(!$("#frm_circuit_util").validationEngine('validate')) {
			return false;
		}
		$("#graphs_badfill").hide();
		$("#tables_badfill").show();
		objCircuitUtil.search();
		return false;
		
	});

	$('#graph').click(function()
	{
		if(!$("#frm_circuit_util").validationEngine('validate')) {
			return false;
		}
		$("#graphs_badfill").show();
		$("#tables_badfill").hide();
		objCircuitUtil.search();
		return false;
	});

	$('#csv').click(function()
	{
		if(!$("#frm_circuit_util").validationEngine('validate')) {
			return false;
		}
		if(objCircuitUtil.search()){
			objCircuitUtil.csvExport();
			$("#graphs_badfill").hide();
			$("#tables_badfill").hide();
		}
		return false;
	});

	objCircuitUtil.getStartYear();
	objCircuitUtil.getStartMonth();
	$('#start_year-tr').hide();
	$('#start_month-tr').hide();

});
var objCircuitUtil = new CircuitUtilReport();

