// Валидация формы «Редактировать профиль»
export function enableValidation() {
  const formList = Array.from(document.querySelectorAll('.popup__form'));
  formList.forEach((formElement) => {
    setEventListeners(formElement);
  });
}

function setEventListeners(formElement) {
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
  const buttonElement = formElement.querySelector('.popup__button');

  toggleButtonState(inputList, buttonElement);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      inputElement.dataset.touched = "true";
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
}
// сохранить нельзя если не валид форма
function toggleButtonState(inputList, buttonElement) {
  const hasInvalidInput = inputList.some((inputElement) => !inputElement.validity.valid);
  buttonElement.disabled = hasInvalidInput;
}

export function resetFormState(formElement) {
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
  const buttonElement = formElement.querySelector('.popup__button');

  inputList.forEach((input) => {
    input.dataset.touched = "false";
    input.setCustomValidity('');
    input.classList.remove('popup__input_type_error');
    const errorElement = formElement.querySelector(`.${input.name}-input-error`);
    if (errorElement) errorElement.textContent = '';
  });

  toggleButtonState(inputList, buttonElement);
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
// краснеая линия
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
