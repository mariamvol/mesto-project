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

    cardDeleteButton.addEventListener('click', () => {
        cardElement.remove();
      });

    return cardElement;
}

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
