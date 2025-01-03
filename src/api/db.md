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
record,text,not null - Текст записи
action_ts,timestamp,not null - Дата и время события
created_at,timestamp,now() on create - Дата создания записи в БД
updated_at,timestamp,now() on update - Дата обновления записи в БД
deleted_at,timestamp,nullable - Дата удаления записи в БД
