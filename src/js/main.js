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

const filters = document.querySelectorAll('.blogs__filter');
const firstCard = document.querySelector('.blogs__card');

filters.forEach((filter) => {
  const category = filter.textContent.trim();
  if (category === 'All') return;

  const exists = [...document.querySelectorAll('.blogs__text')].some(
    (el) => el.textContent.trim() === category
  );
  if (exists) return;

  const card = firstCard.cloneNode(true);
  card.querySelector('.blogs__text').textContent = category;
  card.querySelector('.blogs__title').textContent = `Latest news in ${category}`;
  card.querySelector('.blogs__subtext').textContent = `Read the most important stories and updates about ${category}.`;
  firstCard.parentNode.appendChild(card);
});

const cards = document.querySelectorAll('.blogs__card');

filters.forEach((filter) => {
  filter.addEventListener('click', () => {
    const category = filter.textContent.trim();

    filters.forEach((f) => f.classList.remove('blogs__filter--active'));
    filter.classList.add('blogs__filter--active');

    cards.forEach((card) => {
      const cardCategory = card.querySelector('.blogs__text').textContent.trim();
      card.style.display = category === 'All' || category === cardCategory ? '' : 'none';
    });
  });
});


// add - добавить
// remove - удалить
// toggle - сменитьs
