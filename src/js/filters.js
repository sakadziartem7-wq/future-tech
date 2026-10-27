const f = document.querySelector('.blogs__filters');
let x;
f.style.overflowX = 'hidden';
f.ontouchstart = e => x = e.touches[0].clientX;
f.ontouchend = e => f.scrollBy({ left: Math.sign(x - e.changedTouches[0].clientX) * 165, behavior: 'smooth' });