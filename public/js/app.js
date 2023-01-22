console.log('Client side javascript is running ...');

// fetch('http://localhost:3000/weather?address=!').then((response) => {
//   response.json().then((data) => {
//     if (data.error) {
//       return console.log(data.error);
//     } else {
//       // console.log(data.location);
//       // console.log(data.forecast);
//     }
//   });
// });

const weatherForm = document.querySelector('form');
const searchElement = document.querySelector('input');
let messageOne = document.querySelector('#message-1');
let messageTwo = document.querySelector('#message-2');

messageOne.textContent = '';
messageTwo.textContent = '';

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const location = searchElement.value;
  messageOne.textContent = 'Loading ----';
  messageTwo.textContent = '';
  const url = 'http://localhost:3000/weather?address=' + location;

  fetch(url).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        messageOne.textContent = data.error;
      } else {
        messageOne.textContent = data.temperature + '`C';
        messageTwo.textContent = data.forecast;
        console.log(data.location);
        console.log(data.forecast);
      }
    });
  });
});
