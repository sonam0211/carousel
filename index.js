import images from './constants';

// Initial State
let scrollAmount = 0;
let primary = scrollAmount + 1;

let filteredCards = images;

function resetState() {
  scrollAmount = 0;
  primary = scrollAmount + 1;
}

function setFilteredCards(cards) {
  filteredCards = cards;
}

function removeChilds(elem) {
  while (elem.firstChild) {
    elem.firstChild.remove();
  }
}

function createButton(text, onClick) {
  const button = document.createElement('button');
  button.innerText = text;
  button.addEventListener('click', onClick);
  return button;
}

function createDropdown(options, onOptionChange) {
  const select = document.createElement('select');
  options.forEach((option) => {
    const optionElem = document.createElement('option');
    optionElem.innerText = option;
    select.appendChild(optionElem);
  });
  select.addEventListener('change', onOptionChange);
  return select;
}

function createText(title) {
  const text = document.createElement('p');
  text.innerText = title;
  text.classList.add('title');
  return text;
}

function createImage(src) {
  const image = document.createElement('img');
  image.src = 'https://image.tmdb.org/t/p/w185/' + src;
  image.style.width = '100%';
  image.style.height = '100%';
  return image;
}

function createCard(item, index) {
  const { poster_path, title, price, category } = item;
  const card = document.createElement('div');
  card.classList.add('card');
  if (index === primary) card.classList.add('primary');
  const image = createImage(poster_path);
  card.appendChild(image);
  const titleText = createText(title);
  const priceText = createText(price + '$');
  const categoryText = createText(category);
  card.appendChild(titleText);
  card.appendChild(priceText);
  card.appendChild(categoryText);
  return card;
}

function addCards(carousel) {
  removeChilds(carousel);
  filteredCards.forEach((image, index) =>
    carousel.appendChild(createCard(image, index))
  );
}

function onOptionChange(event) {
  const filteredCards = images.filter(
    (image) => image.category === event.target.value
  );
  if (filteredCards.length) setFilteredCards(filteredCards);
  else setFilteredCards(images);
  const carousel = document.getElementById('carousel');
  addCards(carousel);
  const cards = document.getElementsByClassName('card');
  cards?.[primary]?.classList?.remove('primary');
  resetState();
  carousel.style.transform = `translateX(${scrollAmount}px)`;
  cards[primary].classList.add('primary');
}

function addCategoryFilter(main) {
  const filter = createDropdown(['all', 'action', 'adventure'], onOptionChange);
  main.appendChild(filter);
}

// Scroll Functionality

function sliderScrollRight(carousel) {
  if (primary === filteredCards.length - 2) return;
  const cards = document.getElementsByClassName('card');
  cards[primary]?.classList.remove('primary');
  scrollAmount -= 1;
  primary += 1;
  carousel.style.transform = `translateX(${scrollAmount * 200}px)`;
  cards[primary]?.classList?.add('primary');
}

function sliderScrollLeft(carousel) {
  if (primary === 1) return;
  const cards = document.getElementsByClassName('card');
  cards[primary].classList.remove('primary');
  scrollAmount += 1;
  primary -= 1;
  carousel.style.transform = `translateX(${scrollAmount * 200}px)`;
  cards[primary].classList.add('primary');
}

function addCarousel(main) {
  const container = document.createElement('div');
  container.classList.add('container');
  const carousel = document.createElement('div');
  carousel.setAttribute('id', 'carousel');
  carousel.classList.add('carousel');
  const leftButton = createButton('<', () => sliderScrollLeft(carousel));
  const rightButton = createButton('>', () => sliderScrollRight(carousel));
  rightButton.classList.add('right');
  container.appendChild(leftButton);
  container.appendChild(carousel);
  addCards(carousel);
  container.appendChild(rightButton);
  main.appendChild(container);
}

function appStart() {
  const main = document.getElementById('main');
  addCategoryFilter(main);
  addCarousel(main);
}

appStart();
