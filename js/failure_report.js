//Handle IVR Reports

var YAWS_PATH = config.yaws_file_path + 'hits_counter_report.yaws';
var response_data;


function failureReport() {
	
}
failureReport.prototype.getStartYear = function(currentValue) {
	
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


failureReport.prototype.getStartMonth = function(currentValue) {
	
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

failureReport.prototype.getTimeLabel = function() {

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

failureReport.prototype.showResultTable = function(list_table,rec_count) {
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
failureReport.prototype.showDetailResultTable = function(list_tables,rec_counts) {
jQuery('#dialogTables').html(list_tables);
	var theDialog = $("#dialog").dialog({
	    autoOpen: false,
	    resizable: true,
	    modal: true,
	    width: 'auto',
	    resize: 'auto'
     });

	theDialog.html($("#dialogTables")).dialog( "open" );
}

failureReport.prototype.getFailureCountType = function() {
	if($("#failure_type").val()!=""){
		if($("#failure_reason").val()!=""){
			if($("#failure_location").val()!=""){
					if($("#failure_location").val()=="before_anm"){
						if($("#failure_reason").val()=="internal_error"){
							hits="internal_error_before_anm";
						}
						if($("#failure_reason").val()=="app_not_found"){
							hits="app_not_found_before_anm";
						}
						if($("#failure_reason").val()=="app_timeout"){
							hits="app_timeout_before_anm";
						}
						if($("#failure_reason").val()=="app_error"){
							hits="app_error_before_anm";
						}
						if($("#failure_reason").val()=="app_parse_error"){
							hits="app_parse_error_before_anm";
						}
					}
					if($("#failure_location").val()=="after_anm"){
						if($("#failure_reason").val()=="internal_error"){
							hits="internal_error_after_anm";
						}
						if($("#failure_reason").val()=="app_not_found"){
							hits="app_not_found_after_anm";
						}
						if($("#failure_reason").val()=="app_timeout"){
							hits="app_timeout_after_anm";
						}
						if($("#failure_reason").val()=="app_error"){
							hits="app_error_after_anm";
						}
						if($("#failure_reason").val()=="app_parse_error"){
							hits="app_parse_error_after_anm";
						}
					}
			}else{

				if($("#failure_reason").val()=="codec_mismatch"){
					hits="codec_mismatch";
				}
				if($("#failure_reason").val()=="user_busy"){
						hits="user_busy";
				}
				if($("#failure_reason").val()=="user_cancel"){
						hits="user_cancel";
				}
				if($("#failure_reason").val()=="no_answer"){
						hits="no_answer";
				}
				if($("#failure_reason").val()=="call_redirect"){
						hits="call_redirect";
				}
				if($("#failure_reason").val()=="network_error"){
						hits="network_error";
				}
				if($("#failure_reason").val()=="invalid_number"){
						hits="invalid_number";
				}
				if($("#failure_reason").val()=="security_failure"){
						hits="security_failure";
				}
				if($("#failure_reason").val()=="not_acceptable"){
						hits="not_acceptable";
				}
				if($("#failure_reason").val()=="bad_request"){
						hits="bad_request";
				}
				
				if($("#failure_reason").val()=="internal_error"){
						hits="internal_error";
				}
				if($("#failure_reason").val()=="user_blacklisted"){
						hits="user_blacklisted";
				}
				if($("#failure_reason").val()=="app_not_found"){
						hits="app_not_found";
				}
				if($("#failure_reason").val()=="app_timeout"){
						hits="app_timeout";
				}
				if($("#failure_reason").val()=="app_error"){
						hits="app_error";
				}
				if($("#failure_reason").val()=="app_parse_error"){
						hits="app_parse_error";
				}
			}
		}
		else{

			if($("#failure_type").val()=="system_failures"){
				hits="system_failures";
			}
			if($("#failure_type").val()=="user_failures"){
					hits="user_failures";
			}
			if($("#failure_type").val()=="application_failures"){
					hits="application_failures";
			}
			if($("#failure_type").val()=="network_failures"){
					hits="network_failures";
			}
		}
	}
	else{
		hits="total_failures";
	}
	return hits;
}

failureReport.prototype.getMonths = function() {
	selection = document.getElementById('months');
	for (i=1;i <=config.months_limit;i++){
		selection.options[selection.options.length] = new Option(i, i);
	}
}
failureReport.prototype.getHours = function() {
	selection = document.getElementById('hours');
	for (i=1;i <=config.hours_limit;i++){
		selection.options[selection.options.length] = new Option(i, i);
	}
}
failureReport.prototype.getDays = function() {
	selection = document.getElementById('days');
	for (i=1;i <=config.days_limit;i++){
		selection.options[selection.options.length] = new Option(i, i);
	}
}

failureReport.prototype.getYears = function() {
	selection = document.getElementById('years');
	for (i=1;i <=config.years_limit;i++){
		selection.options[selection.options.length] = new Option(i, i);
	}
}

failureReport.prototype.search = function() {
	var fromDate=objfailureReport.calculateDate()[0];	
	var toDate=objfailureReport.calculateDate()[1];	
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
	var searching_category="failure_report";
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
		$( "#alert" ).html("<br><center><h1>No Result Found</h1></center>").dialog( "open" );
		return false;
	} 
	else 
	{
		objfailureReport.showTable(response_data);
		objfailureReport.drawGraph(response_data);
		return true;
		//obj_common.resetForm($('#frm_hits_counter'));
	}
}


failureReport.prototype.drawGraph = function(response_data) {


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
	var uniqY=objfailureReport.getYaxis();
	var seriesData=[];
	var hits;

	if($("#graph_type").val()=="access_code"){
		for(i in uniqY){
			var values=[];
			for (var h in uniqX){
				var selected=false;
				for (var j in response_data){
					if(uniqY[i]==response_data[j].time_digit && response_data[j].short_code== uniqX[h]){
						////alert(uniqY[i]+"-->"+uniqX[h]+"-->"+JSON.stringify(seriesData));
						selected=true;
						hits=objfailureReport.getFailureCountType();		
						values=values.concat(parseInt(eval("response_data[j].data[0]."+hits)));
					}
				}
				 if(!selected){
					values=values.concat(parseInt(0));
				 }
				 selected=false;
			}
		seriesData=seriesData.concat({name:uniqY[i].substring(uniqY[i].length-2),data:values });
		//alert(JSON.stringify(seriesData));
		}

	}

	if($("#graph_type").val()=="time_wise"){

		for(i in uniqX){
			var values=[];
			for (var h in uniqY){
				var selected=false;
				for (var j in response_data){
					if(uniqY[h]==response_data[j].time_digit && response_data[j].short_code== uniqX[i]){
						////alert(uniqY[i]+"-->"+uniqX[h]+"-->"+JSON.stringify(seriesData));
						selected=true;
						hits=objfailureReport.getFailureCountType();		
						values=values.concat(parseInt(eval("response_data[j].data[0]."+hits)));
					}
				}
				 if(!selected){
					values=values.concat(parseInt(0));
				 }
				 selected=false;
			}
		seriesData=seriesData.concat({name:uniqX[i],data:values });
		//alert(JSON.stringify(seriesData));
		}
		uniqX=[];
		for( i in uniqY){
			uniqX=uniqX.concat(uniqY[i].substring(uniqY[i].length-2));
		}
		

	}

	if($("#graph_type").val()=="cumulative_access_code"){
		for(i in uniqX){
			var values=[];
			for (var h in uniqY){
				var selected=false;
				for (var j in response_data){
					if(uniqX[i]==response_data[j].short_code && uniqY[h]==response_data[j].time_digit ){
						////alert(uniqY[i]+"-->"+uniqX[h]+"-->"+JSON.stringify(seriesData));
						selected=true;
						hits=objfailureReport.getFailureCountType();		
						values=values.concat(parseInt(eval("response_data[j].data[0]."+hits)));
					}
				}
				 if(!selected){
					values=values.concat(parseInt(0));
				 }
				 selected=false;
			}

			sum=0;
			for (d in values){
				sum=sum+values[d];
			}
			total=[]
			total=total.concat(sum);

		seriesData=seriesData.concat({name:uniqX[i],data:total });
		//alert(JSON.stringify(seriesData));
		}
		 uniqX=["short codes"];  
		
	}

	if($("#graph_type").val()=="cumaulative_time_wise"){
		for(i in uniqY){
			var values=[];
			for (var h in uniqX){
				var selected=false;
				for (var j in response_data){
					if(uniqX[h]==response_data[j].short_code && uniqY[i]==response_data[j].time_digit ){
						////alert(uniqY[i]+"-->"+uniqX[h]+"-->"+JSON.stringify(seriesData));
						selected=true;
						hits=objfailureReport.getFailureCountType();
						values=values.concat(parseInt(eval("response_data[j].data[0]."+hits)));
					}
				}
				 if(!selected){
					values=values.concat(parseInt(0));
				 }
				 selected=false;
			}

			sum=0;
			for (d in values){
				sum=sum+values[d];
			}
			total=[]
			total=total.concat(sum);

		seriesData=seriesData.concat({name:uniqY[i].substring(uniqY[i].length-2),data:total });
		//alert(JSON.stringify(seriesData));
		}
		 uniqX=["Time"];  
		
	}

	if($("#graph_type").val()=="access_code" || $("#graph_type").val()=="time_wise" ){

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
		            text: 'Failure Report'
		        },
		        subtitle: {
		            text: $("#start_date").val()
		        },
		        xAxis: {
		            categories:uniqX
		        },
		         yAxis: {
				 min: 0,
	            title: {
	                text: 'Failure Count  '
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
		                '<td style="padding:0"><b>{point.y} </b></td></tr>',
		            footerFormat: '</table>',
		            useHTML: true
		        },
		        series: seriesData
		    });
		});
	}
	if($("#graph_type").val()=="cumulative_access_code" || $("#graph_type").val()=="cumaulative_time_wise" ){

		$(function () {
	   	 var chart = new Highcharts.Chart({
		                chart: {
		                    plotBackgroundColor: null,
		                    plotBorderWidth: null,
		                    plotShadow: false,
		                    renderTo: 'graphs',
		                   	 zoomType: 'xy',
		                    type: 'column'
		                },
	        title: {
	            text: 'Filure Report'
	        },
	        subtitle: {
	            text: $("#start_date").val()
	        },
	        xAxis: {
	            categories:uniqX
	        },
	        yAxis: {
	            min: 0,
	            title: {
	                text: 'Failure Count '
	            }
	        },
	        tooltip: {
	            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
	            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
	                '<td style="padding:0"><b>{point.y} </b></td></tr>',
	            footerFormat: '</table>',
	            useHTML: true
	        },
	        plotOptions: {
	            column: {
	                pointPadding: 0.1,
	                borderWidth: 0
	            }
	        },
	        series: seriesData
	    });
	});

	}
}

failureReport.prototype.showReport = function(short_code,hits) {
	var uniqY=objfailureReport.getYaxis();
	var select=true;
 	failureCountType=objfailureReport.getFailureCountType();
	if(failureCountType=="total_failures"){
		var rec_counts=0;
		var rec_lists='';
		for(a in uniqY){
			for (i in response_data){
				if(response_data[i].short_code==short_code && response_data[i].time_digit==uniqY[a]){
					rec_counts++;
					rec_lists+='<tr>';
						rec_lists+='<td>'+response_data[i].time_digit.substring(response_data[i].time_digit.length-2)+'</td>';
						rec_lists+='<td>'+response_data[i].data[0].total_failures+'</td>';
						rec_lists+='<td>'+response_data[i].data[0].system_failures+'</td>';
						rec_lists+='<td>'+response_data[i].data[0].application_failures+'</td>';
						rec_lists+='<td>'+response_data[i].data[0].user_failures+'</td>';
						rec_lists+='<td>'+response_data[i].data[0].network_failures+'</td>';
					rec_lists+='</tr>';
					select=false;
				}
			}
			if(select){
				rec_counts++;
				rec_lists+='<tr>';
					rec_lists+='<td>'+uniqY[a].substring(uniqY[a].length-2)+'</td>';
					rec_lists+='<td>0</td>';
					rec_lists+='<td>0</td>';
					rec_lists+='<td>0</td>';
					rec_lists+='<td>0</td>';
					rec_lists+='<td>0</td>';
				rec_lists+='</tr>';
			}
			select=true;

		}
		list_tables ='';
		list_tables += '<center>Access Code: '+short_code+'</center><table border="0" align="center" cellpadding="0" cellspacing="1" class="results_mini" id="reports_tb" >';
		list_tables += '<tr>';
			list_tables += '<th width="5%">'+objfailureReport.getTimeLabel()+'</th>';
			list_tables += '<th width="19%" >Total Failures</th>';
			list_tables += '<th width="19%" >System Failures</th>';
			list_tables += '<th width="19%" >Application Failures</th>';
			list_tables += '<th width="19%" >User Failures</th>';
			list_tables += '<th width="19%" >Network Failures</th>';
		list_tables += '</tr>';
		list_tables += rec_lists
		+ '</table>' 
		+ '<div id="reportPager" style="margin: auto;">';  
		objfailureReport.showDetailResultTable(list_tables,rec_counts);
	}
	if(failureCountType=="application_failures"){
		var rec_counts=0;
		var rec_lists='';
		for(a in uniqY){
			for (i in response_data){
				if(response_data[i].short_code==short_code && response_data[i].time_digit==uniqY[a]){
					rec_counts++;
					rec_lists+='<tr>';
						rec_lists+='<td>'+response_data[i].time_digit.substring(response_data[i].time_digit.length-2)+'</td>';
						rec_lists+='<td>'+response_data[i].data[0].application_failures+'</td>';
						rec_lists+='<td>'+response_data[i].data[0].app_not_found+'</td>';
						rec_lists+='<td>'+response_data[i].data[0].app_timeout+'</td>';
						rec_lists+='<td>'+response_data[i].data[0].app_error+'</td>';
						rec_lists+='<td>'+response_data[i].data[0].app_parse_error+'</td>';
					rec_lists+='</tr>';
					select=false;
				}
			}
			if(select){
				rec_counts++;
				rec_lists+='<tr>';
					rec_lists+='<td>'+uniqY[a].substring(uniqY[a].length-2)+'</td>';
					rec_lists+='<td>0</td>';
					rec_lists+='<td>0</td>';
					rec_lists+='<td>0</td>';
					rec_lists+='<td>0</td>';
					rec_lists+='<td>0</td>';
				rec_lists+='</tr>';
			}
			select=true;
		}
		list_tables ='';
		list_tables += '<center>Access Code: '+short_code+'</center><table border="0" align="center" cellpadding="0" cellspacing="1" class="results_mini" id="reports_tb" >';
		list_tables += '<tr>';
			list_tables += '<th width="5%">'+objfailureReport.getTimeLabel()+'</th>';
			list_tables += '<th width="19%" >Application Failures</th>';
			list_tables += '<th width="19%" >App Not Found</th>';
			list_tables += '<th width="19%" >App Timeout</th>';
			list_tables += '<th width="19%" >App Error</th>';
			list_tables += '<th width="19%" >App Parse Error</th>';
		list_tables += '</tr>';
		list_tables += rec_lists
		+ '</table>' 
		+ '<div id="reportPager" style="margin: auto;">';  
		objfailureReport.showDetailResultTable(list_tables,rec_counts);

	}
	if(failureCountType=="user_failures"){
		var rec_counts=0;
		var rec_lists='';
		for(a in uniqY){
			for (i in response_data){
				if(response_data[i].short_code==short_code && response_data[i].time_digit==uniqY[a]){
					rec_counts++;
					rec_lists+='<tr>';
						rec_lists+='<td>'+response_data[i].time_digit.substring(response_data[i].time_digit.length-2)+'</td>';
						rec_lists+='<td>'+response_data[i].data[0].user_failures+'</td>';
						rec_lists+='<td>'+response_data[i].data[0].user_blacklisted+'</td>';
						rec_lists+='<td>'+response_data[i].data[0].user_busy+'</td>';
						rec_lists+='<td>'+response_data[i].data[0].user_cancel+'</td>';
						rec_lists+='<td>'+response_data[i].data[0].no_answer+'</td>';
					rec_lists+='</tr>';
					select=false;
				}
			}
			if(select){
				rec_counts++;
				rec_lists+='<tr>';
					rec_lists+='<td>'+uniqY[a].substring(uniqY[a].length-2)+'</td>';
					rec_lists+='<td>0</td>';
					rec_lists+='<td>0</td>';
					rec_lists+='<td>0</td>';
					rec_lists+='<td>0</td>';
					rec_lists+='<td>0</td>';
				rec_lists+='</tr>';
			}
			select=true;
		}
		list_tables ='';
		list_tables += '<center>Access Code: '+short_code+'</center><table border="0" align="center" cellpadding="0" cellspacing="1" class="results_mini" id="reports_tb" >';
		list_tables += '<tr>';
				list_tables += '<th width="5%">'+objfailureReport.getTimeLabel()+'</th>';
				list_tables += '<th width="31.65%" >User Failures</th>';
				list_tables += '<th width="31.65%" >User Blacklisted</th>';
				list_tables += '<th width="31.6%" >User Busy</th>';
				list_tables += '<th width="31.6%" >User Cancel</th>';
				list_tables += '<th width="31.6%" >No Answer</th>';
				
		list_tables += '</tr>';
		list_tables += rec_lists
		+ '</table>' 
		+ '<div id="reportPager" style="margin: auto;">';  
		objfailureReport.showDetailResultTable(list_tables,rec_counts);
	}
	if(failureCountType=="system_failures"){
		var rec_counts=0;
		var rec_lists='';
		for(a in uniqY){
			for (i in response_data){
				if(response_data[i].short_code==short_code && response_data[i].time_digit==uniqY[a]){
					rec_counts++;
					rec_lists+='<tr>';
						rec_lists+='<td>'+response_data[i].time_digit.substring(response_data[i].time_digit.length-2)+'</td>';
						rec_lists+='<td>'+response_data[i].data[0].system_failures+'</td>';
						rec_lists+='<td>'+response_data[i].data[0].codec_mismatch+'</td>';
						rec_lists+='<td>'+response_data[i].data[0].internal_error+'</td>';
						rec_lists+='<td>'+response_data[i].data[0].invalid_number+'</td>';
						rec_lists+='<td>'+response_data[i].data[0].security_failure+'</td>';
						rec_lists+='<td>'+response_data[i].data[0].not_acceptable+'</td>';
						rec_lists+='<td>'+response_data[i].data[0].bad_request+'</td>';
					rec_lists+='</tr>';
					select=false;
				}
			}
			if(select){
				rec_counts++;
				rec_lists+='<tr>';
					rec_lists+='<td>'+uniqY[a].substring(uniqY[a].length-2)+'</td>';
					rec_lists+='<td>0</td>';
					rec_lists+='<td>0</td>';
					rec_lists+='<td>0</td>';
					rec_lists+='<td>0</td>';
					rec_lists+='<td>0</td>';
					rec_lists+='<td>0</td>';
					rec_lists+='<td>0</td>';
				rec_lists+='</tr>';
			}
			select=true;
		}
		list_tables ='';
		list_tables += '<center>Access Code: '+short_code+'</center><table border="0" align="center" cellpadding="0" cellspacing="1" class="results_mini" id="reports_tb" >';
		list_tables += '<tr>';
			list_tables += '<th width="5.01%">'+objfailureReport.getTimeLabel()+'</th>';
			list_tables += '<th width="13.57%" >System Failures</th>';
			list_tables += '<th width="13.57%" >Codec Mismatch</th>';
			list_tables += '<th width="13.57%" >Internal Error</th>';
			list_tables += '<th width="13.57%" >Invalid Number</th>';
			list_tables += '<th width="13.57%" >Security Failures</th>';
			list_tables += '<th width="13.57%" >Not Acceptable</th>';
			list_tables += '<th width="13.57%" >Bad Request</th>';
		list_tables += '</tr>';
		list_tables += rec_lists
		+ '</table>' 
		+ '<div id="reportPager" style="margin: auto;">';  
		objfailureReport.showDetailResultTable(list_tables,rec_counts);
	}

	if(failureCountType=="network_failures"){
		var rec_counts=0;
		var rec_lists='';
		for(a in uniqY){
			for (i in response_data){
				if(response_data[i].short_code==short_code && response_data[i].time_digit==uniqY[a]){
					rec_counts++;
					rec_lists+='<tr>';
						rec_lists+='<td>'+response_data[i].time_digit.substring(response_data[i].time_digit.length-2)+'</td>';
						rec_lists+='<td>'+response_data[i].data[0].network_failures+'</td>';
						rec_lists+='<td>'+response_data[i].data[0].call_redirect+'</td>';
						rec_lists+='<td>'+response_data[i].data[0].network_error+'</td>';
					rec_lists+='</tr>';
					select=false;
				}
			}
			if(select){
				rec_counts++;
				rec_lists+='<tr>';
					rec_lists+='<td>'+uniqY[a].substring(uniqY[a].length-2)+'</td>';
					rec_lists+='<td>0</td>';
					rec_lists+='<td>0</td>';
					rec_lists+='<td>0</td>';
				rec_lists+='</tr>';
			}
			select=true;
		}
		list_tables ='';
		list_tables += '<center>Access Code: '+short_code+'</center><table border="0" align="center" cellpadding="0" cellspacing="1" class="results_mini" id="reports_tb" >';
		list_tables += '<tr>';
			list_tables += '<th width="5%">'+objfailureReport.getTimeLabel()+'</th>';
			list_tables += '<th width="31.66%" >Network Failures</th>';
			list_tables += '<th width="31.66%" >Call Redirect</th>';
			list_tables += '<th width="31.66%" >Network Error</th>';
		list_tables += '</tr>';
		list_tables += rec_lists
		+ '</table>' 
		+ '<div id="reportPager" style="margin: auto;">';  
		objfailureReport.showDetailResultTable(list_tables,rec_counts);
	}

	if(failureCountType=="app_parse_error"){
		var rec_counts=0;
		var rec_lists='';
		for(a in uniqY){
			for (i in response_data){
				if(response_data[i].short_code==short_code && response_data[i].time_digit==uniqY[a]){
					rec_counts++;
					rec_lists+='<tr>';
						rec_lists+='<td>'+response_data[i].time_digit.substring(response_data[i].time_digit.length-2)+'</td>';
						rec_lists+='<td>'+response_data[i].data[0].app_parse_error+'</td>';
						rec_lists+='<td>'+response_data[i].data[0].app_parse_error_before_anm+'</td>';
						rec_lists+='<td>'+response_data[i].data[0].app_parse_error_after_anm+'</td>';
					rec_lists+='</tr>';
					select=false;
				}
			}if(select){
				rec_counts++;
				rec_lists+='<tr>';
					rec_lists+='<td>'+uniqY[a].substring(uniqY[a].length-2)+'</td>';
					rec_lists+='<td>0</td>';
					rec_lists+='<td>0</td>';
					rec_lists+='<td>0</td>';
				rec_lists+='</tr>';
			}
			select=true;

		}
		list_tables ='';
		list_tables += '<center>Access Code: '+short_code+'</center><table border="0" align="center" cellpadding="0" cellspacing="1" class="results_mini" id="reports_tb" >';
		list_tables += '<tr>';
				list_tables += '<th width="5%">'+objfailureReport.getTimeLabel()+'</th>';
				list_tables += '<th width="31.666666667%" >Appplication Parse Error</th>';
				list_tables += '<th width="31.666666667%" >Before Answer</th>';
				list_tables += '<th width="31.666666667%" >After Answer</th>';
		list_tables += '</tr>';
		list_tables += rec_lists
		+ '</table>' 
		+ '<div id="reportPager" style="margin: auto;">';  
		objfailureReport.showDetailResultTable(list_tables,rec_counts);
	}
	if(failureCountType=="app_error"){
		var rec_counts=0;
		var rec_lists='';
		for(a in uniqY){
			for (i in response_data){
				if(response_data[i].short_code==short_code && response_data[i].time_digit==uniqY[a]){
					rec_counts++;
					rec_lists+='<tr>';
						rec_lists+='<td>'+response_data[i].time_digit.substring(response_data[i].time_digit.length-2)+'</td>';
						rec_lists+='<td>'+response_data[i].data[0].app_error+'</td>';
						rec_lists+='<td>'+response_data[i].data[0].app_error_before_anm+'</td>';
						rec_lists+='<td>'+response_data[i].data[0].app_error_after_anm+'</td>';
					rec_lists+='</tr>';
					select=false;
				}
			}
			if(select){
				rec_counts++;
				rec_lists+='<tr>';
					rec_lists+='<td>'+uniqY[a].substring(uniqY[a].length-2)+'</td>';
					rec_lists+='<td>0</td>';
					rec_lists+='<td>0</td>';
					rec_lists+='<td>0</td>';
				rec_lists+='</tr>';
			}
			select=true;
		}
		list_tables ='';
		list_tables += '<center>Access Code: '+short_code+'</center><table border="0" align="center" cellpadding="0" cellspacing="1" class="results_mini" id="reports_tb" >';
		list_tables += '<tr>';
			list_tables += '<th width="5%">'+objfailureReport.getTimeLabel()+'</th>';
			list_tables += '<th width="31.666666667%" >Appplication Error</th>';
			list_tables += '<th width="31.666666667%" >Before Answer</th>';
			list_tables += '<th width="31.666666667%" >After Answer</th>';
		list_tables += '</tr>';
		list_tables += rec_lists
		+ '</table>' 
		+ '<div id="reportPager" style="margin: auto;">';  
		objfailureReport.showDetailResultTable(list_tables,rec_counts);
	}
	if(failureCountType=="app_timeout"){
		var rec_counts=0;
		var rec_lists='';
		for(a in uniqY){
			for (i in response_data){
				if(response_data[i].short_code==short_code && response_data[i].time_digit==uniqY[a]){
					rec_counts++;
					rec_lists+='<tr>';
						rec_lists+='<td>'+response_data[i].time_digit.substring(response_data[i].time_digit.length-2)+'</td>';
						rec_lists+='<td>'+response_data[i].data[0].app_timeout+'</td>';
						rec_lists+='<td>'+response_data[i].data[0].app_timeout_before_anm+'</td>';
						rec_lists+='<td>'+response_data[i].data[0].app_timeout_after_anm+'</td>';
					rec_lists+='</tr>';
					select=false;
				}
			}
			if(select){
			rec_counts++;
			rec_lists+='<tr>';
				rec_lists+='<td>'+uniqY[a].substring(uniqY[a].length-2)+'</td>';
				rec_lists+='<td>0</td>';
				rec_lists+='<td>0</td>';
				rec_lists+='<td>0</td>';
			rec_lists+='</tr>';
			}
			select=true;
		}
		list_tables ='';
		list_tables += '<center>Access Code: '+short_code+'</center><table border="0" align="center" cellpadding="0" cellspacing="1" class="results_mini" id="reports_tb" >';
		list_tables += '<tr>';
			list_tables += '<th width="5%">'+objfailureReport.getTimeLabel()+'</th>';
			list_tables += '<th width="31.666666667%" >Appplication Time Out</th>';
			list_tables += '<th width="31.666666667%" >Before Answer</th>';
			list_tables += '<th width="31.666666667" >After Answer</th>';
		list_tables += '</tr>';
		list_tables += rec_lists
		+ '</table>' 
		+ '<div id="reportPager" style="margin: auto;">';  
		objfailureReport.showDetailResultTable(list_tables,rec_counts);

	}
	if(failureCountType=="app_not_found"){
		var rec_counts=0;
		var rec_lists='';
		for(a in uniqY){
			for (i in response_data){
				if(response_data[i].short_code==short_code && response_data[i].time_digit==uniqY[a]){
					rec_counts++;
					rec_lists+='<tr>';
						rec_lists+='<td>'+response_data[i].time_digit.substring(response_data[i].time_digit.length-2)+'</td>';
						rec_lists+='<td>'+response_data[i].data[0].app_not_found+'</td>';
						rec_lists+='<td>'+response_data[i].data[0].app_not_found_before_anm+'</td>';
						rec_lists+='<td>'+response_data[i].data[0].app_not_found_after_anm+'</td>';
					rec_lists+='</tr>';
					select=false;
				}
			}
			if(select){
				rec_counts++;
				rec_lists+='<tr>';
					rec_lists+='<td>'+uniqY[a].substring(uniqY[a].length-2)+'</td>';
					rec_lists+='<td>0</td>';
					rec_lists+='<td>0</td>';
					rec_lists+='<td>0</td>';
				rec_lists+='</tr>';
			}
			select=true;
		}
		list_tables ='';
		list_tables += '<center>Access Code: '+short_code+'</center><table border="0" align="center" cellpadding="0" cellspacing="1" class="results_mini" id="reports_tb" >';
		list_tables += '<tr>';
			list_tables += '<th width="5%">'+objfailureReport.getTimeLabel()+'</th>';
			list_tables += '<th width="31.666666667%" >Appplication Not Found</th>';
			list_tables += '<th width="31.666666667%" >Before Answer</th>';
			list_tables += '<th width="31.666666667%" >After Answer</th>';
		list_tables += '</tr>';
		list_tables += rec_lists
		+ '</table>' 
		+ '<div id="reportPager" style="margin: auto;">';  
		objfailureReport.showDetailResultTable(list_tables,rec_counts);

	}
	if(failureCountType=="user_busy"){
		var rec_counts=0;
		var rec_lists='';
		for(a in uniqY){
			for (i in response_data){
				if(response_data[i].short_code==short_code && response_data[i].time_digit==uniqY[a]){
					rec_counts++;
					rec_lists+='<tr>';
						rec_lists+='<td>'+response_data[i].time_digit.substring(response_data[i].time_digit.length-2)+'</td>';
						rec_lists+='<td>'+response_data[i].data[0].user_busy+'</td>';
					rec_lists+='</tr>';
					select=false;
				}
			}
			if(select){
				rec_counts++;
				rec_lists+='<tr>';
					rec_lists+='<td>'+uniqY[a].substring(uniqY[a].length-2)+'</td>';
					rec_lists+='<td>0</td>';
				rec_lists+='</tr>';
			}
			select=true;

		}
		list_tables ='';
		list_tables += '<center>Access Code: '+short_code+'</center><table border="0" align="center" cellpadding="0" cellspacing="1" class="results_mini" id="reports_tb" >';
		list_tables += '<tr>';
				list_tables += '<th width="5%">'+objfailureReport.getTimeLabel()+'</th>';
				list_tables += '<th width="95%" >User Busy</th>';

		list_tables += '</tr>';
		list_tables += rec_lists
		+ '</table>' 
		+ '<div id="reportPager" style="margin: auto;">';  
		objfailureReport.showDetailResultTable(list_tables,rec_counts);
		
	}
	if(failureCountType=="codec_mismatch"){
		var rec_counts=0;
		var rec_lists='';
		for(a in uniqY){
			for (i in response_data){
				if(response_data[i].short_code==short_code && response_data[i].time_digit==uniqY[a]){
					rec_counts++;
					rec_lists+='<tr>';
						rec_lists+='<td>'+response_data[i].time_digit.substring(response_data[i].time_digit.length-2)+'</td>';
						rec_lists+='<td>'+response_data[i].data[0].codec_mismatch+'</td>';
					rec_lists+='</tr>';
					select=false;
				}
			}
			if(select){
				rec_counts++;
				rec_lists+='<tr>';
					rec_lists+='<td>'+uniqY[a].substring(uniqY[a].length-2)+'</td>';
					rec_lists+='<td>0</td>';
				rec_lists+='</tr>';
			}
			select=true;

		}
		list_tables ='';
		list_tables += '<center>Access Code: '+short_code+'</center><table border="0" align="center" cellpadding="0" cellspacing="1" class="results_mini" id="reports_tb" >';
		list_tables += '<tr>';
			list_tables += '<th width="5%">'+objfailureReport.getTimeLabel()+'</th>';
			list_tables += '<th width="95%" >Codec Mismatch</th>';

		list_tables += '</tr>';
		list_tables += rec_lists
		+ '</table>' 
		+ '<div id="reportPager" style="margin: auto;">';  
		objfailureReport.showDetailResultTable(list_tables,rec_counts);
	}

	if(failureCountType=="user_blacklisted"){
		var rec_counts=0;
		var rec_lists='';
		for(a in uniqY){
			for (i in response_data){
				if(response_data[i].short_code==short_code && response_data[i].time_digit==uniqY[a]){
					rec_counts++;
					rec_lists+='<tr>';
						rec_lists+='<td>'+response_data[i].time_digit.substring(response_data[i].time_digit.length-2)+'</td>';
						rec_lists+='<td>'+response_data[i].data[0].user_blacklisted+'</td>';
					rec_lists+='</tr>';
					select=false;
				}
			}
			if(select){
				rec_counts++;
				rec_lists+='<tr>';
					rec_lists+='<td>'+uniqY[a].substring(uniqY[a].length-2)+'</td>';
					rec_lists+='<td>0</td>';
				rec_lists+='</tr>';
			}
			select=true;

		}
		list_tables ='';
		list_tables += '<center>Access Code: '+short_code+'</center><table border="0" align="center" cellpadding="0" cellspacing="1" class="results_mini" id="reports_tb" >';
		list_tables += '<tr>';
			list_tables += '<th width="5%">'+objfailureReport.getTimeLabel()+'</th>';
			list_tables += '<th width="95%" >User Blacklisted</th>';
		list_tables += '</tr>';
		list_tables += rec_lists
		+ '</table>' 
		+ '<div id="reportPager" style="margin: auto;">';  
		objfailureReport.showDetailResultTable(list_tables,rec_counts);

	}
	if(failureCountType=="user_cancel"){
		var rec_counts=0;
		var rec_lists='';
		for(a in uniqY){
			for (i in response_data){
				if(response_data[i].short_code==short_code && response_data[i].time_digit==uniqY[a]){
					rec_counts++;
					rec_lists+='<tr>';
						rec_lists+='<td>'+response_data[i].time_digit.substring(response_data[i].time_digit.length-2)+'</td>';
						rec_lists+='<td>'+response_data[i].data[0].user_cancel+'</td>';
					rec_lists+='</tr>';
					select=false;
				}
			}
			if(select){
				rec_counts++;
				rec_lists+='<tr>';
					rec_lists+='<td>'+uniqY[a].substring(uniqY[a].length-2)+'</td>';
					rec_lists+='<td>0</td>';
				rec_lists+='</tr>';
			}
			select=true;

		}
		list_tables ='';
		list_tables += '<center>Access Code: '+short_code+'</center><table border="0" align="center" cellpadding="0" cellspacing="1" class="results_mini" id="reports_tb" >';
		list_tables += '<tr>';
			list_tables += '<th width="5%">'+objfailureReport.getTimeLabel()+'</th>';
			list_tables += '<th width="95%" >User Cancel</th>';
		list_tables += '</tr>';
		list_tables += rec_lists
		+ '</table>' 
		+ '<div id="reportPager" style="margin: auto;">';  
		objfailureReport.showDetailResultTable(list_tables,rec_counts);

	}

	if(failureCountType=="no_answer"){
		var rec_counts=0;
		var rec_lists='';
		for(a in uniqY){
			for (i in response_data){
				if(response_data[i].short_code==short_code && response_data[i].time_digit==uniqY[a]){
					rec_counts++;
					rec_lists+='<tr>';
						rec_lists+='<td>'+response_data[i].time_digit.substring(response_data[i].time_digit.length-2)+'</td>';
						rec_lists+='<td>'+response_data[i].data[0].no_answer+'</td>';
					rec_lists+='</tr>';
					select=false;
				}
			}
			if(select){
				rec_counts++;
				rec_lists+='<tr>';
					rec_lists+='<td>'+uniqY[a].substring(uniqY[a].length-2)+'</td>';
					rec_lists+='<td>0</td>';
				rec_lists+='</tr>';
			}
			select=true;

		}
		list_tables ='';
		list_tables += '<center>Access Code: '+short_code+'</center><table border="0" align="center" cellpadding="0" cellspacing="1" class="results_mini" id="reports_tb" >';
		list_tables += '<tr>';
			list_tables += '<th width="5%">'+objfailureReport.getTimeLabel()+'</th>';
			list_tables += '<th width="95%" >No Answer</th>';
		list_tables += '</tr>';
		list_tables += rec_lists
		+ '</table>' 
		+ '<div id="reportPager" style="margin: auto;">';  
		objfailureReport.showDetailResultTable(list_tables,rec_counts);

	}
	if(failureCountType=="call_redirect"){
		var rec_counts=0;
		var rec_lists='';
		for(a in uniqY){
			for (i in response_data){
				if(response_data[i].short_code==short_code && response_data[i].time_digit==uniqY[a]){
					rec_counts++;
					rec_lists+='<tr>';
						rec_lists+='<td>'+response_data[i].time_digit.substring(response_data[i].time_digit.length-2)+'</td>';
						rec_lists+='<td>'+response_data[i].data[0].call_redirect+'</td>';
					rec_lists+='</tr>';
					select=false;
				}
			}
			if(select){
				rec_counts++;
				rec_lists+='<tr>';
					rec_lists+='<td>'+uniqY[a].substring(uniqY[a].length-2)+'</td>';
					rec_lists+='<td>0</td>';
				rec_lists+='</tr>';
			}
			select=true;

		}
		list_tables ='';
		list_tables += '<center>Access Code: '+short_code+'</center><table border="0" align="center" cellpadding="0" cellspacing="1" class="results_mini" id="reports_tb" >';
		list_tables += '<tr>';
			list_tables += '<th width="5%">'+objfailureReport.getTimeLabel()+'</th>';
			list_tables += '<th width="95%" >Call Redirect</th>';
		list_tables += '</tr>';
		list_tables += rec_lists
		+ '</table>' 
		+ '<div id="reportPager" style="margin: auto;">';  
		objfailureReport.showDetailResultTable(list_tables,rec_counts);

	}
	if(failureCountType=="network_error"){
		var rec_counts=0;
		var rec_lists='';
		for(a in uniqY){
			for (i in response_data){
				if(response_data[i].short_code==short_code && response_data[i].time_digit==uniqY[a]){
					rec_counts++;
					rec_lists+='<tr>';
						rec_lists+='<td>'+response_data[i].time_digit.substring(response_data[i].time_digit.length-2)+'</td>';
						rec_lists+='<td>'+response_data[i].data[0].network_error+'</td>';
					rec_lists+='</tr>';
					select=false;
				}
			}
			if(select){
				rec_counts++;
				rec_lists+='<tr>';
					rec_lists+='<td>'+uniqY[a].substring(uniqY[a].length-2)+'</td>';
					rec_lists+='<td>0</td>';
				rec_lists+='</tr>';
			}
			select=true;

		}
		list_tables ='';
		list_tables += '<center>Access Code: '+short_code+'</center><table border="0" align="center" cellpadding="0" cellspacing="1" class="results_mini" id="reports_tb" >';
		list_tables += '<tr>';
			list_tables += '<th width="5%">'+objfailureReport.getTimeLabel()+'</th>';
			list_tables += '<th width="95%" >Network Error</th>';
		list_tables += '</tr>';
		list_tables += rec_lists
		+ '</table>' 
		+ '<div id="reportPager" style="margin: auto;">';  
		objfailureReport.showDetailResultTable(list_tables,rec_counts);

	}
	if(failureCountType=="invalid_number"){
		var rec_counts=0;
		var rec_lists='';
		for(a in uniqY){
			for (i in response_data){
				if(response_data[i].short_code==short_code && response_data[i].time_digit==uniqY[a]){
					rec_counts++;
					rec_lists+='<tr>';
						rec_lists+='<td>'+response_data[i].time_digit.substring(response_data[i].time_digit.length-2)+'</td>';
						rec_lists+='<td>'+response_data[i].data[0].invalid_number+'</td>';
					rec_lists+='</tr>';
					select=false;
				}
			}
			if(select){
				rec_counts++;
				rec_lists+='<tr>';
					rec_lists+='<td>'+uniqY[a].substring(uniqY[a].length-2)+'</td>';
					rec_lists+='<td>0</td>';
				rec_lists+='</tr>';
			}
			select=true;

		}
		list_tables ='';
		list_tables += '<center>Access Code: '+short_code+'</center><table border="0" align="center" cellpadding="0" cellspacing="1" class="results_mini" id="reports_tb" >';
		list_tables += '<tr>';
			list_tables += '<th width="5%">'+objfailureReport.getTimeLabel()+'</th>';
			list_tables += '<th width="95%" >Invalid Number</th>';
		list_tables += '</tr>';
		list_tables += rec_lists
		+ '</table>' 
		+ '<div id="reportPager" style="margin: auto;">';  
		objfailureReport.showDetailResultTable(list_tables,rec_counts);

	}
	if(failureCountType=="security_failure"){
		var rec_counts=0;
		var rec_lists='';
		for(a in uniqY){
			for (i in response_data){
				if(response_data[i].short_code==short_code && response_data[i].time_digit==uniqY[a]){
					rec_counts++;
					rec_lists+='<tr>';
						rec_lists+='<td>'+response_data[i].time_digit.substring(response_data[i].time_digit.length-2)+'</td>';
						rec_lists+='<td>'+response_data[i].data[0].security_failure+'</td>';
					rec_lists+='</tr>';
					select=false;
				}
			}
			if(select){
				rec_counts++;
				rec_lists+='<tr>';
					rec_lists+='<td>'+uniqY[a].substring(uniqY[a].length-2)+'</td>';
					rec_lists+='<td>0</td>';
				rec_lists+='</tr>';
			}
			select=true;

		}
		list_tables ='';
		list_tables += '<center>Access Code: '+short_code+'</center><table border="0" align="center" cellpadding="0" cellspacing="1" class="results_mini" id="reports_tb" >';
		list_tables += '<tr>';
			list_tables += '<th width="5%">'+objfailureReport.getTimeLabel()+'</th>';
			list_tables += '<th width="95%" >Security failure</th>';
		list_tables += '</tr>';
		list_tables += rec_lists
		+ '</table>' 
		+ '<div id="reportPager" style="margin: auto;">';  
		objfailureReport.showDetailResultTable(list_tables,rec_counts);

	}
	if(failureCountType=="not_acceptable"){
		var rec_counts=0;
		var rec_lists='';
		for(a in uniqY){
			for (i in response_data){
				if(response_data[i].short_code==short_code && response_data[i].time_digit==uniqY[a]){
					rec_counts++;
					rec_lists+='<tr>';
						rec_lists+='<td>'+response_data[i].time_digit.substring(response_data[i].time_digit.length-2)+'</td>';
						rec_lists+='<td>'+response_data[i].data[0].not_acceptable+'</td>';
					rec_lists+='</tr>';
					select=false;
				}
			}
			if(select){
				rec_counts++;
				rec_lists+='<tr>';
					rec_lists+='<td>'+uniqY[a].substring(uniqY[a].length-2)+'</td>';
					rec_lists+='<td>0</td>';
				rec_lists+='</tr>';
			}
			select=true;

		}
		list_tables ='';
		list_tables += '<center>Access Code: '+short_code+'</center><table border="0" align="center" cellpadding="0" cellspacing="1" class="results_mini" id="reports_tb" >';
		list_tables += '<tr>';
			list_tables += '<th width="5%">'+objfailureReport.getTimeLabel()+'</th>';
			list_tables += '<th width="95%" >Not Acceptable</th>';
		list_tables += '</tr>';
		list_tables += rec_lists
		+ '</table>' 
		+ '<div id="reportPager" style="margin: auto;">';  
		objfailureReport.showDetailResultTable(list_tables,rec_counts);

	}
	if(failureCountType=="bad_request"){
		var rec_counts=0;
		var rec_lists='';
		for(a in uniqY){
			for (i in response_data){
				if(response_data[i].short_code==short_code && response_data[i].time_digit==uniqY[a]){
					rec_counts++;
					rec_lists+='<tr>';
						rec_lists+='<td>'+response_data[i].time_digit.substring(response_data[i].time_digit.length-2)+'</td>';
						rec_lists+='<td>'+response_data[i].data[0].bad_request+'</td>';
					rec_lists+='</tr>';
					select=false;
				}
			}
			if(select){
				rec_counts++;
				rec_lists+='<tr>';
					rec_lists+='<td>'+uniqY[a].substring(uniqY[a].length-2)+'</td>';
					rec_lists+='<td>0</td>';
				rec_lists+='</tr>';
			}
			select=true;

		}
		list_tables ='';
		list_tables += '<center>Access Code: '+short_code+'</center><table border="0" align="center" cellpadding="0" cellspacing="1" class="results_mini" id="reports_tb" >';
		list_tables += '<tr>';
			list_tables += '<th width="5%">'+objfailureReport.getTimeLabel()+'</th>';
			list_tables += '<th width="95%" >Bad Request</th>';
		list_tables += '</tr>';
		list_tables += rec_lists
		+ '</table>' 
		+ '<div id="reportPager" style="margin: auto;">';  
		objfailureReport.showDetailResultTable(list_tables,rec_counts);

	}
		
	if(failureCountType=="internal_error"){
		var rec_counts=0;
		var rec_lists='';
		for(a in uniqY){
			for (i in response_data){
				if(response_data[i].short_code==short_code && response_data[i].time_digit==uniqY[a]){
					rec_counts++;
					rec_lists+='<tr>';
						rec_lists+='<td>'+response_data[i].time_digit.substring(response_data[i].time_digit.length-2)+'</td>';
						rec_lists+='<td>'+response_data[i].data[0].internal_error+'</td>';
						rec_lists+='<td>'+response_data[i].data[0].internal_error_before_anm+'</td>';
						rec_lists+='<td>'+response_data[i].data[0].internal_error_after_anm+'</td>';
					rec_lists+='</tr>';
					select=false;
				}
			}
			if(select){
				rec_counts++;
				rec_lists+='<tr>';
					rec_lists+='<td>'+uniqY[a].substring(uniqY[a].length-2)+'</td>';
					rec_lists+='<td>0</td>';
					rec_lists+='<td>0</td>';
					rec_lists+='<td>0</td>';
				rec_lists+='</tr>';
			}
			select=true;

		}
		list_tables ='';
		list_tables += '<center>Access Code: '+short_code+'</center><table border="0" align="center" cellpadding="0" cellspacing="1" class="results_mini" id="reports_tb" >';
		list_tables += '<tr>';
			list_tables += '<th width="5%">'+objfailureReport.getTimeLabel()+'</th>';
			list_tables += '<th width="31.666666667%" >Internal Error</th>';
			list_tables += '<th width="31.666666667%" >Before Answer</th>';
			list_tables += '<th width="31.666666667%" >After Answer</th>';
		list_tables += '</tr>';
		list_tables += rec_lists
			+ '</table>' 
			+ '<div id="reportPager" style="margin: auto;">';  
		objfailureReport.showDetailResultTable(list_tables,rec_counts);

	}
	if(failureCountType=="app_parse_error_after_anm"){
		var rec_counts=0;
		var rec_lists='';
		for(a in uniqY){
			for (i in response_data){
				if(response_data[i].short_code==short_code && response_data[i].time_digit==uniqY[a]){
					rec_counts++;
					rec_lists+='<tr>';
						rec_lists+='<td>'+response_data[i].time_digit.substring(response_data[i].time_digit.length-2)+'</td>';
						rec_lists+='<td>'+response_data[i].data[0].app_parse_error_after_anm+'</td>';
					rec_lists+='</tr>';
					select=false;
				}
			}
			if(select){
				rec_counts++;
				rec_lists+='<tr>';
					rec_lists+='<td>'+uniqY[a].substring(uniqY[a].length-2)+'</td>';
					rec_lists+='<td>0</td>';
				rec_lists+='</tr>';
			}
			select=true;
		}
		list_tables ='';
		list_tables += '<center>Access Code: '+short_code+'</center><table border="0" align="center" cellpadding="0" cellspacing="1" class="results_mini" id="reports_tb" >';
		list_tables += '<tr>';
			list_tables += '<th width="5%">'+objfailureReport.getTimeLabel()+'</th>';
			list_tables += '<th width="95%" >Application Parse Error After Answer</th>';
		list_tables += '</tr>';
		list_tables += rec_lists
	+ '</table>' 
	+ '<div id="reportPager" style="margin: auto;">';  
	objfailureReport.showDetailResultTable(list_tables,rec_counts);

	}
	if(failureCountType=="app_error_after_anm"){
		var rec_counts=0;
		var rec_lists='';
		for(a in uniqY){
			for (i in response_data){
				if(response_data[i].short_code==short_code && response_data[i].time_digit==uniqY[a]){
					rec_counts++;
					rec_lists+='<tr>';
						rec_lists+='<td>'+response_data[i].time_digit.substring(response_data[i].time_digit.length-2)+'</td>';
						rec_lists+='<td>'+response_data[i].data[0].app_error_after_anm+'</td>';
					rec_lists+='</tr>';
					select=false;
				}
			}
			if(select){
				rec_counts++;
				rec_lists+='<tr>';
					rec_lists+='<td>'+uniqY[a].substring(uniqY[a].length-2)+'</td>';
					rec_lists+='<td>0</td>';
				rec_lists+='</tr>';
			}
			select=true;

		}
		list_tables ='';
		list_tables += '<center>Access Code: '+short_code+'</center><table border="0" align="center" cellpadding="0" cellspacing="1" class="results_mini" id="reports_tb" >';
		list_tables += '<tr>';
			list_tables += '<th width="5%">'+objfailureReport.getTimeLabel()+'</th>';
			list_tables += '<th width="95%" >Application  Error After Answer</th>';
		list_tables += '</tr>';
		list_tables += rec_lists
		+ '</table>' 
		+ '<div id="reportPager" style="margin: auto;">';  
		objfailureReport.showDetailResultTable(list_tables,rec_counts);
	}
	if(failureCountType=="app_timeout_after_anm"){
		var rec_counts=0;
		var rec_lists='';
		for(a in uniqY){
			for (i in response_data){
				if(response_data[i].short_code==short_code && response_data[i].time_digit==uniqY[a]){
					rec_counts++;
					rec_lists+='<tr>';
						rec_lists+='<td>'+response_data[i].time_digit.substring(response_data[i].time_digit.length-2)+'</td>';
						rec_lists+='<td>'+response_data[i].data[0].app_timeout_after_anm+'</td>';
					rec_lists+='</tr>';
					select=false;
				}
			}
			if(select){
				rec_counts++;
				rec_lists+='<tr>';
					rec_lists+='<td>'+uniqY[a].substring(uniqY[a].length-2)+'</td>';
					rec_lists+='<td>0</td>';
				rec_lists+='</tr>';
			}
			select=true;

		}
		list_tables ='';
		list_tables += '<center>Access Code: '+short_code+'</center><table border="0" align="center" cellpadding="0" cellspacing="1" class="results_mini" id="reports_tb" >';
		list_tables += '<tr>';
			list_tables += '<th width="5%">'+objfailureReport.getTimeLabel()+'</th>';
			list_tables += '<th width="95%" >Application Timeout After Answer</th>';
		list_tables += '</tr>';
		list_tables += rec_lists
		+ '</table>' 
		+ '<div id="reportPager" style="margin: auto;">';  
		objfailureReport.showDetailResultTable(list_tables,rec_counts);

	}
	if(failureCountType=="app_not_found_after_anm"){
		var rec_counts=0;
		var rec_lists='';
		for(a in uniqY){
			for (i in response_data){
				if(response_data[i].short_code==short_code && response_data[i].time_digit==uniqY[a]){
					rec_counts++;
					rec_lists+='<tr>';
						rec_lists+='<td>'+response_data[i].time_digit.substring(response_data[i].time_digit.length-2)+'</td>';
						rec_lists+='<td>'+response_data[i].data[0].app_not_found_after_anm+'</td>';
					rec_lists+='</tr>';
					select=false;
				}
			}
			if(select){
				rec_counts++;
				rec_lists+='<tr>';
					rec_lists+='<td>'+uniqY[a].substring(uniqY[a].length-2)+'</td>';
					rec_lists+='<td>0</td>';
				rec_lists+='</tr>';
			}
			select=true;

		}
		list_tables ='';
		list_tables += '<center>Access Code: '+short_code+'</center><table border="0" align="center" cellpadding="0" cellspacing="1" class="results_mini" id="reports_tb" >';
		list_tables += '<tr>';
			list_tables += '<th width="5%">'+objfailureReport.getTimeLabel()+'</th>';
			list_tables += '<th width="95%" >Application Not Found After Answer</th>';
		list_tables += '</tr>';
		list_tables += rec_lists
		+ '</table>' 
		+ '<div id="reportPager" style="margin: auto;">';  
		objfailureReport.showDetailResultTable(list_tables,rec_counts);

	}
	if(failureCountType=="internal_error_after_anm"){
		var rec_counts=0;
		var rec_lists='';
		for(a in uniqY){
			for (i in response_data){
				if(response_data[i].short_code==short_code && response_data[i].time_digit==uniqY[a]){
					rec_counts++;
					rec_lists+='<tr>';
						rec_lists+='<td>'+response_data[i].time_digit.substring(response_data[i].time_digit.length-2)+'</td>';
						rec_lists+='<td>'+response_data[i].data[0].internal_error_after_anm+'</td>';
					rec_lists+='</tr>';
					select=false;
				}
			}
			if(select){
				rec_counts++;
				rec_lists+='<tr>';
					rec_lists+='<td>'+uniqY[a].substring(uniqY[a].length-2)+'</td>';
					rec_lists+='<td>0</td>';
				rec_lists+='</tr>';
			}
			select=true;

		}
		list_tables ='';
		list_tables += '<center>Access Code: '+short_code+'</center><table border="0" align="center" cellpadding="0" cellspacing="1" class="results_mini" id="reports_tb" >';
		list_tables += '<tr>';
			list_tables += '<th width="5%">'+objfailureReport.getTimeLabel()+'</th>';
			list_tables += '<th width="95%" >Internal Error After Answer</th>';
		list_tables += '</tr>';
		list_tables += rec_lists
		+ '</table>' 
		+ '<div id="reportPager" style="margin: auto;">';  
		objfailureReport.showDetailResultTable(list_tables,rec_counts);
	}
	if(failureCountType=="app_parse_error_before_anm"){
		var rec_counts=0;
		var rec_lists='';
		for(a in uniqY){
			for (i in response_data){
				if(response_data[i].short_code==short_code && response_data[i].time_digit==uniqY[a]){
					rec_counts++;
					rec_lists+='<tr>';
						rec_lists+='<td>'+response_data[i].time_digit.substring(response_data[i].time_digit.length-2)+'</td>';
						rec_lists+='<td>'+response_data[i].data[0].app_parse_error_before_anm+'</td>';
					rec_lists+='</tr>';
					select=false;
				}
			}
			if(select){
				rec_counts++;
				rec_lists+='<tr>';
					rec_lists+='<td>'+uniqY[a].substring(uniqY[a].length-2)+'</td>';
					rec_lists+='<td>0</td>';
				rec_lists+='</tr>';
			}
			select=true;

		}
		list_tables ='';
		list_tables += '<center>Access Code: '+short_code+'</center><table border="0" align="center" cellpadding="0" cellspacing="1" class="results_mini" id="reports_tb" >';
		list_tables += '<tr>';
				list_tables += '<th width="5%">'+objfailureReport.getTimeLabel()+'</th>';
				list_tables += '<th width="95%" >Application Parse Error Before Answer</th>';
		list_tables += '</tr>';
		list_tables += rec_lists
		+ '</table>' 
		+ '<div id="reportPager" style="margin: auto;">';  
		objfailureReport.showDetailResultTable(list_tables,rec_counts);

	}
	if(failureCountType=="app_error_before_anm"){
		var rec_counts=0;
		var rec_lists='';
		for(a in uniqY){
			for (i in response_data){
				if(response_data[i].short_code==short_code && response_data[i].time_digit==uniqY[a]){
					rec_counts++;
					rec_lists+='<tr>';
						rec_lists+='<td>'+response_data[i].time_digit.substring(response_data[i].time_digit.length-2)+'</td>';
						rec_lists+='<td>'+response_data[i].data[0].app_error_before_anm+'</td>';
					rec_lists+='</tr>';
					select=false;
				}
			}
			if(select){
				rec_counts++;
				rec_lists+='<tr>';
					rec_lists+='<td>'+uniqY[a].substring(uniqY[a].length-2)+'</td>';
					rec_lists+='<td>0</td>';
				rec_lists+='</tr>';
		}
			select=true;

		}
		list_tables ='';
		list_tables += '<center>Access Code: '+short_code+'</center><table border="0" align="center" cellpadding="0" cellspacing="1" class="results_mini" id="reports_tb" >';
		list_tables += '<tr>';
			list_tables += '<th width="5%">'+objfailureReport.getTimeLabel()+'</th>';
			list_tables += '<th width="95%" >Application  Error Before Answer</th>';
		list_tables += '</tr>';
		list_tables += rec_lists
		+ '</table>' 
		+ '<div id="reportPager" style="margin: auto;">';  
		objfailureReport.showDetailResultTable(list_tables,rec_counts);

	}
	if(failureCountType=="app_timeout_before_anm"){
		var rec_counts=0;
		var rec_lists='';
		for(a in uniqY){
			for (i in response_data){
				if(response_data[i].short_code==short_code && response_data[i].time_digit==uniqY[a]){
					rec_counts++;
					rec_lists+='<tr>';
						rec_lists+='<td>'+response_data[i].time_digit.substring(response_data[i].time_digit.length-2)+'</td>';
						rec_lists+='<td>'+response_data[i].data[0].app_timeout_before_anm+'</td>';
					rec_lists+='</tr>';
					select=false;
				}
			}
			if(select){
				rec_counts++;
				rec_lists+='<tr>';
					rec_lists+='<td>'+uniqY[a].substring(uniqY[a].length-2)+'</td>';
					rec_lists+='<td>0</td>';
				rec_lists+='</tr>';
			}
			select=true;

		}
		list_tables ='';
		list_tables += '<center>Access Code: '+short_code+'</center><table border="0" align="center" cellpadding="0" cellspacing="1" class="results_mini" id="reports_tb" >';
		list_tables += '<tr>';
			list_tables += '<th width="5%">'+objfailureReport.getTimeLabel()+'</th>';
			list_tables += '<th width="95%" >Application Timeout  Before Answer</th>';
		list_tables += '</tr>';
		list_tables += rec_lists
	+ '</table>' 
	+ '<div id="reportPager" style="margin: auto;">';  
		objfailureReport.showDetailResultTable(list_tables,rec_counts);

	}
	if(failureCountType=="app_not_found_before_anm"){
		var rec_counts=0;
		var rec_lists='';
		for(a in uniqY){
			for (i in response_data){
				if(response_data[i].short_code==short_code && response_data[i].time_digit==uniqY[a]){
					rec_counts++;
					rec_lists+='<tr>';
						rec_lists+='<td>'+response_data[i].time_digit.substring(response_data[i].time_digit.length-2)+'</td>';
						rec_lists+='<td>'+response_data[i].data[0].app_not_found_before_anm+'</td>';
					rec_lists+='</tr>';
					select=false;
				}
			}
			if(select){
				rec_counts++;
				rec_lists+='<tr>';
					rec_lists+='<td>'+uniqY[a].substring(uniqY[a].length-2)+'</td>';
					rec_lists+='<td>0</td>';
				rec_lists+='</tr>';
			}
			select=true;
		}
		list_tables ='';
		list_tables += '<center>Access Code: '+short_code+'</center><table border="0" align="center" cellpadding="0" cellspacing="1" class="results_mini" id="reports_tb" >';
		list_tables += '<tr>';
			list_tables += '<th width="5%">'+objfailureReport.getTimeLabel()+'</th>';
			list_tables += '<th width="95%" >Application Not Found Before Answer</th>';
		list_tables += '</tr>';
		list_tables += rec_lists
		+ '</table>' 
		+ '<div id="reportPager" style="margin: auto;">';  
		objfailureReport.showDetailResultTable(list_tables,rec_counts);

	}
	if(failureCountType=="internal_error_before_anm"){
		var rec_counts=0;
		var rec_lists='';
		for(a in uniqY){
			for (i in response_data){
				if(response_data[i].short_code==short_code && response_data[i].time_digit==uniqY[a]){
					rec_counts++;
					rec_lists+='<tr>';
						rec_lists+='<td>'+response_data[i].time_digit.substring(response_data[i].time_digit.length-2)+'</td>';
						rec_lists+='<td>'+response_data[i].data[0].internal_error_before_anm+'</td>';
					rec_lists+='</tr>';
					select=false;
				}
			}
			if(select){
				rec_counts++;
				rec_lists+='<tr>';
					rec_lists+='<td>'+uniqY[a].substring(uniqY[a].length-2)+'</td>';
					rec_lists+='<td>0</td>';
				rec_lists+='</tr>';
			}
			select=true;

		}
		list_tables ='';
		list_tables += '<center>Access Code: '+short_code+'</center><table border="0" align="center" cellpadding="0" cellspacing="1" class="results_mini" id="reports_tb" >';
		list_tables += '<tr>';
				list_tables += '<th width="5%">'+objfailureReport.getTimeLabel()+'</th>';
				list_tables += '<th width="95%" >Internal Error Before Answer</th>';

		list_tables += '</tr>';
		list_tables += rec_lists
		+ '</table>' 
		+ '<div id="reportPager" style="margin: auto;">';  
		objfailureReport.showDetailResultTable(list_tables,rec_counts);
	}


}

failureReport.prototype.showTable = function(response_data) {
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
	var uniqY=objfailureReport.getYaxis();

	failureCountType=objfailureReport.getFailureCountType();

	if(failureCountType=="total_failures"){
		for(i in uniqX){
			var total_failures=[];
			var system_failures=[];
			var application_failures=[];
			var user_failures=[];
			var network_failures=[];
			for (var h in uniqY){
				var selected=false;
				for (var j in response_data){
					if(uniqX[i]==response_data[j].short_code && uniqY[h]==response_data[j].time_digit ){
						selected=true;	
						total_failures=total_failures.concat(parseInt(response_data[j].data[0].total_failures));
						system_failures=system_failures.concat(parseInt(response_data[j].data[0].system_failures));
						application_failures=application_failures.concat(parseInt(response_data[j].data[0].application_failures));
						user_failures=user_failures.concat(parseInt(response_data[j].data[0].user_failures));
						network_failures=network_failures.concat(parseInt(response_data[j].data[0].network_failures));
					}
				}
				 if(!selected){
					total_failures=total_failures.concat(parseInt(0));
					system_failures=system_failures.concat(parseInt(0));
					application_failures=application_failures.concat(parseInt(0));
					user_failures=user_failures.concat(parseInt(0));
					network_failures=network_failures.concat(parseInt(0));
				 }
				 selected=false;
			}
			sum_total_failures=0;
			sum_system_failures=0;
			sum_application_failures=0;
			sum_user_failures=0;
			sum_network_failures=0;
			for (d in total_failures){
				sum_total_failures=sum_total_failures+total_failures[d];
				sum_system_failures=sum_system_failures+system_failures[d];
				sum_application_failures=sum_application_failures+application_failures[d];
				sum_user_failures=sum_user_failures+user_failures[d];
				sum_network_failures=sum_network_failures+network_failures[d];
			}
			rec_count++;
					rec_list += '<tr>';
						rec_list += '<td id="path_'+h+'">'+uniqX[i]+'</td>';
						rec_list += '<td>'+sum_total_failures+'</td>';	
						rec_list += '<td>'+sum_system_failures+'</td>';
						rec_list += '<td>'+sum_application_failures+'</td>';
						rec_list += '<td>'+sum_user_failures+'</td>';
						rec_list += '<td>'+sum_network_failures+'</td>';
						rec_list += '<td><a title="View"  onclick="objfailureReport.showReport(\''+uniqX[i]+'\',\''+hits+'\')"><img src="images/view.png"></a></td>';	
					rec_list += '</tr>'; 
		}
		var list_table = '';
		list_table+='<table border="0" align="center" cellpadding="0" cellspacing="1" class="results_mini" id="mt" width="50%">';
		
		list_table+='<tr>';
			list_table+='<th width="15%">Access Code</th>';
			list_table += '<th width="16%" >Total Failures</th>';
			list_table += '<th width="16%" >System Failures</th>';
			list_table += '<th width="16%" >Application Failures</th>';
			list_table += '<th width="16%" >User Failures</th>';
			list_table += '<th width="16%" >Network Failures</th>';
			list_table += '<th width="5%" ></th>';
		
		list_table += '</tr>';
			list_table += rec_list
		+ '</table>' 
		+ '<div id="pager" style="margin: auto;">';  
		
		objfailureReport.showResultTable(list_table,rec_count);
	}

	if(failureCountType=="application_failures"){
		for(i in uniqX){
			var application_failures=[];
			var app_not_found=[];
			var app_timeout=[];
			var app_error=[];
			var app_parse_error=[];
			for (var h in uniqY){
				var selected=false;
				for (var j in response_data){
					if(uniqX[i]==response_data[j].short_code && uniqY[h]==response_data[j].time_digit ){
						selected=true;	
						application_failures=application_failures.concat(parseInt(response_data[j].data[0].application_failures));
						app_not_found=app_not_found.concat(parseInt(response_data[j].data[0].app_not_found));
						app_timeout=app_timeout.concat(parseInt(response_data[j].data[0].app_timeout));
						app_error=app_error.concat(parseInt(response_data[j].data[0].app_error));
						app_parse_error=app_parse_error.concat(parseInt(response_data[j].data[0].app_parse_error));
					}
				}
				 if(!selected){
					application_failures=application_failures.concat(parseInt(0));
					app_not_found=app_not_found.concat(parseInt(0));
					app_timeout=app_timeout.concat(parseInt(0));
					app_error=app_error.concat(parseInt(0));
					app_parse_error=app_parse_error.concat(parseInt(0));
					}
				 }
				 selected=false;
			
			sum_application_failures=0;
			sum_app_not_found=0;
			sum_app_timeout=0;
			sum_app_error=0;
			sum_app_parse_error=0;

			for (d in application_failures){
				sum_application_failures=sum_application_failures+application_failures[d];
				sum_app_not_found=sum_app_not_found+app_not_found[d];
				sum_app_timeout=sum_app_timeout+app_timeout[d];
				sum_app_error=sum_app_error+app_error[d];
				sum_app_parse_error=sum_app_parse_error+app_parse_error[d];
			}
			rec_count++;
					rec_list += '<tr>';
						rec_list += '<td id="path_'+h+'">'+uniqX[i]+'</td>';
						rec_list += '<td>'+sum_application_failures+'</td>';	
						rec_list += '<td>'+sum_app_not_found+'</td>';
						rec_list += '<td>'+sum_app_timeout+'</td>';
						rec_list += '<td>'+sum_app_error+'</td>';
						rec_list += '<td>'+sum_app_parse_error+'</td>';
						rec_list += '<td><a title="View"  onclick="objfailureReport.showReport(\''+uniqX[i]+'\',\''+hits+'\')"><img src="images/view.png"></a></td>';	
					rec_list += '</tr>'; 
		}
		var list_table = '';
		list_table+='<table border="0" align="center" cellpadding="0" cellspacing="1" class="results_mini" id="mt" width="50%">';
		
		list_table+='<tr>';
			list_table+='<th width="15%">Access Code</th>';
			list_table += '<th width="15%" >Application Failures</th>';
			list_table += '<th width="15%" >Application Not Found</th>';
			list_table += '<th width="15%" >Application  Timeout</th>';
			list_table += '<th width="15%" >Application Error</th>';
			list_table += '<th width="15%" >Application Parse Error</th>';
			list_table += '<th width="5%" ></th>';
		
		list_table += '</tr>';
			list_table += rec_list
		+ '</table>' 
		+ '<div id="pager" style="margin: auto;">';  
		
		objfailureReport.showResultTable(list_table,rec_count);

	}

	if(failureCountType=="user_failures"){
		for(i in uniqX){
			var user_failures=[];
			var user_blacklisted=[];
			var user_busy=[];
			var user_cancel=[];
			var no_answer=[];
			for (var h in uniqY){
				var selected=false;
				for (var j in response_data){
					if(uniqX[i]==response_data[j].short_code && uniqY[h]==response_data[j].time_digit ){
						selected=true;	
						user_failures=user_failures.concat(parseInt(response_data[j].data[0].user_failures));
						user_blacklisted=user_blacklisted.concat(parseInt(response_data[j].data[0].user_blacklisted));
						user_busy=user_busy.concat(parseInt(response_data[j].data[0].user_busy));
						user_cancel=user_cancel.concat(parseInt(response_data[j].data[0].user_cancel));
						no_answer=no_answer.concat(parseInt(response_data[j].data[0].no_answer));
					}
				}
				 if(!selected){
					user_failures=user_failures.concat(parseInt(0));
					user_blacklisted=user_blacklisted.concat(parseInt(0));
					user_busy=user_busy.concat(parseInt(0));
					user_cancel=user_cancel.concat(parseInt(0));
					no_answer=no_answer.concat(parseInt(0));
					}
				 }
				 selected=false;
			
			sum_user_failures=0;
			sum_user_blacklisted=0;
			sum_user_busy=0;
			sum_user_cancel=0;
			sum_no_answer=0;

			for (d in user_failures){
				sum_user_failures=sum_user_failures+user_failures[d];
				sum_user_blacklisted=sum_user_blacklisted+user_blacklisted[d];
				sum_user_busy=sum_user_busy+user_busy[d];
				sum_user_cancel=sum_user_cancel+user_cancel[d];
				sum_no_answer=sum_no_answer+no_answer[d];
			}
			rec_count++;
					rec_list += '<tr>';
						rec_list += '<td id="path_'+h+'">'+uniqX[i]+'</td>';
						rec_list += '<td>'+sum_user_failures+'</td>';	
						rec_list += '<td>'+sum_user_blacklisted+'</td>';
						rec_list += '<td>'+sum_user_busy+'</td>';
						rec_list += '<td>'+sum_user_cancel+'</td>';
						rec_list += '<td>'+sum_no_answer+'</td>';
						rec_list += '<td><a title="View"  onclick="objfailureReport.showReport(\''+uniqX[i]+'\',\''+hits+'\')"><img src="images/view.png"></a></td>';	
					rec_list += '</tr>'; 
		}
		var list_table = '';
		list_table+='<table border="0" align="center" cellpadding="0" cellspacing="1" class="results_mini" id="mt" width="50%">';
		
		list_table+='<tr>';
			list_table+='<th width="15%">Access Code</th>';
			list_table += '<th width="15%" >User Failures</th>';
			list_table += '<th width="15%" >User Blacklisted</th>';
			list_table += '<th width="15%" >User Busy</th>';
			list_table += '<th width="15%" >User Cancel</th>';
			list_table += '<th width="15%" >No Answer</th>';
			list_table += '<th width="5%" ></th>';
		
		list_table += '</tr>';
			list_table += rec_list
		+ '</table>' 
		+ '<div id="pager" style="margin: auto;">';  
		
		objfailureReport.showResultTable(list_table,rec_count);

	}
	if(failureCountType=="system_failures"){
		for(i in uniqX){
			var system_failures=[];
			var codec_mismatch=[];
			var internal_error=[];
			var invalid_number=[];
			var security_failure= [];
			var not_acceptable= [];
			var bad_request= [];

			for (var h in uniqY){
				var selected=false;
				for (var j in response_data){
					if(uniqX[i]==response_data[j].short_code && uniqY[h]==response_data[j].time_digit ){
						selected=true;	
						system_failures=system_failures.concat(parseInt(response_data[j].data[0].system_failures));
						codec_mismatch=codec_mismatch.concat(parseInt(response_data[j].data[0].codec_mismatch));
						internal_error=internal_error.concat(parseInt(response_data[j].data[0].internal_error));
						invalid_number=invalid_number.concat(parseInt(response_data[j].data[0].invalid_number));
						security_failure=security_failure.concat(parseInt(response_data[j].data[0].security_failure));
						not_acceptable=not_acceptable.concat(parseInt(response_data[j].data[0].not_acceptable));
						bad_request=bad_request.concat(parseInt(response_data[j].data[0].bad_request));
					}
				}
				 if(!selected){
					system_failures=system_failures.concat(parseInt(0));
					codec_mismatch=codec_mismatch.concat(parseInt(0));
					internal_error=internal_error.concat(parseInt(0));
					invalid_number=invalid_number.concat(parseInt(0));
					security_failure=security_failure.concat(parseInt(0));
					not_acceptable=not_acceptable.concat(parseInt(0));
					bad_request=bad_request.concat(parseInt(0));
					}
				 }
				selected=false;
			sum_system_failures=0;
			sum_codec_mismatch=0;
			sum_internal_error=0;
			sum_invalid_number=0;
			sum_security_failure=0
			sum_not_acceptable=0;
			sum_bad_request=0;

			for (d in system_failures){

				sum_system_failures=sum_system_failures+system_failures[d];
				sum_codec_mismatch=sum_codec_mismatch+codec_mismatch[d];
				sum_internal_error=sum_internal_error+internal_error[d];
				sum_invalid_number= sum_invalid_number+invalid_number[d];
				sum_security_failure=sum_security_failure+security_failure[d];
				sum_not_acceptable=sum_not_acceptable+not_acceptable[d];
				sum_bad_request=sum_bad_request+bad_request[d];
			}
			rec_count++;
					rec_list += '<tr>';
						rec_list += '<td id="path_'+h+'">'+uniqX[i]+'</td>';
						rec_list += '<td>'+sum_system_failures+'</td>';	
						rec_list += '<td>'+sum_codec_mismatch+'</td>';
						rec_list += '<td>'+sum_internal_error+'</td>';
						rec_list += '<td>'+sum_invalid_number+'</td>';
						rec_list += '<td>'+sum_security_failure+'</td>';
						rec_list += '<td>'+sum_not_acceptable+'</td>';
						rec_list += '<td>'+sum_bad_request+'</td>';
						rec_list += '<td><a title="View"  onclick="objfailureReport.showReport(\''+uniqX[i]+'\',\''+hits+'\')"><img src="images/view.png"></a></td>';	
					rec_list += '</tr>';
			} 



			var list_table = '';
			list_table+='<table border="0" align="center" cellpadding="0" cellspacing="1" class="results_mini" id="mt" width="50%">';
			
			list_table+='<tr>';
				list_table+='<th width="20%">Access Code</th>';
				list_table += '<th width="10.71%" >System Failures</th>';
				list_table += '<th width="10.71%" >Codec Mismatch</th>';
				list_table += '<th width="10.71%" >Internal Error</th>';
				list_table += '<th width="10.71%" >Invalid Number</th>';
				list_table += '<th width="10.71%" >Security failure</th>';
				list_table += '<th width="10.71%" >Not Acceptable</th>';
				list_table += '<th width="10.71%" >Bad Request</th>';
				list_table += '<th width="5%" ></th>';
			
			list_table += '</tr>';
				list_table += rec_list
			+ '</table>' 
			+ '<div id="pager" style="margin: auto;">';  
			
		objfailureReport.showResultTable(list_table,rec_count);

	}

	if(failureCountType=="network_failures"){
		for(i in uniqX){
			var network_failures=[];
			var call_redirect=[];
			var network_error=[];
			for (var h in uniqY){
				var selected=false;
				for (var j in response_data){
					if(uniqX[i]==response_data[j].short_code && uniqY[h]==response_data[j].time_digit ){
						selected=true;	
						network_failures=network_failures.concat(parseInt(response_data[j].data[0].network_failures));
						call_redirect=call_redirect.concat(parseInt(response_data[j].data[0].call_redirect));
						network_error=network_error.concat(parseInt(response_data[j].data[0].network_error));
					}
				}
				 if(!selected){
					network_failures=network_failures.concat(parseInt(0));
					call_redirect=call_redirect.concat(parseInt(0));
					network_error=network_error.concat(parseInt(0));
					}
				 }
				 selected=false;
			
			sum_network_failures=0;
			sum_call_redirect=0;
			sum_network_error=0;

			for (d in user_failures){

				sum_network_failures=sum_network_failures+network_failures[d];
				sum_call_redirect=sum_call_redirect+call_redirect[d];
				sum_network_error=sum_network_error+network_error[d];
			}
			rec_count++;
					rec_list += '<tr>';
						rec_list += '<td id="path_'+h+'">'+uniqX[i]+'</td>';
						rec_list += '<td>'+sum_network_failures+'</td>';	
						rec_list += '<td>'+sum_call_redirect+'</td>';
						rec_list += '<td>'+sum_network_error+'</td>';
						rec_list += '<td><a title="View"  onclick="objfailureReport.showReport(\''+uniqX[i]+'\',\''+hits+'\')"><img src="images/view.png"></a></td>';	
					rec_list += '</tr>'; 
		}
		var list_table = '';
		list_table+='<table border="0" align="center" cellpadding="0" cellspacing="1" class="results_mini" id="mt" width="50%">';
		
		list_table+='<tr>';
			list_table+='<th width="20%">Access Code</th>';
			list_table += '<th width="25%" >Networ Failures</th>';
			list_table += '<th width="25%" >Call Redirect</th>';
			list_table += '<th width="25%" >Network Error</th>';
			list_table += '<th width="5%" ></th>';
		
		list_table += '</tr>';
			list_table += rec_list
		+ '</table>' 
		+ '<div id="pager" style="margin: auto;">';  
		
		objfailureReport.showResultTable(list_table,rec_count);

	}

	if(failureCountType=="app_parse_error"){
		for(i in uniqX){
			var app_parse_error=[];
			var app_parse_error_before_anm=[];
			var app_parse_error_after_anm=[];
			for (var h in uniqY){
				var selected=false;
				for (var j in response_data){
					if(uniqX[i]==response_data[j].short_code && uniqY[h]==response_data[j].time_digit ){
						selected=true;	
						app_parse_error=app_parse_error.concat(parseInt(response_data[j].data[0].app_parse_error));
						app_parse_error_before_anm=app_parse_error_before_anm.concat(parseInt(response_data[j].data[0].app_parse_error_before_anm));
						app_parse_error_after_anm=app_parse_error_after_anm.concat(parseInt(response_data[j].data[0].app_parse_error_after_anm));
					}
				}
				 if(!selected){
					app_parse_error=app_parse_error.concat(parseInt(0));
					app_parse_error_before_anm=app_parse_error_before_anm.concat(parseInt(0));
					app_parse_error_after_anm=app_parse_error_after_anm.concat(parseInt(0));
					}
				 }
				 selected=false;
			
			sum_app_parse_error=0;
			sum_app_parse_error_before_anm=0;
			sum_app_parse_error_after_anm=0;
			

			for (d in app_parse_error){
				sum_app_parse_error=sum_app_parse_error+app_parse_error[d];
				sum_app_parse_error_before_anm=sum_app_parse_error_before_anm+app_parse_error_before_anm[d];
				sum_app_parse_error_after_anm=sum_app_parse_error_after_anm+app_parse_error_after_anm[d];
			}
			rec_count++;
					rec_list += '<tr>';
						rec_list += '<td id="path_'+h+'">'+uniqX[i]+'</td>';
						rec_list += '<td>'+sum_app_parse_error+'</td>';	
						rec_list += '<td>'+sum_app_parse_error_before_anm+'</td>';
						rec_list += '<td>'+sum_app_parse_error_after_anm+'</td>';
						rec_list += '<td><a title="View"  onclick="objfailureReport.showReport(\''+uniqX[i]+'\',\''+hits+'\')"><img src="images/view.png"></a></td>';	
					rec_list += '</tr>'; 
		}
		var list_table = '';
		list_table+='<table border="0" align="center" cellpadding="0" cellspacing="1" class="results_mini" id="mt" width="50%">';
		
		list_table+='<tr>';
			list_table+='<th width="20%">Access Code</th>';
			list_table+='<th width="25%">Application Parse Error</th>';
			list_table += '<th width="25%" >Before Answer</th>';
			list_table += '<th width="25%" >After Answer</th>';
			list_table += '<th width="5%" ></th>';
		
		list_table += '</tr>';
			list_table += rec_list
		+ '</table>' 
		+ '<div id="pager" style="margin: auto;">';  
		
	objfailureReport.showResultTable(list_table,rec_count);
	}
	if(failureCountType=="app_error"){
		for(i in uniqX){
			var app_error=[];
			var app_error_before_anm=[];
			var app_error_after_anm=[];
			for (var h in uniqY){
				var selected=false;
				for (var j in response_data){
					if(uniqX[i]==response_data[j].short_code && uniqY[h]==response_data[j].time_digit ){
						selected=true;	
						app_error=app_error.concat(parseInt(response_data[j].data[0].app_error));
						app_error_before_anm=app_error_before_anm.concat(parseInt(response_data[j].data[0].app_error_before_anm));
						app_error_after_anm=app_error_after_anm.concat(parseInt(response_data[j].data[0].app_error_after_anm));
					}
				}
				 if(!selected){
					app_error=app_error.concat(parseInt(0));
					app_error_before_anm=app_error_before_anm.concat(parseInt(0));
					app_error_after_anm=app_error_after_anm.concat(parseInt(0));
					}
				 }
				 selected=false;
			
			sum_app_error=0;
			sum_app_error_before_anm=0;
			sum_app_error_after_anm=0;
			

			for (d in app_error){
				sum_app_error=sum_app_error+app_error[d];
				sum_app_error_before_anm=sum_app_error_before_anm+app_error_before_anm[d];
				sum_app_error_after_anm=sum_app_error_after_anm+app_error_after_anm[d];
			}
			rec_count++;
					rec_list += '<tr>';
						rec_list += '<td id="path_'+h+'">'+uniqX[i]+'</td>';
						rec_list += '<td>'+sum_app_error+'</td>';	
						rec_list += '<td>'+sum_app_error_before_anm+'</td>';
						rec_list += '<td>'+sum_app_error_after_anm+'</td>';
						rec_list += '<td><a title="View"  onclick="objfailureReport.showReport(\''+uniqX[i]+'\',\''+hits+'\')"><img src="images/view.png"></a></td>';	
					rec_list += '</tr>'; 

		}	
		var list_table = '';
		list_table+='<table border="0" align="center" cellpadding="0" cellspacing="1" class="results_mini" id="mt" width="50%">';
		
		list_table+='<tr>';
			list_table+='<th width="20%">Access Code</th>';
			list_table+='<th width="25%">Application Error</th>';
			list_table += '<th width="25%" >Before Answer</th>';
			list_table += '<th width="25%" >After Answer</th>';
			list_table += '<th width="5%" ></th>';
		
		list_table += '</tr>';
			list_table += rec_list
		+ '</table>' 
		+ '<div id="pager" style="margin: auto;">';  
		
		objfailureReport.showResultTable(list_table,rec_count);

	}
	if(failureCountType=="app_timeout"){
		for(i in uniqX){
			var app_timeout=[];
			var app_timeout_before_anm=[];
			var app_timeout_after_anm=[];
			for (var h in uniqY){
				var selected=false;
				for (var j in response_data){
					if(uniqX[i]==response_data[j].short_code && uniqY[h]==response_data[j].time_digit ){
						selected=true;	
						app_timeout=app_timeout.concat(parseInt(response_data[j].data[0].app_timeout));
						app_timeout_before_anm=app_timeout_before_anm.concat(parseInt(response_data[j].data[0].app_timeout_before_anm));
						app_timeout_after_anm=app_timeout_after_anm.concat(parseInt(response_data[j].data[0].app_timeout_after_anm));
					}
				}
				 if(!selected){
					app_timeout=app_timeout.concat(parseInt(0));
					app_timeout_before_anm=app_timeout_before_anm.concat(parseInt(0));
					app_timeout_after_anm=app_timeout_after_anm.concat(parseInt(0));
					}
				 }
				 selected=false;
			
			sum_app_timeout=0;
			sum_app_timeout_before_anm=0;
			sum_app_timeout_after_anm=0;
			

			for (d in app_timeout){
				sum_app_timeout=sum_app_timeout+app_timeout[d];
				sum_app_timeout_before_anm=sum_app_timeout_before_anm+app_timeout_before_anm[d];
				sum_app_timeout_after_anm=sum_app_timeout_after_anm+app_timeout_after_anm[d];
			}
			rec_count++;
					rec_list += '<tr>';
						rec_list += '<td id="path_'+h+'">'+uniqX[i]+'</td>';
						rec_list += '<td>'+sum_app_timeout+'</td>';	
						rec_list += '<td>'+sum_app_timeout_before_anm+'</td>';
						rec_list += '<td>'+sum_app_timeout_after_anm+'</td>';
						rec_list += '<td><a title="View"  onclick="objfailureReport.showReport(\''+uniqX[i]+'\',\''+hits+'\')"><img src="images/view.png"></a></td>';	
					rec_list += '</tr>'; 
		}
		var list_table = '';
		list_table+='<table border="0" align="center" cellpadding="0" cellspacing="1" class="results_mini" id="mt" width="50%">';
		
		list_table+='<tr>';
			list_table+='<th width="20%">Access Code</th>';
			list_table+='<th width="25%">Application Time Out</th>';
			list_table += '<th width="25%" >Before Answer</th>';
			list_table += '<th width="25%" >After Answer</th>';
			list_table += '<th width="5%" ></th>';
		
		list_table += '</tr>';
			list_table += rec_list
		+ '</table>' 
		+ '<div id="pager" style="margin: auto;">';  
		
		objfailureReport.showResultTable(list_table,rec_count);

	}
	if(failureCountType=="app_not_found"){
		for(i in uniqX){
			var app_not_found=[];
			var app_not_found_before_anm=[];
			var app_not_found_after_anm=[];
			for (var h in uniqY){
				var selected=false;
				for (var j in response_data){
					if(uniqX[i]==response_data[j].short_code && uniqY[h]==response_data[j].time_digit ){
						selected=true;	
						app_not_found=app_not_found.concat(parseInt(response_data[j].data[0].app_not_found));
						app_not_found_before_anm=app_not_found_before_anm.concat(parseInt(response_data[j].data[0].app_not_found_before_anm));
						app_not_found_after_anm=app_not_found_after_anm.concat(parseInt(response_data[j].data[0].app_not_found_after_anm));
					}
				}
				 if(!selected){
					app_not_found=app_not_found.concat(parseInt(0));
					app_not_found_before_anm=app_not_found_before_anm.concat(parseInt(0));
					app_not_found_after_anm=app_not_found_after_anm.concat(parseInt(0));
					}
				 }
				 selected=false;
			
			sum_app_not_found=0;
			sum_app_not_found_before_anm=0;
			sum_app_not_found_after_anm=0;
			

			for (d in app_not_found){
				sum_app_not_found=sum_app_not_found+app_not_found[d];
				sum_app_not_found_before_anm=sum_app_not_found_before_anm+app_not_found_before_anm[d];
				sum_app_not_found_after_anm=sum_app_not_found_after_anm+app_not_found_after_anm[d];
			}
			rec_count++;
					rec_list += '<tr>';
						rec_list += '<td id="path_'+h+'">'+uniqX[i]+'</td>';
						rec_list += '<td>'+sum_app_not_found+'</td>';	
						rec_list += '<td>'+sum_app_not_found_before_anm+'</td>';
						rec_list += '<td>'+sum_app_not_found_after_anm+'</td>';
						rec_list += '<td><a title="View"  onclick="objfailureReport.showReport(\''+uniqX[i]+'\',\''+hits+'\')"><img src="images/view.png"></a></td>';	
					rec_list += '</tr>'; 
		}
		var list_table = '';
		list_table+='<table border="0" align="center" cellpadding="0" cellspacing="1" class="results_mini" id="mt" width="50%">';
		
		list_table+='<tr>';
			list_table+='<th width="20%">Access Code</th>';
			list_table+='<th width="25%">Application Not Found</th>';
			list_table += '<th width="25%" >Before Answer</th>';
			list_table += '<th width="25%" >After Answer</th>';
			list_table += '<th width="5%" ></th>';
		
		list_table += '</tr>';
			list_table += rec_list
		+ '</table>' 
		+ '<div id="pager" style="margin: auto;">';  
		
		objfailureReport.showResultTable(list_table,rec_count);

	}
	if(failureCountType=="user_busy"){
		for(i in uniqX){
			var user_busy=[];
			for (var h in uniqY){
				var selected=false;
				for (var j in response_data){
					if(uniqX[i]==response_data[j].short_code && uniqY[h]==response_data[j].time_digit ){
						selected=true;	
						user_busy=user_busy.concat(parseInt(response_data[j].data[0].user_busy));
					}
				}
				 if(!selected){
					user_busy=user_busy.concat(parseInt(0));
					}
				 }
				 selected=false;
			
			sum_user_busy=0;

			for (d in user_busy){
				sum_user_busy=sum_user_busy+user_busy[d];
			}
			rec_count++;
					rec_list += '<tr>';
						rec_list += '<td id="path_'+h+'">'+uniqX[i]+'</td>';
						rec_list += '<td>'+sum_user_busy+'</td>';	
						rec_list += '<td><a title="View"  onclick="objfailureReport.showReport(\''+uniqX[i]+'\',\''+hits+'\')"><img src="images/view.png"></a></td>';	
					rec_list += '</tr>'; 
		}
		var list_table = '';
		list_table+='<table border="0" align="center" cellpadding="0" cellspacing="1" class="results_mini" id="mt" width="50%">';
		
		list_table+='<tr>';
			list_table+='<th width="35%">Access Code</th>';
			list_table += '<th width="60%" >User Busy</th>';
			list_table += '<th width="5%" ></th>';
		
		list_table += '</tr>';
			list_table += rec_list
		+ '</table>' 
		+ '<div id="pager" style="margin: auto;">';  
		
		objfailureReport.showResultTable(list_table,rec_count);

	}
	if(failureCountType=="codec_mismatch"){
		for(i in uniqX){
			var codec_mismatch=[];
			for (var h in uniqY){
				var selected=false;
				for (var j in response_data){
					if(uniqX[i]==response_data[j].short_code && uniqY[h]==response_data[j].time_digit ){
						selected=true;	
						codec_mismatch=codec_mismatch.concat(parseInt(response_data[j].data[0].codec_mismatch));
					}
				}
				 if(!selected){
					codec_mismatch=codec_mismatch.concat(parseInt(0));
					}
				 }
				 selected=false;
			
			sum_codec_mismatch=0;

			for (d in codec_mismatch){
				sum_codec_mismatch=sum_codec_mismatch+codec_mismatch[d];
			}
			rec_count++;
					rec_list += '<tr>';
						rec_list += '<td id="path_'+h+'">'+uniqX[i]+'</td>';
						rec_list += '<td>'+sum_codec_mismatch+'</td>';	
						rec_list += '<td><a title="View"  onclick="objfailureReport.showReport(\''+uniqX[i]+'\',\''+hits+'\')"><img src="images/view.png"></a></td>';	
					rec_list += '</tr>'; 
		}
		var list_table = '';
		list_table+='<table border="0" align="center" cellpadding="0" cellspacing="1" class="results_mini" id="mt" width="50%">';
		
		list_table+='<tr>';
			list_table+='<th width="35%">Access Code</th>';
			list_table += '<th width="60%" >Codec Mismatch</th>';
			list_table += '<th width="5%" ></th>';
		
		list_table += '</tr>';
			list_table += rec_list
		+ '</table>' 
		+ '<div id="pager" style="margin: auto;">';  
		
		objfailureReport.showResultTable(list_table,rec_count);

	}

if(failureCountType=="user_cancel"){
		for(i in uniqX){
			var user_cancel=[];
			for (var h in uniqY){
				var selected=false;
				for (var j in response_data){
					if(uniqX[i]==response_data[j].short_code && uniqY[h]==response_data[j].time_digit ){
						selected=true;	
						user_cancel=user_cancel.concat(parseInt(response_data[j].data[0].user_cancel));
					}
				}
				 if(!selected){
					user_cancel=user_cancel.concat(parseInt(0));
					}
				 }
				 selected=false;
			
			sum_user_cancel=0;

			for (d in user_cancel){
				sum_user_cancel=sum_user_cancel+user_cancel[d];
			}
			rec_count++;
					rec_list += '<tr>';
						rec_list += '<td id="path_'+h+'">'+uniqX[i]+'</td>';
						rec_list += '<td>'+sum_user_cancel+'</td>';	
						rec_list += '<td><a title="View"  onclick="objfailureReport.showReport(\''+uniqX[i]+'\',\''+hits+'\')"><img src="images/view.png"></a></td>';	
					rec_list += '</tr>'; 
		}
		var list_table = '';
		list_table+='<table border="0" align="center" cellpadding="0" cellspacing="1" class="results_mini" id="mt" width="50%">';
		
		list_table+='<tr>';
			list_table+='<th width="35%">Access Code</th>';
			list_table += '<th width="60%" >User Cancel</th>';
			list_table += '<th width="5%" ></th>';
		
		list_table += '</tr>';
			list_table += rec_list
		+ '</table>' 
		+ '<div id="pager" style="margin: auto;">';  
		
		objfailureReport.showResultTable(list_table,rec_count);

	}


	if(failureCountType=="no_answer"){
		for(i in uniqX){
			var no_answer=[];
			for (var h in uniqY){
				var selected=false;
				for (var j in response_data){
					if(uniqX[i]==response_data[j].short_code && uniqY[h]==response_data[j].time_digit ){
						selected=true;	
						no_answer=no_answer.concat(parseInt(response_data[j].data[0].no_answer));
					}
				}
				 if(!selected){
					no_answer=no_answer.concat(parseInt(0));
					}
				 }
				 selected=false;
			
			sum_no_answer=0;

			for (d in no_answer){
				sum_no_answer=sum_no_answer+no_answer[d];
			}
			rec_count++;
					rec_list += '<tr>';
						rec_list += '<td id="path_'+h+'">'+uniqX[i]+'</td>';
						rec_list += '<td>'+sum_no_answer+'</td>';	
						rec_list += '<td><a title="View"  onclick="objfailureReport.showReport(\''+uniqX[i]+'\',\''+hits+'\')"><img src="images/view.png"></a></td>';	
					rec_list += '</tr>'; 
		}
		var list_table = '';
		list_table+='<table border="0" align="center" cellpadding="0" cellspacing="1" class="results_mini" id="mt" width="50%">';
		
		list_table+='<tr>';
			list_table+='<th width="35%">Access Code</th>';
			list_table += '<th width="60%" >No Answer</th>';
			list_table += '<th width="5%" ></th>';
		
		list_table += '</tr>';
			list_table += rec_list
		+ '</table>' 
		+ '<div id="pager" style="margin: auto;">';  
		
		objfailureReport.showResultTable(list_table,rec_count);

	}

	if(failureCountType=="call_redirect"){
		for(i in uniqX){
			var call_redirect=[];
			for (var h in uniqY){
				var selected=false;
				for (var j in response_data){
					if(uniqX[i]==response_data[j].short_code && uniqY[h]==response_data[j].time_digit ){
						selected=true;	
						call_redirect=call_redirect.concat(parseInt(response_data[j].data[0].call_redirect));
					}
				}
				 if(!selected){
					call_redirect=call_redirect.concat(parseInt(0));
					}
				 }
				 selected=false;
			
			sum_call_redirect=0;

			for (d in call_redirect){
				sum_call_redirect=sum_call_redirect+call_redirect[d];
			}
			rec_count++;
					rec_list += '<tr>';
						rec_list += '<td id="path_'+h+'">'+uniqX[i]+'</td>';
						rec_list += '<td>'+sum_call_redirect+'</td>';	
						rec_list += '<td><a title="View"  onclick="objfailureReport.showReport(\''+uniqX[i]+'\',\''+hits+'\')"><img src="images/view.png"></a></td>';	
					rec_list += '</tr>'; 
		}
		var list_table = '';
		list_table+='<table border="0" align="center" cellpadding="0" cellspacing="1" class="results_mini" id="mt" width="50%">';
		
		list_table+='<tr>';
			list_table+='<th width="35%">Access Code</th>';
			list_table += '<th width="60%" >Call Redirect</th>';
			list_table += '<th width="5%" ></th>';
		
		list_table += '</tr>';
			list_table += rec_list
		+ '</table>' 
		+ '<div id="pager" style="margin: auto;">';  
		
		objfailureReport.showResultTable(list_table,rec_count);

	}

	if(failureCountType=="network_error"){
		for(i in uniqX){
			var network_error=[];
			for (var h in uniqY){
				var selected=false;
				for (var j in response_data){
					if(uniqX[i]==response_data[j].short_code && uniqY[h]==response_data[j].time_digit ){
						selected=true;	
						network_error=network_error.concat(parseInt(response_data[j].data[0].network_error));
					}
				}
				 if(!selected){
					network_error=network_error.concat(parseInt(0));
					}
				 }
				 selected=false;
			
			sum_network_error=0;

			for (d in network_error){
				sum_network_error=sum_network_error+network_error[d];
			}
			rec_count++;
					rec_list += '<tr>';
						rec_list += '<td id="path_'+h+'">'+uniqX[i]+'</td>';
						rec_list += '<td>'+sum_network_error+'</td>';	
						rec_list += '<td><a title="View"  onclick="objfailureReport.showReport(\''+uniqX[i]+'\',\''+hits+'\')"><img src="images/view.png"></a></td>';	
					rec_list += '</tr>'; 
		}
		var list_table = '';
		list_table+='<table border="0" align="center" cellpadding="0" cellspacing="1" class="results_mini" id="mt" width="50%">';
		
		list_table+='<tr>';
			list_table+='<th width="35%">Access Code</th>';
			list_table += '<th width="60%" >Network Error</th>';
			list_table += '<th width="5%" ></th>';
		
		list_table += '</tr>';
			list_table += rec_list
		+ '</table>' 
		+ '<div id="pager" style="margin: auto;">';  
		
		objfailureReport.showResultTable(list_table,rec_count);

	}
	if(failureCountType=="security_failure"){
		for(i in uniqX){
			var security_failure=[];
			for (var h in uniqY){
				var selected=false;
				for (var j in response_data){
					if(uniqX[i]==response_data[j].short_code && uniqY[h]==response_data[j].time_digit ){
						selected=true;	
						security_failure=security_failure.concat(parseInt(response_data[j].data[0].security_failure));
					}
				}
				 if(!selected){
					security_failure=security_failure.concat(parseInt(0));
					}
				 }
				 selected=false;
			
			sum_security_failure=0;

			for (d in security_failure){
				sum_security_failure=sum_security_failure+security_failure[d];
			}
			rec_count++;
					rec_list += '<tr>';
						rec_list += '<td id="path_'+h+'">'+uniqX[i]+'</td>';
						rec_list += '<td>'+sum_security_failure+'</td>';	
						rec_list += '<td><a title="View"  onclick="objfailureReport.showReport(\''+uniqX[i]+'\',\''+hits+'\')"><img src="images/view.png"></a></td>';	
					rec_list += '</tr>'; 
		}
		var list_table = '';
		list_table+='<table border="0" align="center" cellpadding="0" cellspacing="1" class="results_mini" id="mt" width="50%">';
		
		list_table+='<tr>';
			list_table+='<th width="35%">Access Code</th>';
			list_table += '<th width="60%" >Security Failure</th>';
			list_table += '<th width="5%" ></th>';
		
		list_table += '</tr>';
			list_table += rec_list
		+ '</table>' 
		+ '<div id="pager" style="margin: auto;">';  
		
		objfailureReport.showResultTable(list_table,rec_count);

	}

	if(failureCountType=="bad_request"){
		for(i in uniqX){
			var bad_request=[];
			for (var h in uniqY){
				var selected=false;
				for (var j in response_data){
					if(uniqX[i]==response_data[j].short_code && uniqY[h]==response_data[j].time_digit ){
						selected=true;	
						bad_request=bad_request.concat(parseInt(response_data[j].data[0].bad_request));
					}
				}
				 if(!selected){
					bad_request=bad_request.concat(parseInt(0));
					}
				 }
				 selected=false;
			
			sum_bad_request=0;

			for (d in bad_request){
				sum_bad_request=sum_bad_request+bad_request[d];
			}
			rec_count++;
					rec_list += '<tr>';
						rec_list += '<td id="path_'+h+'">'+uniqX[i]+'</td>';
						rec_list += '<td>'+sum_bad_request+'</td>';	
						rec_list += '<td><a title="View"  onclick="objfailureReport.showReport(\''+uniqX[i]+'\',\''+hits+'\')"><img src="images/view.png"></a></td>';	
					rec_list += '</tr>'; 
		}
		var list_table = '';
		list_table+='<table border="0" align="center" cellpadding="0" cellspacing="1" class="results_mini" id="mt" width="50%">';
		
		list_table+='<tr>';
			list_table+='<th width="35%">Access Code</th>';
			list_table += '<th width="60%" >Bad Request</th>';
			list_table += '<th width="5%" ></th>';
		
		list_table += '</tr>';
			list_table += rec_list
		+ '</table>' 
		+ '<div id="pager" style="margin: auto;">';  
		
		objfailureReport.showResultTable(list_table,rec_count);

	}
	
	if(failureCountType=="not_acceptable"){
		for(i in uniqX){
			var not_acceptable=[];
			for (var h in uniqY){
				var selected=false;
				for (var j in response_data){
					if(uniqX[i]==response_data[j].short_code && uniqY[h]==response_data[j].time_digit ){
						selected=true;	
						not_acceptable=not_acceptable.concat(parseInt(response_data[j].data[0].not_acceptable));
					}
				}
				 if(!selected){
					not_acceptable=not_acceptable.concat(parseInt(0));
					}
				 }
				 selected=false;
			
			sum_not_acceptable=0;

			for (d in not_acceptable){
				sum_not_acceptable=sum_not_acceptable+not_acceptable[d];
			}
			rec_count++;
					rec_list += '<tr>';
						rec_list += '<td id="path_'+h+'">'+uniqX[i]+'</td>';
						rec_list += '<td>'+sum_not_acceptable+'</td>';	
						rec_list += '<td><a title="View"  onclick="objfailureReport.showReport(\''+uniqX[i]+'\',\''+hits+'\')"><img src="images/view.png"></a></td>';	
					rec_list += '</tr>'; 
		}
		var list_table = '';
		list_table+='<table border="0" align="center" cellpadding="0" cellspacing="1" class="results_mini" id="mt" width="50%">';
		
		list_table+='<tr>';
			list_table+='<th width="35%">Access Code</th>';
			list_table += '<th width="60%" >Not Acceptable</th>';
			list_table += '<th width="5%" ></th>';
		
		list_table += '</tr>';
			list_table += rec_list
		+ '</table>' 
		+ '<div id="pager" style="margin: auto;">';  
		
		objfailureReport.showResultTable(list_table,rec_count);

	}

	if(failureCountType=="invalid_number"){
		for(i in uniqX){
			var invalid_number=[];
			for (var h in uniqY){
				var selected=false;
				for (var j in response_data){
					if(uniqX[i]==response_data[j].short_code && uniqY[h]==response_data[j].time_digit ){
						selected=true;	
						invalid_number=invalid_number.concat(parseInt(response_data[j].data[0].invalid_number));
					}
				}
				 if(!selected){
					invalid_number=invalid_number.concat(parseInt(0));
					}
				 }
				 selected=false;
			
			sum_invalid_number=0;

			for (d in invalid_number){
				sum_invalid_number=sum_invalid_number+invalid_number[d];
			}
			rec_count++;
					rec_list += '<tr>';
						rec_list += '<td id="path_'+h+'">'+uniqX[i]+'</td>';
						rec_list += '<td>'+sum_invalid_number+'</td>';	
						rec_list += '<td><a title="View"  onclick="objfailureReport.showReport(\''+uniqX[i]+'\',\''+hits+'\')"><img src="images/view.png"></a></td>';	
					rec_list += '</tr>'; 
		}
		var list_table = '';
		list_table+='<table border="0" align="center" cellpadding="0" cellspacing="1" class="results_mini" id="mt" width="50%">';
		
		list_table+='<tr>';
			list_table+='<th width="35%">Access Code</th>';
			list_table += '<th width="60%" >Invalid Number</th>';
			list_table += '<th width="5%" ></th>';
		
		list_table += '</tr>';
			list_table += rec_list
		+ '</table>' 
		+ '<div id="pager" style="margin: auto;">';  
		
		objfailureReport.showResultTable(list_table,rec_count);

	}

	if(failureCountType=="user_blacklisted"){
		for(i in uniqX){
			var user_blacklisted=[];
			for (var h in uniqY){
				var selected=false;
				for (var j in response_data){
					if(uniqX[i]==response_data[j].short_code && uniqY[h]==response_data[j].time_digit ){
						selected=true;	
						user_blacklisted=user_blacklisted.concat(parseInt(response_data[j].data[0].user_blacklisted));
					}
				}
				 if(!selected){
					user_blacklisted=user_blacklisted.concat(parseInt(0));
					}
			 }
			selected=false;

			sum_user_blacklisted=0;

			for (d in user_blacklisted){
				sum_user_blacklisted=sum_user_blacklisted+user_blacklisted[d];
			}
			rec_count++;
					rec_list += '<tr>';
						rec_list += '<td id="path_'+h+'">'+uniqX[i]+'</td>';
						rec_list += '<td>'+sum_user_blacklisted+'</td>';	
						rec_list += '<td><a title="View"  onclick="objfailureReport.showReport(\''+uniqX[i]+'\',\''+hits+'\')"><img src="images/view.png"></a></td>';	
					rec_list += '</tr>'; 
		}
		var list_table = '';
		list_table+='<table border="0" align="center" cellpadding="0" cellspacing="1" class="results_mini" id="mt" width="50%">';
		
		list_table+='<tr>';
			list_table+='<th width="35%">Access Code</th>';
			list_table += '<th width="60%" >User Blacklisted</th>';
			list_table += '<th width="5%" ></th>';
		
		list_table += '</tr>';
			list_table += rec_list
		+ '</table>' 
		+ '<div id="pager" style="margin: auto;">';  
		
		objfailureReport.showResultTable(list_table,rec_count);

	}
	if(failureCountType=="internal_error"){
		for(i in uniqX){
			var internal_error=[];
			var internal_error_before_anm=[];
			var internal_error_after_anm=[];
			for (var h in uniqY){
				var selected=false;
				for (var j in response_data){
					if(uniqX[i]==response_data[j].short_code && uniqY[h]==response_data[j].time_digit ){
						selected=true;	
						internal_error=internal_error.concat(parseInt(response_data[j].data[0].internal_error));
						internal_error_before_anm=internal_error_before_anm.concat(parseInt(response_data[j].data[0].internal_error_before_anm));
						internal_error_after_anm=internal_error_after_anm.concat(parseInt(response_data[j].data[0].internal_error_after_anm));
					}
				}
				 if(!selected){
					internal_error=internal_error.concat(parseInt(0));
					internal_error_before_anm=internal_error_before_anm.concat(parseInt(0));
					internal_error_after_anm=internal_error_after_anm.concat(parseInt(0));

					}
				 }
				 selected=false;
			
			sum_internal_error=0;
			sum_internal_error_before_anm=0;
			sum_internal_error_after_anm=0;

			for (d in internal_error){
				sum_internal_error=sum_internal_error+parseInt(internal_error[d]);
				sum_internal_error_before_anm=sum_internal_error_before_anm+internal_error_before_anm[d];
				sum_internal_error_after_anm=sum_internal_error_after_anm+internal_error_after_anm[d];
			}
			rec_count++;
					rec_list += '<tr>';
						rec_list += '<td id="path_'+h+'">'+uniqX[i]+'</td>';
						rec_list += '<td>'+sum_internal_error+'</td>';
						rec_list += '<td>'+sum_internal_error_before_anm+'</td>';	
						rec_list += '<td>'+sum_internal_error_after_anm+'</td>';		
						rec_list += '<td><a title="View"  onclick="objfailureReport.showReport(\''+uniqX[i]+'\',\''+hits+'\')"><img src="images/view.png"></a></td>';	
					rec_list += '</tr>'; 
		}
		var list_table = '';
		list_table+='<table border="0" align="center" cellpadding="0" cellspacing="1" class="results_mini" id="mt" width="50%">';
		
		list_table+='<tr>';
			list_table+='<th width="20%">Access Code</th>';
			list_table += '<th width="25%" >Internal Error</th>';
			list_table += '<th width="25%" >Before Answer</th>';
			list_table += '<th width="25%" >After Answer</th>';
			list_table += '<th width="5%" ></th>';
		
		list_table += '</tr>';
			list_table += rec_list
		+ '</table>' 
		+ '<div id="pager" style="margin: auto;">';  
		
		objfailureReport.showResultTable(list_table,rec_count);

	}
	if(failureCountType=="app_parse_error_after_anm"){
		for(i in uniqX){
			var app_parse_error_after_anm=[];

			for (var h in uniqY){
				var selected=false;
				for (var j in response_data){
					if(uniqX[i]==response_data[j].short_code && uniqY[h]==response_data[j].time_digit ){
						selected=true;	
						app_parse_error_after_anm=app_parse_error_after_anm.concat(parseInt(response_data[j].data[0].app_parse_error_after_anm));
						
					}
				}
				 if(!selected){
					app_parse_error_after_anm=app_parse_error_after_anm.concat(parseInt(0));
					}
				 }
				 selected=false;
			
			sum_app_parse_error_after_anm=0;
			sum_app_parse_error_after_anm_before_anm=0;
			sum_app_parse_error_after_anm_after_anm=0;

			for (d in app_parse_error_after_anm){
				sum_app_parse_error_after_anm=sum_app_parse_error_after_anm+app_parse_error_after_anm[d];

			}
			rec_count++;
					rec_list += '<tr>';
						rec_list += '<td id="path_'+h+'">'+uniqX[i]+'</td>';
						rec_list += '<td>'+sum_app_parse_error_after_anm+'</td>';		
						rec_list += '<td><a title="View"  onclick="objfailureReport.showReport(\''+uniqX[i]+'\',\''+hits+'\')"><img src="images/view.png"></a></td>';	
					rec_list += '</tr>'; 
		}
		var list_table = '';
		list_table+='<table border="0" align="center" cellpadding="0" cellspacing="1" class="results_mini" id="mt" width="50%">';
		
		list_table+='<tr>';
			list_table+='<th width="30%">Access Code</th>';
			list_table += '<th width="65%" >Application Parse Error After Answer</th>';
			list_table += '<th width="5%" ></th>';
		
		list_table += '</tr>';
			list_table += rec_list
		+ '</table>' 
		+ '<div id="pager" style="margin: auto;">';  
		
		objfailureReport.showResultTable(list_table,rec_count);	

	}
	if(failureCountType=="app_error_after_anm"){
		for(i in uniqX){
			var app_error_after_anm=[];

			for (var h in uniqY){
				var selected=false;
				for (var j in response_data){
					if(uniqX[i]==response_data[j].short_code && uniqY[h]==response_data[j].time_digit ){
						selected=true;	
						app_error_after_anm=app_error_after_anm.concat(parseInt(response_data[j].data[0].app_error_after_anm));
						
					}
				}
				 if(!selected){
					app_error_after_anm=app_error_after_anm.concat(parseInt(0));
					}
				 }
				 selected=false;
			
			sum_app_error_after_anm=0;
			sum_app_error_after_anm_before_anm=0;
			sum_app_error_after_anm_after_anm=0;

			for (d in app_error_after_anm){
				sum_app_error_after_anm=sum_app_error_after_anm+app_error_after_anm[d];

			}
			rec_count++;
					rec_list += '<tr>';
						rec_list += '<td id="path_'+h+'">'+uniqX[i]+'</td>';
						rec_list += '<td>'+sum_app_error_after_anm+'</td>';		
						rec_list += '<td><a title="View"  onclick="objfailureReport.showReport(\''+uniqX[i]+'\',\''+hits+'\')"><img src="images/view.png"></a></td>';	
					rec_list += '</tr>'; 
		}
		var list_table = '';
		list_table+='<table border="0" align="center" cellpadding="0" cellspacing="1" class="results_mini" id="mt" width="50%">';
		
		list_table+='<tr>';
			list_table+='<th width="30%">Access Code</th>';
			list_table += '<th width="65%" >Application Error After Answer</th>';
			list_table += '<th width="5%" ></th>';
		
		list_table += '</tr>';
			list_table += rec_list
		+ '</table>' 
		+ '<div id="pager" style="margin: auto;">';  
		
		objfailureReport.showResultTable(list_table,rec_count);		

	}
	if(failureCountType=="app_timeout_after_anm"){
		for(i in uniqX){
			var app_timeout_after_anm=[];

			for (var h in uniqY){
				var selected=false;
				for (var j in response_data){
					if(uniqX[i]==response_data[j].short_code && uniqY[h]==response_data[j].time_digit ){
						selected=true;	
						app_timeout_after_anm=app_timeout_after_anm.concat(parseInt(response_data[j].data[0].app_timeout_after_anm));
						
					}
				}
				 if(!selected){
					app_timeout_after_anm=app_timeout_after_anm.concat(parseInt(0));
					}
				 }
				 selected=false;
			
			sum_app_timeout_after_anm=0;
			sum_app_timeout_after_anm_before_anm=0;
			sum_app_timeout_after_anm_after_anm=0;

			for (d in app_timeout_after_anm){
				sum_app_timeout_after_anm=sum_app_timeout_after_anm+app_timeout_after_anm[d];

			}
			rec_count++;
					rec_list += '<tr>';
						rec_list += '<td id="path_'+h+'">'+uniqX[i]+'</td>';
						rec_list += '<td>'+sum_app_timeout_after_anm+'</td>';		
						rec_list += '<td><a title="View"  onclick="objfailureReport.showReport(\''+uniqX[i]+'\',\''+hits+'\')"><img src="images/view.png"></a></td>';	
					rec_list += '</tr>'; 
		}
		var list_table = '';
		list_table+='<table border="0" align="center" cellpadding="0" cellspacing="1" class="results_mini" id="mt" width="50%">';
		
		list_table+='<tr>';
			list_table+='<th width="30%">Access Code</th>';
			list_table += '<th width="65%" >Application Timeout After Answer</th>';
			list_table += '<th width="5%" ></th>';
		
		list_table += '</tr>';
			list_table += rec_list
		+ '</table>' 
		+ '<div id="pager" style="margin: auto;">';  
		
		objfailureReport.showResultTable(list_table,rec_count);	

	}
	if(failureCountType=="app_not_found_after_anm"){
		for(i in uniqX){
			var app_not_found_after_anm=[];

			for (var h in uniqY){
				var selected=false;
				for (var j in response_data){
					if(uniqX[i]==response_data[j].short_code && uniqY[h]==response_data[j].time_digit ){
						selected=true;	
						app_not_found_after_anm=app_not_found_after_anm.concat(parseInt(response_data[j].data[0].app_not_found_after_anm));
						
					}
				}
				 if(!selected){
					app_not_found_after_anm=app_not_found_after_anm.concat(parseInt(0));
					}
				 }
				 selected=false;
			
			sum_app_not_found_after_anm=0;
			sum_app_not_found_after_anm_before_anm=0;
			sum_app_not_found_after_anm_after_anm=0;

			for (d in app_not_found_after_anm){
				sum_app_not_found_after_anm=sum_app_not_found_after_anm+app_not_found_after_anm[d];

			}
			rec_count++;
					rec_list += '<tr>';
						rec_list += '<td id="path_'+h+'">'+uniqX[i]+'</td>';
						rec_list += '<td>'+sum_app_not_found_after_anm+'</td>';		
						rec_list += '<td><a title="View"  onclick="objfailureReport.showReport(\''+uniqX[i]+'\',\''+hits+'\')"><img src="images/view.png"></a></td>';	
					rec_list += '</tr>'; 
		}
		var list_table = '';
		list_table+='<table border="0" align="center" cellpadding="0" cellspacing="1" class="results_mini" id="mt" width="50%">';
		
		list_table+='<tr>';
			list_table+='<th width="30%">Access Code</th>';
			list_table += '<th width="65%" >Application Not Found After Answer</th>';
			list_table += '<th width="5%" ></th>';
		
		list_table += '</tr>';
			list_table += rec_list
		+ '</table>' 
		+ '<div id="pager" style="margin: auto;">';  
		
		objfailureReport.showResultTable(list_table,rec_count);	

	}
	if(failureCountType=="internal_error_after_anm"){
		for(i in uniqX){
			var internal_error_after_anm=[];

			for (var h in uniqY){
				var selected=false;
				for (var j in response_data){
					if(uniqX[i]==response_data[j].short_code && uniqY[h]==response_data[j].time_digit ){
						selected=true;	
						internal_error_after_anm=internal_error_after_anm.concat(parseInt(response_data[j].data[0].internal_error_after_anm));
						
					}
				}
				 if(!selected){
					internal_error_after_anm=internal_error_after_anm.concat(parseInt(0));
					}
				 }
				 selected=false;
			
			sum_internal_error_after_anm=0;
			sum_internal_error_after_anm_before_anm=0;
			sum_internal_error_after_anm_after_anm=0;

			for (d in internal_error_after_anm){
				sum_internal_error_after_anm=sum_internal_error_after_anm+internal_error_after_anm[d];

			}
			rec_count++;
					rec_list += '<tr>';
						rec_list += '<td id="path_'+h+'">'+uniqX[i]+'</td>';
						rec_list += '<td>'+sum_internal_error_after_anm+'</td>';		
						rec_list += '<td><a title="View"  onclick="objfailureReport.showReport(\''+uniqX[i]+'\',\''+hits+'\')"><img src="images/view.png"></a></td>';	
					rec_list += '</tr>'; 
		}
		var list_table = '';
		list_table+='<table border="0" align="center" cellpadding="0" cellspacing="1" class="results_mini" id="mt" width="50%">';
		
		list_table+='<tr>';
			list_table+='<th width="30%">Access Code</th>';
			list_table += '<th width="65%" >Internal Error After Answer</th>';
			list_table += '<th width="5%" ></th>';
		
		list_table += '</tr>';
			list_table += rec_list
		+ '</table>' 
		+ '<div id="pager" style="margin: auto;">';  
		
		objfailureReport.showResultTable(list_table,rec_count);	

	}
	if(failureCountType=="app_parse_error_before_anm"){
		for(i in uniqX){
			var app_parse_error_before_anm=[];

			for (var h in uniqY){
				var selected=false;
				for (var j in response_data){
					if(uniqX[i]==response_data[j].short_code && uniqY[h]==response_data[j].time_digit ){
						selected=true;	
						app_parse_error_before_anm=app_parse_error_before_anm.concat(parseInt(response_data[j].data[0].app_parse_error_before_anm));
						
					}
				}
				 if(!selected){
					app_parse_error_before_anm=app_parse_error_before_anm.concat(parseInt(0));
					}
				 }
				 selected=false;
			
			sum_app_parse_error_before_anm=0;
			sum_app_parse_error_before_anm_before_anm=0;
			sum_app_parse_error_before_anm_before_anm=0;

			for (d in app_parse_error_before_anm){
				sum_app_parse_error_before_anm=sum_app_parse_error_before_anm+app_parse_error_before_anm[d];

			}
			rec_count++;
					rec_list += '<tr>';
						rec_list += '<td id="path_'+h+'">'+uniqX[i]+'</td>';
						rec_list += '<td>'+sum_app_parse_error_before_anm+'</td>';		
						rec_list += '<td><a title="View"  onclick="objfailureReport.showReport(\''+uniqX[i]+'\',\''+hits+'\')"><img src="images/view.png"></a></td>';	
					rec_list += '</tr>'; 
		}
		var list_table = '';
		list_table+='<table border="0" align="center" cellpadding="0" cellspacing="1" class="results_mini" id="mt" width="50%">';
		
		list_table+='<tr>';
			list_table+='<th width="30%">Access Code</th>';
			list_table += '<th width="65%" >Application Parse Error Before Answer</th>';
			list_table += '<th width="5%" ></th>';
		
		list_table += '</tr>';
			list_table += rec_list
		+ '</table>' 
		+ '<div id="pager" style="margin: auto;">';  
		
		objfailureReport.showResultTable(list_table,rec_count);	

	}
	if(failureCountType=="app_error_before_anm"){
		for(i in uniqX){
			var app_error_before_anm=[];

			for (var h in uniqY){
				var selected=false;
				for (var j in response_data){
					if(uniqX[i]==response_data[j].short_code && uniqY[h]==response_data[j].time_digit ){
						selected=true;	
						app_error_before_anm=app_error_before_anm.concat(parseInt(response_data[j].data[0].app_error_before_anm));
						
					}
				}
				 if(!selected){
					app_error_before_anm=app_error_before_anm.concat(parseInt(0));
					}
				 }
				 selected=false;
			
			sum_app_error_before_anm=0;
			sum_app_error_before_anm_before_anm=0;
			sum_app_error_before_anm_before_anm=0;

			for (d in app_error_before_anm){
				sum_app_error_before_anm=sum_app_error_before_anm+app_error_before_anm[d];

			}
			rec_count++;
					rec_list += '<tr>';
						rec_list += '<td id="path_'+h+'">'+uniqX[i]+'</td>';
						rec_list += '<td>'+sum_app_error_before_anm+'</td>';		
						rec_list += '<td><a title="View"  onclick="objfailureReport.showReport(\''+uniqX[i]+'\',\''+hits+'\')"><img src="images/view.png"></a></td>';	
					rec_list += '</tr>'; 
		}
		var list_table = '';
		list_table+='<table border="0" align="center" cellpadding="0" cellspacing="1" class="results_mini" id="mt" width="50%">';
		
		list_table+='<tr>';
			list_table+='<th width="30%">Access Code</th>';
			list_table += '<th width="65%" >Application Error Before Answer</th>';
			list_table += '<th width="5%" ></th>';
		
		list_table += '</tr>';
			list_table += rec_list
		+ '</table>' 
		+ '<div id="pager" style="margin: auto;">';  
		
		objfailureReport.showResultTable(list_table,rec_count);		

	}
	if(failureCountType=="app_timeout_before_anm"){
		for(i in uniqX){
			var app_timeout_before_anm=[];

			for (var h in uniqY){
				var selected=false;
				for (var j in response_data){
					if(uniqX[i]==response_data[j].short_code && uniqY[h]==response_data[j].time_digit ){
						selected=true;	
						app_timeout_before_anm=app_timeout_before_anm.concat(parseInt(response_data[j].data[0].app_timeout_before_anm));
						
					}
				}
				 if(!selected){
					app_timeout_before_anm=app_timeout_before_anm.concat(parseInt(0));
					}
				 }
				 selected=false;
			
			sum_app_timeout_before_anm=0;
			sum_app_timeout_before_anm_before_anm=0;
			sum_app_timeout_before_anm_before_anm=0;

			for (d in app_timeout_before_anm){
				sum_app_timeout_before_anm=sum_app_timeout_before_anm+app_timeout_before_anm[d];

			}
			rec_count++;
					rec_list += '<tr>';
						rec_list += '<td id="path_'+h+'">'+uniqX[i]+'</td>';
						rec_list += '<td>'+sum_app_timeout_before_anm+'</td>';		
						rec_list += '<td><a title="View"  onclick="objfailureReport.showReport(\''+uniqX[i]+'\',\''+hits+'\')"><img src="images/view.png"></a></td>';	
					rec_list += '</tr>'; 
		}
		var list_table = '';
		list_table+='<table border="0" align="center" cellpadding="0" cellspacing="1" class="results_mini" id="mt" width="50%">';
		
		list_table+='<tr>';
			list_table+='<th width="30%">Access Code</th>';
			list_table += '<th width="65%" >Application Timeout Before Answer</th>';
			list_table += '<th width="5%" ></th>';
		
		list_table += '</tr>';
			list_table += rec_list
		+ '</table>' 
		+ '<div id="pager" style="margin: auto;">';  
		
		objfailureReport.showResultTable(list_table,rec_count);	

	}
	if(failureCountType=="app_not_found_before_anm"){
		for(i in uniqX){
			var app_not_found_before_anm=[];

			for (var h in uniqY){
				var selected=false;
				for (var j in response_data){
					if(uniqX[i]==response_data[j].short_code && uniqY[h]==response_data[j].time_digit ){
						selected=true;	
						app_not_found_before_anm=app_not_found_before_anm.concat(parseInt(response_data[j].data[0].app_not_found_before_anm));
						
					}
				}
				 if(!selected){
					app_not_found_before_anm=app_not_found_before_anm.concat(parseInt(0));
					}
				 }
				 selected=false;
			
			sum_app_not_found_before_anm=0;
			sum_app_not_found_before_anm_before_anm=0;
			sum_app_not_found_before_anm_before_anm=0;

			for (d in app_not_found_before_anm){
				sum_app_not_found_before_anm=sum_app_not_found_before_anm+app_not_found_before_anm[d];

			}
			rec_count++;
					rec_list += '<tr>';
						rec_list += '<td id="path_'+h+'">'+uniqX[i]+'</td>';
						rec_list += '<td>'+sum_app_not_found_before_anm+'</td>';		
						rec_list += '<td><a title="View"  onclick="objfailureReport.showReport(\''+uniqX[i]+'\',\''+hits+'\')"><img src="images/view.png"></a></td>';	
					rec_list += '</tr>'; 
		}
		var list_table = '';
		list_table+='<table border="0" align="center" cellpadding="0" cellspacing="1" class="results_mini" id="mt" width="50%">';
		
		list_table+='<tr>';
			list_table+='<th width="30%">Access Code</th>';
			list_table += '<th width="65%" >Application Not Found Before Answer</th>';
			list_table += '<th width="5%" ></th>';
		
		list_table += '</tr>';
			list_table += rec_list
		+ '</table>' 
		+ '<div id="pager" style="margin: auto;">';  
		
		objfailureReport.showResultTable(list_table,rec_count);	

	}
	if(failureCountType=="internal_error_before_anm"){
		for(i in uniqX){
			var internal_error_before_anm=[];

			for (var h in uniqY){
				var selected=false;
				for (var j in response_data){
					if(uniqX[i]==response_data[j].short_code && uniqY[h]==response_data[j].time_digit ){
						selected=true;	
						internal_error_before_anm=internal_error_before_anm.concat(parseInt(response_data[j].data[0].internal_error_before_anm));
						
					}
				}
				 if(!selected){
					internal_error_before_anm=internal_error_before_anm.concat(parseInt(0));
					}
				 }
				 selected=false;
		
			sum_internal_error_before_anm=0;
			sum_internal_error_before_anm_before_anm=0;
			sum_internal_error_before_anm_before_anm=0;

			for (d in internal_error_before_anm){
				sum_internal_error_before_anm=sum_internal_error_before_anm+internal_error_before_anm[d];

			}
			rec_count++;
					rec_list += '<tr>';
						rec_list += '<td id="path_'+h+'">'+uniqX[i]+'</td>';
						rec_list += '<td>'+sum_internal_error_before_anm+'</td>';		
						rec_list += '<td><a title="View"  onclick="objfailureReport.showReport(\''+uniqX[i]+'\',\''+hits+'\')"><img src="images/view.png"></a></td>';	
					rec_list += '</tr>'; 
		}
		var list_table = '';
		list_table+='<table border="0" align="center" cellpadding="0" cellspacing="1" class="results_mini" id="mt" width="50%">';
		
		list_table+='<tr>';
			list_table+='<th width="30%">Access Code</th>';
			list_table += '<th width="65%" >Internal Error Before Answer</th>';
			list_table += '<th width="5%" ></th>';
		
		list_table += '</tr>';
			list_table += rec_list
		+ '</table>' 
		+ '<div id="pager" style="margin: auto;">';  
		
		objfailureReport.showResultTable(list_table,rec_count);	

	}

}

failureReport.prototype.showFildes = function() {
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

failureReport.prototype.showfailureLocation = function() {
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

failureReport.prototype.hidefailureLocation = function() {
	$('#failure_location').empty();
	$('#failure_location').append($("<option></option>").attr("value","").text("Select"));
	$('#failure_location-tr').hide();
}

failureReport.prototype.showfailureFildes = function() {

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
		if($("#failure_type").val()=="network_failures"){
			var type=config.network_failures;
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

failureReport.prototype.calculateDate= function() {
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



failureReport.prototype.getYaxis= function() {
	var start_date=$("#start_date").val();
	var type=$("#type").val();
	var yAxis=[];
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

failureReport.prototype.createCsv = function() {
	failuers=objfailureReport.getFailureCountType();
	if(failuers=="total_failures"){		
		csvMessage="";
		csvMessage+=objfailureReport.getTimeLabel()+",Access Code,Total Failures,System Failures,Application Failures,User Failures,Network Failures\n"

		for (i in response_data){
			csvMessage+=response_data[i].time_digit.substring(response_data[i].time_digit.length-2)+',';
			csvMessage+=response_data[i].short_code+',';
			csvMessage+=response_data[i].data[0].total_failures+',';
			csvMessage+=response_data[i].data[0].system_failures+',';
			csvMessage+=response_data[i].data[0].application_failures+',';
			csvMessage+=response_data[i].data[0].user_failures+',';
			csvMessage+=response_data[i].data[0].network_failures+',\n';
		}
			return csvMessage;

	}
	if(failuers=="system_failures"){
		csvMessage="";
		csvMessage+=objfailureReport.getTimeLabel()+",Access Code,System Failures,Codec Mismatch,Internal Error, Invalid Number, Security failure, Not Acceptable, Bad Request\n";
		for (i in response_data){
			csvMessage+=response_data[i].time_digit.substring(response_data[i].time_digit.length-2)+',';
			csvMessage+=response_data[i].short_code+',';
			csvMessage+=response_data[i].data[0].system_failures+',';
			csvMessage+=response_data[i].data[0].codec_mismatch+',';
			csvMessage+=response_data[i].data[0].internal_error+',';
			csvMessage+=response_data[i].data[0].invalid_number+',';
			csvMessage+=response_data[i].data[0].security_failure+',';
			csvMessage+=response_data[i].data[0].not_acceptable+',';
			csvMessage+=response_data[i].data[0].bad_request+',\n';
		}
			return csvMessage;
	}
	if(failuers=="user_failures"){
		csvMessage="";
		csvMessage+=objfailureReport.getTimeLabel()+",Access Code, User Failures, User Busy, User Blacklisted,User Cancel, No Answer\n";
		for (i in response_data){
			csvMessage+=response_data[i].time_digit.substring(response_data[i].time_digit.length-2)+',';
			csvMessage+=response_data[i].short_code+',';
			csvMessage+=response_data[i].data[0].user_failures+',';
			csvMessage+=response_data[i].data[0].user_busy+',';
			csvMessage+=response_data[i].data[0].user_blacklisted+',';
			csvMessage+=response_data[i].data[0].user_cancel+',';
			csvMessage+=response_data[i].data[0].no_answer+',\n';
		}
			return csvMessage;
	
	}
	if(failuers=="application_failures"){
		csvMessage="";

		csvMessage+=objfailureReport.getTimeLabel()+",Access Code,Application Failures,Application Not Found,Application Timeout,Application Error,Application Parse Error\n";
		for (i in response_data){
			csvMessage+=response_data[i].time_digit.substring(response_data[i].time_digit.length-2)+',';
			csvMessage+=response_data[i].short_code+',';
			csvMessage+=response_data[i].data[0].application_failures+',';
			csvMessage+=response_data[i].data[0].app_not_found+',';
			csvMessage+=response_data[i].data[0].app_timeout+',';
			csvMessage+=response_data[i].data[0].app_error+',';
			csvMessage+=response_data[i].data[0].app_parse_error+',\n';
		}
			return csvMessage;
	}
	if(failuers=="network_failures"){
		csvMessage="";
		csvMessage+=objfailureReport.getTimeLabel()+",Access Code, Network Failures, Call Redirect, Network Error,\n";
		for (i in response_data){
			csvMessage+=response_data[i].time_digit.substring(response_data[i].time_digit.length-2)+',';
			csvMessage+=response_data[i].short_code+',';
			csvMessage+=response_data[i].data[0].network_failures+',';
			csvMessage+=response_data[i].data[0].call_redirect+',';
			csvMessage+=response_data[i].data[0].network_error+',\n';
		}
			return csvMessage;
	
	}

	if(failuers=="codec_mismatch"){
		csvMessage="";
		csvMessage+=objfailureReport.getTimeLabel()+",Access Code,Codec Mismatch\n";
		for (i in response_data){
			csvMessage+=response_data[i].time_digit.substring(response_data[i].time_digit.length-2)+',';
			csvMessage+=response_data[i].short_code+',';
			csvMessage+=response_data[i].data[0].codec_mismatch+',\n';
		}
			return csvMessage;
	}
	if(failuers=="user_busy"){
		csvMessage="";
		csvMessage+=objfailureReport.getTimeLabel()+",Access Code,User Busy\n";
		for (i in response_data){
			csvMessage+=response_data[i].time_digit.substring(response_data[i].time_digit.length-2)+',';
			csvMessage+=response_data[i].short_code+',';
			csvMessage+=response_data[i].data[0].user_busy+',\n';
		}
			return csvMessage;
		
	}
	if(failuers=="internal_error"){
		csvMessage="";
		csvMessage+=objfailureReport.getTimeLabel()+",Access Code,Internal Error,Internal Error Before Answer,Internal Error After Answer\n";
		for (i in response_data){
			csvMessage+=response_data[i].time_digit.substring(response_data[i].time_digit.length-2)+',';
			csvMessage+=response_data[i].short_code+',';
			csvMessage+=response_data[i].data[0].internal_error+',';
			csvMessage+=response_data[i].data[0].internal_error_before_anm+',';
			csvMessage+=response_data[i].data[0].internal_error_after_anm+',\n';
		}
			return csvMessage;
		
	}
	if(failuers=="user_blacklisted"){
		csvMessage="";
		csvMessage+=objfailureReport.getTimeLabel()+",Access Code,User Blacklisted\n";
		for (i in response_data){
			csvMessage+=response_data[i].time_digit.substring(response_data[i].time_digit.length-2)+',';
			csvMessage+=response_data[i].short_code+',';
			csvMessage+=response_data[i].data[0].user_blacklisted+',\n';
		}
			return csvMessage;
	}
	if(failuers=="user_cancel"){
		csvMessage="";
		csvMessage+=objfailureReport.getTimeLabel()+",Access Code,User Cancel\n";
		for (i in response_data){
			csvMessage+=response_data[i].time_digit.substring(response_data[i].time_digit.length-2)+',';
			csvMessage+=response_data[i].short_code+',';
			csvMessage+=response_data[i].data[0].user_cancel+',\n';
		}
			return csvMessage;		
	}


	if(failuers=="no_answer"){
		csvMessage="";
		csvMessage+=objfailureReport.getTimeLabel()+",Access Code,No Answer\n";
		for (i in response_data){
			csvMessage+=response_data[i].time_digit.substring(response_data[i].time_digit.length-2)+',';
			csvMessage+=response_data[i].short_code+',';
			csvMessage+=response_data[i].data[0].no_answer+',\n';
		}
			return csvMessage;		
	}
	if(failuers=="call_redirect"){
		csvMessage="";
		csvMessage+=objfailureReport.getTimeLabel()+",Access Code,Call Redirect\n";
		for (i in response_data){
			csvMessage+=response_data[i].time_digit.substring(response_data[i].time_digit.length-2)+',';
			csvMessage+=response_data[i].short_code+',';
			csvMessage+=response_data[i].data[0].call_redirect+',\n';
		}
			return csvMessage;	
	}
	if(failuers=="network_error"){
		csvMessage="";
		csvMessage+=objfailureReport.getTimeLabel()+",Access Code,Network Error\n";
		for (i in response_data){
			csvMessage+=response_data[i].time_digit.substring(response_data[i].time_digit.length-2)+',';
			csvMessage+=response_data[i].short_code+',';
			csvMessage+=response_data[i].data[0].network_error+',\n';
		}
			return csvMessage;	
	}
	if(failuers=="invalid_number"){
		csvMessage="";
		csvMessage+=objfailureReport.getTimeLabel()+",Access Code,Invalid Number\n";
		for (i in response_data){
			csvMessage+=response_data[i].time_digit.substring(response_data[i].time_digit.length-2)+',';
			csvMessage+=response_data[i].short_code+',';
			csvMessage+=response_data[i].data[0].invalid_number+',\n';
		}
			return csvMessage;	
	}
	if(failuers=="security_failure"){
		csvMessage="";
		csvMessage+=objfailureReport.getTimeLabel()+",Access Code,Security Failure\n";
		for (i in response_data){
			csvMessage+=response_data[i].time_digit.substring(response_data[i].time_digit.length-2)+',';
			csvMessage+=response_data[i].short_code+',';
			csvMessage+=response_data[i].data[0].security_failure+',\n';
		}
			return csvMessage;	
	}
	if(failuers=="not_acceptable"){
		csvMessage="";
		csvMessage+=objfailureReport.getTimeLabel()+",Access Code,Not Acceptable\n";
		for (i in response_data){
			csvMessage+=response_data[i].time_digit.substring(response_data[i].time_digit.length-2)+',';
			csvMessage+=response_data[i].short_code+',';
			csvMessage+=response_data[i].data[0].not_acceptable+',\n';
		}
			return csvMessage;		
	}
	if(failuers=="bad_request"){
		csvMessage="";
		csvMessage+=objfailureReport.getTimeLabel()+",Access Code,Bad Request\n";
		for (i in response_data){
			csvMessage+=response_data[i].time_digit.substring(response_data[i].time_digit.length-2)+',';
			csvMessage+=response_data[i].short_code+',';
			csvMessage+=response_data[i].data[0].bad_request+',\n';
		}
			return csvMessage;	
	}
	if(failuers=="app_not_found"){
		csvMessage="";
		csvMessage+=objfailureReport.getTimeLabel()+",Access Code,Application Not Found,Application Not Found Before Answer,Application Not Found After Answer\n";
		for (i in response_data){
			csvMessage+=response_data[i].time_digit.substring(response_data[i].time_digit.length-2)+',';
			csvMessage+=response_data[i].short_code+',';
			csvMessage+=response_data[i].data[0].app_not_found+',';
			csvMessage+=response_data[i].data[0].app_not_found_before_anm+',';
			csvMessage+=response_data[i].data[0].app_not_found_after_anm+',\n';
		}

			return csvMessage;		
	}
	
	if(failuers=="app_timeout"){
		csvMessage="";
		csvMessage+=objfailureReport.getTimeLabel()+",Access Code,Application Timeout,Application Timeout Before Answer,Application Timeout After Answer\n";
		for (i in response_data){
			csvMessage+=response_data[i].time_digit.substring(response_data[i].time_digit.length-2)+',';
			csvMessage+=response_data[i].short_code+',';
			csvMessage+=response_data[i].data[0].app_timeout+',';
			csvMessage+=response_data[i].data[0].app_not_found_before_anm+',';
			csvMessage+=response_data[i].data[0].app_timeout_after_anm+',\n';
		}

			return csvMessage;		
	}
	
	if(failuers=="app_error"){
		csvMessage="";
		csvMessage+=objfailureReport.getTimeLabel()+",Access Code,Application Error,Application Error Before Answer,Application Error After Answer\n";
		for (i in response_data){
			csvMessage+=response_data[i].time_digit.substring(response_data[i].time_digit.length-2)+',';
			csvMessage+=response_data[i].short_code+',';
			csvMessage+=response_data[i].data[0].app_error+',';
			csvMessage+=response_data[i].data[0].app_error_before_anm+',';
			csvMessage+=response_data[i].data[0].app_error_after_anm+',\n';
		}

			return csvMessage;		
	}
	
	if(failuers=="app_parse_error"){
		csvMessage="";
		csvMessage+=objfailureReport.getTimeLabel()+",Access Code,Application Parse Error,Application Parse Error Before Answer,Application Parse Error After Answer\n";
		for (i in response_data){
			csvMessage+=response_data[i].time_digit.substring(response_data[i].time_digit.length-2)+',';
			csvMessage+=response_data[i].short_code+',';
			csvMessage+=response_data[i].data[0].app_parse_error+',';
			csvMessage+=response_data[i].data[0].app_parse_error_before_anm+',';
			csvMessage+=response_data[i].data[0].app_parse_error_after_anm+',\n';
		}

			return csvMessage;		
	}
	
	if(failuers=="internal_error_before_anm"){
		csvMessage="";
		csvMessage+=objfailureReport.getTimeLabel()+",Access Code,Application Error Before Answer\n";
		for (i in response_data){
			csvMessage+=response_data[i].time_digit.substring(response_data[i].time_digit.length-2)+',';
			csvMessage+=response_data[i].short_code+',';
			csvMessage+=response_data[i].data[0].internal_error_before_anm+',\n';
		}

			return csvMessage;		
	}

	if(failuers=="internal_error_after_anm"){
		csvMessage="";
		csvMessage+=objfailureReport.getTimeLabel()+",Access Code,Application Error After Answer\n";
		for (i in response_data){
			csvMessage+=response_data[i].time_digit.substring(response_data[i].time_digit.length-2)+',';
			csvMessage+=response_data[i].short_code+',';
			csvMessage+=response_data[i].data[0].internal_error_after_anm+',\n';
		}

			return csvMessage;		
	}

	if(failuers=="app_not_found_before_anm"){
		csvMessage="";
		csvMessage+=objfailureReport.getTimeLabel()+",Access Code,Application Not Found Before Answer\n";
		for (i in response_data){
			csvMessage+=response_data[i].time_digit.substring(response_data[i].time_digit.length-2)+',';
			csvMessage+=response_data[i].short_code+',';
			csvMessage+=response_data[i].data[0].app_not_found_before_anm+',\n';
		}

			return csvMessage;		
	}

	if(failuers=="app_not_found_after_anm"){
		csvMessage="";
		csvMessage+=objfailureReport.getTimeLabel()+",Access Code,Application Not Found After Answer\n";
		for (i in response_data){
			csvMessage+=response_data[i].time_digit.substring(response_data[i].time_digit.length-2)+',';
			csvMessage+=response_data[i].short_code+',';
			csvMessage+=response_data[i].data[0].app_not_found_after_anm+',\n';
		}

			return csvMessage;		
	}
	
	if(failuers=="app_timeout_before_anm"){
		csvMessage="";
		csvMessage+=objfailureReport.getTimeLabel()+",Access Code,Application Timeout Before Answer\n";
		for (i in response_data){
			csvMessage+=response_data[i].time_digit.substring(response_data[i].time_digit.length-2)+',';
			csvMessage+=response_data[i].short_code+',';
			csvMessage+=response_data[i].data[0].app_timeout_before_anm+',\n';
		}

			return csvMessage;		
	}

	if(failuers=="app_timeout_after_anm"){
		csvMessage="";
		csvMessage+=objfailureReport.getTimeLabel()+",Access Code,Application Timeout After Answer\n";
		for (i in response_data){
			csvMessage+=response_data[i].time_digit.substring(response_data[i].time_digit.length-2)+',';
			csvMessage+=response_data[i].short_code+',';
			csvMessage+=response_data[i].data[0].app_timeout_after_anm+',\n';
		}

			return csvMessage;		
	}

	if(failuers=="app_error_before_anm"){
		csvMessage="";
		
		csvMessage+=objfailureReport.getTimeLabel()+",Access Code,Application Error Before Answer\n";
		for (i in response_data){
			csvMessage+=response_data[i].time_digit.substring(response_data[i].time_digit.length-2)+',';
			csvMessage+=response_data[i].short_code+',';
			csvMessage+=response_data[i].data[0].app_error_before_anm+',\n';
		}

			return csvMessage;		
	}
	
	if(failuers=="app_error_after_anm"){
		csvMessage="";
		
		csvMessage+=objfailureReport.getTimeLabel()+",Access Code,Application Error After Answer\n";
		for (i in response_data){
			csvMessage+=response_data[i].time_digit.substring(response_data[i].time_digit.length-2)+',';
			csvMessage+=response_data[i].short_code+',';
			csvMessage+=response_data[i].data[0].app_error_after_anm+',\n';
		}

			return csvMessage;		
	}
	
	if(failuers=="app_parse_error_before_anm"){
		csvMessage="";
		
		csvMessage+=objfailureReport.getTimeLabel()+",Access Code,Application Parse Error Before Answer\n";
		for (i in response_data){
			csvMessage+=response_data[i].time_digit.substring(response_data[i].time_digit.length-2)+',';
			csvMessage+=response_data[i].short_code+',';
			csvMessage+=response_data[i].data[0].app_parse_error_before_anm+',\n';
		}

			return csvMessage;		
	}
	
	if(failuers=="app_parse_error_after_anm"){
		csvMessage="";
		csvMessage+=objfailureReport.getTimeLabel()+",Access Code,Application Parse Error After Answer\n";
		for (i in response_data){
			csvMessage+=response_data[i].time_digit.substring(response_data[i].time_digit.length-2)+',';
			csvMessage+=response_data[i].short_code+',';
			csvMessage+=response_data[i].data[0].app_parse_error_after_anm+',\n';
		}

			return csvMessage;		
	}

}

failureReport.prototype.csvExport = function() {
	var name=new Date().toString()+".csv";
	csvMessage=objfailureReport.createCsv();
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
	$('#failure_reason').empty();
	$('#failure_reason').append($("<option></option>").attr("value","").text("Select"));
	$('#failure_location').empty();
	$('#failure_location').append($("<option></option>").attr("value","").text("Select"));
	$('#failure_location-tr').hide();
	$("#graphs_badfill").hide();
	$("#tables_badfill").hide();
	$("#result_badfill").hide();

	// $('#frm_hits_counter').validationEngine({
		// 'custom_error_messages' : {

		// }
	// });

	$('#type').change(function()
	{
		objfailureReport.showFildes();		
	});

	$('#failure_type').change(function()
	{
		objfailureReport.showfailureFildes();
		objfailureReport.hidefailureLocation();
	});
	$('#failure_reason').change(function()
	{
		objfailureReport.showfailureLocation();
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
		objfailureReport.search();
		return false;
		
	});

	$('#graph').click(function()
	{
		if(!$("#frm_hits_counter").validationEngine('validate')) {
			return false;
		}
		$("#graphs_badfill").show();
		$("#tables_badfill").hide();
		objfailureReport.search();
		return false;
	});

	$('#csv').click(function()
	{
		if(!$("#frm_hits_counter").validationEngine('validate')) {
			return false;
		}
		if(objfailureReport.search()){
			objfailureReport.csvExport();
		}
		return false;
	});

	objfailureReport.getStartYear();
	objfailureReport.getStartMonth();
	$('#start_year-tr').hide();
	$('#start_month-tr').hide();
});
var objfailureReport = new failureReport();

