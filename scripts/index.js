//Форма редактирования профиля пользователя

const profilePopup = document.querySelector('.popup_type_edit');
const cardPopup = document.querySelector('.popup_type_new-card');
const imagePopup = document.querySelector('.popup_type_image');
const imagePopupPicture = imagePopup.querySelector('.popup__image'); 
const captionPopup = imagePopup.querySelector('.popup__caption');

function openModal(popup) {      
    popup.classList.add('popup_is-opened');/*cscs*/
}

function closeModal(popup) {      
    popup.classList.remove('popup_is-opened');
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
