import { galleryItems } from './gallery-items.js';

const gallery = document.querySelector('.gallery');
renderMarkup();

gallery.addEventListener('click', handleClick);

function handleClick(e) {
  e.preventDefault();
  if (!e.target.classList.contains('gallery__image')) {
    return;
  }

  const instance = basicLightbox.create(
    `
        <img src=${e.target.dataset.source} width="800" height="600" alt=${e.target.alt}>
    `,
    {
      handler: null,
      onShow(instance) {
        this.handler = handleKeyDown.bind(instance);
        document.addEventListener('keydown', this.handler);
      },
      onClose() {
        document.removeEventListener('keydown', this.handler);
      },
    }
  );
  instance.show();
}

function handleKeyDown(e) {
  if (e.code === 'Escape') {
    this.close();
  }
}

function createMarkup(items) {
  const markup = items
    .map(
      ({ preview, original, description }) =>
        `<li class="gallery__item">
            <a class="gallery__link" href=${original}>
                <img
                class="gallery__image"
                src=${preview}
                data-source=${original}
                alt=${description}
                />
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
