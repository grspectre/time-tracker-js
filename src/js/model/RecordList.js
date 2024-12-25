export default class RecordList {
    key = 'tt_record_list';

    constructor() {
        this.load();
    }

    load() {
        let data = localStorage.getItem(this.key);
        if (data === null) {
            return;
        }
        let parsed = JSON.parse(data);
        //parsed.shift()
    }

    add(date_time, message) {

    }

    save() {

    }
}