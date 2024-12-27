import moment from "moment";
import Record from "./Record";

export default class RecordList {
    key = 'tt_record_list';
    saveInterval = 10;

    constructor() {
        this.records = [];
        this.loadCached();
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

    /**
     * 
     * @param {Array} records 
     */
    setRecords(records) {
        this.records = records;
        this.loadCached();
    }

    /**
     * Append record to list
     * 
     * @param {Record} record 
     */
    append(record) {
        console.log(this.records);
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
                        console.log(record.compareTS(this.records[i]), record.compareTS(this.records[i + 1]));
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
            date = moment(Date.now()).format('YYYY-MM-DD');
        } else {
            date = date.match(/\d{2}.\d{2}.\d{4}/i);
            if (date === null) {
                return;
            }
            date = moment(date, "DD.MM.YYYY").format('YYYY-MM-DD');
        }

        if (time === '') {
            time = moment(Date.now()).format('HH:mm:ss');
        } else {
            if (time.match(/^\d{2}:\d{2}:\d{2}$/i) === null) {
                if (time.match(/^\d{2}:\d{2}$/i) !== null) {
                    time = `${time}:00`;
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
        let data = localStorage.getItem(this.key);
        if (data === null) {
            return;
        }
        let parsed = JSON.parse(data);
        //parsed.shift()
    }

    saveCached() {

    }
}