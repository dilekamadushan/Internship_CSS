%% --- Web, Application and Callflow root ---
-define(WEB_ROOT, "http://172.16.150.22:8002/").
-define(APP_ROOT, ?WEB_ROOT ++ "css_admin/"). 
%% --- End ---

-define(SYSTEM_NODE, pcss_mngt_2@tom).
-define(SYSTEM_MODULE, pcss_mngt_api).
-define(INTERFACE, 2).

-define(CAM_NODE, wavenet_cam@tom).
-define(CAM_MOD, wavenet_cam_api).

-define(SESSION_NAME, "css_admin_session_id").
-define(CAM_SESSION_NAME, "session_id").

%---conf related to reports (CRS)--
-define(CRS_NODE,  crs@project2).
-define(CRS_COOKIE, project2).
-define(CRS_REPORT_MOD,crs_report_man_svr).
-define(CRS_CDR_MOD,crs_activity_man_svr).
-define(MAX_RESULT_SET_SIZE, 300).

%----conf related to channel moniter
-define(CHANNEL_MONITOR_NODE, channel_monitor@tom).
-define(CHANNEL_MONITOR_COOKIE, tom). 
-define(CHANNEL_MONITOR_NODE_REPORT_MOD, cdr_log_server_server).
-define(COUNTRY_CODE, "591"). 
-define(MSISDN_MAX_LEN, 11). 
-define(MSISDN_MIN_LEN, 8).
-define(SHORT_CODE, "555").
-define(DIVERT_CODE, "111").
-define(ALERT_PORTS, 1500).
-define(MAX_PORTS, 200).

%%---conf related to cam admin---
-define(SUPER_USER, "super_admin@globalwavenet.com").
-define(SUPER_COMPANY, "wavenet").
%%---end---

%%---bulk delete log prefix---
-define(DELETE_LOG_BLACK_LIST, "_delete_log_black_list.log").
-define(DELETE_LOG_PACKAGES, "_delete_log_packages.log").
-define(DELETE_LOG_USERS, "_delete_log_users.log").
-define(RESULT_LOG, "_result_log.log").
%%---end---

%% --- Admin activity log ---
%% Log path
-define(LOG_PATH, "/var/log/css/").
-define(CDR_PATH, "/var/log/css/cdr/").
%% Log suffix
-define(LOG_FILE_PRIFIX, "_admin_act.log").
-define(REQ_LOG_FILE_PRIFIX, "_vms_request_act.log"). 
-define(DIALOUT_LOG_FILE_PRIFIX, "_vms_call_act.log").
-define(DIALOUT_DEBUG_LOG_FILE_PRIFIX, "_vms_call_debug.log").

%% --- Temp directory info --
%% Directory path
-define(TMP_PATH, "/usr/local/var/yaws/www/css_admin/tmp/").

%% Direcotry url
-define(TMP_URL, ?APP_ROOT ++ "tmp/").
%% --- End ---

%% --- Validations ---
-define(MOBILE_VALIDATE, "^0?[\\d]{9}$"). 
-define(PASSWORD_VALIDATE, "^0?[\\d]{4}$").
% values that showd in number validation informations
-define(MIN_NUMBER_LENGTH, 9).
-define(MAX_NUMBER_LENGTH, 11).
%% --- End ---

-define(ALLOWED_CODECS, ["Wide band", "Narrow band", "U-Law", "A-Law", "1"]).


%% SMS Related Configurations
-define(SMS_NODE, prime_umb@fusion_dev).
-define(SMS_MODULE, omniesme_notification_svr).
-define(SMS_FROM_NUMBER,  111).
-define(SMS1, "Your new voice mail account is created with Pin %PIN%").


-define(MAX_UPLOAD_SIZE, 1). %% 1 MB - Content file size
-define(GRREETING_UPLOAD_PATH, "/opt/contents/ums/greetings/").
-define(USER_CONTENT_PATH, "/opt/contents/ums/user_contents/").
-define(COMMON_LOGIN, "cam_admin/login.yaws").
-define(LOGIN, "css_admin/css_login.yaws"). 
-define(HOME_URL, "home"). 
-define(COMMON_HOME_URL, "cam_admin/home").

-define(ROOT_PATH, "/usr/local/var/yaws/www/css_admin/").

-define(FILE_REST, "http://172.16.150.22:8888/pcss_rest_contenet_uploader").
-define(LOGIN_REST, "http://172.16.150.22:8888/pcss_user_rest/admin/trusted/login?").

-define(CONTENT_URL, "http://172.16.150.22:8888/contents/"). 

-define(IMAGE_RES, "941x350"). 
-define(IMAGE_RES_WIDTH, "941").
-define(IMAGE_RES_HEIGHT, "350").

-define(CONTENT_DOWNLOADED_DATE, 3).
-define(CONTENT_WISE_NUM_OF_DAYS, 4).
-define(CHARGING_CONF, 510).

-define(HOME, "home.html").
-define(HOME_PERMISSIONS, [true]).

-define(SUBSCRIBER_SEARCH, "subscriber_search.html").
-define(SUBSCRIBER_SEARCH_PERMISSIONS, [css_subscriber_view,css_subscriber_delete]).

-define(SUBSCRIBER_REGISTER, "subscriber_register.html").
-define(SUBSCRIBER_REGISTER_PERMISSIONS, [css_subscriber_register]).

-define(SERVICE_CREATE, "service_create.html").
-define(SERVICE_CREATE_PERMISSIONS, [css_service_create]).

-define(SERVICE_SEARCH, "service_search.html").
-define(SERVICE_SEARCH_PERMISSIONS, [css_service_view,css_service_delete,css_service_update]).  

-define(PROVIDER_CREATE, "provider_create.html").
-define(PROVIDER_CREATE_PERMISSIONS, [css_content_provider_create]).

-define(PROVIDER_SEARCH, "provider_search.html").
-define(PROVIDER_SEARCH_PERMISSIONS, [css_content_provider_view,css_content_provider_delete,css_content_provider_update]).  

-define(CHANNEL_CREATE, "channel_create.html").
-define(CHANNEL_CREATE_PERMISSIONS, [css_channel_create]).

-define(CHANNEL_SEARCH, "channel_search.html").
-define(CHANNEL_SEARCH_PERMISSIONS, [css_channel_view,css_channel_delete]).  

-define(GROUP_CREATE, "group_create.html").
-define(GROUP_CREATE_PERMISSIONS, [css_group_create]).

-define(GROUP_SEARCH, "group_search.html").
-define(GROUP_SEARCH_PERMISSIONS, [css_group_view,css_group_delete,css_group_update]).

-define(USER_CREATE, "user_create.html").
-define(USER_CREATE_PERMISSIONS, [css_user_create]).

-define(USER_SEARCH, "user_search.html").
-define(USER_SEARCH_PERMISSIONS, [css_user_view,css_user_delete,css_user_update]).

-define(CONFIG_GENERAL, "config_general.html").
-define(CONFIG_GENERAL_PERMISSIONS, [css_config_general]). 

-define(CONFIG_CNT_PROVIDER, "config_content_provider.html").
-define(CONFIG_CNT_PROVIDER_PERMISSIONS, [css_config_content_provider]).

-define(CONFIG_OPERATOR_CREATE, "config_operator_create.html").
-define(CONFIG_OPERATOR_CREATE_PERMISSIONS, [css_config_operator_create]).  

-define(CONFIG_OPERATOR_SEARCH, "config_operator_search.html").
-define(CONFIG_OPERATOR_SEARCH_PERMISSIONS, [css_config_operator_view,css_config_operator_delete,css_config_operator_update]).  

-define(CONFIG_SMS_PLATFORM_CREATE, "config_sms_create_platform.html").
-define(CONFIG_SMS_PLATFORM_CREATE_PERMISSIONS, [css_config_sms_platform_create]).  

-define(CONFIG_SMS_PLATFORM_SEARCH, "config_sms_search_platform.html").
-define(CONFIG_SMS_PLATFORM_SEARCH_PERMISSIONS, [css_config_sms_platform_view,css_config_sms_platform_delete,css_config_sms_platform_update]).  

-define(CONFIG_SMS_MESSAGE, "config_sms_message.html").
-define(CONFIG_SMS_MESSAGE_PERMISSIONS, [css_config_sms_message]).

-define(CONFIG_HPOV_MESSAGE, "config_hpov.html").
-define(CONFIG_HPOV_MESSAGE_PERMISSIONS, [css_config_hpov_message]). 

-define(MONITOR_SUMMARY, "monitor_summary.html").
-define(MONITOR_SUMMARY_PERMISSIONS, [css_monitor_summary]).

-define(MONITOR_SUBSCRIPTION, "monitor_subscription.html").
-define(MONITOR_SUBSCRIPTION_PERMISSIONS, [css_monitor_subscription]).

-define(MONITOR_SCHEDULER, "monitor_scheduler.html").
-define(MONITOR_SCHEDULER_PERMISSIONS, [css_monitor_scheduler]).

-define(MONITOR_SMS, "monitor_sms.html").
-define(MONITOR_SMS_PERMISSIONS, [css_monitor_sms]).

-define(MONITOR_INTEC, "monitor_intec.html").
-define(MONITOR_INTEC_PERMISSIONS, [css_monitor_intec]).

-define(MONITOR_HPOV, "monitor_hpov.html").
-define(MONITOR_HPOV_PERMISSIONS, [css_monitor_hpov]).

-define(REPORT_DAILY, "report_daily.html").
-define(REPORT_DAILY_PERMISSIONS, [css_report_daily]).

-define(REPORT_MONTHLY, "report_monthly.html").
-define(REPORT_MONTHLY_PERMISSIONS, [css_report_monthly]).

-define(REPORT_SLA, "report_sla.html").
-define(REPORT_SLA_PERMISSIONS, [css_report_sla]).

-define(REPORT_TRANSACTION, "report_transaction.html").
-define(REPORT_TRANSACTION_PERMISSIONS, [css_report_transaction]).

-define(REPORT_SERVICE, "report_service.html").
-define(REPORT_SERVICE_PERMISSIONS, [css_report_service]).

-define(REPORT_SUBSCRIPTION, "report_subscription.html").
-define(REPORT_SUBSCRIPTION_PERMISSIONS, [css_report_subscription]).

%corporate contacts add status codes
-define(ADD_FAIL, 0).
-define(ADD_SUCCESS, 1).
-define(USER_ALREADY_EXISTS, 2).
-define(MAX_CNTS_COUNT_EXCEEDS, 3).
-define(MAX_CNTS_COUNT_NOT_FOUND, 4).
-define(DATABASE_ERROR, 5).

%%Config Kyes

-define(AUTO_SET_AS_DEFAULT, 2).
-define(REVERS_css, 5).
-define(SYSTEM_DEFAULT_TONE, 10).
-define(STAR_COPY_DEFAULT_ACTION, 11).
-define(SERVICE_EXPIRY_ALERT, 12).
-define(DEFAULT_ANY_USER_PKG, 100).
-define(DEFAULT_PREPAID_USER_PKG, 101).
-define(DEFAULT_POSTPAID_USER_PKG, 102).
-define(DEF_CHARG_SCHEME_ANY_USR, 200).
-define(DEF_CHARG_SCHEME_PREPAID_USR, 201).
-define(DEF_CHARG_SCHEME_POSTPAID_USR, 202).
-define(DEF_CHARG_SCHEME_USR_CREATE_CONT, 203).
-define(DEF_CHARG_SCHEME_USR_UP_CONT, 204).
-define(DEF_CHARG_SCHEME_USR_CREATE_TWIN, 205).
-define(DEF_CHARG_SCHEME_USR_CREATE_MIX, 206).
-define(SUSPENDED_USER_KEEPING_PERIOD, 210).
-define(RETRY_ATTEMPTS, 211).
-define(RETRY_GAPS, 212).
-define(STATUS_css_DURATION, 305).
-define(DEFAULT_LANGUAGE, 310).
-define(REJECTED_CONTENT_KEEPING_PERIOD, 400).
-define(GIFTED_CONTENT_KEEPING_PERIOD, 401).
-define(MAX_ENTRY_COUNT, 450).
-define(PIN_LENGTH, 460).
-define(NEXT_CHARGING_DAY_OF_MONTH, 500).
-define(NEXT_CO_CHARGING_DAY_OF_MONTH, 502).
-define(NEXT_CHARGING_DAY_OF_WEEK, 501).
-define(MAX_CONTENET_PER_CORPORATE, 600).

-define(ERROR_MESSAGES, [{not_found,"Not Found"},
						 {db_error,"Sorry, Tempory Error"},
						 {bad_record,"Sorry, Tempory Error"},
						 {already_approved,"Sorry, Content Already Approved"},
						 {alredy_rejected,"Sorry, Content Already Rejected"},
						 {alredy_asigned,"Sorry, Content Already Assigned"},
						 {set_as_default,"Sorry, Content Set As A Default Content"},
						 {invalid_acc_profile_id,"Sorry, Invalid Access Profile Id"},
						 {user_profile_already_exists,"Sorry, User Profile Already Exist"},
						 {invalid_schema_type,"Sorry, Invalid Charging Scheme Type"},
						 {alredy_asigned_denid_category_changes,"Sorry, Charging Scheme Already Assigned"},
						 {set_as_default_denid_content_type_change,"Sorry, Charging Scheme Set As Default"},
						 {alredy_asigned_denid_content_type,"Sorry, Charging Scheme Already Assigned"},
						 {set_as_default_denid_category_changes,"Sorry, Charging Scheme Set As Default"},
						 {invalid_charging_scheme_id,"Sorry, Invalid Charging Scheme Id"},
						 {undefined_level,"Sorry, Invalid Level"},
						 {invalid_album_contets_id,"Sorry, Invalid Album Id"},
						 {invalid_search_type,"Sorry, Invalid Search Type"},
						 {invalid_content_type,"Sorry, Invalid Content Type"},
						 {content_not_found,"Sorry, Content Not Found"},
						 {content_not_exists,"Sorry, Content Not Exist"},
						 {invalid_charging_scheme_content_type,"Sorry, Invalid Charging Scheme"},
						 {invalid_system_content_type,"Sorry, Invalid System Content Type"},
						 {invalid_album_id,"Sorry, Invalid Album Id"},
						 {not_approved,"Sorry, Not Approved"},
						 {invalid_prepaid_profile,"Sorry, Invalid Prepaid Profile"},
						 {invalid_postpaid_profile,"Sorry, Invalid Postpaid Profile"},
						 {invalid_any_user_profile,"Sorry, Invalid Anyuser Profile"},
						 {corporate_profile_not_exists,"Sorry, Corporate Profile Not Exist"},
						 {contact_count_greater_than_max_num,"Sorry, Contact Count Greater Than Max Number"},
						 {number_not_found,"Sorry, Configuration Id Not Found"},
						 {empty_user_list,"Sorry, Empty User List"},
						 {max_corporate_user_limit,"Sorry, Max corporate User Limit Exceeded"},
						 {corporate_contacts_not_found,"Sorry, Corporate Contacts Not Found"},
						 {name_already_exists,"Sorry, Name Already Exist"},
						 {internal_error,"Sorry, Tempory Error"},
						 {package_used_by_profile,"Sorry, Package Already User By Profiles"},
						 {limit_exeed,"Category Create Failed, Limit Exceeded"},
						 {used,"Sorry, Category Is In Use"},
						 {invalid_package_type_for_account,"Sorry, Invalid Service Access Profile For User Type"},
						 {invalid_package_type_for_user,"Sorry, Invalid Service Access Profile For Account Type"},
						 {mnp_query_failed,"Sorry, MSISDN Validation Failed"},
						 {access_profile_not_found,"Sorry, Access Profile Not Found"},
						 {wrong_charging_scheme_category,"Sorry, Wrong Charging Scheme Category"},
						 {charging_scheme_not_found,"Sorry, Charging Scheme Not Found"},
						 {coporate_not_exists,"Sorry, Corporate Not Exist"},
						 {invalid_user_type,"Sorry, Invalid User Type"},
						 {black_listed,"Sorry, Number Blacklisted"},
						 {file_open_error,"Sorry, File Open Error"},
						 {package_type_mismatch,"Sorry, Package Type Mismatch"}, 
						 {invalid_value,"Sorry, Invalid Value"},
						 {invalid_key,"Sorry, Invalid Key"}, 
						 {msg_id_not_found,"Sorry, Message Id Not Found"},
						 {corporate_contents_not_exists,"Sorry, Corporate Content Not Exist"},
						 {corporate_profile_or_content_not_exists,"Sorry, Corporate Profile Or Content Not Exist"},
						 {nothing_to_deactivate,"Sorry, Nothing To Deactivate"},
						 {category_name_already_exists,"Sorry, Category Name Already Exist"},
						 {content_exist,"Failed To Create Category, Contents Already Exists In Parent Category"},
						 {child_category_exists,"Failed To Delete Category, Child Categories Exists"},
						 {system_content_exists,"Delete Failed, System Contents Exists"},
						 {invalid_charging_scheme_category,"Invalid Charging Scheme Category"},
						 {album_name_already_exists,"Sorry, Album Name Already Exists"},
						 {restricted,"Sorry, Album Already Published"},
						 {cannot_delete_currently_active_content,"Can Not Delete Active Content"},
						 {already_added,"Content Already Added"}, 
						 {contact_count_greater_than_max_num,"Contact Count Is Greater Than The Given Number Of Users Value"}]). 

-define(CDR_ACTIONS, [{10,"Subscription"},
						{11,"Account renewal"},
						{12,"Unsubscription"},
						{13,"Account downgrade"},
						{14,"Account reset"},
						{15,"Account suspend"},
						{20,"Tone downloads (includes download, copy and clip css) by user"},
						{21,"Album download"},
						{22,"Tone renewals"},
						{23,"Album renewals"},
						{24,"Tone usage"},
						{28,"Tone/album deletion by user"},
						{29,"Tone/album deletion by admin"},
						{30,"Record a tone using IVR"},
						{31,"Upload a tone using web"},
						{32,"Creating a twin tone"},
						{33,"Creating a clip css"},
						{34,"Creating a mixed css"},
						{40,"Account access"},
						{41,"Setting a tone to users"},
						{42,"Change pin"},
						{43,"Change Language"},
						{44,"Enable/disable copy protection"},
						{45,"Enable/disable auto accepting a gifted tone"},
						{50,"Gifting a tone (giftee approval is not required)"},
						{51,"Gifting a tone (giftee approval is required)"},
						{52,"Accepting a gifted tone"},
						{53,"Rejecting a gifted tone"},
						{54,"Delete a non accepted gifted tone"}]). 

-define(CONTENT_TYPES, [{0,"Not applicable"},
						{1,"Default tone"},
						{2,"System defined tone"},
						{3,"System defined song (use for clipping)"},
						{4,"Sponsored tone"},
						{8,"System defined default tone"},
						{10,"User recorded tone"},
						{11,"User uploaded tone"},
						{12,"Twin Tones (only the created content id,  not the original content)"},
						{13,"Mixed css (only the created content id,  not the original content)"},
						{14,"Clipped css (only the created content id,  not the original content)"},
						{15,"another user created content (downloaded or gifted)"},
						{18,"Reverse css Tone set by user"},
						{20,"Corporate Tone"},
						{21,"Reverse css Tone set by Administrators"},
						{22,"Partial Ad css"},
						{23,"Full ad css"},
						{24,"Country based css content"},
						{30,"System defined album"},
						{31,"User defined album"}]). 	

-define(CDR_TYPES, [{1,"Prepaid"},
						{2,"Postpaid"},
						{3,"Both"}]).	

-define(CDR_STATUS, [{0,"Success"},
						{1,"Fail"}]).

-define(CDR_INTERFACE, [{1,"System"},
						{2,"Administrator"},
						{3,"IVR"},
						{4,"WEB"},
						{5,"SMS"},
						{6,"USSD"}]). 

-define(CDR_ERR_CODES, [{0,"N/A"},
						{1,"Insufficient balance"},
						{9,"Internal system error(DB error)"},
						{2,"Invalid package type for user"},
						{3,"Access profile not found"},
						{4,"Wrong charging scheme category"},
						{5,"Charging scheme not found"},
						{6,"Coporate not exists"},
						{7,"Invalid user type"},
						{8,"Blacklisted"},
						{10,"User profile alredy exist"},
						{101,"Insufficient balance(add to grace period)"},
						{102,"Insufficient balance(downgrade)"},
						{103,"Insufficient balance(delete)"},
						{104,"Insufficient balance(when end of grace period,so delete)"}]).	

-define(ADMIN_LOG_STATUS, [{1,"SUCCESS"},
						   {2,"OTHER_FAILURES"},
						   {3,"DB_FAILURE"},
						   {4,"INVALID_PARAMETER"},
						   {5,"VALIDATION_FAILED"},
						   {6,"FILE_ERROR"},
						   {7,"SUBSCRIPTION_FAILURE"},
						   {8,"NOT_FOUND"},
						   {99,"ALREADY_EXISTS"}]).	

-define(ADMIN_ACTION_TYPE, [{1,"ADD_ACCESS_PROFILE"},
						    {2,"UPDATE_ACCESS_PROFILE"},
						    {3,"DELETE_ACCESS_PROFILE"},
						    {4,"ADD_CHARGING_SCHEME"},
						    {5,"UPDATE_CHARGING_SCHEME"},
						    {6,"DELETE_CHARGING_SCHEME"},
						    {7,"USER_PROVISION"},
						    {8,"SET_DEFAULT_ACCESS_PROFILE"},
						    {9,"DELETE_USER_PROFILE"},
						    {10,"UPDATE_USER_PROFILE_BY_ADMIN"},
						    {11,"UPDATE_USER_PROFILE_BY_USER"},
						    {12,"VOID_CHARGE_AMOUNT"},
						    {13,"UPLOAD_CONTENT"},
						    {14,"DELETE_UPLOADED_CONTENT"},
						    {15,"SET_AS_DEFAULT_CONTENT"},
						    {16,"APPROVE_UPLOADED_CONTENT"},
						    {17,"REJECT_UPLOADED_CONTENT"},	
						    {18,"SCHEDULE_css_CONTENT"},
						    {19,"ADD_CATEGORY"},
						    {20,"UPDATE_CATEGORY"},
						    {21,"DELETE_CATEGORY"},
						    {22,"ADD_SYSTEM_ALBUM"},
						    {23,"UPDATE_SYSTEM_ALBUM"},
						    {24,"DELETE_SYSTEM_ALBUM"},
						    {25,"ADD_BLACKLIST"},	
						    {26,"DELETE_BLACKLIST"},
						    {27,"APPROVE_USER_CREATED_CONTENT"},
						    {28,"REJECT_USER_CREATED_CONTENT"},
						    {29,"ACCEPT_GIFTED_TONE"},	
						    {30,"REJECT_GIFTED_TONE"},
						    {31,"GIFT_A_TONE"},
						    {32,"GET_GIFTED_TONES"},
						    {33,"GET_NEED_TO_ACCEPT_GIFTED_TONES"},
						    {34,"GET_PENDING_USER_CONTENTS"},
						    {35,"IS_IN_BLACKLIST"},
						    {36,"DELETE_USER_CREATED_CONTENT"},
						    {37,"APPROVE_CORPORATE_CONTENT"},
						    {38,"REJECT_CORPORATE_CONTENT"},
						    {39,"DELETE_CORPORATE_CONTENT"},
						    {40,"ACTIVATE_STATUS_css"},
						    {41,"DEACTIVATE_STATUS_css"},	
						    {42,"DOWNLOAD_CONTENT_TO_USER_PROFILE"},
						    {43,"DOWNLOAD_ALBUM_TO_USER_PROFILE"},
						    {44,"DEL_DOWNLOADED_CONTENT"},
						    {45,"SET_REVERSE_css_CONTENT"},
						    {46,"CREATE_USER_ALBUM"},
						    {47,"SET_AS_SYSTEM_CONTENT"},
						    {48,"SET_AS_SYSTEM_SONG"},
						    {49,"ADD_USER_GROUP"},
						    {50,"DELETE_USER_GROUP"},
						    {51,"MODIFY_USER_GROUP"},
						    {52,"ADD_USER_GROUP_CONTACTS"},
						    {53,"UPDATE_USER_ALBUM"},
						    {54,"DEL_DOWNLOADED_ALBUM"},
						    {55,"GET_USER_ALBUM"},
						    {56,"GET_ALL_USER_ALBUMS"},
						    {57,"SET_AS_SYSTEM_ALBUM_CONTENT"},
							{58,"VIEW_SYSTEM_CONTENTS_BY_ARTIST"},
						    {59,"VIEW_SYS_CONTENTS_BY_ARTIST"},
						    {60,"VIEW_SYSTEM_ALBUMS_BY_ARTIST"},
						    {61,"VIEW_DEFAULT_CONTENTS_BY_ARTIST"},
							{62,"CREATE_CORPORATE_PROFILE"},
						    {63,"UPDATE_CORPORATE_PROFILE"},
						    {64,"DELETE_CORPORATE_PROFILE"},
						    {65,"GET_CORPORATE_PROFILE"},
							{66,"ADD_CONTENT_TO_USER_ALBUM"},
						    {67,"GET_USER_ALBUM_CONTENTS"},
						    {68,"ADD_CONTACTS_TO_CORPORATES"},
						    {69,"DELETE_CONTACTS_FROM_CORPORATES"},
							{70,"GET_CONTACTS_FROM_CORPORATES"},
						    {71,"UPDATE_CONFIGURATION"},
						    {72,"UPDATE_CONFIGURATION_SUPER_ADMIN"},
						    {73,"IS_IN_USER_CONTACTS"},
							{74,"DELETE_USER_CONTACTS"},
						    {75,"ADD_USER_CONTACTS"},
						    {76,"GET_ALL_USER_ALBUM_CONTENTS"},
						    {77,"MODIFY_USER_CONTACTS"},
							{78,"VIEW_CONFIGURATION"},
						    {79,"VIEW_CONFIGURATION_BY_ID"},
						    {80,"VIEW_USER_GROUP_BY_ID"},
							{81,"ADD_CORPORATE_CONTENT"},
						    {82,"UPDATE_CORPORATE_CONTENT"},
						    {83,"DELETE_A_CORPORATE_CONTENT"},
						    {84,"GET_CORPORATE_CONTENTS"},
							{85,"GET_All_CORPORATE_CONTENTS"},
						    {86,"ACT_DEACT_CORPORATE_CONTENT"},
						    {87,"REMOVE_CONTENTS"},
						    {88,"SEARCH_CORPORATES"},
						    {89,"REMOVE_FROM_CATEGORIES"},
							{90,"VIEW_CONTENT_INFO"},
						    {91,"VIEW_USER_GROUP_CONTACTS"},
						    {92,"UPLOAD_USER_CREATED_CONTENT"},
						    {93,"VIEW_USER_CONTENTS"},
							{94,"GET_PROFILE_INFO"},
						    {95,"CREATE_CLIP_TONE"},
						    {96,"CREATE_TWIN_TONE"},
						    {97,"CREATE_MIX_TONE"},
							{98,"GET_DEFAULT_CHARGING_SCHEME"},	
						    {99,"FORGOT_PASSWORD"},
						    {100,"PUBLISH_CLIP_TONE"},
						    {101,"GET_GIFTED_BY_TONES"},
							{102,"VIEW_SCHEDULED_CONTENT"},	
						    {103,"DELETE_USER_ALBUM_CONTENTS"},
						    {104,"UPDATE_NOTIFICATION_SMS"},
						    {105,"ADD_NOTIFICATION_SMS"},
							{106,"DELETE_USER_ALBUM"},
						    {107,"DELETE_SCHEDULED_CONTENT"},
						    {108,"UPDATE_SCHEDULE_css"},
						    {109,"VIEW_USER_GROUP"},
							{110,"DELETE_CONTACT_FROM_USER_GROUP"},	
						    {111,"TOP_DOWNLOAD_ALBUM"},
						    {112,"TOP_DOWNLOAD_TONE"},
						    {113,"GET_NEW_ARRIVLES"},
							{114,"GET_NEW_ARRIVLESUSER_DOWNLOADED_SYSTEM_CONTENTS"},
						    {115,"USER_DOWNLOADED_SYSTEM_CONTENTS"},
						    {116,"USER_DOWNLOADED_SYSTEM_ALBUM"},
						    {400,"SET_CORPORATE_CONTENT_ACTIVE"},							
						    {401,"SET_CORPORATE_CONTENT_DEACTIVE"},
							{402,"ADD_TO_BLACKLIST"},	
							{403,"DELETE_FROM_BLACKLIST"},		
							{404,"CUSTOMER_CARE_ADMIN_LOGIN"},
							{405,"GET_ALL_CORPORATES"},
							{406,"GET_CORPORATE_BY_ID"},
							{407,"SEARCH_CORPORATE_CONTENT"},
							{408,"ADD_COPORATE_PROFILE"},
							{409,"GET_CORPORATE_CONTACTS"},
							{410,"SET_CORPORATE_CONTENT_UPDATE"},
							{411,"DEACTIVATE_CORPORATE_TONES"},
							{412,"ACTIVATE_CORPORATE_TONES"},
							{412,"GET_ACTIVE_CORPORATE_CONTENT"},
							{413,"GET_CORPORATE_CONTENT_BY_ID"}]).							
