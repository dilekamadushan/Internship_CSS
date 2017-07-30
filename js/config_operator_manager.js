
function OperatorManager() {}

OperatorManager.prototype.searchOperator = function(){
		
	var operator_name = $('#operator_name').val();
	
	data_table = $('#operator_search_tbl').DataTable( {  
		"aoColumnDefs": [
			{"aTargets" : [2], 
			"mRender" : function(data, type, full){
					//console.log(full);
					return '<button type="button" class="btn btn-box-tool btn-box-table-inner" title="Edit" data-original-title="Edit"'
							+'data-toggle="modal" data-target="#edit_operator"><i class="fa fa-edit"></i></button>'
							+ '<button type="button" class="btn btn-box-tool btn-box-table-inner" title="Delete" data-original-title="Delete" '
							+ 'data-toggle="modal" data-target="#confirmDelete" data-operator_id="'+ full[2] +'" data-operator_name="'+ full[0]+'"><i class="fa fa-trash-o"></i></button>'
				}
			},
			{ 'bSortable': false, 'aTargets': [-1,-2,-3] },{ "bSearchable": false,'aTargets': [-1] }
		],
		"processing": true,
		"bDestroy": true,
		"bFilter":false,
		"serverSide": true,
		"ajax": {
			"url": config.yaws_file_path + "css_operator_manager.yaws",
			 "data": function ( d ) {
				d.action = "SEARCH",
				d.operator_name = operator_name
			},
			"complete": function(response) { 
								
				res = JSON.parse(response.responseText);
				
				//console.log(res);
				
				if(error = res['err'])
				{
					objApp.setFlash('error', error);
				}
			}
		}
	} )
	
	// prevent page loading in form 
	return false;
	
}

OperatorManager.prototype.deleteOperator = function(){

	let operator_id = $('#deleteOperator').attr("data-operator_id");
	
	var request_data = '{"action":"DELETE_OPERATOR","operator_id":"'+operator_id+'" }';
	var response_data = obj_common.ajaxRequest(config.yaws_file_path + 'css_operator_manager.yaws', request_data); 
	
	if(response_data[0].status == "ok"){
		objApp.setFlash('success', response_data[0].message);
		//Load DB Data
		operatorManager.searchOperator();
	}
	else{
		objApp.setFlash('error', response_data[0].message);
	}	
	
	$('#confirmDelete').modal('toggle');
	
	return false;
}

OperatorManager.prototype.createOperator = function() {
	
	var operator_name	=	$('#operator_name').val();
	var cdb_value		=	$('#cdb_value').val();
	var description 	=	$('#description').val();
	var sms_platform	=	$('#sms_platform').val();
	
	var request_data = '{"action":"CREATE","operator_name":"' + operator_name + '", "cdb_value":"' + cdb_value + '", "sms_platform":"' + sms_platform + '" , "description" :"'+ description+'"}';
	var response_data = obj_common.ajaxRequest(config.yaws_file_path + 'css_operator_manager.yaws', request_data); 
	
	
	if(response_data[0].status == "ok"){
		objApp.setFlash('success', response_data[0].message);
		$('#operator_name').val("");
		$('#cdb_value').val("");
		$('#description').val("");
		$('#sms_platform').val("");
	}
	else{
		objApp.setFlash('error', response_data[0].message);
	}
	
	return false;

};

var operatorManager = new OperatorManager();

jQuery(document).ready(function(){
	
	operatorManager.searchOperator();
	
	$('#operator_search').bind("click", function(){
		operatorManager.searchOperator();
		return false;
	});
	
	$("#frm_operator").validationEngine();
	
	$('#operator_create').bind("click", function(){
		if(!$("#frm_operator").validationEngine('validate')) {
			return false; 
		}
		operatorManager.createOperator();
		return false;
	});
	
	$('#confirmDelete').on('show.bs.modal', function (event) {
		var button = $(event.relatedTarget) // Button that triggered the modal
		var operator_id = button.data('operator_id') // Extract info from data-* attributes

		var modal = $(this)

		modal.find('#deleteOperator').attr('data-operator_id',operator_id);
	});
	
	$('#edit_operator').on('show.bs.modal', function (event) {
		
		var button = $(event.relatedTarget) // Button that triggered the modal
		var id = button.data('row_id') // Extract info from data-* attributes
		var modal = $(this)
		modal.find('#update_operator').attr('data-row_id',id);
	})
})