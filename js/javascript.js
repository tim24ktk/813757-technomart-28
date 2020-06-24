/* объявляем переменные*/
var order_basket = document.querySelector('.order-basket');
var buy = document.querySelectorAll('.buy');
var close_button = document.querySelectorAll('.close-button');
var write_us = document.querySelector('.write-us');
var feedback_form = document.querySelector('.feedback-form');
var feedback_form_section = document.querySelector('.feedback-form-section');
var first_name = document.querySelector('[name=first-name]');
var email = document.querySelector('[name=mail]');
var letter = document.querySelector('[name=letter]');
var submit_button = document.querySelector('button');

var isStorageSupport = true;
var storage_name = '';
var storage_email = '';

try {
  storage_name = localStorage.getItem('firstName');
  storage_email = localStorage.getItem('yourEmail');
} catch (err) {
  isStorageSupport = false;
}

/*display-block окну с извещением о добавлении товара в корзину*/
for (var i = 0; i < buy.length; i++) {
  buy[i].addEventListener('click', function (evt) {
    evt.preventDefault();
    order_basket.classList.add('display-block');
  });
}

/*display-block формe обратной связи*/
if (write_us) {
  write_us.addEventListener('click', function (evt) {
    evt.preventDefault();
    feedback_form.classList.add('display-block');
    first_name.focus();
    if (storage_name) {
      first_name.value = storage_name;
      email.focus();
    }
    if (storage_email) {
      email.value = storage_email;
      letter.focus();
    }
  });
} else {
  console.log('Переменная не определена!');
}

/*отправляем и проверяем, чтобы не отправлялась пустая форма*/
if (feedback_form) {
  feedback_form_section.addEventListener('submit', function (evt) {
    if (!first_name.value || !email.value || !letter.value) {
      evt.preventDefault();
      feedback_form.classList.add('shake-form');
      console.log('Нужно заполнить все поля!');
    } else {
      localStorage.setItem('firstName', first_name.value);
      localStorage.setItem('yourEmail', email.value);
    }
  });
} else {
  console.log('Переменная не определена!');
}

/*добавляем событие кнопке закрыть*/
for (var i = 0; i < close_button.length; i++) {
  close_button[i].addEventListener('click', function (evt) {
    evt.preventDefault();
    this.parentElement.classList.remove('display-block');
    feedback_form.classList.remove('shake-form');
  });
}

window.addEventListener('keydown', function (evt) {
  if (evt.keyCode === 27) {
    if (order_basket) {
      evt.preventDefault();
      order_basket.classList.remove('display-block');
    }
    if (feedback_form) {
      evt.preventDefault();
      feedback_form.classList.remove('display-block');
      feedback_form.classList.remove('shake-form');
    }
    else {
      console.log('Переменная не определена!');
    }
  }
});