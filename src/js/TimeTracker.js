import RecordList from "./model/RecordList";
import Token from "./model/Token";
const dayjs = require('dayjs');

export default class TimeTracker {
    prop = "это самое лучшее свойство";
    interval = 1000;
    token;
    recordList;
    loopIntervalId;

    constructor() {
        this.token = new Token();
        this.recordList = new RecordList();
        this.loop();
        this.loopInterval = setInterval(() => {
            this.loop();
        }, this.interval);
        this.setDate(this.getCurrentDate());
    }

    setRecords(records) {
        this.recordList.setRecords(records);
    }

    setDate(date) {
        this.recordList.setDate(date);
    }

    getCurrentDate() {
        return dayjs(Date.now()).format("DD.MM.YYYY");
    }

    loop() {
        this.recordList.saveCached();
    }
}