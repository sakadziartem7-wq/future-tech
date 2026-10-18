const burger = document.querySelector('.burger');
const menu = document.querySelector('.header__menu');

if (burger && menu) {
  const OPEN_CLASS = 'header__menu__open';


  burger.addEventListener('click', () => {
    menu.classList.toggle(OPEN_CLASS);
  });

  menu.addEventListener('click', (e) => {
    if (e.target.closest('a')) {
      menu.classList.remove(OPEN_CLASS);
    }
  });

  window.addEventListener('resize', () => {
    if (getComputedStyle(burger).display === 'none') {
      menu.classList.remove(OPEN_CLASS);
    }
  });
}