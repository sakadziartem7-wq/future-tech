const burger = document.querySelector('.burger');
const menu = document.querySelector('.header__menu');

if (burger && menu) {
  const OPEN_CLASS = 'header__menu__open';

  // Клик по бургеру: открыть / закрыть
  burger.addEventListener('click', () => {
    menu.classList.toggle(OPEN_CLASS);
  });

  // Клик по любой ссылке в меню: закрыть
  menu.addEventListener('click', (e) => {
    if (e.target.closest('a')) {
      menu.classList.remove(OPEN_CLASS);
    }
  });

  // Если экран стал широким (бургер скрылся), убрать открытое состояние
  window.addEventListener('resize', () => {
    if (getComputedStyle(burger).display === 'none') {
      menu.classList.remove(OPEN_CLASS);
    }
  });
}