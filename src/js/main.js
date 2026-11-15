const burger =document.getElementById('burger');
const headerAction =document.getElementById('header__action');
const contactButton = document.getElementById('contact-button');


burger.addEventListener('click', () => {
 headerAction.classList.toggle('header__action--open');
    contactButton.classList.toggle('header__button--open');
});

// add - добавить
// remove - удалить
// toggle - сменитьs
