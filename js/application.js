
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
		+ '<title>CSS Admin | TrueMove</title>'
  
		+ '<link rel="icon" href="images/favicon.ico" type="image/x-icon" />'
//		+ '<link rel="Shortcut Icon" href="http://10.1.80.25:8090/ldr/images/favicon.ico" type="image/x-icon" />'
		
		// Jquery library
		//+ '<script src="js/extensions/jquery-1.6.2.min.js" type="text/javascript"></script>'
		
		//<!-- jQuery 2.2.3 -->
		+ '<script src="js/files/plugins/jQuery/jquery-2.2.3.min.js"></script>'
		+ '<script src="js/extensions/jquery-1.8.3.min.js" type="text/javascript"></script>'
		+ '<script>jQuery.noConflict(true);</script>'
		
		
		// Jquery cookie management
		+ '<script src="js/extensions/jquery.cookie.js" type="text/javascript"></script>'
		// + '<script src="js/themes/jquery.ui.datepicker.js"></script>'		


		// Accordion 
		//+ '<link rel="stylesheet" href="css/themes/jquery.ui.accordion.css">'
		//+ '<link rel="stylesheet" href="css/themes/demos.css">'
		// + '<link rel="stylesheet" href="css/themes/jquery-ui.css">'
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
		// + '<link rel="stylesheet" href="css/animated-menu.css" />'
		// + '<link rel="stylesheet" href="js/extensions/jq_slide_out_menu/slide-out-menu.css" type="text/css"  />'	
		// + '<script src="js/extensions/jq_slide_out_menu/slide-out-menu.js" type="text/javascript"></script>'		
		
		// Jquery UI Dialog
		// + '<script type="text/javascript" src="js/extensions/jq_ui_dialog/jquery-ui.js"></script>'
		// + '<link rel="stylesheet" href="js/extensions/jq_ui_dialog/jquery-ui.css" type="text/css"  />'

		// Data table extensions
		// + '<script type="text/javascript" src="js/extensions/jq_data_table/jquery.dataTables.js"></script>'
		// + '<link rel="stylesheet" href="js/extensions/jq_data_table/jquery.dataTables.css">'
		
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
		// + '<link rel="stylesheet" href="js/extensions/jq_calendar/jquery.ui.datepicker.css" type="text/css" />'
		// + '<script type="text/javascript" src="js/extensions/jq_time_picker/jquery-ui-timepicker-addon.js"></script>'
		
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
		
	    // <!-- DataTables -->
	    + '<link rel="stylesheet" href="js/files/plugins/datatables/dataTables.bootstrap.css">'
		
		//<!-- Bootstrap datepicker -->
		+ '<link rel="stylesheet" href="js/files/plugins/datepicker/datepicker3.css">'
		 // <!-- Bootstrap time Picker -->
		+ '<link rel="stylesheet" href="js/files/plugins/timepicker/bootstrap-timepicker.min.css">'
		// <!-- daterange picker -->
		+ '<link rel="stylesheet" href="js/files/plugins/daterangepicker/daterangepicker.css">'
		
	    // <!-- iCheck for checkboxes and radio inputs -->
	    + '<link rel="stylesheet" href="js/files/plugins/iCheck/all.css">'
		
		// <!-- Select2 -->
		+ '<link rel="stylesheet" href="js/files/plugins/select2/select2.min.css">'
		
		//<!-- Theme style -->
		+ '<link rel="stylesheet" href="js/files/dist/css/AdminLTE.css">'
		//<!-- AdminLTE Skins. Choose a skin from the css/skins
		 //  folder instead of downloading all of them to reduce the load. -->
		+ '<link rel="stylesheet" href="js/files/dist/css/skins/_all-skins.min.css">'
		
		//<!-- NEW Theme Style by DAN -->
		+ '<link rel="stylesheet" href="css/newtheme.css">'
		
		
		//<!-- Bootstrap 3.3.6 -->
		+ '<script src="js/files/bootstrap/js/bootstrap.min.js"></script>'
		
		// <!-- Select2 -->
		+ '<script src="js/files/plugins/select2/select2.full.min.js"></script>'
		
		// <!-- date-range-picker -->
		+ '<script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.11.2/moment.min.js"></script>'
		+ '<script src="js/files/plugins/daterangepicker/daterangepicker.js"></script>'
		//<!-- bootstrap datepicker -->
		+ '<script src="js/files/plugins/datepicker/bootstrap-datepicker.js"></script>'
		// <!-- bootstrap time picker -->
		+ '<script src="js/files/plugins/timepicker/bootstrap-timepicker.min.js"></script>'
		
		// <!-- DataTables -->
		+ '<script src="js/files/plugins/datatables/jquery.dataTables.js"></script>'
		+ '<script src="js/files/plugins/datatables/dataTables.bootstrap.js"></script>'
		
		// <!-- iCheck 1.0.1 -->
		+ '<script src="js/files/plugins/iCheck/icheck.min.js"></script>'
		
		//<!-- SlimScroll 1.3.0 -->
		+ '<script src="js/files/plugins/slimScroll/jquery.slimscroll.min.js"></script>'
		
		//<!-- FastClick -->
		+ '<script src="js/files/plugins/fastclick/fastclick.js"></script>'
		
		//<!-- AdminLTE App -->
		+ '<script src="js/files/dist/js/app.min.js"></script>'
		
		
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
	
	
	var menu = this.getMainMenu();
	
	var banner = ''
		
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
							+ '<a href="#" onClick="objApp.logout()">'
							  + '<i class="fa fa-sign-out text-spark"></i> Logout </a>'
						  + '</li>'
						+ '</ul>'
					  + '</li>'
					+ '</ul>'
				  + '</li>'
				 // <!-- Control Sidebar Toggle Button -->
				  // + '<li>'
					// + '<a href="#"><i class="fa fa-info-circle"></i></a>'
				  // + '</li>'
				+ '</ul>'
			  + '</div>'

			+ '</nav>'
		+ '</header>'
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
				+ menu
			  + ' </ul>'
			+ ' </section>'
			// <!-- /.sidebar -->
		+ ' </aside>'; 		

	return banner;
}

// Generate footer
Application.prototype.checkPermission = function(permissionList) {
	
	var matched = false;	
			
	var allowed_permissions = gPermissions;
	permissions = permissionList.split(",");		
	
	if ("" != permissions) {
		for (var i in permissions) {
			if(allowed_permissions.indexOf(permissions[i]) > 0 ) {
				matched = true;
				break;
			}
		}
	}
		
	return matched;
}

Application.prototype.getMainMenu = function() {
	
    var new_items = [
		{"level":"1","name":"Home", "url":"home", "permission_list":"","image":"fa fa-dashboard","sub_menu":false, "ignore":true},
		{"level":"1","name":"Subscription", "url":"subscription", "permission_list":"css_subscriber_view,css_subscriber_delete,css_subscriber_register,css_service_create,css_service_view,css_service_delete,css_service_update,css_content_provider_create,css_content_provider_view,css_content_provider_delete,css_content_provider_update,css_channel_create,css_channel_view,css_channel_delete","image":"fa fa-bar-chart",
		"sub_menu":[{"name":"Search Subscriber", "url":"subscriber_search", "permission_list":"css_subscriber_view,css_subscriber_delete","sub_menu":false},
					{"name":"Register", "url":"subscriber_register", "permission_list":"css_subscriber_register","sub_menu":false},
					{"name":"Create Service", "url":"service_create", "permission_list":"css_service_create","sub_menu":false},
					{"name":"Search Service", "url":"service_search", "permission_list":"css_service_view,css_service_delete,css_service_update","sub_menu":false},
					{"name":"Create Content Provider", "url":"provider_create", "permission_list":"css_content_provider_create","sub_menu":false},
					{"name":"Search Content Provider", "url":"provider_search", "permission_list":"css_content_provider_view,css_content_provider_delete,css_content_provider_update","sub_menu":false},
					{"name":"Create Channel", "url":"channel_create", "permission_list":"css_channel_create","sub_menu":false},
					{"name":"Search Channel", "url":"channel_search", "permission_list":"css_channel_view,css_channel_delete","sub_menu":false}]},
		{"level":"1","name":"Monitor", "url":"monitor", "permission_list":"css_monitor_summary,css_monitor_subscription,css_monitor_scheduler,css_monitor_sms,css_monitor_intec,css_monitor_hpov","image":"fa fa-bar-chart",
					"sub_menu":[{"name":"Summary", "url":"monitor_summary", "permission_list":"css_monitor_summary","sub_menu":false},
								{"name":"Subscription", "url":"monitor_subscription", "permission_list":"css_monitor_subscription","sub_menu":false},
								{"name":"Scheduler", "url":"monitor_scheduler", "permission_list":"css_monitor_scheduler","sub_menu":false},
								{"name":"SMS(Realtime)", "url":"monitor_sms", "permission_list":"css_monitor_sms","sub_menu":false},
								{"name":"Intec", "url":"monitor_intec", "permission_list":"css_monitor_intec","sub_menu":false},
								{"name":"HPOV Alarm", "url":"monitor_hpov", "permission_list":"css_monitor_hpov","sub_menu":false}]},								
		{"level":"1","name":"User", "url":"user", "permission_list":"css_user_create,css_user_view,css_user_delete,css_user_update,css_group_create,css_group_view,css_group_delete,css_group_update","image":"fa fa-bar-chart",
					"sub_menu":[{"name":"Create User", "url":"user_create", "permission_list":"css_user_create","sub_menu":false},
								{"name":"Search User", "url":"user_search", "permission_list":"css_user_view,css_user_delete,css_user_update","sub_menu":false},
								{"name":"Create Group", "url":"group_create", "permission_list":"css_group_create","sub_menu":false},
								{"name":"Search Group", "url":"group_search", "permission_list":"css_group_view,css_group_delete,css_group_update","sub_menu":false}]},
		{"level":"1","name":"Configurations", "url":"configurations", "permission_list":"css_config_general,css_config_content_provider,css_config_operator_create,css_config_operator_view,css_config_operator_delete,css_config_operator_update,css_config_sms_platform_create,css_config_sms_platform_view,css_config_sms_platform_delete,css_config_sms_platform_update,css_config_sms_message,css_config_hpov_message","image":"fa fa-cogs",		
					"sub_menu":[{"level":"2","name":"Application", "url":"application", "permission_list":"css_config_general,css_config_content_provider,css_config_operator_create,css_config_operator_view,css_config_operator_delete,css_config_operator_update",
								"sub_menu":[{"level":"3","name":"General", "url":"config_general", "permission_list":"css_config_general"},
											{"level":"3","name":"Content Provider", "url":"config_content_provider", "permission_list":"css_config_content_provider"},
											{"level":"3","name":"Create Operator", "url":"config_operator_create", "permission_list":"css_config_operator_create"},
											{"level":"3","name":"Search Operator", "url":"config_operator_search", "permission_list":"css_config_operator_view,css_config_operator_delete,css_config_operator_update"}]},
								{"level":"2","name":"SMS", "url":"sms", "permission_list":"css_config_sms_platform_create,css_config_sms_platform_view,css_config_sms_platform_delete,css_config_sms_platform_update,css_config_sms_message",
								"sub_menu":[{"level":"3","name":"Create SMS Platform", "url":"config_sms_create_platform", "permission_list":"css_config_sms_platform_create"},
											{"level":"3","name":"Search SMS Platform", "url":"config_sms_search_platform", "permission_list":"css_config_sms_platform_view,css_config_sms_platform_delete,css_config_sms_platform_update"},
											{"level":"3","name":"SMS Message", "url":"config_sms_message", "permission_list":"css_config_sms_message"}]},
								{"name":"HPOV Message", "url":"config_hpov", "permission_list":"css_config_hpov_message","sub_menu":false},]},
		{"level":"1","name":"Reports", "url":"reports", "permission_list":"css_report_daily,css_report_monthly,css_report_sla,css_report_transaction,css_report_service,css_report_subscription","image":"fa fa-bar-chart",
					"sub_menu":[{"name":"Daily Report", "url":"report_daily", "permission_list":"css_report_daily","sub_menu":false},
								{"name":"Monthly Report", "url":"report_monthly", "permission_list":"css_report_monthly","sub_menu":false},
								{"name":"SLA Report", "url":"report_sla", "permission_list":"css_report_sla","sub_menu":false},
								{"name":"Transaction Report", "url":"report_transaction", "permission_list":"css_report_transaction","sub_menu":false},
								{"name":"Service Report", "url":"report_service", "permission_list":"css_report_service","sub_menu":false},
								{"name":"Subscription Report", "url":"report_subscription", "permission_list":"css_report_subscription","sub_menu":false}]},								
	];	
	 
 	main_menu = this.getMainMenuSet(new_items, 'services-icon.png');
	
	return main_menu; 
}

// Generate left hand side main menu
Application.prototype.getMainMenuSet = function(items, image) {

	var level1 = false;
	var level2 = false;
	var level3 = false;
	var level4 = false;

	var URL  = window.location.pathname;
	var page = URL.substring(URL.lastIndexOf('/') + 1); 

	switch (page) {
		// dashboard
		case "home":
			level1 = "home";
			break;
			
		// reports and logs
		case "subscriber_search":
			level1 = "subscription";
			level2 = "subscriber_search"; 
			break;
			
		case "subscriber_register":
			level1 = "subscription";
			level2 = "subscriber_register";
			break;
			
		case "service_create":
			level1 = "subscription";
			level2 = "service_create";
			break;
			
		case "service_search":
			level1 = "subscription";
			level2 = "service_search";
			break;
			
		case "provider_create":
			level1 = "subscription";
			level2 = "provider_create";
			break;
			
		case "provider_search":
			level1 = "subscription";
			level2 = "provider_search";
			break;

		case "channel_create":
			level1 = "subscription";
			level2 = "channel_create";
			break;

		case "channel_search":
			level1 = "subscription";
			level2 = "channel_search";
			break;			
			
		case "monitor_summary":
			level1 = "monitor";
			level2 = "monitor_summary";
			break;
			
		case "monitor_subscription":
			level1 = "monitor";
			level2 = "monitor_subscription";
			break;	
			
		case "monitor_scheduler":
			level1 = "monitor";
			level2 = "monitor_scheduler";
			break;	

		case "monitor_sms":
			level1 = "monitor";
			level2 = "monitor_sms";
			break;

		case "monitor_intec":
			level1 = "monitor";
			level2 = "monitor_intec";
			break;

		case "monitor_hpov":
			level1 = "monitor";
			level2 = "monitor_hpov";
			break;	

		case "user_create":
			level1 = "user";
			level2 = "user_create";
			break;	
			
		case "user_search":
			level1 = "user";
			level2 = "user_search";
			break;	

		case "group_create":
			level1 = "user";
			level2 = "group_create";
			break;				

		case "group_search":
			level1 = "user";
			level2 = "group_search";
			break;				
		
		case "config_general":
			level1 = "configurations";
			level2 = "application";
			level3 = "config_general";
			break;  
		
		case "config_content_provider":
			level1 = "configurations";
			level2 = "application";
			level3 = "config_content_provider";
			break;	

		case "config_operator_create":
			level1 = "configurations";
			level2 = "application";
			level3 = "config_operator_create";
			break;		

		case "config_operator_search":
			level1 = "configurations";
			level2 = "application";
			level3 = "config_operator_search";
			break;	

		case "config_sms_create_platform":
			level1 = "configurations";
			level2 = "sms";
			level3 = "config_sms_create_platform";
			break;

		case "config_sms_search_platform":
			level1 = "configurations";
			level2 = "sms";
			level3 = "config_sms_search_platform";
			break;	

		case "config_sms_message":
			level1 = "configurations";
			level2 = "sms";
			level3 = "config_sms_message";
			break;

		case "config_hpov":
			level1 = "configurations";
			level2 = "config_hpov";
			break;	

		case "report_daily":
			level1 = "reports";
			level2 = "report_daily";
			break;

		case "report_monthly":
			level1 = "reports";
			level2 = "report_monthly";
			break;

		case "report_sla":
			level1 = "reports";
			level2 = "report_sla";
			break;	

		case "report_transaction":
			level1 = "reports";
			level2 = "report_transaction";
			break;	

		case "report_service":
			level1 = "reports";
			level2 = "report_service";
			break;

		case "report_subscription":
			level1 = "reports";
			level2 = "report_subscription";
			break;				
	}	

	menu_set = '';
	
    for (var i in items) {
		
        if (this.checkPermission(items[i].permission_list) || items[i].ignore == 'true') {
			
			var sub_menu = items[i].sub_menu;
			
			var css = (level1 == items[i].url ? "active" : "treeview");
			
			if(sub_menu) 
			{				
				menu_set += '<li class="' + css + '"><a href="#"><i class="' + items[i].image + '"></i><span>' + items[i].name + '</span><span class="pull-right-container"><i class="fa fa-angle-left pull-right"></i></span></a>';
				menu_set += '<ul class="treeview-menu">';
				
				for (var j in sub_menu) {
					if (this.checkPermission(sub_menu[j].permission_list) || sub_menu[j].ignore == 'true') {
						
						var first_sub_menu = sub_menu[j].sub_menu;
						
						var css = (level2 == sub_menu[j].url ? "active" : "treeview");
						
						if(first_sub_menu)
						{
							menu_set += '<li class="' + css + '"><a href="#"><i class="fa fa-circle-o"></i>' + sub_menu[j].name + '<span class="pull-right-container"><i class="fa fa-angle-left pull-right"></i></span></a>';
							menu_set += '<ul class="treeview-menu">';
							
							for (var k in first_sub_menu) {
								if (this.checkPermission(first_sub_menu[k].permission_list) || first_sub_menu[k].ignore == 'true') {
									
									var second_sub_menu = first_sub_menu[k].sub_menu;
									
									var css = (level3 == first_sub_menu[k].url ? "active" : "treeview");
									
									if(second_sub_menu)
									{					
										menu_set += '<li class="' + css + '"><a href="#"><i class="fa fa-circle-o"></i>' + second_sub_menu[k].name + '<span class="pull-right-container"><i class="fa fa-angle-left pull-right"></i></span></a>';
										menu_set += '<ul class="treeview-menu">';
										
										for (var l in second_sub_menu) {
											if (this.checkPermission(second_sub_menu[l].permission_list) || second_sub_menu[l].ignore == 'true') {
												
												var third_sub_menu = second_sub_menu[l].sub_menu;
												
												var css = (level4 == first_sub_menu[l].url ? "active" : "treeview");
												
												if(third_sub_menu)
												{						
													menu_set += '<li class="' + css + '"><a href="#"><i class="fa fa-circle-o"></i>' + third_sub_menu[l].name + '<span class="pull-right-container"><i class="fa fa-angle-left pull-right"></i></span></a>';
													menu_set += '<ul class="treeview-menu">';
												}
												else				
												{
													menu_set += '<li class="' + css + '"><a href="' + second_sub_menu[l].url + '"><i class="fa fa-circle-o"></i>' + second_sub_menu[k].name + '</a></li>';
												}
											}
										}										
									}
									else				
									{
										menu_set += '<li class="' + css + '"><a href="' + first_sub_menu[k].url + '"><i class="fa fa-circle-o"></i>' + first_sub_menu[k].name + '</a></li>';
									}									
								}
							}
							menu_set += '</ul>';
							menu_set += '</li>';							
						}
						else		 		
						{	 					 
							menu_set += '<li class="' + css + '"><a href="' + sub_menu[j].url + '"><i class="fa fa-circle-o"></i>' + sub_menu[j].name + '</a></li>';
						}
					}
				}
				menu_set += '</ul>';
				menu_set += '</li>';				
			}
			else
			{	
				menu_set += '<li class="' + css + '"><a href="' + items[i].url + '"><i class="' + items[i].image + '"></i> <span>' + items[i].name + '</span></a>';
			}			
        }
    }
	menu_set += '</ul>';
	menu_set += '</li>';	
	
	return menu_set;
}

Application.prototype.getFooter = function() {
	
	var footer =  ''
		+ '<footer class="main-footer">'
			+ '<div class="pull-right hidden-xs"> CSS Admin Version 1.0 </div>'
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


