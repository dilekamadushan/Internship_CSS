var config = new Object();

config.copyright = '&copy; 2014 WaveNET. All Rights Reserved';
config.yaws_file_path = 'yaws/';
config.image_path = 'images/';

config.rec_per_page = 15;
// Max Dial-outs
config['max_douts'] = [{"min" : 1, "max" : 10000 }];
//Chnnel Free Time-out
config['chanfree_timeout'] = [{"min" : 1, "max" : 3600000 }];
// Reinvite Timeout(ms)
config['reinvite_timeout'] = [{"min" : 1, "max" : 120000 }];
// HTTP Timeout
config['http_time_out'] = [{"min" : 1, "max" : 120000 }];
// Cache Timeout (sec)
config['http_cache_timeout'] = [{"min" : 1, "max" : 3600 }];
// File Check Frequency (sec)
config['http_file_chk_freq'] = [{"min" : 1, "max" : 3600 }];
// DTMF Payload
config['digit_dtmf_pyld'] = [{"min" : 96, "max" : 127 }];
// Max Digits
config['digit_max_digits'] = [{"min" : 1, "max" : 255 }];
// First timeout (ms)
config['digit_frst_tout'] = [{"min" : 1, "max" :120000 }];
// Inter timeout (ms)
config['digit_inter_tout'] = [{"min" : 1, "max" : 120000 }];
// Max Record Time (ms)
config['rec_max_time'] = [{"min" : 1, "max" : 3600000 }];
// No Voice Timeout (s)
config['rec_voice_tout'] = [{"min" : 1, "max" : 180 }];
// Silence Timeout (s)
config['rec_sil_tout'] = [{"min" : 1, "max" : 180 }];
// Silence Ampl
config['rec_sil_ampl'] = [{"min" : -60, "max" : 60 }];
// Max Play Count
config['ply_max_count'] = [{"min" : 1, "max" : 10 }];
// RTCP Packet Interval (sec)
config['rtcp_pkt_intrvl'] = [{"min" : 1, "max" : 60 }];
//RTCP Receive Timeout (sec)	
config['rtcp_recve_tout'] = [{"min" : 1, "max" : 180 }];
// SNMP Timer Value	
config['snmp_time_val'] = [{"min" : 1, "max" : 3600000 }];



config.time_frame_x_axis = {
	"minutely":"Minute",
	"hourly":"Hour",
	"daily":"Day",
	"monthly":"Month",
	"yearly":"Year",	
};


config.log_type_list = [
	{"value":"admin_log", "description":"Admin Logs"},
    {"value":"stat_web_log","description":"Statistics Webservice Log"},
    {"value":"list_mgmt_web_log","description":"List Management Webservice Log"},
    {"value":"rej_calls_log","description":"Rejected Call Log"},
   
];


config.log_levels = [
	{0 : "critical"},
	{1 : "error"},
	{2 : "warning"},
	{3 : "info"},
	{4 : "debug"},
];


config.channel_log_levels= [
	{"value":"1", "description":"Error"},
	{"value":"2", "description":"Warning"},
	{"value":"3", "description":"Info"},
	{"value":"4", "description":"Debug"},
	{"value":"5", "description":"Trace"},
];

config.system_failures_reasons= [
	{"value":"codec_mismatch", "description":"Codec Mismatch"},
	{"value":"internal_error", "description":"Internal Error"},
	{"value":"invalid_number", "description":"Invalid Number"},
	{"value":"security_failure", "description":"Security Failure"},
	{"value":"not_acceptable", "description":"Not Acceptable"},
	{"value":"bad_request", "description":"Bad Request"},
];

config.user_failures_reasons= [
	{"value":"user_blacklisted", "description":"User Blacklisted"},
	{"value":"user_cancel", "description":"User Cancel"},
	{"value":"no_answer", "description":"No Answer"},
	{"value":"user_busy", "description":"User Busy"},
];
config.application_failures_reasons= [
	{"value":"app_not_found", "description":"App Not Found"},
	{"value":"app_timeout", "description":"App Timeout"},
	{"value":"app_error", "description":"App Error"},
	{"value":"app_parse_error", "description":"App Parse Error"},
];

config.network_failures= [
	{"value":"call_redirect", "description":"Call Redirected"},
	{"value":"network_error", "description":"Network Error"},
];

config.call_types = [
	{0 : "audio"},
	{1 : "both"},
	
];

config.def_val = [
	{0 : "Disable"},
	{1 : "Enable"},
]

config.dtmf_vals = [
	{0 : "sip info"},
	{1 : "rfc 2833"},
];

config.audio_codecs = [
	{"value":6, "description":"CODEC_G711_PCMA"},
	{"value":7, "description":"CODEC_G711_PCMU"},
	{"value":4353, "description":"CODEC_AMR_NB"},
	{"value":4354, "description":"CODEC_AMR_WB"},
];

config.video_codecs = [
	{"value":4609, "description":"H263"},
	{"value":4610, "description":"H263+"},
	{"value":4611, "description":"H263++"},
];

config.pass_block = [
	{"value":"pass", "description":"Pass"},
	{"value":"block", "description":"Block"},
];

config.xml_types = [
	{"value":"vxml", "description":"VXML"},
	{"value":"wxml", "description":"WXML"},
	{"value":"ccxml", "description":"CCXML"},
];

config.xml_types = [
	{"value":"vxml", "description":"VXML"},
	{"value":"wxml", "description":"WXML"},
	{"value":"ccxml", "description":"CCXML"},
];

config.call_ctrl_type = [
	{0 : "Full Control"},
	{1 : "Half Control"},
	{2 : "App Server Control"},
];

config.silnce_type = [
	{0 : "SILENCE_DETECTION_DISABLE"},
	{1 : "SILENCE_DETECTION_ENABLE"},
	{2 : "SILENCE_DETECTION_CN"},
];

config.act_server_id = [
	{"value":"1", "description":"1"},
	{"value":"2", "description":"2"},
	{"value":"3", "description":"3"}
];

config.act_event_type = [ 
{"value":"accept","description":"accept"},
{"value":"acm","description":"acm"},
{"value":"acm_evt","description":"acm_evt"},
{"value":"add_dialout_data","description":"add_dialout_data"},
{"value":"adi_collect_done","description":"adi_collect_done"},
{"value":"adi_collect_done_nr","description":"adi_collect_done_nr"},
{"value":"amr_data","description":"amr_data"},
{"value":"anm","description":"anm"},
{"value":"anm_evt","description":"anm_evt"},
{"value":"answer","description":"answer"},
{"value":"answer_complete","description":"answer_complete"},
{"value":"audio_trombone","description":"audio_trombone"},
{"value":"call_adi_tones_done","description":"call_adi_tones_done"},
{"value":"call_media_setup","description":"call_media_setup"},
{"value":"call_transfer","description":"call_transfer"},
{"value":"call_transfer_reply_url","description":"call_transfer_reply_url"},
{"value":"call_upload_fail_url","description":"call_upload_fail_url"},
{"value":"call_url_by_key","description":"call_url_by_key"},
{"value":"call_url_by_key_noreply","description":"call_url_by_key_noreply"},
{"value":"call_url_by_key_sip","description":"call_url_by_key_sip"},
{"value":"call_url_by_optkey_noreply","description":"call_url_by_optkey_noreply"},
{"value":"call_wait_for_anm","description":"call_wait_for_anm"},
{"value":"ccxml_tag_handler","description":"ccxml_tag_handler"},
{"value":"chan_to_vxmlpid_add","description":"chan_to_vxmlpid_add"},
{"value":"change_action_data","description":"change_action_data"},
{"value":"change_state","description":"change_state"},
{"value":"check_http_for_fax","description":"check_http_for_fax"},
{"value":"check_tts_and_do_play","description":"check_tts_and_do_play"},
{"value":"circuit_status","description":"circuit_status"},
{"value":"cnf_evt","description":"cnf_evt"},
{"value":"cnf_join_error","description":"cnf_join_error"},
{"value":"cng_detected","description":"cng_detected"},
{"value":"codec_data","description":"codec_data"},
{"value":"codec_negotiation","description":"codec_negotiation"},
{"value":"collect_digits_first_timeout","description":"collect_digits_first_timeout"},
{"value":"collect_digits_inter_timeout","description":"collect_digits_inter_timeout"},
{"value":"collect_done","description":"collect_done"},
{"value":"collect_dtmf","description":"collect_dtmf"},
{"value":"conf_noreply_url","description":"conf_noreply_url"},
{"value":"conference","description":"conference"},
{"value":"conference_url","description":"conference_url"},
{"value":"connect","description":"connect"},
{"value":"connect_call_conurl","description":"connect_call_conurl"},
{"value":"connect_call_url","description":"connect_call_url"},
{"value":"connect_no_reply","description":"connect_no_reply"},
{"value":"connect_user","description":"connect_user"},
{"value":"connect_voice_user","description":"connect_voice_user"},
{"value":"convert_done","description":"convert_done"},
{"value":"cpg_evt","description":"cpg_evt"},
{"value":"create_and_activate_audio_session","description":"create_and_activate_audio_session"},
{"value":"create_and_activate_audio_video_fax_session","description":"create_and_activate_audio_video_fax_session"},
{"value":"create_and_activate_video_session","description":"create_and_activate_video_session"},
{"value":"create_audio_video_codec_list","description":"create_audio_video_codec_list"},
{"value":"create_rec_buffers","description":"create_rec_buffers"},
{"value":"dialin_msok_timeout","description":"dialin_msok_timeout"},
{"value":"dialout","description":"dialout"},
{"value":"dialout_acm_timeout","description":"dialout_acm_timeout"},
{"value":"dialout_anm_timeout","description":"dialout_anm_timeout"},
{"value":"dialout_disconnected","description":"dialout_disconnected"},
{"value":"dialout_disconnected_previous_discard","description":"dialout_disconnected_previous_discard"},
{"value":"dialout_failed","description":"dialout_failed"},
{"value":"digit","description":"digit"},
{"value":"digit_data","description":"digit_data"},
{"value":"digit_detected","description":"digit_detected"},
{"value":"disconnect","description":"disconnect"},
{"value":"disjoin_error","description":"disjoin_error"},
{"value":"disjoin_success","description":"disjoin_success"},
{"value":"do_accept","description":"do_accept"},
{"value":"do_answer","description":"do_answer"},
{"value":"do_conf","description":"do_conf"},
{"value":"do_connect","description":"do_connect"},
{"value":"do_disconn","description":"do_disconn"},
{"value":"do_dtmf","description":"do_dtmf"},
{"value":"do_fax_send_receive","description":"do_fax_send_receive"},
{"value":"do_fax_snd","description":"do_fax_snd"},
{"value":"do_mvfwd","description":"do_mvfwd"},
{"value":"do_noaction","description":"do_noaction"},
{"value":"do_play","description":"do_play"},
{"value":"do_play_record","description":"do_play_record"},
{"value":"do_record","description":"do_record"},
{"value":"do_reinvite","description":"do_reinvite"},
{"value":"do_session_reconfig","description":"do_session_reconfig"},
{"value":"do_stream","description":"do_stream"},
{"value":"do_trans","description":"do_trans"},
{"value":"download_http_files_and_do_play","description":"download_http_files_and_do_play"},
{"value":"dtmf","description":"dtmf"},
{"value":"dtmf_timeout","description":"dtmf_timeout"},
{"value":"else","description":"else"},
{"value":"end_silence_data","description":"end_silence_data"},
{"value":"exit","description":"exit"},
{"value":"fax_data","description":"fax_data"},
{"value":"fax_detected","description":"fax_detected"},
{"value":"fax_event","description":"fax_event"},
{"value":"fax_snd","description":"fax_snd"},
{"value":"file_post_to_url_result","description":"file_post_to_url_result"},
{"value":"forward_dtmf","description":"forward_dtmf"},
{"value":"free_play_resources","description":"free_play_resources"},
{"value":"fwd","description":"fwd"},
{"value":"gen_data","description":"gen_data"},
{"value":"generate_dtmf","description":"generate_dtmf"},
{"value":"generate_dtmf_failed","description":"generate_dtmf_failed"},
{"value":"generate_dtmf_success","description":"generate_dtmf_success"},
{"value":"get_action_data","description":"get_action_data"},
{"value":"get_application_data","description":"get_application_data"},
{"value":"get_aud_payloadid","description":"get_aud_payloadid"},
{"value":"get_reinvite_data","description":"get_reinvite_data"},
{"value":"http_request","description":"http_request"},
{"value":"invite","description":"invite"},
{"value":"ivr_status_data","description":"ivr_status_data"},
{"value":"join_sucess","description":"join_sucess"},
{"value":"leave_cnf","description":"leave_cnf"},
{"value":"logout","description":"logout"},
{"value":"logout_previous_discard","description":"logout_previous_discard"},
{"value":"max_record_time_reached","description":"max_record_time_reached"},
{"value":"msok","description":"msok"},
{"value":"no_fax_data","description":"no_fax_data"},
{"value":"no_reply_url","description":"no_reply_url"},
{"value":"no_rtp_data","description":"no_rtp_data"},
{"value":"number_list_data","description":"number_list_data"},
{"value":"optDtmfNum","description":"optDtmfNum"},
{"value":"option_key","description":"option_key"},
{"value":"play_data","description":"play_data"},
{"value":"play_error","description":"play_error"},
{"value":"play_error_file","description":"play_error_file"},
{"value":"prack_ok","description":"prack_ok"},
{"value":"prack_ok_timeout","description":"prack_ok_timeout"},
{"value":"process_vxml_response","description":"process_vxml_response"},
{"value":"push_data","description":"push_data"},
{"value":"push_data_disconnect","description":"push_data_disconnect"},
{"value":"push_data_file_play","description":"push_data_file_play"},
{"value":"push_disconnect","description":"push_disconnect"},
{"value":"re_invite","description":"re_invite"},
{"value":"rec_data","description":"rec_data"},
{"value":"record_buffer_full","description":"record_buffer_full"},
{"value":"record_done","description":"record_done"},
{"value":"record_started","description":"record_started"},
{"value":"refer_accept","description":"refer_accept"},
{"value":"refer_reject","description":"refer_reject"},
{"value":"rel","description":"rel"},
{"value":"remove_buffer_term_key","description":"remove_buffer_term_key"},
{"value":"reply_url","description":"reply_url"},
{"value":"restart_circuit","description":"restart_circuit"},
{"value":"rlc","description":"rlc"},
{"value":"rtcp_data","description":"rtcp_data"},
{"value":"rtcp_timeout","description":"rtcp_timeout"},
{"value":"rtp_deactivate_audio_session","description":"rtp_deactivate_audio_session"},
{"value":"rtp_deactivate_session_audio","description":"rtp_deactivate_session_audio"},
{"value":"rtp_deactivate_session_video","description":"rtp_deactivate_session_video"},
{"value":"rtp_destroy_session_audio","description":"rtp_destroy_session_audio"},
{"value":"rtp_destroy_session_video","description":"rtp_destroy_session_video"},
{"value":"rtp_dtmf_2833","description":"rtp_dtmf_2833"},
{"value":"rtp_play","description":"rtp_play"},
{"value":"rtp_started","description":"rtp_started"},
{"value":"rtp_stopped","description":"rtp_stopped"},
{"value":"rtp_submit_buffer","description":"rtp_submit_buffer"},
{"value":"rtpEventData","description":"rtpEventData"},
{"value":"rtsp_chan_error","description":"rtsp_chan_error"},
{"value":"send_dtmf","description":"send_dtmf"},
{"value":"send_silence_data","description":"send_silence_data"},
{"value":"silence_detected","description":"silence_detected"},
{"value":"sip_info_err","description":"sip_info_err"},
{"value":"sip_info_ok","description":"sip_info_ok"},
{"value":"snmp_data","description":"snmp_data"},
{"value":"start_xml_svr","description":"start_xml_svr"},
{"value":"stop","description":"stop"},
{"value":"stop_play_audvid","description":"stop_play_audvid"},
{"value":"stop_record_audvid","description":"stop_record_audvid"},
{"value":"streaming_err","description":"streaming_err"},
{"value":"timeout","description":"timeout"},
{"value":"trans_noreply_url","description":"trans_noreply_url"},
{"value":"trans_to_vxml","description":"trans_to_vxml"},
{"value":"transanm","description":"transanm"},
{"value":"transfer","description":"transfer"},
{"value":"transfer_url","description":"transfer_url"},
{"value":"transinvite","description":"transinvite"},
{"value":"transrel","description":"transrel"},
{"value":"tts","description":"tts"},
{"value":"unconnect_call","description":"unconnect_call"},
{"value":"unjoin_virtual","description":"unjoin_virtual"},
{"value":"unsupport","description":"unsupport"},
{"value":"upload_file_to_url","description":"upload_file_to_url"},
{"value":"vxml_error","description":"vxml_error"},
{"value":"vxmldata","description":"vxmldata"},
{"value":"xml_data_disconnect","description":"xml_data_disconnect"},
{"value":"xml_error","description":"xml_error"},
{"value":"xmldata","description":"xmldata"}
];

config.cdr_log_type = [ 
	{"value":"acm","description":"acm"},
	{"value":"anm","description":"anm"},
	{"value":"invite","description":"invite"}	
];

config.act_call_types = [
	{"value":"audio", "description":"Audio"}
	//{"value":"video", "description":"Video"},
	//{"value":"both", "description":"Both"}	 
];

config.act_call_direction = [ 
	{"value":"inbound" , "description": "Inbound"},
	{"value":"outbound" , "description": "Outbound"}
];

config.act_module = [ 
	{"value":"IVR" , "description": "IVR"},
	{"value":"SCE" , "description": "SCE"}
];

config.log_levels = [ 
	{"value":"0" , "description": "Critical"},
	{"value":"1" , "description": "Error"},
	{"value":"2" , "description": "Warn"},
	{"value":"3" , "description": "Info"},
	{"value":"4" , "description": "Debug"},
	{"value":"5" , "description": "Trace"}
];

config.web_services = [ 
	{"value":"statistics_webservice_log" , "description": "Statistics"},
	{"value":"service_mgt_webservice_log" , "description": "Service Management"},
	{"value":"list_management_webservice_log" , "description": "List Management"}
];

config.sms_language = [
	{"id":"001", "lang":"English"},
	{"id":"002", "lang":"Thai"}
]

// Super admin role name
// Only one super user. No permission check will be carried out
// Manually create super admin role - rpc:call(ibp@pay4me2, ibp_admin_manager, createRole, [superadmin,"superadmin",""]).
// Manually create super user - rpc:call(ibp@pay4me2, ibp_admin_manager, createUser, [wavenet,"wavenet",superadmin,"wavenet.123","wavenet@wavenet.lk"]).
config.superadmin_username = 'admin';
config.superadmin_password = 'admin@1234';

// Password policy
config.password_policy = /^\w*(?=\w*\d)(?=.{8,})(?=\w*[a-z])(?=\w*[A-Z])\w*$/;
config.password_policy_msg = 'Password should be at least 8 characters of alphanumeric, at least one lower case letter, one upper case letter and one number.';
config.password_sms_msg = 'Your LDR password is - ';

//Validation list
config.number_validation = /^0?947[\d]{8}$/;
config.msisdn_validation = /^0?9475[\d]{7}$/;

//Virtual MSISDN Validation
config.virtualMSISDN960=/^(?=960)/;
config.virtualMSISDNLength=/^(?=.{10}$)/;

config.username_min_len  = 6;
config.username_max_len  = 15;
config.archive_min_len   = 4;
config.number_of_channels= 4;
config.number_of_numbers = 15;
config.number_of_trace_numbers=3;
config.ip_validation     = /^(\d|[1-9]\d|1\d\d|2([0-4]\d|5[0-5]))\.(\d|[1-9]\d|1\d\d|2([0-4]\d|5[0-5]))\.(\d|[1-9]\d|1\d\d|2([0-4]\d|5[0-5]))\.(\d|[1-9]\d|1\d\d|2([0-4]\d|5[0-5]))$/;

//Configure the visibility of following interfaces. Change to true if needs to be visible or false otherwise.
config.data_usage_form_visibility = false;
config.top_up_mechanism_form_visibility = false;


//configs related to ivr reports

config.months_limit=12;
config.days_limit=31;
config.hours_limit=24;
config.years_limit=10;

//Admin log search calendar time selection duration restriction (Duration min milliseconds)
config.timeDurationRestriction = 432000000;

config.start_month = [ 
	{"value":"01" , "description": "January"},
	{"value":"02" , "description": "February"},
	{"value":"03" , "description": "March"},
	{"value":"04" , "description": "April"},
	{"value":"05" , "description": "May"},
	{"value":"06" , "description": "June"},
	{"value":"07" , "description": "July"},
	{"value":"08" , "description": "August"},
	{"value":"09" , "description": "September"},
	{"value":"10" , "description": "October"},
	{"value":"11" , "description": "November"},
	{"value":"12" , "description": "December"}
];

config.start_year = [ 
	{"value":"2015" , "description": "2015"},
	{"value":"2016" , "description": "2016"},
	{"value":"2017" , "description": "2017"},
	{"value":"2018" , "description": "2018"},
	{"value":"2019" , "description": "2019"},
	{"value":"2020" , "description": "2020"},
	{"value":"2021" , "description": "2021"},
	{"value":"2022" , "description": "2022"},
	{"value":"2023" , "description": "2023"},
	{"value":"2024" , "description": "2024"},
	{"value":"2025" , "description": "2025"},
	{"value":"2026" , "description": "2026"},
	{"value":"2027" , "description": "2027"},
	{"value":"2028" , "description": "2028"},
	{"value":"2029" , "description": "2029"},
	{"value":"2030" , "description": "2030"}
];


config.log_search_maximum_range = 1000*60*60; //1 hour (admin,cdr,activity) 
config.log_search_maximum_range_in_word="one hour"; // use in notification window

config.web_service_log_search_maximum_range  = 1000*60*60; //1 hour 
config.web_service_log_search_maximum_range_in_word="one hour"; //  use in notification window

config.admin_log_search_maximum_range  = 1000*60*60*2; //1 hour 
config.admin_log_search_maximum_range_in_word="two hours"; //  use in notification window