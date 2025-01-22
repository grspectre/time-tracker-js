import RecordList from "./model/RecordList";
import Token from "./model/Token";

export default class TimeTracker {
    prop = "это самое лучшее свойство";
    token;
    recordList;
    currentDate;

    constructor() {
        this.token = new Token();
        this.recordList = new RecordList();
        this.renderDate('now');
    }

    setRecords(records) {
        this.recordList.setRecords(records);
    }

    renderDate() {
        if (this.currentDate === undefined) {

        }
        console.log(this.currentDate);
    }
}