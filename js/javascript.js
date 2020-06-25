/* объявляем переменные*/
var orderBasket = document.querySelector('.order-basket');
var buy = document.querySelectorAll('.buy');
var closeButton = document.querySelectorAll('.close-button');
var writeUs = document.querySelector('.write-us');
var feedbackForm = document.querySelector('.feedback-form');
var feedbackFormSection = document.querySelector('.feedback-form-section');
var firstName = document.querySelector('input[name=first-name]');
var email = document.querySelector('input[name=mail]');
var letter = document.querySelector('input[name=letter]');
var adressImg = document.querySelector('.main-adress img');
var popupMap = document.querySelector('.popup-map');
var continueShopping = document.querySelector('.continue-shopping');

var isStorageSupport = true;
var storageName = '';
var storageEmail = '';

try {
  storageName = localStorage.getItem('firstName');
  storageEmail = localStorage.getItem('yourEmail');
} catch (err) {
  isStorageSupport = false;
}


/*display-block окну с извещением о добавлении товара в корзину*/
buy.forEach(function (elem) {
  elem.onclick = function (evt) {
    evt.preventDefault();orderBasket.classList.add('display-block');
  };
});

/*display-block формe обратной связи*/
if (writeUs) {
  writeUs.addEventListener('click', function (evt) {
    evt.preventDefault();
    feedbackForm.classList.add('form-display-block');
    firstName.focus();
    if (storageName) {
      firstName.value = storageName;
      if (email) {
      email.focus();
        }
    }
    if (storageEmail) {
      email.value = storageEmail;
      if (letter) {
        letter.focus();
      }
    }
  });
} else {
  console.log('Переменная не определена!');
}

/*отправляем и проверяем, чтобы не отправлялась пустая форма*/
if (feedbackForm) {
  feedbackFormSection.addEventListener('submit', function (evt) {
    if (!firstName.value || !email.value || !letter.value) {
      evt.preventDefault();
      feedbackForm.classList.remove('shake-form');
      feedbackForm.offsetWidth = feedbackForm.offsetWidth;
      feedbackForm.classList.add('shake-form');
      console.log('Нужно заполнить все поля!');
    } else {
      localStorage.setItem('firstName', firstName.value);
      localStorage.setItem('yourEmail', email.value);
    }
  });
} else {
  console.log('Переменная не определена!');
}

/*добавляем событие кнопке закрыть*/
for (var i = 0; i < closeButton.length; i++) {
  closeButton[i].addEventListener('click', function (evt) {
    evt.preventDefault();
    this.parentElement.classList.remove('display-block');
    if (feedbackForm) {
      feedbackForm.classList.remove('form-display-block');
      feedbackForm.classList.remove('shake-form');
    }
  });
}

if (continueShopping) {
  continueShopping.addEventListener('click', function (evt) {
    evt.preventDefault();
    orderBasket.classList.remove('display-block');
  });
}

window.addEventListener('keydown', function (evt) {
  if (evt.keyCode === 27) {
    if (orderBasket) {
      evt.preventDefault();
      orderBasket.classList.remove('display-block');
    }
    if (feedbackForm) {
      evt.preventDefault();
      feedbackForm.classList.remove('form-display-block');
      feedbackForm.classList.remove('shake-form');
    }
    else {
      console.log('Переменная не определена!');
    }
  }
});