const buttonStart = document.querySelector('button[data-start]');
const buttonStop = document.querySelector('button[data-stop]');
let timerId = null;

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  };

buttonStart.addEventListener('click', clickButtonStart);
buttonStop.addEventListener('click', clickButtonStop);


function clickButtonStart() {
    timerId = setInterval(() => {
         document.body.style.background = getRandomHexColor();
     }, 1000);
     if (buttonStart.disabled = true) {
        buttonStop.disabled = false
    } 
 };
 
 function clickButtonStop() {
     clearInterval(timerId);
     if (buttonStop.disabled = true) {
        buttonStart.disabled = false
    } 
 };


