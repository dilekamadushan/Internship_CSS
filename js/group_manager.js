	/*
 * GroupManager class which handles group managment
 */
var cur_page = 0;
var data = "";
var response_data; 
var logRetrievalInterval;
var selected_recs="";
var session_ ="";

function GroupManager() {
	
}

GroupManager.prototype.CreateGroup = function() {
	
	var group_name	               =	$('#name').val();
	var description		       =	$('#description').val();
	var status		           =	1;
	var viewGroup              =  4;
    var viewSubscriberService  =  1;     
    var viewCPService          =  2;    
    var viewSubscribeCPService =   3;  	
	
	var request_data    = '{"action":"CREATE","group_name":"'+group_name+'", "description":"'+description+'", "status":"'+status+'" }';
	var response_data   = obj_common.ajaxRequest(config.yaws_file_path + 'css_group_manager.yaws', request_data); 
	if(response_data[0].status == "ok"){
		objApp.setFlash('success', response_data[0].message);
	}
	else{
		objApp.setFlash('error', response_data[0].message);
	}	
};

GroupManager.prototype.SearchGroup = function() { 

	var group_name 			=	$('#group_name').val();
	var key_word				=	$('#keyword').val();	
	
	data_table = $('#search_group_tbl').DataTable( { 
		"aoColumnDefs": [{"aTargets": [2],
						 "mRender": function (data, type, full) {
								var link_del = ''
								+'<button type="button" class="btn btn-box-tool btn-box-table-inner" onClick="objGroupManager.deleteConfirm(\'' + full[2] + '\')" data-toggle="modal"  title="Delete" data-original-title="Delete">'
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
			"url": config.yaws_file_path + "css_group_manager.yaws",
			 "data": function ( d ) {
				d.action = "SEARCH",
				d.group_name = group_name,
				d.key_word = key_word; 
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

GroupManager.prototype.deleteConfirm = function (number) {
	
	$('#confirmDelete').show();
	
}

var objGroupManager = new GroupManager();

jQuery(document).ready(function() {

	//Load DB Data
	objGroupManager.SearchGroup();
	
	// Create Group form
	 $('#frm_group').validationEngine({'custom_error_messages' : {
	     }
	 });

	$("#dialog-confirm").hide();
	
	//Search Group form
	$('#frm_group_search').validationEngine({'custom_error_messages' : {
	     }
	 });

	$("#dialog-confirm").hide();
	//Button binding
	$('#create_group').bind("click", function () {
		if(!$("#frm_group").validationEngine('validate')) {
			return false; 
		}
		objGroupManager.CreateGroup(); 
		return false;
	});
	
	$('#search_group').bind("click", function () {
		if(!$("#frm_group_search").validationEngine('validate')) {
			return false; 
		}
		objGroupManager.SearchGroup(); 
		return false;
	});

});