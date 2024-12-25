export default class Token {
    key = 'tt_uuid_token';

    constructor() {
        this.init();
    }

    init() {
        this.token = localStorage.getItem(this.key);
        if (this.token === null) {
            this.token = crypto.randomUUID();
            this.save();
        }
    }

    update(token) {
        if (this.isValid(token)) {
            this.token = token;
            this.save();
            return true;
        }
        return false;
    }

    get() {
        return this.token;
    }

    isValid(token) {
        let pattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
        return token.match(pattern) !== null;
    }

    save() {
        localStorage.setItem(this.key, this.token);
    }
}