import RecordList from "./model/RecordList";
import Token from "./model/Token";
const dayjs = require('dayjs');

export default class TimeTracker {
    prop = "это самое лучшее свойство";
    token;
    recordList;

    constructor() {
        this.token = new Token();
        this.recordList = new RecordList();
    }

    setRecords(records) {
        this.recordList.setRecords(records);
    }

    getCurrentDate() {
        return dayjs(Date.now()).format("DD.MM.YYYY");
    }
}