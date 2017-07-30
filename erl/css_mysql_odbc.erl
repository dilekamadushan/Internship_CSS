%%% css_mysql_odbc.erl
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%  @copyright 2012 WaveNET International (Pvt) Ltd.
%%%  @end
%%%  This computer program(s) is proprietary software and the intellectual
%%%  property of WAVENET INTERNATIONAL (PVT) LIMITED (hereinafter referred
%%%  to as “WaveNET”).  Unless otherwise specified, all materials contained
%%%  in herein are copyrighted and may not be used except as provided in 
%%%  these terms and conditions or in the copyright notice (documents and
%%%  software) or other proprietary notice provided with, or attached to,
%%%  the software or relevant document, or is otherwise referenced as 
%%%  applicable to the software.
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%% @doc Connect to SQL server using odbc application. 

-module(css_mysql_odbc).
-copyright('Copyright (c) 2012 WaveNET International (Pvt) Ltd.').

-include("css_conf.hrl").
-include("css_api.hrl").

-export([connect/0, connect/2, disconnect/1]).
-export([sql_query/2, sql_query/3, param_query/3, param_query/4, select_count/2, select_count/3]).

-type n_rows() :: integer().
-type col_name() :: string().
-type precision() :: integer().    
-type scale() :: integer().    
-type size() :: integer(). 
-type milliseconds() :: integer().   
-type result_tuple() :: {updated, n_rows()} | {selected, [col_name()], [{null | term()}]}.
-type odbc_data_type():: sql_integer | sql_smallint | sql_tinyint |
      {sql_decimal, precision(), scale()} |
      {sql_numeric, precision(), scale()} |
      {sql_char, size()} | {sql_wchar, size()} | {sql_varchar, size()} | {sql_wvarchar, size()}| {sql_float, precision()} |
      {sql_wlongvarchar, size()} | {sql_float, precision()} | sql_real | sql_double | sql_bit | atom().
	  
-type common_reason() :: odbc_not_started | connection_closed | term().
-type connection_reference() :: pid().

-spec connect()-> {ok, Ref :: connection_reference()} | {error, Reason :: port_program_executable_not_found | common_reason()}. 
connect()->
	{ok,ConnectionString}=application:get_env(yaws_app,css_admin_connection_string),
	odbc:connect(ConnectionString, []).
	
-spec connect(ConnStr :: string(), Options :: list()) -> {ok, Ref :: connection_reference()} | {error, Reason :: port_program_executable_not_found | common_reason()}.
connect(ConnStr, Options) ->
	odbc:connect(ConnStr, Options).
	
-spec disconnect(Ref :: connection_reference()) -> ok | {error, Reason :: process_not_owner_of_odbc_connection}.
disconnect(Ref) ->
	odbc:disconnect(Ref).
	
-spec sql_query(Ref :: connection_reference(), SqlQuery :: string()) -> 
		ResultTuple :: result_tuple()  | [ResultTuple :: result_tuple() ] |{error, Reason :: process_not_owner_of_odbc_connection | common_reason() }. 
%% @doc Create , insert or fetch some data to table
sql_query(Ref, SqlQuery) ->
	odbc:sql_query(Ref, SqlQuery).
	
-spec sql_query(Ref :: connection_reference(), SqlQuery :: string(), TimeOut :: milliseconds() | infinity ) -> 
		ResultTuple :: result_tuple()  | [ResultTuple :: result_tuple() ] |{error, Reason :: process_not_owner_of_odbc_connection | common_reason() }. 
sql_query(Ref, SqlQuery, TimeOut) ->
	odbc:sql_query(Ref, SqlQuery, TimeOut).
	
-spec param_query(Ref :: connection_reference(), SqlQuery :: string(), Params ::[{odbc_data_type(), [term()]}] |[{odbc_data_type(), in | out | inout, [term()]}] ) -> 	
	ResultTuple :: result_tuple | {error, Reason :: common_reason()} .
	
%% @doc Use a parameterized query to insert many rows in one go.
param_query(Ref, SqlQuery, Params) ->
	odbc:param_query(Ref, SqlQuery, Params).
	
-spec param_query(Ref :: connection_reference(), SqlQuery :: string(), Params ::[{odbc_data_type(), [term()]}] |[{odbc_data_type(), in | out | inout, [term()]}], TimeOut :: milliseconds() | infinity ) -> 	
	ResultTuple :: result_tuple | {error, Reason :: common_reason()} .
param_query(Ref, SqlQuery, Params, TimeOut) ->
	odbc:param_query(Ref, SqlQuery, Params, TimeOut).
	
-spec select_count(Ref :: connection_reference(), SelectQuery :: string()) -> {ok, NrRows :: integer()} | {error, Reason :: process_not_owner_of_odbc_connection | common_reason() }. 
select_count(Ref, SelectQuery) ->
	odbc:select_count(Ref, SelectQuery).
	
-spec select_count(Ref :: connection_reference(), SelectQuery :: string(), TimeOut :: milliseconds() | infinity ) -> {ok, NrRows :: integer()} | {error, Reason :: process_not_owner_of_odbc_connection | common_reason() }. 
select_count(Ref, SelectQuery, TimeOut) ->
	odbc:select_count(Ref, SelectQuery, TimeOut).
	


	

	

	

	
