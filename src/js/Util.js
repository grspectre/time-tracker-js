export default class Util {
    static getElPosition(el) {
        const rect = el.getBoundingClientRect();
        return {
            top: rect.top + window.scrollY,
            left: rect.left + window.scrollX
        };
    }

    static getDate(dateStr, direction = 'now') {
        console.log(dateStr);
        console.log(direction);
    }

    static getPartsOfMessage(message) {
        const tags = [...message.matchAll(/#[\S]+/g)].map((it) => {return it[0]});
        for (let tag of tags) {
            message = message.replace(tag, "");
        }
        message = message.replaceAll(/\s+/g, ' ').trim();
        return {
            tags: tags,
            message: message,
        }
    }
}