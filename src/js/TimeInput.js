import Util from './Util';
import { timePicker } from 'analogue-time-picker';

export class TimeInput {
    _el;
    _picker;

    constructor(selector) {
        this._el = document.querySelector(selector);
        this._picker = new timePicker({ element: this._el });
        console.log()
    }

    render(ev) {
        let el = ev.target;
        let pos = Util.getElPosition(el);
        this._el.classList.add('active');
        this._el.style.top = (pos.top + this._el.scrollHeight) + 'px';
        this._el.style.left = pos.left + 'px';
    }
}