import { galleryItems } from './gallery-items.js';

const gallery = document.querySelector('.gallery');
renderMarkup();

gallery.addEventListener('click', handleClick);

const lightbox = new SimpleLightbox('.gallery a', {
  captionDelay: 250,
  captionsData: 'alt',
  captionPosition: 'bottom',
  fadeSpeed: 500,
  animationSlide: true,
  widthRatio: 1,
});

function handleClick(e) {
  e.preventDefault();
  const clickedImg = e.target.closest('.gallery__item');
  if (!clickedImg) {
    return;
  }
  const index = galleryItems.findIndex(
    item => item.preview === clickedImg.querySelector('img').src
  );
  lightbox.open(index);
  console.log(lightbox);
}

function createMarkup(items) {
  const markup = items
    .map(
      ({ preview, original, description }) =>
        `<li class="gallery__item">
            <a class="gallery__link" href=${original}>
                <img class="gallery__image" src=${preview} alt=${description}/>
            </a>
        </li>
`
    )
    .join('');
  return markup;
}

function renderMarkup() {
  gallery.innerHTML = createMarkup(galleryItems);
}
