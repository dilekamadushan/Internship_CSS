%%% css_logger.erl
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
%%% @doc This module responsible for writing logs according to log levels
%%%

-module(css_logger).
-copyright('Copyright (c) 2013 WaveNET (Pvt) Ltd.').

-include("css_api.hrl").
-include("css_conf.hrl").

%% Defining log levels
-define(DEBUG, 1).
-define(INFO, 2).
-define(WARNING, 3).
-define(FATAL, 4).

-define(LOG_LEVEL, ?DEBUG).

-export([info/2, warning/2, fatal/2, debug/2, write_log/3]).

-spec info(RecSessionData :: session_data(), Message :: string()) -> ok | file_open_fail.
%% @doc Write info messages.
%%
info(RecSessionData, Message) ->

	if
		?INFO >= ?LOG_LEVEL	->
			write_log(RecSessionData, ?INFO, Message);
		true ->
			ok
	end.

	
-spec warning(RecSessionData :: session_data(), Message :: string()) -> ok | file_open_fail.
%% @doc Write warning messages.
%%	
warning(RecSessionData, Message) ->
	if
		?WARNING >= ?LOG_LEVEL	->
			write_log(RecSessionData, ?WARNING, Message);
		true ->
			ok			
	end.	  

	
-spec fatal(RecSessionData :: session_data(), Message :: string()) -> ok | file_open_fail.
%% @doc Write fatal messages.
%%	
fatal(RecSessionData, Message) ->

	if
		?FATAL >= ?LOG_LEVEL	->
			write_log(RecSessionData,?FATAL, Message);
		true ->
			ok					
	end.


-spec debug(RecSessionData :: session_data(), Message :: string()) -> ok | file_open_fail.
%% @doc Write debug messages.
%%
debug(RecSessionData, Message) ->

	if
		?DEBUG >= ?LOG_LEVEL ->
			write_log(RecSessionData,?DEBUG, Message);
		true ->
			ok		
	end.	  

	
-spec write_log(RecSessionData :: session_data(), Level :: integer(), Message :: string()) -> file_open_fail | any().
%% @doc Write log entry to file.
%%	
write_log(RecSessionData, LogLevel, Message) ->

	User 		= RecSessionData#session_data.username,
	UniqueId 	= RecSessionData#session_data.uniqid,
	App 		= RecSessionData#session_data.app,

	{ok,LogPath}=application:get_env(yaws_app,css_admin_log_path),
	{ok,LogFilePrefix}=application:get_env(yaws_app,css_admin_log_file_prifix),
	Level = integer_to_list(LogLevel),
	LogFile	= LogPath ++ get_formatted_date(erlang:localtime()) ++ LogFilePrefix,	
	Logdata = lists:concat([get_formatted_date_time(erlang:localtime()) , "|" , User , "|" , UniqueId , "|", App , "|" , Level, "|" , Message ,"\n"]),
	DataToLogServer = lists:concat([Level , "|" , get_formatted_date(erlang:localtime()) , "|" , get_formatted_time(erlang:localtime()) ,  "|" , User , "|" , UniqueId , "|",  Message]) ,

	case catch file:open(LogFile, [read,write,append]) of
		{ok, IoDevice}	->
			file:write(IoDevice, Logdata),
			file:close(IoDevice);
		_Else			->
			file_open_fail
	end.	
	
-spec get_formatted_date(DateTime :: tuple()) -> FormattedDate :: string().
%% @doc Format given date.
%%
get_formatted_date(DateTime) ->
%%"2008-09-23".
    {{Year,Month,Day},{_Hour,_Min,_Sec}} = DateTime,
    io_lib:format("~4.10.0B~2.10.0B~2.10.0B",
        [Year, Month, Day]).
	
-spec get_formatted_time(DateTime :: tuple()) -> FormattedTime :: string().		
%% @doc Format given time.
%%
get_formatted_time(DateTime) ->
    {{_Year,_Month,_Day},{Hour,Min,Sec}} = DateTime,
    lists:concat([Hour,":", Min,":", Sec]).	

-spec get_formatted_date_time(DateTime :: tuple()) -> FormattedDateTime :: string().
%% @doc Format date and time.
%%   	
get_formatted_date_time(DateTime) ->
%%"2008-09-15 09:11:52".
    {{Year,Month,Day},{Hour,Min,Sec}} = DateTime,
    io_lib:format("~4.10.0B-~2.10.0B-~2.10.0B ~2.10.0B:~2.10.0B:~2.10.0B",
        [Year, Month, Day, Hour, Min, Sec]).