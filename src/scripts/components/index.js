import '../../pages/index.css'; // Было '../pages/index.css'
import { initialCards } from '../cards.js'; 
import { createCard } from './card.js'; // Без изменений
import { openModal, closeModal, setOverlayListeners } from './modal.js'; // Без изменений
import { enableValidation, resetFormState } from './validate.js'; // Без изменений

import logoPath from '../../images/logo.svg'; // Было '../images/logo.svg'
import avatarPath from '../../images/avatar.jpg'; // Было '../images/avatar.jpg'


document.querySelector('.header__logo').src = logoPath;
document.querySelector('.profile__image').style.backgroundImage = `url(${avatarPath})`;

//Форма редактирования профиля пользователя
const profilePopup = document.querySelector('.popup_type_edit');
const cardPopup = document.querySelector('.popup_type_new-card');
const imagePopup = document.querySelector('.popup_type_image');
const imagePopupPicture = imagePopup.querySelector('.popup__image'); 
const captionPopup = imagePopup.querySelector('.popup__caption');

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

   resetFormState(profilePopup.querySelector('.popup__form'));
   openModal(profilePopup);
}

//Редактирование имени и информации о себе
const profileFormElement = profilePopup.querySelector('.popup__form');

function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileDescription.textContent = descriptionInput.value;
    closeModal(profilePopup);
}
profileFormElement.addEventListener('submit', handleProfileFormSubmit);

// DOM узлы
const placesList = document.querySelector('.places__list');
const cardButtonForm = document.querySelector('.profile__add-button');
const cardFormPopup = document.querySelector('.popup_type_new-card');
const cardFormElement = cardFormPopup.querySelector('.popup__form');
const cardName = cardFormElement.querySelector('[name="place-name"]');
const dcardILink = cardFormElement.querySelector('[name="link"]');
const cardButtonFormClose = cardFormPopup.querySelector('.popup__close');

cardButtonForm.addEventListener('click', () => {
    cardName.value = '';
    dcardILink.value = '';
    resetFormState(cardFormElement);
    openModal(cardFormPopup);
});
cardButtonFormClose.addEventListener('click', () => closeModal(cardFormPopup));

//Добавление карточки
function handleCardFormSubmit (evt) {
    evt.preventDefault(); 
    const newCard = {
        name: cardName.value,
        link: dcardILink.value,
    };
    const cardElement = createCard(newCard, handleCardClick); 
    placesList.prepend(cardElement);
    closeModal(cardFormPopup);
}
cardFormElement.addEventListener('submit', handleCardFormSubmit);

//Открытие и закрытие поп-апа с картинкой
function handleCardClick(name, link) {
    imagePopupPicture.src = link;
    imagePopupPicture.alt = name;
    captionPopup.textContent = name;
    openModal(imagePopup);
}
const imagePopupCloseButton = imagePopup.querySelector('.popup__close');
imagePopupCloseButton.addEventListener('click', () => closeModal(imagePopup));

//Плавное открытие и закрытие поп-апов
const popups = document.querySelectorAll('.popup');
popups.forEach((popup) => popup.classList.add('popup_is-animated'));

//Вывести карточки на страницу
initialCards.forEach(card => {
    const cardE = createCard(card, handleCardClick);
    placesList.append(cardE);
});

//Закрытие попапов по оверлею
setOverlayListeners();

//Запуск валидации
enableValidation();