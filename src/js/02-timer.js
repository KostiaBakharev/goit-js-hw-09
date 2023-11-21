import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
// import { Ukrainian } from 'flatpickr/dist/l10n/uk.js';
import Notiflix from 'notiflix';

const Ukrainian = require('flatpickr/dist/l10n/uk.js').default.uk;
flatpickr.localize(Ukrainian);

const timePicker = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('[data-start]');
const resetBtn = document.querySelector('[data-reset]');
const daysOption = document.querySelector('[data-days]');
const hoursOption = document.querySelector('[data-hours]');
const minOption = document.querySelector('[data-minutes]');
const secOption = document.querySelector('[data-seconds]');

let countdownInterval;
let flatpickrInstance;
let futureDay;

startBtn.setAttribute('disabled', true);
resetBtn.setAttribute('disabled', true);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onChange(selectedDates) {
    futureDay = selectedDates[0].getTime();
    if (selectedDates[0] > options.defaultDate) {
      startBtn.removeAttribute('disabled');
      resetBtn.removeAttribute('disabled', true);
      clearInterval(countdownInterval);
      Notiflix.Notify.success('You can start the countdown!');
      return;
    }
    Notiflix.Notify.failure('Please choose a date in the future');
    startBtn.setAttribute('disabled', true);
    resetBtn.removeAttribute('disabled');
  },

  onClose(selectedDates) {
    futureDay = selectedDates[0].getTime();
    if (selectedDates[0] > options.defaultDate) {
      // startBtn.removeAttribute('disabled');
      // resetBtn.removeAttribute('disabled');
      clearInterval(countdownInterval);
      return;
    }
    Notiflix.Notify.failure(
      "You can't start it! Press reset or choose a date in the future"
    );
  },
};

flatpickrInstance = flatpickr(timePicker, options);
require('flatpickr/dist/themes/material_green.css');

startBtn.addEventListener('click', function () {
  clearInterval(countdownInterval);
  countdownInterval = setInterval(updateTimer, 1000);
  updateTimer();
});

resetBtn.addEventListener('click', function () {
  clearInterval(countdownInterval);
  resetTimer();
});

function resetTimer() {
  daysOption.textContent = '00';
  hoursOption.textContent = '00';
  minOption.textContent = '00';
  secOption.textContent = '00';
  resetBtn.setAttribute('disabled', true);
  startBtn.setAttribute('disabled', true);

  flatpickrInstance.setDate(new Date());
  flatpickrInstance.open();
  Notiflix.Notify.info('Please select a new date');
}
function updateTimer() {
  const now = new Date().getTime();
  const targetDate = new Date(futureDay);
  const timeDifference = targetDate - now;

  if (timeDifference <= 0) {
    clearInterval(countdownInterval);
    daysOption.textContent = '00';
    hoursOption.textContent = '00';
    minOption.textContent = '00';
    secOption.textContent = '00';
    resetBtn.setAttribute('disabled', true);
    return;
  }

  const { days, hours, minutes, seconds } = convertMs(timeDifference);

  daysOption.textContent = addLeadingZero(days);
  hoursOption.textContent = addLeadingZero(hours);
  minOption.textContent = addLeadingZero(minutes);
  secOption.textContent = addLeadingZero(seconds);
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}
