const burger =document.getElementById('burger');
const menu =document.getElementById('menu');
const contactButton = document.getElementById('contact-button');


burger.addEventListener('click', () => {
  menu.classList.toggle('header__menu--open');
    contactButton.classList.toggle('header__button--open');
});

// add - добавить
// remove - удалить
// toggle - сменитьs
