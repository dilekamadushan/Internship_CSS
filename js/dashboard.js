// <!-- *#__dan__#* JS files for dashboard page *#__dan__#* -->


/*
 * Dashboard class which handle dashboard page
 * functionalities
 */
 
var license_chart = false; 
var license_chart_zoom = false; 
var meter = null;
var meterOptions = null;
var usageChart = null;
var totalChannels = 0;
 
function Dashboard() {
	//this.getTotalChannels(); //disable to get channel from ivr servers
	this.graph_obj = null;
	// this.meter = null;
}

/**
 * 
 */

 var WS = false;
 if (window.WebSocket) WS = WebSocket;
 if (!WS && window.MozWebSocket) WS = MozWebSocket;
 if (!WS){
    alert("WebSocket not supported by this browser");
    setInterval(function(){
		objDashboard.getCurrentChannelUsage(null);
		objDashboard.getTopFiveShortCodes();
		objDashboard.getChannelDataInfo(null);
		objDashboard.getHits(null);
		graph_obj = objDashboard.getHits(graph_obj);
		objDashboard.getCurrentChannelUsage(null);
		objDashboard.getChannelDataInfo(null);
	}, 5000);
}

    var client = {
        connect: function(){
         this._ws=new WS("ws://" + objDashboard.getWebRootIP() + "/ivr_admin/yaws/websockets_endpoint.yaws" +
                          "?extversion="+$('extVersion').checked +
                          "&keepalive="+$('keepalive').checked +
                          "&timeout="+$('timeout').value);
         this._ws.onopen=this._onopen;
         this._ws.onmessage=this._onmessage;
         this._ws.onclose=this._onclose;
        },
        _onopen: function(){
	        console.log("client connected");
	        client._send('client-connected');
	        client._send("reply_text");
       },
        _send: function(message){
           if (this._ws)
            this._ws.send(message);
        },
       chat: function(text) {
          if (text != null && text.length>0 )
            client._send(text);
        },
        _onmessage: function(m) {
          if (m.data){
            var text = m.data;
           // console.log(text);
            objDashboard.processWebSocketData(text);
          }
        },
        _onclose: function(m) {
          this._ws=null;
        }
    };

// Dashboard.prototype.getTotalChannels = function() {
// 	var request_data = '{"action":"GET_TOTAL_CHANNELS"}';
// 	var response_data = obj_common.ajaxRequest(config.yaws_file_path + 'dashboard.yaws', request_data);
// 	if(response_data[0].status === "error"){
// 		objApp.setFlash('error', response_data[0].response);
// 	}
// }

Dashboard.prototype.getWebRootIP = function() {
	var request_data = '{"action":"GET_WEBROOT_IP"}';
	response_data = obj_common.ajaxRequest(config.yaws_file_path + 'dashboard.yaws', request_data);
	if(response_data[0].status == "ok"){
		return response_data[0].ip;
	}else{
		objApp.setFlash('error', "An error occured in Web root IP retrival");
		return null;
	}
}

Dashboard.prototype.processWebSocketData = function(msgString) {
	var mainPart = msgString.split(";");
	var currentHits = mainPart[0].split(":");
	if(mainPart[1] != undefined){
		var channels = mainPart[1].split(",");
		var dialin = channels[0].split(":");
		var dialOut = channels[1].split(":");
		totalChannels = channels[2].split(":");
		//console.log(msgString);
		objDashboard.currentHits_webSockets(currentHits[1], totalChannels[1]);
		objDashboard.channelUsage_webSockets(totalChannels[1], dialin[1], dialOut[1]);
		objDashboard.channelTraffic_websockets(totalChannels[1], mainPart[2]);
	}
	// console.log("Current Hits : " + currentHits[1] + " | Dialin : " + dialin[1] + " | DialOut : " + dialOut[1] + " | Total Channels : " + totalChannels[1]);
}

Dashboard.prototype.currentHits_webSockets = function (hitCount, totalHits) {
	var max_hits=parseInt(totalHits);
	var point1=3* (max_hits/5);
	var point2=4* (max_hits/5);
	
	
	 meter.yAxis[0].removePlotBand('plot-band-1');
	 meter.yAxis[0].removePlotBand('plot-band-2');
	 meter.yAxis[0].removePlotBand('plot-band-3');
	 
	meter.yAxis[0].addPlotBand({
                from: 0,
                to: point1,
                color: '#55BF3B', // green
                id: 'plot-band-1'
            });
	
		meter.yAxis[0].addPlotBand({
                 from: point1,
                to: point2,
                color: '#DDDF0D', // yellow
                id: 'plot-band-2'
            });

		meter.yAxis[0].addPlotBand({
                from:point2,
                to: max_hits ,
                color: '#DF5353', // red
                id: 'plot-band-3'
            });			
 
	meter.yAxis[0].update({
            
                min:0,
                max:max_hits
            
            });
	meter.series[0].points[0].update(parseInt((hitCount)));
	objDashboard.graph_obj = objDashboard.trafficGraph('traffic_graph' , 250, 1000, hitCount, objDashboard.graph_obj);
}

Dashboard.prototype.channelUsage_webSockets = function (totalChan, dialIn, dialOut) {
	objDashboard.chanUsage('chan_usage' , totalChan, dialIn, dialOut, totalChan - (parseInt(dialIn) + parseInt(dialOut)));
}

Dashboard.prototype.channelTraffic_websockets = function (totalChannels, channelDetails) {

	var avalChanArray = new Array();
	var chanArray = new Array();
	var chanValueArr = new Array();

	var channels = channelDetails.split("|");

	for(var i=0; i<(channels.length)-1; i++) {
	   	var keyValuePair = channels[i].split(",");
	   	var channelId = keyValuePair[0].split(":");
	   	var direction = keyValuePair[1].split(":");
	   	
	   	if(direction[1] != "Idle"){
	   		avalChanArray[i] = parseInt(channelId[1]);
	 	}

	}

   	for(var i=0; i<(channels.length)-1; i++){
   		chanArray[i] = i.toString();
   		if(avalChanArray.indexOf(i) > -1){
   			chanValueArr[i] = 1;
   		}else{
   			chanValueArr[i] = 0;
   		}
   	}

   	objDashboard.chanUsageGraph('chan_usage_graph' , 230, 12000, chanValueArr, chanArray,totalChannels);
}

// Dashboard.prototype.currTraffic = function (render, height, width , hits, total) {

// 	$(function () {
// 			meter = new Highcharts.Chart({						
// 			chart: {
// 				renderTo: render,
// 				type: 'gauge',
// 				plotBackgroundColor: null,
// 				plotBackgroundImage: null,
// 				plotBorderWidth: 0,
// 				plotShadow: false,
// 				height: height, 
// 				width: width					
// 			},
// 			exporting: { enabled: false },
// 			title: {
// 				text: ''
// 			},
			
// 			pane: {
// 				startAngle: -150,
// 				endAngle: 150,
// 				background: [{
// 					chartBackgroundColor: {
// 						linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
// 						stops: [
// 							[0, '#FFF'],
// 							[1, '#333']
// 						]
// 					},
// 					borderWidth: 0,
// 					outerRadius: '109%'
// 				}, {
// 					chartBackgroundColor: {
// 						linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
// 						stops: [
// 							[0, '#333'],
// 							[1, '#FFF']
// 						]
// 					},
// 					borderWidth: 1,
// 					outerRadius: '107%'
// 				}, {
// 					// default background
// 				}, {
// 					chartBackgroundColor: '#DDD',
// 					borderWidth: 0,
// 					outerRadius: '105%',
// 					innerRadius: '103%'
// 				}]
// 			},
			   
// 			// the value axis
// 			yAxis: {
// 				min: 0,
// 				max: total,
				
// 				minorTickInterval: 'auto',
// 				minorTickWidth: 1,
// 				minorTickLength: 10,
// 				minorTickPosition: 'inside',
// 				minorTickColor: '#666',
		
// 				tickPixelInterval: 30,
// 				tickWidth: 2,
// 				tickPosition: 'inside',
// 				tickLength: 10,
// 				tickColor: '#666',
// 				labels: {
// 					step: 2,
// 					rotation: 'auto'
// 				},
// 				title: {
// 					text: 'hits'
// 				},
// 				plotBands: [{
// 					from: 0,
// 					to: 500,
// 					color: '#55BF3B' // green
// 				}, {
// 					from: 500,
// 					to: 800,
// 					color: '#DDDF00' // yellow
// 				}, {
// 					from: 800,
// 					to: 1000,
// 					color: '#DF5353' // red
// 				}]        
// 			},
		
// 			series: [{
// 				name: 'Traffic',
// 				data: hits,
// 				tooltip: {
// 					valueSuffix: ' Hits'
// 				}
// 			}]
// 		});
// 	});
// }

Dashboard.prototype.chanUsage = function (render, total, dial_in, dial_out, idle ) {
    
	var data_table = ''	
	+ '<table border="0" align="center" cellpadding="0" cellspacing="1" class="results_mini" width="50%">' 
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

Dashboard.prototype.getTopFiveData = function() {
	
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

	this.topAccessCodes('top_five' , 230, 250, x_axis, series);
}

Dashboard.prototype.topAccessCodes = function (render, height, width, x_axis, series_vals ) {

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

Dashboard.prototype.trafficGraph = function (render, height, width , hits, trafic_graph) {
    objDashboard.graph_obj = null;
	// var chart;
	
	var date =  new Date();
	var minutes = Math.abs(date.getTimezoneOffset());
	
	var time_zone_add = ( minutes * 60 * 1000);
	
	if (null == objDashboard.trafic_graph)
	{
		objDashboard.trafic_graph = new Highcharts.Chart({
			chart: {
				renderTo: render,
				type: 'spline',
				marginRight: 10,
				height: height,
				width: width				
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
							x: (time + i * 1000) + time_zone_add,
							y: 0
						});
					}
					return data;
				})()
			}]
		});
	}
	else
	{
		var series = objDashboard.trafic_graph.series[0];
	  
		var x = (new Date()).getTime(), // current time
			y = parseInt(hits);//Math.random();
			
		x = time_zone_add + x;
			
		series.addPoint([x, y], true, true);
	}
	
	return objDashboard.trafic_graph;
}			

Dashboard.prototype.chanUsageGraph = function (render, height, width, channelUsage, channels,totalChannels) {
    

	 var xmax=totalChannels;
			var s1 	  = channelUsage;
			var ticks = channels;

	if (null == usageChart)
	{					
			usageChart = new Highcharts.Chart({
				chart: {
					renderTo: render,
					type: 'column',
					height: height,
					width: width,
				},
				exporting: { enabled: false },
				title: {
					text: ''
				},
				subtitle: {
					text: ''
				},
				xAxis: {
					categories: ticks,
					allowDecimals:false,
					min:1,
					max:xmax,
					labels: {
						rotation: -45,
						align: 'right',
					}
				},
				yAxis: {
					allowDecimals:false,
					min:0,
					max:1,
					title: {
						text: 'Call Availability'
					}
				},
				legend: {
					layout: 'vertical',
					backgroundColor: '#FFFFFF',
					align: 'left',
					verticalAlign: 'top',
					x: xmax,
					y: 10,
					floating: true,
					shadow: true
				},
				tooltip: {
					formatter: function() {
						return ''+
							this.x +': '+ this.y +'';
					}
				},
				plotOptions: {
					column: {
						pointPadding: 0.2,
						borderWidth: 0
					}
				},
					series: [{
					name: 'Channels',
					data: s1,
					color: '#50B432'
				}]
			});
	}else{
		usageChart.xAxis[0].update({
           max:xmax
        });
			
		usageChart.series[0].update({
            data: s1
        });
		
	
	}

}
 
Dashboard.prototype.getHits = function(){
	var request_data = '{"action":"GET_CURRENT_HITS"}';
	// var response_data = obj_common.ajaxRequest(config.yaws_file_path + 'dashboard.yaws', request_data);
	$.ajax({
		url: config.yaws_file_path + 'dashboard.yaws',
		type: 'POST',
		contentType: "application/json; charset=utf-8",
		dataType: "json",
		data: obj_common.formatAjaxRequest(request_data),
		async: true,
		success: function(data) {
			var hitCount = parseInt(data[0].curHits);
			var totalHits = parseInt(data[0].totalHits);
			objDashboard.currTraffic('cur_traffic' , 230, 230, [hitCount], totalHits);
			graph_obj = objDashboard.trafficGraph('traffic_graph' , 250, 1000, hitCount, graph_obj);
			return graph_obj;
		}
	});
	return graph_obj;
}

Dashboard.prototype.getTopFiveShortCodes = function(){
	var request_data = '{"action":"GET_TOP_FIVE_SHORT_CODES"}';
	var response_data = obj_common.ajaxRequest(config.yaws_file_path + 'dashboard.yaws', request_data);
	if(response_data[0].status=="error"){

		uniqX=[];
		uniqY=[];
		seriesData=[{name:"Access Code",data:[]}];
		$(function () {
	   	 var chart = new Highcharts.Chart({
		                chart: {
		                    plotBackgroundColor: null,
		                    plotBorderWidth: null,
		                    plotShadow: false,
		                    renderTo: 'top_five',
		                    type: 'column'
		                },
	        title: {
	            text: ''
	        },
	        subtitle: {
	            text:''
	        },
	        xAxis: {
	            categories:uniqX,
	           labels: {
	                rotation: 300,
	               	y:1
            	}
	        },
	        yAxis: {
	            min: 0,
	            title: {
	                text: ' Hits '
	            }
	        },
	        tooltip: {
	            	headerFormat: '<span style="font-size:10px">{series.name}:{point.key}</span><table>',
	            pointFormat: '<tr><td style="font-size:10px"> hits :</td>' +
	                '<td style="font-size:10px;padding:0"><b>{point.y} </b></td></tr>',
	            footerFormat: '</table>',
	            shared: true,
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
	else{

		uniqX=[];
		uniqY=[];
		
		for(i in response_data){
			uniqX.push(response_data[i].short_code);
			uniqY.push(parseInt(response_data[i].hits));
		}
		seriesData=[{name:"Access Code",data:uniqY}];
		$(function () {
	   	 var chart = new Highcharts.Chart({
		                chart: {
		                    plotBackgroundColor: null,
		                    plotBorderWidth: null,
		                    plotShadow: false,
		                    renderTo: 'top_five',
		                    type: 'column'
		                },
	        title: {
	            text: ''
	        },
	        subtitle: {
	            text:''
	        },
	        xAxis: {
	            categories:uniqX,
	           labels: {
	                rotation: 300,
	               	y:40
            	}
	        },
	        yAxis: {
	            min: 0,
	            title: {
	                text: ' Hits '
	            }
	        },
	        tooltip: {
				headerFormat: '<span style="font-size:10px">{series.name}:{point.key}</span><table>',
	            pointFormat: '<tr><td style="font-size:10px"> hits :</td>' +
	                '<td style="font-size:10px;padding:0"><b>{point.y} </b></td></tr>',
	            footerFormat: '</table>',
	            shared: true,
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

Dashboard.prototype.getCurrentChannelUsage = function(graph_obj){

	var request_data = '{"action":"GET_CHANNEL_USAGE"}';
	// var response_data = obj_common.ajaxRequest(config.yaws_file_path + 'dashboard.yaws', request_data);

	$.ajax({
		url: config.yaws_file_path + 'dashboard.yaws',
		type: 'POST',
		contentType: "application/json; charset=utf-8",
		dataType: "json",
		data: obj_common.formatAjaxRequest(request_data),
		success: function(data) {
			var dialIn = parseInt(data[0].dialin);
			var dialOut = parseInt(data[0].dialout);
			var totalChan = parseInt(data[0].totalChan);
			objDashboard.chanUsage('chan_usage' , totalChan, dialIn, dialOut, totalChan - (dialIn + dialOut));
		}
	});
}

Dashboard.prototype.getChannelDataInfo = function(graph_obj){

	var request_data = '{"action":"GET_CURRENT_CHANNELS"}';
	var avalChanArray = new Array();
	var chanArray = new Array();
	var chanValueArr = new Array();

	$.ajax({
		url: config.yaws_file_path + 'dashboard.yaws',
		type: 'POST',
		contentType: "application/json; charset=utf-8",
		dataType: "json",
		data: obj_common.formatAjaxRequest(request_data),
		success: function(data) {
			var arrCounter = data[0].channel_monitor.length;
			var totalChannels = data[0].totalChannels;

			for(var i=0; i<arrCounter; i++) {
			   	var value = data[0].channel_monitor[i].productChannel;
			   	if(data[0].channel_monitor[i].direction != "Idle"){
			   		avalChanArray[i] = parseInt(value);
			   }
		  	}

		   	for(var i=0; i<totalChannels; i++){
		   		chanArray[i] = i.toString();
		   		if(avalChanArray.indexOf(i) > -1){
		   			chanValueArr[i] = 1;
		   		}else{
		   			chanValueArr[i] = 0;
		   		}
		   	}
		objDashboard.chanUsageGraph('chan_usage_graph' , 230, 12000, chanValueArr, chanArray,totalChannels);  
		}
	});

}

//Set page restrictions
Dashboard.prototype.setRestrictions = function() {	
	// Hide page elements by permission
	if (objApp.checkPermission('DASHBOARD')) {
		$('.graph_out').show();
	}
	else
	{
		$('.graph_out').hide();
	}	
}

// $(window).unload(function() {
// 	console.log("WindiClose called");
// 	client._send("close");
// });

// $(document).unload(function() {
// 	console.log("Close called");
// 	client._send("close");
// });


meterOptions = {  
		chart: {
		renderTo: 'cur_traffic',
            type: 'gauge',
            plotBackgroundColor: null,
            plotBackgroundImage: null,
            plotBorderWidth: 0,
            plotShadow: false
        },

        title: {
            text: ' '
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
            max: 200,

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
                to: 120,
                color: '#55BF3B', // green
				id: 'plot-band-1'
            }, {
                from: 120,
                to: 160,
                color: '#DDDF0D', // yellow
				id: 'plot-band-2'
            }, {
                from: 160,
                to: 200,
                color: '#DF5353', // red
				id: 'plot-band-3'
            }]
        },

        series: [{
            name: 'Hits',
            data: [0],
            tooltip: {
                valueSuffix: ' hits'
            }
        }]


    };

// Jquery portlet specific code
jQuery(document).ready(function() {

	objDashboard.setRestrictions();

	try{
		client.connect();
	}catch(e){
		alert("Error occured");
	}

	
	objDashboard.getTopFiveShortCodes();

	var myEvent = window.attachEvent || window.addEventListener;
	var chkevent = window.attachEvent ? 'onbeforeunload' : 'beforeunload'; /// make IE7, IE8 compitable

    myEvent(chkevent, function(e) { // For >=IE7, Chrome, Firefox
        // var confirmationMessage = 'Are you sure to leave the page?';  // a space
        // (e || window.event).returnValue = confirmationMessage;
        // return confirmationMessage;
        client._send("close");
    });


	 $('a[rel*=facybox]').facybox({
	   // noAutoload: true
	 });
	 
	 $("h2",$("#changelog")).css("cursor","pointer").click(function(){
		$(this).next().slideToggle('fast');
	 }).trigger("click");

	
	//setInterval('objDashboard.getHits(graph_obj), objDashboard.getCurrentChannelUsage(null), objDashboard.getChannelDataInfo(null)', 5000);

	// setInterval(function(){
	// 	//client.chat("say hi later");
	// 	//graph_obj = objDashboard.getHits(graph_obj);
	// 	//objDashboard.getCurrentChannelUsage(null);
	// 	//objDashboard.getChannelDataInfo(null);
	// }, 5000);

	meter = new Highcharts.Chart(meterOptions);

});

// Creating class object
var objDashboard = new Dashboard();
