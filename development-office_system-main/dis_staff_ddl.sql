CREATE TABLE "Dispatching_companies" (
    id serial not null,
    company_name character(32) not null,
    company_overview character(128),
    business_type character(128),
    postal_code character(8),
    address character(128),
    phone_number character(16),
    mail_address character(256),
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    PRIMARY KEY (id)
);

CREATE TABLE "Dispatched_staff" (
    id serial not null,    
    company_number character(32),
    username character(32) not null,
    furigana character(32),
    maiden_name character(32),
    sex character(8),
    blood_type character(8),
    birth_date date,
    inservice_retired character(32),
    company_id integer,
    employed_category character(32),
    join_date date,
    retired_date date,
    contract_end_date date,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    PRIMARY KEY (id),
    FOREIGN KEY(company_id) REFERENCES "Dispatching_companies"(id)
);

CREATE TABLE "Owned_qualifications" (
    id serial not null,
    dispatched_staff_id integer not null,
    qualification character(32) not null,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    PRIMARY KEY (dispatched_staff_id, qualification),
    FOREIGN KEY(dispatched_staff_id) REFERENCES "Dispatched_staff"(id)
);

CREATE TABLE "Dispatch_projects" (
    id serial not null,
    dispatched_staff_id integer not null,
    project_name character(32) not null,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    PRIMARY KEY (id),
    FOREIGN KEY(dispatched_staff_id) REFERENCES "Dispatched_staff"(id)
);

-- CREATE TABLE "Personal_contracts" (
--     id serial not null,
--     dispatched_staff_id integer not null,
--     join_date date,
--     retired_date date,
--     contract_end_date date,
--     created_at timestamp with time zone,
--     updated_at timestamp with time zone,
--     PRIMARY KEY (dispatched_staff_id),
--     FOREIGN KEY(dispatched_staff_id) REFERENCES "Dispatched_staff"(id)
-- );

CREATE TABLE "Personal_contracts_yearly" (
    id serial not null,
    dispatched_staff_id integer not null,
    dates date not null,
    basic_salary integer,
    max_work_time integer,
    min_work_time integer,
    individual_unit_price integer,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    PRIMARY KEY (dispatched_staff_id, dates),
    FOREIGN KEY(dispatched_staff_id) REFERENCES "Dispatched_staff"(id)
);

CREATE TABLE "Persons_in_charge" (
    id serial not null,
    person_in_charge_name character(32) not null,
    company_id integer,
    postal_code character(8),
    address character(128),
    work_phone_number character(16),
    personal_phone_number character(16),
    mail_address character(256),
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    PRIMARY KEY (id),
    FOREIGN KEY(company_id) REFERENCES "Dispatching_companies"(id)
);

CREATE TABLE "Company_contracts" (
    id serial not null,
    company_id integer not null,
    company_contract_end_date date not null,
    day_over_work_time float,
    day_special_over_work_time float,
    month_over_work_time float,
    month_special_over_work_time float,
    year_over_work_time float,
    year_special_over_work_time float,
    extentions_number integer,
    holiday_work_number integer,
    holiday character(128),
    work_start_time time,
    work_end_time time,
    remarks character(128),
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    PRIMARY KEY (company_id, company_contract_end_date),
    FOREIGN KEY(company_id) REFERENCES "Dispatching_companies"(id)
);

CREATE TABLE "Work_times_by_month" (
    id serial not null,
    dispatched_staff_id integer not null,
    project_id integer not null,
    dates date not null,
    plan_result_flag integer not null,
    overtime_work_time float,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    PRIMARY KEY (dispatched_staff_id, project_id, dates, plan_result_flag),
    FOREIGN KEY(dispatched_staff_id) REFERENCES "Dispatched_staff"(id)
);