import RecordList from "./model/RecordList";
import Token from "./model/Token";

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
}