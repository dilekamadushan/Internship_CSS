%% Admin activity log path
-define(LOG_PATH, "/var/log/ivr_admin/").
-define(LOG_FILE_PRIFIX, "_ivr_admin_act.log").
-define(USER_LOG_FILE_PRIFIX, "_user_web_act.log").
-define(TRACE_LOG_PATH, "/opt/logs/wn_event_logger/logs/ivr_trace_log/").
-define(TRACE_LOG_PREFIX, "ivr_ivr_tracelog_1.log").
-define(DOWNLOADED_CDR_DIR, "crs_logs/").
-define(CDR_DOWNLOAD_PATH, "/usr/local/var/yaws/www/crs_logs/").

%% Temparly csv write path
-define(WEB_ROOT, "http://10.210.10.55:8002/").
-define(WS_WEB_ROOT, "10.210.10.55:8002").
-define(TMP_PATH, "/usr/local/var/yaws/www/ivr_admin/tmp/").
-define(TMP_URL, "http://10.210.10.55:8002/ivr_admin/tmp/"). 
-define(SYS_ROOT, "/usr/local/var/yaws/www/ivr_admin/").

-define(TOTAL_IVR_CHANNELS, 1500).  

%% --- Nodes/Modules configuration of IBP and OBP

-define(USER_MGR_NODE, ums@mmsc).
-define(SEARCH_LOG_NODE,  log_int@mmsc).
-define(IVR_NODE, yaws_app@spark_dev2).
-define(IVR_REPORT_NODE,  crs@spark_dev2).
-define(IVR_REPORT_COOKIE,  project2).
-define(IVR_CHANNEL_MONITOR_LOG_NODE_COOKIE, project2).
-define(CRS_REPORT_NODE,  crs@spark_dev2).
%% Modules
-define(HMP_MOD, ipms_conf_server).
-define(USER_MGR_MOD,ums_db_server).
-define(COMMON_ADMIN_MOD,commonadmin_db_server).
-define(SEARCH_LOG_MOD,search_admin_svr). 
-define(IVR_CHANMON_SVR,ivr_chan_monitor_svr).
-define(IVR_CHAN_SVR,ivr_channel_svr).   
-define(IVR_CHARGEABLE_SUMMARY_SVR,  ivr_chargeable_summary_svr). 
-define(IVR_LOG_ADMIN_SVR,  ivr_log_admin_svr). 
-define(IVR_LOG_SEARCH_SVR,ivr_search_log_svr). 
-define(IVR_REPORT_MOD,crs_report_man_svr).
-define(IVR_CHANNEL_MONITOR_LOG_MOD, cdr_log_server_server).
-define(CRS_REPORT_SVR,crs_activity_man_svr).
-define(CRS_IVR_ACTIVITY_LOG_FIELDS, [time, event_type, serverid, channel, sessionid, type, direction, from, to, module_name, description]).
-define(CRS_IVR_CDR_LOG_FIELDS, [start_time, end_time, server_ID, product_channel, direction, session_ID, type, answer_time, calling, called, calling_URI, called_URI, cell, first_redirect, last_redirect, early_media, duration, disconnected_reason, call_progress]).
%% --- End ---

%%Channel Count Details
-define(TOTAL_HITS, 500).
%%Max Result Set Size
-define(MAX_RESULT_SET_SIZE, 300).

%% Record to store session data

-record(session_data,
	{
		username = "",
		uniqid = "",
		app	   = ""
	}
).
-type session_data() :: #session_data{}.
		
-record(session_mng_fsm_config,
		{
			request_timeout,
			charg_svr_details,
			charging_call_thrs,
			% local_ggsn_ip,
			% local_ggsn_port,
			% local_ggsn_port,
			session_timeout,
			% local_ipc,
			% local_ipd,
			local_apn,
			charging,
			data_handling,
			all_cp_pdu_handling,
			free_quata_status,
			free_quata_size,
			common_config
		}).
-type session_mng_fsm_config() :: #session_mng_fsm_config{}.
-record(charging_data,{
			charg_svr_details ,
			charging_call_thrs,
			status,
			free_quata_status,
			free_quata_size
}).


-type charging_data() :: #charging_data{}.

-record(subs_mgmt_data,{
			prof_deact_time ,
			credit_exp_time,
			virtual_number_sharing,
			virtual_number_allocation_timeout,
			data_handling			
}).


-type subs_mgmt_data() :: #subs_mgmt_data{}.

-record(user_session, {
	session_id,
	app,
	user_id = 1,
	acc_status,
	name,
	uniqid,
	email,
	first_login,
	password,
	role_id,
	role_name,
	last_pwd_change_date,
	permissions,
	applications,
	company_id, 
	department_id, 
	count = 0,
	client = 1,
	display_name,
	prime_other,
	password_expire 
}).
-type user_session() :: #user_session{}.

-record(cdr_log, {
	start_time, %timestamp
	end_time, % timestamp
	server_ID, %integer
	product_channel, % channelid
	direction, % "inbound" | "outbound"
	session_ID, % integer
	type, %video | audio | both
	answer_time, %timestamp
	calling, %integer
	called, %integer
	calling_URI, % URI
	called_URI, %URI
	cell, %cellId
	first_redirect, %redirect_num
	last_redirect, %redirect_num
	early_media, %true |false
	duration, %integer
	disconnected_reason,
	call_progress % invite | acm | anm
	 %string
}).
-type cdr_log() :: #cdr_log{}.

-record(access_number, {
	acc_no = undefined :: string() | undefined,
	app_type = undefined :: undefined | wxml | vxml | ccxml | erl,
	cc_type,
	status,
	adj_node,
	login = undefined :: string() | undefined,
	logout = undefined :: string() | undefined,
	dci_data,
	vid_codec_list,
	aud_codec_list,
	dtmf,
	dtmf_payload,
	amr_nb_payload,
	amr_wb_payload,
	g711_alaw_payload,
	g711_mulaw_payload,
	g723_payload,
	g729_payload,
	mpeg4_payload,
	h263_2429_payload,
	h264_payload,
	early_media,
	description,
	cnf_support,
	cnf_re_invite,
	stream_re_invite,
	silence_detection_type,
	generate_dtmf,
	access_type,
	creator
}).

-type access_number() :: #access_number{}.

-record(access_codes, {	id :: integer(),
						access_code :: string(),
						failed_action :: integer(),
						failed_nodes :: string(),
						access_code_data :: string(),
						retry_attempts :: integer(),
						date_time :: integer()
						}).
-type access_codes() :: #access_codes{}.

-record(increment_ids,	{
							key :: atom(),
							id :: integer()
						}).
-type increment_ids() :: #increment_ids{}.

-record(other_settings, {	id :: integer(),
							failed_action :: integer(),
							failed_nodes :: string(),
							config_data :: string(),
							retry_attempts :: integer(),
							date_time :: integer(),
							node :: string()
							  }).
-type other_settings() :: #other_settings{}.

-record(crs_downloaded_logs, {  file_tag :: integer(),
								file_name :: string(),
                                date_time :: string(),
                                user :: string(),
                                category :: string(),
                                status :: string()
                             }).
-type crs_downloaded_logs() :: #crs_downloaded_logs{}.

-record(statistics_webservice_log, {timestamp :: integer(),
										log_level :: integer(), 										
										user_name :: string(),
										log :: string()
									}).
-type statistics_webservice_log() :: #statistics_webservice_log{}.

-record(service_mgt_webservice_log, {timestamp :: integer(), % timestamp
									log_level :: integer(), % Fatal = 0 | Error = 1 | Warn = 2 | Info = 3 | Debug = 4
									user_name :: string(),
									service_id :: integer(), % Service ID '0' is the default value used where a specific service ID cannot be specified  
									response_code :: integer(),
									operation :: string()
									}).
-type service_mgt_webservice_log() :: #service_mgt_webservice_log{}.

-record(list_management_webservice_log, {timestamp :: integer(),
										log_level :: integer(), % Critical = 0 | Error = 1 | Warn = 2 | Info = 3 | Debug = 4 | Trace = 5
										user_name :: string(),
										app_id :: integer(),
										operation :: string()
									}).

-type list_management_webservice_log() ::  #list_management_webservice_log{}.



%% Configuration parameters related key values

-define(HTTP_ROOT, "http://10.210.10.50:8002/ivr_admin/").

-define(COMMON_LOGIN,  "cam_admin/login.yaws").
-define(LOGIN, "cam_admin/login.yaws"). 
-define(COMMON_HOME_URL, "cam_admin/home").

-define(ROOT_PATH, "/usr/local/var/yaws/www/ivr_admin/").
-define(HOME, "home.html").
-define(DASHBOARD, "dashboard.html").
-define(LIVE_CIRCUIT_UTIL,  "live_circuit_util.html").
-define(CONCURRENT_HITS,  "concurrent_hits.html").
-define(STATISTICS, "statistics.html").
-define(ACC_CODE_STAT,  "access_code_stat.html").
-define(LOG_SEARCH,  "log_search.html").
-define(OTHER_SETTINGS, "other_settings.html").
-define(CREATE_ACC_CODE, "create_access_code.html").
-define(ACC_CODE_MANAGER, "manage_access_code.html"). 
-define(ADMIN_LOG, "admin_log_search.html").
-define(PROMPT_REC_LOG, "prompt_rec_log_search.html").
-define(OBD_WEB_LOG,"obd_web_log_search.html").
-define(OBD_CF_LOG, "obd_cf_log_search.html").
-define(OBD_WEB_SERV_LOG, "obd_web_serv_log_search.html").
-define(LIST_WEB_SERV_LOG,  "list_web_serv_log_search.html").
-define(SERV_MGMT_WEB_SERV_LOG, "service_web_serv_log_search.html").
-define(STAT_WEB_SERV_LOG,  "stat_web_serv_log_search.html").
-define(SCE_LOG,  "sce_log_search.html").
-define(REJECT_CALL_LOG,  "reject_call_log_search.html").
-define(LOG_LEVELS, "log_levels.html").

-define(HITS_COUNTER_REPORT,  "hits_counter_report.html").
-define(DURATION_CUMULATIVE_REPORT,  "duration_cumulative_report.html").
-define(CHARGABLE_DURATION_REPORT, "chargable_duration_report.html").
-define(FAILURE_REPORT, "failure_report.html").
-define(QOS_REPORT, "qos_report.html").
-define(ACTIVITY_LOG_SEARCH, "activity_log_search.html").
-define(TRACE_LOG,  "trace_log.html").
-define(CDR_LOG,"cdr_log_search.html").
-define(WEB_SERVICE_LOG,"web_service_log_search.html").

-define(HOME_PERMISSIONS, [true]).
-define(DASH_PERMISSIONS,[ivr_view_dashboard]).
-define(LIVE_CIRC_UTIL_PERMISSIONS, [ivr_view_live_circuit_util, ivr_live_chan_restart]).
-define(CONC_HITS_PERMISSIONS, [true]).
-define(STATISTICS_PERMISSIONS, [true]).
-define(ACC_CODE_STAT_PERMISSIONS, [true]).
-define(LOG_PERMISSIONS, [true]).
-define(OTHER_SETTINGS_PERMISSIONS, [ivr_edit_general_configs, ivr_edit_http_configs, ivr_edit_digit_configs, ivr_edit_record_configs, ivr_edit_play_configs, ivr_edit_codec_configs, ivr_edit_silence_detection_configs, ivr_edit_rtcp_configs, ivr_edit_fax_configs, ivr_edit_amr_configs, ivr_edit_numberlist_configs, ivr_edit_ivrstatus_configs, ivr_edit_snmp_configs, ivr_edit_channelwise_app_logs, ivr_edit_channelwise_platform_logs,  ivr_edit_numberwise_app_logs,ivr_edit_numberwise_platform_logs, ivr_edit_trace_numbers,ivr_view_amr_configs,ivr_view_channelwise_app_logs,ivr_view_channelwise_platform_logs,ivr_view_codec_configs,ivr_view_dashboard,ivr_view_digit_configs,ivr_view_fax_configs,ivr_view_general_configs,ivr_view_hits_counter_report,ivr_view_http_configs,ivr_view_ivrstatus_configs,ivr_view_numberlist_configs,ivr_view_numberwise_app_logs,ivr_view_numberwise_platform_logs,ivr_view_play_configs,ivr_view_record_configs,ivr_view_rtcp_configs,ivr_view_silence_detection_configs,ivr_view_trace_numbers,ivr_add_trace_numbers]).
-define(CREATE_ACC_CODE_PERMISSIONS, [ivr_create_access_code, ivr_view_access_codes, ivr_view_access_code, ivr_edit_access_code, ivr_delete_access_code]).
%-define(ACC_CODE_MANAGER_PERMISSIONS, [true]).

%permisions for IVR Reports
-define(HITS_COUNTER_REPORT_PERMISION, [ivr_view_hits_counter_report]).
-define(DURATION_CUMULATIVE_REPORT_PERMISION, [ivr_view_duration_cumulative_report]).
-define(CHARGABLE_DURATION_REPORT_PERMISION, [ivr_view_failure_report]).
-define(FAILURE_REPORT_PERMISSIONS, [ivr_view_failure_report]).
-define(QOS_REPORT_PERMISION, [ivr_view_qos_report]).
-define(ADMIN_LOG_PERMISSIONS, [ivr_log_search]).
-define(ACT_SEARCH_PERMISSIONS, [ivr_activity_search,ivr_downloaded_logs_bulk_del]).
-define(TRACE_LOG_PERMISSIONS, [ivr_trace_search]).
-define(CDR_LOG_PERMISSIONS, [ivr_cdr_log_search,ivr_downloaded_logs_bulk_del]). 
-define(WEB_SERVICE_LOG_PERMISSIONS, [ivr_web_service_log_search]).

-define(COMMON_LOGGING, common_admin).

%% Log Levels
-define(CRITICAL, 0).
-define(WEB_SERVICE_LOG_LEVELS,[{0,"Critical"},{1,"Error"},{2,"Warn"},{3,"Info"},{4,"Debug"},{5,"Trace"}]).




