-record(admin_data, { 
	id :: integer(),
    admin_name :: string()
}).
				
-type admin_data() :: #admin_data{}.

-record(admin_log_record, { 
	vala :: string(),
    valb :: string(),
	valc :: string(),
	vald :: string(),
	vale :: string(),
	valf :: string(),
	valg :: string()
}).
				
-type admin_log_record() :: #admin_log_record{}.

-record(user_log_record, { 
	vala :: string(),
    valb :: string(),
	valc :: string(),
	vald :: string(),
	vale :: string(),
	valf :: string(),
	valg :: string(),
	valh :: string()
}).
				
-type user_log_record() :: #user_log_record{}.

-record(user_packages, { 
	pkg_id :: integer(),
    pkg_name :: string(),
	pkg_desc :: string(),
    vm :: atom(),
    mca :: atom(),
	mcaa :: atom(),
	illegal_access_threshold :: integer(),
	auto_forwarding_to_email :: atom(),
	call_return :: atom(),
	record_duration :: integer(),
	message_compose :: atom(),
	email_notifications :: atom(),
	message_copy :: atom(),
	greeting :: atom(),
	pin_protection :: atom(),
	message_quota :: integer(),          
	read_receipt :: atom(),		
	message_reply :: atom(),
	message_saving :: integer(),
	save_sent :: atom(),
	user_web_access :: atom(),
	signature  :: atom(),
	message_save_quota :: integer()
}).
				
-type user_packages() :: #user_packages{}.

-record(monthly_summary, {
	year :: integer(),
	month :: integer(),
	operator :: string(),
	user_type = unknown :: prepaid | postpaid,
	total_calls = 0 :: integer(),
	total_minutes = 0  :: integer(),
	total_chargeable_minutes = 0 :: integer()	
}).

-type monthly_summary() :: #monthly_summary{}.

-record(user_report, { 
		user :: string(),
		total_incoming_calls = 0 :: integer(),
		total_listen_calls = 0 :: integer(),
		total_listening_duration = 0 :: integer(),
		total_leaving_duration = 0 :: integer()
}).

-type user_report() :: #user_report{}.	

-record(save_message_summary, {	date :: string(),% "2014-01-31"
								created :: integer(),
								total_activated_subscribers = 0 :: integer(), 
								total_save_message_vm_boxes = 0 :: integer(),
								average_msg_per_saved_subscriber = 0.0 :: float()}). 
-type save_message_summary() :: #save_message_summary{}.

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

-record(client_info, {	client_id :: integer(),
						client_name :: string(),
						client_description :: string(),
						package_name :: atom(),
						applications :: [atom(),...],
						user_info,
						obd_info,
						bulksmsc_info}).
-type client_info() :: #client_info{}.

%% Record to store session data
-record(session_data,
	{
		username = "",
		uniqid = "",
		app	   = ""
	}
).
-type session_data() :: #session_data{}.

-record(company, {
			company_id :: integer(),
			company_name :: string(),
			max_user_count :: integer(),
			description :: string()	
		}).
				
-type company() :: #company{}.	

-record(paths,{ id ::integer(),
				path :: string(),
				name :: string()
				}).
-type paths() :: #paths{}.  

-record(prompts,{url :: string(),	
				name :: string(),
				size :: float(),
				date :: tuple(),
				type :: string(),
				upload_type :: string(),
				user :: string(),
				path :: string(),
				company :: integer(),
				duration :: float()
				}).

-type prompts() :: #prompts{}.

-record(service, {  id :: integer(), 
					name :: string(),
					description :: string(),
					access_code :: string(),
					type :: atom(),
					codec :: string(),
					access_type :: atom(),
					status :: atom(),
					created_date :: tuple(),
					created_by :: integer(),
					port_number :: integer(),
					svn_revision :: integer(),
					deploy_count :: integer(),
					company_id :: integer(),
					department_id :: integer(),
					dtmf_payload :: integer()
				 }).
-type service() :: #service{}.

%css records

-record(upload, {
          fd,
          filename,
          last,
		  name,
		  group_id,
		  username,
		  uniqid,
		  log_data}).
		  
-type upload() :: #upload{}.

-record(access_profile, {
				package_id :: integer(),
				name :: string(),
				description :: string(),
				created_date :: string(),
				auto_accept_gifted :: integer(), %%0 - user preference is used. 1 - automatically accept the tone without considering user preference
				unlimited_download :: integer(),
				partial_ad_css :: integer(),
				config_copy_protection ::  integer(),
				allow_record_css :: integer(),
				allow_upload_css :: integer(),
				allow_clip_css :: integer(),
				allow_mixed_css :: integer(),
				allow_twin_css :: integer(), 
				allow_reverse_css :: integer(),
				auto_accept_user_created_tone :: integer(),
				allow_tone_gift :: integer(),
				auto_renewal_status :: integer()}).
				
-type access_profile() :: #access_profile{}.

-record(charging_scheme, {
			package_id :: integer(),
			name :: string(),
			charging_category :: integer(),
			subs_charging_freq :: integer(),
			content_charging_freq :: string(),
			content_type :: integer(),
			charging_amount :: float(),
			trial_period :: integer(),
			grace_period :: integer(),
			insufficient_action ::  integer(),
			pay_per_use :: integer(),
			reward_points_for_download :: integer(),
			reward_points_for_renewal :: integer(),
			reward_points_for_use :: integer(),
			monthly_renewal_charging_amount :: float(),
			weekly_renewal_charging_amount :: float(),
			daily_renewal_charging_amount :: float(),
			content_insufficient_action :: integer(),
			content_grace_period :: integer()}).
-type charging_scheme() :: #charging_scheme{}.		

-record(user_profile, {
			msisdn :: integer(),
			name :: string(),
			pin :: integer(), 
			user_type :: integer(),
			package_id :: integer(),
			create_date :: string(),
			account_status :: integer(),
			prepaid ::integer(),
			next_charging_date :: string(),
			pay_per_use :: float(),
			charging_package :: integer(),
			auto_accept_gifted :: integer(),
			copy_protection :: integer(),
			trial_period_end_date :: string(),
			language :: integer(),
			status_css_tone_id :: integer(),
			status_css_duration :: integer(),
			auto_renewal_status :: integer(),
			renewal_date:: string(),
			charging_day_of_month :: integer()}).
			
-type user_profile() :: #user_profile{}.

-record(corporates,{
			corporate_id :: integer(),
			name :: string(),
			description :: string(),
			created_date :: string(),
			billing_number :: integer(),
			max_num_of_users :: integer(),
			fixed_amount_per_month :: float(),
			per_user_amount_per_month :: float(),
			email_address :: string(),
			status :: integer(),
			next_charging_date :: string(),
			type :: integer(),
			expiry_date :: string()}).
			
-type corporates() :: #corporates{}.			

-record(uploaded_contents, {
			content_id :: integer(), % auto increment ID
			file_path :: string(),
			uploaded_by :: string(),
			name :: string(),
			artist :: string(),
			preview_clip :: string(),
			uploaded_time :: string(),
			to_time :: string(),
			uploader_type :: integer(),
			content_type :: integer(),
			status :: integer(),
			original_album :: string(),
			original_category :: string(),
			rejected_date :: string(),
			rejected_reason :: string()}).

-type uploaded_contents() :: #uploaded_contents{}.

-record (user_created_contents, {		
			content_id :: integer(),
			content_name :: string(),
			owner :: integer(),
			uploaded_time :: string(),
			content_path :: string(),
			content_type :: integer(),
			status :: integer(),
			orig_contentid :: integer(),
			orig_contentid2 :: integer(),
			orig_contentid3 :: integer(),
			orig_user :: integer(),
			rejected_date :: string(),
			renewal_date :: string(),
			rejected_reason :: string()}).	

-type user_created_contents() :: #user_created_contents{}.			

-record (corporate_contents, { 	
			content_id :: integer(),
			corporate_id :: integer(),
			content_name :: string(),
			content_path :: string(), 
			content_status :: integer(),
			active_status :: integer(),
			rejected_date :: string(),
			rejected_reason :: string()}).
			
-type corporate_contents() :: #corporate_contents{}.	

-record(categories, {
			category_id :: integer(),
			category_name :: string(),
			category_level :: string(),
			parent_cat_id :: string(),
			preview_clip :: string()}). 	

-type categories() :: #categories{}.	 		

-record(system_album, {
			album_id :: integer(),
			name :: string(),
			artist :: string(),
			image_path :: string(),
			charging_package :: integer(),
			expiry_date :: string(),
			available_date :: string(),
			preview_clip :: string(),
			create_date :: string()}).
			
-type system_album() :: #system_album{}.	

-record(system_contents, {
			content_id :: integer(),
			name :: string(),
			artist :: string(),
			charging_package :: integer(),
			expiry_date :: string(),
			available_date :: string(),
			category_level1 :: integer(),
			category_level2 :: integer(),
			category_level3 :: integer(),
			file_path :: string(),
			created_date :: string(), 
			preview_clip :: string()}).	

-type system_contents() :: #system_contents{}.

-record(system_album_contents, {
			id :: integer(),
			album_id :: integer(),
			content_id :: integer(),
			name :: string(),
			file_path :: string(),
			created_date :: string()}).	

-type system_album_contents() :: #system_album_contents{}.

-record(system_songs, {
			content_id :: integer(),
			name :: string(),
			artist :: string(),
			charging_package :: integer(),
			expiry_date :: string(),
			available_date :: string(),
			file_path :: string()}).

-type system_songs() :: #system_songs{}.	

-record(default_content_result,{
			content_id :: integer(),
			name :: string(),
			artist :: string(),
			expiry_date :: string(),
			file_path :: string(),
			preview_clip :: string()}).	

-type default_content_result() :: #default_content_result{}.

-record(default_contents, {
			content_id :: integer(),
			name :: string(),
			file_path :: string(),
			expiry_date :: string()}).
-type default_contents() :: #default_contents{}.

-record (category_contents, {		
			content_id :: integer(),
			name :: string(),
			artist :: string(),
			charging_package :: string(),
			expiry_date :: string(),
			available_date :: string(),
			category_level1 :: integer(),
			category_level2:: integer(),
			category_level3:: integer(),
			file_path :: string(),
			created_date :: string(),
			preview_clip :: string()
			}).

-type category_contents() :: #category_contents{}.			

-record(content_info, {
			content_id :: integer(),
			system_content_info :: system_contents(),
			system_song_info :: system_songs(),
			albums_belong_to :: [{system_album()}],
			default_content_info :: default_contents()
			}).
			
-type content_info() :: #content_info{}.	

-record(corporate_contacts, {
			contact_id :: integer(),
			corporate_id :: integer(),
			contact_number :: integer(),
			contact_name :: string()}).
			
-type corporate_contacts() :: #corporate_contacts{}.	

-record(sms_alerts, {
			id :: integer(),
			alert_text :: string(),
			status :: integer()}).
			
-type sms_alerts() :: #sms_alerts{}.	


-record(system_album_result,{
			content_id :: integer(),
			album_id :: integer(),
			name :: string(),
			artist :: string(),
			charging_package :: integer(),
			expiry_date :: string(),
			file_path :: string()}).
			
-type system_album_result() :: #system_album_result{}.

-record (user_downloaded_system_contents, {
			id :: integer(),
			content_id :: integer(),
			owner :: integer(),
			gifted_by :: integer(),
			content_path :: string(),
			content_type :: integer(),
			charging_package :: integer(),
			next_charging_date :: string(),
			downloaded_date :: string(),
			status :: integer(),
			renewal_date :: string(),
			name :: string(),
			artist :: string(),
			content_charging_package :: integer(),
			expiry_date :: string(),
			available_date :: string(),
			category_level1 :: integer(),
			category_level2:: integer(),
			category_level3:: integer(),
			file_path :: string(),
			created_date :: string(),
			preview_clip :: string()
			}).
-type user_downloaded_system_contents() :: #user_downloaded_system_contents{}.

-record (user_downloaded_system_albums , {
			album_id:: integer(),
			orig_album_id:: integer(),
			owner:: integer(),
			gifted_by:: integer(),
			gifted_status:: integer(),
			album_type:: integer(),
			charging_amount:: float(),
			next_charging_date :: string(),
			downloaded_date :: string(),
			album_name :: string(),
			artist :: string(),
			image_path :: string(),
			charging_package :: integer(),
			expiry_date :: string(),
			available_date :: string(),
			preview_clip :: string(),
			created_date :: string()
			}).
-type user_downloaded_system_albums() :: #user_downloaded_system_albums{}.

-record(user_banner, {
			id :: integer(),
			file_path :: string(),
			status :: integer(),
			youtube_url :: string(),
			content_id :: integer(),
			play_order :: integer()
			}).
	
-type user_banner() :: #user_banner{}.

-record(user_banner_results, {
			id :: integer(),
			file_path :: string(),
			status :: integer(),
			youtube_url :: string(),
			content_id :: integer(),
			play_order :: integer(),
			content_name :: string(),
			content_path :: string()
			}).

-type user_banner_results() :: #user_banner_results{}.