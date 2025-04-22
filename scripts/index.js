// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
// Получаем шаблон карточки
const cardTemplate = document.getElementById('card-template').content.querySelector('.card');

// Контейнер, куда добавляются карточки
const cardsContainer = document.querySelector('.places__list');

// Функция создания карточки
function createCard(cardData) {
  const cardElement = cardTemplate.cloneNode(true);

  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const deleteButton = cardElement.querySelector('.card__delete-button');

  // Заполняем контент карточки
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;

  // Удаление карточки
  deleteButton.addEventListener('click', () => {
    cardElement.remove();
  });

  return cardElement;
}

// Отрисовка всех карточек из массива initialCards
initialCards.forEach(cardData => {
  const card = createCard(cardData);
  cardsContainer.append(card);
});
