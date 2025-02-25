import Record from "./Record";
const dayjs = require('dayjs');
const customParseFormat = require("dayjs/plugin/customParseFormat");
dayjs.extend(customParseFormat);

export default class RecordList {
    key = 'tt_record_list';
    saveInterval = 10;
    date;

    constructor() {
        this.records = [];
    }

    /**
     * Добавляем запись, время всегда считается в +3 (Europe/Moscow)
     * 
     * @param {string} date 
     * @param {string} time 
     * @param {string} message 
     */
    add(date, time, message) {
        let unixTimestamp = this.getUnixTimeStamp(date, time);
        if (null === unixTimestamp) {
            return;
        }
        this.append(new Record(unixTimestamp, message));
    }

    edit(id, time, message) {
        let record = this.findRecord(id);
        if (record === null) {
            return;
        }
        let ts = this.getUnixTimeStamp(record.date_fmt, time);
        record.update(ts, message);
        record.editVisible = false;
        record.isSavedToCache = false;
        this.append(record);
    }

    /**
     * Get Record object by id
     * 
     * @param {string} id 
     * @returns {Record|null}
     */
    findRecord(id) {
        for (let idx in this.records) {
            if (id === this.records[idx].id) {
                return this.records.splice(idx, 1)[0];
            }
        }
        return null;
    }

    /**
     * 
     * @param {Array} records 
     */
    setRecords(records) {
        this.records = records;
        this.loadCached();
    }

    /**
     * 
     * @param {string} date 
     */
    setDate(date) {
        this.date1 = dayjs(date, "DD.MM.YYYY");
        this.date1 = this.date1.set('hour', 0).set('minute', 0).set('second', 0);
        this.date2 = this.date1.set('hour', 23).set('minute', 59).set('second', 59);
        this.loadCached();
    }

    /**
     * Append record to list
     * 
     * @param {Record} record 
     */
    append(record) {
        if (this.records.length === 0) {
            this.records.push(record);
        } else if (this.records.length === 1) {
            record.compareTS(this.records[0]) >= 0 ? this.records.push(record) : this.records.unshift(record);
        } else {
            if (record.compareTS(this.records[0]) < 0) {
                this.records.unshift(record);
            } else if (record.compareTS(this.records[this.records.length - 1]) >= 0) {
                this.records.push(record);
            } else {
                for (let i = 0; i < this.records.length - 1; i++) {
                    if (record.compareTS(this.records[i]) >= 0 && record.compareTS(this.records[i + 1]) <= 0) {
                        this.records.splice(i, 0, record);
                        return;
                    }
                }
            }
        }
    }

    /**
     * Получение unix timestamp из строк даты и времени
     * 
     * @param {string} date 
     * @param {string} time 
     * @returns {null|int}
     */
    getUnixTimeStamp(date, time) {
        date = date.trim();
        time = time.trim();

        if (date === '') {
            date = dayjs(Date.now()).format('YYYY-MM-DD');
        } else {
            date = date.match(/\d{2}.\d{2}.\d{4}/i);
            if (date === null) {
                return;
            }
            date = dayjs(date[0], "DD.MM.YYYY").format('YYYY-MM-DD');
        }

        if (time === '') {
            time = dayjs(Date.now()).format('HH:mm:ss');
        } else {
            if (time.match(/^\d{2}:\d{2}:\d{2}$/i) === null) {
                if (time.match(/^\d{2}:\d{2}$/i) !== null) {
                    const secs = dayjs(Date.now()).format('ss');
                    time = `${time}:${secs}`;
                } else {
                    return null;
                }
            }
        }

        let datetime = `${date} ${time} +3`;

        let unixTimestamp = Date.parse(datetime);
        if (isNaN(unixTimestamp)) {
            return null;
        }
        return unixTimestamp;
    }

    loadCached() {
        this.records.length = 0;
        let data = localStorage.getItem(this.key);
        if (data === null) {
            return;
        }
        let parsed = JSON.parse(data);
        for (let it of parsed) {
            if (it.ts >= this.date1.valueOf() && it.ts <= this.date2.valueOf()) {
                this.records.push(new Record(it.ts, it.message, it.id, true));
            }
        }
    }

    saveCached() {
        const hasNotSaved = this.records.reduce((acc, it) => {
            if (!it.isSavedToCache) {
                acc = true;
            }
            return acc;
        }, false);
        if (hasNotSaved) {
            let items = [];
            for (const record of this.records) {
                if (!record.isSavedToCache) {
                    record.isSavedToCache = true;
                }
                items.push(record.getDict());
            }
            const data = JSON.stringify(items);
            localStorage.setItem(this.key, data);
        }
    }
}