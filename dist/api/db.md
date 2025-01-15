# Структура базы данных

## Таблица time_tracker_session

Таблица хранит сессии пользователей и их идентификаторы. На первом этапе будет содержать только идентификатор сессии, email для восстановление сессий и наименование сессии.

session_id, uuid4 - Идентификатор сессии, primary key
title, var_char(255),default='' - Наименование сессии
email, var_char(255),nullable - Адрес электронной почты
last_code,var_char(10),nullable - Последний код, отправленный на email
last_code_ts,timestamp,nullable - Дата отправки кода на email
created_at,timestamp,now() on create - Дата создания записи в БД
updated_at,timestamp,now() on update - Дата обновления записи в БД
deleted_at,timestamp,nullable - Дата удаления записи в БД

## Таблица time_tracker_record

record_id,int64,auto increment,primary key - Идентификатор записи
session_id, uuid4 - Идентификатор сессии, foreign key
record,text,not null - Текст записи
action_ts,timestamp,not null - Дата и время события
created_at,timestamp,now() on create - Дата создания записи в БД
updated_at,timestamp,now() on update - Дата обновления записи в БД
deleted_at,timestamp,nullable - Дата удаления записи в БД

```sql
CREATE TABLE IF NOT EXISTS time_tracker.time_tracker_session (
	session_id varchar(36) NOT NULL,
	title varchar(255) NOT NULL,
	email varchar(255) NULL,
	last_code varchar(10) NULL,
	last_code_ts TIMESTAMP NULL,
	created_at TIMESTAMP NULL,
	updated_at TIMESTAMP NULL,
	deleted_at TIMESTAMP NULL,
	CONSTRAINT time_tracker_session_pk PRIMARY KEY (session_id)
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_0900_ai_ci
COMMENT='Сессии пользователей';

CREATE TABLE IF NOT EXISTS time_tracker.time_tracker_record (
	session_id varchar(36) NULL,
	record_id BIGINT NOT NULL,
	record_text TEXT NOT NULL,
	action_ts TIMESTAMP NOT NULL,
	created_at TIMESTAMP NULL,
	updated_at TIMESTAMP NULL,
	deleted_at TIMESTAMP NULL,
	CONSTRAINT time_tracker_record_pk PRIMARY KEY (record_id),
	CONSTRAINT time_tracker_record_time_tracker_session_FK FOREIGN KEY (session_id) REFERENCES time_tracker.time_tracker_session(session_id)
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_0900_ai_ci
COMMENT='Таблица с записями';
```