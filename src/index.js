import 'normalize.css';
import 'air-datepicker/air-datepicker.css';
import './css/global.css';
import Alpine from 'alpinejs';
import TimeTracker from './js/TimeTracker';
import AirDatepicker from 'air-datepicker';

const dayjs = require('dayjs');
const customParseFormat = require("dayjs/plugin/customParseFormat");
dayjs.extend(customParseFormat);
const df = "DD.MM.YYYY";

window.Alpine = Alpine;
window.TimeTracker = new TimeTracker();

Alpine.start();

window.datepicker = new AirDatepicker('.date-picker', {
    autoClose: true,
    dateFormat: "dd.MM.yyyy",
});

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

window.changeDate = function(ev) {
    let el = ev.target;
    let direction = el.dataset.direction;
    let input = el.closest("div").querySelector('input[name="date"]');
    let date = input.value.trim();
    if (date === '') {
        date = dayjs(Date.now()).format(df);
    }
    let dateObj = dayjs(date, df);
    if (direction === 'next') {
        dateObj = dateObj.add(1, 'days');
    } else if (direction === 'prev') {
        dateObj = dateObj.subtract(1, 'days');
    }
    input.value = dateObj.format(df);
}

window.focusDateField = function(ev) {
    const input = ev.target;
    let date = input.value.trim();
    if (date === '') {
        date = dayjs(Date.now()).format(df);
    }
    let dateObj = dayjs(date, df);
    window.datepicker.selectedDates = [dateObj.toDate()];
}

window.timeUpdateCallback = function () {
    const input = document.querySelector('input[name="time"]');
    let tm = dayjs(Date.now()).format("HH:mm");
    if (input.value === tm) {
        return;
    }
    input.value = tm;
}

window.intervalTimeInput = setInterval(window.timeUpdateCallback, 1000);