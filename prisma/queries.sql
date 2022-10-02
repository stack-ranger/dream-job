CREATE TABLE "Company"(
	company_name text primary key,
	company_num_employees integer,
	logo_url text default '' not NULL
);

CREATE TABLE "Job"(
 	id text primary key,
	role text not null,
	company_name text NOT NULL,
	employment_type text,
	location text,
	remote boolean,
	logo text,
	url text,
	text text,
	date_posted timestamp,
	source text,
	FOREIGN KEY (company_name) REFERENCES "Company"(company_name)
);

CREATE TABLE "Skill" (
  name text primary key
);

CREATE TABLE "JobSkill" (
	job_id TEXT,
	skill_name TEXT,
	primary key (job_id, skill_name),
	constraint fk_job foreign key(job_id) references "Job"(id),
	constraint fk_skill foreign key(skill_name) references "Skill"(name)
);
