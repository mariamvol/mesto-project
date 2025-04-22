const profilePopup = document.querySelector('.popup_type_edit');
const cardPopup = document.querySelector('.popup_type_new-card');
const imagePopup = document.querySelector('.popup_type_image');

function openModal(popup) {      
    popup.classList.add('popup_is-opened');/*cscs*/
}

function closeModal(popup) {      
    popup.classList.remove('popup_is-opened');
}

const openProfilePopupButton = document.querySelector('.profile__edit-button');
const closeProfilePopupButton = profilePopup.querySelector('.popup__close');

openProfilePopupButton.addEventListener('click', () => openModal(profilePopup));
closeProfilePopupButton.addEventListener('click', () => closeModal(profilePopup));

// @todo: Темплейт карточки

const cardTemplate = document.querySelector('#card-template').content.querySelector('.card');

// @todo: DOM узлы

const placesList = document.querySelector('.places__list');

// @todo: Функция создания карточки

function CreateCard (card) {
    const cardElement = cardTemplate.cloneNode(true);
    
    const cardIMG = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title');
    const cardDeleteButton = cardElement.querySelector('.card__delete-button');

    cardTitle.textContent = card.name;
    cardIMG.src = card.link;
    cardIMG.alt = card.name;

    cardDeleteButton.addEventListener('click', DeleteCard);

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
