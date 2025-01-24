import Util from "../Util";
const dayjs = require('dayjs')

export default class Record {
    constructor(ts, message, id = null, isSaved = false) {
        if (id === null) {
            id = crypto.randomUUID();
        }
        this.id = id;
        this.isSaved = isSaved;
        this.prepareDate(ts);
        this.prepareMessage(message);
        this.edit_visible = false;
    }

    update(ts, message) {
        this.prepareDate(ts);
        this.prepareMessage(message);
        this.isSaved = false;
    }

    prepareMessage(message) {
        this.message = message;
        this.parts = Util.getPartsOfMessage(this.message);
    }

    prepareDate(ts) {
        this.ts = ts;
        let dt = dayjs(this.ts);
        this.ts_fmt = dt.format("DD.MM.YYYY HH:mm:ss");
        this.date_fmt = dt.format("DD.MM.YYYY");
        this.time_fmt = dt.format("HH:mm:ss");
    }

    getString() {
        const tags = this.parts.tags.map((it) => {return `<span style="color: green">${it}</spam>`});
        return `${this.parts.message} ${tags}`;
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