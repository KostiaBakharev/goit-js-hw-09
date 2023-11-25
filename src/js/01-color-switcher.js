function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
//  Напиши скрипт, який після натискання кнопки «Start», раз на секунду змінює колір фону <body> на випадкове значення,
//  використовуючи інлайн стиль. Натисканням на кнопку «Stop» зміна кольору фону повинна зупинятися

const btnStart = document
  .querySelector('button[data-start]')
  .addEventListener('click', startGeneration);
const btnStop = document
  .querySelector('[data-stop]')
  .addEventListener('click', stopGenetation);

document.querySelector('[data-stop]').disabled = true;
let colorChange;

function startGeneration() {
  document.querySelector('[data-start]').disabled = true;
  document.querySelector('[data-stop]').disabled = false;
  if (!colorChange) {
    colorChange = setInterval(() => {
      document.body.style.backgroundColor = getRandomHexColor();
      console.log(`Background color changed to: ${getRandomHexColor()}`);
    }, 1000);
  }
}

function stopGenetation() {
  if (colorChange) {
    clearInterval(colorChange);
    colorChange = null;
    document.querySelector('[data-start]').disabled = false;
    document.querySelector('[data-stop]').disabled = true;
    console.log('Color generation stopped.');
  }
}

// btnStart.addEventListener('click', () => {
//   if (!colorChange) {
//     btnStart.disabled = true;
//     // btnStop.disabled = false;
//     colorChange = setInterval(() => {
//       document.body.style.backgroundColor = getRandomHexColor();
//     }, 1000);
//   }
// });
