import 'normalize.css';
import 'air-datepicker/air-datepicker.css';
import Alpine from 'alpinejs';
import TimeTracker from './js/TimeTracker';
import AirDatepicker from 'air-datepicker';

window.Alpine = Alpine;

Alpine.store('time_tracker', new TimeTracker());
Alpine.start();

new AirDatepicker('.date-picker');
