import { galleryItems } from "./gallery-items.js";

const galleryContainer = document.querySelector(".gallery");
const galleryItemsMarkUp = createGalleryItemsMarkup(galleryItems);

galleryContainer.insertAdjacentHTML("beforeend", galleryItemsMarkUp);
galleryContainer.addEventListener("click", onGalleryImgClick);

function createGalleryItemsMarkup(galleryItems) {
  return galleryItems
    .map(({ preview, original, description }) => {
      return `
      <div class="gallery__item">
        <a class="gallery__link" href="large-image.jpg">
          <img
            class="gallery__image"
            src="${preview}"
            data-source="${original}"
            alt="${description}"
          />
        </a>
      </div>`;
    })
    .join("");
}

function onGalleryImgClick(event) {
  blockAction(event);

  const isImgEl = event.target.classList.contains("gallery__image");

  if (!isImgEl) {
    return;
  }

  const originalImg = event.target.dataset.source;
  const instance = basicLightbox.create(`
    <img src="${originalImg}" width="800" height="600">
  `);

  instance.show();

  galleryContainer.addEventListener("keydown", onEscapePress);

  function onEscapePress(event) {
    if (event.code === "Escape") {
      galleryContainer.removeEventListener("keydown", onEscapePress);
      instance.close();
    }
  }
}

function blockAction(event) {
  event.preventDefault();
}
