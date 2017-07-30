	/*
 * ChannelManager class which handles channel managment
 */
var cur_page = 0;
var data = "";
var response_data; 
var logRetrievalInterval;
var selected_recs="";
var session_ ="";

function ChannelManager() {
	
}

ChannelManager.prototype.AddChannel = function() {
	
	var channel_name	=	$('#channel_name').val();
	var key_word		=	$('#keyword').val();
	var sms_notify_chck =	$('#sms_notify_check:checked').length > 0 ? 1 : 0;
	
	var request_data = '{"action":"CREATE","channel_name":"' + channel_name + '", "key_word":"' + key_word + '", "notify_sms":"' + sms_notify_chck + '" }';
	var response_data = obj_common.ajaxRequest(config.yaws_file_path + 'css_channel_manager.yaws', request_data); 
	
	if(response_data[0].status == "ok"){
		objApp.setFlash('success', response_data[0].message);
		$('#channel_name').val("");
		$('#keyword').val("");
	}
	else{
		objApp.setFlash('error', response_data[0].message);
	}	
};

ChannelManager.prototype.SearchChannel = function() { 

	var channel_name 	=	$('#channel_name').val() ? $('#channel_name').val() : null;
	var key_word		=	$('#keyword').val() ? $('#keyword').val() : null;	
	
	data_table = $('#search_channel_tbl').DataTable( { 
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
			"url": config.yaws_file_path + "css_channel_manager.yaws",
			 "data": function ( d ) {
				d.action = "SEARCH",
				d.channel_name = channel_name,
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

ChannelManager.prototype.RemoveChannel = function(){
	
	let row_id = $('#removeChannel').attr("data-row_id");
	
	var request_data = '{"action":"DELETE_CHANNEL","channel_id":"'+row_id+'" }';
	var response_data = obj_common.ajaxRequest(config.yaws_file_path + 'css_channel_manager.yaws', request_data); 
	
	if(response_data[0].status == "ok"){
		objApp.setFlash('success', response_data[0].message);
		//Load DB Data
		objChannelManager.SearchChannel();
	}
	else{
		objApp.setFlash('error', response_data[0].message);
	}	
	
	$('#confirmDelete').modal('toggle');
	return false;
}

var objChannelManager = new ChannelManager();

jQuery(document).ready(function() {

	//Load DB Data
	objChannelManager.SearchChannel();
	
	// Create Channel form
	 $('#frm_channel').validationEngine({'custom_error_messages' : {
	     }
	 });

	$("#dialog-confirm").hide();
	
	//Search Channel form
	$('#frm_channel_search').validationEngine({'custom_error_messages' : {
	     }
	 });

	$("#dialog-confirm").hide();
	//Button binding
	$('#create_channel').bind("click", function () {
		if(!$("#frm_channel").validationEngine('validate')) {
			return false; 
		}
		objChannelManager.AddChannel(); 
		return false;
	});
	
	$('#search_channel').bind("click", function () {
		if(!$("#frm_channel_search").validationEngine('validate')) {
			return false; 
		}
		objChannelManager.SearchChannel(); 
		return false;
	});
	
	
	$('#confirmDelete').on('show.bs.modal', function (event) {
		var button = $(event.relatedTarget) // Button that triggered the modal
		var id = button.data('row_id') // Extract info from data-* attributes
		var modal = $(this)
		modal.find('#removeChannel').attr('data-row_id',id);
	})

});