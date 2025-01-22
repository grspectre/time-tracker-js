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
}