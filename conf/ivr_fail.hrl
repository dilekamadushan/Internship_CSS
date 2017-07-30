
-ifndef(IVR_FAIL).
-define(IVR_FAIL, 1).


-record(state, {	timer_ref1 :: timer:ref(), 
					timer_ref2 :: timer:ref()
					}).
-type state() :: #state{}.

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

-define(INFO, 			0).
-define(WARNING,		1).
-define(ERROR,			2).
-endif.
