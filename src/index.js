import 'normalize.css';
import 'air-datepicker/air-datepicker.css';
import './css/global.css';
import Alpine from 'alpinejs';
import TimeTracker from './js/TimeTracker';
import AirDatepicker from 'air-datepicker';


window.Alpine = Alpine;
window.TimeTracker = new TimeTracker();

Alpine.start();

new AirDatepicker('.date-picker');

window.submitToken = function(ev) {
    ev.preventDefault();
    let el = ev.target;
    let input = el.querySelector('input[name="token"]');
    let tokenValue = input.value;
    let res = window.TimeTracker.token.update(tokenValue);
    if (!res) {
        input.value = window.TimeTracker.token.get();
    }
}

window.submitAdd = function(ev) {
    ev.preventDefault();
    let el = ev.target;
    let date = el.querySelector('input[name="date"]').value;
    let time = el.querySelector('input[name="time"]').value;
    let message = el.querySelector('input[name="message"]').value;
    window.TimeTracker.recordList.add(date, time, message);
}
