import moment from "moment";
import Record from "./Record";

export default class RecordList {
    key = 'tt_record_list';

    constructor() {
        this.load();
        this.records = [];
    }

    load() {
        let data = localStorage.getItem(this.key);
        if (data === null) {
            return;
        }
        let parsed = JSON.parse(data);
        //parsed.shift()
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

    setRecords(records) {
        this.records = records;
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
            record.compare(this.records[0]) >= 0 ? this.records.push(record) : this.records.unshift(record);
        } else {
            if (record.compare(this.records[0]) < 0) {
                this.records.unshift(record);
            } else if (record.compare(this.records[this.records.length - 1]) >= 0) {
                this.records.push(record);
            } else {
                for (let i = 0; i < this.records.length - 1; i++) {
                    if (record.compare(this.records[i]) >= 0 && record.compare(this.records[i + 1]) <= 0) {
                        console.log(record.compare(this.records[i]), record.compare(this.records[i + 1]));
                        this.records.splice(i, 0, record);
                        return;
                    }
                }
            }
        }
    }

    /**
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

    save() {

    }
}