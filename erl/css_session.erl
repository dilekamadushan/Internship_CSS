%%% css_session.erl
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%  @copyright 2012 WaveNET International (Pvt) Ltd.
%%%  @end
%%%  This computer program(s) is proprietary software and the intellectual
%%%  property of WAVENET INTERNATIONAL (PVT) LIMITED (hereinafter referred
%%%  to as "WaveNET").  Unless otherwise specified, all materials contained
%%%  in herein are copyrighted and may not be used except as provided in 
%%%  these terms and conditions or in the copyright notice (documents and
%%%  software) or other proprietary notice provided with, or attached to,
%%%  the software or relevant document, or is otherwise referenced as 
%%%  applicable to the software.
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%% @doc Common methods are implemented here
%%%
-module(css_session).
-copyright('Copyright (c) 2013 WaveNET (Pvt) Ltd.').

-include("css_conf.hrl").
-include("css_api.hrl").
-include("yaws_api.hrl").

-export([
		 init_sess/1,
		 set_sess/3,
		 get_sess/2
]).

init_sess(Arg) ->	
 
	C = (Arg#arg.headers)#headers.cookie,

	case yaws_api:find_cookie_val(?SESSION_NAME, C) of
		[] ->
			NewSessionId = yaws_api:new_cookie_session(#user_session{}),
			Res = NewSessionId;
		SessionID ->
			
			case yaws_api:cookieval_to_opaque(yaws_api:url_decode(SessionID)) of
				{ok, _SessionData} ->
					Res = []; 
				{error, no_session} ->
	
					NewSessionId = yaws_api:new_cookie_session(#user_session{}),
					Res = NewSessionId
			end
	end,
	
	Res.

set_sess(Param, Value, Arg) ->	
	C = (Arg#arg.headers)#headers.cookie,

	case yaws_api:find_cookie_val(?SESSION_NAME, C) of
		[] ->
			{error, no_session};
		SessionID ->
			case yaws_api:cookieval_to_opaque(yaws_api:url_decode(SessionID)) of
				{ok, SessionData} ->
					
					case Param of
						"app" ->
							Sess = SessionData#user_session{app = Value};	
						"company_id" ->
							Sess = SessionData#user_session{company_id = Value};				
						"user_id" ->
							Sess = SessionData#user_session{user_id = Value};
						"acc_status" ->
							Sess = SessionData#user_session{acc_status = Value};
						"name" ->
							Sess = SessionData#user_session{name = Value};
						"display_name" ->
							Sess = SessionData#user_session{display_name = Value};							
						"uniqid" ->
							Sess = SessionData#user_session{uniqid = Value};
						"email" ->
							Sess = SessionData#user_session{email = Value};	
						"first_login" ->
							Sess = SessionData#user_session{first_login = Value};	
						"password" ->
							Sess = SessionData#user_session{password = Value};
						"role_name" ->
							Sess = SessionData#user_session{role_name = Value};
						"last_pwd_change_date" ->
							Sess = SessionData#user_session{last_pwd_change_date = Value};	
						"count" ->
							Sess = SessionData#user_session{count = Value};
						"client" ->
							Sess = SessionData#user_session{client = Value}	;
						"permissions" ->
							Sess = SessionData#user_session{permissions = Value}						
					end,
					
					yaws_api:replace_cookie_session(yaws_api:url_decode(SessionID), Sess),
					{ok, updated};
					
				{error, no_session} ->
					{error, no_session}
			end
	end.  	   

get_sess(Param, Arg) ->	

	C = (Arg#arg.headers)#headers.cookie,
	
	case yaws_api:find_cookie_val(?SESSION_NAME, C) of
		[] ->
			{error, no_session};
		SessionID ->
			case yaws_api:cookieval_to_opaque(yaws_api:url_decode(SessionID)) of
				{ok, SessionData} ->
				
					case Param of 
						"app" ->
							Sess = SessionData#user_session.app;
						"company_id" ->
							Sess = SessionData#user_session.company_id;					
						"user_id" ->
							Sess = SessionData#user_session.user_id;	
						"acc_status" ->
							Sess = SessionData#user_session.acc_status;	
						"name" ->
							Sess = SessionData#user_session.name;
						"display_name" ->
							Sess = SessionData#user_session.display_name;							
						"uniqid" ->
							Sess = SessionData#user_session.uniqid;	
						"email" ->
							Sess = SessionData#user_session.email;
						"first_login" ->
							Sess = SessionData#user_session.first_login;	
						"password" ->
							Sess = SessionData#user_session.password;	
						"role_name" ->
							Sess = SessionData#user_session.role_name;	
						"last_pwd_change_date" ->
							Sess = SessionData#user_session.last_pwd_change_date;							
						"count" ->
							Sess = SessionData#user_session.count;
						"client" ->
							Sess = SessionData#user_session.client;
						"permissions" ->
							Sess = SessionData#user_session.permissions					
					end,				
				
					Sess;
				{error, no_session} ->
					{error, no_session}
			end
	end.