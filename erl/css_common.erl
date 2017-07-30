%%% css_common.erl
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
-module(css_common).
-copyright('Copyright (c) 2013 WaveNET (Pvt) Ltd.').

-include("css_conf.hrl").
-include("css_api.hrl").
-include("yaws_api.hrl").

-export([	validate_mobile/1,
			validate_pin/1, 
			toString/1, 
			toBinary/1,
			toInteger/1,
			check_empty/1,
			get_current_timestamp/0,
			get_timestamp/1,
			get_full_timestamp/1,
			get_timestamp_to_date/1,
			set_timestamp_by_hour_min/2,
			get_timestamp_by_hour_min/1,
			get_paging/3,
			ceiling/1,
			is_duplicate/1,
			get_data_time_string/1,
			get_error/1,
			get_formated_message/2,
			format_value/1,
			get_value/4,
			is_int/1,
			check_number/1,
			get_formatted_date/1,
			format_multipart_formdata/3,
			decode_json/1,
			get_ip/1,
			get_json_field/2
]).

validate_mobile(Number) ->
	re:run(integer_to_list(Number),?MOBILE_VALIDATE,[{capture, none}]).
	
validate_pin(Pin) ->
	re:run(integer_to_list(Pin),?PASSWORD_VALIDATE,[{capture, none}]).
	
toString(Value) ->
    if
		is_float(Value) ->
			%float_to_list(Value);
			io_lib:format("~.2f",[Value]);
		is_atom(Value) ->
			atom_to_list(Value);
		is_integer(Value) ->
			integer_to_list(Value);
		is_binary(Value) ->
			binary_to_list(Value);				
		is_list(Value) ->
				Value;
		true ->
				"--"
    end.

toBinary(Value) ->
	if
		is_float(Value) ->
			list_to_binary(io_lib:format("~.2f",[Value]));
		is_atom(Value) ->
			list_to_binary(atom_to_list(Value));
		is_integer(Value) ->
			list_to_binary(integer_to_list(Value));
		is_list(Value) ->
			list_to_binary(Value);
		true ->
			list_to_binary("--")
	end.

toInteger(Value) ->
	if
		is_atom(Value) ->
			list_to_integer(atom_to_list(Value));
		is_list(Value) ->
			list_to_integer(Value);
		is_integer(Value) ->
			Value;
		true ->
			0
	end.
	
check_empty(Value) ->
	
	if
	Value == [] ->
		ReturnStr = "_";
	true ->
		ReturnStr = Value
	end,
	ReturnStr.
	
set_timestamp_by_hour_min(GetHour,GetMin) ->

	{{GetYear,GetMonth,GetDay},{_Hour,_Min,_Sec}} = erlang:localtime(),
	
	StartTime 	= calendar:datetime_to_gregorian_seconds({{GetYear,GetMonth,GetDay},{0,0,0}}),
	EndTime 	= calendar:datetime_to_gregorian_seconds({{GetYear,GetMonth,GetDay},{list_to_integer(GetHour),list_to_integer(GetMin),0}}),
		
	Time = (EndTime-StartTime) + 943900200,
	Time.

get_timestamp_by_hour_min(GetSeconds) ->

	Seconds = GetSeconds - 943900200,
	
	{{GetYear,GetMonth,GetDay},{_Hour,_Min,_Sec}} = erlang:localtime(),
	
	StartTime 	= calendar:datetime_to_gregorian_seconds({{GetYear,GetMonth,GetDay},{0,0,0}}),
	EndTime 	= StartTime + Seconds,
		
	{{_GetYear,_GetMonth,_GetDay},{GetHour,GetMin,_GetSec}} = calendar:gregorian_seconds_to_datetime(EndTime),
	
	if
	GetHour < 10 ->
		GetHour_ = "0" ++ integer_to_list(GetHour);
	true ->
		GetHour_ = integer_to_list(GetHour)
	end,

	if
	GetMin < 10 ->
		GetMin_ = "0" ++ integer_to_list(GetMin);
	true ->
		GetMin_ = integer_to_list(GetMin)
	end,	
	
	Time = GetHour_ ++ ":" ++ GetMin_,
	Time.	
	
get_current_timestamp() ->
	Time = calendar:datetime_to_gregorian_seconds(erlang:localtime()) - 62167239000,
	Time.

get_timestamp(GetDate) ->
	[GetMonth,GetDay,GetYear,GetHour,GetMin] = string:tokens(GetDate, "/ :"),
	calendar:datetime_to_gregorian_seconds({{list_to_integer(GetYear),list_to_integer(GetMonth),list_to_integer(GetDay)},{list_to_integer(GetHour),list_to_integer(GetMin),0}}) - 62167239000.
	
get_full_timestamp(GetDate) ->
	[GetYear,GetMonth,GetDay,GetHour,GetMin,GetSec] = string:tokens(GetDate, "/ :"),
	calendar:datetime_to_gregorian_seconds({{list_to_integer(GetYear),list_to_integer(GetMonth),list_to_integer(GetDay)},{list_to_integer(GetHour),list_to_integer(GetMin),list_to_integer(GetSec)}}) - 62167239000.
	
get_timestamp_to_date(GetSeconds) ->
	{{GetYear,GetMonth,GetDay},{GetHour,GetMin,_}} = calendar:gregorian_seconds_to_datetime(GetSeconds+62167239000),
	
	if
	GetHour < 10 ->
		GetHour_ = "0" ++ integer_to_list(GetHour);
	true ->
		GetHour_ = integer_to_list(GetHour)
	end,

	if
	GetMin < 10 ->
		GetMin_ = "0" ++ integer_to_list(GetMin);
	true ->
		GetMin_ = integer_to_list(GetMin)
	end,	
	
	Time = integer_to_list(GetMonth) ++ "/" ++ integer_to_list(GetDay) ++ "/" ++ integer_to_list(GetYear) ++ " " ++ GetHour_ ++ ":" ++ GetMin_,
	Time.

get_paging(Ref, PageLimit, Table) ->

   Sql = "SELECT COUNT(*) AS count FROM " ++ Table, 
   		   
   case css_mysql_odbc:sql_query(Ref, Sql) of  
		{_Aa,_Bb,[{Res}]} ->
			Count 		= list_to_integer(Res),
			PageCount 	= ceiling((Count/PageLimit)),
		
			Response = [Count,PageCount];
		{error,_Reason} ->				
			Response = [0,0];
		_ ->				
			Response = [0,0]			
		end,

	Response.	
	
ceiling(X) ->
    T = erlang:trunc(X),
    case (X - T) of
        Neg when Neg < 0 -> T;
        Pos when Pos > 0 -> T + 1;
        _ -> T
    end.

is_duplicate(Message) ->

	Res = string:str(toString(Message), "Duplicate entry"),
			
	Res.
get_data_time_string(Time) ->
	{{GetYear,GetMonth,GetDay},{GetHour,GetMin,GetSec}} = Time,
	
	if
	GetHour < 10 ->
		GetHour_ = "0" ++ integer_to_list(GetHour);
	true ->
		GetHour_ = integer_to_list(GetHour)
	end,

	if
	GetMin < 10 ->
		GetMin_ = "0" ++ integer_to_list(GetMin);
	true ->
		GetMin_ = integer_to_list(GetMin)
	end,

	if 
	GetSec < 10 ->
		GetSec_ = "0" ++ integer_to_list(GetSec);
	true ->
		GetSec_ = integer_to_list(GetSec)
	end,		
	integer_to_list(GetMonth) ++ "/" ++ integer_to_list(GetDay) ++ "/" ++ integer_to_list(GetYear) ++ " " ++ GetHour_ ++ ":" ++ GetMin_++":"++GetSec_.
	
get_error(Key) ->
	
	Result = lists:keyfind(Key, 1, ?ERROR_MESSAGES),
	
	if
		Result == false -> 
			StrArr = string:tokens(css_common:toString(Key),"_"),
			Value  = css_common:toString(get_formated_message(StrArr, []));
		true ->
			Value_ = element(2, Result),
			Value  = css_common:toString(Value_)
	end,
	
	Value.

get_formated_message([], Message) ->
	Err = string:join(Message, " "),
	Err;	
get_formated_message([Row|Rest], Message) ->

	Length      = string:len(Row),

	FirstLetter = string:to_upper(string:sub_string(Row, 1, 1)),
	Tail		= string:sub_string(Row, 2, Length),
	
	Word 		= string:concat(FirstLetter, Tail),

	UpdateMessage = lists:concat([Message, [Word]]),

	get_formated_message(Rest, UpdateMessage).	
	
format_value(Value) -> 
	
	if
		Value < 10 ->
			FormattedValue = "0" ++ integer_to_list(Value);
		true ->
			FormattedValue = integer_to_list(Value)
	end,

FormattedValue.	

get_value(Key, ValueList, Pos, GetPos) ->

	Result = lists:keyfind(Key, Pos, ValueList),
	
	if
		Result == false ->
			Value = css_common:toString(Key);
		true ->
			Value_ = element(GetPos, Result),
			Value  = css_common:toString(Value_)
	end,
	
	Value.
	
is_int(Value) ->

	IsInt = re:run(Value, "^[0-9]*$"),
	
	case IsInt of
		{match,_}->
			RetVal = true;
		_->
			RetVal = false
	end,

RetVal.	

check_number(Number) ->  
	
	NumLength = string:len(Number),
	
	if
		NumLength >= ?MSISDN_MIN_LEN andalso NumLength =< ?MSISDN_MAX_LEN ->
			RetVal = true;
		true -> 
			RetVal = false
	end,

	RetVal.

get_formatted_date(Value) ->

	if
		Value == null ->
			Date = "--";
		true ->

			{{GetYear,GetMonth,GetDay},{Hour,Min,Sec}} = Value,

			Date = css_common:format_value(GetYear) ++ "-" 
					++ css_common:format_value(GetMonth) ++ "-" 
					++ css_common:format_value(GetDay) ++ " " 
					++ css_common:format_value(Hour) ++ ":" 
					++ css_common:format_value(Min) ++ ":" 
					++ css_common:format_value(Sec)
	end,

	Date.

format_multipart_formdata(Boundary, Fields, Files) ->

    FieldParts = lists:map(fun({FieldName, FieldContent}) ->
        [lists:concat(["--", Boundary]),
            lists:concat(["Content-Disposition: form-data; name=\"",atom_to_list(FieldName),"\""]),
            "", FieldContent]
                           end, Fields),

    FieldParts2 = lists:append(FieldParts),


    FileParts = lists:map(fun({FieldName, FileName, FileContent}) ->

        [lists:concat(["--", Boundary]),
            lists:concat(["Content-Disposition: form-data; name=\"",atom_to_list(FieldName),"\"; filename=\"",FileName,"\""]),
            lists:concat(["Content-Type: ", "application/octet-stream"]), "", FileContent]
                          end, Files),
    FileParts2 = lists:append(FileParts),
    EndingParts = [lists:concat(["--", Boundary, "--"]), ""],
    Parts = lists:append([FieldParts2, FileParts2, EndingParts]),
    string:join(Parts, "\r\n").	
	
-spec decode_json(Data :: string()) ->DecodedData :: term().
%% @doc decode json
decode_json(JsonString) ->
	case catch rfc4627:decode(JsonString) of
		{ok,Data,[]} ->
			{ok, Data};
		{'EXIT', Exception} ->
			{error, json_decode_error};
		DecodeError ->
			{error, json_decode_error}
	end.
	

-spec get_json_field(Data :: any(), Field :: string()) ->any().
%% @doc  get given field from json object
get_json_field(Data, Field) ->
	
	case catch binary_to_list(rfc4627:get_field(Data, Field, <<>>)) of
		[] ->
			undefined;
		{'EXIT', _Reason} ->
			case  is_integer(rfc4627:get_field(Data, Field, <<>>)) of
				true ->
					rfc4627:get_field(Data, Field, <<>>);
				false ->
					undefined
			end;
		Value ->
			Value
end.	

get_ip(Arg) ->
	
	Ip_ = Arg#arg.client_ip_port,
	
	{{Ip1,Ip2,Ip3,Ip4},_} = Ip_, 
	Ip = toString(Ip1) ++ "." ++ toString(Ip2) ++ "." ++ toString(Ip3) ++ "." ++ toString(Ip4),
	Ip.		
