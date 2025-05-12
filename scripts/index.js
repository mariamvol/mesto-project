//Форма редактирования профиля пользователя

const profilePopup = document.querySelector('.popup_type_edit');
const cardPopup = document.querySelector('.popup_type_new-card');
const imagePopup = document.querySelector('.popup_type_image');
const imagePopupPicture = imagePopup.querySelector('.popup__image'); 
const captionPopup = imagePopup.querySelector('.popup__caption');

function openModal(popup) {
    popup.classList.add('popup_is-opened');
    document.addEventListener('keydown', closeByEsc);
  }

function closeModal(popup) {
    popup.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', closeByEsc);
  }

const openProfilePopupButton = document.querySelector('.profile__edit-button');
const closeProfilePopupButton = profilePopup.querySelector('.popup__close');

openProfilePopupButton.addEventListener('click', fillProfileForm);
closeProfilePopupButton.addEventListener('click', () => closeModal(profilePopup));

//Поля формы

const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

const nameInput = profilePopup.querySelector('[name="name"]');
const descriptionInput = profilePopup.querySelector('[name="description"]');

function fillProfileForm () {
   nameInput.value = profileName.textContent;
   descriptionInput.value = profileDescription.textContent;

   openModal(profilePopup);
}

//Редактирование имени и информации о себе

                                                // Находим форму в DOM
const profileFormElement = profilePopup.querySelector('.popup__form');


function handleProfileFormSubmit(evt) {                 // Обработчик «отправки» формы
    evt.preventDefault();                               // Эта строчка отменяет стандартную отправку формы.
     profileName.textContent = nameInput.value;
     profileDescription.textContent = descriptionInput.value;

    closeModal(profilePopup);
}

profileFormElement.addEventListener('submit', handleProfileFormSubmit); // Прикрепляем обработчик к форме:


// @todo: Темплейт карточки

const cardTemplate = document.querySelector('#card-template').content.querySelector('.card');


// @todo: DOM узлы

const placesList = document.querySelector('.places__list');

////Форма карточки

const cardButtonForm = document.querySelector('.profile__add-button');

const cardFormPopup = document.querySelector('.popup_type_new-card');

const cardName = cardFormPopup.querySelector('[name="place-name"]');
const dcardILink = cardFormPopup.querySelector('[name="link"]');

function cardform () {
    cardName.value = '';
    dcardILink.value = '';
    resetFormState(cardFormPopup.querySelector('.popup__form'));
    openModal(cardFormPopup);
  }
  

cardButtonForm.addEventListener('click', cardform);
const cardButtonFormClose = cardFormPopup.querySelector('.popup__close');
cardButtonFormClose.addEventListener('click', () => closeModal(cardFormPopup));

// @todo: Функция создания карточки

function CreateCard (card) {
    const cardElement = cardTemplate.cloneNode(true);
    
    const cardIMG = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title');
    const cardDeleteButton = cardElement.querySelector('.card__delete-button');
    const cardLikeButton = cardElement.querySelector('.card__like-button');

    cardTitle.textContent = card.name;
    cardIMG.src = card.link;
    cardIMG.alt = card.name;

    cardDeleteButton.addEventListener('click', DeleteCard);

    cardLikeButton.addEventListener('click', () => {
        cardLikeButton.classList.toggle('card__like-button_is-active');
    });

    cardIMG.addEventListener('click', () => {
        imagePopupPicture.src = card.link;
        imagePopupPicture.alt = card.name;
        captionPopup.textContent = card.name;
        openModal(imagePopup);
    });

    return cardElement;
}

// @todo: Функция удаления карточки

function DeleteCard (event) {
   event.target.closest('.card').remove();
}

// @todo: Вывести карточки на страницу

initialCards.forEach(card => {
    const cardE = CreateCard(card);
    placesList.append(cardE);
});

//Добавление карточки

const cardFormElement = cardFormPopup.querySelector('.popup__form');

function handleCardFormSubmit (evt) {
    evt.preventDefault(); 

    const newCard = {
        name: cardName.value,   
        link: dcardILink.value, 
    };

    const cardElement = CreateCard(newCard); 
    placesList.prepend(cardElement);

    closeModal(cardFormPopup);
}
cardFormElement.addEventListener('submit', handleCardFormSubmit);

//Открытие и закрытие поп-апа с картинкой
const imagePopupCloseButton = imagePopup.querySelector('.popup__close');

imagePopupCloseButton.addEventListener('click', () => {
    closeModal(imagePopup);
})

//Плавное открытие и закрытие поп-апов

const Popups = document.querySelectorAll('.popup');

Popups.forEach((popup) => {
  popup.classList.add('popup_is-animated');
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Валидация формы «Редактировать профиль»
const form = profilePopup.querySelector('.popup__form');
const inputs = Array.from(form.querySelectorAll('.popup__input'));
const submitButton = form.querySelector('.popup__button');


  
function resetFormState(formElement) {
    const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
    const buttonElement = formElement.querySelector('.popup__button');
  
    inputList.forEach((input) => {
      input.dataset.touched = "false"; // сбрасываем флаг
      input.setCustomValidity('');
      input.classList.remove('popup__input_type_error');
      const errorElement = formElement.querySelector(`.${input.name}-input-error`);
      if (errorElement) errorElement.textContent = '';
    });
  
    toggleButtonState(inputList, buttonElement); // деактивируем кнопку
  }
  

function fillProfileForm () {
    nameInput.value = profileName.textContent;
    descriptionInput.value = profileDescription.textContent;
    resetFormState(profilePopup.querySelector('.popup__form'));
    openModal(profilePopup);
  }
  

function showInputError(formElement, inputElement, errorMessage) {
    const errorElement = formElement.querySelector(`.${inputElement.name}-input-error`);
    inputElement.classList.add('popup__input_type_error');
    errorElement.textContent = errorMessage;
  }
  
  function hideInputError(formElement, inputElement) {
    const errorElement = formElement.querySelector(`.${inputElement.name}-input-error`);
    inputElement.classList.remove('popup__input_type_error');
    errorElement.textContent = '';
  }
  
  function checkInputValidity(formElement, inputElement) {
    let customMessage = "";
    const value = inputElement.value.trim();
  
    if (inputElement.validity.valueMissing) {
      customMessage = "Вы пропустили это поле.";
    } else if (inputElement.type === "url" && inputElement.validity.typeMismatch) {
      customMessage = "Введите адрес сайта.";
    } else if (inputElement.name === "name" && value.length < 2) {
      customMessage = `Минимальное количество символов: 2. Длина текста сейчас: ${value.length} символ${value.length === 1 ? '' : 'а'}.`;
    } else if (inputElement.name === "name" && value.length > 40) {
      customMessage = "Максимальная длина — 40 символов.";
    } else if (inputElement.name === "description" && value.length < 2) {
      customMessage = `Минимальное количество символов: 2. Длина текста сейчас: ${value.length} символ${value.length === 1 ? '' : 'а'}.`;
    } else if (inputElement.name === "description" && value.length > 200) {
      customMessage = "Максимальная длина — 200 символов.";
    } else if (inputElement.name === "place-name" && value.length < 2) {
      customMessage = `Минимальное количество символов: 2. Длина текста сейчас: ${value.length} символ${value.length === 1 ? '' : 'а'}.`;
    } else if (inputElement.name === "place-name" && value.length > 30) {
      customMessage = "Максимальная длина — 30 символов.";
    }
  
    inputElement.setCustomValidity(customMessage);
  
    if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
      hideInputError(formElement, inputElement);
    }
  }
  
  
  
  function toggleButtonState(inputList, buttonElement) {
    const hasInvalidInput = inputList.some((inputElement) => !inputElement.validity.valid);
    buttonElement.disabled = hasInvalidInput;
  }
  
  function setEventListeners(formElement) {
    const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
    const buttonElement = formElement.querySelector('.popup__button');
  
    toggleButtonState(inputList, buttonElement);
  
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        inputElement.dataset.touched = "true"; // пользователь начал ввод
        checkInputValidity(formElement, inputElement);
        toggleButtonState(inputList, buttonElement);
      });
    });
  }
  
  function enableValidation() {
    const formList = Array.from(document.querySelectorAll('.popup__form'));
    formList.forEach((formElement) => {
      setEventListeners(formElement);
    });
  }
  
  enableValidation(); // Запуск

//Закрытие поп-апа кликом на оверлей
Popups.forEach((popup) => {
    popup.addEventListener('mousedown', (evt) => {
      if (evt.target === popup) {
        closeModal(popup);
      }
    });
  });

//Закрытие по-папа нажатием на Esc

function closeByEsc(evt) {
    if (evt.key === 'Escape') {
      const openedPopup = document.querySelector('.popup_is-opened');
      if (openedPopup) {
        closeModal(openedPopup);
      }
    }
  }
  
  
  
