const burger =document.getElementById('burger');
const headerAction =document.getElementById('header__action');
const contactButton = document.getElementById('contact-button');


burger.addEventListener('click', () => {
headerAction.classList.toggle('header__action--open');
contactButton.classList.toggle('header__button--open');
});

const items = document.querySelectorAll('.actions__item');

items.forEach((item) => {
  const count = item.querySelector('.actions__count');
  let timer;

  item.addEventListener('mouseenter', () => {
    timer = setInterval(() => {
      count.textContent = Number(count.textContent.replace(/\D/g, '')) + 1;
    }, 100);
  });

  item.addEventListener('mouseleave', () => {
    clearInterval(timer);
  });
});

// add - добавить
// remove - удалить
// toggle - сменитьs
