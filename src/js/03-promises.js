import Notiflix from 'notiflix';

const form = document.querySelector('.form');

form.addEventListener('submit', ButonSubmit);

function ButonSubmit(event) {
  event.preventDefault();

  const formData = {
    delay: Number(form.delay.value),
    step: Number(form.step.value),
    amount: Number(form.amount.value),
  };

  let formDelay = formData.delay;

  for (let position = 1; position <= formData.amount; position++) {
    createPromise(position, formDelay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`, 
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`,
        );
      });

      formDelay += formData.step;
  }
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
}