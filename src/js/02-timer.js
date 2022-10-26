import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const buttonStart = document.querySelector('[data-start]');
const dataDays = document.querySelector('[data-days]');
const dataHours = document.querySelector('[data-hours]');
const dataMinutes = document.querySelector('[data-minutes]');
const dataSeconds = document.querySelector('[data-seconds]');
let timer = null;


buttonStart.disabled = true;

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
console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}


const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < new Date()) {
        console.log(selectedDates[0]);
        Notiflix.Notify.failure('Please choose a date in the future');
      return;
    }
    buttonStart.disabled = false;

    function timerSettings () {
      const currentTime = new Date();
      localStorage.setItem('selectedData', selectedDates[0]);
      
      const selectData = new Date(localStorage.getItem('selectedData'));

      if (!selectData) return;

      const timerCounting = selectData - currentTime;

      const { days, hours, minutes, seconds } = convertMs(timerCounting);

      function addLeadingZero (value) {
        return String(value).padStart(2, 0);
    };

      dataDays.textContent = addLeadingZero(days);
      dataHours.textContent = addLeadingZero(hours);
      dataMinutes.textContent = addLeadingZero(minutes);
      dataSeconds.textContent = addLeadingZero(seconds);

      if (dataDays.textContent && dataHours.textContent && dataMinutes.textContent && dataSeconds.textContent === '00') {
        clearInterval(timer);
        Notiflix.Notify.success('It is the end of waiting');
      }};

    function onClick () {
      timer = setInterval(timerSettings, 1000);
      buttonStart.disabled = true;
    };

    buttonStart.addEventListener('click', onClick);
  },
};
flatpickr('#datetime-picker', options);



