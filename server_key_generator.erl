-module(server_key_generator).
-export([gen_key/0]).

%% Function to execute CMD Commands and filter the necessary content
exec_comm(Start, End, Command, Begin) ->
	DmidecodeContent = os:cmd(Command),
	Index = string:str(DmidecodeContent, Begin), 
	DmiStr2 = string:substr(DmidecodeContent,Index),
	KeyValue = re:split(DmiStr2, Start),
	KeyGroup = [binary_to_list(Item) || Item <- KeyValue],
	Key = lists:nth(1, re:split(lists:nth(2, KeyGroup), End)),
	KeyOutputValue = re:replace(binary_to_list(Key), "\\s+", "", [global,{return,list}]),
	KeyOutputValue.

get_serial_key() ->
	exec_comm("Serial Number:", "UUID", "dmidecode", "System Information").

get_uuid() ->
	exec_comm("UUID:", "Wake-up Type:", "dmidecode", "System Information").

get_mac() ->
	exec_comm("HWaddr", "inet", "ifconfig", "Ethernet").

%% Function to encrypt the content and create the hash. Encryption type is DES CBC. Hashing method is MD5
get_encrypt() ->
	SerialKey = get_serial_key(),
	UUID = get_uuid(),
	Mac = get_mac(),
	CummVal = lists:concat([SerialKey, UUID, Mac]),
	CummValLength = string:len(CummVal) rem 8,

	if
		CummValLength == 0 ->
			TobeEncrypted = CummVal;
		true ->
			StuffBytes = 8-CummValLength,
			TobeEncrypted = lists:flatten(lists:duplicate(StuffBytes,"^")) ++ CummVal
	end,

	Key = <<16#09,16#27,16#45,16#63,16#82,16#ac,16#cf,16#eb>>,
    Ivec = <<16#18,16#37,16#56,16#75,16#94,16#ad,16#cf,16#ef>>,
    
	FunctionIfExist = erlang:function_exported(crypto, block_encrypt, 4),
    if
	FunctionIfExist == true ->
		EncryptedVal = crypto:block_encrypt(des_cbc, Key, Ivec, re:replace(TobeEncrypted, "(^\\s+)|(\\s+$)", ""));
	true ->
		EncryptedVal = crypto:des_cbc_encrypt(Key, Ivec, re:replace(TobeEncrypted, "(^\\s+)|(\\s+$)", ""))
    end,

	SvrKeyHashedVal = erlang:md5(EncryptedVal),
	binary_to_list(SvrKeyHashedVal).

gen_key() ->
	get_encrypt().