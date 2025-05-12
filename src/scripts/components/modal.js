// Универсальные функции открытия/закрытия модального окна

export function openModal(popup) {
    popup.classList.add('popup_is-opened');
    document.addEventListener('keydown', closeByEsc);
  }
  
  export function closeModal(popup) {
    popup.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', closeByEsc);
  }
  //Закрытие по-папа нажатием на Esc
  function closeByEsc(evt) {
    if (evt.key === 'Escape') {
      const openedPopup = document.querySelector('.popup_is-opened');
      if (openedPopup) {
        closeModal(openedPopup);
      }
    }
  }
  //Закрытие поп-апа кликом на оверлей
  export function setOverlayListeners() {
    const popups = document.querySelectorAll('.popup');
    popups.forEach((popup) => {
      popup.addEventListener('mousedown', (evt) => {
        if (evt.target === popup) {
          closeModal(popup);
        }
      });
    });
  }
  