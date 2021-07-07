
create table "Users"(
  id serial not null,
  username character varying(32) not null,
  salt character(32),
  hash character(128),
  created_at timestamp with time zone,
  updated_at timestamp with time zone,
  primary key(id)
);

create table "Staff"(
  id serial not null,
  staff_id integer not null,
  photo text,
  full_name character varying(32) not null,
  furigana character varying(32),
  maiden_name character varying(32),
  sex character varying(8),
  blood_type character varying(8),
  birth_date date,
  join_date date,
  employed_category character varying(32),
  location character varying(32),
  project_name character varying(32),
  start_date date,
  department character varying(32),
  "position" character varying(32),
  staff_category character varying(32),
  is_linkage boolean,
  staff_rank character varying(32),
  postal_code character varying(8),
  address1 character varying(32),
  address2 character varying(32),
  address3 character varying(32),
  phone_number character varying(16),
  mobile_number character varying(16),
  is_mailing boolean,
  mailing_postal_code character varying(8),
  mailing_address1 character varying(32),
  mailing_address2 character varying(32),
  mailing_address3 character varying(32),
  mailing_phone_number character varying(16),
  line1 character varying(32),
  station1 character varying(32),
  line2 character varying(32),
  station2 character varying(32),
  line3 character varying(32),
  station3 character varying(32),
  emergency_full_name character varying(32),
  emergency_furigana character varying(32),
  emergency_relation character varying(8),
  emergency_is_live_with boolean,
  emergency_postal_code character varying(8),
  emergency_address1 character varying(32),
  emergency_address2 character varying(32),
  emergency_address3 character varying(32),
  emergency_phone_number character varying(16),
  remarks character varying(32),
  handicapped_category character varying(32),
  leave_date date,
  leave_reason character varying(128),
  notes text,
  created_at timestamp with time zone,
  updated_at timestamp with time zone,
  residence_postal_code character varying(8),
  residence_address1 character varying(32),
  residence_address2 character varying(32),
  residence_address3 character varying(32),
  residence_phone_number character varying(16),
  primary key(id),
  unique(staff_id)
);


create table "Relatives"(
  id serial not null,
  staff_id integer not null,
  dependant_reason character varying(32),
  full_name character varying(32),
  furigana character varying(32),
  relation character varying(32),
  is_live_with boolean,
  postal_code character varying(8),
  address1 character varying(32),
  address2 character varying(32),
  address3 character varying(32),
  phone_number character varying(16),
  created_at timestamp with time zone,
  updated_at timestamp with time zone,
  primary key(id),
  foreign key(staff_id) references "Staff"(staff_id)
);


create table "Qualifications"(
  id serial not null,
  staff_id integer not null,
  name character varying(32) not null,
  get_date date,
  "number" character varying(32),
  expiration_date date,
  created_at timestamp with time zone,
  updated_at timestamp with time zone,
  primary key(id),
  foreign key(staff_id) references "Staff"(staff_id)
);

create table "Projects"(
  id serial not null,
  staff_id integer not null,
  start_date date,
  end_date date,
  name character varying(32) not null,
  description character varying(32),
  notes character varying(32),
  created_at timestamp with time zone,
  updated_at timestamp with time zone,
  primary key(id),
  foreign key(staff_id) references "Staff"(staff_id)
);


create table "Histories"(
  id serial not null,
  staff_id integer not null,
  start_date date,
  end_date date,
  description character varying(32) not null,
  created_at timestamp with time zone,
  updated_at timestamp with time zone,
  primary key(id),
  foreign key(staff_id) references "Staff"(staff_id)
);
