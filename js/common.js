// Common class
function Common() {
	
}

Common.prototype.formatDuration = function (duration) {
    sec_numb    = parseInt(duration);
    var hours   = Math.floor(sec_numb / 3600);
    var minutes = Math.floor((sec_numb - (hours * 3600)) / 60);
    var seconds = sec_numb - (hours * 3600) - (minutes * 60);

    if (hours   < 10) {hours   = "0"+hours;}
    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}
    var time    = hours+':'+minutes+':'+seconds;
    return time;
}


Common.prototype.valReadonlyReq = function (id) {
	if (!$(id).is('[readonly]')) {
		if ($(id).val() == "") {
			return "* This field is required";
		}
	}
}

/**
 * Policy: only numeric values separated from comma
 * @param {String} CLI to be checked
 * @return {Boolean} true or false
 */
Common.prototype.checkBlockList = function(field) 
{
	var cli = field.val();
	//var cliPolicy = /^[0-9]{1,3}([0-9],[0-9]{1,3})*$/;	// this will valid more than 4 charator length.not 3

	var cliPolicy =/^(\d+(,\d+)*)?$/;// /^[0-9]{0,3}([0-9],[0-9]{0,3})*$/;

//console.log(field.val().match(cliPolicy));
console.log(cli);

	if (!(/^\d+([,]\d+)*$/.test(cli))) 
	{
		return "Input must be comma seperated integers";
	}
	return true;
}

/**
 * Policy: comma separated string or integer values without leading or trailing spaces
 * @param {String} CLI to be checked
 * @return {Boolean} true or false
 */
Common.prototype.checkBlockListCharacters = function(field) 
{
	var cli = field.val();
	//var cliPolicy = /^[0-9]{1,3}([0-9],[0-9]{1,3})*$/;	// this will valid more than 4 charator length.not 3

	var cliPolicy =/^(\S+(,\S+)*)?$/;// /^[0-9]{0,3}([0-9],[0-9]{0,3})*$/;

//console.log(field.val().match(cliPolicy));

	if (!(/^\S+([,]\S+)*$/.test(cli))) 
	{
		return "Input must be comma separated string or integer values without leading or trailing spaces";
	}
	return true;
}

/**
 * Policy: only numeric values separated from comma
 * @param {String} CLI to be checked
 * @return {Boolean} true or false
 */
Common.prototype.checkAllZero = function(field) 
{
	if ((field.val())*1 == 0)
	{
		return "Insert non zero value";
	}
	else if(field.val().substr(0,1) == '0')
	{
		return "Enter the number with out front zero."; 
	}
	else if (-1 != field.val().indexOf("+") || -1 != field.val().indexOf("-"))
	{
		return "Not a valid integer";
	}
	return true;
}

/**
 * Check Duplicate
 * @param {String} CLI to be checked
 * @return {Boolean} true or false
 */
Common.prototype.checkDuplicate = function(field) 
{
 	var value = field.val(); 
 	value = value.split(",");
 	
	for(var key in value) 
	{
		var obj = value.pop();
		if(value.indexOf(obj) != -1) 
		{
			return "Duplicate dosen't allowed'";
		}
	}
	return true
}

Common.prototype.getCurrentDateValues = function( type, value) {
	
	var currentDate = new Date();
	var day 		 = currentDate.getDate();
	var month 	 = currentDate.getMonth() + 1;
	var year 	 	 = currentDate.getFullYear();
	var hour 		 = currentDate.getHours();
//alert(year);
//alert(month);
//alert(hour);	
	var monthNames = [ "January", "February", "March", "April", "May", "June", 
                        "July", "August", "September", "October", "November", "December" ];
	
	switch(type)
	{
		case "month":
			ret_val = year + "/" + month;
			break;
		case "day":
			ret_val = day;
			break;
		case "cur_year":
			ret_val = year;
			break;
		case "cur_month":
			ret_val = month;
			break;
		case "cur_day":
			ret_val = day;	
			break;			
		case "cur_hour":
		
			if( hour > 12)
			{
				hour = (hour % 12) + " pm";
			}
			else
			{
				hour = hour + " am";
			}
			
			ret_val = hour;
			break;
		case "get_month":	
			ret_val = monthNames[value - 1];			
			break;			
		default:
			ret_val = year + "/" + month + "/" + day;
	}		
	
	return  ret_val;
}


Common.prototype.genHeading = function(report, time_frame, time_val, type, country_val, country) {

	var heading = '';

	heading += report + " " + time_frame + " Report [";

	switch(time_frame)
	{
		case "minutely":
			heading += this.getCurrentDateValues('') + " - " + this.getCurrentDateValues('cur_hour') + "]";
			break;
		case "hourly":
			heading += this.getCurrentDateValues('month') + "/" + time_val + "]";
			break;
		case "daily":
			heading += this.getCurrentDateValues('cur_year') + " " + this.getCurrentDateValues('get_month', time_val) + "]";
			break;
		case "monthly":
			heading += time_val + "]";
			break;
		case "yearly":
			cur_year 		= this.getCurrentDateValues('cur_year');
			start_year 	= cur_year - 5;
			heading += start_year + " - " + cur_year + "]";
			break;			
		default:
			//code to be executed if n is different from case 1 and 2
	}

	return heading;
}

Common.prototype.trim = function(str) {
	return str.replace(/\s+/g, ' ');
}

Common.prototype.validateUsername = function(field, rule, i, options) {

	var uid_len = field.val().length;
	
	if (config.username_min_len > uid_len || config.username_max_len < uid_len) {
		return "Username length should be between " + config.username_min_len + " to " + config.username_max_len;
	}
}

Common.prototype.validateNumber = function(field, rule, i, options) {

	if (!field.val().match(config.number_validation)) {
		return "Please enter a valid number. (Ex : 947*******)";
	}
}

Common.prototype.validateMsisdn = function(field, rule, i, options) {

	if (!field.val().match(config.msisdn_validation)) {
		return "Please enter a valid number. (Ex : 9475*******)";
	}
}

Common.prototype.validateVirtualMsisdn=function(field, rule,i,options){
	if(!field.val().match(config.virtualMSISDN960)){
		return "* Virtual MSISDN should starts with 960";
	}
	if(!field.val().match(config.virtualMSISDNLength)){
		return "* Virtual MSISDN length should be 10 digits";
	}
}

Common.prototype.validateIpPart = function(field, rule, i, options) {

	var value = field.val();
	
	if(isNaN(value)){
		return "* Numbers only";
	}
	if (value > 255 || value < 0) {
		return "Please enter a valid number between 0 - 255";
	}
	if(/\./.test(value)){
		return "Decimal points are not permitted";
	}
}

Common.prototype.validateIp = function(field, rule, i, options) {

	if (!field.val().match(config.ip_validation)) {
		return "Please enter a valid IP";
	}
}

/**
 * Policy: Validate backward-slash is not to be included
 * @param {String} CLI to be checked
 * @return {Boolean} true or false
 */
Common.prototype.validateBackwardSlash = function(field) {
	var value = field.val();
	if ((/[\[\]{}()\\]/).test(value)) {
		return "* \\,{,}(,),[,] characters are not allowed";
	}
}

Common.prototype.validate_Port = function(field, rule, i, options) {
	var value = field.val();
	
	if(isNaN(value)){
		return "* Numbers only";
	}
	if (value == 0) {
		return "Zero is not permitted";
	}
	if(value<0){
		return "Negative numbers are not permitted";
	}
	if(/\./.test(value)){
		return "Decimal points are not permitted";
	}
}

Common.prototype.validateMcc = function(field, rule, i, options) {

	var value 	  = field.val();
	var value_len = value.length;
	
	var n = value.search(",");
	
	if( n > 0 )
	{
		var res = value.split(","); 
		
		for (var i in res) 
		{
			value = res[i];
			var value_len 	= value.length;
			
			var j = ++i;
			var val_txt = "in MCC value " + j;
			
			if(isNaN(value)){
				return "* Numbers only";
			}

			if (value_len != 3) {
				return "Please enter a valid MCC.(Length is 3)";
			}
			if(value == 0){
				return "MCC cannot be a 0 ";
			}
			
			if(value.charAt(0) == 0)
			{ 
				if(value.charAt(1) == 0)
				{
					return "Please enter a valid MCC.(Can not start with 0)";
				}
				else
				{ 
					return "Please enter a valid MCC.(Can not start with 0)";
				}
			}			
		}
	}
	else
	{	
		if(isNaN(value)){
			return "* Numbers only";
		}

		if (value_len != 3) {
			return "Please enter a valid MCC.(Length is 3)";
		}
		
		if(value == 0){
			return "MCC cannot be a 0";
		}
		
		if(value.charAt(0) == 0)
		{ 
			if(value.charAt(1) == 0)
			{
				return "Please enter a valid MCC.(Can not start with 0)";
			}
			else
			{ 
				return "Please enter a valid MCC.(Can not start with 0)";
			}
		}
	}	
}

Common.prototype.validateMnc = function(field, rule, i, options) {

	var value 	= field.val();
	var value_len 	= value.length;
	
	if(isNaN(value)){
		return "* Numbers only";
	}
	
	if (value_len != 3 && value_len != 2) {
		return "Please enter a valid MNC.(Length is 2 or 3)";
	}
	
	if(value == 0){
		return "MCC cannot be a 0";
	}
}

Common.prototype.getYears = function()
{
	var theYear;
	var yearCounter;
	var theDate = new Date();
	
	year  = theDate.getFullYear();
	start = year - 5;
	
	var str = '';

	for (yearCounter = start; yearCounter <= year; yearCounter++)
	{
		theYear = yearCounter;
		str += '<option value="' + theYear + '">' + theYear + '</option>';
	}
	
	$('#years').html(str);
}

Common.prototype.getMonths = function()
{
	var theMonth;
	var monthCounter;
	var theDate = new Date();
	
	month = theDate.getMonth();
	month++;
	
	var str = '';

	for (monthCounter = 0; monthCounter < month; monthCounter++)
	{
		theDate.setMonth(monthCounter);
		theMonth = theDate.toString();
		theMonth = theMonth.substr(4,3);
		str += '<option value="' + (monthCounter + 1) + '">' + theMonth + '</option>';
	}
	
	$('#months').html(str);
}

Common.prototype.getDays = function()
{
	var theDay;
	var dayCounter;
	var monthDays;
	var theDate = new Date();
	
	month = theDate.getMonth();
	year  = theDate.getFullYear();	
	var day = theDate.getDate();
	
	month++;

	monthDays = new Date(year, month, 0).getDate();

	var str = '';

	for (dayCounter = 1; dayCounter <= day; dayCounter++)
	{
		str += '<option value="' + dayCounter + '">' + dayCounter + '</option>';
	}
	
	$('#days').html(str);
}

Common.prototype.getMax = function(array) {	
	return Math.max.apply( Math, array );
}

Common.prototype.getInterval = function(number) {
	
	var interval = false;

	//if(number)
	//{
		if (number < 16)
		{
			interval = 1;
		}
	//}
	
	return interval;
}

Common.prototype.reportChart = function( x_axis, y_axis, render_to, heading, x_text, y_text, max) {

	interval = this.getInterval(max);
	
	if(interval)
	{	
		var chart = new Highcharts.Chart({
		  chart: { 
			 renderTo: render_to,
			 type: 'line',
			 marginRight: 70,
			 marginBottom: 40
		  },
		  title: {
			 text: heading,
			 x: -20 //center
		  },
		  subtitle: {
			 text: '',
			 x: -20
		  },
		  xAxis: {
			 min: 0,
			 title: {
				text: x_text
			 },		  
			 categories: x_axis
		  },
		  yAxis: {
			 min: 0,
			 tickInterval: interval,
			 title: {
				text: y_text
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
				    this.x +': '+ this.y;
			 }
		  },
		  legend: {
			 layout: 'vertical',
			 align: 'right',
			 verticalAlign: 'top',
			 x: 0,
			 y: 10,
			 borderWidth: 0
		  },
		  
		  series: y_axis
		});	
	}
	else
	{
		var chart = new Highcharts.Chart({
		  chart: { 
			 renderTo: render_to,
			 type: 'line',
			 marginRight: 70,
			 marginBottom: 40
		  },
		  title: {
			 text: heading,
			 x: -20 //center
		  },
		  subtitle: {
			 text: '',
			 x: -20
		  },
		  xAxis: {
			 min: 0,
			 title: {
				text: x_text
			 },		  
			 categories: x_axis
		  },
		  yAxis: {
			 min: 0,
			 title: {
				text: y_text
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
				    this.x +': '+ this.y;
			 }
		  },
		  legend: {
			 layout: 'vertical',
			 align: 'right',
			 verticalAlign: 'top',
			 x: 0,
			 y: 10,
			 borderWidth: 0
		  },
		  
		  series: y_axis
		});	
	}	
}



Common.prototype.usageReportChart = function( x_axis, y_axis, render_to, heading, x_text, y_text, max) {


	var i=0;

	for(i=0;i<3;i++){
	interval = this.getInterval(max[i]);

		if(interval)
		{	
			var chart = new Highcharts.Chart({
			  chart: { 
				 renderTo: render_to[i],
				 type: 'line',
				 marginRight: 70,
				 marginBottom: 40
			  },
			  title: {
				 text: heading[i],
				 x: -20 //center
			  },
			  subtitle: {
				 text: '',
				 x: -20
			  },
			  xAxis: {
				 min: 0,
				 title: {
					text: x_text[i]
				 },		  
				 categories: x_axis[i]
			  },
			  yAxis: {
				 min: 0,
				 tickInterval: interval,
				 title: {
					text: y_text[i]
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
					    this.x +': '+ this.y;
				 }
			  },
			  legend: {
				 layout: 'vertical',
				 align: 'right',
				 verticalAlign: 'top',
				 x: 0,
				 y: 10,
				 borderWidth: 0
			  },
			  
			  series: y_axis[i]
			});	
		}
		else
		{
			var chart = new Highcharts.Chart({
			  chart: { 
				 renderTo: render_to[i],
				 type: 'line',
				 marginRight: 70,
				 marginBottom: 40
			  },
			  title: {
				 text: heading[i],
				 x: -20 //center
			  },
			  subtitle: {
				 text: '',
				 x: -20
			  },
			  xAxis: {
				 min: 0,
				 title: {
					text: x_text[i]
				 },		  
				 categories: x_axis[i]
			  },
			  yAxis: {
				 min: 0,
				 title: {
					text: y_text[i]
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
					    this.x +': '+ this.y;
				 }
			  },
			  legend: {
				 layout: 'vertical',
				 align: 'right',
				 verticalAlign: 'top',
				 x: 0,
				 y: 10,
				 borderWidth: 0
			  },
			  
			  series: y_axis[i]
			});	
		}	
	}
}



Common.prototype.dashBoardChart = function( x_axis, y_axis, render_to, heading, x_text, y_text, height, width, max) {
	
	interval = this.getInterval(max);
	
	if(interval)
	{	
		var chart = new Highcharts.Chart({
		  chart: { 
			 renderTo: render_to,
			 type: 'line',
			 marginRight: 20,
			 marginBottom: 40,
			 height: height, 
			 width: width
		  },
		  title: {
			 text: heading,
			 x: -20 //center
		  },
		  subtitle: {
			 text: '',
			 x: -20
		  },
		  xAxis: {
			 min: 0,
			 title: {
				text: x_text
			 },		  
			 categories: x_axis
		  },
		  yAxis: {
			 min: 0,
			 tickInterval: interval,
			 title: {
				text: y_text
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
				    this.x +': '+ this.y;
			 }
		  },
		  legend: {
			 layout: 'vertical',
			 align: 'right',
			 verticalAlign: 'top',
			 x: 0,
			 y: 10,
			 borderWidth: 0
		  },
		  
		  series: y_axis
		});	
	}
	else
	{
		var chart = new Highcharts.Chart({
		  chart: { 
			 renderTo: render_to,
			 type: 'line',
			 marginRight: 20,
			 marginBottom: 40,
			 height: height, 
			 width: width
		  },
		  title: {
			 text: heading,
			 x: -20 //center
		  },
		  subtitle: {
			 text: '',
			 x: -20
		  },
		  xAxis: {
			 min: 0,
			 title: {
				text: x_text
			 },		  
			 categories: x_axis
		  },
		  yAxis: {
			 min: 0,
			 title: {
				text: y_text
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
				    this.x +': '+ this.y;
			 }
		  },
		  legend: {
			 layout: 'vertical',
			 align: 'right',
			 verticalAlign: 'top',
			 x: 0,
			 y: 10,
			 borderWidth: 0
		  },
		  
		  series: y_axis
		});	
	}
}
// Ajax file upload
// btnUpload = '#btn_upload'
// status = '#status' 
// allowedExt = jpg|png|txt
Common.prototype.ajaxFileUpload = function(url, btnUpload, status, allowedExt, callbkObject, otherParams) {
 
	var btnUpload = $(btnUpload); 
	var status = $(status);
	
	new AjaxUpload(btnUpload, {
		action: url,
		type: 'POST',
		name: otherParams,
		//data: '{"aruna":"test"}',
		dataType: "json",
		async:false,
		onSubmit: function(file, ext){
			 if (!(ext && eval("/^(" + allowedExt + ")$/").test(ext))){ 
				// Extension is not allowed 
				status.text('Only ' + allowedExt + ' files are allowed');
				$('#ok').hide();
				return false;
			}
			//this.setData({'example_key': 'value'});
			$('#uploading').show();
			$('#ok').hide();
		},
		onComplete: function(file, response){
			// On completion clear the status
			$('#uploading').hide();
			$('#ok').show();
			status.text('');
			//alert(response);
			callbkObject.uploadCallBack(response);
		}
	});
}

// Making AJAX request
Common.prototype.ajaxRequest = function(url, requestData) {

	var session_data = '{"username":"' + $.cookie('username') + '","uniqid":"' + $.cookie('uniqid') + '"}';
	requestData = '[' + requestData + ',' + session_data + ']';

	var response = $.ajax({
		url: url,
		type: 'POST',
		contentType: "application/json; charset=utf-8",
		dataType: "json",
		data: requestData,
	    async:false,
		success: function(data) {
			return data;
	},
	
	error: function() {
		return '{"status":"error", "reason":"ajax request fail"}'; 
	}}).responseText;

	
	return jQuery.parseJSON(response);
}

Common.prototype.formatAjaxRequest = function(requestData){
	var session_data = '{"username":"' + $.cookie('username') + '","uniqid":"' + $.cookie('uniqid') + '"}';
	requestData = '[' + requestData + ',' + session_data + ']';
	return requestData;
}

// Resetting form elements
Common.prototype.resetForm = function($form) {
    $form.find('input:text, input:password, input:file, select, textarea').val('');
	$form.find('input:text, input:password, input:file, select, textarea').attr('readonly', false);	
    $form.find('input:radio, input:checkbox').removeAttr('checked').removeAttr('selected');
}

//Retrieve URL get parameters
Common.prototype.getParameterByName = function(name) {
	
  name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
  var regexS = "[\\?&]" + name + "=([^&#]*)";
  var regex = new RegExp(regexS);
  var results = regex.exec(window.location.search);
  if(results == null)
    return "";
  else
    return decodeURIComponent(results[1].replace(/\+/g, " "));
}

Common.prototype.str_replace = function(search, replace, subject, count) {
  // http://kevin.vanzonneveld.net
  // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +   improved by: Gabriel Paderni
  // +   improved by: Philip Peterson
  // +   improved by: Simon Willison (http://simonwillison.net)
  // +    revised by: Jonas Raoni Soares Silva (http://www.jsfromhell.com)
  // +   bugfixed by: Anton Ongson
  // +      input by: Onno Marsman
  // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +    tweaked by: Onno Marsman
  // +      input by: Brett Zamir (http://brett-zamir.me)
  // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +   input by: Oleg Eremeev
  // +   improved by: Brett Zamir (http://brett-zamir.me)
  // +   bugfixed by: Oleg Eremeev
  // %          note 1: The count parameter must be passed as a string in order
  // %          note 1:  to find a global variable in which the result will be given
  // *     example 1: str_replace(' ', '.', 'Kevin van Zonneveld');
  // *     returns 1: 'Kevin.van.Zonneveld'
  // *     example 2: str_replace(['{name}', 'l'], ['hello', 'm'], '{name}, lars');
  // *     returns 2: 'hemmo, mars'
  var i = 0,
    j = 0,
    temp = '',
    repl = '',
    sl = 0,
    fl = 0,
    f = [].concat(search),
    r = [].concat(replace),
    s = subject,
    ra = Object.prototype.toString.call(r) === '[object Array]',
    sa = Object.prototype.toString.call(s) === '[object Array]';
  s = [].concat(s);
  if (count) {
    this.window[count] = 0;
  }

  for (i = 0, sl = s.length; i < sl; i++) {
    if (s[i] === '') {
      continue;
    }
    for (j = 0, fl = f.length; j < fl; j++) {
      temp = s[i] + '';
      repl = ra ? (r[j] !== undefined ? r[j] : '') : r[0];
      s[i] = (temp).split(f[j]).join(repl);
      if (count && s[i] !== temp) {
        this.window[count] += (temp.length - s[i].length) / f[j].length;
      }
    }
  }
  return sa ? s : s[0];
}


Common.prototype.stringMatch =  function (sentence, word) {

	var regex = new RegExp('\\b' + word + '\\b');
	var result = regex.test(sentence);
	
	return result;
}

Common.prototype.checkAll = function(field)
{
	for (i = 0; i < field.length; i++) {
		field[i].checked = true ;
	}
}

Common.prototype.uncheckAll = function(field)
{
	for (i = 0; i < field.length; i++) {	
		field[i].checked = false ;
	}
}

/**
 * Select/Unselect checkboxes in a table
 * @param {String} mainChkName Controlling checkbox id
 * @param {String} chkGroupName Controlled checkbox group name
 */
Common.prototype.checkUncheckAll = function (mainChkName, chkGroupName){
	if($('#' + mainChkName).prop('checked')) {
		$("input[name^='"+ chkGroupName +"']:visible").prop('checked', true);
		//document.getElementsByName('chk_number').setAttribute('checked', 'checked');
		//$("input[name^='"+ chkGroupName +"'][type=checkbox]:not(:visible)").prop('checked', false);;
	} else {
		$("input[name^='"+ chkGroupName +"'][type=checkbox]").prop('checked', false);;
	}
}

Common.prototype.validateDateDurationWebServiceLogSearch = function(field, rule, i, options) {
	if(obj_common.formatDateTimeWithSecond($('#webToDate').val(),$('#webToTime').val()) < obj_common.formatDateTimeWithSecond($('#webFromDate').val(),$('#webFromTime').val())){
		return "* To Date must be larger than From Date";
	}
	
}
Common.prototype.validateDurationRestrictionWebServiceLogSearch = function(field, rule, i, options) {
	if((new Date($('#webToDate').val()+" "+$('#webToTime').val()) - new Date($('#webFromDate').val()+" "+$('#webFromTime').val())) > 3600000){
		return "* Searchable duration should not be larger than an hour";
	}
	
}

Common.prototype.validateDateDuration = function(field, rule, i, options) {
	if(obj_common.formatDateTime($('#toDate').val(),$('#actToTime').val()) < obj_common.formatDateTime($('#fromDate').val(),$('#actFromTime').val())){
		return "* To Date must be larger than From Date";
	}
	
}
Common.prototype.validateDurationRestriction = function(field, rule, i, options) {
	if((new Date($('#toDate').val()+" "+$('#actToTime').val()) - new Date($('#fromDate').val()+" "+$('#actFromTime').val())) > 3600000){
		return "* Searchable duration should not be larger than an hour";
	}
	
}

Common.prototype.configurableDateDurationValidator = function(field, rule, i, options) {
	if(obj_common.formatDateTimeWithSecond($('#toDate').val(),$('#end_time').val()) < obj_common.formatDateTimeWithSecond($('#fromDate').val(),$('#start_time').val())){
		return "* To Date must be larger than From Date";
	}
	
}

Common.prototype.configurableDurationRestrictionValidator = function(field, rule, i, options) {
	if((new Date($('#toDate').val()+" "+$('#end_time').val()) - new Date($('#fromDate').val()+" "+$('#start_time').val())) > config.timeDurationRestriction){
		return "* Searchable duration should not be larger than " + (((config.timeDurationRestriction)/3600)/1000) + " hours";
	}
	
}

Common.prototype.formatDateTime = function(date, time) {
	var date_arr = date.split("/");
	var time_arr = time.split(":");
	return date_arr[0].substring(2,4)  + date_arr[1] + date_arr[2] + time_arr[0] + time_arr[1];	
}

Common.prototype.formatDateTimeWithSecond = function(date, time) {
	var date_arr = date.split("/");
	var time_arr = time.split(":");
	return date_arr[0].substring(2,4)  + date_arr[1] + date_arr[2] + time_arr[0] + time_arr[1] + time_arr[2];	
}
Common.prototype.is_int = function(input){
	return !isNaN(input)&&parseInt(input)==input;
}

Common.prototype.uniqid = function() {
	var newDate = new Date;
	return newDate.getTime();
}

var obj_common = new Common();

function readTextFile(file)
{
	alert("Got it");
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                var allText = rawFile.responseText;
                alert(allText);
            }
        }
    }
    rawFile.send(null);
}
