export default class Record {
    constructor(ts, message) {
        this.ts = ts;
        this.message = message;
    }

    /**
     * Сравниваем две записи
     * 
     * @param {Record} record 
     * @returns {0|1|-1}
     */
    compare(record) {
        if (this.ts === record.ts) {
            return 0;
        }
        return this.ts < record.ts ? -1 : 1;
    }
}