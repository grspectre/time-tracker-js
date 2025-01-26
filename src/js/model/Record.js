import Util from "../Util";
const dayjs = require('dayjs')

export default class Record {
    /**
     * 
     * @param {integer} ts 
     * @param {string} message 
     * @param {uuid4|null} id 
     * @param {boolean} isSaved 
     */
    constructor(ts, message, id = null, isSaved = false) {
        if (id === null) {
            id = crypto.randomUUID();
        }
        this.id = id;
        this.isSaved = isSaved;
        this.isSavedToCache = isSaved;
        this.prepareDate(ts);
        this.prepareMessage(message);
        this.editVisible = false;
    }

    /**
     * Update timestamp and message in Record
     * 
     * @param {integer} ts 
     * @param {string} message 
     */
    update(ts, message) {
        this.prepareDate(ts);
        this.prepareMessage(message);
        this.isSaved = false;
    }

    /**
     * Prepare message for output
     * 
     * @param {string} message 
     */
    prepareMessage(message) {
        this.message = message;
        this.parts = Util.getPartsOfMessage(this.message);
    }

    /**
     * Prepare timestamp for output
     * 
     * @param {string} ts 
     */
    prepareDate(ts) {
        this.ts = ts;
        let dt = dayjs(this.ts);
        this.ts_fmt = dt.format("DD.MM.YYYY HH:mm:ss");
        this.date_fmt = dt.format("DD.MM.YYYY");
        this.time_fmt = dt.format("HH:mm:ss");
    }

    /**
     * Compare two records
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
     * Return dict with data to BD
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