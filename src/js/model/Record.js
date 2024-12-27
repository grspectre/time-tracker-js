export default class Record {
    constructor(ts, message, id = null, isSaved = false) {
        this.ts = ts;
        this.message = message;
        if (id === null) {
            id = crypto.randomUUID();
        }
        this.id = id;
        this.isSaved = isSaved;

    }

    /**
     * Сравниваем две записи
     * 
     * @param {Record} record 
     * @returns {0|1|-1}
     */
    compareTS(record) {
        if (this.ts === record.ts) {
            return 0;
        }
        return this.ts < record.ts ? -1 : 1;
    }

    /**
     * Возвращает словарь с данными
     * 
     * @returns Array
     */
    getDict() {
        return {
            id: this.id,
            message: this.message,
            ts: this.ts
        }
    }
}