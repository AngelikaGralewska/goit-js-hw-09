import Notiflix from 'notiflix';

const form = document.querySelector('.form');
const delay = Number(form.delay.value);
const step = Number(form.step.value);
const amount = Number(form.amount.value);


form.addEventListener('submit', ButtonCreateStep);

function ButtonCreateStep(event) {
  event.preventDefault();

};

  for (let position = 1; position <= amount; position++) {
    createPromise(position, delay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`, {
          timeout: 2000,
        });
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`, {
          timeout: 2000,
        });
      });

      Number(form.delay.value) += step;
  }


function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
};