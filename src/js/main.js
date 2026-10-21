const burger = document.getElementById('burger');
const menu = document.getElementById('menu');

burger.addEventListener('click', () => {
  menu.classList.toggle('header__menu--open');
});

// function() {}

// стрелочная функция
// () => {}

// add - добавить
// remove - удалить
// toggle - сменить