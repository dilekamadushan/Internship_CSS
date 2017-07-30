/**
 * SystemUsage class which handles system usage reports related functionalities
 */
 var cur_page = 1;  
function LiveCircuit() {
	//this.getTotalChannels();
}

/**
 * 
 */
LiveCircuit.prototype.currTraffic = function (render, height, width , hits) {

	$(function () {
				meter = new Highcharts.Chart({						
				chart: {
					renderTo: render,
					type: 'gauge',
					plotBackgroundColor: null,
					plotBackgroundImage: null,
					plotBorderWidth: 0,
					plotShadow: false,
					height: height, 
					width: width					
				},
				exporting: { enabled: false },
				title: {
					text: ''
				},
				
				pane: {
					startAngle: -150,
					endAngle: 150,
					background: [{
						backgroundColor: {
							linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
							stops: [
								[0, '#FFF'],
								[1, '#333']
							]
						},
						borderWidth: 0,
						outerRadius: '109%'
					}, {
						backgroundColor: {
							linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
							stops: [
								[0, '#333'],
								[1, '#FFF']
							]
						},
						borderWidth: 1,
						outerRadius: '107%'
					}, {
						// default background
					}, {
						backgroundColor: '#DDD',
						borderWidth: 0,
						outerRadius: '105%',
						innerRadius: '103%'
					}]
				},
				   
				// the value axis
				yAxis: {
					min: 0,
					max: 1000,
					
					minorTickInterval: 'auto',
					minorTickWidth: 1,
					minorTickLength: 10,
					minorTickPosition: 'inside',
					minorTickColor: '#666',
			
					tickPixelInterval: 30,
					tickWidth: 2,
					tickPosition: 'inside',
					tickLength: 10,
					tickColor: '#666',
					labels: {
						step: 2,
						rotation: 'auto'
					},
					title: {
						text: 'hits'
					},
					plotBands: [{
						from: 0,
						to: 500,
						color: '#55BF3B' // green
					}, {
						from: 500,
						to: 800,
						color: '#DDDF00' // yellow
					}, {
						from: 800,
						to: 1000,
						color: '#DF5353' // red
					}]        
				},
			
				series: [{
					name: 'Traffic',
					data: hits,
					tooltip: {
						valueSuffix: ' Hits'
					}
				}]
			});
		});
}

LiveCircuit.prototype.chanUsage = function (render, total, dial_in, dial_out, idle ) {
    
	var data_table = ''	
	+ '<table border="0" align="center" cellpadding="0" cellspacing="1" class="results_mini" width="100%">'
		+ '<tr>'
			+ '<td width="50%" align="right">Total</td>'
			+ '<td width="50%" align="left">' + total + '</td>'
		+ '</tr>'
		+ '<tr>'
			+ '<td width="50%" align="right">Dial In</td>'
			+ '<td width="50%" align="left">' + dial_in + '</td>'
		+ '</tr>'
		+ '<tr>'
			+ '<td width="50%" align="right">Dial Out</td>'
			+ '<td width="50%" align="left">' + dial_out + '</td>'
		+ '</tr>'
		+ '<tr>'
			+ '<td width="50%" align="right">Idle</td>'
			+ '<td width="50%" align="left">' + idle + '</td>'
		+ '</tr>'		
	+ '</table>';

	jQuery('#' + render).html(data_table);	
}

LiveCircuit.prototype.topAccessCodes = function (render, height, width, x_axis, series_vals ) {

	$(function () {
		var chart_topfive = new Highcharts.Chart({
			colors: ['#058DC7','#50B432', '#ED561B', '#DDDF00', '#24CBE5', '#64E572', '#FF9655', '#FFF263', '#6AF9C4'],
			chart: { 
				renderTo: render,
				type: 'column',
				marginRight: 5,
				marginBottom: 90,
				height: height, 
				width: width			
			},
			plotOptions: {
				series: {
					marker: {
						//enabled: true,
						symbol: 'circle',
						radius: 1
					}
				}
			},
			title: {
				text: '',
				x: -20 //center
			},
			subtitle: {
				text: '',
				x: -20
			},
			xAxis: {
                categories: x_axis,
				title: {
					text: 'Access Code'
				},
				labels: {
					rotation: -45,
					align: 'right',
				},
			},
			yAxis: {
				allowDecimals:true,
				title: {
					text: 'Hits'
				},
				min: 0
			},
			tooltip: {
				formatter: function() {
					return this.x + ',' + this.y;
				}
			},
			legend: {
				enabled: false
			},
			series: [{
                name: 'Tokyo',
                data: series_vals
    
            }]
		});
	});
}

LiveCircuit.prototype.trafficGraph = function (render, height, width , hits) {
    var chart;
    	
	$(function () {
		$(document).ready(function() {
			Highcharts.setOptions({
				global: {
					useUTC: false
				}
			});

		trafic_graph = new Highcharts.Chart({
			chart: {
				renderTo: render,
				type: 'spline',
				marginRight: 10/*,
				events: {
					load: function() {
	
						// set up the updating of the chart each second
						var series = this.series[0];
						setInterval(function() {
							var x = (new Date()).getTime(), // current time
								y = Math.random();
							series.addPoint([x, y], true, true);
						}, 1000);
					}
				}*/
			},
			title: {
				text: ''
			},
			xAxis: {
				type: 'datetime',
				tickPixelInterval: 150
			},
			yAxis: {
				allowDecimals:false,
				min: 0,							
				title: {
					text: 'Hits'
				},
				plotLines: [{
					value: 0,
					width: 1,
					color: '#808080'
				}]
			},
			tooltip: {
				formatter: function() {
						return '<b>'+ this.series.name +'</b><br/>'+
						Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) +'<br/>'+
						Highcharts.numberFormat(this.y, 2);
				}
			},
			legend: {
				enabled: false
			},
			exporting: {
				enabled: false
			},
			series: [{
				name: 'Current Traffic',
				color: '#ED561B',
				data: (function() {
					// generate an array of random data
					var data = [],
						time = (new Date()).getTime(),
						i;
	
					for (i = -19; i <= 0; i++) {
						data.push({
							x: time + i * 1000,
							y: 0
						});
					}
					return data;
				})()
			}]
		});
	});
	
});
}			

LiveCircuit.prototype.chanUsageGraph = function (render, height, width ) {
    var chart;
    	
    	// Build the chart
		chart_yesterday = new Highcharts.Chart({
			chart: {
				renderTo: render,
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
				height: height, 
				width: width				
            },
            title: {
                text: ''
            },
            tooltip: {
        	    pointFormat: '{series.name}: <b>{point.percentage}%</b>',
            	percentageDecimals: 0
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: false
                    },
                    showInLegend: true,
					formatter: function() {
                            return '<b>'+ this.point.name +'</b>: '+ Math.round(this.percentage) +' %';
                        }
                }
            },
            series: [{
                name: 'System Usage share',
                data: [
                    ['Used: '+2909,   2909],
                    ['Free: '+249971,   249971]
                ]
            }]
        });
}

// LiveCircuit.prototype.getTotalChannels = function() {
// 	var request_data = '{"action":"GET_TOTAL_CHANNELS"}';
// 	var response_data = obj_common.ajaxRequest(config.yaws_file_path + 'dashboard.yaws', request_data);
// 	if(response_data[0].status === "error"){
// 		objApp.setFlash('error', response_data[0].response);
// 	}
// }

// 
LiveCircuit.prototype.chanRestart = function(channel_id, server_id, session_id, node) {
	
	var request_data = '{"action":"RESTART_CHANNEL","channel_id":"' + channel_id + '","server_id":"' + server_id + '","session_id":"' + session_id + '","node":"' + node + '"}';
	var response_data = obj_common.ajaxRequest(config.yaws_file_path + 'dashboard.yaws', request_data);
	
	if(response_data[0].status == "ok")
	{
		objLiveCircuit.getCurrentChannelUsageDetails(null);
		objApp.setFlash('success', response_data[0].message);
	}
	else
	{
		objApp.setFlash('error', response_data[0].message);
	}
};


LiveCircuit.prototype.viewLogs = function(call_id) {
	
	var request_data = '{"action":"GET_CALLER_ID","call_id":"' + call_id + '"}';
	
	var response_data = obj_common.ajaxRequest(config.yaws_file_path + 'dashboard.yaws', request_data);

	data_list = '';
	
	if(response_data[0].status == "ok")
	{
		rec_count = response_data[0].rec_count;
		res_data  = response_data[0].message;

		rec_list = '<span class="text1"><b>Total ' + rec_count + ' records found </b></span>';		
		
		for (var i in res_data) 
		{
			data_list += '<tr>'
					+ '<td align="center">' + res_data[i].date + '</td>'
					+ '<td align="left">' + res_data[i].log + '</td>'
					+ '</tr>'
		}
	}
	else
	{
		rec_list = '';
		
		data_list += '<tr>'
			+ '<td colspan="8">No data</td>'
		+ '</tr>';
	}
		
 
	var data_table = rec_list + '<br/>'	
	+ '<table border="0" align="center" cellpadding="0" cellspacing="1" class="results_mini" width="100%">'
		+ '<tr>'
			+ '<th width="20%">Time</th>'
			+ '<th width="80%">Log Details</th>'
		+ '</tr>'
		+ data_list
	+ '</table>';

	$("#view_dialog").dialog("open");
	jQuery('#view-log').html(data_table);		
		
};	


LiveCircuit.prototype.getTopFiveData = function() {
	
	var request_data = '{"action":"GET_TOP_FIVE_ACCESS_CODES"}';
	
	var response_data = obj_common.ajaxRequest(config.yaws_file_path + 'dashboard.yaws', request_data);
	
	var prof = '';
	var short_codes = new Array();;
	var hits = new Array();
 	
	if(response_data)
	{		
		for (var i in response_data) {			
			short_codes[i] = response_data[i].shortCode;
			hits[i] 	   = response_data[i].hits;
		}		
	}
	
	var hit = hits.toString();
	var series = hit.split(',').map(function(item) {
		return parseInt(item, 10);
	});
	
	var short_code = short_codes.toString();
	var x_axis = short_code.split(',');	
	
	this.currTraffic('active_user_tbl1' , 200, 350, [1]);
	//this.chanUsage('active_user_tbl2' , 700, 1, 2, 697);
	this.topAccessCodes('active_user_tbl3' , 200, 350, x_axis, series);
	this.trafficGraph('active_user_tbl4' , 300, 900, 1);
	this.chanUsageGraph('active_user_tbl5' , 300, 900);
};

LiveCircuit.prototype.getCurrentChannelUsage = function(graph_obj){
	var request_data = '{"action":"GET_CHANNEL_USAGE"}';
	var response_data = obj_common.ajaxRequest(config.yaws_file_path + 'dashboard.yaws', request_data);
	var dialIn = parseInt(response_data[0].dialin);
	var dialOut = parseInt(response_data[0].dialout);
	var totalChan = parseInt(response_data[0].totalChan);
	this.chanUsage('chan_usage_tbl' , totalChan, dialIn, dialOut, totalChan - (dialIn + dialOut));
}

LiveCircuit.prototype.getCurrentChannelUsageDetails = function(graph_obj){
	var request_data = '{"action":"GET_CURRENT_CHANNELS"}';
	response_data = obj_common.ajaxRequest(config.yaws_file_path + 'dashboard.yaws', request_data);
	objLiveCircuit.formlastAccessChannTbl(response_data[0].channel_monitor);
}

LiveCircuit.prototype.formlastAccessChannTbl = function(chann_data){
	var rec_list 	= '';
	var rec_count 	= 0; 
	var current_active_id = $('.active').attr('id');
	 if (current_active_id != "undefined"){
			cur_page=current_active_id;
		} 
	if(chann_data != ""){
		for (var i in chann_data)
		{
			var link_chan_restart  = '<a href="#" onClick="objLiveCircuit.chanRestart(\''+chann_data[i].productChannel +'\',\''+ chann_data[i].serverID+'\',\''+ chann_data[i].sessionID+'\',\''+ chann_data[i].node+'\')" title="Restart"><img align="absmiddle" src="' + config.image_path + 'reset.png"/></a>';
			var link_chan_online  = '<img align="absmiddle" src="' + config.image_path + 'blink.gif"/>';

			rec_count++;
			rec_list += '<tr>'
					+ '<td>' + chann_data[i].serverID + '</td>'
					+ '<td>' + chann_data[i].productChannel + '</td>'
					+ '<td>' + chann_data[i].calling + '</td>'
					+ '<td>' + chann_data[i].called + '</td>'
					+ '<td>' + chann_data[i].direction + '</td>'
					+ '<td>' + chann_data[i].endTimeRet + '</td>';

			//if(chann_data[i].direction != "Idle"){
			if(true){
				if(objApp.checkPermission('ivr_live_chan_restart')){
					rec_list += '<td>' + link_chan_restart ;
				}else{
					rec_list += '<td>';
				}
				if(chann_data[i].direction != "Idle"){
				 	rec_list += link_chan_online +'</td>';
				}
			}else{
				rec_list += '<td></td>';
			}			 
		}
		}else{
			rec_list += '<tr>'
				+ '<td colspan="7">No data</td>'
			+ '</tr>';
		}

		var content = ''	
		+ '<table border="0" align="center" cellpadding="0" cellspacing="1" class="results_mini" id="mt">'
			+ '<thead align="center">'
				+ '<th width="7%">Server ID</th>'
				+ '<th width="8%">Channel</th>'
				+ '<th width="14%">Calling Party</th>'
				+ '<th width="25%">Called Party</th>'
				+ '<th width="15%">Access Type</th>'
				+ '<th width="15%">Last Access</th>'
				+ '<th width="5%"></th>'
			+ '</thead>'
			+ rec_list
		+ '</table>' 
		+ '<div id="pager" style="margin: auto;">';


	jQuery('#chan_usage_detail_last_access').html(content);
	$('#pager').smartpaginator({ 
		totalrecords: rec_count,
		recordsperpage: 10, 
		datacontainer: 'mt', 
		dataelement: 'tr',
		theme: 'custom',
		initval:cur_page,
		onchange: this.onPageChange
	});	 
}


var obj_common = new Common();
var objLiveCircuit = new LiveCircuit();

jQuery(document).ready(function() {

	// Load initial page elements
	objLiveCircuit.getCurrentChannelUsage(null);	
	objLiveCircuit.getCurrentChannelUsageDetails(null);
	setInterval('objLiveCircuit.getCurrentChannelUsage(null), objLiveCircuit.getCurrentChannelUsageDetails(null)', 5000);
	
	// UI View Dialog box
    $.fx.speeds._default = 1000;
    $(function() {
       $( "#view_dialog" ).dialog({
          autoOpen: false,
          show: "blind",
          hide: "explode",
		  resizable: false
       });
       
       $( "#view_dialog" ).dialog({ minHeight: 200 });
       $( "#view_dialog" ).dialog({ minWidth: 700 });
       
    });
});
