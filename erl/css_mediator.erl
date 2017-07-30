%%%---------------------------------------------------------------------
%%% Copyright 2003-2015 WaveNET (Pvt) Ltd.
%%%
%%% All rights reserved. No part of this computer program(s) may be
%%% used, reproduced, stored in any retrieval system, or transmitted,
%%% in any form or by any means, electronic, mechanical, photocopying,
%%% recording, or otherwise without prior written permission of
%%% WaveNET (Pvt) Ltd.
%%%
%%%---------------------------------------------------------------------

-module(css_mediator).
-copyright('Copyright (c) 2003-2015 WaveNET (Pvt) Ltd.').
-author('aruna@wavenet.lk').
 
-export([call/4]).

call(Node, Module, Function, Args) ->
	error_logger:info_msg("Rpc ===> : rpc:call("++atom_to_list(Node)++", ~p , ~p, ~p).~n",[Module, Function, Args]),
	
	case rpc:call(Node, Module, Function, Args) of  
			
		{badrpc, Reason} ->
			State =  [fail, "Bad RPC"];
					
		nodedown ->
		Reason = 'DOWN',
			State =  [fail, "Node Down"];   
		Res ->
		Reason = 'Other',
			State = Res
	end,
	
	error_logger:info_msg("Res ===> : ~p~p ~n",[State,Reason]),
    
	State.
