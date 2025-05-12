// @todo: Функция создания карточки

export function createCard(card, handleCardClick) {
    const cardTemplate = document.querySelector('#card-template').content.querySelector('.card');
    const cardElement = cardTemplate.cloneNode(true);
  
    const cardIMG = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title');
    const cardDeleteButton = cardElement.querySelector('.card__delete-button');
    const cardLikeButton = cardElement.querySelector('.card__like-button');
  
    cardTitle.textContent = card.name;
    cardIMG.src = card.link;
    cardIMG.alt = card.name;
  
    cardDeleteButton.addEventListener('click', (event) => {
      event.target.closest('.card').remove();
    });
  
    cardLikeButton.addEventListener('click', () => {
      cardLikeButton.classList.toggle('card__like-button_is-active');
    });
  
    cardIMG.addEventListener('click', () => {
      handleCardClick(card.name, card.link);
    });
  
    return cardElement;
  }
  