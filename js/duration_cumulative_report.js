//Handle IVR Reports

var YAWS_PATH = config.yaws_file_path + 'hits_counter_report.yaws';
var csvMessage="";

function durationCumulativeReport() {
	
}
durationCumulativeReport.prototype.getStartYear = function(currentValue) {
	
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


durationCumulativeReport.prototype.getStartMonth = function(currentValue) {
	
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


durationCumulativeReport.prototype.getTimeLabel = function() {

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

durationCumulativeReport.prototype.showResultTable = function(list_table,rec_count) {
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

durationCumulativeReport.prototype.showDetailResultTable = function(list_tables,rec_counts) {
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

durationCumulativeReport.prototype.getDurationTypes = function() {
	if($("#category").val()!=""){
		if($("#call_type").val()!=""){
			if($("#category").val()=="inbound"){
				if($("#call_type").val()=="audio"){
					 duration="inbound_audio_dur";
				}
				if($("#call_type").val()=="video"){
					 duration="inbound_video_dur";
				}
				if($("#call_type").val()=="both"){
					 duration="inbound_av_dur";
				}
			}
			if($("#category").val()=="outbound"){
				if($("#call_type").val()=="audio"){
					 duration="outbound_audio_dur";
				}
				if($("#call_type").val()=="video"){
					 duration="outbound_video_dur";
				}
				if($("#call_type").val()=="both"){
					 duration="outbound_av_dur";
				}
			}
		}else{

			if($("#category").val()=="inbound"){
				 duration="inbound_duration";
			}
			if($("#category").val()=="outbound"){
				 duration="outbound_duration";
			}
		}
	}
	else{
		if($("#call_type").val()=="audio"){
			 duration="audio_duration";
		}
		if($("#call_type").val()=="video"){
			 duration="video_duration";
		}
		if($("#call_type").val()=="both"){
			 duration="av_duration";
		}
		if($("#call_type").val()==""){
			 duration="total_duration";
		}
	}

	return duration;
}

durationCumulativeReport.prototype.getMonths = function() {
	selection = document.getElementById('months');
	for (i=1;i <=config.months_limit;i++){
		selection.options[selection.options.length] = new Option(i, i);
	}
}
durationCumulativeReport.prototype.getHours = function() {
	selection = document.getElementById('hours');
	for (i=1;i <=config.hours_limit;i++){
		selection.options[selection.options.length] = new Option(i, i);
	}
}
durationCumulativeReport.prototype.getDays = function() {
	selection = document.getElementById('days');
	for (i=1;i <=config.days_limit;i++){
		selection.options[selection.options.length] = new Option(i, i);
	}
}

durationCumulativeReport.prototype.getYears = function() {
	selection = document.getElementById('years');
	for (i=1;i <=config.years_limit;i++){
		selection.options[selection.options.length] = new Option(i, i);
	}
}

durationCumulativeReport.prototype.search = function() {
	var fromDate=objDurationCumCounter.calculateDate()[0];	
	var toDate=objDurationCumCounter.calculateDate()[1];	
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
	var request_data="duration";
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
		$( "#alert" ).html("<br><center><h1>No Result Found</h1></center>").dialog( "open" );
		return false;
	} 
	else 
	{

		objDurationCumCounter.showTable(response_data);
		objDurationCumCounter.drawGraph(response_data);
		return true;
		
	}
		
		//obj_common.resetForm($('#frm_hits_counter'));

	//}
}

durationCumulativeReport.prototype.showFildes = function() {
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

durationCumulativeReport.prototype.calculateDate= function() {
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

durationCumulativeReport.prototype.getYaxis= function() {
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

 

durationCumulativeReport.prototype.drawGraph = function(response_data) {
	var x=[];
	for (i in response_data){
			x=x.concat(response_data[i].short_code);
	}
	// ////alert(x);
	var uniqX = [];
	$.each(x, function(i, el){
	    if($.inArray(el, uniqX) === -1) 
	    	uniqX.push(el);
	});
	uniqY=objDurationCumCounter.getYaxis();
	var seriesData=[];
	var duration;

	if($('#duaration_in_min').is(':checked')){
		var durationLabel="Duration (Min)";	
	}
	else{
		var durationLabel="Duration (Sec)";
	}

	if($("#graph_type").val()=="access_code"){
		for(i in uniqY){
			var values=[];
			for (var h in uniqX){
				var selected=false;
				for (var j in response_data){
					if(uniqY[i]==response_data[j].time_digit && response_data[j].short_code== uniqX[h]){
						//////alert(uniqY[i]+"-->"+uniqX[h]+"-->"+JSON.stringify(seriesData));
						selected=true;
						duration=objDurationCumCounter.getDurationTypes();
						if($('#duaration_in_min').is(':checked')){
							values=values.concat((parseInt(eval("response_data[j].data[0]."+duration)))/60);
						}
						else{
							values=values.concat(parseInt(eval("response_data[j].data[0]."+duration)));
						}
					}
				}
				 if(!selected){
					values=values.concat(0);
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
						duration=objDurationCumCounter.getDurationTypes();
						if($('#duaration_in_min').is(':checked')){
							values=values.concat((parseInt(eval("response_data[j].data[0]."+duration)))/60);
						}
						else{
							values=values.concat(parseInt(eval("response_data[j].data[0]."+duration)));
						}
					}
				}
				 if(!selected){
					values=values.concat(0);
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
						duration=objDurationCumCounter.getDurationTypes();
						if($('#duaration_in_min').is(':checked')){
							values=values.concat((parseInt(eval("response_data[j].data[0]."+duration)))/60);
						}
						else{
							values=values.concat(parseInt(eval("response_data[j].data[0]."+duration)));
						}
					}
				}
				 if(!selected){
					values=values.concat(0);
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
						duration=objDurationCumCounter.getDurationTypes();
						if($('#duaration_in_min').is(':checked')){
							values=values.concat((parseInt(eval("response_data[j].data[0]."+duration)))/60);
						}
						else{
							values=values.concat(parseInt(eval("response_data[j].data[0]."+duration)));
						}
					}
				}
				 if(!selected){
					values=values.concat(0);
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
	
	function changeMinToMinAndSec(minitues){
					var sec=0;
					var min=0;
					min=minitues-minitues % 1;
					sec=((minitues- min)*60).toFixed(0);
			 
					if(sec ==0){
					 return min+" min ";
					 }else{
					 return min+" min "+sec+" sec";
					 }	
                }

		
 if(($("#graph_type").val()=="access_code" || $("#graph_type").val()=="time_wise" ) && $('#duaration_in_min').is(':checked') ){
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
		            text: 'Duration Report'
		        },
		        subtitle: {
		            text: $("#start_date").val()
		        },
		        xAxis: {
		            categories:uniqX
		        },
		         yAxis: {
				 min: 0,
				 allowDecimals:false,
	            title: {
	                text: durationLabel
	            },
	            plotLines: [{
	                value: 0,
	                width: 1,
	                color: '#808080'
	            }]
	        },
		        tooltip: {
				formatter: function() {
             var s = '<span style="font-size:10px">'+this.x+'</span><table>'+
						'<tr><td style="color:'+this.point.series.color+';padding:0">'+this.series.name+':</td>' +
		                '<td style="padding:0"><b>'+changeMinToMinAndSec(this.point.y)+' </b></td></tr>';
					return s;
					},	
		            footerFormat: '</table>',
		            useHTML: true
            
			  },
		        series: seriesData
		    });
		});
	}else if(($("#graph_type").val()=="access_code" || $("#graph_type").val()=="time_wise" ) && $('#duration_in_sec').is(':checked') ){
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
		            text: 'Duration Report'
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
	                text: durationLabel
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
		                '<td style="padding:0"><b>{point.y} sec </b></td></tr>',
		            footerFormat: '</table>',
		            useHTML: true
		        },
		           
		        
		        series: seriesData
		    });
		});
	} else if(($("#graph_type").val()=="cumulative_access_code" || $("#graph_type").val()=="cumaulative_time_wise" ) && $('#duaration_in_min').is(':checked') ){
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
	            text: 'Cumulative Duration Report'
	        },
	        subtitle: {
	             text: $("#start_date").val()
	        },
	        xAxis: {
	            categories:uniqX
	        },
	        yAxis: {
			allowDecimals:false,
	            min: 0,
	            title: {
	                text: durationLabel
	            }
	        },
	        tooltip: {
			formatter: function() {
          var s = '<span style="font-size:10px">'+this.x+'</span><table>'+
						'<tr><td style="color:'+this.point.series.color+';padding:0">'+this.series.name+':</td>' +
		                '<td style="padding:0"><b>'+changeMinToMinAndSec(this.point.y)+' </b></td></tr>';
					return s;
					},
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
	}else{
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
	            text: 'Cumulative Duration Report'
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
	                text: durationLabel
	            }
	        },
	        tooltip: {
			
	             headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
	            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
	            '<td style="padding:0"><b>{point.y} sec</b></td></tr>',
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
durationCumulativeReport.prototype.showCallType = function() {

	if($('#category').val()==""){
		$("#call_type-tr").hide();
		$("#call_type").val("");
	}
	else{
		//$("#call_type-tr").show();
	}
}


durationCumulativeReport.prototype.showReport = function(short_code,duration) {
 	var uniqY=objDurationCumCounter.getYaxis();
 	var select=true;
	if(duration=="total_duration"){
		var rec_counts=0;
		var rec_lists='';
		for (a in uniqY){	
			for (i in response_data){
				if(response_data[i].short_code==short_code && response_data[i].time_digit==uniqY[a]){
					rec_counts++;
					rec_lists+='<tr>';
						rec_lists+='<td>'+response_data[i].time_digit.substring(response_data[i].time_digit.length-2)+'</td>';
						rec_lists+='<td>'+objDurationCumCounter.changeDurationType(response_data[i].data[0].total_duration)+'</td>';
						rec_lists+='<td>'+objDurationCumCounter.changeDurationType(response_data[i].data[0].inbound_duration)+'</td>';
						rec_lists+='<td>'+objDurationCumCounter.changeDurationType(response_data[i].data[0].outbound_duration)+'</td>';
						rec_lists+='<td>'+objDurationCumCounter.changeDurationType(response_data[i].data[0].video_duration)+'</td>';
						rec_lists+='<td>'+objDurationCumCounter.changeDurationType(response_data[i].data[0].audio_duration)+'</td>';
						rec_lists+='<td>'+objDurationCumCounter.changeDurationType(response_data[i].data[0].av_duration)+'</td>';
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
				rec_lists+='</tr>';
			}
			select=true;
		}
		list_tables ='';
		list_tables += '<center>Access Code: '+short_code+'</center><table border="0" align="center" cellpadding="0" cellspacing="1" class="results_mini" id="reports_tb" >';
		list_tables += '<tr>';
			list_tables += '<th width="5%">'+objDurationCumCounter.getTimeLabel()+'</th>';
			list_tables += '<th width="15.83%" >Total Duration</th>';
			list_tables += '<th width="15.83%" >Inbound Duration</th>';
			list_tables += '<th width="15.83%" >Outbound Duration</th>';
			list_tables += '<th width="15.83%" >Video Duration</th>';
			list_tables += '<th width="15.83%" >Audio Duration</th>';
			list_tables += '<th width="15.83%" >Audio/Video Duration</th>';
		list_tables += '</tr>';
		list_tables += rec_lists
		+ '</table>' 
		+ '<div id="reportPager" style="margin: auto;">';  
		objDurationCumCounter.showDetailResultTable(list_tables,rec_counts);

	}
	if(duration=="audio_duration"){
		var rec_counts=0;
		var rec_lists='';
		for (a in uniqY){	
			for (i in response_data){
				if(response_data[i].short_code==short_code && response_data[i].time_digit==uniqY[a]){
					rec_counts++;
					rec_lists+='<tr>';
						rec_lists+='<td>'+response_data[i].time_digit.substring(response_data[i].time_digit.length-2)+'</td>';
						rec_lists+='<td>'+objDurationCumCounter.changeDurationType(response_data[i].data[0].audio_duration)+'</td>';
						rec_lists+='<td>'+objDurationCumCounter.changeDurationType(response_data[i].data[0].inbound_audio_dur)+'</td>';
						rec_lists+='<td>'+objDurationCumCounter.changeDurationType(response_data[i].data[0].outbound_audio_dur)+'</td>';
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
			list_tables += '<th width="5%">'+objDurationCumCounter.getTimeLabel()+'</th>';
			list_tables += '<th width="15.83%" >Audio Duration </th>';
			list_tables += '<th width="15.83%" >Inbound Audio Duration</th>';
			list_tables += '<th width="15.83%" >Outbound Audio Duration</th>';
		list_tables += '</tr>';
		list_tables += rec_lists
		+ '</table>' 
		+ '<div id="reportPager" style="margin: auto;">';  
		objDurationCumCounter.showDetailResultTable(list_tables,rec_counts);

	} 
	if(duration=="video_duration"){
		var rec_counts=0;
		var rec_lists='';
		for (a in uniqY){	
			for (i in response_data){
				if(response_data[i].short_code==short_code && response_data[i].time_digit==uniqY[a]){
					rec_counts++;
					rec_lists+='<tr>';
						rec_lists+='<td>'+response_data[i].time_digit.substring(response_data[i].time_digit.length-2)+'</td>';
						rec_lists+='<td>'+objDurationCumCounter.changeDurationType(response_data[i].data[0].video_duration)+'</td>';
						rec_lists+='<td>'+objDurationCumCounter.changeDurationType(response_data[i].data[0].inbound_video_dur)+'</td>';
						rec_lists+='<td>'+objDurationCumCounter.changeDurationType(response_data[i].data[0].outbound_video_dur)+'</td>';
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
			list_tables += '<th width="5%">'+objDurationCumCounter.getTimeLabel()+'</th>';
			list_tables += '<th width="15.83%" >Video Duration </th>';
			list_tables += '<th width="15.83%" >Inbound Video Duration</th>';
			list_tables += '<th width="15.83%" >Outbound Video Duration</th>';
		list_tables += '</tr>';
		list_tables += rec_lists
		+ '</table>' 
		+ '<div id="reportPager" style="margin: auto;">';  
		objDurationCumCounter.showDetailResultTable(list_tables,rec_counts);
	}
	if(duration=="av_duration"){
		var rec_counts=0;
		var rec_lists='';
		for (a in uniqY){	
			for (i in response_data){
				if(response_data[i].short_code==short_code && response_data[i].time_digit==uniqY[a]){
					rec_counts++;
					rec_lists+='<tr>';
						rec_lists+='<td>'+response_data[i].time_digit.substring(response_data[i].time_digit.length-2)+'</td>';
						rec_lists+='<td>'+objDurationCumCounter.changeDurationType(response_data[i].data[0].av_duration)+'</td>';
						rec_lists+='<td>'+objDurationCumCounter.changeDurationType(response_data[i].data[0].inbound_av_dur)+'</td>';
						rec_lists+='<td>'+objDurationCumCounter.changeDurationType(response_data[i].data[0].outbound_av_dur)+'</td>';
					rec_lists+='</tr>';
					select=false
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
			list_tables += '<th width="5%">'+objDurationCumCounter.getTimeLabel()+'</th>';
			list_tables += '<th width="15.83%" >Audio/Video Duration </th>';
			list_tables += '<th width="15.83%" >Inbound Audio/Video Duration</th>';
			list_tables += '<th width="15.83%" >Outbound Audio/Video Duration</th>';
		list_tables += '</tr>';
		list_tables += rec_lists
		+ '</table>' 
		+ '<div id="reportPager" style="margin: auto;">';  
		objDurationCumCounter.showDetailResultTable(list_tables,rec_counts);
	}

	if(duration=="inbound_duration"){
		var rec_counts=0;
		var rec_lists='';
		for (a in uniqY){	
			for (i in response_data){
				if(response_data[i].short_code==short_code && response_data[i].time_digit==uniqY[a]){
					rec_counts++;
					rec_lists+='<tr>';
						rec_lists+='<td>'+response_data[i].time_digit.substring(response_data[i].time_digit.length-2)+'</td>';
						rec_lists+='<td>'+objDurationCumCounter.changeDurationType(response_data[i].data[0].inbound_duration)+'</td>';
						rec_lists+='<td>'+objDurationCumCounter.changeDurationType(response_data[i].data[0].inbound_video_dur)+'</td>';
						rec_lists+='<td>'+objDurationCumCounter.changeDurationType(response_data[i].data[0].inbound_audio_dur)+'</td>';
						rec_lists+='<td>'+objDurationCumCounter.changeDurationType(response_data[i].data[0].inbound_av_dur)+'</td>';
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
					rec_lists+='<td>'+response_data[i].data[0].inbound_av_dur+'</td>';
				rec_lists+='</tr>';
			}
			select=true;

		}
		list_tables ='';
		list_tables += '<center>Access Code: '+short_code+'</center><table border="0" align="center" cellpadding="0" cellspacing="1" class="results_mini" id="reports_tb" >';
		list_tables += '<tr>';
			list_tables += '<th width="5%">'+objDurationCumCounter.getTimeLabel()+'</th>';
			list_tables += '<th width="23.75%" >Inbound Duration</th>';
			list_tables += '<th width="23.75%" >Inbound Video Duration</th>';
			list_tables += '<th width="23.75%" >Inbound Audio Duration</th>';
			list_tables += '<th width="23.75%" >Inbound Audio/Video Duration</th>';
		list_tables += '</tr>';
		list_tables += rec_lists
		+ '</table>' 
		+ '<div id="reportPager" style="margin: auto;">';  
		objDurationCumCounter.showDetailResultTable(list_tables,rec_counts);

	}

	if(duration=="outbound_duration"){
		var rec_counts=0;
		var rec_lists='';
		for (a in uniqY){	
			for (i in response_data){
				if(response_data[i].short_code==short_code && response_data[i].time_digit==uniqY[a]){
					rec_counts++;
					rec_lists+='<tr>';
						rec_lists+='<td>'+response_data[i].time_digit.substring(response_data[i].time_digit.length-2)+'</td>';
						rec_lists+='<td>'+objDurationCumCounter.changeDurationType(response_data[i].data[0].outbound_duration)+'</td>';
						rec_lists+='<td>'+objDurationCumCounter.changeDurationType(response_data[i].data[0].outbound_video_dur)+'</td>';
						rec_lists+='<td>'+objDurationCumCounter.changeDurationType(response_data[i].data[0].outbound_audio_dur)+'</td>';
						rec_lists+='<td>'+objDurationCumCounter.changeDurationType(response_data[i].data[0].outbound_av_dur)+'</td>';
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
			rec_lists+='</tr>';
		}
		select=true;

		}
		list_tables ='';
		list_tables += '<center>Access Code: '+short_code+'</center><table border="0" align="center" cellpadding="0" cellspacing="1" class="results_mini" id="reports_tb" >';
		list_tables += '<tr>';
			list_tables += '<th width="5%">'+objDurationCumCounter.getTimeLabel()+'</th>';
			list_tables += '<th width="23.75%" >Outbound Duration</th>';
			list_tables += '<th width="23.75%" >Outbound Video Duration</th>';
			list_tables += '<th width="23.75%" >Outbound Audio Duration</th>';
			list_tables += '<th width="23.75%" >Outbound Audio/Video Duration</th>';
		list_tables += '</tr>';
		list_tables += rec_lists
		+ '</table>' 
		+ '<div id="reportPager" style="margin: auto;">';  
		objDurationCumCounter.showDetailResultTable(list_tables,rec_counts);
	}

	if(duration=="inbound_audio_dur"){
		var rec_counts=0;
		var rec_lists='';
		for (a in uniqY){	
			for (i in response_data){
				if(response_data[i].short_code==short_code && response_data[i].time_digit==uniqY[a]){
					rec_counts++;
					rec_lists+='<tr>';
						rec_lists+='<td>'+response_data[i].time_digit.substring(response_data[i].time_digit.length-2)+'</td>';
						rec_lists+='<td>'+objDurationCumCounter.changeDurationType(response_data[i].data[0].inbound_audio_dur)+'</td>';
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
			list_tables += '<th width="50%">'+objDurationCumCounter.getTimeLabel()+'</th>';
			list_tables += '<th width="50%" >Inbound Audio Duration</th>';
		list_tables += '</tr>';
		list_tables += rec_lists
		+ '</table>' 
		+ '<div id="reportPager" style="margin: auto;">';  
		objDurationCumCounter.showDetailResultTable(list_tables,rec_counts);
	}	

	if(duration=="outbound_audio_dur"){
		var rec_counts=0;
		var rec_lists='';
		for (a in uniqY){	
			for (i in response_data){
				if(response_data[i].short_code==short_code && response_data[i].time_digit==uniqY[a]){
					rec_counts++;
					rec_lists+='<tr>';
						rec_lists+='<td>'+response_data[i].time_digit.substring(response_data[i].time_digit.length-2)+'</td>';
						rec_lists+='<td>'+objDurationCumCounter.changeDurationType(response_data[i].data[0].outbound_audio_dur)+'</td>';
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
			list_tables += '<th width="50%">'+objDurationCumCounter.getTimeLabel()+'</th>';
			list_tables += '<th width="50%" >Inbound Audio Duration</th>';
		list_tables += '</tr>';
		list_tables += rec_lists
		+ '</table>' 
		+ '<div id="reportPager" style="margin: auto;">';  
		objDurationCumCounter.showDetailResultTable(list_tables,rec_counts);

	}	

	if(duration=="inbound_video_dur"){
		var rec_counts=0;
		var rec_lists='';
		for (a in uniqY){	
			for (i in response_data){
				if(response_data[i].short_code==short_code && response_data[i].time_digit==uniqY[a]){
					rec_counts++;
					rec_lists+='<tr>';
						rec_lists+='<td>'+response_data[i].time_digit.substring(response_data[i].time_digit.length-2)+'</td>';
						rec_lists+='<td>'+objDurationCumCounter.changeDurationType(response_data[i].data[0].inbound_video_dur)+'</td>';
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
			list_tables += '<th width="50%">'+objDurationCumCounter.getTimeLabel()+'</th>';
			list_tables += '<th width="50%" >Inbound Video Duration</th>';
		list_tables += '</tr>';
		list_tables += rec_lists
		+ '</table>' 
		+ '<div id="reportPager" style="margin: auto;">';  
		objDurationCumCounter.showDetailResultTable(list_tables,rec_counts);

	}	

	if(duration=="outbound_video_dur"){
		var rec_counts=0;
		var rec_lists='';
		for (a in uniqY){	
			for (i in response_data){
				if(response_data[i].short_code==short_code && response_data[i].time_digit==uniqY[a]){
					rec_counts++;
					rec_lists+='<tr>';
						rec_lists+='<td>'+response_data[i].time_digit.substring(response_data[i].time_digit.length-2)+'</td>';
						rec_lists+='<td>'+objDurationCumCounter.changeDurationType(response_data[i].data[0].outbound_video_dur)+'</td>';
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
				list_tables += '<th width="50%">'+objDurationCumCounter.getTimeLabel()+'</th>';
				list_tables += '<th width="50%" >Inbound Video Duration</th>';
		list_tables += '</tr>';
		list_tables += rec_lists
		+ '</table>' 
		+ '<div id="reportPager" style="margin: auto;">';  
		objDurationCumCounter.showDetailResultTable(list_tables,rec_counts);
	}

	if(duration=="inbound_av_dur"){
		var rec_counts=0;
		var rec_lists='';
		for (a in uniqY){	
			for (i in response_data){
				if(response_data[i].short_code==short_code && response_data[i].time_digit==uniqY[a]){
					rec_counts++;
					rec_lists+='<tr>';
						rec_lists+='<td>'+response_data[i].time_digit.substring(response_data[i].time_digit.length-2)+'</td>';
						rec_lists+='<td>'+objDurationCumCounter.changeDurationType(response_data[i].data[0].inbound_av_dur)+'</td>';
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
				list_tables += '<th width="50%">'+objDurationCumCounter.getTimeLabel()+'</th>';
				list_tables += '<th width="50%" >Inbound Audio/Video Duration</th>';
		list_tables += '</tr>';
		list_tables += rec_lists
		+ '</table>' 
		+ '<div id="reportPager" style="margin: auto;">';  
		objDurationCumCounter.showDetailResultTable(list_tables,rec_counts);
	}	

	if(duration=="outbound_av_dur"){
		var rec_counts=0;
		var rec_lists='';
		for (a in uniqY){	
			for (i in response_data){
				if(response_data[i].short_code==short_code && response_data[i].time_digit==uniqY[a]){
					rec_counts++;
					rec_lists+='<tr>';
						rec_lists+='<td>'+response_data[i].time_digit.substring(response_data[i].time_digit.length-2)+'</td>';
						rec_lists+='<td>'+objDurationCumCounter.changeDurationType(response_data[i].data[0].outbound_av_dur)+'</td>';
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
				list_tables += '<th width="50%">'+objDurationCumCounter.getTimeLabel()+'</th>';
				list_tables += '<th width="50%" >Inbound Audio/Video Duration</th>';
		list_tables += '</tr>';
		list_tables += rec_lists
		+ '</table>' 
		+ '<div id="reportPager" style="margin: auto;">';  
		objDurationCumCounter.showDetailResultTable(list_tables,rec_counts);
	}

}

durationCumulativeReport.prototype.showTable = function(response_data) {
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
	uniqY=objDurationCumCounter.getYaxis();
	duration=objDurationCumCounter.getDurationTypes();
	if(duration=="audio_duration"){	
		for(i in uniqX){
			var audio_duration=[];
			var inbound_audio_dur=[];
			var outbound_audio_dur=[];
			for (var h in uniqY){
				var selected=false;
				for (var j in response_data){
					if(uniqX[i]==response_data[j].short_code && uniqY[h]==response_data[j].time_digit ){
						//alert(uniqY[i]+"-->"+uniqX[h]+"-->"+JSON.stringify(seriesData));
						selected=true;
						audio_duration=audio_duration.concat(parseInt(response_data[j].data[0].audio_duration));
						inbound_audio_dur=inbound_audio_dur.concat(parseInt(response_data[j].data[0].inbound_audio_dur));
						outbound_audio_dur=outbound_audio_dur.concat(parseInt(response_data[j].data[0].outbound_audio_dur));						
					}
				}
				 if(!selected){
					audio_duration=audio_duration.concat(0);
					inbound_audio_dur=inbound_audio_dur.concat(0);
					outbound_audio_dur=outbound_audio_dur.concat(0);
				 }
				 selected=false;
			}
			sum_audio_duration=0;
			sum_inbound_audio_dur=0;
			sum_outbound_audio_dur=0;

			for (d in audio_duration){
				sum_audio_duration=sum_audio_duration+audio_duration[d];
				sum_inbound_audio_dur=sum_inbound_audio_dur+inbound_audio_dur[d];
				sum_outbound_audio_dur=sum_outbound_audio_dur+outbound_audio_dur[d];
			}
			
		rec_count++;
			rec_list += '<tr>';
				rec_list += '<td id="short_code_'+uniqX[i]+'">'+uniqX[i]+'</td>';
				rec_list += '<td>'+objDurationCumCounter.changeDurationType(sum_audio_duration)+'</td>';	
				rec_list += '<td>'+objDurationCumCounter.changeDurationType(sum_inbound_audio_dur)+'</td>';	
				rec_list += '<td>'+objDurationCumCounter.changeDurationType(sum_outbound_audio_dur)+'</td>';	

				rec_list += '<td><a title="View"  onclick="objDurationCumCounter.showReport(\''+uniqX[i]+'\',\''+duration+'\')"><img src="images/view.png"></a></td>';
			rec_list += '</tr>'; 
		}
		 var list_table = ''	
		+ '<table border="0" align="center" cellpadding="0" cellspacing="1" class="results_mini" id="mt" width="50%">';
			list_table += '<tr>';
					list_table += '<th width="20%">Access Code</th>';
					list_table += '<th width="12.5%" >Audio Duration</th>';
					list_table += '<th width="12.5%" >Inbound Audio Duration</th>';
					list_table += '<th width="12.5%" >Outbound Audio Duration</th>';
					list_table += '<th width="5%" ></th>';
			list_table += '</tr>';
			list_table += rec_list
		+ '</table>' 
		+ '<div id="pager" style="margin: auto;">';  

	objDurationCumCounter.showResultTable(list_table,rec_count);

	}

	/////////////////////////////////////////////////////////////////////
	//////////////////////////////////////////////////////////////////////
	if(duration=="video_duration"){	
		for(i in uniqX){
			var video_duration=[];
			var inbound_video_dur=[];
			var outbound_video_dur=[];
			for (var h in uniqY){
				var selected=false;
				for (var j in response_data){
					if(uniqX[i]==response_data[j].short_code && uniqY[h]==response_data[j].time_digit ){
						//alert(uniqY[i]+"-->"+uniqX[h]+"-->"+JSON.stringify(seriesData));
						selected=true;
						video_duration=video_duration.concat(parseInt(response_data[j].data[0].video_duration));
						inbound_video_dur=inbound_video_dur.concat(parseInt(response_data[j].data[0].inbound_video_dur));
						outbound_video_dur=outbound_video_dur.concat(parseInt(response_data[j].data[0].outbound_video_dur));						
					}
				}
				 if(!selected){
					video_duration=video_duration.concat(0);
					inbound_video_dur=inbound_video_dur.concat(0);
					outbound_video_dur=outbound_video_dur.concat(0);
				 }
				 selected=false;
			}
			sum_video_duration=0;
			sum_inbound_video_dur=0;
			sum_outbound_video_dur=0;

			for (d in video_duration){
				sum_video_duration=sum_video_duration+video_duration[d];
				sum_inbound_video_dur=sum_inbound_video_dur+inbound_video_dur[d];
				sum_outbound_video_dur=sum_outbound_video_dur+outbound_video_dur[d];
			}
			
		rec_count++;
			rec_list += '<tr>';
				rec_list += '<td id="short_code_'+uniqX[i]+'">'+uniqX[i]+'</td>';
				rec_list += '<td>'+objDurationCumCounter.changeDurationType(sum_video_duration)+'</td>';	
				rec_list += '<td>'+objDurationCumCounter.changeDurationType(sum_inbound_video_dur)+'</td>';	
				rec_list += '<td>'+objDurationCumCounter.changeDurationType(sum_outbound_video_dur)+'</td>';	

				rec_list += '<td><a title="View"  onclick="objDurationCumCounter.showReport(\''+uniqX[i]+'\',\''+duration+'\')"><img src="images/view.png"></a></td>';
			rec_list += '</tr>'; 
		}
		 var list_table = ''	
		+ '<table border="0" align="center" cellpadding="0" cellspacing="1" class="results_mini" id="mt" width="50%">';
			list_table += '<tr>';
					list_table += '<th width="20%">Access Code</th>';
					list_table += '<th width="12.5%" >Video Duration</th>';
					list_table += '<th width="12.5%" >Inbound Video Duration</th>';
					list_table += '<th width="12.5%" >Outbound Video Duration</th>';
					list_table += '<th width="5%" ></th>';
			list_table += '</tr>';
			list_table += rec_list
		+ '</table>' 
		+ '<div id="pager" style="margin: auto;">';  

	objDurationCumCounter.showResultTable(list_table,rec_count);

	}
	/////////////////////////////////////////////////////////////////////
	if(duration=="av_duration"){	
		for(i in uniqX){
			var av_duration=[];
			var inbound_av_dur=[];
			var outbound_av_dur=[];
			for (var h in uniqY){
				var selected=false;
				for (var j in response_data){
					if(uniqX[i]==response_data[j].short_code && uniqY[h]==response_data[j].time_digit ){
						//alert(uniqY[i]+"-->"+uniqX[h]+"-->"+JSON.stringify(seriesData));
						selected=true;
						av_duration=av_duration.concat(parseInt(response_data[j].data[0].av_duration));
						inbound_av_dur=inbound_av_dur.concat(parseInt(response_data[j].data[0].inbound_av_dur));
						outbound_av_dur=outbound_av_dur.concat(parseInt(response_data[j].data[0].outbound_av_dur));						
					}
				}
				 if(!selected){
					av_duration=av_duration.concat(0);
					inbound_av_dur=inbound_av_dur.concat(0);
					outbound_av_dur=outbound_av_dur.concat(0);
				 }
				 selected=false;
			}
			sum_av_duration=0;
			sum_inbound_av_dur=0;
			sum_outbound_av_dur=0;

			for (d in av_duration){
				sum_av_duration=sum_av_duration+av_duration[d];
				sum_inbound_av_dur=sum_inbound_av_dur+inbound_av_dur[d];
				sum_outbound_av_dur=sum_outbound_av_dur+outbound_av_dur[d];
			}
			
		rec_count++;
			rec_list += '<tr>';
				rec_list += '<td id="short_code_'+uniqX[i]+'">'+uniqX[i]+'</td>';
				rec_list += '<td>'+objDurationCumCounter.changeDurationType(sum_av_duration)+'</td>';	
				rec_list += '<td>'+objDurationCumCounter.changeDurationType(sum_inbound_av_dur)+'</td>';	
				rec_list += '<td>'+objDurationCumCounter.changeDurationType(sum_outbound_av_dur)+'</td>';	

				rec_list += '<td><a title="View"  onclick="objDurationCumCounter.showReport(\''+uniqX[i]+'\',\''+duration+'\')"><img src="images/view.png"></a></td>';
			rec_list += '</tr>'; 
		}
		 var list_table = ''	
		+ '<table border="0" align="center" cellpadding="0" cellspacing="1" class="results_mini" id="mt" width="50%">';
			list_table += '<tr>';
					list_table += '<th width="20%">Access Code</th>';
					list_table += '<th width="12.5%" >Audio/Video Duration</th>';
					list_table += '<th width="12.5%" >Inbound Audio/Video Duration</th>';
					list_table += '<th width="12.5%" >Outbound Audio/Video Duration</th>';
					list_table += '<th width="5%" ></th>';
			list_table += '</tr>';
			list_table += rec_list
		+ '</table>' 
		+ '<div id="pager" style="margin: auto;">';  

	objDurationCumCounter.showResultTable(list_table,rec_count);

	}
	/////////////////////////////////////////////////////////////////////
	if(duration=="total_duration"){	
		for(i in uniqX){
			var total_duration=[];
			var inbound_duration=[];
			var outbound_duration=[];
			var video_duration=[];
			var audio_duration=[];
			var av_duration=[];
			for (var h in uniqY){
				var selected=false;
				for (var j in response_data){
					if(uniqX[i]==response_data[j].short_code && uniqY[h]==response_data[j].time_digit ){
						//alert(uniqY[i]+"-->"+uniqX[h]+"-->"+JSON.stringify(seriesData));
						selected=true;
						total_duration=total_duration.concat(parseInt(response_data[j].data[0].total_duration));
						inbound_duration=inbound_duration.concat(parseInt(response_data[j].data[0].inbound_duration));
						outbound_duration=outbound_duration.concat(parseInt(response_data[j].data[0].outbound_duration));
						video_duration=video_duration.concat(parseInt(response_data[j].data[0].video_duration));
						audio_duration=audio_duration.concat(parseInt(response_data[j].data[0].audio_duration));
						av_duration=av_duration.concat(parseInt(response_data[j].data[0].av_duration));
						
					}
				}
				 if(!selected){
					total_duration=total_duration.concat(0);
					inbound_duration=inbound_duration.concat(0);
					outbound_duration=outbound_duration.concat(0);
					video_duration=video_duration.concat(0);
					audio_duration=audio_duration.concat(0);
					av_duration=av_duration.concat(0);
				 }
				 selected=false;
			}
			sum_total_duration=0;
			sum_inbound_duration=0;
			sum_outbound_duration=0;
			sum_video_duration=0;
			sum_audio_duration=0;
			sum_av_duration=0;
			for (d in total_duration){
				sum_total_duration=sum_total_duration+total_duration[d];
				sum_inbound_duration=sum_inbound_duration+inbound_duration[d];
				sum_outbound_duration=sum_outbound_duration+outbound_duration[d];
				sum_video_duration=sum_video_duration+video_duration[d];
				sum_audio_duration=sum_audio_duration+audio_duration[d];
				sum_av_duration=sum_av_duration+av_duration[d];
			}
			
		rec_count++;
			rec_list += '<tr>';
				rec_list += '<td id="short_code_'+uniqX[i]+'">'+uniqX[i]+'</td>';
				rec_list += '<td>'+objDurationCumCounter.changeDurationType(sum_total_duration)+'</td>';	
				rec_list += '<td>'+objDurationCumCounter.changeDurationType(sum_inbound_duration)+'</td>';	
				rec_list += '<td>'+objDurationCumCounter.changeDurationType(sum_outbound_duration)+'</td>';	
				rec_list += '<td>'+objDurationCumCounter.changeDurationType(sum_video_duration)+'</td>';	
				rec_list += '<td>'+objDurationCumCounter.changeDurationType(sum_audio_duration)+'</td>';
				rec_list += '<td>'+objDurationCumCounter.changeDurationType(sum_av_duration)+'</td>';	
				rec_list += '<td><a title="View"  onclick="objDurationCumCounter.showReport(\''+uniqX[i]+'\',\''+duration+'\')"><img src="images/view.png"></a></td>';
			rec_list += '</tr>'; 
		}
		 var list_table = ''	
		+ '<table border="0" align="center" cellpadding="0" cellspacing="1" class="results_mini" id="mt" width="50%">';
			list_table += '<tr>';
					list_table += '<th width="20%">Access Code</th>';
					list_table += '<th width="12.5%" >Total Duration</th>';
					list_table += '<th width="12.5%" >Inbound Duration</th>';
					list_table += '<th width="12.5%" >Outbound Duration</th>';
					list_table += '<th width="12.5%" >Video Duration</th>';
					list_table += '<th width="12.5%" >Audio Duration</th>';
					list_table += '<th width="12.5%" >Audio/Video Duration</th>';
					list_table += '<th width="5%" ></th>';
			list_table += '</tr>';
			list_table += rec_list
		+ '</table>' 
		+ '<div id="pager" style="margin: auto;">';  

	objDurationCumCounter.showResultTable(list_table,rec_count);

	}

	if(duration=="inbound_duration"){	
		for(i in uniqX){
			var inbound_duration=[];
			var inbound_video_dur=[];
			var inbound_audio_dur=[];
			var inbound_av_dur=[];

			for (var h in uniqY){
				var selected=false;
				for (var j in response_data){
					if(uniqX[i]==response_data[j].short_code && uniqY[h]==response_data[j].time_digit ){
						//alert(uniqY[i]+"-->"+uniqX[h]+"-->"+JSON.stringify(seriesData));
						selected=true;
						inbound_duration=inbound_duration.concat(parseInt(response_data[j].data[0].inbound_duration));
						inbound_video_dur=inbound_video_dur.concat(parseInt(response_data[j].data[0].inbound_video_dur));
						inbound_audio_dur=inbound_audio_dur.concat(parseInt(response_data[j].data[0].inbound_audio_dur));
						inbound_av_dur=inbound_av_dur.concat(parseInt(response_data[j].data[0].inbound_av_dur));	
					}
				}
				 if(!selected){
				 	inbound_duration=inbound_duration.concat(0);
					inbound_video_dur=inbound_video_dur.concat(0);
					inbound_audio_dur=inbound_audio_dur.concat(0);
					inbound_av_dur=inbound_av_dur.concat(0);
				 }
				 selected=false;
			}
			sum_inbound_duration=0;
			sum_inbound_video_dur=0;
			sum_inbound_audio_dur=0;
			sum_inbound_av_dur=0;
			for (d in inbound_duration){
				sum_inbound_duration=sum_inbound_duration+inbound_duration[d];
				sum_inbound_video_dur=sum_inbound_video_dur+inbound_video_dur[d];
				sum_inbound_audio_dur=sum_inbound_audio_dur+inbound_audio_dur[d];
				sum_inbound_av_dur=sum_inbound_av_dur+inbound_av_dur[d];
			}
			
		rec_count++;
			rec_list += '<tr>';
				rec_list += '<td id="short_code_'+uniqX[i]+'">'+uniqX[i]+'</td>';
				rec_list += '<td>'+objDurationCumCounter.changeDurationType(sum_inbound_duration)+'</td>';	
				rec_list += '<td>'+objDurationCumCounter.changeDurationType(sum_inbound_video_dur)+'</td>';	
				rec_list += '<td>'+objDurationCumCounter.changeDurationType(sum_inbound_audio_dur)+'</td>';	
				rec_list += '<td>'+objDurationCumCounter.changeDurationType(sum_inbound_av_dur)+'</td>';	
				rec_list += '<td><a title="View"  onclick="objDurationCumCounter.showReport(\''+uniqX[i]+'\',\''+duration+'\')"><img src="images/view.png"></a></td>';
			rec_list += '</tr>'; 
		}
		 var list_table = ''	
		+ '<table border="0" align="center" cellpadding="0" cellspacing="1" class="results_mini" id="mt" width="50%">';
			list_table += '<tr>';
					list_table += '<th width="30%">Access Code</th>';
					list_table += '<th width="16.25%" >Inbound Duration</th>';
					list_table += '<th width="16.25%" >Inbound Video Duration</th>';
					list_table += '<th width="16.25%" >Inbound Audio Duration</th>';
					list_table += '<th width="16.25%" >Inbound Audio/Video Duration</th>';
					list_table += '<th width="5%" ></th>';
			list_table += '</tr>';
			list_table += rec_list
		+ '</table>' 
		+ '<div id="pager" style="margin: auto;">';  
	
	objDurationCumCounter.showResultTable(list_table,rec_count);

	}

	if(duration=="outbound_duration"){	
		for(i in uniqX){
			var outbound_duration=[];
			var outbound_video_dur=[];
			var outbound_audio_dur=[];
			var outbound_av_dur=[];

			for (var h in uniqY){
				var selected=false;
				for (var j in response_data){
					if(uniqX[i]==response_data[j].short_code && uniqY[h]==response_data[j].time_digit ){
						//alert(uniqY[i]+"-->"+uniqX[h]+"-->"+JSON.stringify(seriesData));
						selected=true;
						outbound_duration=outbound_duration.concat(parseInt(response_data[j].data[0].outbound_duration));
						outbound_video_dur=outbound_video_dur.concat(parseInt(response_data[j].data[0].outbound_video_dur));
						outbound_audio_dur=outbound_audio_dur.concat(parseInt(response_data[j].data[0].outbound_audio_dur));
						outbound_av_dur=outbound_av_dur.concat(parseInt(response_data[j].data[0].outbound_av_dur));	
					}
				}
				 if(!selected){
				 	outbound_duration=outbound_duration.concat(0);
					outbound_video_dur=outbound_video_dur.concat(0);
					outbound_audio_dur=outbound_audio_dur.concat(0);
					outbound_av_dur=outbound_av_dur.concat(0);
				 }
				 selected=false;
			}
			sum_outbound_duration=0;
			sum_outbound_video_dur=0;
			sum_outbound_audio_dur=0;
			sum_outbound_av_dur=0;
			for (d in outbound_duration){
				sum_outbound_duration=sum_outbound_duration+outbound_duration[d];
				sum_outbound_video_dur=sum_outbound_video_dur+outbound_video_dur[d];
				sum_outbound_audio_dur=sum_outbound_audio_dur+outbound_audio_dur[d];
				sum_outbound_av_dur=sum_outbound_av_dur+outbound_av_dur[d];
			}
			

		rec_count++;
			rec_list += '<tr>';
				rec_list += '<td id="short_code_'+uniqX[i]+'">'+uniqX[i]+'</td>';
				rec_list += '<td>'+objDurationCumCounter.changeDurationType(sum_outbound_duration)+'</td>';	
				rec_list += '<td>'+objDurationCumCounter.changeDurationType(sum_outbound_video_dur)+'</td>';	
				rec_list += '<td>'+objDurationCumCounter.changeDurationType(sum_outbound_audio_dur)+'</td>';	
				rec_list += '<td>'+objDurationCumCounter.changeDurationType(sum_outbound_av_dur)+'</td>';	
				rec_list += '<td><a title="View"  onclick="objDurationCumCounter.showReport(\''+uniqX[i]+'\',\''+duration+'\')"><img src="images/view.png"></a></td>';
			rec_list += '</tr>'; 
		}
		 var list_table = ''	
		+ '<table border="0" align="center" cellpadding="0" cellspacing="1" class="results_mini" id="mt" width="50%">';
			list_table += '<tr>';
					list_table += '<th width="30%">Access Code</th>';
					list_table += '<th width="16.25%" >OutboundDuration</th>';
					list_table += '<th width="16.25%" >OutboundVideo Duration</th>';
					list_table += '<th width="16.25%" >OutboundAudio Duration</th>';
					list_table += '<th width="16.25%" >OutboundAudio/Video Duration</th>';
					list_table += '<th width="5%" ></th>';
			list_table += '</tr>';
			list_table += rec_list
		+ '</table>' 
		+ '<div id="pager" style="margin: auto;">';  
	
	objDurationCumCounter.showResultTable(list_table,rec_count);

	}

	if(duration=="inbound_audio_dur"){	
		for(i in uniqX){
			var inbound_audio_dur=[];
			

			for (var h in uniqY){
				var selected=false;
				for (var j in response_data){
					if(uniqX[i]==response_data[j].short_code && uniqY[h]==response_data[j].time_digit ){
						//alert(uniqY[i]+"-->"+uniqX[h]+"-->"+JSON.stringify(seriesData));
						selected=true;
						inbound_audio_dur=inbound_audio_dur.concat(parseInt(response_data[j].data[0].inbound_audio_dur));
						
					}
				}
				 if(!selected){
				 	inbound_audio_dur=inbound_audio_dur.concat(0);
				 }
				 selected=false;
			}
			sum_inbound_audio_dur=0;
			for (d in inbound_audio_dur){
				sum_inbound_audio_dur=sum_inbound_audio_dur+inbound_audio_dur[d];
			}
			
		rec_count++;
			rec_list += '<tr>';
				rec_list += '<td id="short_code_'+uniqX[i]+'">'+uniqX[i]+'</td>';
				rec_list += '<td>'+objDurationCumCounter.changeDurationType(sum_inbound_audio_dur)+'</td>';		
				rec_list += '<td><a title="View"  onclick="objDurationCumCounter.showReport(\''+uniqX[i]+'\',\''+duration+'\')"><img src="images/view.png"></a></td>';
			rec_list += '</tr>'; 
		}
		 var list_table = ''	
		+ '<table border="0" align="center" cellpadding="0" cellspacing="1" class="results_mini" id="mt" width="50%">';
			list_table += '<tr>';
					list_table += '<th width="30%">Access Code</th>';
					list_table += '<th width="16.25%" >Inbound Audio Duration</th>';
					list_table += '<th width="5%" ></th>';
			list_table += '</tr>';
			list_table += rec_list
		+ '</table>' 
		+ '<div id="pager" style="margin: auto;">';  
	
	objDurationCumCounter.showResultTable(list_table,rec_count);

	}

	if(duration=="outbound_audio_dur"){	
		for(i in uniqX){
			var outbound_audio_dur=[];
			

			for (var h in uniqY){
				var selected=false;
				for (var j in response_data){
					if(uniqX[i]==response_data[j].short_code && uniqY[h]==response_data[j].time_digit ){
						//alert(uniqY[i]+"-->"+uniqX[h]+"-->"+JSON.stringify(seriesData));
						selected=true;
						outbound_audio_dur=outbound_audio_dur.concat(parseInt(response_data[j].data[0].outbound_audio_dur));
						
					}
				}
				 if(!selected){
				 	outbound_audio_dur=outbound_audio_dur.concat(0);
				 }
				 selected=false;
			}
			sum_outbound_audio_dur=0;
			for (d in outbound_audio_dur){
				sum_outbound_audio_dur=sum_outbound_audio_dur+outbound_audio_dur[d];
			}
			
		rec_count++;
			rec_list += '<tr>';
				rec_list += '<td id="short_code_'+uniqX[i]+'">'+uniqX[i]+'</td>';
				rec_list += '<td>'+objDurationCumCounter.changeDurationType(sum_outbound_audio_dur)+'</td>';		
				rec_list += '<td><a title="View"  onclick="objDurationCumCounter.showReport(\''+uniqX[i]+'\',\''+duration+'\')"><img src="images/view.png"></a></td>';
			rec_list += '</tr>'; 
		}
		 var list_table = ''	
		+ '<table border="0" align="center" cellpadding="0" cellspacing="1" class="results_mini" id="mt" width="50%">';
			list_table += '<tr>';
					list_table += '<th width="30%">Access Code</th>';
					list_table += '<th width="16.25%" >Outbound Audio Duration</th>';
					list_table += '<th width="5%" ></th>';
			list_table += '</tr>';
			list_table += rec_list
		+ '</table>' 
		+ '<div id="pager" style="margin: auto;">';  
	
	objDurationCumCounter.showResultTable(list_table,rec_count);

	}
if(duration=="inbound_av_dur"){	
		for(i in uniqX){
			var inbound_av_dur=[];
			

			for (var h in uniqY){
				var selected=false;
				for (var j in response_data){
					if(uniqX[i]==response_data[j].short_code && uniqY[h]==response_data[j].time_digit ){
						//alert(uniqY[i]+"-->"+uniqX[h]+"-->"+JSON.stringify(seriesData));
						selected=true;
						inbound_av_dur=inbound_av_dur.concat(parseInt(response_data[j].data[0].inbound_av_dur));
						
					}
				}
				 if(!selected){
				 	inbound_av_dur=inbound_av_dur.concat(0);
				 }
				 selected=false;
			}
			sum_inbound_av_dur=0;
			for (d in inbound_av_dur){
				sum_inbound_av_dur=sum_inbound_av_dur+inbound_av_dur[d];
			}
			
		rec_count++;
			rec_list += '<tr>';
				rec_list += '<td id="short_code_'+uniqX[i]+'">'+uniqX[i]+'</td>';
				rec_list += '<td>'+objDurationCumCounter.changeDurationType(sum_inbound_av_dur)+'</td>';		
				rec_list += '<td><a title="View"  onclick="objDurationCumCounter.showReport(\''+uniqX[i]+'\',\''+duration+'\')"><img src="images/view.png"></a></td>';
			rec_list += '</tr>'; 
		}
		 var list_table = ''	
		+ '<table border="0" align="center" cellpadding="0" cellspacing="1" class="results_mini" id="mt" width="50%">';
			list_table += '<tr>';
					list_table += '<th width="30%">Access Code</th>';
					list_table += '<th width="16.25%" >Inbound Audio/Video Duration</th>';
					list_table += '<th width="5%" ></th>';
			list_table += '</tr>';
			list_table += rec_list
		+ '</table>' 
		+ '<div id="pager" style="margin: auto;">';  
	
	objDurationCumCounter.showResultTable(list_table,rec_count);

	}

	if(duration=="outbound_av_dur"){	
		for(i in uniqX){
			var outbound_av_dur=[];
			

			for (var h in uniqY){
				var selected=false;
				for (var j in response_data){
					if(uniqX[i]==response_data[j].short_code && uniqY[h]==response_data[j].time_digit ){
						//alert(uniqY[i]+"-->"+uniqX[h]+"-->"+JSON.stringify(seriesData));
						selected=true;
						outbound_av_dur=outbound_av_dur.concat(parseInt(response_data[j].data[0].outbound_av_dur));
						
					}
				}
				 if(!selected){
				 	outbound_av_dur=outbound_av_dur.concat(0);
				 }
				 selected=false;
			}
			sum_outbound_av_dur=0;
			for (d in outbound_av_dur){
				sum_outbound_av_dur=sum_outbound_av_dur+outbound_av_dur[d];
			}
			
		rec_count++;
			rec_list += '<tr>';
				rec_list += '<td id="short_code_'+uniqX[i]+'">'+uniqX[i]+'</td>';
				rec_list += '<td>'+objDurationCumCounter.changeDurationType(sum_outbound_av_dur)+'</td>';		
				rec_list += '<td><a title="View"  onclick="objDurationCumCounter.showReport(\''+uniqX[i]+'\',\''+duration+'\')"><img src="images/view.png"></a></td>';
			rec_list += '</tr>'; 
		}
		 var list_table = ''	
		+ '<table border="0" align="center" cellpadding="0" cellspacing="1" class="results_mini" id="mt" width="50%">';
			list_table += '<tr>';
					list_table += '<th width="30%">Access Code</th>';
					list_table += '<th width="16.25%" >Outbound Audio/Video Duration</th>';
					list_table += '<th width="5%" ></th>';
			list_table += '</tr>';
			list_table += rec_list
		+ '</table>' 
		+ '<div id="pager" style="margin: auto;">';  
	
	objDurationCumCounter.showResultTable(list_table,rec_count);

	}

	if(duration=="inbound_video_dur"){	
		for(i in uniqX){
			var inbound_video_dur=[];
			

			for (var h in uniqY){
				var selected=false;
				for (var j in response_data){
					if(uniqX[i]==response_data[j].short_code && uniqY[h]==response_data[j].time_digit ){
						//alert(uniqY[i]+"-->"+uniqX[h]+"-->"+JSON.stringify(seriesData));
						selected=true;
						inbound_video_dur=inbound_video_dur.concat(parseInt(response_data[j].data[0].inbound_video_dur));
						
					}
				}
				 if(!selected){
				 	inbound_video_dur=inbound_video_dur.concat(0);
				 }
				 selected=false;
			}
			sum_inbound_video_dur=0;
			for (d in inbound_video_dur){
				sum_inbound_video_dur=sum_inbound_video_dur+inbound_video_dur[d];
			}
			
		rec_count++;
			rec_list += '<tr>';
				rec_list += '<td id="short_code_'+uniqX[i]+'">'+uniqX[i]+'</td>';
				rec_list += '<td>'+objDurationCumCounter.changeDurationType(sum_inbound_video_dur)+'</td>';		
				rec_list += '<td><a title="View"  onclick="objDurationCumCounter.showReport(\''+uniqX[i]+'\',\''+duration+'\')"><img src="images/view.png"></a></td>';
			rec_list += '</tr>'; 
		}
		 var list_table = ''	
		+ '<table border="0" align="center" cellpadding="0" cellspacing="1" class="results_mini" id="mt" width="50%">';
			list_table += '<tr>';
					list_table += '<th width="30%">Access Code</th>';
					list_table += '<th width="16.25%" >Inbound Video Duration</th>';
					list_table += '<th width="5%" ></th>';
			list_table += '</tr>';
			list_table += rec_list
		+ '</table>' 
		+ '<div id="pager" style="margin: auto;">';  
	
	objDurationCumCounter.showResultTable(list_table,rec_count);

	}

	if(duration=="outbound_video_dur"){	
		for(i in uniqX){
			var outbound_video_dur=[];
			

			for (var h in uniqY){
				var selected=false;
				for (var j in response_data){
					if(uniqX[i]==response_data[j].short_code && uniqY[h]==response_data[j].time_digit ){
						//alert(uniqY[i]+"-->"+uniqX[h]+"-->"+JSON.stringify(seriesData));
						selected=true;
						outbound_video_dur=outbound_video_dur.concat(parseInt(response_data[j].data[0].outbound_video_dur));
						
					}
				}
				 if(!selected){
				 	outbound_video_dur=outbound_video_dur.concat(0);
				 }
				 selected=false;
			}
			sum_outbound_video_dur=0;
			for (d in outbound_video_dur){
				sum_outbound_video_dur=sum_outbound_video_dur+outbound_video_dur[d];
			}
			
		rec_count++;
			rec_list += '<tr>';
				rec_list += '<td id="short_code_'+uniqX[i]+'">'+uniqX[i]+'</td>';
				rec_list += '<td>'+objDurationCumCounter.changeDurationType(sum_outbound_video_dur)+'</td>';		
				rec_list += '<td><a title="View"  onclick="objDurationCumCounter.showReport(\''+uniqX[i]+'\',\''+duration+'\')"><img src="images/view.png"></a></td>';
			rec_list += '</tr>'; 
		}
		 var list_table = ''	
		+ '<table border="0" align="center" cellpadding="0" cellspacing="1" class="results_mini" id="mt" width="50%">';
			list_table += '<tr>';
					list_table += '<th width="30%">Access Code</th>';
					list_table += '<th width="16.25%" >Outbound Video Duration</th>';
					list_table += '<th width="5%" ></th>';
			list_table += '</tr>';
			list_table += rec_list
		+ '</table>' 
		+ '<div id="pager" style="margin: auto;">';  
	
	objDurationCumCounter.showResultTable(list_table,rec_count);

	}
}

durationCumulativeReport.prototype.createCsv = function() {
	duration=objDurationCumCounter.getDurationTypes();

	if(duration=="total_duration"){
		csvMessage="";
		csvMessage+=objDurationCumCounter.getTimeLabel()+",Access Code,Total Duration,Inbound Duration,Outbound Duration,Video Duration,Audio Duration, Audio/video Duration\n"

		for (i in response_data){
			csvMessage+=response_data[i].time_digit.substring(response_data[i].time_digit.length-2)+',';
			csvMessage+=response_data[i].short_code+',';
			csvMessage+=objDurationCumCounter.changeDurationType(response_data[i].data[0].total_duration)+',';
			csvMessage+=objDurationCumCounter.changeDurationType(response_data[i].data[0].inbound_duration)+',';
			csvMessage+=objDurationCumCounter.changeDurationType(response_data[i].data[0].outbound_duration)+',';
			csvMessage+=objDurationCumCounter.changeDurationType(response_data[i].data[0].video_duration)+',';
			csvMessage+=objDurationCumCounter.changeDurationType(response_data[i].data[0].audio_duration)+',';
			csvMessage+=objDurationCumCounter.changeDurationType(response_data[i].data[0].av_duration)+',\n';
		}
			return csvMessage;
	}
	if(duration=="audio_duration"){
		csvMessage="";
		csvMessage+=objDurationCumCounter.getTimeLabel()+",Access Code,Audio Duration,Inbound Audio Duration,Outbound Audio Duration\n"
		for (i in response_data){
			csvMessage+=response_data[i].time_digit.substring(response_data[i].time_digit.length-2)+',';
			csvMessage+=response_data[i].short_code+',';
			csvMessage+=objDurationCumCounter.changeDurationType(response_data[i].data[0].audio_duration)+',';
			csvMessage+=objDurationCumCounter.changeDurationType(response_data[i].data[0].inbound_audio_dur)+',';
			csvMessage+=objDurationCumCounter.changeDurationType(response_data[i].data[0].outbound_audio_dur)+',\n';
		}
			return csvMessage;
	}
	if(duration=="video_duration"){
		csvMessage="";
		csvMessage+=objDurationCumCounter.getTimeLabel()+",Access Code,Video Duration,Inbound Video Duration,Outbound Video Duration\n"
		for (i in response_data){
			csvMessage+=response_data[i].time_digit.substring(response_data[i].time_digit.length-2)+',';
			csvMessage+=response_data[i].short_code+',';
			csvMessage+=objDurationCumCounter.changeDurationType(response_data[i].data[0].video_duration)+',';
			csvMessage+=objDurationCumCounter.changeDurationType(response_data[i].data[0].inbound_video_dur)+',';
			csvMessage+=objDurationCumCounter.changeDurationType(response_data[i].data[0].outbound_video_dur)+',\n';
		}
			return csvMessage;

	}
	if(duration=="av_duration"){
		csvMessage="";
		csvMessage+=objDurationCumCounter.getTimeLabel()+",Access Code,Audio/Video Duration,Inbound Audio/Video Duration,Outbound Audio/Video Duration\n"
		for (i in response_data){
			csvMessage+=response_data[i].time_digit.substring(response_data[i].time_digit.length-2)+',';
			csvMessage+=response_data[i].short_code+',';
			csvMessage+=objDurationCumCounter.changeDurationType(response_data[i].data[0].av_duration)+',';
			csvMessage+=objDurationCumCounter.changeDurationType(response_data[i].data[0].inbound_av_dur)+',';
			csvMessage+=objDurationCumCounter.changeDurationType(response_data[i].data[0].outbound_av_dur)+',\n';
		}
			return csvMessage;

	}
	if(duration=="outbound_duration"){
		csvMessage="";
		csvMessage+=objDurationCumCounter.getTimeLabel()+",Access Code,Outbound Duration,Outbound Video Duration,Outbound Audio Duration,Outbound  Audio/Video Duration\n";
		for (i in response_data){
			csvMessage+=response_data[i].time_digit.substring(response_data[i].time_digit.length-2)+',';
			csvMessage+=response_data[i].short_code+',';
			csvMessage+=objDurationCumCounter.changeDurationType(response_data[i].data[0].outbound_duration)+',';
			csvMessage+=objDurationCumCounter.changeDurationType(response_data[i].data[0].outbound_video_dur)+',';
			csvMessage+=objDurationCumCounter.changeDurationType(response_data[i].data[0].outbound_audio_dur)+',';
			csvMessage+=objDurationCumCounter.changeDurationType(response_data[i].data[0].outbound_av_dur)+',\n';
		}
			return csvMessage;
	}
	if(duration=="inbound_duration"){
		csvMessage="";
		csvMessage+=objDurationCumCounter.getTimeLabel()+",Access Code,Inbound Duration,Inbound Video Duration,Inbound Audio Duration,Inbound  Audio/Video Duration\n";
		for (i in response_data){
			csvMessage+=response_data[i].time_digit.substring(response_data[i].time_digit.length-2)+',';
			csvMessage+=response_data[i].short_code+',';
			csvMessage+=objDurationCumCounter.changeDurationType(response_data[i].data[0].inbound_duration)+',';
			csvMessage+=objDurationCumCounter.changeDurationType(response_data[i].data[0].inbound_video_dur)+',';
			csvMessage+=objDurationCumCounter.changeDurationType(response_data[i].data[0].inbound_audio_dur)+',';
			csvMessage+=objDurationCumCounter.changeDurationType(response_data[i].data[0].inbound_av_dur)+',\n';
		}
			return csvMessage;
	
	}
	if(duration=="inbound_audio_dur"){
		csvMessage="";
		csvMessage+=objDurationCumCounter.getTimeLabel()+",Access Code,Inbound Audio Duration\n";
		for (i in response_data){
			csvMessage+=response_data[i].time_digit.substring(response_data[i].time_digit.length-2)+',';
			csvMessage+=response_data[i].short_code+',';
			csvMessage+=objDurationCumCounter.changeDurationType(response_data[i].data[0].inbound_audio_dur)+',\n';
		}
			return csvMessage;
	}
	if(duration=="inbound_video_dur"){
		csvMessage="";
		csvMessage+=objDurationCumCounter.getTimeLabel()+",Access Code,Inbound Video Duration\n";
		for (i in response_data){
			csvMessage+=response_data[i].time_digit.substring(response_data[i].time_digit.length-2)+',';
			csvMessage+=response_data[i].short_code+',';
			csvMessage+=objDurationCumCounter.changeDurationType(response_data[i].data[0].inbound_video_dur)+',\n';
		}
			return csvMessage;
	}
	if(duration=="inbound_av_dur"){
		csvMessage="";
		csvMessage+=objDurationCumCounter.getTimeLabel()+",Access Code,Inbound Audio/Video Duration\n";
		for (i in response_data){
			csvMessage+=response_data[i].time_digit.substring(response_data[i].time_digit.length-2)+',';
			csvMessage+=response_data[i].short_code+',';
			csvMessage+=objDurationCumCounter.changeDurationType(response_data[i].data[0].inbound_av_dur)+',\n';
		}
			return csvMessage;
	}
	if(duration=="outbound_audio_dur"){
		csvMessage="";
		csvMessage+=objDurationCumCounter.getTimeLabel()+",Access Code,Outbound Audio Duration\n";
		for (i in response_data){
			csvMessage+=response_data[i].time_digit.substring(response_data[i].time_digit.length-2)+',';
			csvMessage+=response_data[i].short_code+',';
			csvMessage+=objDurationCumCounter.changeDurationType(response_data[i].data[0].outbound_audio_dur)+',\n';
		}
			return csvMessage;
	}
	if(duration=="outbound_video_dur"){
		csvMessage="";
		csvMessage+=objDurationCumCounter.getTimeLabel()+",Access Code,Outbound Video Duration\n";
		for (i in response_data){
			csvMessage+=response_data[i].time_digit.substring(response_data[i].time_digit.length-2)+',';
			csvMessage+=response_data[i].short_code+',';
			csvMessage+=objDurationCumCounter.changeDurationType(response_data[i].data[0].outbound_video_dur)+',\n';
		}
			return csvMessage;
	}
	if(duration=="outbound_av_dur"){
		csvMessage="";
		csvMessage+=objDurationCumCounter.getTimeLabel()+",Access Code,Outbound Audio/Video Duration\n";
		for (i in response_data){
			csvMessage+=response_data[i].time_digit.substring(response_data[i].time_digit.length-2)+',';
			csvMessage+=response_data[i].short_code+',';
			csvMessage+=objDurationCumCounter.changeDurationType(response_data[i].data[0].outbound_av_dur)+',\n';
		}
			return csvMessage;
	}

}

durationCumulativeReport.prototype.csvExport = function() {
var name=new Date().toString()+".csv";
csvMessage=objDurationCumCounter.createCsv();
var request_data = '{"action":"EXPORT_CSV","message":"'+csvMessage+'","name":"'+name+'"}';
	response_data = obj_common.ajaxRequest(YAWS_PATH, request_data);

	if ('ok' == response_data[0].status) {
		objApp.setFlash('success', response_data[0].message);
		window.open(response_data[0].csv_url);
	} else {
		objApp.setFlash('error', response_data[0].message);
	}
}

durationCumulativeReport.prototype.changeDurationType = function(value) {
		if($('#duaration_in_min').is(':checked')){
			if(typeof value=="string"){
				value=(Math.floor(parseInt(value)/60)).toString()+" min "+(parseInt(value)%60).toString()+" Sec";
			}
			else{
				value=(Math.floor(value/60)).toString()+" min "+(value%60).toString()+" Sec";
			}
		}
		// else{
		// 	if(typeof value=="string"){
		// 		value=value+" Sec";
		// 	}
		// 	else{
		// 		value=value.toString()+" Sec";
		// 	}
		// }
	return value;
}

jQuery(document).ready(function() {
	
	//hide call type drop box since we have only audio type as call type  and audio is set as default value for call_type
	$("#call_type-tr").hide();
	$("#start_time").val("00:00:00");
	$("#days-tr").hide();
	$("#months-tr").hide();
	$("#years-tr").hide();
	$("#graphs_badfill").hide();
	$("#tables_badfill").hide();
	$("#result_badfill").hide();

	$("input[name=duration_in]:radio").change(function () {
		$("#graphs_badfill").hide();
		$("#tables_badfill").hide();
	});

	// $('#frm_hits_counter').validationEngine({
		// 'custom_error_messages' : {

		// }
	// });
	
	$('#type').change(function()
	{
		objDurationCumCounter.showFildes();
		$("#graphs_badfill").hide();
		$("#tables_badfill").hide();		
	});
	
	$('#category').change(function()
	{
		//objDurationCumCounter.showCallType();
		$("#graphs_badfill").hide();
		$("#tables_badfill").hide();		
	});

	$('#call_type').change(function()
	{
		//objDurationCumCounter.showCallType();
		$("#graphs_badfill").hide();
		$("#tables_badfill").hide();		
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
		objDurationCumCounter.search();
		return false;
		
	});

	$('#graph').click(function()
	{
		if(!$("#frm_hits_counter").validationEngine('validate')) {
			return false;
		}
		$("#graphs_badfill").show();
		$("#tables_badfill").hide();
		objDurationCumCounter.search();
		return false;
	});

	$('#csv').click(function()
	{
		if(!$("#frm_hits_counter").validationEngine('validate')) {
			return false;
		}
		if(objDurationCumCounter.search()){
			objDurationCumCounter.csvExport();
			$("#graphs_badfill").hide();
			$("#tables_badfill").hide();
		}
		return false;
	});

	objDurationCumCounter.getStartYear();
	objDurationCumCounter.getStartMonth();
	$('#start_year-tr').hide();
	$('#start_month-tr').hide();
	
});
var objDurationCumCounter = new durationCumulativeReport();
