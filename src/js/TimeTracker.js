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

    submitToken(ev) {
        ev.preventDefault();
        let el = ev.target;
        let input = el.querySelector('input[name="token"]');
        let tokenValue = input.value;
        let res = window.Alpine.store('time_tracker').token.update(tokenValue);
        if (!res) {
            input.value = window.Alpine.store('time_tracker').token.get();
        }
    }
}