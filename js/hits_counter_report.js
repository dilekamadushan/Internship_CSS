//Handle IVR Reports

var YAWS_PATH = config.yaws_file_path + 'hits_counter_report.yaws';
var response_data;

function hitCounterReport() {
}


hitCounterReport.prototype.getStartYear = function(currentValue) {
	
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


hitCounterReport.prototype.getStartMonth = function(currentValue) {
	
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


hitCounterReport.prototype.getTimeLabel = function() {

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


hitCounterReport.prototype.showResultTable = function(list_table,rec_count) {
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

hitCounterReport.prototype.showDetailResultTable = function(list_tables,rec_counts) {
jQuery('#dialogTables').html(list_tables);
	// $('#reportPager').smartpaginator({ 
	// 	totalrecords: rec_counts,
	// 	recordsperpage: 10,//config.rec_per_page, 
	// 	datacontainer: 'reports_tb', 
	// 	dataelement: 'tr',
	// 	theme: 'custom',
	// 	initval:0,
	// 	onchange: this.onPageChange
	// });	

	var theDialog = $("#dialog").dialog({
	    autoOpen: false,
	    resizable: true,
	    modal: true,
	    width: 'auto',
	    resize: 'auto'
     });

	theDialog.html($("#dialogTables")).dialog( "open" );
}


hitCounterReport.prototype.getHitTypes = function() {
	if($("#category").val()!=""){
		if($("#call_type").val()!=""){
			if($("#category").val()=="inbound"){
				if($("#call_type").val()=="audio"){
					 hits="inbound_audio_hits";
				}
				if($("#call_type").val()=="video"){
					 hits="inbound_video_hits";
				}
				if($("#call_type").val()=="both"){
					 hits="inbound_av_hits";
				}
			}
			if($("#category").val()=="outbound"){
				if($("#call_type").val()=="audio"){
					 hits="outbound_audio_hits";
				}
				if($("#call_type").val()=="video"){
					 hits="outbound_video_hits";
				}
				if($("#call_type").val()=="both"){
					 hits="outbound_av_hits";
				}
			}
		}else{

			if($("#category").val()=="inbound"){
				 hits="inbound_hits";
			}
			if($("#category").val()=="outbound"){
				 hits="outbound_hits";
			}
		}
	}
	else{
		if($("#call_type").val()=="audio"){
			 hits="audio_hits";
		}
		if($("#call_type").val()=="video"){
			 hits="video_hits";
		}
		if($("#call_type").val()=="both"){
			 hits="av_hits";
		}
		if($("#call_type").val()==""){
			 hits="total_hits";
		}
	}

	return hits;
}

hitCounterReport.prototype.getMonths = function() {
	selection = document.getElementById('months');
	for (i=1;i <=config.months_limit;i++){
		selection.options[selection.options.length] = new Option(i, i);
	}
}
hitCounterReport.prototype.getHours = function() {
	selection = document.getElementById('hours');
	for (i=1;i <=config.hours_limit;i++){
		selection.options[selection.options.length] = new Option(i, i);
	}
}
hitCounterReport.prototype.getDays = function() {
	selection = document.getElementById('days');
	for (i=1;i <=config.days_limit;i++){
		selection.options[selection.options.length] = new Option(i, i);
	}
}

hitCounterReport.prototype.getYears = function() {
	selection = document.getElementById('years');
	for (i=1;i <=config.years_limit;i++){
		selection.options[selection.options.length] = new Option(i, i);
	}
}

hitCounterReport.prototype.search = function() {
	var fromDate=objHitsCounter.calculateDate()[0];	
	var toDate=objHitsCounter.calculateDate()[1];	
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
	var searching_category="success_report";
	var request_data="hits";
	var static_data=',"log_type":"'+log_type+'","searching_category":"'+searching_category+'","request_data":"'+request_data+'"';
	var searchData;
	if($("#call_type").val()!="" && $("#category").val()==""){
		searchData="shortcode:"+$("#access_code").val()+"#call_category:#call_type:"+$("#call_type").val();
	}
	else
	{
		searchData="shortcode:"+$("#access_code").val()+"#call_category:"+$("#category").val()+"#call_type:"+$("#call_type").val();
	}
	var request_data = '{"action":"GET_REPORT_DATA","from_date":"'+fromTS+'","to_date":"'+toTS+'","type":"'+type+'","search_data":"'+searchData+'","graph_type":"'+graph_type+'"'+static_data+'}';
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
		//alert(JSON.stringify(response_data));
		objHitsCounter.showTable(response_data);
		objHitsCounter.drawGraph(response_data);
		return true;
		}
		

		//obj_common.resetForm($('#frm_hits_counter'));

	//}
}

hitCounterReport.prototype.showFildes = function() {
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

hitCounterReport.prototype.calculateDate= function() {
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

hitCounterReport.prototype.getYaxis= function() {
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


hitCounterReport.prototype.drawGraph = function(response_data) {


	var x=[];
	for (i in response_data){
			x=x.concat(response_data[i].short_code);
	}
	// alert(x);
	var uniqX = [];
	$.each(x, function(i, el){
	    if($.inArray(el, uniqX) === -1) 
	    	uniqX.push(el);
	});
	uniqY=objHitsCounter.getYaxis();
	var seriesData=[];
	var hits;

	if($("#graph_type").val()=="access_code"){
		for(i in uniqY){
			var values=[];
			for (var h in uniqX){
				var selected=false;
				for (var j in response_data){
					if(uniqY[i]==response_data[j].time_digit && response_data[j].short_code== uniqX[h]){
						//alert(uniqY[i]+"-->"+uniqX[h]+"-->"+JSON.stringify(seriesData));
						selected=true;
						hits=objHitsCounter.getHitTypes();
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
						//alert(uniqY[i]+"-->"+uniqX[h]+"-->"+JSON.stringify(seriesData));
						selected=true;
						hits=objHitsCounter.getHitTypes();
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
						//alert(uniqY[i]+"-->"+uniqX[h]+"-->"+JSON.stringify(seriesData));
						selected=true;
						hits=objHitsCounter.getHitTypes();
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
						//alert(uniqY[i]+"-->"+uniqX[h]+"-->"+JSON.stringify(seriesData));
						selected=true;
						hits=objHitsCounter.getHitTypes();
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
		            text: 'Hits Counter Report'
		        },
		        subtitle: {
		            text: $("#start_date").val()
		        },
		        xAxis: {
		            categories:uniqX,
		           //  title: {
	            //     text: tableTime
	            // }
		        },
		         yAxis: {
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
	            text: 'Hits Counter Report'
	        },
	        subtitle: {
	            text: $("#start_date").val()
	        },
	        xAxis: {
	            categories:uniqX,
	            title: {
	                text: ''
	            }
	        },
	        yAxis: {
	            min: 0,
	            title: {
	                text: 'Hits Count'
	            }
	        },
			
	        tooltip: {
	            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
	            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
	                '<td style="padding:0"><b>{point.y} hits</b></td></tr>',
	            footerFormat: '</table>',
	            useHTML: false
	        },
	        plotOptions: {
	            column: {
	            	dataLabels: {
                                enabled: false
                            },
	                pointPadding: 0,
	                borderWidth: 0

	            }
	        },
	        series: seriesData
	    });
	});

	}

}
hitCounterReport.prototype.showCallType = function() {

	if($('#category').val()==""){
		$("#call_type-tr").hide();
		$("#call_type").val("");
	}
	else{
		//$("#call_type-tr").show();
	}
}

hitCounterReport.prototype.showReport = function(short_code,hits) {
 	var uniqY = objHitsCounter.getYaxis();
	var select = true;
	if(hits=="audio_hits"){
		var rec_counts=0;
		var rec_lists='';
		for (a in uniqY){
			for (i in response_data){		
				if(response_data[i].short_code==short_code && response_data[i].time_digit == uniqY[a]){
						rec_counts++;
						rec_lists+='<tr>';
							rec_lists+='<td>'+response_data[i].time_digit.substring(response_data[i].time_digit.length-2)+'</td>';
							rec_lists+='<td>'+response_data[i].data[0].audio_hits+'</td>';
							rec_lists+='<td>'+response_data[i].data[0].inbound_audio_hits+'</td>';
							rec_lists+='<td>'+response_data[i].data[0].outbound_audio_hits+'</td>';
						rec_lists+='</tr>';
						select = false;
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
			select = true;
		}				
		list_tables ='';
		list_tables += '<center>Access Code: '+short_code+'</center><table border="0" align="center" cellpadding="0" cellspacing="1" class="results_mini" id="reports_tb" >';
		list_tables += '<tr>';
				list_tables += '<th width="5%">'+objHitsCounter.getTimeLabel()+'</th>';
				list_tables += '<th width="15.83%" >Audio Hits </th>';
				list_tables += '<th width="15.83%" >Inbound Audio Hits</th>';
				list_tables += '<th width="15.83%" >Outbound Audio Hits</th>';
		list_tables += '</tr>';
		list_tables += rec_lists
		+ '</table>' 
		+ '<div id="reportPager" style="margin: auto;">'; 
		
		objHitsCounter.showDetailResultTable(list_tables,rec_counts);

	} 
	if(hits=="video_hits"){
		var rec_counts=0;
		var rec_lists='';
		for (a in uniqY){
			for (i in response_data){		
				if(response_data[i].short_code==short_code && response_data[i].time_digit == uniqY[a]){
					rec_counts++;
					rec_lists+='<tr>';
						rec_lists+='<td>'+response_data[i].time_digit.substring(response_data[i].time_digit.length-2)+'</td>';
						rec_lists+='<td>'+response_data[i].data[0].video_hits+'</td>';
						rec_lists+='<td>'+response_data[i].data[0].inbound_video_hits+'</td>';
						rec_lists+='<td>'+response_data[i].data[0].outbound_video_hits+'</td>';
					rec_lists+='</tr>';
					select = false;
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
			select = true;
		}
			list_tables ='';
			list_tables += '<center>Access Code: '+short_code+'</center><table border="0" align="center" cellpadding="0" cellspacing="1" class="results_mini" id="reports_tb" >';
			list_tables += '<tr>';
					list_tables += '<th width="5%">'+objHitsCounter.getTimeLabel()+'</th>';
					list_tables += '<th width="15.83%" >Video Hits </th>';
					list_tables += '<th width="15.83%" >Inbound Video Hits</th>';
					list_tables += '<th width="15.83%" >Outbound Video Hits</th>';
			list_tables += '</tr>';
			list_tables += rec_lists
		+ '</table>' 
		+ '<div id="reportPager" style="margin: auto;">';
		
		objHitsCounter.showDetailResultTable(list_tables,rec_counts);
	}
	if(hits=="av_hits"){
		var rec_counts=0;
		var rec_lists='';
		for (a in uniqY){
			for (i in response_data){		
				if(response_data[i].short_code==short_code && response_data[i].time_digit == uniqY[a]){
					rec_counts++;
					rec_lists+='<tr>';
						rec_lists+='<td>'+response_data[i].time_digit.substring(response_data[i].time_digit.length-2)+'</td>';
						rec_lists+='<td>'+response_data[i].data[0].av_hits+'</td>';
						rec_lists+='<td>'+response_data[i].data[0].inbound_av_hits+'</td>';
						rec_lists+='<td>'+response_data[i].data[0].outbound_av_hits+'</td>';
					rec_lists+='</tr>';
					select = false;
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
			select = true;
		}
			list_tables ='';
			list_tables += '<center>Access Code: '+short_code+'</center><table border="0" align="center" cellpadding="0" cellspacing="1" class="results_mini" id="reports_tb" >';
			list_tables += '<tr>';
					list_tables += '<th width="5%">'+objHitsCounter.getTimeLabel()+'</th>';
					list_tables += '<th width="15.83%" >Audio/Video Hits </th>';
					list_tables += '<th width="15.83%" >Inbound Audio/Video Hits</th>';
					list_tables += '<th width="15.83%" >Outbound Audio/Video Hits</th>';
			list_tables += '</tr>';
			list_tables += rec_lists
		+ '</table>' 
		+ '<div id="reportPager" style="margin: auto;">'; 
		
		objHitsCounter.showDetailResultTable(list_tables,rec_counts);
	}
	if(hits=="total_hits"){
		var rec_counts=0;
		var rec_lists='';
		for (a in uniqY){
			for (i in response_data){		
				if(response_data[i].short_code==short_code && response_data[i].time_digit == uniqY[a]){
					rec_counts++;
					rec_lists+='<tr>';
						rec_lists+='<td>'+response_data[i].time_digit.substring(response_data[i].time_digit.length-2)+'</td>';
						rec_lists+='<td>'+response_data[i].data[0].total_hits+'</td>';
						rec_lists+='<td>'+response_data[i].data[0].inbound_hits+'</td>';
						rec_lists+='<td>'+response_data[i].data[0].outbound_hits+'</td>';
						rec_lists+='<td>'+response_data[i].data[0].video_hits+'</td>';
						rec_lists+='<td>'+response_data[i].data[0].audio_hits+'</td>';
						rec_lists+='<td>'+response_data[i].data[0].av_hits+'</td>';
					rec_lists+='</tr>';
					select = false;
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
				rec_lists+='</tr>';			
			}
			select = true;
		}	
			list_tables ='';
			list_tables += '<center>Access Code: '+short_code+'</center><table border="0" align="center" cellpadding="0" cellspacing="1" class="results_mini" id="reports_tb" >';
			list_tables += '<tr>';
					list_tables += '<th width="5%">'+objHitsCounter.getTimeLabel()+'</th>';
					list_tables += '<th width="15.83%" >Total Hits</th>';
					list_tables += '<th width="15.83%" >Inbound Hits</th>';
					list_tables += '<th width="15.83%" >Outbound Hits</th>';
					list_tables += '<th width="15.83%" >Video Hits</th>';
					list_tables += '<th width="15.83%" >Audio Hits</th>';
					list_tables += '<th width="15.83%" >Audio/Video Hits</th>';
			list_tables += '</tr>';
			list_tables += rec_lists
		+ '</table>' 
		+ '<div id="reportPager" style="margin: auto;">'; 
		
		objHitsCounter.showDetailResultTable(list_tables,rec_counts);
	}
	if(hits=="inbound_hits"){
		var rec_counts=0;
		var rec_lists='';
		for (a in uniqY){
			for (i in response_data){		
				if(response_data[i].short_code==short_code && response_data[i].time_digit == uniqY[a]){
					rec_counts++;
					rec_lists+='<tr>';
						rec_lists+='<td>'+response_data[i].time_digit.substring(response_data[i].time_digit.length-2)+'</td>';
						rec_lists+='<td>'+response_data[i].data[0].inbound_hits+'</td>';
						rec_lists+='<td>'+response_data[i].data[0].inbound_video_hits+'</td>';
						rec_lists+='<td>'+response_data[i].data[0].inbound_audio_hits+'</td>';
						rec_lists+='<td>'+response_data[i].data[0].inbound_av_hits+'</td>';
					rec_lists+='</tr>';
					select = false;
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
				rec_lists+='</tr>';			
			}
			select = true;
		}
		list_tables ='';
		list_tables += '<center>Access Code: '+short_code+'</center><table border="0" align="center" cellpadding="0" cellspacing="1" class="results_mini" id="reports_tb" >';
		list_tables += '<tr>';
				list_tables += '<th width="5%">'+objHitsCounter.getTimeLabel()+'</th>';
				list_tables += '<th width="23.75%" >Inbound Hits</th>';
				list_tables += '<th width="23.75%" >Inbound Video Hits</th>';
				list_tables += '<th width="23.75%" >Inbound Audio Hits</th>';
				list_tables += '<th width="23.75%" >Inbound Audio/Video Hits</th>';
		list_tables += '</tr>';
		list_tables += rec_lists
	+ '</table>' 
	+ '<div id="reportPager" style="margin: auto;">';
	
	objHitsCounter.showDetailResultTable(list_tables,rec_counts);

	}
	if(hits=="outbound_hits"){
		var rec_counts=0;
		var rec_lists='';
		for (a in uniqY){
			for (i in response_data){		
				if(response_data[i].short_code==short_code && response_data[i].time_digit == uniqY[a]){
					rec_counts++;
					rec_lists+='<tr>';
						rec_lists+='<td>'+response_data[i].time_digit.substring(response_data[i].time_digit.length-2)+'</td>';
						rec_lists+='<td>'+response_data[i].data[0].outbound_hits+'</td>';
						rec_lists+='<td>'+response_data[i].data[0].outbound_video_hits+'</td>';
						rec_lists+='<td>'+response_data[i].data[0].outbound_audio_hits+'</td>';
						rec_lists+='<td>'+response_data[i].data[0].outbound_av_hits+'</td>';
					rec_lists+='</tr>';
					select = false;
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
				rec_lists+='</tr>';			
			}
			select = true;
		}
		list_tables ='';
		list_tables += '<center>Access Code: '+short_code+'</center><table border="0" align="center" cellpadding="0" cellspacing="1" class="results_mini" id="reports_tb" >';
		list_tables += '<tr>';
				list_tables += '<th width="5%">'+objHitsCounter.getTimeLabel()+'</th>';
				list_tables += '<th width="23.75%" >Outbound Hits</th>';
				list_tables += '<th width="23.75%" >Outbound Video Hits</th>';
				list_tables += '<th width="23.75%" >Outbound Audio Hits</th>';
				list_tables += '<th width="23.75%" >Outbound Audio/Video Hits</th>';
		list_tables += '</tr>';
		list_tables += rec_lists
		+ '</table>' 
		+ '<div id="reportPager" style="margin: auto;">';
		
		objHitsCounter.showDetailResultTable(list_tables,rec_counts);
	}
	if(hits=="inbound_audio_hits"){
		var rec_counts=0;
		var rec_lists='';
		for (a in uniqY){
			for (i in response_data){		
				if(response_data[i].short_code==short_code && response_data[i].time_digit == uniqY[a]){
					rec_counts++;
					rec_lists+='<tr>';
						rec_lists+='<td>'+response_data[i].time_digit.substring(response_data[i].time_digit.length-2)+'</td>';
						rec_lists+='<td>'+response_data[i].data[0].inbound_audio_hits+'</td>';
					rec_lists+='</tr>';
					select = false;
				}
			}
			if(select){
				rec_counts++;
				rec_lists+='<tr>';
					rec_lists+='<td>'+uniqY[a].substring(uniqY[a].length-2)+'</td>';
					rec_lists+='<td>0</td>';
				rec_lists+='</tr>';			
			}
			select = true;
		}
			list_tables ='';
			list_tables += '<center>Access Code: '+short_code+'</center><table border="0" align="center" cellpadding="0" cellspacing="1" class="results_mini" id="reports_tb" >';
			list_tables += '<tr>';
					list_tables += '<th width="50%">'+objHitsCounter.getTimeLabel()+'</th>';
					list_tables += '<th width="50%" >Inbound Audio Hits</th>';
			list_tables += '</tr>';
			list_tables += rec_lists
		+ '</table>' 
		+ '<div id="reportPager" style="margin: auto;">';  
		objHitsCounter.showDetailResultTable(list_tables,rec_counts);
	}	
	if(hits=="outbound_audio_hits"){
		var rec_counts=0;
		var rec_lists='';
		for (a in uniqY){
			for (i in response_data){		
				if(response_data[i].short_code==short_code && response_data[i].time_digit == uniqY[a]){
					rec_counts++;
					rec_lists+='<tr>';
						rec_lists+='<td>'+response_data[i].time_digit.substring(response_data[i].time_digit.length-2)+'</td>';
						rec_lists+='<td>'+response_data[i].data[0].outbound_audio_hits+'</td>';
					rec_lists+='</tr>';
					select = false;
				}
			}
			if(select){
				rec_counts++;
				rec_lists+='<tr>';
					rec_lists+='<td>'+uniqY[a].substring(uniqY[a].length-2)+'</td>';
					rec_lists+='<td>0</td>';
				rec_lists+='</tr>';			
			}
			select = true;
		}
			list_tables ='';
			list_tables += '<center>Access Code: '+short_code+'</center><table border="0" align="center" cellpadding="0" cellspacing="1" class="results_mini" id="reports_tb" >';
			list_tables += '<tr>';
					list_tables += '<th width="50%">'+objHitsCounter.getTimeLabel()+'</th>';
					list_tables += '<th width="50%" >Inbound Audio Hits</th>';
			list_tables += '</tr>';
			list_tables += rec_lists
		+ '</table>' 
		+ '<div id="reportPager" style="margin: auto;">';  
		objHitsCounter.showDetailResultTable(list_tables,rec_counts);
	}	
	if(hits=="inbound_video_hits"){
		var rec_counts=0;
		var rec_lists='';
		for (a in uniqY){
			for (i in response_data){		
				if(response_data[i].short_code==short_code && response_data[i].time_digit == uniqY[a]){
					rec_counts++;
					rec_lists+='<tr>';
						rec_lists+='<td>'+response_data[i].time_digit.substring(response_data[i].time_digit.length-2)+'</td>';
						rec_lists+='<td>'+response_data[i].data[0].inbound_video_hits+'</td>';
					rec_lists+='</tr>';
					select = false;
				}
			}
			if(select){
				rec_counts++;
				rec_lists+='<tr>';
					rec_lists+='<td>'+uniqY[a].substring(uniqY[a].length-2)+'</td>';
					rec_lists+='<td>0</td>';
				rec_lists+='</tr>';			
			}
			select = true;
		}
			list_tables ='';
			list_tables += '<center>Access Code: '+short_code+'</center><table border="0" align="center" cellpadding="0" cellspacing="1" class="results_mini" id="reports_tb" >';
			list_tables += '<tr>';
					list_tables += '<th width="50%">'+objHitsCounter.getTimeLabel()+'</th>';
					list_tables += '<th width="50%" >Inbound Video Hits</th>';
			list_tables += '</tr>';
			list_tables += rec_lists
		+ '</table>' 
		+ '<div id="reportPager" style="margin: auto;">';  
		objHitsCounter.showDetailResultTable(list_tables,rec_counts);
	}	
	if(hits=="outbound_video_hits"){
		var rec_counts=0;
		var rec_lists='';
		for (a in uniqY){
			for (i in response_data){		
				if(response_data[i].short_code==short_code && response_data[i].time_digit == uniqY[a]){
					rec_counts++;
					rec_lists+='<tr>';
						rec_lists+='<td>'+response_data[i].time_digit.substring(response_data[i].time_digit.length-2)+'</td>';
						rec_lists+='<td>'+response_data[i].data[0].outbound_video_hits+'</td>';
					rec_lists+='</tr>';
					select = false;
				}
			}
			if(select){
				rec_counts++;
				rec_lists+='<tr>';
					rec_lists+='<td>'+uniqY[a].substring(uniqY[a].length-2)+'</td>';
					rec_lists+='<td>0</td>';
				rec_lists+='</tr>';			
			}
			select = true;
		}
			list_tables ='';
			list_tables += '<center>Access Code: '+short_code+'</center><table border="0" align="center" cellpadding="0" cellspacing="1" class="results_mini" id="reports_tb" >';
			list_tables += '<tr>';
					list_tables += '<th width="50%">'+objHitsCounter.getTimeLabel()+'</th>';
					list_tables += '<th width="50%" >Inbound Video Hits</th>';
			list_tables += '</tr>';
			list_tables += rec_lists
		+ '</table>' 
		+ '<div id="reportPager" style="margin: auto;">';  
	objHitsCounter.showDetailResultTable(list_tables,rec_counts);

	}


	if(hits=="inbound_av_hits"){
		var rec_counts=0;
		var rec_lists='';
		for (a in uniqY){
			for (i in response_data){		
				if(response_data[i].short_code==short_code && response_data[i].time_digit == uniqY[a]){
					rec_counts++;
					rec_lists+='<tr>';
						rec_lists+='<td>'+response_data[i].time_digit.substring(response_data[i].time_digit.length-2)+'</td>';
						rec_lists+='<td>'+response_data[i].data[0].inbound_av_hits+'</td>';
					rec_lists+='</tr>';
					select = false;
				}
			}
			if(select){
				rec_counts++;
				rec_lists+='<tr>';
					rec_lists+='<td>'+uniqY[a].substring(uniqY[a].length-2)+'</td>';
					rec_lists+='<td>0</td>';
				rec_lists+='</tr>';			
			}
			select = true;
		}
			list_tables ='';
			list_tables += '<center>Access Code: '+short_code+'</center><table border="0" align="center" cellpadding="0" cellspacing="1" class="results_mini" id="reports_tb" >';
			list_tables += '<tr>';
					list_tables += '<th width="50%">'+objHitsCounter.getTimeLabel()+'</th>';
					list_tables += '<th width="50%" >Inbound Audio/Video Hits</th>';
			list_tables += '</tr>';
			list_tables += rec_lists
		+ '</table>' 
		+ '<div id="reportPager" style="margin: auto;">';  
	objHitsCounter.showDetailResultTable(list_tables,rec_counts);
	}	

	if(hits=="outbound_av_hits"){
		var rec_counts=0;
		var rec_lists='';
		for (a in uniqY){
			for (i in response_data){		
				if(response_data[i].short_code==short_code && response_data[i].time_digit == uniqY[a]){
					rec_lists+='<tr>';
						rec_lists+='<td>'+response_data[i].time_digit.substring(response_data[i].time_digit.length-2)+'</td>';
						rec_lists+='<td>'+response_data[i].data[0].outbound_av_hits+'</td>';
					rec_lists+='</tr>';
					select = false;
				}
			}
			if(select){
				rec_lists+='<tr>';
					rec_lists+='<td>'+uniqY[a].substring(uniqY[a].length-2)+'</td>';
					rec_lists+='<td>0</td>';
				rec_lists+='</tr>';			
			}
			select = true;
		}
			list_tables ='';
			list_tables += '<center>Access Code: '+short_code+'</center><table border="0" align="center" cellpadding="0" cellspacing="1" class="results_mini" id="reports_tb" >';
			list_tables += '<tr>';
					list_tables += '<th width="50%">'+objHitsCounter.getTimeLabel()+'</th>';
					list_tables += '<th width="50%" >Inbound Audio/Video Hits</th>';
			list_tables += '</tr>';
			list_tables += rec_lists
		+ '</table>' 
		+ '<div id="reportPager" style="margin: auto;">';  
	objHitsCounter.showDetailResultTable(list_tables,rec_counts);
	}
}

hitCounterReport.prototype.showTable = function(response_data) {
	$("#tables").html("");
	var rec_count=0;
	var rec_list='';
	var x=[];
	for (i in response_data){
			x=x.concat(response_data[i].short_code);
	}
	// alert(x);
	var uniqX = [];
	$.each(x, function(i, el){
	    if($.inArray(el, uniqX) === -1) 
	    	uniqX.push(el);
	});
	uniqY=objHitsCounter.getYaxis();


	hits=objHitsCounter.getHitTypes();
	if(hits=="total_hits"){	
		for(i in uniqX){
			var total_hits=[];
			var inbound_hits=[];
			var outbound_hits=[];
			var video_hits=[];
			var audio_hits=[];
			var av_hits=[];
			for (var h in uniqY){
				var selected=false;
				for (var j in response_data){
					if(uniqX[i]==response_data[j].short_code && uniqY[h]==response_data[j].time_digit ){
						//alert(uniqY[i]+"-->"+uniqX[h]+"-->"+JSON.stringify(seriesData));
						selected=true;
						total_hits=total_hits.concat(parseInt(response_data[j].data[0].total_hits));
						inbound_hits=inbound_hits.concat(parseInt(response_data[j].data[0].inbound_hits));
						outbound_hits=outbound_hits.concat(parseInt(response_data[j].data[0].outbound_hits));
						video_hits=video_hits.concat(parseInt(response_data[j].data[0].video_hits));
						audio_hits=audio_hits.concat(parseInt(response_data[j].data[0].audio_hits));
						av_hits=av_hits.concat(parseInt(response_data[j].data[0].av_hits));
						
					}
				}
				 if(!selected){
					total_hits=total_hits.concat(parseInt(0));
					inbound_hits=inbound_hits.concat(parseInt(0));
					outbound_hits=outbound_hits.concat(parseInt(0));
					video_hits=video_hits.concat(parseInt(0));
					audio_hits=audio_hits.concat(parseInt(0));
					av_hits=av_hits.concat(parseInt(0));
				 }
				 selected=false;
			}
			sum_total_hits=0;
			sum_inbound_hits=0;
			sum_outbound_hits=0;
			sum_video_hits=0;
			sum_audio_hits=0;
			sum_av_hits=0;
			for (d in total_hits){
				sum_total_hits=sum_total_hits+total_hits[d];
				sum_inbound_hits=sum_inbound_hits+inbound_hits[d];
				sum_outbound_hits=sum_outbound_hits+outbound_hits[d];
				sum_video_hits=sum_video_hits+video_hits[d];
				sum_audio_hits=sum_audio_hits+audio_hits[d];
				sum_av_hits=sum_av_hits+av_hits[d];
			}
			
		rec_count++;
			rec_list += '<tr>';
				rec_list += '<td id="short_code_'+uniqX[i]+'">'+uniqX[i]+'</td>';
				rec_list += '<td>'+sum_total_hits+'</td>';	
				rec_list += '<td>'+sum_inbound_hits+'</td>';	
				rec_list += '<td>'+sum_outbound_hits+'</td>';	
				rec_list += '<td>'+sum_video_hits+'</td>';	
				rec_list += '<td>'+sum_audio_hits+'</td>';
				rec_list += '<td>'+sum_av_hits+'</td>';	
				rec_list += '<td><a title="View"  onclick="objHitsCounter.showReport(\''+uniqX[i]+'\',\''+hits+'\')"><img src="images/view.png"></a></td>';
			rec_list += '</tr>'; 
		}
		 var list_table = ''	
		+ '<table border="0" align="center" cellpadding="0" cellspacing="1" class="results_mini" id="mt" width="50%">';
			list_table += '<tr>';
					list_table += '<th width="20%">Access Code</th>';
					list_table += '<th width="12.5%" >Total Hits</th>';
					list_table += '<th width="12.5%" >Inbound Hits</th>';
					list_table += '<th width="12.5%" >Outbound Hits</th>';
					list_table += '<th width="12.5%" >Video Hits</th>';
					list_table += '<th width="12.5%" >Audio Hits</th>';
					list_table += '<th width="12.5%" >Audio/Video Hits</th>';
					list_table += '<th width="5%" ></th>';
			list_table += '</tr>';
			list_table += rec_list
		+ '</table>' 
		+ '<div id="pager" style="margin: auto;">';  

	objHitsCounter.showResultTable(list_table,rec_count);

	}
	//////////////////////////////////////////////////////////////////////
	if(hits=="audio_hits"){	
		for(i in uniqX){
			var audio_hits=[];
			var inbound_audio_hits=[];
			var outbound_audio_hits=[];
			for (var h in uniqY){
				var selected=false;
				for (var j in response_data){
					if(uniqX[i]==response_data[j].short_code && uniqY[h]==response_data[j].time_digit ){
						//alert(uniqY[i]+"-->"+uniqX[h]+"-->"+JSON.stringify(seriesData));
						selected=true;
						audio_hits=audio_hits.concat(parseInt(response_data[j].data[0].audio_hits));
						inbound_audio_hits=inbound_audio_hits.concat(parseInt(response_data[j].data[0].inbound_audio_hits));
						outbound_audio_hits=outbound_audio_hits.concat(parseInt(response_data[j].data[0].outbound_audio_hits));						
					}
				}
				 if(!selected){
					audio_hits=audio_hits.concat(parseInt(0));
					inbound_audio_hits=inbound_audio_hits.concat(parseInt(0));
					outbound_audio_hits=outbound_audio_hits.concat(parseInt(0));
				 }
				 selected=false;
			}
			sum_audio_hits=0;
			sum_inbound_audio_hits=0;
			sum_outbound_audio_hits=0;

			for (d in audio_hits){
				sum_audio_hits=sum_audio_hits+audio_hits[d];
				sum_inbound_audio_hits=sum_inbound_audio_hits+inbound_audio_hits[d];
				sum_outbound_audio_hits=sum_outbound_audio_hits+outbound_audio_hits[d];
			}
			
		rec_count++;
			rec_list += '<tr>';
				rec_list += '<td id="short_code_'+uniqX[i]+'">'+uniqX[i]+'</td>';
				rec_list += '<td>'+sum_audio_hits+'</td>';	
				rec_list += '<td>'+sum_inbound_audio_hits+'</td>';	
				rec_list += '<td>'+sum_outbound_audio_hits+'</td>';	

				rec_list += '<td><a title="View"  onclick="objHitsCounter.showReport(\''+uniqX[i]+'\',\''+hits+'\')"><img src="images/view.png"></a></td>';
			rec_list += '</tr>'; 
		}
		 var list_table = ''	
		+ '<table border="0" align="center" cellpadding="0" cellspacing="1" class="results_mini" id="mt" width="50%">';
			list_table += '<tr>';
					list_table += '<th width="20%">Access Code</th>';
					list_table += '<th width="12.5%" >Audio Hits</th>';
					list_table += '<th width="12.5%" >Inbound Audio Hits</th>';
					list_table += '<th width="12.5%" >Outbound Audio Hits</th>';
					list_table += '<th width="5%" ></th>';
			list_table += '</tr>';
			list_table += rec_list
		+ '</table>' 
		+ '<div id="pager" style="margin: auto;">';  

	objHitsCounter.showResultTable(list_table,rec_count);

	}

	/////////////////////////////////////////////////////////////////////
	//////////////////////////////////////////////////////////////////////
	if(hits=="video_hits"){	
		for(i in uniqX){
			var video_hits=[];
			var inbound_video_hits=[];
			var outbound_video_hits=[];
			for (var h in uniqY){
				var selected=false;
				for (var j in response_data){
					if(uniqX[i]==response_data[j].short_code && uniqY[h]==response_data[j].time_digit ){
						//alert(uniqY[i]+"-->"+uniqX[h]+"-->"+JSON.stringify(seriesData));
						selected=true;
						video_hits=video_hits.concat(parseInt(response_data[j].data[0].video_hits));
						inbound_video_hits=inbound_video_hits.concat(parseInt(response_data[j].data[0].inbound_video_hits));
						outbound_video_hits=outbound_video_hits.concat(parseInt(response_data[j].data[0].outbound_video_hits));						
					}
				}
				 if(!selected){
					video_hits=video_hits.concat(parseInt(0));
					inbound_video_hits=inbound_video_hits.concat(parseInt(0));
					outbound_video_hits=outbound_video_hits.concat(parseInt(0));
				 }
				 selected=false;
			}
			sum_video_hits=0;
			sum_inbound_video_hits=0;
			sum_outbound_video_hits=0;

			for (d in video_hits){
				sum_video_hits=sum_video_hits+video_hits[d];
				sum_inbound_video_hits=sum_inbound_video_hits+inbound_video_hits[d];
				sum_outbound_video_hits=sum_outbound_video_hits+outbound_video_hits[d];
			}
			
		rec_count++;
			rec_list += '<tr>';
				rec_list += '<td id="short_code_'+uniqX[i]+'">'+uniqX[i]+'</td>';
				rec_list += '<td>'+sum_video_hits+'</td>';	
				rec_list += '<td>'+sum_inbound_video_hits+'</td>';	
				rec_list += '<td>'+sum_outbound_video_hits+'</td>';	

				rec_list += '<td><a title="View"  onclick="objHitsCounter.showReport(\''+uniqX[i]+'\',\''+hits+'\')"><img src="images/view.png"></a></td>';
			rec_list += '</tr>'; 
		}
		 var list_table = ''	
		+ '<table border="0" align="center" cellpadding="0" cellspacing="1" class="results_mini" id="mt" width="50%">';
			list_table += '<tr>';
					list_table += '<th width="20%">Access Code</th>';
					list_table += '<th width="12.5%" >Video Hits</th>';
					list_table += '<th width="12.5%" >Inbound Video Hits</th>';
					list_table += '<th width="12.5%" >Outbound Video Hits</th>';
					list_table += '<th width="5%" ></th>';
			list_table += '</tr>';
			list_table += rec_list
		+ '</table>' 
		+ '<div id="pager" style="margin: auto;">';  

	objHitsCounter.showResultTable(list_table,rec_count);

	}

	/////////////////////////////////////////////////////////////////////
	if(hits=="av_hits"){	
		for(i in uniqX){
			var av_hits=[];
			var inbound_av_hits=[];
			var outbound_av_hits=[];
			for (var h in uniqY){
				var selected=false;
				for (var j in response_data){
					if(uniqX[i]==response_data[j].short_code && uniqY[h]==response_data[j].time_digit ){
						//alert(uniqY[i]+"-->"+uniqX[h]+"-->"+JSON.stringify(seriesData));
						selected=true;
						av_hits=av_hits.concat(parseInt(response_data[j].data[0].av_hits));
						inbound_av_hits=inbound_av_hits.concat(parseInt(response_data[j].data[0].inbound_av_hits));
						outbound_av_hits=outbound_av_hits.concat(parseInt(response_data[j].data[0].outbound_av_hits));						
					}
				}
				 if(!selected){
					av_hits=av_hits.concat(parseInt(0));
					inbound_av_hits=inbound_av_hits.concat(parseInt(0));
					outbound_av_hits=outbound_av_hits.concat(parseInt(0));
				 }
				 selected=false;
			}
			sum_av_hits=0;
			sum_inbound_av_hits=0;
			sum_outbound_av_hits=0;

			for (d in av_hits){
				sum_av_hits=sum_av_hits+av_hits[d];
				sum_inbound_av_hits=sum_inbound_av_hits+inbound_av_hits[d];
				sum_outbound_av_hits=sum_outbound_av_hits+outbound_av_hits[d];
			}
			
		rec_count++;
			rec_list += '<tr>';
				rec_list += '<td id="short_code_'+uniqX[i]+'">'+uniqX[i]+'</td>';
				rec_list += '<td>'+sum_av_hits+'</td>';	
				rec_list += '<td>'+sum_inbound_av_hits+'</td>';	
				rec_list += '<td>'+sum_outbound_av_hits+'</td>';	

				rec_list += '<td><a title="View"  onclick="objHitsCounter.showReport(\''+uniqX[i]+'\',\''+hits+'\')"><img src="images/view.png"></a></td>';
			rec_list += '</tr>'; 
		}
		 var list_table = ''	
		+ '<table border="0" align="center" cellpadding="0" cellspacing="1" class="results_mini" id="mt" width="50%">';
			list_table += '<tr>';
					list_table += '<th width="20%">Access Code</th>';
					list_table += '<th width="12.5%" >Audio/Video Hits</th>';
					list_table += '<th width="12.5%" >Inbound Audio/Video Hits</th>';
					list_table += '<th width="12.5%" >Outbound Audio/Video Hits</th>';
					list_table += '<th width="5%" ></th>';
			list_table += '</tr>';
			list_table += rec_list
		+ '</table>' 
		+ '<div id="pager" style="margin: auto;">';  

	objHitsCounter.showResultTable(list_table,rec_count);

	}

	/////////////////////////////////////////////////////////////////////

	if(hits=="inbound_hits"){	
		for(i in uniqX){
			var inbound_hits=[];
			var inbound_video_hits=[];
			var inbound_audio_hits=[];
			var inbound_av_hits=[];

			for (var h in uniqY){
				var selected=false;
				for (var j in response_data){
					if(uniqX[i]==response_data[j].short_code && uniqY[h]==response_data[j].time_digit ){
						//alert(uniqY[i]+"-->"+uniqX[h]+"-->"+JSON.stringify(seriesData));
						selected=true;
						inbound_hits=inbound_hits.concat(parseInt(response_data[j].data[0].inbound_hits));
						inbound_video_hits=inbound_video_hits.concat(parseInt(response_data[j].data[0].inbound_video_hits));
						inbound_audio_hits=inbound_audio_hits.concat(parseInt(response_data[j].data[0].inbound_audio_hits));
						inbound_av_hits=inbound_av_hits.concat(parseInt(response_data[j].data[0].inbound_av_hits));	
					}
				}
				 if(!selected){
				 	inbound_hits=inbound_hits.concat(parseInt(0));
					inbound_video_hits=inbound_video_hits.concat(parseInt(0));
					inbound_audio_hits=inbound_audio_hits.concat(parseInt(0));
					inbound_av_hits=inbound_av_hits.concat(parseInt(0));
				 }
				 selected=false;
			}
			sum_inbound_hits=0;
			sum_inbound_video_hits=0;
			sum_inbound_audio_hits=0;
			sum_inbound_av_hits=0;
			for (d in inbound_hits){
				sum_inbound_hits=sum_inbound_hits+inbound_hits[d];
				sum_inbound_video_hits=sum_inbound_video_hits+inbound_video_hits[d];
				sum_inbound_audio_hits=sum_inbound_audio_hits+inbound_audio_hits[d];
				sum_inbound_av_hits=sum_inbound_av_hits+inbound_av_hits[d];
			}
			
		rec_count++;
			rec_list += '<tr>';
				rec_list += '<td id="short_code_'+uniqX[i]+'">'+uniqX[i]+'</td>';
				rec_list += '<td>'+sum_inbound_hits+'</td>';	
				rec_list += '<td>'+sum_inbound_video_hits+'</td>';	
				rec_list += '<td>'+sum_inbound_audio_hits+'</td>';	
				rec_list += '<td>'+sum_inbound_av_hits+'</td>';	
				rec_list += '<td><a title="View"  onclick="objHitsCounter.showReport(\''+uniqX[i]+'\',\''+hits+'\')"><img src="images/view.png"></a></td>';
			rec_list += '</tr>'; 
		}
		 var list_table = ''	
		+ '<table border="0" align="center" cellpadding="0" cellspacing="1" class="results_mini" id="mt" width="50%">';
			list_table += '<tr>';
					list_table += '<th width="30%">Access Code</th>';
					list_table += '<th width="16.25%" >Inbound Hits</th>';
					list_table += '<th width="16.25%" >Inbound Video Hits</th>';
					list_table += '<th width="16.25%" >Inbound Audio Hits</th>';
					list_table += '<th width="16.25%" >Inbound Audio/Video Hits</th>';
					list_table += '<th width="5%" ></th>';
			list_table += '</tr>';
			list_table += rec_list
		+ '</table>' 
		+ '<div id="pager" style="margin: auto;">';  
	
	objHitsCounter.showResultTable(list_table,rec_count);

	}

	if(hits=="outbound_hits"){	
		for(i in uniqX){
			var outbound_hits=[];
			var outbound_video_hits=[];
			var outbound_audio_hits=[];
			var outbound_av_hits=[];

			for (var h in uniqY){
				var selected=false;
				for (var j in response_data){
					if(uniqX[i]==response_data[j].short_code && uniqY[h]==response_data[j].time_digit ){
						//alert(uniqY[i]+"-->"+uniqX[h]+"-->"+JSON.stringify(seriesData));
						selected=true;
						outbound_hits=outbound_hits.concat(parseInt(response_data[j].data[0].outbound_hits));
						outbound_video_hits=outbound_video_hits.concat(parseInt(response_data[j].data[0].outbound_video_hits));
						outbound_audio_hits=outbound_audio_hits.concat(parseInt(response_data[j].data[0].outbound_audio_hits));
						outbound_av_hits=outbound_av_hits.concat(parseInt(response_data[j].data[0].outbound_av_hits));	
					}
				}
				 if(!selected){
				 	outbound_hits=outbound_hits.concat(parseInt(0));
					outbound_video_hits=outbound_video_hits.concat(parseInt(0));
					outbound_audio_hits=outbound_audio_hits.concat(parseInt(0));
					outbound_av_hits=outbound_av_hits.concat(parseInt(0));
				 }
				 selected=false;
			}
			sum_outbound_hits=0;
			sum_outbound_video_hits=0;
			sum_outbound_audio_hits=0;
			sum_outbound_av_hits=0;
			for (d in outbound_hits){
				sum_outbound_hits=sum_outbound_hits+outbound_hits[d];
				sum_outbound_video_hits=sum_outbound_video_hits+outbound_video_hits[d];
				sum_outbound_audio_hits=sum_outbound_audio_hits+outbound_audio_hits[d];
				sum_outbound_av_hits=sum_outbound_av_hits+outbound_av_hits[d];
			}
			

		rec_count++;
			rec_list += '<tr>';
				rec_list += '<td id="short_code_'+uniqX[i]+'">'+uniqX[i]+'</td>';
				rec_list += '<td>'+sum_outbound_hits+'</td>';	
				rec_list += '<td>'+sum_outbound_video_hits+'</td>';	
				rec_list += '<td>'+sum_outbound_audio_hits+'</td>';	
				rec_list += '<td>'+sum_outbound_av_hits+'</td>';	
				rec_list += '<td><a title="View"  onclick="objHitsCounter.showReport(\''+uniqX[i]+'\',\''+hits+'\')"><img src="images/view.png"></a></td>';
			rec_list += '</tr>'; 
		}
		 var list_table = ''	
		+ '<table border="0" align="center" cellpadding="0" cellspacing="1" class="results_mini" id="mt" width="50%">';
			list_table += '<tr>';
					list_table += '<th width="30%">Access Code</th>';
					list_table += '<th width="16.25%" >OutboundHits</th>';
					list_table += '<th width="16.25%" >OutboundVideo Hits</th>';
					list_table += '<th width="16.25%" >OutboundAudio Hits</th>';
					list_table += '<th width="16.25%" >OutboundAudio/Video Hits</th>';
					list_table += '<th width="5%" ></th>';
			list_table += '</tr>';
			list_table += rec_list
		+ '</table>' 
		+ '<div id="pager" style="margin: auto;">';  
	
	objHitsCounter.showResultTable(list_table,rec_count);

	}

	if(hits=="inbound_audio_hits"){	
		for(i in uniqX){
			var inbound_audio_hits=[];
			

			for (var h in uniqY){
				var selected=false;
				for (var j in response_data){
					if(uniqX[i]==response_data[j].short_code && uniqY[h]==response_data[j].time_digit ){
						//alert(uniqY[i]+"-->"+uniqX[h]+"-->"+JSON.stringify(seriesData));
						selected=true;
						inbound_audio_hits=inbound_audio_hits.concat(parseInt(response_data[j].data[0].inbound_audio_hits));
						
					}
				}
				 if(!selected){
				 	inbound_audio_hits=inbound_audio_hits.concat(parseInt(0));
				 }
				 selected=false;
			}
			sum_inbound_audio_hits=0;
			for (d in inbound_audio_hits){
				sum_inbound_audio_hits=sum_inbound_audio_hits+inbound_audio_hits[d];
			}
			
		rec_count++;
			rec_list += '<tr>';
				rec_list += '<td id="short_code_'+uniqX[i]+'">'+uniqX[i]+'</td>';
				rec_list += '<td>'+sum_inbound_audio_hits+'</td>';		
				rec_list += '<td><a title="View"  onclick="objHitsCounter.showReport(\''+uniqX[i]+'\',\''+hits+'\')"><img src="images/view.png"></a></td>';
			rec_list += '</tr>'; 
		}
		 var list_table = ''	
		+ '<table border="0" align="center" cellpadding="0" cellspacing="1" class="results_mini" id="mt" width="50%">';
			list_table += '<tr>';
					list_table += '<th width="30%">Access Code</th>';
					list_table += '<th width="16.25%" >Inbound Audio Hits</th>';
					list_table += '<th width="5%" ></th>';
			list_table += '</tr>';
			list_table += rec_list
		+ '</table>' 
		+ '<div id="pager" style="margin: auto;">';  
	
	objHitsCounter.showResultTable(list_table,rec_count);

	}

	if(hits=="outbound_audio_hits"){	
		for(i in uniqX){
			var outbound_audio_hits=[];
			

			for (var h in uniqY){
				var selected=false;
				for (var j in response_data){
					if(uniqX[i]==response_data[j].short_code && uniqY[h]==response_data[j].time_digit ){
						//alert(uniqY[i]+"-->"+uniqX[h]+"-->"+JSON.stringify(seriesData));
						selected=true;
						outbound_audio_hits=outbound_audio_hits.concat(parseInt(response_data[j].data[0].outbound_audio_hits));
						
					}
				}
				 if(!selected){
				 	outbound_audio_hits=outbound_audio_hits.concat(parseInt(0));
				 }
				 selected=false;
			}
			sum_outbound_audio_hits=0;
			for (d in outbound_audio_hits){
				sum_outbound_audio_hits=sum_outbound_audio_hits+outbound_audio_hits[d];
			}
			
		rec_count++;
			rec_list += '<tr>';
				rec_list += '<td id="short_code_'+uniqX[i]+'">'+uniqX[i]+'</td>';
				rec_list += '<td>'+sum_outbound_audio_hits+'</td>';		
				rec_list += '<td><a title="View"  onclick="objHitsCounter.showReport(\''+uniqX[i]+'\',\''+hits+'\')"><img src="images/view.png"></a></td>';
			rec_list += '</tr>'; 
		}
		 var list_table = ''	
		+ '<table border="0" align="center" cellpadding="0" cellspacing="1" class="results_mini" id="mt" width="50%">';
			list_table += '<tr>';
					list_table += '<th width="30%">Access Code</th>';
					list_table += '<th width="16.25%" >Outbound Audio Hits</th>';
					list_table += '<th width="5%" ></th>';
			list_table += '</tr>';
			list_table += rec_list
		+ '</table>' 
		+ '<div id="pager" style="margin: auto;">';  
	
	objHitsCounter.showResultTable(list_table,rec_count);

	}
if(hits=="inbound_av_hits"){	
		for(i in uniqX){
			var inbound_av_hits=[];
			

			for (var h in uniqY){
				var selected=false;
				for (var j in response_data){
					if(uniqX[i]==response_data[j].short_code && uniqY[h]==response_data[j].time_digit ){
						//alert(uniqY[i]+"-->"+uniqX[h]+"-->"+JSON.stringify(seriesData));
						selected=true;
						inbound_av_hits=inbound_av_hits.concat(parseInt(response_data[j].data[0].inbound_av_hits));
						
					}
				}
				 if(!selected){
				 	inbound_av_hits=inbound_av_hits.concat(parseInt(0));
				 }
				 selected=false;
			}
			sum_inbound_av_hits=0;
			for (d in inbound_av_hits){
				sum_inbound_av_hits=sum_inbound_av_hits+inbound_av_hits[d];
			}
			
		rec_count++;
			rec_list += '<tr>';
				rec_list += '<td id="short_code_'+uniqX[i]+'">'+uniqX[i]+'</td>';
				rec_list += '<td>'+sum_inbound_av_hits+'</td>';		
				rec_list += '<td><a title="View"  onclick="objHitsCounter.showReport(\''+uniqX[i]+'\',\''+hits+'\')"><img src="images/view.png"></a></td>';
			rec_list += '</tr>'; 
		}
		 var list_table = ''	
		+ '<table border="0" align="center" cellpadding="0" cellspacing="1" class="results_mini" id="mt" width="50%">';
			list_table += '<tr>';
					list_table += '<th width="30%">Access Code</th>';
					list_table += '<th width="16.25%" >Inbound Audio/Video Hits</th>';
					list_table += '<th width="5%" ></th>';
			list_table += '</tr>';
			list_table += rec_list
		+ '</table>' 
		+ '<div id="pager" style="margin: auto;">';  
	
	objHitsCounter.showResultTable(list_table,rec_count);

	}

	if(hits=="outbound_av_hits"){	
		for(i in uniqX){
			var outbound_av_hits=[];
			

			for (var h in uniqY){
				var selected=false;
				for (var j in response_data){
					if(uniqX[i]==response_data[j].short_code && uniqY[h]==response_data[j].time_digit ){
						//alert(uniqY[i]+"-->"+uniqX[h]+"-->"+JSON.stringify(seriesData));
						selected=true;
						outbound_av_hits=outbound_av_hits.concat(parseInt(response_data[j].data[0].outbound_av_hits));
						
					}
				}
				 if(!selected){
				 	outbound_av_hits=outbound_av_hits.concat(parseInt(0));
				 }
				 selected=false;
			}
			sum_outbound_av_hits=0;
			for (d in outbound_av_hits){
				sum_outbound_av_hits=sum_outbound_av_hits+outbound_av_hits[d];
			}
			
		rec_count++;
			rec_list += '<tr>';
				rec_list += '<td id="short_code_'+uniqX[i]+'">'+uniqX[i]+'</td>';
				rec_list += '<td>'+sum_outbound_av_hits+'</td>';		
				rec_list += '<td><a title="View"  onclick="objHitsCounter.showReport(\''+uniqX[i]+'\',\''+hits+'\')"><img src="images/view.png"></a></td>';
			rec_list += '</tr>'; 
		}
		 var list_table = ''	
		+ '<table border="0" align="center" cellpadding="0" cellspacing="1" class="results_mini" id="mt" width="50%">';
			list_table += '<tr>';
					list_table += '<th width="30%">Access Code</th>';
					list_table += '<th width="16.25%" >Outbound Audio/Video Hits</th>';
					list_table += '<th width="5%" ></th>';
			list_table += '</tr>';
			list_table += rec_list
		+ '</table>' 
		+ '<div id="pager" style="margin: auto;">';  
	
	objHitsCounter.showResultTable(list_table,rec_count);

	}

	if(hits=="inbound_video_hits"){	
		for(i in uniqX){
			var inbound_video_hits=[];
			

			for (var h in uniqY){
				var selected=false;
				for (var j in response_data){
					if(uniqX[i]==response_data[j].short_code && uniqY[h]==response_data[j].time_digit ){
						//alert(uniqY[i]+"-->"+uniqX[h]+"-->"+JSON.stringify(seriesData));
						selected=true;
						inbound_video_hits=inbound_video_hits.concat(parseInt(response_data[j].data[0].inbound_video_hits));
						
					}
				}
				 if(!selected){
				 	inbound_video_hits=inbound_video_hits.concat(parseInt(0));
				 }
				 selected=false;
			}
			sum_inbound_video_hits=0;
			for (d in inbound_video_hits){
				sum_inbound_video_hits=sum_inbound_video_hits+inbound_video_hits[d];
			}
			
		rec_count++;
			rec_list += '<tr>';
				rec_list += '<td id="short_code_'+uniqX[i]+'">'+uniqX[i]+'</td>';
				rec_list += '<td>'+sum_inbound_video_hits+'</td>';		
				rec_list += '<td><a title="View"  onclick="objHitsCounter.showReport(\''+uniqX[i]+'\',\''+hits+'\')"><img src="images/view.png"></a></td>';
			rec_list += '</tr>'; 
		}
		 var list_table = ''	
		+ '<table border="0" align="center" cellpadding="0" cellspacing="1" class="results_mini" id="mt" width="50%">';
			list_table += '<tr>';
					list_table += '<th width="30%">Access Code</th>';
					list_table += '<th width="16.25%" >Inbound Video Hits</th>';
					list_table += '<th width="5%" ></th>';
			list_table += '</tr>';
			list_table += rec_list
		+ '</table>' 
		+ '<div id="pager" style="margin: auto;">';  
	
	objHitsCounter.showResultTable(list_table,rec_count);

	}

	if(hits=="outbound_video_hits"){	
		for(i in uniqX){
			var outbound_video_hits=[];
			

			for (var h in uniqY){
				var selected=false;
				for (var j in response_data){
					if(uniqX[i]==response_data[j].short_code && uniqY[h]==response_data[j].time_digit ){
						//alert(uniqY[i]+"-->"+uniqX[h]+"-->"+JSON.stringify(seriesData));
						selected=true;
						outbound_video_hits=outbound_video_hits.concat(parseInt(response_data[j].data[0].outbound_video_hits));
						
					}
				}
				 if(!selected){
				 	outbound_video_hits=outbound_video_hits.concat(parseInt(0));
				 }
				 selected=false;
			}
			sum_outbound_video_hits=0;
			for (d in outbound_video_hits){
				sum_outbound_video_hits=sum_outbound_video_hits+outbound_video_hits[d];
			}
			
		rec_count++;
			rec_list += '<tr>';
				rec_list += '<td id="short_code_'+uniqX[i]+'">'+uniqX[i]+'</td>';
				rec_list += '<td>'+sum_outbound_video_hits+'</td>';		
				rec_list += '<td><a title="View"  onclick="objHitsCounter.showReport(\''+uniqX[i]+'\',\''+hits+'\')"><img src="images/view.png"></a></td>';
			rec_list += '</tr>'; 
		}
		 var list_table = ''	
		+ '<table border="0" align="center" cellpadding="0" cellspacing="1" class="results_mini" id="mt" width="50%">';
			list_table += '<tr>';
					list_table += '<th width="30%">Access Code</th>';
					list_table += '<th width="16.25%" >Outbound Video Hits</th>';
					list_table += '<th width="5%" ></th>';
			list_table += '</tr>';
			list_table += rec_list
		+ '</table>' 
		+ '<div id="pager" style="margin: auto;">';  
	
	objHitsCounter.showResultTable(list_table,rec_count);

	}
}

hitCounterReport.prototype.createCsv = function() {
	hits=objHitsCounter.getHitTypes();

	if(hits=="total_hits"){
		csvMessage="";
		csvMessage+=objHitsCounter.getTimeLabel()+",Access Code,Total Hits,Inbound Hits,Outbound Hits,Video Hits,Audio Hits, Audio/video Hits\n"
		for (i in response_data){
			csvMessage+=response_data[i].time_digit.substring(response_data[i].time_digit.length-2)+',';
			csvMessage+=response_data[i].short_code+',';
			csvMessage+=response_data[i].data[0].total_hits+',';
			csvMessage+=response_data[i].data[0].inbound_hits+',';
			csvMessage+=response_data[i].data[0].outbound_hits+',';
			csvMessage+=response_data[i].data[0].video_hits+',';
			csvMessage+=response_data[i].data[0].audio_hits+',';
			csvMessage+=response_data[i].data[0].av_hits+',\n';
		}
			return csvMessage;

	}
	if(hits=="audio_hits"){
		csvMessage="";
		csvMessage+=objHitsCounter.getTimeLabel()+",Access Code,Audio Hits,Inbound Audio Hits,Outbound Audio Hits\n"
		for (i in response_data){
			csvMessage+=response_data[i].time_digit.substring(response_data[i].time_digit.length-2)+',';
			csvMessage+=response_data[i].short_code+',';
			csvMessage+=response_data[i].data[0].audio_hits+',';
			csvMessage+=response_data[i].data[0].inbound_audio_hits+',';
			csvMessage+=response_data[i].data[0].outbound_audio_hits+',\n';
		}
			return csvMessage;

	}
	if(hits=="video_hits"){
		csvMessage="";
		csvMessage+=objHitsCounter.getTimeLabel()+",Access Code,Video Hits,Inbound Video Hits,Outbound Video Hits\n"
		for (i in response_data){
			csvMessage+=response_data[i].time_digit.substring(response_data[i].time_digit.length-2)+',';
			csvMessage+=response_data[i].short_code+',';
			csvMessage+=response_data[i].data[0].video_hits+',';
			csvMessage+=response_data[i].data[0].inbound_video_hits+',';
			csvMessage+=response_data[i].data[0].outbound_video_hits+',\n';
		}
			return csvMessage;

	}
	if(hits=="av_hits"){
		csvMessage="";
		csvMessage+=objHitsCounter.getTimeLabel()+",Access Code,Audio/Video Hits,Inbound Audio/Video Hits,Outbound Audio/Video Hits\n"
		for (i in response_data){
			csvMessage+=response_data[i].time_digit.substring(response_data[i].time_digit.length-2)+',';
			csvMessage+=response_data[i].short_code+',';
			csvMessage+=response_data[i].data[0].av_hits+',';
			csvMessage+=response_data[i].data[0].inbound_av_hits+',';
			csvMessage+=response_data[i].data[0].outbound_av_hits+',\n';
		}
			return csvMessage;

	}
	if(hits=="outbound_hits"){
		csvMessage="";
		csvMessage+=objHitsCounter.getTimeLabel()+",Access Code,Outbound Hits,Outbound Video Hits,Outbound Audio Hits,Outbound  Audio/Video Hits\n";
		for (i in response_data){
			csvMessage+=response_data[i].time_digit.substring(response_data[i].time_digit.length-2)+',';
			csvMessage+=response_data[i].short_code+',';
			csvMessage+=response_data[i].data[0].outbound_hits+',';
			csvMessage+=response_data[i].data[0].outbound_video_hits+',';
			csvMessage+=response_data[i].data[0].outbound_audio_hits+',';
			csvMessage+=response_data[i].data[0].outbound_av_hits+',\n';
		}
			return csvMessage;
	}
	if(hits=="inbound_hits"){
		csvMessage="";
		csvMessage+=objHitsCounter.getTimeLabel()+",Access Code,Inbound Hits,Inbound Video Hits,Inbound Audio Hits,Inbound  Audio/Video Hits\n";
		for (i in response_data){
			csvMessage+=response_data[i].time_digit.substring(response_data[i].time_digit.length-2)+',';
			csvMessage+=response_data[i].short_code+',';
			csvMessage+=response_data[i].data[0].inbound_hits+',';
			csvMessage+=response_data[i].data[0].inbound_video_hits+',';
			csvMessage+=response_data[i].data[0].inbound_audio_hits+',';
			csvMessage+=response_data[i].data[0].inbound_av_hits+',\n';
		}
			return csvMessage;
	
	}
	if(hits=="inbound_audio_hits"){
		csvMessage="";
		csvMessage+=objHitsCounter.getTimeLabel()+",Access Code,Inbound Audio Hits\n";
		for (i in response_data){
			csvMessage+=response_data[i].time_digit.substring(response_data[i].time_digit.length-2)+',';
			csvMessage+=response_data[i].short_code+',';
			csvMessage+=response_data[i].data[0].inbound_audio_hits+',\n';
		}
			return csvMessage;
	}
	if(hits=="inbound_video_hits"){
		csvMessage="";
		csvMessage+=objHitsCounter.getTimeLabel()+",Access Code,Inbound Video Hits\n";
		for (i in response_data){
			csvMessage+=response_data[i].time_digit.substring(response_data[i].time_digit.length-2)+',';
			csvMessage+=response_data[i].short_code+',';
			csvMessage+=response_data[i].data[0].inbound_video_hits+',\n';
		}
			return csvMessage;
	}
	if(hits=="inbound_av_hits"){
		csvMessage="";
		csvMessage+=objHitsCounter.getTimeLabel()+",Access Code,Inbound Audio/Video Hits\n";
		for (i in response_data){
			csvMessage+=response_data[i].time_digit.substring(response_data[i].time_digit.length-2)+',';
			csvMessage+=response_data[i].short_code+',';
			csvMessage+=response_data[i].data[0].inbound_av_hits+',\n';
		}
			return csvMessage;
		
	}
	if(hits=="outbound_audio_hits"){
		csvMessage="";
		csvMessage+=objHitsCounter.getTimeLabel()+",Access Code,Outbound Audio Hits\n";
		for (i in response_data){
			csvMessage+=response_data[i].time_digit.substring(response_data[i].time_digit.length-2)+',';
			csvMessage+=response_data[i].short_code+',';
			csvMessage+=response_data[i].data[0].outbound_audio_hits+',\n';
		}
			return csvMessage;
		
	}
	if(hits=="outbound_video_hits"){
		csvMessage="";
		csvMessage+=objHitsCounter.getTimeLabel()+",Access Code,Outbound Video Hits\n";
		for (i in response_data){
			csvMessage+=response_data[i].time_digit.substring(response_data[i].time_digit.length-2)+',';
			csvMessage+=response_data[i].short_code+',';
			csvMessage+=response_data[i].data[0].outbound_video_hits+',\n';
		}
			return csvMessage;
		
	}
	if(hits=="outbound_av_hits"){
		csvMessage="";
		csvMessage+=objHitsCounter.getTimeLabel()+",Access Code,Outbound Audio/Video Hits\n";
		for (i in response_data){
			csvMessage+=response_data[i].time_digit.substring(response_data[i].time_digit.length-2)+',';
			csvMessage+=response_data[i].short_code+',';
			csvMessage+=response_data[i].data[0].outbound_av_hits+',\n';
		}

			return csvMessage;
		
	}



}

hitCounterReport.prototype.csvExport = function() {
var name=new Date().toString()+".csv";
csvMessage=objHitsCounter.createCsv();
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
	// $("#call_type-tr").hide();
	$("#graphs_badfill").hide();
	$("#tables_badfill").hide();
	$("#result_badfill").hide();
	// $("#call_type-tr").hide();
	
	$('#type').change(function()
	{		
		objHitsCounter.showFildes();		
	});
	
	$('#frm_hits_counter').validationEngine({
		'custom_error_messages' : {
		}
	});

	$('#category').change(function()
	{
		//objHitsCounter.showCallType();		
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
		if(!$("#frm_hits_counter").validationEngine('validate')) {
			return false;
		}
		$("#graphs_badfill").hide();
		$("#tables_badfill").show();
		objHitsCounter.search();
		return false;
		
	});

	$('#graph').click(function()
	{
		if(!$("#frm_hits_counter").validationEngine('validate')) {
			return false;
		}
		$("#graphs_badfill").show();
		$("#tables_badfill").hide();
		objHitsCounter.search();
		return false;
	});

	$('#csv').click(function()
	{
		if(!$("#frm_hits_counter").validationEngine('validate')) {
			return false;
		}
		if(objHitsCounter.search()){
			objHitsCounter.csvExport();
			$("#graphs_badfill").hide();
			$("#tables_badfill").hide();
		}
		return false;
	});

	objHitsCounter.getStartYear();
	objHitsCounter.getStartMonth();
	$('#start_year-tr').hide();
	$('#start_month-tr').hide();

});
var objHitsCounter = new hitCounterReport();

