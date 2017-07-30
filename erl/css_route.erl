-module(css_route).

-include("css_api.hrl").
-include("css_conf.hrl").
-include("yaws_api.hrl").

-export([out/1]).

out(Arg) ->
	C = (Arg#arg.headers)#headers.cookie,
	{ok,WebRoot}=application:get_env(yaws_app,css_admin_web_root),
	case yaws_api:find_cookie_val(?SESSION_NAME, C) of
		[] ->
			[{status, 303},
				{allheaders, 
					[{header, ["Location: ",WebRoot++?LOGIN]}]},
				{html, ""}
			];
		SessionID ->
			case yaws_api:cookieval_to_opaque(SessionID) of
				{ok, SessionData} ->
					Method = (Arg#arg.req)#http_request.method,
					Uri = yaws_api:request_url(Arg),
					Path = lists:nthtail(1, string:tokens(Uri#url.path, "/")),
					Permissions=SessionData#user_session.permissions,
					App=SessionData#user_session.app,
					if
						Path == ["logout"] ->
							if
								SessionData#user_session.app == css_login ->
									LoginPage = WebRoot++?LOGIN;
								true ->
									LoginPage = WebRoot++?COMMON_LOGIN
							end,
							yaws_api:delete_cookie_session(SessionID),
							[{status, 303},
								{allheaders, 
									[{header, ["Location: ",LoginPage]}]},
								{html, ""}, [yaws_api:setcookie(?SESSION_NAME, "", "/")]
							];
							
						Path == ["main_page"] ->
							HomePage = WebRoot++?COMMON_HOME_URL	,				
							[{status, 303},
								{allheaders, 
									[{header, ["Location: ", HomePage]}]}];

						Path == ["common_page"] ->
					
							[{status, 303},
								{allheaders, 
									[{header, ["Location: ", WebRoot++?COMMON_HOME_URL]}]}];									
							
						true ->

							handle_admin(Method, Path, Permissions)
					end;
				{error, no_session} ->
					error_logger:info_msg("################## NO SESSION #####################"),
					[{status, 303}, 
						{allheaders, 
							[{header, ["Location: ",WebRoot++?LOGIN]}]},
						{html, ""}, [yaws_api:setcookie(?SESSION_NAME, "", "/")]
					]
			end
	end.

handle_admin('GET', ["home"], Permissions) ->
	get_page(?HOME, ?HOME_PERMISSIONS, Permissions);
	
handle_admin('GET', ["subscriber_search"], Permissions) ->
	get_page(?SUBSCRIBER_SEARCH, ?SUBSCRIBER_SEARCH_PERMISSIONS, Permissions);
	
handle_admin('GET', ["subscriber_register"], Permissions) ->
	get_page(?SUBSCRIBER_REGISTER, ?SUBSCRIBER_REGISTER_PERMISSIONS, Permissions);

handle_admin('GET', ["service_create"], Permissions) ->
	get_page(?SERVICE_CREATE, ?SERVICE_CREATE_PERMISSIONS, Permissions);
	
handle_admin('GET', ["service_search"], Permissions) ->
	get_page(?SERVICE_SEARCH, ?SERVICE_SEARCH_PERMISSIONS, Permissions);	

handle_admin('GET', ["provider_create"], Permissions) ->
	get_page(?PROVIDER_CREATE, ?PROVIDER_CREATE_PERMISSIONS, Permissions);
	
handle_admin('GET', ["provider_search"], Permissions) ->
	get_page(?PROVIDER_SEARCH, ?PROVIDER_SEARCH_PERMISSIONS, Permissions);	
	
handle_admin('GET', ["channel_create"], Permissions) ->
	get_page(?CHANNEL_CREATE, ?CHANNEL_CREATE_PERMISSIONS, Permissions);
	
handle_admin('GET', ["channel_search"], Permissions) ->
	get_page(?CHANNEL_SEARCH, ?CHANNEL_SEARCH_PERMISSIONS, Permissions);
	
handle_admin('GET', ["group_create"], Permissions) ->
	get_page(?GROUP_CREATE, ?GROUP_CREATE_PERMISSIONS, Permissions);
	
handle_admin('GET', ["group_search"], Permissions) ->
	get_page(?GROUP_SEARCH, ?GROUP_SEARCH_PERMISSIONS, Permissions);

handle_admin('GET', ["user_create"], Permissions) ->
	get_page(?USER_CREATE, ?USER_CREATE_PERMISSIONS, Permissions);
	
handle_admin('GET', ["user_search"], Permissions) ->
	get_page(?USER_SEARCH, ?USER_SEARCH_PERMISSIONS, Permissions);	
	
handle_admin('GET', ["config_general"], Permissions) ->
	get_page(?CONFIG_GENERAL, ?CONFIG_GENERAL_PERMISSIONS, Permissions);

handle_admin('GET', ["config_content_provider"], Permissions) ->
	get_page(?CONFIG_CNT_PROVIDER, ?CONFIG_CNT_PROVIDER_PERMISSIONS, Permissions);	
	
handle_admin('GET', ["config_operator_create"], Permissions) ->
	get_page(?CONFIG_OPERATOR_CREATE, ?CONFIG_OPERATOR_CREATE_PERMISSIONS, Permissions);
	
handle_admin('GET', ["config_operator_search"], Permissions) ->
	get_page(?CONFIG_OPERATOR_SEARCH, ?CONFIG_OPERATOR_SEARCH_PERMISSIONS, Permissions);

handle_admin('GET', ["config_sms_create_platform"], Permissions) ->
	get_page(?CONFIG_SMS_PLATFORM_CREATE, ?CONFIG_SMS_PLATFORM_CREATE_PERMISSIONS, Permissions);
	
handle_admin('GET', ["config_sms_search_platform"], Permissions) ->
	get_page(?CONFIG_SMS_PLATFORM_SEARCH, ?CONFIG_SMS_PLATFORM_SEARCH_PERMISSIONS, Permissions);

handle_admin('GET', ["config_sms_message"], Permissions) ->
	get_page(?CONFIG_SMS_MESSAGE, ?CONFIG_SMS_MESSAGE_PERMISSIONS, Permissions);

handle_admin('GET', ["config_hpov"], Permissions) ->
	get_page(?CONFIG_HPOV_MESSAGE, ?CONFIG_HPOV_MESSAGE_PERMISSIONS, Permissions);	
	
handle_admin('GET', ["monitor_summary"], Permissions) ->
	get_page(?MONITOR_SUMMARY, ?MONITOR_SUMMARY_PERMISSIONS, Permissions);	

handle_admin('GET', ["monitor_subscription"], Permissions) ->
	get_page(?MONITOR_SUBSCRIPTION, ?MONITOR_SUBSCRIPTION_PERMISSIONS, Permissions);

handle_admin('GET', ["monitor_scheduler"], Permissions) ->
	get_page(?MONITOR_SCHEDULER, ?MONITOR_SCHEDULER_PERMISSIONS, Permissions);
	
handle_admin('GET', ["monitor_sms"], Permissions) ->
	get_page(?MONITOR_SMS, ?MONITOR_SMS_PERMISSIONS, Permissions);	
	
handle_admin('GET', ["monitor_intec"], Permissions) ->
	get_page(?MONITOR_INTEC, ?MONITOR_INTEC_PERMISSIONS, Permissions);

handle_admin('GET', ["monitor_hpov"], Permissions) ->
	get_page(?MONITOR_HPOV, ?MONITOR_HPOV_PERMISSIONS, Permissions);

handle_admin('GET', ["report_daily"], Permissions) ->
	get_page(?REPORT_DAILY, ?REPORT_DAILY_PERMISSIONS, Permissions);

handle_admin('GET', ["report_monthly"], Permissions) ->
	get_page(?REPORT_MONTHLY, ?REPORT_MONTHLY_PERMISSIONS, Permissions);	
	
handle_admin('GET', ["report_sla"], Permissions) ->
	get_page(?REPORT_SLA, ?REPORT_SLA_PERMISSIONS, Permissions);	

handle_admin('GET', ["report_transaction"], Permissions) ->
	get_page(?REPORT_TRANSACTION, ?REPORT_TRANSACTION_PERMISSIONS, Permissions);	
	
handle_admin('GET', ["report_service"], Permissions) ->
	get_page(?REPORT_SERVICE, ?REPORT_SERVICE_PERMISSIONS, Permissions);		

handle_admin('GET', ["report_subscription"], Permissions) ->
	get_page(?REPORT_SUBSCRIPTION, ?REPORT_SUBSCRIPTION_PERMISSIONS, Permissions);	
	
handle_admin(_Method, _Path, _Permissions) ->
	[{status, 404},{html, "ERROR 404/NOT FOUND"}].
	%get_page(_Path ++ ".html", _Path, _Permissions).

check_permission([], _) ->
	false;
	
check_permission([Perm|Rest], AllowedPerm) ->
	if
		Perm == true ->
			true;
		true ->
			Check = lists:member(Perm, AllowedPerm),
			if
				Check == true ->
					true;
				true ->
					check_permission(Rest, AllowedPerm)
			end
	end.
	
get_page(PageName, CheckPerm, AllowPerm) ->
	
	PermStat = check_permission(CheckPerm, AllowPerm),
	
	if
		PermStat == true ->
			{ok,RootDirectory}=application:get_env(yaws_app,css_admin_root_path),
			error_logger:info_msg("~p",[RootDirectory++PageName]),
			{ok, Binary} = file:read_file(RootDirectory++PageName),
			Page = binary_to_list(Binary),
			{html, Page};
		true ->
			[{status, 404},{html, "ERROR 404/NOT FOUND"}]
	end.
	
