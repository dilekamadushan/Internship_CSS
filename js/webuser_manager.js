	/*
 * WebuserManager class which handles webuser managment $('#checkbox').is(':checked'); vfvevejjjjjttttmmmmmmm
 */
var cur_page = 0;
var data = "";
var response_data; 
var logRetrievalInterval;
var selected_recs="";
var session_ ="";

function WebuserManager() {
	
}


WebuserManager.prototype.GetProviders = function() {
	
	var request_data = '{"action":"GET_ALL_PROVIDERS"}';
	var response_data = obj_common.ajaxRequest(config.yaws_file_path + 'css_provider_manager.yaws', request_data); 
	
	if(response_data.data.length > 0){
		//Fill provider drop down
		var options = $("#provider_names");
		$("#provider_names").empty();
		$.each(response_data.data, function(item) {
			options.append($("<option />").val(response_data.data[item][0]).text(response_data.data[item][1]));
		});
	}	
}

WebuserManager.prototype.AddWebuser = function() {
	
	var username	    =	1;
	var passwrd		    =	2;
	var description	    =	3;
	var effective_date	=	'2014-12-31 23:59:59';
	var expire_date	    =	'2014-12-31 23:59:59';
	var provider_id		=	6;
	var type	        =	7;
	var stats		    =	8;
	var created_dttm	=	'9997-12-31 23:59:59';
	var created_user	=	10;
	var updated_dttm	=	'1999-12-31 23:59:59';
	var updated_user	=	12;
	

	var request_data = '{"action":"CREATE","username":"'+username+'", "password":"'+passwrd+'", "description":"'+description+'",	"effective_date":"'+effective_date+'", "expire_date":"'+expire_date+'", "provider_id":"'+provider_id+'", "type":"'+type+'" , "status":"'+stats+'", "created_user":"'+created_user+'", "updated_user":"'+updated_user+'" }';
	var response_data = obj_common.ajaxRequest(config.yaws_file_path + 'css_webuser_manager.yaws', request_data);

	
	if(response_data[0].status == "ok"){
		objApp.setFlash('success', response_data[0].message);
	}
	else{
		objApp.setFlash('error', response_data[0].message);
	}	
};

WebuserManager.prototype.SearchWebuser = function() {  
   

	var username 			= "";
	var groupname			= "";
    var providername        = "";	
	
	data_table = $('#search_user_tbl').DataTable( { 
		"aoColumnDefs": [
		{"aTargets": [2],
			 "mRender": function (data, type, full) {
					return full[2] == 1 ? "Enabled" : "Disabled";	

			}
		},{"aTargets": [3],
			 "mRender": function (data, type, full) {
					var link_del = ''
					+'<button type="button" class="btn btn-box-tool btn-box-table-inner" data-toggle="modal" data-target="#confirmDelete" data-row_id="' + full[3] + '" title="Delete" data-original-title="Delete">'
						+'<i class="fa fa-trash-o"></i>'
					+'</button>'
					return link_del; 		

			}
		}
		,{ 'bSortable': false, 'aTargets': [-1,-2,-3] },{ "bSearchable": false,'aTargets': [-1] }], 
		"processing": true,
		"bDestroy": true,
		"bFilter":false,
		"serverSide": true,
		"ajax": {
			"url": config.yaws_file_path + "css_webuser_manager.yaws",
			 "data": function ( d ) {
				d.action = "SEARCH",
				d.username = username,
				d.groupname = groupname,
				d.providername = providername; 
			},
			"complete": function(response) { 

				res = JSON.parse(response.responseText);
				
				if(error = res['err'])
				{
					objApp.setFlash('error', error);
				}
			}
		}
	} );
}

WebuserManager.prototype.deleteConfirm = function (number) {
	
	$('#confirmDelete').show();
	
}

var objWebuserManager = new WebuserManager();

jQuery(document).ready(function() {

	//Load Data into the table in the view
    objWebuserManager.GetProviders();
	objWebuserManager.SearchWebuser();

	
	
	//Search Channel form
	$('#frm_webuser').validationEngine({'custom_error_messages' : {
	     }
	 });

	$("#dialog-confirm").hide();
	//Button binding
	$('#create_webuser').bind("click", function () {
		if(!$("#frm_webuser").validationEngine('validate')) {
			return false; 
		}
		objWebuserManager.AddWebuser(); 
		return false;
	});
	
	$('#search_webuser').bind("click", function () {
		if(!$("#frm_webuser").validationEngine('validate')) {
			return false; 
		}
		objWebuserManager.SearchChannel(); 
		return false;
	});

});