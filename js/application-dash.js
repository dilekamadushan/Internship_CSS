
/** To store user permissions. Global variable **/
gPermissions = "";

/*
 * Application class which handle GUI structure generating
 * functionalities
 */
function Application() {
	
}

/*Function to handle IE Compatibility*/

function getInternetExplorerVersion()
// Returns the version of Internet Explorer or a -1
// (indicating the use of another browser).
{
  var rv = -1; // Return value assumes failure.
  if (navigator.appName == 'Microsoft Internet Explorer')
  {
    var ua = navigator.userAgent;
    var re  = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
    if (re.exec(ua) != null)
      rv = parseFloat( RegExp.$1 );
  }
  return rv;
}


function checkVersion()
{
  var msg = "You're not using Internet Explorer.";
  var ver = getInternetExplorerVersion();

  if ( ver > -1 )
  {
    if ( ver >= 8.0 ) 
      msg = "You're using a recent copy of Internet Explorer."
    else
      msg = "You should upgrade your copy of Internet Explorer.";
  }
  return ver;
}

/*End of the function set to handle IE Compatibility*/


/**   
 * Having difficulties to keep permissions on cookie or session
 * So load permissions on each page request
 */
Application.prototype.loadPermissions = function() {

	var request_data = '{"action":"GET_SESSION_INFO"}';
	var response_data = obj_common.ajaxRequest("yaws/yaws_session.yaws", request_data);
	
	gPermissions = response_data[0].permissions;
}


// Header HTML part
Application.prototype.getHeader = function() { 
	
	var header = ''

	+ '<head>'
		+ '<title>Wavenet Spark | IVR ADMIN</title>'
  
		+ '<link rel="icon" href="images/favicon.ico" type="image/x-icon" />'
		
		// Jquery library
		//+ '<script src="js/extensions/jquery-1.6.2.min.js" type="text/javascript"></script>'
		
		//<!-- jQuery 2.2.3 -->
		+ '<script src="js/files/plugins/jQuery/jquery-2.2.3.min.js"></script>'
		+ '<script src="js/extensions/jquery-1.8.3.min.js" type="text/javascript"></script>'
		+ '<script>jQuery.noConflict(true);</script>'
		
		
		// Jquery cookie management
		+ '<script src="js/extensions/jquery.cookie.js" type="text/javascript"></script>'
		+ '<script src="js/themes/jquery.ui.datepicker.js"></script>'		


		// Accordion 
		//+ '<link rel="stylesheet" href="css/themes/jquery.ui.accordion.css">'
		//+ '<link rel="stylesheet" href="css/themes/demos.css">'
		+ '<link rel="stylesheet" href="css/themes/jquery-ui.css">'
		//+ '<script src="js/themes/jquery.ui.core.js"></script>'
		//+ '<script src="js/themes/jquery.ui.widget.js"></script>'
		//+ '<script src="js/themes/jquery.ui.accordion.js"></script>'		
		
		// Jquery session management
		+ '<script src="js/extensions/jquery.session.js" type="text/javascript"></script>'
		
			
		// Jquery validation engine
		+ '<link rel="stylesheet" href="js/extensions/jq_validator_engine/validationEngine.jquery.css" type="text/css" />'
		+ '<script type="text/javascript" src="js/extensions/jq_validator_engine/jquery.validationEngine.js"></script>'
		+ '<script type="text/javascript" src="js/extensions/jq_validator_engine/jquery.validationEngine-en.js"></script>'		
		
		// Jquery animated menu
		+ '<link rel="stylesheet" href="css/animated-menu.css" />'
		+ '<link rel="stylesheet" href="js/extensions/jq_slide_out_menu/slide-out-menu.css" type="text/css"  />'	
		+ '<script src="js/extensions/jq_slide_out_menu/slide-out-menu.js" type="text/javascript"></script>'		
		
		// Jquery UI Dialog
		+ '<script type="text/javascript" src="js/extensions/jq_ui_dialog/jquery-ui.js"></script>'
		+ '<link rel="stylesheet" href="js/extensions/jq_ui_dialog/jquery-ui.css" type="text/css"  />'

		// Data table extensions
		+ '<script type="text/javascript" src="js/extensions/jq_data_table/jquery.dataTables.js"></script>'
		+ '<link rel="stylesheet" href="js/extensions/jq_data_table/jquery.dataTables.css">'
		
		// Jquery Pagination
		+ '<script type="text/javascript" src="js/extensions/jq_smartpaginator/smartpaginator.js"></script>'
		+ '<link rel="stylesheet" href="js/extensions/jq_smartpaginator/smartpaginator.css" type="text/css"/>'
		
		// Jquery Ajax File Upload
		+ '<script type="text/javascript" src="js/extensions/jq_ajax_upload/ajaxupload.3.5.js"></script>'
		+ '<link rel="stylesheet" href="js/extensions/jq_ajax_upload/styles.css" type="text/css"/>'		

		// Highcharts
		// + '<script type="text/javascript" src="js/extensions/highcharts/js/highcharts.js"></script>'
		// + '<script type="text/javascript" src="js/extensions/highcharts/js/highcharts-more.js"></script>'
		+ '<script type="text/javascript" src="js/extensions/highcharts/js/highcharts-4.0.4.src.js" ></script>'
		+ '<script type="text/javascript" src="js/extensions/highcharts/js/highcharts-more-4.0.4.js" ></script>'
		+ '<script type="text/javascript" src="js/jquery-ui.min.js"></script>'
		+ '<link rel="stylesheet" href="css/facybox.css" type="text/css" />'
		+ '<script type="text/javascript" src="js/facybox.js"></script>'
//		+ '<script type="text/javascript" src="js/exporting.js"></script>'

		
		// Custom files
		+ '<script type="text/javascript" src="js/config/config.js"></script>'
		+ '<script type="text/javascript" src="js/common.js"></script>'
		+ '<link rel="stylesheet" href="css/style.css" type="text/css" />'

		// Form component styles
		+ '<link rel="stylesheet" href="css/form.css" type="text/css" />'
		
		// Time picker
		+ '<link rel="stylesheet" href="js/extensions/jq_calendar/jquery.ui.datepicker.css" type="text/css" />'
		+ '<script type="text/javascript" src="js/extensions/jq_time_picker/jquery-ui-timepicker-addon.js"></script>'
		
		//Excel upload and download handling
		/*+ '<script type="text/javascript" src="js/extensions/excel_handling/jszip.js"></script>'
		+ '<script type="text/javascript" src="js/extensions/excel_handling/jszip-deflate.js"></script>'
		+ '<script type="text/javascript" src="js/extensions/excel_handling/jszip-load.js"></script>'
		+ '<script type="text/javascript" src="js/extensions/excel_handling/jszip-inflate.js"></script>'
		+ '<script type="text/javascript" src="js/extensions/excel_handling/xlsx.js"></script>'			*/
		
			
		//<!-- Bootstrap 3.3.6 -->
		+ '<link rel="stylesheet" href="js/files/bootstrap/css/bootstrap.min.css">'
		//<!-- Font Awesome -->
		+ '<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.5.0/css/font-awesome.min.css">'
		//<!-- Ionicons -->
		+ '<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/ionicons/2.0.1/css/ionicons.min.css">'
		//<!-- Theme style -->
		+ '<link rel="stylesheet" href="js/files/dist/css/AdminLTE.css">'
		//<!-- AdminLTE Skins. Choose a skin from the css/skins
		 //  folder instead of downloading all of them to reduce the load. -->
		+ '<link rel="stylesheet" href="js/files/dist/css/skins/_all-skins.min.css">'
		
		//<!-- NEW Theme Style by DAN -->
		+ '<link rel="stylesheet" href="css/newtheme.css">'
		
		//<!-- Bootstrap 3.3.6 -->
		+ '<script src="js/files/bootstrap/js/bootstrap.min.js"></script>'
		//<!-- FastClick -->
		+ '<script src="js/files/plugins/fastclick/fastclick.js"></script>'
		//<!-- AdminLTE App -->
		+ '<script src="js/files/dist/js/app.min.js"></script>'
		//<!-- SlimScroll 1.3.0 -->
		+ '<script src="js/files/plugins/slimScroll/jquery.slimscroll.min.js"></script>'
	+ '</head>';
	
	return header;
}

// Generate top banner
Application.prototype.getTopBanner = function() {  
	 
	objApp.loadPermissions(); // Load user permissions
	var obj_common = new Common();
	var YAWS_PATH = config.yaws_file_path + 'yaws_session.yaws';
	var request_data = '{"action":"GET_SESSION_INFO"}';
	var response_data = obj_common.ajaxRequest(YAWS_PATH, request_data);
	
	var banner = ''
		
		// + '<div class="Log-header">'
			// + '<div class="headlogo">'
				// + '<div class="rightlogo_in">'
					// //+ '<div>&nbsp;&nbsp; <a href="#" onClick="objApp.mainPage()">Main Page</a></span>&nbsp;&nbsp; | &nbsp;&nbsp;' + response_data[0].session_data.name + ' &nbsp;&nbsp;<span class="green">|&nbsp;&nbsp; <a href="#" onClick="objApp.logout()">Logout</a></div>'
					// + '<div class="log_Out">&nbsp;<a href="#" onClick="objApp.mainPage()">Main Page</a>&nbsp;&nbsp;|&nbsp;&nbsp;'+ response_data[0].session_data.display_name + '&nbsp;&nbsp;|&nbsp;&nbsp;<a href="#" onClick="objApp.logout()">logout</a></div>'
				// + '</div>'
			// + '</div>'
		// + '</div>';
		
		
		// <!-- *#__dan__#* New Header *#__dan__#* -->
		+ '<header class="main-header">'

			// <!-- Logo -->
			+ '<a href="home" class="logo">'
			  // <!-- mini logo for sidebar mini 50x50 pixels -->
			  + '<span class="logo-mini"><img src="images/WN_logo_globe.png" style="width: 70%;" /></span>'
			  // <!-- logo for regular state and mobile devices -->
			  + '<span class="logo-lg"><img src="images/logo-spark.png" style="width: 100%;" /></span>'
			+ '</a>'

			// <!-- Header Navbar: style can be found in header.less -->
			+ '<nav class="navbar navbar-static-top">'
			  // <!-- Sidebar toggle button-->
			  + '<a href="#" class="sidebar-toggle" data-toggle="offcanvas" role="button">'
				+ '<span class="sr-only">Toggle navigation</span>'
			  + '</a>'
			  // <!-- Navbar Right Menu -->
			  + '<div class="navbar-custom-menu">'
				+ '<ul class="nav navbar-nav" style="width: auto; height: auto;">'
				  // <!-- User Account: style can be found in dropdown.less -->
				  + '<li class="dropdown notifications-menu" style="width: auto; height: auto;">'
					+ '<a href="#" class="dropdown-toggle" data-toggle="dropdown">'
					  + '<span class="hidden-xs">' + response_data[0].session_data.display_name + '</span> &nbsp;'
					  + '<i class="fa fa-angle-down"></i>'
					+ '</a>'
					+ '<ul class="dropdown-menu" style="width: auto; height: auto;">'
					  + '<li style="width: auto; height: auto;">'
						+ '<ul class="menu" style="width: auto !important; height: 82px !important; max-height: 82px !important;">'
						  + '<li style="width: auto; height: auto;">'
							+ '<a href="#">'
							  + '<i class="fa fa-users text-spark"></i> Account Settings </a>'
						  + '</li>'
						  + '<li>'
							+ '<a href="#">'
							  + '<i class="fa fa-sign-out text-spark"></i> Logout </a>'
						  + '</li>'
						+ '</ul>'
					  + '</li>'
					+ '</ul>'
				  + '</li>'
				 // <!-- Control Sidebar Toggle Button -->
				  + '<li>'
					+ '<a href="#"><i class="fa fa-info-circle"></i></a>'
				  + '</li>'
				+ '</ul>'
			  + '</div>'

			+ '</nav>'
		+ '</header>'
		
	return banner;
}

// Generate left hand side main menu
Application.prototype.getMainMenuSet = function(name, items) {
	var has_permission = false;
  	
  	if(parseInt(checkVersion())<9 && parseInt(checkVersion())>0){
		var menu_set = '<li><a class="text-2" href="'+items[0].url+'">' + name + '</a>';
	}else{
		var menu_set = '<li><a class="text-2" href="#">' + name + '</a>';
	}

	menu_set += '<ul>';
	
	for (var i in items) {
		
		if (this.checkPermission(items[i].permission_list)) {
			menu_set += '<li><a href="' + items[i].url + '">' + items[i].name + '</a></li>';
			has_permission = true;
			
		}
	}
	
	menu_set += '</ul>';
	menu_set += '</li>';
	
	// If there is only one item no sub menu is required then set to parent link
	if (items.length == 1 && has_permission) {
		menu_set = '<li><a class="text-2" href="' + items[0].url + '">' + items[0].name + '</a>'
	}
	
	if (has_permission) {
		return menu_set;
	} else {
		return '';
	}
}

// Generate footer
Application.prototype.checkPermission = function(permissionList) {
	
	//return true;
	
	var matched = false;	
			
	var allowed_permissions = gPermissions;
	permissions = permissionList.split(",");		
	
	if ("" != permissions) {
		for (var i in permissions) {
			//if (eval('/\\|' + permissions[i] + '\\|/').test(allowed_permissions)) {
			if(allowed_permissions.indexOf(permissions[i]) > 0 ) {
				matched = true;
			}
		}
	}
		
	return matched;
}

Application.prototype.getMainMenu = function() {
	
	// var home_menu_items = [
		// {"name":"Home", "url":"home", "permission_list":"ivr_view_dashboard","ignore":"true"},
	// ];

	// var dash_menu_items = [
		// {"name":"Dashboard", "url":"dashboard", "permission_list":"ivr_view_dashboard"},
	// ];
	
	// var reports_logs_menu_items = [
	 	// {"name":"Live Circuit Utilization", "url":"live_circuit_util", "permission_list":"ivr_view_live_circuit_util"},
	 	// {"name":"Circuit Utilization", "url":"circuit_utilization", "permission_list":"ivr_view_circuit_utilization"},
	 	// {"name":"Hits Counter Report", "url":"hits_counter_report", "permission_list":"ivr_view_hits_counter_report"},
	 	// {"name":"Duration Cumulative Report", "url":"duration_cumulative_report", "permission_list":"ivr_view_duration_cumulative_report"},
	 	// {"name":"Failure Report", "url":"failure_report", "permission_list":"ivr_view_failure_report"},
	 	// {"name":"QoS/Performance Report", "url":"qos_report", "permission_list":"ivr_view_qos_report"},
	 	// {"name":"CDR Log Search", "url":"cdr_log_search", "permission_list":"ivr_cdr_log_search"}
	 // ];
	
	// var configuration_menu_items = [
		// {"name":"Other Settings", "url":"other_settings", "permission_list":"ivr_edit_general_configs,ivr_edit_http_configs,ivr_edit_digit_configs,ivr_edit_record_configs,ivr_edit_play_configs,ivr_edit_codec_configs,ivr_edit_silence_detection_configs,ivr_edit_rtcp_configs,ivr_edit_fax_configs,ivr_edit_amr_configs,ivr_edit_numberlist_configs,ivr_edit_ivrstatus_configs,ivr_edit_snmp_configs,ivr_edit_channelwise_app_logs,ivr_edit_channelwise_platform_logs,ivr_edit_numberwise_app_logs,ivr_edit_numberwise_platform_logs,ivr_edit_trace_numbers,ivr_view_amr_configs,ivr_view_channelwise_app_logs,ivr_view_channelwise_platform_logs,ivr_view_codec_configs,ivr_view_dashboard,ivr_view_digit_configs,ivr_view_fax_configs,ivr_view_general_configs,ivr_view_hits_counter_report,ivr_view_http_configs,ivr_view_ivrstatus_configs,ivr_view_numberlist_configs,ivr_view_numberwise_app_logs,ivr_view_numberwise_platform_logs,ivr_view_play_configs,ivr_view_record_configs,ivr_view_rtcp_configs,ivr_view_silence_detection_configs,ivr_view_trace_numbers"},
		// {"name":"Manage Access Codes", "url":"create_access_code", "permission_list":"ivr_create_access_code,ivr_view_access_codes_table,ivr_view_access_code,ivr_edit_access_code,ivr_delete_access_code"}
	// ];

	// var app_logs_menu_items = [
		// {"name":"Admin Log", "url":"admin_log_search", "permission_list":"ivr_log_search"},
		// {"name":"Activity Log", "url":"activity_log_search", "permission_list":"ivr_activity_search"},
		// {"name":"Trace Log", "url":"trace_log", "permission_list":"ivr_trace_search"},
		// {"name":"Web Services Log", "url":"web_services_log", "permission_list":"ivr_web_service_log_search"}		
	// ];

	var main_menu = ''		
		// + '<div class="leftManu">'
			// + '<div id="dhtmlgoodies_slidedown_menu">'
				// + '<ul id="mainContainer">'
				// + '<br />'
				// + this.getMainMenuSet('Home', home_menu_items)
				// + this.getMainMenuSet('Dashboard', dash_menu_items)
				// + this.getMainMenuSet('Reports and Logs', reports_logs_menu_items)
				// + this.getMainMenuSet('Configurations', configuration_menu_items) 
				// + this.getMainMenuSet('App Log Search', app_logs_menu_items)
				// + '<br/>'
				// + '</ul>'
			  	// + '<script type="text/javascript">initSlideDownMenu();</script>'
			// + '</div>'
		// + '</div>';
		
		
		//  <!-- Left side column. contains the logo and sidebar -->
		+ '<aside class="main-sidebar">'
			// <!-- sidebar: style can be found in sidebar.less -->
			+ '<section class="sidebar">'
			 // <!-- search form -->
			  + '<form action="#" method="get" class="sidebar-form">'
				+ '<div class="input-group">'
				  + '<input type="text" name="q" class="form-control" placeholder="Search...">'
					  + '<span class="input-group-btn">'
						+ '<button type="submit" name="search" id="search-btn" class="btn btn-flat"><i class="fa fa-search"></i>'
						+ '</button>'
					  + '</span>'
				+ '</div>'
			  + '</form>'
			 //  <!-- /.search form -->
			  // <!-- sidebar menu: : style can be found in sidebar.less -->
			  + '<ul class="sidebar-menu">'
				+ '<li class="header">MAIN NAVIGATION</li>'
				+ '<li class="active">'
				  + '<a href="dashboard"><i class="fa fa-dashboard"></i> <span>Dashboard</span></a>'
				+ ' </li>'
				+ ' <li class="treeview">'
				  + ' <a href="#">'
					+ ' <i class="fa fa-bar-chart"></i> <span>Reports and Logs</span>'
					+ ' <span class="pull-right-container">'
					  + ' <i class="fa fa-angle-left pull-right"></i>'
					+ ' </span>'
				  + ' </a>'
				  + ' <ul class="treeview-menu">'
					// + ' <li><a href="#"><i class="fa fa-circle-o"></i> Live Circuit Utilization</a></li>'
					+ ' <li><a href="hits_counter_report"><i class="fa fa-circle-o"></i> Hits Counter Report</a></li>'
					+ ' <li><a href="duration_cumulative_report"><i class="fa fa-circle-o"></i> Duration Cumulatice Report</a></li>'
					+ ' <li><a href="failure_report"><i class="fa fa-circle-o"></i> Failure Report</a></li>'
					+ ' <li><a href="qos_report"><i class="fa fa-circle-o"></i> QoS/Performance Report</a></li>'
					+ ' <li><a href="cdr_log_search"><i class="fa fa-circle-o"></i> CDR Log Search</a></li>'
					// + ' <li>'
					  // + ' <a href="#"><i class="fa fa-circle-o"></i> Cluster'
						// + ' <span class="pull-right-container">'
						  // + ' <i class="fa fa-angle-left pull-right"></i>'
						// + ' </span>'
					  // + ' </a>'
					  // + ' <ul class="treeview-menu">'
						// + ' <li><a href="router_cluster_signalling-nodes.html"><i class="fa fa-circle-o"></i> Signalling Nodes</a></li>'
						// + ' <li><a href="router_cluster_mo-nodes.html"><i class="fa fa-circle-o"></i> MO Nodes</a></li>'
						// + ' <li><a href="#"><i class="fa fa-circle-o"></i> MMSC Nodes</a></li>'
						// + ' <li><a href="#"><i class="fa fa-circle-o"></i> MT Nodes</a></li>'
						// + ' <li><a href="#"><i class="fa fa-circle-o"></i> SMPP Nodes</a></li>'
						// + ' <li><a href="#"><i class="fa fa-circle-o"></i> VAS Nodes</a></li>'
						// + ' <li><a href="#"><i class="fa fa-circle-o"></i> Firewall Nodes</a></li>'
						// + ' <li>'
						  // + ' <a href="#"><i class="fa fa-circle-o"></i> Hub Nodes'
							// + ' <span class="pull-right-container">'
							 // + '  <i class="fa fa-angle-left pull-right"></i>'
							// + ' </span>'
						 // + '  </a>'
						  // + ' <ul class="treeview-menu">'
							// + ' <li><a href="#"><i class="fa fa-circle-o"></i> Level Three</a></li>'
							// + ' <li><a href="#"><i class="fa fa-circle-o"></i> Level Three</a></li>'
						  // + ' </ul>'
						// + ' </li>'
					  // + ' </ul>'
					// + ' </li>'
				  + ' </ul>'
				+ ' </li>'
				+ ' <li class="treeview">'
				  + ' <a href="#">'
					+ ' <i class="fa fa-cogs"></i> <span>Configurations</span>'
					+ ' <span class="pull-right-container">'
					  + ' <i class="fa fa-angle-left pull-right"></i>'
					+ ' </span>'
				  + ' </a>'
				  + ' <ul class="treeview-menu">'
					+ ' <li><a href="other_settings"><i class="fa fa-circle-o"></i> Other Settings</a></li>'
					+ ' <li><a href="create_access_code"><i class="fa fa-circle-o"></i> Manage Access Codes</a></li>'
				  + ' </ul>'
				+ ' </li>'
				+ ' <li class="treeview">'
				  + ' <a href="#">'
					+ ' <i class="fa fa-list-alt"></i> <span>App Log Search</span>'
					+ ' <span class="pull-right-container">'
					  + ' <i class="fa fa-angle-left pull-right"></i>'
					+ ' </span>'
				  + ' </a>'
				  + ' <ul class="treeview-menu">'
					+ ' <li><a href="admin_log_search"><i class="fa fa-circle-o"></i> Admin Log</a></li>'
					+ ' <li><a href="activity_log_search"><i class="fa fa-circle-o"></i> Activity Log</a></li>'
					+ ' <li><a href="trace_log"><i class="fa fa-circle-o"></i> Trace Log</a></li>'
					+ ' <li><a href="web_services_log"><i class="fa fa-circle-o"></i> Web Services Log</a></li>'
				  + ' </ul>'
				+ ' </li>'
			  + ' </ul>'
			+ ' </section>'
			// <!-- /.sidebar -->
		+ ' </aside>';
		
	return main_menu; 
}

Application.prototype.getFooter = function() {
	
	var footer =  ''
		+ '<footer class="main-footer">'
			+ '<div class="pull-right hidden-xs"> SPARK Version 3.0 </div>'
			+ '<strong>Copyright &copy; 2017 <a href="http://www.globalwavenet.com/" target="_blank">Globalwavenet</a>.</strong> All rights reserved.'
		+ '</footer>';

		//'<div class="copyright">' + config.copyright + '</div>';
	
	return footer;
}

// Setting flash messages
// Possible type options - success, error, info
Application.prototype.setFlash = function(type, message, scrollTop) { 
	var flash_msg = '<div id="flash-inner" class="flash-' + type + '"><div class="in">' + message + '</div></div>';
	jQuery('#flash-msg').html(flash_msg);
	jQuery('#flash-inner').animate({opacity: 1.0}, 5000).fadeOut('slow');
	if (false != scrollTop) {
		$('html, body').animate({scrollTop:0}, 'slow');
	}
}

Application.prototype.setLocalFlash = function(type, message,location) { 
	var flash_msg = '<div id="'+location.substring(1)+'inner" class="flash-' + type + '"><div class="in">' + message + '</div></div>';
	$(location).html(flash_msg);
	$(location+"inner").animate({opacity: 1.0}, 5000).fadeOut('slow');

}

Application.prototype.isLogged = function() {
	
	var path = window.location.pathname;
	var page = path.substring(path.lastIndexOf('/') + 1);
	alert('dd');
	if (page != 'login.html' && !$.cookie('is_logged')) {
		location.href = 'login.html';
	}
}

Application.prototype.logout = function() {  
	$(location).attr('href', "logout");
}

/**
 * Goto main page
 */
Application.prototype.mainPage = function() {
	$(location).attr('href', "main_page");
}

var objApp = new Application();

